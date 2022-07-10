import mysql, { Pool } from 'mysql2/promise';

export { RowDataPacket, ResultSetHeader } from 'mysql2';

let pool: Pool | null = null;

const db = {
  get pool(): Pool {
    if (!pool) {
      throw new Error('DB is not initialized');
    }
    return pool;
  },
  initDb() {
    if (pool) return;
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
      queueLimit: 0,
    });
  },
};

export default db;
