const { connect } = require('../connect');
const args = require('yargs').argv;
const chalk = require ('chalk');

const USER_PROFILE = require('./__data__/profile.json');
const INSTAGRAM_PROFILE = require('./__data__/instagram-profile.json');
const USERS = require('./__data__/users.json');

const { CREATE, REMOVE, DB } = require('../constants/constants');

const DATA = [
    {
        collection: 'profile',
        data: [USER_PROFILE]
    },
    {
        collection: 'instagram-profile',
        data: [INSTAGRAM_PROFILE]
    },
    {
        collection: 'users',
        data: USERS
    }
];

(() => {
    const { action = '', collection = '', all = false } = args;
    console.log(
        chalk.yellow.bold(`ACTION: ${action}`),
        chalk.yellow.bold(`COLLECTION: ${collection}`),
        chalk.yellow.bold(`ALL: ${all}`)
    );

    const consoleDBClose = () => console.log(chalk.green(`${chalk.blue.bold(DB)} has closed`));

    if (all) {
        if (action === CREATE) {
            connect((error, db, client) => {
                Promise.all(DATA.map(({ collection, data }) => {
                    if (error) throw error;
                    db.createCollection(collection, async (error) => {
                        if (error) throw error;
                        await db.collection(collection).insertMany(data, (error, res) => {
                            console.log(chalk.green(`${chalk.blue.bold(collection)} collection has been created with ${chalk.blue.bold(res.insertedCount)} documents inserted`));
                        });
                    });
                }))
                .then(() => client.close()
                .then(() => consoleDBClose()));
            });
        } else if (action === REMOVE) {
            connect((error, db, client) => {
                Promise.all(DATA.map(({ collection }) => {
                    db.collection(collection).drop(() => console.log(chalk.green(`${chalk.blue.bold(collection)} dropped`)))
                }))
                .then(() => client.close()
                .then(() => consoleDBClose()));
            });
        }
    } else if (action === CREATE) {
        connect((error, db, client) => {
            if (error) throw error;
            db.createCollection(collection, async (error) => {
                if (error) throw error;
                await db.collection(collection).insertMany([USERS], (error, res) => {
                    console.log(chalk.green(`${chalk.blue.bold(collection)} collection has been created with ${chalk.blue.bold(res.insertedCount)} documents inserted`));
                    client.close().then(() => consoleDBClose());
                });
            });
            client.close().then(() => consoleDBClose());
        });
    } else if (action === REMOVE) {
        connect((error, db, client) => {
            db.collection(collection).drop(() => {
                client.close().then(() => consoleDBClose());
            });
        });
    }
})();