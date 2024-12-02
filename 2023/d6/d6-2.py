import numpy as np

times = [60947882]
dists = [475213810151650]
# times = [71530]
# dists = [940200]

out = 1

for i, t in enumerate(times):
    t1 = np.ceil(0.5 * (t + np.sqrt(t**2 - 4*dists[i])))
    t2 = np.floor(0.5 * (t - np.sqrt(t**2 - 4*dists[i])))
    out *= np.abs(t2-t1) - 1

print(out)

