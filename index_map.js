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
var contenu = {
    content:'En la barra de la izquierda encontrarás más información sobre este mapa interactivo. Selecciona:<br> <i class="fa fa-info"></i> para consultar la descripción de las variables desplegadas.<br> "gráfico" para consultar un breve análisis de los datos.<br><br><small>Pronóstico emitido el 13.08.2021.</small>'
};
if (window.screen.width <= 768) { // Que no aparezca en celulares
    contenu.content = '<small><i>ADVERTENCIA: Este mapa aún no es 100 % compatible con la resolución de un teléfono. Si tienes problemas para visualizarlo, intenta abrirlo desde un ordenador o una tableta.</i></small><br><br>'
                      + contenu.content
}
var winOpts = L.control.window(map, {
    title:'¡BIENVENIDO!',
    ...contenu,
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

//<!------ Funciones ------>
//***** Mapas de colores y rangos
var getColorA = function(rrr) {
    return  rrr <= -0.60 ? 'rgb(166,097,026)':
            rrr <= -0.55 ? 'rgb(182,124,054)':
            rrr <= -0.50 ? 'rgb(198,152,082)':
            rrr <= -0.45 ? 'rgb(215,179,110)':
            rrr <= -0.40 ? 'rgb(230,209,159)':
            rrr <   0.40 ? 'rgb(255,255,255)':
            rrr <   0.45 ? 'rgb(202,231,226)':
            rrr <   0.50 ? 'rgb(152,213,204)':
            rrr <   0.55 ? 'rgb(113,197,184)':
            rrr <   0.60 ? 'rgb(085,181,166)':
                           'rgb(001,133,133)';
};
var getColorB = function(rrr) {
    // return  rrr <  -0.30 ? 'rgb(166,073,029)':
    //         rrr <  -0.20 ? 'rgb(180,110,022)':
    //         rrr <  -0.10 ? 'rgb(205,149,009)':
    //         rrr <   0.00 ? 'rgb(238,203,053)':
    //         rrr ==  0.00 ? 'rgba(001,133,133,0)':
    //         rrr <=  0.10 ? 'rgb(171,219,064)':
    //         rrr <=  0.20 ? 'rgb(079,179,024)':
    //         rrr <=  0.30 ? 'rgb(058,136,027)':
    //         rrr <=  0.40 ? 'rgb(041,093,029)':
    //                        'rgba(001,133,133,0)';
    return  rrr <  -0.30 ? 'rgb(166,094,061)':
            rrr <  -0.20 ? 'rgb(180,125,058)':
            rrr <  -0.10 ? 'rgb(205,158,048)':
            rrr <  -0.02 ? 'rgb(238,211,101)':
            rrr <   0.00 ? 'rgb(247, 255, 234)':
            rrr ==  0.00 ? 'rgb(247, 255, 234)':
            rrr <=  0.02 ? 'rgb(247, 255, 234)':
            rrr <=  0.10 ? 'rgb(185,219,106)':
            rrr <=  0.20 ? 'rgb(103,179,59)':
            rrr <=  0.30 ? 'rgb(077,136,054)':
            rrr <=  0.40 ? 'rgb(056,093,047)':
                           'rgba(239,240,240,1)';
    // return  rrr <  -0.30 ? 'rgb( 139, 0, 23)':
    //         rrr <  -0.20 ? 'rgb( 213, 55, 64 )':
    //         rrr <  -0.10 ? 'rgb( 234, 124, 106 )':
    //         rrr <   0.00 ? 'rgb( 246, 203, 183 )':
    //         rrr ==  0.00 ? 'rgba(001,133,133,0)':
    //         rrr <=  0.10 ? 'rgb( 190, 218, 232 )':
    //         rrr <=  0.20 ? 'rgb( 112, 177, 211 )':
    //         rrr <=  0.30 ? 'rgb( 56, 142, 190 )':
    //         rrr <=  0.40 ? 'rgb( 3, 82, 127 )':
    //                        'rgba(001,133,133,0)';
    // return  rrr <  -0.30 ? 'rgb(112,045,162)':
    //         rrr <  -0.20 ? 'rgb(147,060,213)':
    //         rrr <  -0.10 ? 'rgb(178,116,225)':
    //         rrr <   0.00 ? 'rgb(209,172,237)':
    //         rrr ==  0.00 ? 'rgba(001,133,133,0)':
    //         rrr <=  0.10 ? 'rgb(191,240,183)':
    //         rrr <=  0.20 ? 'rgb(148,230,134)':
    //         rrr <=  0.30 ? 'rgb(105,220,086)':
    //         rrr <=  0.40 ? 'rgb(082,169,066)':
    //                        'rgba(001,133,133,0)';
};

//***** Cuadro de informacion personalizada
var infoA  = L.control({position: 'bottomleft'}),
    infoB  = L.control({position: 'bottomleft'}),
    infoC  = L.control({position: 'bottomleft'});
infoA.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoA.update = function (props, varnombre) {
    this._div.innerHTML = '<h4>Probabilidad de categoría de precipitación</h4>' +
        (
            props ? '<b>' + props['NOM_MUN'] + '</b><br/>' +
            (
                props[varnombre] === 0 ? 'Neutral': Math.abs(props[varnombre]*100.0).toFixed(2) + ' %' +
                (props[varnombre] < 0 ? ' de ser más seco': ' de ser más húmedo')
            )
            : 'Selecciona un municipio'
        );                
};
infoB.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
infoB.update = function (props, varnombre) {
    this._div.innerHTML = '<h4>Cambio en rendimiento</h4>' +
        (
            props ? '<b>' + props['NOM_MUN'] + '</b><br/>' +
            (
                props[varnombre] == null ? 'Sin producción': (props[varnombre] >= 0 ? '+' : '') +
                (props[varnombre]*100.0).toFixed(2) + ' %'
            )
            : 'Selecciona un municipio'
        );                
};
infoC.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
infoC.update = function (props, varnombre) {
    this._div.innerHTML = '<h4>Cambio en rendimiento</h4>' +
        (
            props ? '<b>' + props['NOM_ENT'] + '</b><br/>' +
            (
                props[varnombre] == null ? 'Sin producción': (props[varnombre] >= 0 ? '+' : '') +
                (props[varnombre]*100.0).toFixed(2) + ' %'
            )
            : 'Selecciona un estado'
        );                
};
//***** Mouse hover function
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
            fillColor:   funco(properties[varnombre]),
            fillOpacity: 0.6,
            stroke:      true,
            fill:        true,
            color:      'gray',
            opacity:     1.0,
            weight:      2
        };
        capalayer.setFeatureStyle(properties.CVEGEO, style);
        currentInfo.update(properties, varnombre);
    })
    capalayer.on('mouseout', function(e) {
        var properties = e.layer.properties;
        clearHighlight(capalayer);
        currentInfo.update();
    })
};
//***** Pop-up
function popop(capalayer, varnombre, tipo){
    capalayer.on('click', function(e) {
        var properties = e.layer.properties;
        if (tipo === 'A'){
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
                    <td>' + (properties[varnombre] !== null ? (properties[varnombre] == 0 ? 'Neutral': 
                    Math.abs(properties[varnombre]*100.0).toFixed(2) + ' %') : '') + '</td>\
                </tr>\
            </table>';
        }
        else if (tipo === 'B'){
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
                        <th scope="row">Rendimiento</th>\
                        <td>' + (properties[varnombre] == null ? 'Sin producción': 
                        (properties[varnombre] >= 0 ? '+': '') + (properties[varnombre]*100.0).toFixed(2) + ' %') + '</td>\
                    </tr>\
                </table>';
        }
        else if (tipo === 'B2'){
            var popupContenti = '<table>\
                    <tr>\
                        <th scope="row">Estado</th>\
                        <td>' + (properties['NOM_ENT'] !== null ? properties['NOM_ENT'] : '') + '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Rendimiento</th>\
                        <td>' + (properties[varnombre] == null ? 'Sin producción': 
                        (properties[varnombre] >= 0 ? '+': '') + (properties[varnombre]*100.0).toFixed(2) + ' %') + '</td>\
                    </tr>\
                </table>';
        }
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
        grades = [-0.60, -0.55, -0.50, -0.45, -0.40, 0, 0.40, 0.45, 0.50, 0.55, 0.60],
        labels = ['> 60 %', '55 — 60 %', '50 — 55 %', '45 — 50 %', '40 — 45 %', 'Neutral', '40 — 45 %', '45 — 50 %', '50 — 55 %', '55 — 60 %', '> 60 %'];
    div.innerHTML += '<b>Probabilidad</b><br>';
    div.innerHTML += '<i style= "background: '+'rgba(255,255,255,0.0)'+' "></i>' + '<em>Más seco</em><br>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style= "background:' + getColorA(grades[i]) + '" ></i>' + labels[i] + '<br>';
    }
    div.innerHTML += '<i style= "background: '+'rgba(255,255,255,0.0)'+' "></i>' + '<em>Más húmedo</em><br>';
    return div;
};
legendB.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0.4, 0.3, 0.2, 0.1, 0.0, -0.1, -0.2, -0.3, -0.4],
        labels = ['&nbsp;> 30 %', '&nbsp;20 — 30 %', '&nbsp;10 — 20 %', '&nbsp;&nbsp;&nbsp;2 — 10 %', 'Sin cambio', '&nbsp;&nbsp;-2 — -10 %', '-10 — -20 %', '-20 — -30 %', '< -30 %'];
    div.innerHTML += '<b>Cambio en <br>rendimiento</b><br>';
    div.innerHTML += '<i style= "background: '+'rgba(255,255,255,0.0)'+' "></i>' + '<em>Incremento</em><br>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style=" background:'+getColorB(grades[i])+' "></i>' + labels[i] + '<br>';
    }
    div.innerHTML += '<i style=" background:'+'rgba(255,255,255,0.0)'+' "></i>' + '<em>Decremento</em><br>';
    return div;
};

