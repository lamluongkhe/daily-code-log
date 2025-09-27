#:/bin/bash
HOST=192.168.0.10
PORT=3306
USER=root
PASS=root
DATE=$(date +"%Y-%m-%d")

mkdir /tmp/$DATE

for i in `mysql -u $USER -p$PASS -h $HOST -P$PORT -e "show databases;" -s --skip-column-names|grep -v "information_schema\|performance_schema\|sys\|mysql"`; do
   mysqldump -u$USER -p$PASS -h $HOST -P$PORT $i > /tmp/$i.sql
   cd /tmp/
   tar -zcvf /tmp/$DATE/$i.sql.gz /tmp/$i.sql
   rm -f /tmp/$i.sql
done

rsync -auvz /tmp/$DATE root@192.168.0.20:/tmp/
