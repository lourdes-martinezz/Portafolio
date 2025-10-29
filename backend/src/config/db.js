const mysql = require('mysql2/promise');
let pool = null;
async function connect(){
  if(pool) return pool;
  pool = await mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'consultora_portal',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  return pool;
}
module.exports = connect;
