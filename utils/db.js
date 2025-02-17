import { MongoClient } from 'mongodb';
// const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
	  constructor() {
		      MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
			            if (!err) {
					            this.db = client.db(DB_DATABASE);
					            this.users = this.db.collection('users');
					            this.files = this.db.collection('files');
					          } else {
							          console.log(err.message);
							          this.db = false;
							        }
			          });
		    }

	  isAlive() { return !!this.db; }

	  async nbUsers() { return this.users.countDocuments(); }

	  async nbFiles() { return this.files.countDocuments(); }

	  async getUser(query) {
		      const user = await this.db.collection('users').findOne(query);
		      return user;
		    }
}

const dbClient = new DBClient();
module.exports = dbClient;
