# Project Name  :-node-with-express
#### Description:- 
 - This project is based on crud operation and also understanding folder structure 
---
- [Build Docker Image]
- [Deploy Docker Image to Docker Hub] 
- [Pull Docker Image]

---

##  Build Docker Image

1. Create a `Dockerfile` at the root of your project.  
2. Build the image locally:  
```bash
docker build -t image-name:tag-name .
```
## Build and tag the image directly for Docker Hub:

```bash
docker build -t username/reponame:tag-name .
```

## Deploy Docker Image to Docker Hub
1 . Log in to Docker Hub:
```bash
 docker login
 ```
2 . Create a repository on dockerhub.com
3 . Push the image to your repository:
```bash
docker push username/reponame:tag-name
```
## Pull Docker Image
1. To pull the image from Docker Hub:
```bash
docker pull username/reponame:tag-name
```



