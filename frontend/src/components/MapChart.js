import React, { memo, useState, useRef } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import FullRegions from "./FullRegions";
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
                                    // onClick={switchPaths}
                                    onMouseEnter={() => {
                                        const { name } = geo.properties;
                                        console.log(geo);
                                        console.log((geo.id).substring(3));
                                        setTooltipContent(<Popup province={(geo.id).substring(3)} />)
                                    }}
                                    onClick={() => {
                                        const { name } = geo.properties;
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
        // <div>
        //     <ComposableMap>
        //         <ZoomableGroup zoom={1}>
        //             <Geographies geography={ontarioMap}>
        //                 {({ geographies }) => {
        //                     console.log(geographies);
        //                     geographies.map(geo => {
        //                         console.log(geo);
        //                         <Geography key={geo.rsmKey} geography={geo} />
        //                     })
        //                 }}
        //             </Geographies>
        //         </ZoomableGroup>
        //     </ComposableMap>
        // </div>
    );
};
// const geoUrl =
//     "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const rounded = num => {
//     if (num > 1000000000) {
//         return Math.round(num / 100000000) / 10 + "Bn";
//     } else if (num > 1000000) {
//         return Math.round(num / 100000) / 10 + "M";
//     } else {
//         return Math.round(num / 100) / 10 + "K";
//     }
// };

// const MapChart = ({ setTooltipContent }) => {
//     return (
//         <>
//             <ComposableMap width="1200" style={{ width: "100%" }} data-tip="" projectionConfig={{ scale: 200 }}>
//                 <ZoomableGroup>
//                     <Geographies geography={geoUrl}>
//                         {({ geographies }) =>
//                             geographies.map(geo => (
//                                 <Geography
//                                     key={geo.rsmKey}
//                                     geography={geo}
//                                     onMouseEnter={() => {
//                                         const { NAME, POP_EST } = geo.properties;
//                                         setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
//                                     }}
//                                     onMouseLeave={() => {
//                                         setTooltipContent("");
//                                     }}
//                                     style={{
//                                         default: {
//                                             fill: "#D6D6DA",
//                                             outline: "none"
//                                         },
//                                         hover: {
//                                             fill: "#F53",
//                                             outline: "none"
//                                         },
//                                         pressed: {
//                                             fill: "#E42",
//                                             outline: "none"
//                                         }
//                                     }}
//                                 />
//                             ))
//                         }
//                     </Geographies>
//                 </ZoomableGroup>
//             </ComposableMap>
//         </>
//     );
// };

export default memo(MapChart);
// export default MapChart;

