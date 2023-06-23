	INSERT INTO users (email, password)
VALUES
    ('test@gmail.com', '1234'),
    ('example@gmail.com', 'abc123'),
    ('user@example.com', 'password'),
    ('john.doe@gmail.com', 'test456'),
    ('jane.smith@gmail.com', 'p@ssw0rd'),
    ('demo@example.com', 'demo123'),
    ('admin@admin.com', 'admin123'),
    ('user1@example.com', 'secret'),
    ('user2@example.com', '987654'),
    ('user3@example.com', 'qwerty');

	-- Insert mock data into the 'holidays' table
INSERT INTO holidays (notas, start_date, end_date, status, id_user)
VALUES
  ('Vacation', '2023-06-25', '2023-06-30', 'Pending', 1),
  ('Holiday Trip', '2023-07-10', '2023-07-15', 'Approved', 2),
  ('Family Vacation', '2023-08-05', '2023-08-15', 'Pending', 3),
  ('Summer Break', '2023-08-20', '2023-08-31', 'Rejected', 4),
  ('Weekend Getaway', '2023-09-08', '2023-09-10', 'Approved', 5);

