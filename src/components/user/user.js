import React from 'react';
import {UserMedia} from "../user-media/user-media";

export const User = (props) => {
    const {
        biography = '',
        external_url = '',
        edge_followed_by: {
            count = 0,
        },
        followed_by_viewer = false,
        full_name = '',
        profile_pic_url = '',
        username,
        media,
    } = props;
    
    return (
        <div>
            {full_name && <h3>{full_name}</h3>}
            {username && (
                <div>
                    {username}
                    {count && (
                        <>
                            <span>&nbsp;{count}</span>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                        </>
                    )}
                </div>
            )}
            {profile_pic_url && <img src={profile_pic_url} alt=""/>}
            {external_url && <a href={external_url}>Website</a>}
            {biography && <p>{biography}</p>}
            {media && (
                <div className="media-container">
                    <UserMedia media={media} />
                </div>
            )}
        </div>
    );
};
