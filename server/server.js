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

import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
import "regenerator-runtime/runtime.js";
import 'dotenv';

import FileCookieStore from 'tough-cookie-filestore2';
import Instagram from 'instagram-web-api';

const app = express();
// const router = express.Router();
const PORT = 3000;
const cookieStore = new FileCookieStore('./cookies.json');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login',  (request, response) => {
    // const username = process.env.instagram_username;
    // const password = process.env.instagram_password;
    const client = new Instagram({ username: 'jessewollin', password: 'Ingres#1865', cookieStore });
    return client.login({ username: 'jessewollin', password: 'Ingres#1865' }).then(({ authenticated }) => {
        // todo fix response username and passwords
        response.json({ authenticated, username: 'jessewollin', name: 'Jesse Wollin' });
    });
});

app.post('/user',  (request, response) => {
    const client = new Instagram({username: 'jessewollin', password: 'Ingres#1865', cookieStore});
    return client.getUserByUsername({ username: 'jessewollin' }).then((data) => {
        console.log(
            '**********data**********\n',
            data,
            '\n**********data**********\n',
        )
    });
});

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));