sum = 0
with open('input.txt', 'r') as file:
    index = 1
    for game in file:
        cubeSets = game.split(":")[1].strip().split(';')
        maxima = {'green': 0, 'blue': 0, 'red': 0}
        for cubeSet in cubeSets:
            draws = cubeSet.split(', ')
            for draw in draws:
                [count, color] = draw.strip().split(' ')
                if int(count) > maxima[color]:
                    maxima[color] = int(count)
        sum += maxima['green'] * maxima['red'] * maxima['blue']
        index += 1
print(sum)
