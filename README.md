#  Movie Rater :movie_camera:
#### movie rating app built with Node, Passport, Sequelize, Handlebars, and JQuery

## Dependencies
 * MySQL Database
 * AWS S3 Bucket with correct bucket policy and permissions (not covered in this document)
 * Node (version 4+)
 * NPM (version 2+)
 
## Installation
 1. Create a MySQL database with a name of your choosing `CREATE DATABASE <DATABASE_NAME>`.
 2. Create a `config.json` file inside of the `config` directory using the example below to connect to the database you just created.

    ```JSON
    {
      "development": {
        "username": "username",
        "password": null,
        "database": "database_name",
        "host":     "127.0.0.1",
        "dialect":  "mysql"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_name",
        "host":     "127.0.0.1",
        "dialect":  "mysql"
      },
      "production": {
        "username": "username",
        "password": null,
        "database": "database_name",
        "host":     "host_name",
        "dialect":  "mysql"
      }
    }
    ```
    
3. Create a `keys.js` file also inside the `config` directory with your AWS S3 bucket name and a selected passkey for Passport.js

    ```javascript
    module.exports = {
      S3_BUCKET: 'AWS_S3_BUCKET_NAME',
      passKey: 'secret_pass_key_for_passport.js'
    };
    ```
    
4. Install the NPM dependencies
    * Using **yarn**
    ```
    yarn install
    ```
    
   * Using **npm**
   ```
   npm install
   ```
   
5. Start the node server
    ```
    node server.js
    ```
    The server will be listening on port 3000 when in the development envirement. 
    
6. Go to `localhost:3000`