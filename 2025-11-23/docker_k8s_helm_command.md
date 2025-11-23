# Docker + Kubernetes + Helm Cheat Sheet

## 🐳 Docker – Lệnh hay dùng

### 1️⃣ Thông tin & kiểm tra
```
docker version
Docker info
docker system df
docker system prune -a
docker stats
docker inspect <container|image>
```

### 2️⃣ Image
```
docker images
docker pull <image>
docker build -t <name>:tag .
docker rmi <image>
docker tag <local> <repo>/<image>:tag
docker push <repo>/<image>:tag
docker history <image>
docker inspect <image>
```

### 3️⃣ Container
```
docker ps
docker ps -a
docker run -d --name <name> <image>
docker run -it <image> /bin/bash
docker run -d --name sleep-container <image> sleep 3600
docker exec -it <container> /bin/bash
docker attach <container>
docker stop <container>
docker start <container>
docker restart <container>
docker rm <container>
docker logs -f <container>
docker commit <container> <image>
docker cp <container>:/path /host/path
```

### 4️⃣ Network
```
docker network ls
docker network create <name>
docker network inspect <name>
docker network connect <network> <container>
docker network disconnect <network> <container>
```

### 5️⃣ Volume
```
docker volume ls
docker volume create <name>
docker volume inspect <name>
docker volume rm <name>
docker run -v <volume>:/data <image>
```

### 6️⃣ Advanced / Tips
```
docker run --rm <image>
docker run -p 8080:80 <image>
docker run --env KEY=value <image>
docker run --restart=always <image>
docker-compose up -d
docker-compose down
docker exec -it temp sh
```

## ☸️ Kubernetes (kubectl) – Lệnh hay dùng

### 1️⃣ Cluster & Node
```
kubectl version
kubectl cluster-info
kubectl get nodes
kubectl describe node <name>
kubectl top node
```

### 2️⃣ Pods / Deployments
```
kubectl get pods
kubectl get pods -A
kubectl describe pod <pod>
kubectl logs <pod>
kubectl logs -f <pod>
kubectl exec -it <pod> -- /bin/bash
kubectl delete pod <pod>

kubectl get deploy
kubectl describe deploy <name>
kubectl rollout restart deploy <name>
kubectl rollout status deploy <name>
kubectl scale deploy <name> --replicas=3
kubectl autoscale deploy <name> --min=1 --max=5 --cpu-percent=50
```

### 3️⃣ Services / Ingress
```
kubectl get svc
kubectl describe svc <name>
kubectl port-forward pod/<pod> 8080:80
kubectl get ingress
kubectl describe ingress <name>
```

### 4️⃣ Namespaces
```
kubectl get ns
kubectl create ns <name>
kubectl delete ns <name>
kubectl config set-context --current --namespace=<ns>
```

### 5️⃣ ConfigMap & Secret
```
kubectl get configmap
kubectl create configmap cm1 --from-literal key=value
kubectl get secret
kubectl create secret generic s1 --from-literal password=123
kubectl describe secret <name>
```

### 6️⃣ Apply / Delete / Debug
```
kubectl apply -f file.yaml
kubectl delete -f file.yaml
kubectl describe <resource> <name>
kubectl get events
kubectl get all -A
kubectl top pod
```

## ⛵ Helm – Lệnh hay dùng

### 1️⃣ Repositories
```
helm repo add <name> <url>
helm repo list
helm repo update
helm search repo <keyword>
helm search hub <keyword>
```

### 2️⃣ Install / Upgrade / Uninstall
```
helm install <release> <chart> -f values.yaml
helm upgrade <release> <chart> -f values.yaml
helm upgrade --install <release> <chart> -f values.yaml
helm uninstall <release>
```

### 3️⃣ Inspect / Debug
```
helm template <chart> --values values.yaml
helm show values <chart>
helm show chart <chart>
helm install <release> <chart> --dry-run --debug
helm upgrade <release> <chart> --dry-run --debug
helm get all <release>
```

### 4️⃣ Rollback
```
helm history <release>
helm rollback <release> <revision>
```

## 💡 Tips tổng hợp
- Docker: dùng `exec -it` và container sleep để debug; giữ image nhẹ, tận dụng cache.
- Kubernetes: dùng readiness/liveness probe, namespaces tách môi trường dev/prod, port-forward để test local.
- Helm: cấu hình qua values.yaml, tránh edit templates trực tiếp; debug với `--dry-run --debug`.
- Kết hợp Docker + K8s + Helm giúp triển khai CI/CD nhanh và đồng nhất môi trường.

