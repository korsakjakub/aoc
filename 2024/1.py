input = open("1-input.txt", "r").readlines()
left = list(map(lambda line: int(line.split("   ")[0]), input))
left.sort()
right = list(map(lambda line: int(line.split("   ")[1].replace("\n", "")), input))
right.sort()

sum_of_diffs = sum(list(map(lambda x, y: abs(x - y), left, right)))

print(sum_of_diffs)

sum_of_similarity = 0
for i, l in enumerate(left):
    occurrences = [l == r for r in right]
    num_of_occurrences = len(list(filter(lambda o: o, occurrences)))
    sum_of_similarity += num_of_occurrences * l
print(sum_of_similarity)
