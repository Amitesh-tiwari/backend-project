import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

////used for middlewares and the configuration files of the app
app.use(cors({
    origin: process.env.CORS_ORIGIN,// allow to server to accept request from different origin
    credentials: true // allow session cookie from browser to pass through
}));

app.use(express.json({limit:'20mb'}));
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
//This method is called as a middleware in your application using the code: app.use(express.json());
//This method is used to parse the incoming Request Object as a JSON Object.
//And the limit we are setting is the maximum size of the request which can be accepted by the server.

app.use(express.urlencoded({extended:true, limit:'20mb'}));
//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
//This method is called as a middleware in your application using the code: app.use(express.urlencoded());
//This method is used to parse the incoming Request Object as strings or arrays.
//And the limit we are setting is the maximum size of the request which can be accepted by the server.
//The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
//The data coming from the URL can be confusing as it has some special characters built in it, so this method is used to parse that data.

app.use(express.static('public'));
//express.static() is a built-in middleware function in Express. It serves static files and is based on serve-static.
//This is used to serve images, CSS files, and JavaScript files in a directory named public.

app.use(cookieParser());


const app = express();

export default app;