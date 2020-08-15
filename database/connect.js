const { MongoClient } = require('mongodb');
const { INSTAGRAM, DB, OPTIONS } = require('./constants/constants');

module.exports = {
    connect: async (callback) => {
        const client = new MongoClient(DB, OPTIONS);
        let db = null;
        let error = null;
        try {
            await client.connect();
            db = client.db(INSTAGRAM);
        } catch (err) {
            error = err.stack;
        }

        return callback(error, db, client);
    },
};