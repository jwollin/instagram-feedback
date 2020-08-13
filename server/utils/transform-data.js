// import { get } from 'lodash';

export const transformData = (data) => {
    const {
        biography,
        external_url,
        edge_followed_by,
        followed_by_viewer,
        full_name,
        has_guides,
        highlight_reel_count,
        is_business_account,
        business_category_name,
        overall_category_name,
        edge_mutual_followed_by,
        profile_pic_url,
        username,
        edge_owner_to_timeline_media: medias
    } = data;

    const transformedData = {
        biography,
        external_url,
        edge_followed_by,
        followed_by_viewer,
        full_name,
        has_guides,
        highlight_reel_count,
        is_business_account,
        business_category_name,
        overall_category_name,
        edge_mutual_followed_by,
        profile_pic_url,
        username
    };

    if (Array.isArray(medias.edges) && medias.edges.length) {
        transformedData.media = medias.edges.map(({
            node: {
                dimensions,
                owner: {
                    username: owner
                },
                is_video,
                accessibility_caption: alt,
                taken_at_timestamp: timestamp,
                edge_liked_by: {
                    count: likes
                },
                // location
                thumbnail_src: thumbnail
            }
        }) => {
            const date = new Date(timestamp * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            return ({
                dimensions,
                owner,
                is_video,
                alt,
                likes,
                thumbnail,
                timestamp: formattedTime
            });
        });
    }

    return transformedData;
};



// var date = new Date(unix_timestamp * 1000);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();
//
// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
//
// console.log(formattedTime);


