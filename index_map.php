<!doctype html>
<html lang='en'>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width'>
        <meta name='mobile-web-app-capable' content='yes'>
        <meta name='apple-mobile-web-app-capable' content='yes'>
        <link rel='stylesheet' href='css/leaflet.css'> <!--https://unpkg.com/leaflet@1.7.1/dist/leaflet.css -->
        <link rel='stylesheet' href='css/leaflet.fullscreen.css'  />
        <link rel='stylesheet' href='css/leaflet-control-credits.css' />
        <link rel='stylesheet' href='css/leaflet-sidebar.css' />
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'>
        <link rel='stylesheet' href='css/L.Control.Window.css' />
        <style>
            html, body, #map {
                width: 100%;
                height: 100%;
                padding: 0;
                margin: 0;
            }
            .lorem {
                font: 10pt Helvetica;
                font-style: italic;
                color: rgb(100, 100, 100);
            }
        </style>
        <title>Pronóstico climático estacional 2021</title>
    </head>
    <body>
        <div id='map'  class='sidebar-map'></div>
        <div id="sidebar" class="sidebar collapsed">
            <!-- Botones de navegación -->
            <div class="sidebar-tabs">
                <ul role="tablist">
                    <li><a href="#home" role="tab"><i class="fa fa-info"></i></a></li>
                    <!-- <li><a href="#profile" role="tab"><i class="fa fa-user"></i></a></li> -->
                </ul>
                <!-- <ul role="tablist">
                    <li><a href="#settings" role="tab"><i class="fa fa-gear"></i></a></li>
                </ul> -->
            </div>
            <!-- Función de los botones -->
            <div class="sidebar-content">
                <div class="sidebar-pane" id="home">
                    <h1 class="sidebar-header">
                        Información
                        <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
                    </h1>
                    <p><b>Pronóstico climático estacional de precipitación 2021</b><br>
                        <small><i>Emitido el 14 de julio de 2021.</i></small></p>
                    <p class="lorem"><b>Descripción general:</b><br>
                        Este mapa fue elaborado considerando tres categorías de lluvias relativas al promedio climatológico:
                        una categoría de lluvias abundantes, otra de lluvias escasas y la tercera de lluvias cercanas al promedio
                        climatológico. Los colores indican la categoría más probable de las tres, con verdes indicando expectativas
                        de lluvias abundantes, cafés lluvias escasas y blancos lluvias cercanas al promedio. Las tonalidades cafés
                        y verdes establecen la probabilidad de que ocurra la categoría correspondiente, como se señala en la barra de colores.
                        Es posible elegir distintos periodos de acumulación de precipitación en el menú de capas.</p>
                    <p class="lorem"><b>Descripción técnica:</b><br>
                        Las categorías mencionadas arriba fueron establecidas por los terciles de la distribución climatológica de
                        precipitación durante el periodo 1993-2019. Las probabilidades del pronóstico fueron determinadas a partir de
                        un muestreo basado en un modelo Bayesiano de distribución de probabilidad conjunta entre observaciones-pronósticos,
                        el cual sirvió para corregir sesgos. Adicionalmente, se hizo una reducción de escala espacial, a partir de lo cual
                        se pudo proyectar la información a escala municipal.</p>
                    <p class="lorem">*Elaborado con datos provenientes del modelo ECMWF-5,  obtenidos del portal https://climate.copernicus.eu.</p>
                    <p class="lorem"><b>Si quieres saber más sobre nuestros pronósticos climáticos estacionales,
                        visita nuestro sitio: <a href="https://climathics.com/pce/" target="_blank" rel="noopener noreferrer">https://climathics.com/pce</a>.</b></p>
                </div>
                <!-- <div class="sidebar-pane" id="profile">
                    <h1 class="sidebar-header">Profile<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                </div> -->
                <!-- <div class="sidebar-pane" id="settings">
                    <h1 class="sidebar-header">Configuración<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                </div> -->
            </div>
        </div>
        <script src='js/leaflet.js'></script> <!--https://unpkg.com/leaflet@1.7.1/dist/leaflet.js-->
        <script src='js/leaflet-hash.js'></script> <!--https://unpkg.com/leaflet-hash@0.2.1/leaflet-hash.js-->
        <script src='js/leaflet-VectorGrid.js'></script> <!--https://unpkg.com/leaflet.vectorgrid@1.2.0-->
        <script src='js/leaflet.fullscreen.min.js'></script> <!-- https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js -->
        <script src='js/leaflet-control-credits-src.js'></script>
        <script src='js/leaflet-sidebar.js'></script>
        <script src='js/L.Control.Window.js'></script>
        <!--Aquí va lo bueno-->
        <script src='index_map.js'></script>
    </body>
</html>
