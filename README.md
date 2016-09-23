[![Build Status](https://travis-ci.com/victor5114/Yieldify-Bouncing-Balls.svg?token=RHiLFghDsxncnKfiWtQ8&branch=master)](https://travis-ci.com/victor5114/Yieldify-Bouncing-Balls)

# Yieldify-Bouncing-Balls
Here's my proposition for the Yieldify bouncing ball assessment.
It has been done with modern technologies available as React, Redux, Webpack, etc.
I will go deeper in the details in a next section.

## Install and Set up
### Prerequisite
I assume you already have a node.js environment set up locally. I personally use [NVM](https://github.com/creationix/nvm) to make sure I can switch easily
from one Node environment to another.

### Environment
#### Development
The application has been built under Node `v4.3` + NPM `v3.10.2`


1. Pull the repository.
2. As JSDOM Canvas implementation is buggy, we'll need to use [node-canvas](https://github.com/Automattic/node-canvas#installation) module which internally needs `Cairo` to run. Go check out this web site and follow the instructions for your system.
3. Run `npm install`. This will install the development dependencies. (If it fails go back to step 2.)
4. Run `npm run dev`. This will start a webpack server on [http://localhost:8888](http://localhost:8888) by default but you can override WEBPACK_SERVER_PORT.
Hot reload of all src files inside `/src` is activated.
5. Enjoy

#### Build (Optionnal)
> Webpack is efficiently building production ready chunk/minified files for us.
> If you want to check that these files are correctly rendered by common browsers before deploying,
> you would need start a static server.
> This server won't start unless you define the following variables :
> ```
> PORT=
> IP=
> NODE_ENV=
> ```
> Then you can either have it globally declared or create a `.env` file inside `/server/config/.env`.
> *NOTE: I'm using [dotenv-safe](https://www.npmjs.com/package/dotenv-safe) to make sure the config is > separated from code.
> See [12 Factor App](https://12factor.net/config)*

1. Run `npm run fakeserve`. This will build the production files and start a static server on previously specified port and address.
2. Go on `http://IP:PORT`
3. Play with app to make sure files are good.

#### Testing
I used [JSDOM](https://github.com/tmpvar/jsdom) / [Mocha](https://mochajs.org/) / [Chai](http://chaijs.com/) test suite for this app. JSDOM is a Javascript implementation of the DOM and has pretty much all HTML feature we need
to render HTML page on Node.js. (Except Canvas ...)

1. Run `npm run test`. This will simply executes unit and components tests. (Use `npm run test:watch` if you want to run tests while developing)
2. Run `npm run e2e`. This will end to end tests with [Protractor](http://www.protractortest.org/#/) (Works also for React based app)

## Deployment

I'm using a pretty straightforward pipeline to deploy the application on an Heroku instance.

1. Simply push new code on the repo.
2. [Travis CI](https://travis-ci.com/victor5114/Yieldify-Bouncing-Balls) is wired up with the repo and run build after each push.
3. If all tests pass on CI server then it deploys /build folder and starts a static server.
4. Visit https://yieldify-bouncing-balls.herokuapp.com/ to see final deployed result.

## Implementation & Technical choices

I decided to go wild for this exercise. I've got little experience with React-Native but not that much with Redux/Webpack whatsoever.
It was a great opportunity to open my horizon with a new stack.
Also it made sense to implement a SPA that has kind of state related stuff  like number of balls, number of active balls, etc. with a Redux state machine.
For that I made some research on Flux/Redux and could sort it out pretty quickly eventually. I would definitely go for this stack again for simple project.

I decided to follow some Redux rules of thumb. Therefore you'll find this code structure :
```
app/
   actions/           // Action creator. Used by reducer during dispatch operation
      action.js
    components/       // Static UI Component. Doesn't react to state change. (Can trigger tho)
      component1.jsx
      component2.jsx
    conatiners/       // Dynamic UI Component. Does react to state change.
      container1.jsx
      container2.jsx
    reducers/         // Reducers change state of the application.
      reducer.js
    utils/            // Utils function/object
    Class/            // Class folder
```

## Improvements:
* Fix the parametric equation edge issues
* Review redux global state. (I know there are mistakes here and there)
* Kick off a server sitting in front of static node server or use a CDN to speed up page serving.
* Better responsiveness (I'm not a CSS ninja though)
