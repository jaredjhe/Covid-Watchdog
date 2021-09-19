import React, { memo } from "react";
import { scroller } from 'react-scroll';
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
            width: "55%",
            height: "100%",
            margin: "auto",
            padding: "auto",
        }}>
            <ComposableMap projection="geoMercator" data-tip="" width={1000} height={750} projectionConfig={{ scale: 350 }}>
                <ZoomableGroup center={[270, 430]} minZoom={1} maxZoom={1}>
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
                                        scroller.scrollTo('full-regions', {
                                            duration: 1500,
                                            delay: 100,
                                            smooth: true,});
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#773d9c",
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: '#56008c',
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: '#56008c',
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

