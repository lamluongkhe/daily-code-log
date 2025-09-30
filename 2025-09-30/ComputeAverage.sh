# read num
# sum=0
# for((i=1;i<=$num;i++))
# do
#   read x
#   sum=$((sum + x))
# done
# printf "%.3f" $(echo "$sum/$num" | bc -l)
#!/bin/bash

read num
sum=0

for ((i=0; i<num; i++))
do
    read x
    sum=$((sum + x))
done

# truncate đúng 3 số thập phân
result=$(echo "scale=3; $sum/$num" | bc)
echo "$result"
