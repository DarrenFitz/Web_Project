##### Darren Fitzpatrick (G00311853)

## Introduction
The premise of this project was to develop something that utilized a collection of technologies that integrated well together and in turn create a full stack web site. With this in mind, I decided the best approach would be to implement a 3-Tier architecture. It is best suited for numerous reasons, as it adds security, performance and reliability. Also, it is widely used as an industry standard these days and would surely meet the difficulty expectations of a Level 8 degree. During my initial exploration, I researched numerous applicable technologies to find the best option for my needs and after considerable research, I decide to use a MEAN stack approach. The MEAN stack incorporates MongoDB, Express.js, Angular 2, and Node.js, and all the components of this stack support programs written in JavaScript. MEAN applications can be written in one language for both server-side and client-side execution environments. This will all subsequently be hosted using Heroku, a platform as a service that enables developers to build, run, and operate applications entirely in the cloud. These technologies are the basis of what I used to create my blog page web application.

A working example can be found [here](https://mighty-island-46941.herokuapp.com/).

## Description
This applications demonstrates how to setup a RESTful API using NodeJS with Angular 2 Frontend. The application features a blog feed, where users interact with by posting comments, liking posts, disliking posts, and creating/editing/deleting their own blog posts.

## Architecture

## Requirements

- NodeJS
- MongoDB
- @angular/cli

## Installation

- Install all dependencies in package.json file. This can be done by navigating to the root directory in the command line interface and running the following command:
```
$ npm install
```

- Next, install all of the Angular 2 development dependencies in package.json file:
```
$ cd client/
$ npm install
```

- Installation is complete. Navigate to the root directory and then:  

## Production
-- In root directory:
```
$ npm run build
$ npm start
```
-- Access production server at: http://localhost:8080

## Development
```
$ cd client/
$ ng serve
```
-- In another window, from root directory run:
```
$ npm start
```
-- Access development server at: http://localhost:4200

-- Access API at: http://localhost:8080


## Contributors
Darren Fitzpatrick (G00311853)