//<!------ Protobuf Tiles (Estilos) ------>
//***** Estilos
const estilillo = {
    fill: true,
    fillOpacity: 1.0,
    stroke: true,
    color: 'gray',
    opacity: 0.7,
    weight: 0.3
};
var estail_states = {
    divpolest: function(zoom) {
        return {
            fill:    false,
            stroke:  true,
            color:  'gray',
            opacity: 0.7,
            weight:  1.4
        }
    }
}
function vectorTileStylingF(funco, varnombre){
    var estail = {
        pce_2021_08a: function(properties, zoom) {
            return {
                ...estilillo,
                fillColor:   funco(properties[varnombre])
            }
        },
        pce_2021_08b: function(properties, zoom) {
            return {
                ...estilillo,
                fillColor:   funco(properties[varnombre])
            }
        }
    }
    return estail;
};

//<!------ Protobuf Tiles (Capas) ------>
//*****  Teselas con fronteras estatales
map.createPane('states');
map.getPane('states').style.zIndex = 600;
map.getPane('states').style.pointerEvents = 'none';
var pbfStates = L.vectorGrid.protobuf('data/divpolest/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: estail_states,
    interactive: false,
    pane: 'states'
})
.addTo(map);
//*****_____ Variable A: Precipitación _____*****
var nombredearch = 'pce_2021_08a';
//***** Capa 1
var ivo = '_ppt_ago-dic';
var pbfUn = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
    vectorTileLayerStyles: vectorTileStylingF(getColorA,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
hoveruber(pbfUn, getColorA, nombredearch+ivo);
popop(pbfUn, nombredearch+ivo, 'A');
//***** Capa 2
var ivo = '_ppt_ago';
var pbfDeux = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorA,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
hoveruber(pbfDeux, getColorA, nombredearch+ivo);
popop(pbfDeux, nombredearch+ivo, 'A');
//***** Capa 3
var ivo = '_ppt_sep-oct';
var pbfTrois = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorA,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
hoveruber(pbfTrois, getColorA, nombredearch+ivo);
popop(pbfTrois, nombredearch+ivo, 'A');
//***** Capa 4
var ivo = '_ppt_nov-dic';
var pbfQuatre = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorA,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
hoveruber(pbfQuatre, getColorA, nombredearch+ivo);
popop(pbfQuatre, nombredearch+ivo, 'A');
//*****_____ Variable B: Maiz palomero _____*****
// var nombredearch = 'pce_2021_08a';
//***** Capa 1_B
var ivo = '_mai_r_riego';
var pbfUnB = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
    vectorTileLayerStyles: vectorTileStylingF(getColorB,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
hoveruber(pbfUnB, getColorB, nombredearch+ivo);
popop(pbfUnB, nombredearch+ivo, 'B');
//***** Capa 2_B
var ivo = '_mai_t_temporal';
var pbfDeuxB = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorB,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
    hoveruber(pbfDeuxB, getColorB, nombredearch+ivo);
    popop(pbfDeuxB, nombredearch+ivo, 'B');
//*****_____ Variable B2: Palomitas de maiz _____*****
var nombredearch = 'pce_2021_08b';
//***** Capa 3_B
var ivo = '_mai_riego';
var pbfTroisB = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
    vectorTileLayerStyles: vectorTileStylingF(getColorB,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
    hoveruber(pbfTroisB, getColorB, nombredearch+ivo);
    popop(pbfTroisB, nombredearch+ivo, 'B2');
//***** Capa 4_B
var ivo = '_mai_temporal';
var pbfQuatreB = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorB,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
    hoveruber(pbfQuatreB, getColorB, nombredearch+ivo);
    popop(pbfQuatreB, nombredearch+ivo, 'B2');
//***** Capa 5_B
var ivo = '_mai_total';
var pbfCinqB = L.vectorGrid.protobuf('data/'+nombredearch+'/{z}/{x}/{y}.pbf', {
	vectorTileLayerStyles: vectorTileStylingF(getColorB,nombredearch+ivo),
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.CVEGEO;
    }
});
    hoveruber(pbfCinqB, getColorB, nombredearch+ivo);
    popop(pbfCinqB, nombredearch+ivo, 'B2');

//<!------ Menu de capas ------>
// var baseMaps = {
//     'Precipitación: 2021 Jul-Nov': pbfUn,
//     'Precipitación: 2021 Jul': pbfDeux,
//     'Precipitación: 2021 Ago-Sep': pbfTrois,
//     'Precipitación: 2021 Oct-Nov': pbfQuatre
// };
// L.control.layers(baseMaps,null,{collapsed:false}).addTo(map);
var baseMaps = [
    {
        groupName : "Maíz: PV",
        expanded  : true,
        layers    : {
            "Riego :: Municipal"    : pbfUnB,
            "Riego :: Estatal"      : pbfTroisB,
            "Temporal :: Municipal" : pbfDeuxB,
            "Temporal :: Estatal"   : pbfQuatreB,
            "Total :: Estatal"      : pbfCinqB
        }
    },{ 
        groupName : "Precipitación",
        expanded  : true,
        layers    : {
            "Agosto a diciembre"    : pbfUn,
            "Agosto"                : pbfDeux,
            "Septiembre y octubre"  : pbfTrois,
            "Noviembre y diciembre" : pbfQuatre
        }
    }
];
var layeroptions = {
    // container_width     : "160px", //default = automatic
    // container_maxHeight : "400px", //default = automatic
    // group_maxHeight     : "400px", //default = 100px
    exclusive           : false,
    collapsed           : false
};
var control = L.Control.styledLayerControl(baseMaps,null,layeroptions);
map.addControl(control);

//<!------ Cambio de leyenda ------>
currentLegend = legendB;
// map.on('baselayerchange', function (eventLayer) {
//     if (eventLayer.name === 'Agosto a diciembre') {
//         map.removeControl(currentLegend);
//         currentLegend = legendA;
//         legendA.addTo(map);
//     }
//     else if  (eventLayer.name === 'Agosto a diciembre ') {
//         map.removeControl(currentLegend);
//         currentLegend = legendB;
//         legendB.addTo(map);
//     }
// })
map.on('layeradd', function (eventLayer) {
    if (eventLayer.layer === pbfUn || eventLayer.layer === pbfDeux ||
        eventLayer.layer === pbfTrois || eventLayer.layer === pbfQuatre) {
        map.removeControl(currentLegend);
        currentLegend = legendA;
        legendA.addTo(map);
    }
    else if  (eventLayer.layer === pbfUnB || eventLayer.layer === pbfDeuxB ||
              eventLayer.layer === pbfTroisB || eventLayer.layer === pbfQuatreB || eventLayer.layer === pbfCinqB) {
        map.removeControl(currentLegend);
        currentLegend = legendB;
        legendB.addTo(map);
    }
})

//<!------ Cambio de cuadro de información ------>
currentInfo = infoB;
if (window.screen.width > 768) { // Que no aparezca info en celulares
    infoB.addTo(map);
    map.on('layeradd', function (eventLayer) {
        if (eventLayer.layer === pbfUn || eventLayer.layer === pbfDeux ||
            eventLayer.layer === pbfTrois || eventLayer.layer === pbfQuatre) {
            map.removeControl(currentInfo);
            currentInfo = infoA;
            infoA.addTo(map);
        }
        else if  (eventLayer.layer === pbfUnB || eventLayer.layer === pbfDeuxB) {
            map.removeControl(currentInfo);
            currentInfo = infoB;
            infoB.addTo(map);
        }
        else if  (eventLayer.layer === pbfTroisB || eventLayer.layer === pbfQuatreB || eventLayer.layer === pbfCinqB) {
            map.removeControl(currentInfo);
            currentInfo = infoC;
            infoC.addTo(map);
  }
    })
}

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

legendB.addTo(map);
map.addLayer(pbfDeuxB);