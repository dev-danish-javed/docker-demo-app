# Docker Basics
- What is docker
- Why linux
- vagrant and wsl or hyperkit
- Container
- Dockerfile
- Images
- Volumes
- Network
- Registery
- docker compose

## Dockerfile
- from
  - base image, seed of tiny little, sort of VM, containers
- workdir
  - set location for next command executions, CMD, COPY, RUN etc
- copy
  - copy the source code to container's file system
- RUN npm install
  - execute the command in workdir location to install dependecies
- expose 8080
  - exposes container's port 8080 for externa communication
- CMD ["node", "index.js"]
  - start the app

## Images
- Images are to containers what classes are to objects. 
- Images are the blueprint of containers.
- Doesn't consume resources
- default tag= latest
> - `docker build -t repo:tag /path-to-dockerfile-directory`
> - `docker images`
> - `docker rmi`

## Registry
- github/bitbucket for images
- Stores multiple versions of image
- dockerhub, harbor, aws ecr
- [dron aws push, SIT build logs-registry.paymentus.io]
> - `docker login`
> - `docker push repo:tag`
> - `docker pull repo:tag`
> - `docker logout`

## Containers
- The functional unit
- Hosts our application
- Consumes resources, aquire ports, takes RAM etc
- Own file system, network stack
- Lifecycle
  - created `docker create`
    - creates container but doesn't start it
  - started `docker run/start`
    - run: creates and start the container
    - start:  starts an existing container
  - paused `docker pause`
    - freezes all the processes in the container
    - doesn't release resources, ports n all
    - faster resume
  - resumes `docker unpause`
    - resumes a paused container
  - stopped `docker stop`
    - stops a container
    - release resources
  - removed `docker rm`
    - removes the container entiirely

## Volumes
- Data persistence
- Data sharing
- If mentioned in dockerfile, anonymous volume
  - data persistence ✅
  - data sharing ❌
- Internal redirect of operations from container's file system to volume
- Anything after the path /app/data/ is custom
- run flag `-v volume-name:/path/to/mount`
- [oracle]
> - `docker volume create volume-name`
> - `docker volume ls`
> - `docker volume inspect voulme-name`
> - `docker volume rm volume-name`

## Network
- Container gets its own newtork stack, hence localhost won't work
- only containers in the same network communicate
- implicit registery
- connections can be managed on the fly
- Types
  - Bridge(default): Containers on the same host can talk.
  - Host: No isolation; shares the host's network.
  - None: Fully isolated.
  - Overlay: Communication across hosts.
  - IPvlan: Fine-grained IP control.
  - Macvlan: Treat containers like separate devices.
- [SIT network, braintree]
> - `docker network create network-name`
> - `docker network connect network-name containers-name`
> - `docker network disconnect newtwork-name containers-name`

## docker compose
- Docker Compose is a tool for defining and running multi-container Docker applications 
using a single file
- it helps run multiple containers at once
- manage volumes and networks on the fly
- it helps keep multiple environments aligned, as everything is written in the same file and can run accross environments

### writing a docker-compose.yml
```yaml
services:
  service-name:
  image: image-name:tag # optional - our image name and tag
  container_name: container-name # optional our container name
  pull-policy: #when do we want to pull the image
  build:
    context: ./path-to-docker-file-directory
    dockerfile: name-of-docker-file
  ports:
    - "host-port:container-port" # Map host port to container port
  volumes:
    - host-path:container-path # Mount a volume
  environment:
    - ENV_VAR_NAME=value # Set environment variables
  depends_on:
    - another-service-name # Specify dependencies (optional)
  network:
    - networks-a # the networks our ms should be a part of
    - network-b

  another-service-name:
  build:
    context: ./path-to-dockerfile # Path to Dockerfile
    dockerfile: Dockerfile # Optional: Specify Dockerfile name
  ports:
    - "host-port:container-port"
  networks:
    - my-network # Custom network (optional)

  volumes:
    volume-name: # Declare named volumes
  
  networks:
    my-network: # Declare custom networks
    driver: bridge
```
### run docker compose
- we  can run all services in one go
  - `docker compose up`
  - for older versions `docker-compose up`
- we can specify a particular service 
  - `docker compose up nginx oracle`
- we can force build instead of using exsiting images
  - `docker compose up --build`
- naming docker compose file `docker-compose.yaml` is not compolsury
  - this is the default file docker compose command looks for this by default
  - we can name it anything and run
    - `docker compose -f anything.yaml up`
- To bring down the services
  - `docker compose down`
- We also have `docker compose start` and `docker compose restart`

### Random Points
- exporting image as tar file
  - `docker save -o output-path image-name:tag`
- loading image back from tar
  - `docker load -i path-to-tar-file`
- docker tags
  - nick names for images
  - one image can have multiple tags **but not vice-versa**
  - `docker tag new-repo:new-tag old-repo:old-tag`

##### Now we can get our hands dirty and play around with the code attached in docker environment. 
##### checkout the app structure here [app-details.md](https://github.com/dev-danish-javed/docker-demo-app/blob/main/app-details.md)