const orders = require("./orders.json");

const products = orders
  .reduce((acc = [], order = {}) => {
    const productArr = order.products.map(product => {
      // Inject the order's `orderId` and `href` into the product details.
      return {
        ...product,
        orderId: order.orderId,
        orderHref: order.href
      };
    });
    return acc.concat(productArr);
  }, [])
  .flat()
  .sort((orderA, orderB) => {
    return String(orderA.name).localeCompare(orderB.name);
  });

for (const product of products) {
  console.log(`[${product.orderId}] ${product.name}`);
}
