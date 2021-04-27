# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

the project is the front end for the uber app, the above code allow to build on code build and require the backend api.

## Pre-Requirement 
  ### there should a code-build running on the aws server with the varible username = <your Docker user Name> and a password =<your Docker password> 
  ### the backend app should be running and it's cluster api should be set in the src/datavalue/const.js file for varibale name backendApi. 

## Install and build 
 1. in order to run the file use the npm install first allowing  to install the required dependency files.
 2. after the installation run the command npm run-script build 
 3. after the build use the command git add . --> git commit -m "added to git commit" --> git push, which will allow the code build to create the new docker immage on your docker hub with the name uberfe.

