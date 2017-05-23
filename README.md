# Tick Sampling Report in Caumsett State Park
2017 Spring Final Project


Acknowledgement: Qiu Lab, GTECH 712, GTECH 734



Required Data:
Landsat-8 Images --> landcover classification; temperature; vegetation
Lidar Point Cloud --> DSM --> solar radiation
Google Earth KML --> sampling area
Tick Data --> tick sampling trip (The sampling approach is complete (109 ticks are sampled and coordinates of sampling sites are recorded).)(Scheduled on May 5th, the trip will be scheduled next week if the weather is bad.)


Raster Values Extraction
In ENVI: Extract Study Area with ROI--> ENVItool_box --> Raster Management --> IDL --> Export to IDL Variables --> Variable Name
In IDL: Variable Name --> WRITEU(Write Raster to Binary) / WRITE_CSV / PRINT/PRINTF


Outline:
Remote Sensing Image Processing (ENVI): landcover classification --> remove urbanized area from study area (done);image processing --> surface temperature raster (done); NDVI image --> vegetation raster (done)

Data Processing (Python: arcpy, numpy, os): raster input/output and reprojection & conversion between raster and numpy array including value extraction (done)

Linear Regression Model (ready)

Database Managing (Python: psycopg2 & SQL database): table creation and management (not started); data updating and retrieving (ready)

Web Service (Python: cherrypy & HTML, Javascript: Jquery, Leaflet) (doing)
