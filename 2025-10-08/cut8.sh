while read r
do
    echo "$r" | cut -d ' ' -f1-3
done