Convert `docker-compose.yml` to k8s yaml files:

```bash
kompose convert -f docker-compose.yml
```

Start deployments & services on a cluster:

```bash
dok8s apply -f service.yaml,deployment.yaml, ...
```

Delete deployments & services on a cluster:

```bash
dok8s delete -f service.yaml,deployment.yaml, ...
```

Add a namespace `development` to a cluster:

```bash
apiVersion: v1

kind: Namespace
metadata:
    name: development
    labels:
        name: development
```

Create the namespace on the cluster:

```bash
dok8s create -f <file-name>.yaml
```

Get namespaces on a cluster:

```bash
dok8s get namespaces
```

View cluster context info:

```bash
dok8s config view
```

Get the cluster context:

```bash
dok8s config current-context
```

Set a context for a namaspace:

```bash
dok8s config set-context dev --namespace=development \
  --cluster=<current-context> \
  --user=<current-context-user>
```

Set the current context to the new context:

```bash
kubectl config use-context dev
```

Create secret named `dockerhub-creds` to pull images from private registry:

```bash
dok8s create secret generic dockerhub-creds \
    --from-file=.dockerconfigjson=/home/lemur/.docker/config.json \
    --type=kubernetes.io/dockerconfigjson
```

Pull images from private registry:

```bash
apiVersion: apps/v1
kind: Deployment
...
spec:
    ...
    template:
        ...
        spec:
            imagePullSecrets:
                - name: dockerhub-creds
            container:
                - name: ...
                  image: <username>/<image-repo>:<tag>
```

Get public key from sealed secret k8s cluster:

```bash
kubeseal --fetch-cert --controller-namespace=sealed-secrets > pub-sealed-secrets.pem
```

Example Secret File `your-app-secret.yaml`:

```bash
apiVersion: v1
data:
  your-data: ZXh0cmFFbnZWYXJzOgogICAgRElHSVRBTE9DRUFOX1RPS0VOOg== # base64 encoded application data
kind: Secret
metadata:
  name: your-app
```

Encrypt the secret file:

```bash
do-kubeseal --format=yaml \
  --cert=pub-sealed-secrets.pem \
  --secret-file secret.yaml \
  --sealed-secret-file sealed-secret.yaml
```
