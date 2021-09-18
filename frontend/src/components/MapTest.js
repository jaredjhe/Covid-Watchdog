import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import "../styles/stylesTest.css";
import FullRegions from "./FullRegions";

import MapChart from "./MapChart";

const TestMap = () => {
    const [content, setContent] = useState("");
    return (
        <div>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>
                {content}
            </ReactTooltip>
        </div>
    );
}

export default TestMap;