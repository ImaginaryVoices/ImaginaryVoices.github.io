//<!------ Crear Mapa ------>
var map = L.map('map', {
    center: [23.946, -101.975],
    zoomControl:true,
    zoom:6,
    maxZoom:10,
    minZoom:5,
    fullscreenControl: true
})
atribuciones = '<a href="https://climathics.com">Climathics</a> | \
            <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> \
            &middot; &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> \
            &middot; &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
var hash = new L.Hash(map);     //URL dinamica
map.attributionControl.setPrefix(atribuciones);
map.fitBounds([[14.5388286402, -117.12776], [32.72083, -86.811982388]]);
map.setMaxBounds([[09.5388286402, -122.12776], [37.72083, -81.811982388]]);


//<!------ Mapbox Vector Tiles ------>
//***** Fondo
var mapboxAccessToken = 'pk.eyJ1IjoiY2xpbWF0aGljcyIsImEiOiJja2ppc25rdm0xb3F5MzBwOGR2Z2YyMGZ3In0._2aZcvbiTMAnz3XNAfRJAw';
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'climathics/ckhbdu5h6063419o5rmbb27ae',
    tileSize: 512,
    zoomOffset: -1
})
.addTo(map);
//*****  Enfrente (Tesela con los nombres)
map.createPane('labelsi');
map.getPane('labelsi').style.zIndex = 650;
map.getPane('labelsi').style.pointerEvents = 'none';
var positronLabels = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'climathics/ckhipfem70mwy19noba54m2by',
    pane: 'labelsi',
    tileSize: 512,
    zoomControl:true,
    maxZoom:10,
    minZoom:5,
    zoomOffset: -1
})
.addTo(map);


//<!------ Funciones ------>
//***** Mapas de colores y rangos
var getColorA = function(rrr) {
    return  rrr <= -0.55 ? 'rgba(166,97,26,1.0)':
            rrr <= -0.50 ? 'rgba(182,124,54,1.0)':
            rrr <= -0.45 ? 'rgba(198,152,82,1.0)':
            rrr <= -0.40 ? 'rgba(215,179,110,1.0)':
            rrr <= -0.32 ? 'rgba(230,209,159,1.0)':
            rrr <= 0.32 ? 'rgba(255,255,255,1.0)':
            rrr <= 0.40 ? 'rgba(202,231,226,1.0)':
            rrr <= 0.45 ? 'rgba(152,213,204,1.0)':
            rrr <= 0.50 ? 'rgba(113,197,184,1.0)':
            rrr <= 0.55 ? 'rgba(85,181,166,1.0)':
            rrr <= 1.00 ? 'rgba(57,165,148,1.0)':
                         'rgba(213,231,37,1.0)';
};
// var getColorB = function(rrr) {
//     return  rrr >= 30000 ? '#006837':
// 		    rrr >= 24000 ? '#188645':
// 			rrr >= 20000 ? '#31a354':
// 			rrr >= 16000 ? '#54b566':
//             rrr >= 12000 ? '#78c679':
//             rrr >= 80000 ? '#9dd689':
//             rrr >= 40000 ? '#c2e699':
//                          '#e1f3b3';
// };
//***** Estilo general
const estilillo = {
    fill: true,
    fillOpacity: 1.0,
    stroke: true,
    color: 'gray',
    opacity: 0.7,
    weight: 0.3
};
// //***** Cuadro de informacion personalizada
var info   = L.control({position: 'bottomleft'});
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.update = function (props, varnombre) {
    this._div.innerHTML = '<h4>Probabilidad de categoría de precipitación</h4>' +  (props ?
        '<b>' + props['NOM_MUN'] + '</b><br />' + (sqrt(props[varnombre])*100.0).toFixed(2) + ' %'
        : 'Selecciona un municipio');
};
// //***** Mouse hover function
var highlight;
var clearHighlight = function(capalayer) {
    if (highlight) {
        capalayer.resetFeatureStyle(highlight);
    }
    highlight = null;
};
function hoveruber(capalayer, funco, varnombre){
    capalayer.on('mouseover', function(e) {
        var properties = e.layer.properties;
        clearHighlight(capalayer);
        highlight = properties.CVEGEO;
        var style = {
            fillColor: funco(properties[varnombre]),
            fillOpacity: 0.6,
            stroke: true,
            fill: true,
            color: 'gray',
            opacity: 1.0,
            weight: 2
        };
        capalayer.setFeatureStyle(properties.CVEGEO, style);
        info.update(properties, varnombre);
    })
    capalayer.on('mouseout', function(e) {
        var properties = e.layer.properties;
        clearHighlight(capalayer);
        info.update();
    })
};
// //***** Pop-up
function popop(capalayer, varnombre){
    capalayer.on('click', function(e) {
        var properties = e.layer.properties;
        var popupContenti = '<table>\
                <tr>\
                    <th scope="row">Estado</th>\
                    <td>' + (properties['NOM_ENT'] !== null ? properties['NOM_ENT'] : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row">Municipio</th>\
                    <td>' + (properties['NOM_MUN'] !== null ? properties['NOM_MUN'] : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row">Probabilidad</th>\
                    <td>' + (properties[varnombre] !== null ? (properties[varnombre]*100.0).toFixed(2) + ' %' : '') + '</td>\
                </tr>\
            </table>';
        L.popup()
            .setContent(popupContenti)
            .setLatLng(e.latlng)
            .openOn(map);
    })    
};
//***** Leyenda
var legendA = L.control({position: 'bottomright'}),
    legendB = L.control({position: 'bottomright'});
legendA.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-0.55, -0.50, -0.45, -0.40, 0, 0.40, 0.45, 0.50, 0.55],
        labels = ['>55 %', '50 — 55 %', '45 — 50 %', '40 — 45 %', 'Otros', '40 — 45 %', '45 — 50 %', '50 — 55 %', '>55 %'];
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style= "background:' + getColorA(grades[i]) + '" ></i>' +
            labels[i] + '<br>';
    }
    return div;
};
legendB.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-0.55, -0.50, -0.45, -0.40, 0, 0.40, 0.45, 0.50, 0.55],
        labels = [-0.55, -0.50, -0.45, -0.40, 0, 0.40, 0.45, 0.50, 0.55];
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style= "background:' + getColorB(grades[i]) + '" ></i>' +
            labels[i] + ( grades[i+1] ? ' &ndash; ' + labels[i+1] + '<br>' : ' +' );
    }
    return div;
};


