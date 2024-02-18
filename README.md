# API Pdf

### ℹ️ Project description

This project is a pdf generator that contains an API on Express server, a database in mySQL

## Getting started

### ⚙️ Prerequisites

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [mySQL server](https://dev.mysql.com/downloads/mysql/)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)


> [!TIP]
> I recommend using Nodemon to run this project. It will automatically restart the server when file changes are detected. You can install it using the following command:
> ```bash
> npm install -g nodemon
> ```


### 🚦 Run the project

Follow these steps to run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Nyoote/api-pdf.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd api-pdf
   ```
   
3. **Create Database:**

    - Run your mySQL server
    - Run the following mySQL script to create a database:
        ```sql
        CREATE DATABASE IF NOT EXISTS PDF_DATABASE;
        USE PDF_DATABASE;
        CREATE TABLE IF NOT EXISTS DOCUMENT (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            TITLE_PDF VARCHAR(255) NOT NULL,
            DATE_PDF DATETIME DEFAULT CURRENT_TIMESTAMP,
            FIRSTNAME_USER VARCHAR(255) NOT NULL,
            LASTNAME_USER VARCHAR(255) NOT NULL,
            TYPE_POKEMON_USER VARCHAR(255) NOT NULL,
            GAME_POKEMON_USER VARCHAR(255) NOT NULL
        );
        ```
4. **Create a `.env` file and set your environment variables:**

    - Create a `.env` file in your `root` directory 
    - Set your environment variables by replacing them in the following code :
        ```.env
        DB_HOST = 'your_database_host_here'
        DB_USER = 'your_database_username_here'
        DB_PASSWORD = 'your_database_password_here'
        DB_DATABASE =  'your_database_name_here'
        ```



5. **Install dependencies and run the server:**

   - Install its dependencies and run the server using the following commands:

   ```bash
   # In the /root directory
   npm install
   node ./server.ts or nodemon ./server.ts
   ```

   This should install the server's dependencies and start your Express server on the port `3000` and accessible on [http://localhost:3000](http://localhost:3000).

6. **Open the HTML page:**

   Use Live Server to open the HTML Page
    - Right click in `index.html`
    - Click on to `Open with Live Server`

    Or
    - Open `index.html` file in the editor
    - Click on `Go Live` in the status bar

   This should open the html page on the port `5500` and accessible on [http://localhost:5500](http://localhost:5500).
