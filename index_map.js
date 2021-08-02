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
var sidebar = L.control.sidebar('sidebar').addTo(map);

//<!------ Ventana con mensaje de inicio ------>
var winOpts = L.control.window(map, {
    title:'¡Bienvenido!',
    content:'Si te interesa obtener más detalles sobre este mapa interactivo, revisa el menú de información de la izquierda.<br><br><small><i>*Este mapa no es 100 % compatible con la resolución de un teléfono móvil. Si tienes problemas para visualizarlo, intenta abrirlo desde un ordenador o una tableta.</i></small>',
    modal: true,
    maxWidth: 400,
    visible: true
}).prompt({callback:function(){}})

//<!------ Mapbox Vector Tiles ------>
//***** Fondo
// var mapboxAccessToken = 'pk.eyJ1IjoiY2xpbWF0aGljcyIsImEiOiJja2ppc25rdm0xb3F5MzBwOGR2Z2YyMGZ3In0._2aZcvbiTMAnz3XNAfRJAw';
var mapboxAccessToken = 'pk.eyJ1IjoiY2xpbWF0aGljcyIsImEiOiJja2k1Z3BnY2wzd3QwMnJybTY1bjJvY2s3In0.s6hymqVgILyMRjbGnZKWQA';
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'climathics/ckhbdu5h6063419o5rmbb27ae',
    tileSize: 512,
    zoomOffset: -1
})
.addTo(map);
//*****  Enfrente (Tesela con nombres)
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
//*****  Más enfrente (Tesela con fronteras estatales)
map.createPane('labelsf');
map.getPane('labelsf').style.zIndex = 1600;
map.getPane('labelsf').style.pointerEvents = 'none';
var positronLabels = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'climathics/ckrnuddhn0thc18p0s58igpot',
    pane: 'labelsf',
    tileSize: 5120,
    zoomControl:true,
    maxZoom:10,
    minZoom:5,
    zoomOffset: +1
})
.addTo(map);


//<!------ Funciones ------>
//***** Mapas de colores y rangos
var getColorA = function(rrr) {
    return  rrr <= -0.80 ? 'rgb(166,97,26)':
            rrr <= -0.70 ? 'rgb(182,124,54)':
            rrr <= -0.60 ? 'rgb(198,152,82)':
            rrr <= -0.50 ? 'rgb(215,179,110)':
            rrr <= -0.40 ? 'rgb(230,209,159)':
//            rrr <= -0.32 ? 'rgb(255,255,255)':
//            rrr <= 0.32 ? 'rgb(255,255,255)':
            rrr <  0.40 ? 'rgb(255,255,255)':
            rrr <  0.50 ? 'rgb(202,231,226)':
            rrr <  0.60 ? 'rgb(152,213,204)':
            rrr <  0.70 ? 'rgb(113,197,184)':
            rrr <  0.80 ? 'rgb(85,181,166)':
            rrr <= 1.00 ? 'rgb(1,133,133)':
                        'rgb(213,231,37)';
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
    this._div.innerHTML = '<h4>Probabilidad de categoría de precipitación</h4>' +
        (props ? '<b>' + props['NOM_MUN'] + '</b><br/>' +
        (props[varnombre] === 0 ? 'Neutro': Math.abs(props[varnombre]*100.0).toFixed(2) + ' %' +
        (props[varnombre] < 0 ? ' de ser más seco': ' de ser más húmedo')) : 'Selecciona un municipio');                
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
                    <td>' + (properties[varnombre] !== null ? (properties[varnombre] == 0 ? 'Neutro':
                        Math.abs(properties[varnombre]*100.0).toFixed(2) + ' %') : '') + '</td>\
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
        // grades = [-0.60, -0.55, -0.50, -0.45, -0.40, 0, 0.40, 0.45, 0.50, 0.55, 0.60],
        // labels = ['>60 %', '55 — 60 %', '50 — 55 %', '45 — 50 %', '40 — 45 %', 'Neutro', '40 — 45 %', '45 — 50 %', '50 — 55 %', '55 — 60 %', '>60 %'];
        grades = [-0.70, -0.60, -0.50, -0.40, 0, 0.40, 0.50, 0.60, 0.70],
        labels = ['70 — 80 %', '60 — 70 %', '50 — 60 %', '40 — 50 %', 'Neutro', '40 — 50 %', '50 — 60 %', '60 — 70 %', '70 — 80 %'];
        div.innerHTML += '<b>Probabilidad</b><br>'
    div.innerHTML += '<i style= "background: '+'rgba(255,255,255,0.65)'+' "></i>' + '<i>Más seco</i><br>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style= "background:' + getColorA(grades[i]) + '" ></i>' + labels[i] + '<br>';
    }
    div.innerHTML += '<i style= "background: '+'rgba(255,255,255,0.4)'+' "></i>' + 'Más húmedo<br>';
    return div;
};
// legendB.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [-0.55, -0.50, -0.45, -0.40, 0, 0.40, 0.45, 0.50, 0.55],
//         labels = [-0.55, -0.50, -0.45, -0.40, 0, 0.40, 0.45, 0.50, 0.55];
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style= "background:' + getColorB(grades[i]) + '" ></i>' +
//             labels[i] + ( grades[i+1] ? ' &ndash; ' + labels[i+1] + '<br>' : ' +' );
//     }
//     return div;
// };


