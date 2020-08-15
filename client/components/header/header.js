import React from 'react';

export const Header = ({ Element, text, className }) => {
    return Element ? <Element className={className}>{text}</Element> : text;
};