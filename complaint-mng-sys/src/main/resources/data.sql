INSERT INTO user (username, password, email, role) VALUES
('Aman Sharma', 'password123', 'aman@gmail.com', 'USER'),
('Rahul Verma', 'password456', 'rahul@gmail.com', 'ADMIN'),
('Sneha Patil', 'password789', 'sneha@gmail.com', 'USER');

INSERT INTO complaint (title, description, category, created_at, complaint_status, user_id) VALUES
('Internet not working', 'WiFi disconnects frequently since morning', 'Network', '2026-02-01 10:30:00', 'PENDING', 1),
('Water leakage in bathroom', 'Continuous leakage from pipe near sink', 'Plumbing', '2026-02-02 14:15:00', 'IN_PROGRESS', 2),
('Electricity fluctuation', 'Lights flickering every few minutes', 'Electrical', '2026-02-03 18:45:00', 'RESOLVED', 1),
('Garbage not collected', 'Garbage bin has not been cleared for 3 days', 'Sanitation', '2026-02-04 09:20:00', 'PENDING', 3),
('Broken street light', 'Street light outside building not working', 'Infrastructure', '2026-02-05 21:00:00', 'REJECTED', 2);


