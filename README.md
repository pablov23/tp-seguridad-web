### Built With

* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [Passport](https://www.npmjs.com/package/passport)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/pablov23/tp-seguridad-web
   ```
2. Install NPM packages in root folder and /client folder
   ```sh
   npm install
   ```
3. Create and configure your .env file in root folder
   ```js
    DB_HOST='127.0.0.1'
    DB_USER=''
    DB_PASSWORD=''
    DATABASE=''
   ```
4. Import sql database template to server (one-place.sql)
5. Add first admin account
6. Run app with <a href="https://www.npmjs.com/package/concurrently">concurrently</a> library (node.js and react app at the same time)
   ```sh
   npm run dev | npm run build
   ```
<p align="right">(<a href="#top">back to top</a>)</p>

