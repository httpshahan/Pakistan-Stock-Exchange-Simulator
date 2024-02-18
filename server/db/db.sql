CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance NUMERIC(10,2) DEFAULT 100000.00
);

CREATE TABLE stock (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) UNIQUE NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    sector VARCHAR(50),
    description TEXT
);

CREATE TABLE stock_data (
    id SERIAL PRIMARY KEY,
    stock_symbol VARCHAR(10) NOT NULL,
    ldcp NUMERIC(10,2),
    open NUMERIC(10,2),
    high NUMERIC(10,2),
    low NUMERIC(10,2),
    current NUMERIC(10,2),
    change NUMERIC(10,2),
    change_percent VARCHAR(10),
    volume INTEGER,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (stock_symbol) REFERENCES stock(symbol)
);

CREATE TABLE user_assets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    stock_symbol VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_price NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (stock_symbol) REFERENCES stock(symbol)
);

CREATE TABLE user_watchlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    stock_symbol VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    stock_symbol VARCHAR(20) NOT NULL,
    transaction_type CHAR(1) NOT NULL, -- 'B' for Buy, 'S' for Sell
    quantity INTEGER NOT NULL,
    transaction_price NUMERIC(10,2) NOT NULL,
    transaction_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE password_resets (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


