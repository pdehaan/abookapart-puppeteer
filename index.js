const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

class Page {
  constructor() {
    this._email = process.env.ABA_EMAIL;
  }
  async init() {
    this._browser = await puppeteer.launch();
    this._page = await this._browser.newPage();
  }
  async cleanup() {
    await this._browser.close();
    this._browser = null;
    this._page = null;
  }
  async signIn(credentials = {}) {
    credentials = Object.assign(
      { email: undefined, password: undefined },
      credentials
    );
    await this._page.goto("https://abookapart.com/account/login");
    await this._page.type("#customer_email", credentials.email);
    await this._page.type("#customer_password", credentials.password);
    await this._page.click("input[type='submit'");
  }
  async getOrders() {
    const orders = [];
    await this._page.goto("https://abookapart.com/account");
    const orderRows = await this._page.$$("table.account-table tbody tr");
    for (const row of orderRows) {
      const el = await row.$("td a");
      const order = await this._page.evaluate(a => {
        return { orderId: a.innerText, href: a.getAttribute("href") };
      }, el);
      await el.dispose();
      orders.push(order);
    }
    this.orders = orders;
    return orders;
  }
  async getProductsByOrder(order) {
    const products = [];
    await this._page.goto(order.href);
    const orderItems = await this._page.$$("table.account-table tbody tr");
    for (const row of orderItems) {
      const el = await row.$("td a");
      const product = await this._page.evaluate(a => {
        return {
          name: a.innerText,
          href: new URL(a.getAttribute("href"), "https://abookapart.com/").href
        };
      }, el);
      await el.dispose();
      products.push(product);
    }
    return products;
  }
  async screenshot(file) {
    await this._page.screenshot({ path: file });
  }
}

async function scrape() {
  const page = new Page();
  await page.init();
  await page.signIn({
    email: process.env.ABA_EMAIL,
    password: process.env.ABA_PASSWORD
  });
  const orders = await page.getOrders();
  for (const order of orders) {
    order.products = await page.getProductsByOrder(order);
  }
  await page.cleanup();
  return orders;
}

scrape()
  .then(orders => {
    console.log(JSON.stringify(orders, null, 2));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
