CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    due_date TIMESTAMP,
    start_date TIMESTAMP,
    name VARCHAR,
    description TEXT,
    user_id INT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)