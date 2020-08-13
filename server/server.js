// const fs = require('fs');
// // import path from 'path';
// import bodyParser from 'body-parser';
// import "regenerator-runtime/runtime.js";
// import env from 'dotenv';
// import express from 'express';

// import numeral from 'numeral';
//
// import React from 'react';
// import { Provider } from 'react-redux';
// import { renderToString } from 'react-dom/server';
// import { createStore } from 'redux';
//
// import FileCookieStore from 'tough-cookie-filestore2';
// import Instagram from 'instagram-web-api';
//
// import { App } from "../src/app";
// import { reducers, USER_REDUCER } from "../src/reducers/reducers";
//
// env.config();
// const app = express();
// const PORT = 3000;
//
// // app.use(bodyParser.urlencoded({extended: true}));
// // app.use(express.static('public'));
//
// // serve static files found in the public sub-directory automatically
//
// app.use(express.static(__dirname + '/public'));
//
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
//
// app.get('/', (request, response) => {
//     if (request.query.remove_cookies && fs.existsSync('./cookies.json')) {
//         console.log('Cookies file removed!');
//         fs.unlinkSync('./cookies.json');
//     }
//     response.sendFile('./index.html');
// });
//
// app.post('/', (request, response) => {
//     var username = request.body.username;
//     var htmlData = 'Hello:' + username;
//     response.sendFile(__dirname, './index.html');
// });
//
// // app.get('/', (request, response) => {
// //
// // })
//
//
// app.get('/', (request, response) => {
//     if (request.query.remove_cookies && fs.existsSync('./cookies.json')) {
//         console.log('Cookies file removed!');
//         fs.unlinkSync('./cookies.json');
//     }
//     response.sendFile(__dirname,'./index.html');
// })
//     .post('/', async (request, response) => {
//     await response.sendFile(__dirname,'./index.html');
// });
//     .post('/', (request, response) => {
//     let request_username = request.body.username;
//     if (!request_username || request_username.length === 0) response.redirect('/');
//     const username = process.env.instagram_username;
//     const password = process.env.instagram_password;
//     const cookieStore = new FileCookieStore('./cookies.json');
//     const client = new Instagram({username, password, cookieStore});
//     let images = [],
//         output = [],
//         like_c,
//         comments_c,
//         engagement_rate,
//         engagement_rate_sum = 0,
//         engagement_rate_avg = 0,
//         followers = 0;
//
//     response.sendFile(__dirname,'./index.html');
//     return await client.login().then(data => {
//         const instagram = client.getUserByUsername({username: request_username});
//         if (instagram['has_blocked_viewer'] === false && instagram['edge_owner_to_timeline_media']['count'] > 0) {
//             followers = instagram['edge_followed_by']['count'];
//             let edges = instagram['edge_owner_to_timeline_media']['edges'];
//             for (let p in edges) {
//                 if (edges.hasOwnProperty(p)) {
//                     like_c = edges[p]['node']['edge_liked_by']['count'];
//                     comments_c = edges[p]['node']['edge_media_to_comment']['count'];
//                     engagement_rate = ((like_c + comments_c) / followers) * 100;
//                     engagement_rate_sum += engagement_rate;
//                     engagement_rate = Number((engagement_rate).toFixed(3));
//                     images.push({
//                         "type": edges[p]['node']['__typename'],
//                         "caption": edges[p]['node']['edge_media_to_caption']['edges'].length > 0 ? edges[p]['node']['edge_media_to_caption']['edges'][0]['node']['text'] : '',
//                         "engagement_rate": engagement_rate,
//                         "like": like_c,
//                         "comments": comments_c,
//                         "link": 'https://www.instagram.com/p/' + edges[p]['node']['shortcode'],
//                         "thumbnail": edges[p]['node']['thumbnail_resources'][1]['src']
//                     });
//                 }
//             }
//             if (images.length > 0) {
//                 engagement_rate_avg = engagement_rate_sum / images.length;
//                 engagement_rate_avg = Number((engagement_rate_avg).toFixed(3));
//             }
//         }
//
//         output = {
//             'full_name': instagram['full_name'],
//             'username': instagram['username'],
//             'link': 'https://www.instagram.com/' + instagram['username'],
//             'biography': instagram['biography'],
//             'followers': numeral(followers).format('0,0'),
//             'can_see': !((instagram['is_private'] && instagram['followed_by_viewer'] === false) || instagram['has_blocked_viewer']),
//             'engagement_rate_avg': engagement_rate_avg,
//             'images': images
//         };
//     });
// });




// black
// red
// green
// yellow
// blue
// magenta
// cyan
// white
// blackBright (alias: gray, grey)
// redBright
// greenBright
// yellowBright
// blueBright
// magentaBright
// cyanBright
// whiteBright

// bgBlack
// bgRed
// bgGreen
// bgYellow
// bgBlue
// bgMagenta
// bgCyan
// bgWhite
// bgBlackBright (alias: bgGray, bgGrey)
// bgRedBright
// bgGreenBright
// bgYellowBright
// bgBlueBright
// bgMagentaBright
// bgCyanBright
// bgWhiteBright










