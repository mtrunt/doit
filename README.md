# TODO
Simple TODO app with basic functionality (adding, removing, check/uncheck as done)

## Tools
##### App
- node 4+
- LoopBack
- Vue.js
- Bootstrap
- FontAwesome

##### Build
- webpack
- Gulp
- Babel
- Sass

##### Test
- Karma
- Mocha
- Chai

## To build
cd into the project's root directory and run
```
$ npm install
```
This will install and generate all the required files. to run the app.

If the build step failed you can do it manually by running `gulp build`.

# To run
cd into the project's root directory and `npm start`, this should expose the application on `http://localhost:5000`.


## To test
##### Run all tests once
This will run both the client and api tests once and output the results, then terminate.
```
$ npm test
```

##### Run tests and watch for changes
To run the client side tests `npm run test-client` this will watch for changes in the files.

To run the api tests `npm run test-api` this will watch for changes in the files.
