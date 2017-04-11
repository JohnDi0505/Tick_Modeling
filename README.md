# Tick_Modeling_in_LongIsland
2017 Spring Final Project

Required Data:
Landsat-8 Images --> landcover classification; temperature; vegetation
Lidar Point Cloud --> DSM --> solar radiation
Google Earth KML --> sampling area

Outline:
Remote Sensing Image Processing (ENVI): thermal landcover classification --> remove urbanized area from study area;image processing --> surface temperature raster; NDVI image --> vegetation information raster

Data Processing and Modeling (Python: arcpy, numpy, os): raster input/output and reprojection & conversion between raster and numpy array including value extraction (in progress); multiple regression modeling (not started)

Database Managing (Python: psycopg2 & SQL database): table creation and management (not started); data updating and retrieving (done)

Web Service (Python: cherrypy & HTML, Javascript: Jquery, Leaflet)
