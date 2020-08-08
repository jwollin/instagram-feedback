import { useSelector } from "react-redux";
import { getShowSpinner } from "./spinner.selectors"
import React from "react";

export const Spinner = () => {
    const showing = useSelector(state => getShowSpinner(state));
    return showing ? <div className="spinner" /> : null;
};