import re

sum = 0
with open('input.txt', 'r') as file:
    for line in file:
        line.replace('one', '1')
        first = re.search(r'\d', line)
        last = re.search(r'\d', line[::-1])
        if not first or not last:
            continue
        first = int(first.group())
        last = int(last.group())
        sum += first * 10 + last

    print(sum)
