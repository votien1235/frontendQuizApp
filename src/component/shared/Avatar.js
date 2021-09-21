import React from "react";

const DEFAULT_IMAGE = "/defaultUser.png";

export const Avatar = (props) => {
    const { src, size } = props;
    const sizeMap = {
        xl: 100,
        lg: 45,
        md: 30,
        sm: 25,
        xs: 15
    }

    const sizeInPixel = size ? sizeMap[size] : sizeMap["md"]

    return (<img className="rounded-circle border" style={{
        width: sizeInPixel,
        height: sizeInPixel
    }} src={src ? src : DEFAULT_IMAGE} alt="" />)
};