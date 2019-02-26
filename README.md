# Escolasapp

This platform has been specially designed so that the public can obtain information on the performance and operating conditions of public and private schools in the São Paulo Metropolitan Region. In addition, users will also be able to obtain socioeconomic information about their neighborhoods, the São Paulo Metropolitan Region, the State of São Paulo and Brazil.

## Architecture

This project was developed using different tools.

For the database was used MongoDB 3.4.9.

For the backend were used:
- Mongoose 5.0.13
- Express 4.15 
- NodeJS 7.10

For the frontend were used: 
- Leaflet.markerCluster 1.2
- Angular 5.2.9
- Bootstrap 4.0
- D3 5.0
- Leaflet 1.3
- Font-Awesome 4.7 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4


## System Requirements

It is necessary to have the following technologies installed globally:

- Node 7.10
- NPM 4.2.0
- MongoDB 3.4.9
- AngularCli 1.7.4

After that, install NPM dependencies

```
$ cd escolasapp 
$ npm i
```

## Database settings

It's necessary create the database in MongoDB 

## Backend
First step, create into escolasapp directory a new file config/dbconfig.js file and put the code:

```
module.exports = {
  url: 'mongodb://localhost:27017/<name_of_the_database>'  
}
```  


## Run frontend

**NOTE:** AngularCli generates a development project.
and it has two modes, a development and production modes

To build and run the frontend in **development mode**, do:
```
$ ng build
$ npm start
```
 
To put this project in **production mode** and run the project in this mode, do:
```{r,engine='console', code_block_nmae}
$ ng build --prod
$ npm start
``` 

## Deployment

To see the SPA application access: [http://localhost:3002/](http://localhost:3002/).


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
