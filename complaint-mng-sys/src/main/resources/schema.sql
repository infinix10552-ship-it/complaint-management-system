-- Create user table if it doesn't exist
CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL
);

-- Create complaint table if it doesn't exist
CREATE TABLE IF NOT EXISTS complaint (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    complaint_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Create indices for better query performance
CREATE INDEX idx_complaint_user_id ON complaint(user_id);
CREATE INDEX idx_complaint_status ON complaint(complaint_status);
CREATE INDEX idx_user_email ON user(email);
