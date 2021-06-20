<!doctype html>
<html lang="en">
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width'>
        <meta name='mobile-web-app-capable' content="yes">
        <meta name='apple-mobile-web-app-capable' content="yes">
        <link rel='stylesheet' href='css/leaflet.css'> <!--https://unpkg.com/leaflet@1.7.1/dist/leaflet.css -->
        <link rel='stylesheet' href='css/leaflet.fullscreen.css'  />
        <link rel="stylesheet" href="css/leaflet-control-credits.css" />
        <style>
        html, body, #map {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
        }
        </style>
        <title>Pronóstico estacional 2021-Verano</title>
    </head>
    <body>
        <div id="map"></div>
        <script src='js/leaflet.js'></script> <!--https://unpkg.com/leaflet@1.7.1/dist/leaflet.js-->
        <script src='js/leaflet-hash.js'></script> <!--https://unpkg.com/leaflet-hash@0.2.1/leaflet-hash.js-->
        <script src='js/leaflet-VectorGrid.js'></script> <!--https://unpkg.com/leaflet.vectorgrid@1.2.0-->
        <script src='js/leaflet.fullscreen.min.js'></script> <!-- https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js -->
        <script src="js/leaflet-control-credits-src.js"></script>

        <!--Aquí va lo bueno-->
        <script src='index_map.js'></script>

    </body>
</html>
