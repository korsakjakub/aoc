import re
PATTERN = r"\d|one|two|three|four|five|six|seven|eight|nine"
replace_dict = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}

sum = 0
with open('input.txt', 'r') as file:
    for line in file:
        digits = []
        matched_digit = re.search(PATTERN, line)
        while matched_digit:
            digits.append(matched_digit.group())
            next_start = matched_digit.start() + 1
            line = line[next_start:]
            matched_digit = re.search(PATTERN, line)
        digits = [
            replace_dict[digit] if digit in replace_dict else digit for digit in digits
        ]
        sum = sum + int(digits[0] + digits[-1])

print(sum)