//<!------ Protobuf Tiles (.pbf) ------>
//***** Estilos
function vectorTileStylingF(funco, varnombre){
    var estail = {
        PR_pron: function(properties, zoom) {
            return {
                ...estilillo,
                fillColor: funco(properties[varnombre])
            }
        }
    }
    return estail;
};
//***** Capa 1
var pbfUn = L.vectorGrid.protobuf('data/PR_pron/{z}/{x}/{y}.pbf', {
    vectorTileLayerStyles: vectorTileStylingF(getColorA,'PR_pron_Val'),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
})
.addTo(map);
hoveruber(pbfUn, getColorA, 'PR_pron_Val');
popop(pbfUn, 'PR_pron_Val');
//***** Capa 2
// var pbfDeux = L.vectorGrid.protobuf('data/Datos_2019/{z}/{x}/{y}.pbf', {
// 	vectorTileLayerStyles: vectorTileStylingF(getColorB,'CVEGEO'),
//     interactive: true,
//     getFeatureId: function(f) {
//         return f.properties.CVEGEO;
//     }
// });
// hoveruber(pbfDeux, getColorB, 'CVEGEO');
// popop(pbfDeux, 'CVEGEO');


//<!------ Menu de capas ------>
var baseMaps = {
    "Precipitación": pbfUn,
    //"CVEGEO": pbfDeux
};
L.control.layers(baseMaps).addTo(map);
info.addTo(map);
legendA.addTo(map);
currentInfo   = info;
currentLegend = legendA;
map.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === 'Precipitación') {
        map.removeControl(currentLegend);
        currentLegend = legendA;
        legendA.addTo(map);
    }
    // else if  (eventLayer.name === 'CVEGEO') {
    //     map.removeControl(currentLegend);
    //     currentLegend = legendB;
    //     legendB.addTo(map);
    // }
})


//<!------ Logo Banner ------>
var credctrl = L.controlCredits({
    image: "css/images/climathics_banner_nano.png",
    link: "https://climathics.com/",
    width: 262,
    height: 62,
}).addTo(map);