//<!------ Protobuf Tiles (.pbf) ------>
//***** Estilos
function vectorTileStylingF(funco, varnombre){
    var estail = {
        pce_2021_07_11_ppt: function(properties, zoom) {
            return {
                ...estilillo,
                fillColor: funco(properties[varnombre])
            }
        }
    }
    return estail;
};
const nombredearch = 'pce_2021_07_11_ppt';
//***** Capa 1
var ivo = '_jul-nov';
var pbfUn = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
    vectorTileLayerStyles: vectorTileStylingF(getColorA,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
})
.addTo(map);
hoveruber(pbfUn, getColorA, nombredearch+ivo);
popop(pbfUn, nombredearch+ivo);
//***** Capa 2
var ivo = '_jul';
var pbfDeux = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorA,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
hoveruber(pbfDeux, getColorA, nombredearch+ivo);
popop(pbfDeux, nombredearch+ivo);
//***** Capa 3
var ivo = '_ago-sep';
var pbfTrois = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorA,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
hoveruber(pbfTrois, getColorA, nombredearch+ivo);
popop(pbfTrois, nombredearch+ivo);
//***** Capa 4
var ivo = '_oct-nov';
var pbfQuatre = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorA,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
hoveruber(pbfQuatre, getColorA, nombredearch+ivo);
popop(pbfQuatre, nombredearch+ivo);


//<!------ Menu de capas ------>
// var baseMaps = {
//     'Precipitación: 2021 Jul-Nov': pbfUn,
//     'Precipitación: 2021 Jul': pbfDeux,
//     'Precipitación: 2021 Ago-Sep': pbfTrois,
//     'Precipitación: 2021 Oct-Nov': pbfQuatre
// };
// L.control.layers(baseMaps,null,{collapsed:false}).addTo(map);
if (window.screen.width > 768) { // Que no aparezca en celulares
    info.addTo(map);
}
legendA.addTo(map);
// currentInfo   = info;
// currentLegend = legendA;
// map.on('baselayerchange', function (eventLayer) {
//     if (eventLayer.name === 'Precipitación Jun-Oct') {
//         map.removeControl(currentLegend);
//         currentLegend = legendA;
//         legendA.addTo(map);
//     }
//     else if  (eventLayer.name === 'Precipitación Jun') {
//         map.removeControl(currentLegend);
//         currentLegend = legendA;
//         legendA.addTo(map);
//     }
// })
map.addLayer(pbfUn);
var baseMaps = [
    { 
        groupName : "Precipitación",
        expanded  : true,
        layers    : {
            "Julio a noviembre"   : pbfUn,
            "Julio"               : pbfDeux,
            "Agosto a septiembre" : pbfTrois,
            "Octubre a noviembre" : pbfQuatre
        }
    }
];
var layeroptions = {
    container_width 	: "160px",
    exclusive       	: true,
    collapsed           : false
};
var control = L.Control.styledLayerControl(baseMaps,null,layeroptions);
map.addControl(control);

//<!------ Logo Banner ------>
var credctrl = L.controlCredits({
    image: "css/images/climathics_banner_nano.png",
    link: "https://climathics.com/",
    width: 262,
    height: 62,
})
if (window.screen.width > 768) { // Que no aparezca en celulares
    credctrl.addTo(map);
}