// const express = require('express');
// const app = express();
//
// // Parse JSON bodies for this app. Make sure you put
// // `app.use(express.json())` **before** your route handlers!
// app.use(express.json());
//
// app.post('*', (req, res) => {
//     req.body; // JavaScript object containing the parse JSON
//     res.json(req.body);
// });
// const server = app.listen(3000);
//
// // Demo showing the server in action
// const axios = require('axios');






import React from 'react';
import express from 'express';
// import bodyParser from 'body-parser';
import FileCookieStore from 'tough-cookie-filestore2';
// import chalk from 'chalk';

import "regenerator-runtime/runtime.js";
import 'dotenv';
import Instagram from 'instagram-web-api';

import { transformData } from "./utils/transform-data";
import {PROFILE, USER_AUTHENTICATION, USER_DATA, USERS_DATA} from "../src/constants/constants";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.post('/login', async (request, response) => {
//     const { username = '', password = '' } = request.body;
//     // const username = process.env.instagram_username;
//     // const password = process.env.instagram_password;
//     const cookieStore = new FileCookieStore('./cookies.json');
//     const client = new Instagram({username, password, cookieStore});
//     return await client.login({ username, password }).then(({ authenticated }) => {
//         if (authenticated) {
//             return getUserData({ username })
//         }
//         response.json({
//             authenticated,
//             profile: null,
//         });
//     }).then((profile) => {
//         if (profile) {
//             response.json({
//                 authenticated: true,
//                 profile
//             });
//         }
//     }).catch((error, next) => {
//         response.format({
//             'text/html': () => {
//                 response.send(error);
//             }
//         });
//         response.json({
//             error: 'No Followers',
//             items: [],
//         });
//         response.send(error);
//         next();
//     });
// });

app.post('/login', async (request, response) => {
    const obj = {};
    const { username = '', password = '' } = request.body;
    const cookieStore = new FileCookieStore('./cookies.json');
    const client = new Instagram({ username, password, cookieStore });
    return await client.login({ username, password })
        .then(({ authenticated }) => {
            Object.assign(
                obj, {
                    [USER_AUTHENTICATION]: {
                        authenticated,
                    }
                }
            );
            return client.getUserByUsername({ username });
        })
        .then((profile) => {
            Object.assign(
                obj, {
                    [USER_DATA]: {
                        error: null,
                        data: transformData(profile)
                    }
                }
            );
            return client.getFollowers({ userId: '8121454761' });
        })
        .then(ids => {
            return Promise.all(
                ids.data.map((id) => {
                    return client.getUserByUsername({
                        username: id.username
                    });
                }
            ))
        })
        .then((followers) => {
            Object.assign(obj, {
                [USERS_DATA]: {
                    error: null,
                    data: followers.map(follower => transformData(follower))
                }
            });
            console.log(
                '**********obj**********\n',
                obj,
                '\n**********obj**********\n',
            )
            response.json(obj);
        })
        .catch((error, next) => {
            response.json({
                error: 'No Followers',
                items: [],
            });
            response.send(error);
            next();
        });
});

export const getUserData = async (data) => {
    const { username, password } = data;
    const client = new Instagram({ username, password });
    const obj = {};
    return await client.getUserByUsername({ username })
        .then((data) => {
            if (data) {
                Object.assign(obj, {
                    [PROFILE]: {
                        error: null,
                        data: transformData(data)
                    }
                })
            }
        })
        .then(() => {
            return client.getFollowers({ userId: '8121454761' })
                .then(ids => {
                    return Promise.all(
                        ids.data.map((id) => {
                            return client.getUserByUsername({
                                username: id.username
                            });
                        })
                    );
                })
                .then(followers => {
                    console.log(
                        '**********followers**********\n',
                        followers,
                        '\n**********followers**********\n',
                    )
                    response.json({
                        error: null,
                        items: followers.map(follower => transformData(follower),
                        )})
                }).catch((error, next) => {
                    response.json({
                        error: 'No Followers',
                        items: [],
                    });
                    next();
                });
        })
};

app.post('/user-data', async (request, response) => {
    // const cookieStore = new FileCookieStore('./cookies.json');
    const { username = '', loginUser = '', loginPassword = '' } = request.body;

    return await getUserData({ username: loginUser, password: loginPassword }).then(data => {
        return response.json(data);
    })
});

// app.post('/users-data', async (request, response) => {
//     // const cookieStore = new FileCookieStore('./cookies.json');
//     const { username = '', loginUser = '', loginPassword = '' } = request.body;
//     const client = new Instagram({ username: loginUser, password: loginPassword });
//     return await client.getFollowers({ userId: '8121454761' })
//         .then(ids => {
//             // console.log(
//             //     '**********ids**********\n',
//             //     ids,
//             //     '\n**********ids**********\n',
//             // )
//             // if (!ids.data.length) {
//             //     response.json({
//             //         error: 'No Followers',
//             //         items: [],
//             //     });
//             // }
//             return Promise.all(
//                 ids.data.map((id) => {
//                     return client.getUserByUsername({
//                         username: id.username
//                     });
//                 })
//             );
//         })
//         .then(followers => {
//             // console.log(
//             //     '**********followers**********\n',
//             //     followers,
//             //     '\n**********followers**********\n',
//             // )
//             response.json({
//                 error: null,
//                 items: followers.map(follower => transformData(follower),
//             )})
//         }).catch((error, next) => {
//             response.json({
//                 error: 'No Followers',
//                 items: [],
//             });
//             next();
//         });
// });

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));