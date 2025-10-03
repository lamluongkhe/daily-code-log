while read r
do
echo "$r" | cut -d $'\t' -f 1-3 
done
