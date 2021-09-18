import React, { memo, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";

// const canadaMap = import('../mapshapes/lpr_000b16a_e.json')
// import * as data from '../mapshapes/lpr_000b16a_e.json';

let canadaMap = require('../mapshapes/Canada_Map.json')
let ontarioMap = require('../mapshapes/Ontario_Map.json')
let kenoraMap = require('../mapshapes/Kenora.json')

const MapChart = ({ setTooltipContent }) => {
    // TODO
    const [detail, setDetail] = useState(false);
    // TODO
    const [paths, setPaths] = useState()
    // switchPaths (needed so that when the user zooms in, it goes to another map)
    const switchPaths = () => {

    }
    return (
        <div>
            <ComposableMap projection="geoMercator" data-tip="" projectionConfig={{ scale: 300 }}>
                <ZoomableGroup center={[250, 425]}>
                    <Geographies geography={canadaMap}>
                        {({ geographies }) => (
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    stroke="#FFF"
                                    geography={geo}
                                    fill="#DDD"
                                    onClick={switchPaths}
                                    onMouseEnter={() => {
                                        const { name } = geo.properties;
                                        setTooltipContent(name)
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
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

