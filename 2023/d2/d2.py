MAX_RED = 12
MAX_GREEN = 13
MAX_BLUE = 14
sum = 0
with open('input.txt', 'r') as file:
    index = 1
    for game in file:
        cubeSets = game.split(":")[1].strip().split(';')
        splitSets = all([all([(r.strip().split(' ')[1] == "blue" and
                               int(r.strip().split(' ')[0]) <= MAX_BLUE)
                              or
                              (r.strip().split(' ')[1] == "green" and
                               int(r.strip().split(' ')[0]) <= MAX_GREEN)
                              or
                              (r.strip().split(' ')[1] == "red" and
                               int(r.strip().split(' ')[0]) <= MAX_RED)
                              for r in s.split(',')])
                         for s in cubeSets])
        if splitSets:
            sum += index
        index += 1
print(sum)
