# Tick_Modeling_in_LongIsland
2017 Spring Final Project


Acknowledgement: Qiu Lab, GTECH 712, GTECH 734, Remote Sensing Data Source, Lidar Data Source



Required Data:
Landsat-8 Images --> landcover classification; temperature; vegetation
Lidar Point Cloud --> DSM --> solar radiation
Google Earth KML --> sampling area
Tick Data --> tick sampling trip (The sampling approach is upcoming.)(Scheduled on May 5th, the trip will be scheduled next week if the weather is bad.)



Outline:
Remote Sensing Image Processing (ENVI): landcover classification --> remove urbanized area from study area (done);image processing --> surface temperature raster (done); NDVI image --> vegetation raster (done)

Data Processing (Python: arcpy, numpy, os): raster input/output and reprojection & conversion between raster and numpy array including value extraction (in process)

Linear Regression Model (ready)

Database Managing (Python: psycopg2 & SQL database): table creation and management (not started); data updating and retrieving (ready)

Web Service (Python: cherrypy & HTML, Javascript: Jquery, Leaflet) (not started)
