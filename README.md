# W.D&F (WARSAW BEST DRINKS & FOOD) 

#### TABLE OF CONTENTS
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Setup](#setup)

## INTRODUCTION

This website is my final project of famous Colt Steele's [web developer bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/).
The website is fully functional, nevertheless certain solutions are made to be really simple and should not be user in real world.

## FEATURES 

The website allows to:
* Registration and next logging in a user
* Surfing through base of restaurants
* Creating new records for places by registered users
* Automatically upload images to the cloud
* Depending on the entered address, a map with location will be shown
* Editing of already existing record, if user willing to edit is the same user who created that record
* Availability to leave comments and rating

## TECHNOLOGIES

The project is built using **MERN Stack (MongoDB, Express, React(Hooks), Node.js)**

Additional technologies used :
- For Back-end: 
  * Cloudinary
  * Coockie Session 
  * CORS
  * Passport (+ local strategy)
  * Multer (+ cloudinary storage)
  * MapBox API
- For Front-end:
  * React Router
  * Axios
  * Day.js
  * MapBoxGL
  
 ## SETUP
 
 To run this project locally, clone this repository on local, then:
 ```
 npm install
 cd client
 npm install 
 npm run build
 cd ..
 node server.js
 ```
