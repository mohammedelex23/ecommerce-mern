# ecommerce-mern
A simple ecommerce web app which I build from scratch using MERN stack (MongoDB, Express js, React js and Node js), it consists of:
a home page that lists products, a product description page and signup/signin page and cart modal, any one can create account using 
thier email and verifies his email and then start login and add items to the cart and perform checkouts via the payment gateway.

## Technologies used
### Reactjs:### a very popular frontend library that is used to build the ui of the application.
### Expressjs:### a backend framework which is used along with nodejs to build the api for the application.
### MongoDB:### a popular non-relational database I used to store the application dynamic data.
### Stripe:### a popular payment gateway that makes dealing with cards, banking and other related things easy for developers and accelerate
the development process.

## How to install
Either by downloading the zip file by clicking the green button and then chosing the download as zip option or by cloneing the reop
by executing the following on the cmd/terminal:<br />
git clone https://github.com/mohammedelex23/ecommerce-mern.git<br />
but make sure that you have git installed on your machine (search on google "how to install git on windows/linux/mac").

## How to run the application
Once you have downloaded it you can extract the zipped file (if you downoladed it as a zip file) and make sure that you have node and mongoD
installed on your system (search google how to install nodejs/mongoDB on your machine).

Once you have installed them open up the project in a code editor like (vscode or sublime text) and create a file in the root path named as .env
and add the following to it:<br />

MONGO_URL=a mongodb url path<br />
PORT= the server port (5000 or something else)<br />
NODE_ENV=node environment (development or production)<br />
ENCRYPTION_KEY=you can write secret text here like (fg33-dsn6-kqo9-bvs5)<br />
IV_LENGTH= an integer value used by crypto library (you can assign 10 for example)<br />
BASE_URL=either http://localhost:{PORT}/ if used locally or / if hosted online, replace {PORT} with the value you used in the PORT varibale<br />
JWT_SECRET=a jwt secret, anything you want<br />

After that open the cmd/terminal and navigate to the project path and run the commands:<br />
npm install<br />
and one of the follwings:<br />
1-npm start (run the application in production mode)<br />
2-npm run dev (run the application in development mode) but you should install nodemon first by: npm install nodemon<br />

enjoy
