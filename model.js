const { Pool } = require('pg');

const stores = require('./stores.json');

class ModelClass {
  constructor() {
    this.connection = new Pool({
      user: 'postgres',
      host: process.env.DB_HOST || 'localhost', //locally or with kubernetes
      //host: 'host.docker.internal',
      database: 'postgres',
      password: '12345',
      port: 5432,
    });
  }

  async connectDatabase() {
    await this.connection.connect();
  }

  async setupDatabase() {
    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS public.stores
    (
        id SERIAL,
        name text,
        url text,
        district text,
        rating integer,
        CONSTRAINT stores_pkey PRIMARY KEY (id)
    )`);

    await this.connection.query(`
      ALTER TABLE IF EXISTS public.stores
          OWNER to postgres
    `);


    for (const store of stores) {

      const { rows } = await this.connection.query(`
        SELECT * FROM stores WHERE name = $1
      `, [store.name]);

      if (rows.length === 0) {
        console.log(`Inserting ${store.name}`);
        await this.connection.query(`
          INSERT INTO stores (name, url, district)
          VALUES ($1, $2, $3)
        `, [store.name, store.url, store.district]);
      }
    }
  }

  async getStores() {
    const { rows } = await this.connection.query(`
      SELECT * FROM stores
    `);
    return rows;
  }

  async getStoreById(storeid) {
    const { rows } = await this.connection.query(`
      SELECT * FROM stores WhERE id = $1
    `, [storeid])

    return rows[0]
  }

  async deleteStoreById(storeid) {
    await this.connection.query(`
      DELETE FROM stores WHERE id = $1
    `, [storeid]);
  }

  async addStore(storeData) {
    const { name, url, district, rating } = storeData;
    await this.connection.query(`
      INSERT INTO stores (name, url, district, rating)
      VALUES ($1, $2, $3, $4)
    `, [name, url, district, rating]);
  }

  async updateStoreById(storeid, storeData) {
    const { name, url, district, rating } = storeData;
    await this.connection.query(`
      UPDATE stores
      SET name = $1, url = $2, district = $3, rating = $4
      WHERE id = $5
    `, [name, url, district, rating, storeid]);
  }

}

module.exports = ModelClass;
