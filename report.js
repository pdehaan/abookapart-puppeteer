const orders = require("./orders.json");

const products = orders
  .reduce((acc, order) => {
    const productArr = order.products.map(product => {
      product.orderId = order.orderId;
      product.orderHref = order.href;
      return product;
    });
    acc.push(productArr);
    return acc;
  }, [])
  .flat()
  .sort((orderA, orderB) => {
    return String(orderA.name).localeCompare(orderB.name);
  });

for (const product of products) {
  console.log(`[${product.orderId}] ${product.name}`);
}
