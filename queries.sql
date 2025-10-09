-- SQL SETUP --

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);

CREATE TABLE visited_countries(
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