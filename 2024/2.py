reports = open("2-input.txt", "r").readlines()


def check_levels(levels):
    sorted_levels = sorted(levels, key=int)
    reverse_sorted_levels = sorted(levels, key=int, reverse=True)
    monotonic = levels == sorted_levels or levels == reverse_sorted_levels
    has_safe_diff = True
    for i, level in enumerate(levels):
        if i == 0:
            continue
        if 1 <= abs(level - levels[i - 1]) <= 3:
            continue
        has_safe_diff = False
    return monotonic and has_safe_diff


# part 1
def is_safe_report(report):
    levels = list(map(lambda level: int(level), report.strip().split(" ")))
    return check_levels(levels)


safe_reports = list(filter(lambda report: report, map(is_safe_report, reports)))

print(len(safe_reports))


# part 2
def is_safe_report_2(report):
    levels = list(map(lambda level: int(level), report.strip().split(" ")))
    if check_levels(levels):
        return True

    for i, removed_index in enumerate(levels):
        if check_levels(levels[:i] + levels[i + 1:]):
            return True

    return False


safe_reports_2 = list(filter(lambda report: report, map(is_safe_report_2, reports)))
print(len(safe_reports_2))
