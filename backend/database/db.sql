--> --- MySQL Command line ---
--> cd C:\laragon\bin\mysql\mysql-8.0.30-winx64\bin
--> mysql -h localhost -u root

CREATE TABLE 'users' (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(50) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE tasks (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    task VARCHAR(100) NOT NULL,
    user_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_tasks FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);