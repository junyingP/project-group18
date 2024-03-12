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
        ALTER TABLE public.stores
        ADD COLUMN IF NOT EXISTS address TEXT;
    `);

    await this.connection.query(`
        ALTER TABLE public.stores
        ADD COLUMN IF NOT EXISTS opening_hours TEXT;
    `);

    await this.connection.query(`
    CREATE TABLE IF NOT EXISTS public.stores
    (
        id SERIAL,
        name text,
        url text,
        district text,
        address TEXT,            
        opening_hours TEXT,   
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
          INSERT INTO stores (name, url, district, address, opening_hours)
          VALUES ($1, $2, $3, $4, $5)
        `, [store.name, store.url, store.district, store.address, store.opening_hours]);
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
    const { name, url, district, address, opening_hours} = storeData;
    await this.connection.query(`
      INSERT INTO stores (name, url, district, address, opening_hours)
      VALUES ($1, $2, $3, $4, $5)
    `, [name, url, district, address, opening_hours]);
  }

  async updateStoreById(storeid, storeData) {
    const { name, url, district, address, opening_hours } = storeData;
    await this.connection.query(`
        UPDATE stores
        SET name = $1, url = $2, district = $3, address = $4, opening_hours = $5
        WHERE id = $6
    `, [name, url, district, address, opening_hours, storeid]);
}

}

module.exports = ModelClass;
