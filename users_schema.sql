CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    user_phone VARCHAR(15),
    user_role VARCHAR(50)
);
