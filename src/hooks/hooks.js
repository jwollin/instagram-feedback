import React, { useState } from 'react';

export const useToggle = (initialValue = false) => {
    const [bool, setBool] = useState(initialValue);

    const toggle = () => setBool(!bool);
    return [bool, toggle];
};