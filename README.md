## Build and Deploy and Pull Docker Image

### Build docker image
1. Create Dockerfile at root directory and write instruction in file and after then
2. To build image write **docker build** -t image-name 
3. To direct make image and push on docker hub **docker build -t username/reponame**

### To deploy image on docker hub publically
1. Make login on docker.hub.com website and make repo 
2. write **docker push username/image-name in root directory where docker file is present

## To pull docker image 
1. write **docker pull image-name** 

## To install redis and run
1. run ubuntu server **docker exec -it ubuntu_redis bash**
2. install redis **apt **


