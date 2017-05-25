import numpy as np
import matplotlib.pyplot as plt
import pandas
import pylab
import numpy as np 
import scipy.stats as stats
from statsmodels.formula.api import ols
from statsmodels.stats.anova import anova_lm

# Load training datasets
training_ndvi = np.genfromtxt("training_ndvi.csv", delimiter=",")
training_solar = np.genfromtxt("training_solar.csv", delimiter=",")
training_thermal = np.genfromtxt("training_thermal.csv", delimiter=",")
training_tick = np.genfromtxt("training_tick.csv", delimiter=",")

# Transform datasets
ndvi = training_ndvi.flatten()[training_ndvi.flatten().nonzero()]
solar = training_solar.flatten()[training_solar.flatten().nonzero()]
thermal = training_thermal.flatten()[training_thermal.flatten().nonzero()]
ticks = training_tick.flatten()[training_tick.flatten().nonzero()]

# Construct dataframe
df = pandas.DataFrame({'NDVI': ndvi, 'solar': solar, 'thermal': thermal, 'ticks': ticks})

# Normalize dataframe
df = (df - df.mean())/df.std()

# Run linear regression model and print out summary
model = ols("ticks ~ NDVI + solar + thermal + NDVI * solar + NDVI * thermal + solar * thermal", df).fit()
print(model.summary())
