//resources/js/Loading/Loader.jsx
import React from "react";
import "./Loader.css";

export default function Loader({
    size = 15,
    color1 = "currentColor",
    color2 = "#e5e5e5",
    className = "",
}) {
    return (
        <span
            className={`loader ${className}`}
            style={{
                "--loader-size": `${size}px`,
                "--loader-color-1": color1,
                "--loader-color-2": color2,
            }}
            aria-label="Loading"
            role="status"
        />
    );
}