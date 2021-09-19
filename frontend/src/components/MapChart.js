import React, { memo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";
import Popup from "./Popup";

let canadaMap = require('../mapshapes/Canada_Map.json')

const MapChart = ({ setTooltipContent, callScrollApp, setRegionData }) => {
    const chartcallScrollApp = (nameOfProvince) => {
        callScrollApp(nameOfProvince);
    }
    return (
        <div style={{
            position: "relative",
            left: "0%",
            top: "30%",
            width: "100%",
            height: "100%",
            margin: "auto",
            padding: "auto",
            border: "solid",
        }}>
            <ComposableMap projection="geoMercator" data-tip="" width={1000} height={750} projectionConfig={{ scale: 300 }} disableZzoming disablepanning>
                <ZoomableGroup center={[270, 430]} disablezooming disablepanning>
                    <Geographies geography={canadaMap}>
                        {({ geographies }) => (
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    stroke="#FFF"
                                    geography={geo}
                                    fill="#DDD"
                                    onMouseEnter={() => {
                                        setTooltipContent(<Popup province={(geo.id).substring(3)} />)
                                    }}
                                    onClick={() => {
                                        chartcallScrollApp((geo.id).substring(3));
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        )}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default memo(MapChart);

