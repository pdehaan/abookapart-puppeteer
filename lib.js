const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

module.exports = {
  scrape
};

class Page {
  constructor() {
    this._email = process.env.ABA_EMAIL;
  }

  /**
   * Initializes the Page object and sets the internal `_browser` and `_page`
   * objects.
   */
  async init() {
    this._browser = await puppeteer.launch();
    this._page = await this._browser.newPage();
  }

  /**
   * Closes the browser instance and cleans up any internal properties.
   */
  async cleanup() {
    await this._browser.close();
    this._browser = null;
    this._page = null;
  }

  /**
   * Signs in to abookapart.com using the specified credentials.
   * @param {object} credentials An object containing an `email` and `password`
   * property. If no credentials are specified, uses the `ABA_EMAIL` and
   * `ABA_PASSWORD` environment variables.
   */
  async signIn(credentials = {}) {
    await this._page.goto("https://abookapart.com/account/login");
    await this._page.type(
      "#customer_email",
      credentials.email || process.env.ABA_EMAIL
    );
    await this._page.type(
      "#customer_password",
      credentials.password || process.env.ABA_PASSWORD
    );
    await this._page.click("input[type='submit'");
  }

  /**
   * Scrape the orders for a logged in user.
   * @returns {array} An array of orders.
   */
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

  /**
   * Scrape the order page and extract the products purchased.
   * @param {object} order An order object with an `href` property specifying
   * which page to scrape.
   * @returns {array} An array of products from the specified order.
   */
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

  /**
   * Take a screenshot of the page and save it to the specified file.
   * @param {string} file
   */
  async screenshot(file) {
    await this._page.screenshot({ path: file });
  }
}

/**
 * Scrape your abookapart.com orders with the products per order.
 * @param {object} credentials An object with an `email` and `password` property
 * containing your login credentials for abookapart.com.
 * @returns {array} An array of orders and products.
 */
async function scrape(credentials = {}) {
  const page = new Page();
  await page.init();
  await page.signIn(credentials);
  const orders = await page.getOrders();
  for (const order of orders) {
    order.products = await page.getProductsByOrder(order);
  }
  await page.cleanup();
  return orders;
}
