# BeLucky


##  Local development 

### Pre-requisites 
- You need [Docker Desktop](https://www.docker.com/products/docker-desktop) installed on your machine. You should download directly from [website](https://www.docker.com/products/docker-desktop) based on your os and complete the setup.
- Install `git` from [website](https://git-scm.com/downloads)

### Steps
  1. Create a folder for beLucky workspace

       ```
       mkdir  belucky
       ```

  2. Change current working directory to it by

       ```
       cd belucky
       ```

  3. Clone repositories
               
       git clone git@github.com:nchinchilla/belucky-user-service.git
       
              
   4. Build project
      
      ```
      cd belucky-user-service
      npm i
      
      ```

   5.  Copy `docker-compose.yaml` file with 

      ```
      cd ..
      cp ./belucky-user-service/docker-compose.yaml ./
      
      ```

   5. Copy `scripts` folder 

      ```
      cp -R ./belucky-user-service/scripts ./ 
      
      ```

   6.  Build and Run the containers with following command, make sure docker desktop is running.
   
       ```
       docker-compose -f docker-compose.yaml up --build

       ```



### Verification  


### Create user
```

curl --request POST 'http://localhost:3001/user' \
--header 'Content-Type: application/json' \
--data-raw '{ "username": "nahuel2", "password": "1234", "name":"nahuelon", "street": "crisotomos 4532", "cityId": 1, "countryId":1 }'
```

### Get JWT
```
curl -i --request POST 'http://localhost:3001/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{ "username": "nahuel2", "password": "1234"}'
```


### Get UserById
```
curl --location --request GET 'http://localhost:3001/user/1' \
--header 'Authorization: Bearer {Get Token from Get Jwt endpoint}' \
--header 'Content-Type: application/json' \
```


### Documentation

http://localhost:3001/api/
