This is a project built on Node, Express, Mongodb, React, Redux. I have used bcryptjs, client-sessions and jsonwebtoken for profile and session and token management. Also, I am using superagent for API calls and cheerio as a scraper.  
React is used in the front end. Babel is used to transpile ES6 codes and web pack is used to compile the code

Users after login or registration can post a link they would like to share(bookmark), which would be displayed alongside their name in the main page. 

routes

/api
	— contains profile, bookmark

Schema
	— mongoose Schema

Backend development
express social-bookmark —hogan
we are using hogan template 

lets create a api route
lets write get and post to the api endpoints


now lets create a model Schema 
profile and bookmark
npm i -S mongoose
lets set up mongoose in our app.js
we are using mongoose as object modelling tool
lets also write summary methods on our schema so we don’t release the data that we don’t want like passwords on the api calls


now lets create controllers
lets write methods such as get, getById, post and delete methods
we write our controller’s method with Promise library bluebird 

in the account route manage login, logout, sessions, tokens, hashing passwords and registering
install
bcryptjs
jsonwebtoken
cheerio

extract the JWT and Scaper utility tools in a folder called utils

Front end
install react, react-dom, webpack, react-redux, babel-core, babel-loader, babel-preset-react, babel-preset-es2015, redux-thunk

we will install super agent which will call the api from the frontend

let test a super agent call to our api in componentDidMount lifecycle in Profiles.js to fetch the profile
Once it works, we will extract the super agent module in the utils directory inside /src called APIManager

after it works
we will set up the local component state in order to render the profiles
let render them inside the render function
after successfully loading them in our component, we are going to set up Admin component that lets us sign up or login
lets create a signup from and set up the state and write a function to catch events at the input boxes and sync with the state
our signup component in presentation handles the user inputs and through its state transfers the registration process to Admin.js in the container, which is only making calls to our backend 

we are using Admin to signup but our profile component doesn’t know about our registration to load the new profile, we need redux now, which will help us pass props and state through store
lets setup redux

we use redux in a situation where one component needs to talk to another component, redux is shared state management for our entire application

install redux, react-redux, redux-thunk
set up actions, reducers, constants, and stores

define a constant
write actions that takes the payload from dispatch and return a object with type and payload— we will also sometime call API from actions

in the reducer we will have a initial state we export a function that takes state and action and plays the switch action

in the store 
we initiate the store
and then we connect our components to the store 


now we are going to create another reducer called account reducer, which will handle if anyone is logged in

so we are logged in the backend but not in the front end, we need to override the lifecycle method componentDidMount() where we will dispatch a currentUserReceived action, which will make sure to show we are logged in 


