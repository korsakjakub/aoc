package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"unicode"
)

func part2(input []string) {
	sum := 0

	for rowIndex, row := range input {
		checkAbove, checkBelow := rowIndex != 0, rowIndex != len(input)-1
		result := findNumbers(row)

		// "." == 46 ASCII
		for hIndex, v := range result {
			isInstruction := false
			n, size := v[0], v[1]
			checkLeft, checkRight := hIndex != 0, hIndex+size != len(row)
			if checkLeft && row[hIndex-1] != 46 {
				isInstruction = true
			}
			if checkRight && row[hIndex+size] != 46 {
				isInstruction = true
			}
			if checkAbove {
				for x := hIndex; x < hIndex+size; x++ {
					if input[rowIndex-1][x] != 46 {
						isInstruction = true
					}
				}
			}
			if checkBelow {
				for x := hIndex; x < hIndex+size; x++ {
					if input[rowIndex+1][x] != 46 {
						isInstruction = true
					}
				}
			}

			// corners :)
			if checkAbove && checkLeft && input[rowIndex-1][hIndex-1] != 46 {
				isInstruction = true
			}
			if checkAbove && checkRight && input[rowIndex-1][hIndex+size] != 46 {
				isInstruction = true
			}
			if checkBelow && checkLeft && input[rowIndex+1][hIndex-1] != 46 {
				isInstruction = true
			}
			if checkBelow && checkRight && input[rowIndex+1][hIndex+size] != 46 {
				isInstruction = true
			}

			if isInstruction {
				fmt.Println("adding: ", n)
				sum += n
			}
		}
		fmt.Println(result)
		fmt.Println("sum: ", sum)
	}
}

func part1(input []string) {
	sum := 0

	for rowIndex, row := range input {
		checkAbove, checkBelow := rowIndex != 0, rowIndex != len(input)-1
		result := findNumbers(row)

		// "." == 46 ASCII
		for hIndex, v := range result {
			isInstruction := false
			n, size := v[0], v[1]
			checkLeft, checkRight := hIndex != 0, hIndex+size != len(row)
			if checkLeft && row[hIndex-1] != 46 {
				isInstruction = true
			}
			if checkRight && row[hIndex+size] != 46 {
				isInstruction = true
			}
			if checkAbove {
				for x := hIndex; x < hIndex+size; x++ {
					if input[rowIndex-1][x] != 46 {
						isInstruction = true
					}
				}
			}
			if checkBelow {
				for x := hIndex; x < hIndex+size; x++ {
					if input[rowIndex+1][x] != 46 {
						isInstruction = true
					}
				}
			}

			// corners :)
			if checkAbove && checkLeft && input[rowIndex-1][hIndex-1] != 46 {
				isInstruction = true
			}
			if checkAbove && checkRight && input[rowIndex-1][hIndex+size] != 46 {
				isInstruction = true
			}
			if checkBelow && checkLeft && input[rowIndex+1][hIndex-1] != 46 {
				isInstruction = true
			}
			if checkBelow && checkRight && input[rowIndex+1][hIndex+size] != 46 {
				isInstruction = true
			}

			if isInstruction {
				fmt.Println("adding: ", n)
				sum += n
			}
		}
		fmt.Println(result)
		fmt.Println("sum: ", sum)
	}
}

func main() {
	filePath := "input.txt"

	input, err := readLines(filePath)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}
	// part1(input)
	part2(input)
}

func findNumbers(input string) map[int][]int {
	result := make(map[int][]int)
	var currentStart, currentLength, currentNumber int

	for i, str := range input {
		isNumeric := unicode.IsDigit(str)
		if isNumeric {
			newDigit, err := strconv.Atoi(string(str))
			if err != nil {
				panic(err)
			}

			if currentLength == 0 {
				currentStart = i
				currentNumber = newDigit
			} else {
				currentNumber = currentNumber*10 + newDigit
			}
			currentLength++
		} else {
			if currentLength > 0 {
				result[currentStart] = []int{currentNumber, currentLength}
				currentLength = 0
			}
		}
		if i == len(input)-1 && currentLength > 0 {
			result[currentStart] = []int{currentNumber, currentLength}
		}
	}
	return result
}

func readLines(filePath string) ([]string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return lines, nil
}

