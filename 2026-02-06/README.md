docker build -t ms-a .
docker build -t ms-b .

docker network create ms-a-net
docker network connect ms-a-net ms-b
docker network connect ms-a-net kafka
docker network connect ms-a-net redis


docker run -d --name ms-a  --network ms-a-net  -p 8181:8181   -p 8101:8101   ms-a
docker run -d --name ms-b  --network ms-a-net  -p 8282:8181   -p 8201:8101   ms-b
