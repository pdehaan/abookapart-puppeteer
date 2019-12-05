const lib = require("./lib");

scrape();

async function scrape() {
  try {
    const orders = await lib.scrape();
    console.log(JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
