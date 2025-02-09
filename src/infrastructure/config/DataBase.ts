import { Pool, PoolConnection } from 'mysql2/promise';

export class Database {
  private static pool: Pool;

  static initialize() {
    const mysql = require('mysql2/promise');
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'user_service',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  static async getConnection(): Promise<PoolConnection> {
    if (!this.pool) {
      this.initialize();
    }
    return await this.pool.getConnection();
  }
}