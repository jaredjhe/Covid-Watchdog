import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import "../styles/stylesTest.css";
import FullRegions from "./FullRegions";

import MapChart from "./MapChart";

const TestMap = (props) => {
    const [content, setContent] = useState("");
    const callbackScrollApp = (nameOfProvince) => {
        props.callScrollApp(nameOfProvince);
    }
    return (
        <div>
            <MapChart setTooltipContent={setContent} callScrollApp={callbackScrollApp} />
            <ReactTooltip>
                {content}
            </ReactTooltip>
        </div>
    );
}

export default TestMap;