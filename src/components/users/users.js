import React from 'react';
import { User } from "../user/user";
import { useSelector } from "react-redux";
import { getUsers } from "./users.selectors";

export const Users = () => {
    const { data, error } = useSelector(state => getUsers(state));
    if (error) return null;
    return data.map((item => {
        return (
            <User {...item} />
        )
    }));
};
