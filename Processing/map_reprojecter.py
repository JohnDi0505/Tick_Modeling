import numpy as np
import os
from arcpy import *

class arcpy_processing(object):
    
    # Examine if the spatial reference raster exists or not
    if not os.path.exists("manh_dem.tif"):
        print("There is no Spatial Reference raster file in the current working folder!")
    else:
        Ref_Ras = "manh_dem.tif"
    # Define Arcpy environmental variables based on the spatial reference raster
        desc = Describe(Ref_Ras)
        env.snapRaster = Ref_Ras # Align cells in environment settings
        env.workspace = "."
        env.extent = desc.extent
        env.outputCoordinateSystem = desc.SpatialReference
        env.cellSizeX = desc.meanCellWidth
        env.cellSizeY = desc.meanCellHeight
        CellsizeX = desc.meanCellWidth
        CellsizeY = desc.meanCellHeight
        out_pnt = Point(desc.Extent.XMin,desc.Extent.YMin)
        print("Current Working Directory: " + os.getcwd())
        print("X Cell Size: " + str(env.cellSizeX))
        print("Y Cell Size: " + str(env.cellSizeY))
        print("Unit: " + env.outputCoordinateSystem.linearUnitName)
        print("Output Lower Left Corner: (" + str(out_pnt.X) + "," + str(out_pnt.Y) + ")")
    
    # Class Constructor
    def __init__(self, in_Ras, coefficient):
        self.in_Ras = in_Ras
        self.coefficient = coefficient
    
    def ras_to_nparr(self, out_resampled):
        self.out_resampled = out_resampled
        # Resample a raster using a specified coefficient
        self.resampled_ras = Resample_management(self.in_Ras, self.out_resampled, self.CellsizeX * self.coefficient, "NEAREST")
        # Convert resampled raster to numpy array
        self.ras_arr = RasterToNumPyArray(self.out_resampled)
        return(self.ras_arr)
    
    ####################################################
    ## To be worked out:                              ##
    ##  1. Variable Extraction From Numpy Array       ##
    ##  2. Modeling With Multiple Regression Package  ##
    ####################################################
    
    def nparr_to_ras(self, out_ras):
        self.out_ras = out_ras
        # Convert numpy array to raster
        self.converted_ras = NumPyArrayToRaster(self.ras_arr, self.out_pnt, self.CellsizeX * self.coefficient, self.CellsizeY * self.coefficient)
        self.converted_ras.save(self.out_ras)
