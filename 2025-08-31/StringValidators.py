if __name__ == '__main__':
    s = input()
    is_al_num = False
    is_al = False
    is_digit = False
    is_lower = False
    is_upper = False
    for i in s:
        if i.isalnum(): is_al_num = True
        if i.isalpha(): is_al = True
        if i.isdigit(): is_digit = True
        if(i.islower()): is_lower = True
        if(i.isupper()): is_upper = True

    print(is_al_num)
    print(is_al)
    print(is_digit)
    print(is_lower)
    print(is_upper)    