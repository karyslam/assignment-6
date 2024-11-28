const pool = require('../database');

async function getAllProducts() {
  const [rows] = await pool.query('SELECT product_id, name, CAST(price AS DOUBLE) AS price, image FROM products');
  return rows;
}

async function getProductById(id) {
  const [rows] = await pool.query('SELECT * FROM products WHERE product_id = ?', [id]);
  return rows[0];
}


module.exports = {
  getAllProducts,getProductById
};