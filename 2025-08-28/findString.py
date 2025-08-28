def count_substring(string, sub_string):
    # string = string.lower()
    # sub_string = sub_string.lower()
    pos = string.find(sub_string)
    len_sub = len(sub_string)
    result = 0
    while (len(string) >= 0):
        pos = string.find(sub_string)
        if(pos != -1):
            string = string[pos + len_sub -1:]
            result += 1
        else:
            break; 
            
            
    return result

if __name__ == '__main__':
    string = input().strip()
    sub_string = input().strip()
    
    count = count_substring(string, sub_string)
    print(count)