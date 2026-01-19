-- db/users_seed.sql
INSERT INTO users (username, email, password, balance)
VALUES ('admin', 'admin@example.com', '$2b$10$9QSu9caScs6XqX3kwggIwOBbJPxUvedz3NFZnZHlqFUFiYL8atEji', 100000.00)
ON CONFLICT DO NOTHING; -- Assuming you might add a unique constraint later or just to be safe
