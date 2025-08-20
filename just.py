import pandas as pd;

df = pd.read_csv("postoffice.csv");


filt = df[df['pincode'] == "791122"]
print(filt)
print(len(filt))