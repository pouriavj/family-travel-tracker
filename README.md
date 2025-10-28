# 🌍 Family Travel Tracker

![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.18-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)
![EJS](https://img.shields.io/badge/EJS-3.1-red?logo=ejs)
![ES6](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![License](https://img.shields.io/badge/license-MIT-green)


An interactive web application that lets users track and visualize the countries they’ve visited on a world map.  
Built with **Node.js**, **Express**, **EJS**, and **PostgreSQL**, it allows multiple users (e.g., family members) to track their visited countries individually. Each user has a personal color, and switching between user tabs updates the map to show their specific visited countries.”

---

## ✨ Features

- 👥 Multiple users with personalized profiles  
- 🗺️ Interactive world map highlighting each user's visited countries in their chosen color  
- 🎨 Each user selects a custom color when created  
- ➕ Add new countries for the active user via input form  
- 🔄 Easily switch between users to view their maps  
- ⚠️ Smart error handling for invalid or duplicate country entries  
- 💾 Data persistence with PostgreSQL  



---

## 📸 Demo

![Travel Tracker Screenshot](./familyTravelTracker.gif)  



---

## 🗄️ Database Setup (Using pgAdmin / PostgreSQL)

Follow these steps to set up the PostgreSQL database for **Travel Tracker**.

---

### 🧩 Step 1: Create a New Database
1. Open **pgAdmin** and connect to your PostgreSQL server.  
2. Right-click on **Databases** → click **Create** → **Database**.  
3. Enter the name: `travelTracker`.  
4. Click **Save**.

---

### 🧱 Step 2: Create the Required Tables

1. Right-click on your new database → choose **Query Tool**.  
2. Paste and run this SQL command:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) UNIQUE NOT NULL,
    color VARCHAR(15)
);

CREATE TABLE visited_countries (
    id SERIAL,
    country_code CHAR(2) NOT NULL,
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY (country_code, user_id)
);

INSERT INTO users (name, color)
VALUES ('World Map', 'teal');

-- Optional Join --

SELECT *
FROM visited_countries
JOIN users
ON users.id = user_id;
```
3. Click Execute (▶️) to create the tables.

---


### 📥 Step 3: Import the `countries.csv` File

1. In **pgAdmin**, expand your database → right-click on the **countries** table → choose **Import/Export Data**.  
2. Under **Filename**, browse and select the `countries.csv` file from your project folder.  
3. Set **Format** to `CSV`.  
4. Check ✅ **Header** (to include the first line of the CSV as column names).  
5. Leave **Delimiter** as a comma `,`.  
6. Click **OK** to import the data.

> 💡 **Tip:**  
> - The `countries.csv` file must contain columns named `id`, `country_code`, and `country_name`.  
> - The `id` column should be defined as `SERIAL PRIMARY KEY` so PostgreSQL will automatically continue numbering for any new rows inserted later.
> - The `users` table stores each family member’s `name` and `color`.
> - The `visited_countries` table links countries to specific users using the `user_id` foreign key.

---

## 🔑 Database Authentication

The app connects to PostgreSQL using your own username, password, and database name.  
Open `index.js` and replace the placeholder values with your actual credentials:

```js
const db = new pg.Client({
  user: "your-username-here",      // ← Your PostgreSQL username
  host: "localhost",               // ← Usually localhost
  database: "travelTracker",       // ← Your database name
  password: "your-password-here",  // ← Your PostgreSQL password
  port: 5432,                      // ← Default PostgreSQL port
});
```

---
## ⚠️ Error Handling

The multi-user Travel Tracker app handles errors and edge cases automatically:

- 🔡 **Case and Name Flexibility:**  
  Users can enter full or partial country names in any capitalization (e.g., "iran", "america", or "kongo"), and the app will correctly match using the SQL `LIKE` operator and lowercase comparison.

- 🏷️ **Invalid or Unknown Country:**  
  Attempting to add a country that does not exist in the database is caught by the application. (Currently logged in server console; can be extended for user-facing messages.)

- 🔁 **Duplicate Country Per User:**  
  The database schema enforces uniqueness per user (`PRIMARY KEY (country_code, user_id)`), so the same user cannot add the same country twice, while other users can still add it.

- 👥 **User Context Awareness:**  
  Each user's visited countries are tracked independently. Switching users updates the map and counts accordingly.

---
## 👥 Managing Users

- Select an existing user from the dropdown to view their visited countries.  
- Click **“Add New User”** to create a new profile — enter a name and pick a color.  
- Each user’s map is automatically highlighted using their selected color.

---

## ⚙️ How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/travel-tracker.git
   cd travel-tracker
   ```
2. **Install dependencies**
   ```bash
   npm install

   ```
3. **Start the server**
   ```bash
   node index.js
   ```
4. **Open the app**
   Visit 👉 http://localhost:3000
   in your browser.
> 💡 **Tip:**  
> To use a different port, open `index.js` and change  
> `const port = 3000;` to your preferred port number.

---

## 🛠️ Built With

### Core Tech
- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  
- [EJS](https://ejs.co/)  
- HTML5 / CSS3  

### Additional Libraries
- [pg](https://www.npmjs.com/package/pg) – PostgreSQL client for Node.js  
- [body-parser](https://www.npmjs.com/package/body-parser) – to parse form submissions


