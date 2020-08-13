import React from "react";
import { useSelector } from "react-redux";
import { getShowSpinner } from "./spinner.selectors"
import { Spinner } from 'reactstrap';

export const SpinnerOverlay = () => {
    const showing = useSelector(state => getShowSpinner(state));

    return showing ? (
        <div className={`spinner-overlay ${showing}`}>
            <div className="spinner" role="status">
                <Spinner type="primary" />
            </div>
        </div>
    ) : null;
};