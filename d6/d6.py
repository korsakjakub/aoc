import numpy as np

# times = [60, 94, 78, 82]
# dists = [475, 2138, 1015, 1650]
times = [7, 15, 30]
dists = [9, 40, 200]

out = 1

for i, t in enumerate(times):
    t1 = np.ceil(0.5 * (t + np.sqrt(t**2 - 4*dists[i])))
    t2 = np.floor(0.5 * (t - np.sqrt(t**2 - 4*dists[i])))
    out *= np.abs(t2-t1) - 1

print(out)

