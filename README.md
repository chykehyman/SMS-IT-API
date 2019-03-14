[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)
# SMS-IT-API
This is a basic API built to facilitate sending and receiving of sms by users.

## Features
- Create contacts
- Retrieve all contacts
- Delete contacts
- Send and recieve sms
- Retrieve all user's sent and received sms

# Technologies Used
- [Express](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com) MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need
- [Mongoose](https://mongoosejs.com/) is an elegant mongodb object modeling for NodeJs
- [Babel](https://babeljs.io/) is a JavaScript compiler for converting codes written in ES6 or JSX to ES5 that is supported by many browsers

## Installation
- Clone this repository using the command:
 ```git clone https://github.com/chykehyman/SMS-IT-API.git```
- Navigate to the directory:
  ```cd SMS-IT-API```
- Add your ```.env``` file with accurate variables as clearly defined in the `.env.sample` file
- Install all dependencies with ```yarn install```
- Make sure to have mongodb installed and running if you intend testing locally
  ```mongod```
- Start the development server by running:
  ```yarn start:dev``` OR
- Start the production server by running:
  ```yarn start:prod```
- Open up `PostMan` to test

## API Endpoints

<table>
<tr><th>USE CASE</th><th>HTTP METHOD</th><th>ENDPOINT</th></tr>
<tr><td>Create a contact</td> <td>POST</td>  <td>/api/v1/contacts/add</td></tr>

<tr><td>Retrieve all contacts</td> <td>GET</td>  <td>/api/v1/contacts</td></tr>

<tr><td>Delete a contact</td> <td>DELETE</td>  <td>/api/v1/contacts/:contactId</td></tr>

<tr><td>Send sms</td> <td>POST</td> <td>/api/v1/sms/:contactId/send</td></tr>

<tr><td>Retrieve all sent and received sms</td> <td>GET</td> <td>/api/v1/sms/:contactId/all</td></tr>
</table>

## License and Copyright
[MIT](LICENSE)

## Author
* **Chinwoke Hyginus** - Software Developer and Soccer Frick.

## FAQ

### Is this an Open-Source Application?

```
Yes it is, and contributing to the development of this application is by raising PRs.
```

### Who can contribute?

```
Anyone! This application is open to all those who want to contribute to open-source 
development and are willing to follow set standards for contributing.
```

### What language was used to develop this application?

```
This project is a server-side(NodeJs) based application.
```

### Can I clone this application for personal use?

```
Yes! This application is licensed under MIT, and is open for whatever you may choose 
to use it for.
```
