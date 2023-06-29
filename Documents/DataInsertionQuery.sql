	INSERT INTO users (email, password, nome)
VALUES
    ('test@gmail.com', '1234', 'test'),
    ('example@gmail.com', 'abc123', 'example'),
    ('user@example.com', 'password', 'user'),
    ('john.doe@gmail.com', 'test456', 'john doe'),
    ('jane.smith@gmail.com', 'p@ssw0rd', 'jane smith'),
    ('demo@example.com', 'demo123', 'demo'),
    ('admin@admin.com', 'admin123', 'admin'),
    ('user1@example.com', 'secret', 'user1'),
    ('user2@example.com', '987654', 'user2'),
    ('user3@example.com', 'qwerty', 'user3');

	-- Insert mock data into the 'holidays' table
INSERT INTO holidays (notas, start_date, end_date, status, id_user)
VALUES
  ('Vacation', '2023-06-25', '2023-06-30', 'Pending', 1),
  ('Holiday Trip', '2023-07-10', '2023-07-15', 'Approved', 2),
  ('Family Vacation', '2023-08-05', '2023-08-15', 'Pending', 3),
  ('Summer Break', '2023-08-20', '2023-08-31', 'Rejected', 4),
  ('Weekend Getaway', '2023-09-08', '2023-09-10', 'Approved', 5),
  ('Vacation 1', '2023-06-25', '2023-06-30', 'Pending', 1),
  ('Vacation 2', '2023-07-05', '2023-07-10', 'Approved', 1),
  ('Vacation 3', '2023-07-15', '2023-07-20', 'Pending', 1),
  ('Vacation 4', '2023-07-25', '2023-07-30', 'Rejected', 1),
  ('Vacation 5', '2023-08-05', '2023-08-10', 'Approved', 1),
  ('Vacation 6', '2023-08-15', '2023-08-20', 'Pending', 1),
  ('Vacation 7', '2023-08-25', '2023-08-30', 'Approved', 1),
  ('Vacation 8', '2023-09-05', '2023-09-10', 'Rejected', 1),
  ('Vacation 9', '2023-09-15', '2023-09-20', 'Pending', 1),
  ('Vacation 10', '2023-09-25', '2023-09-30', 'Approved', 1),
  ('Vacation 11', '2023-10-05', '2023-10-10', 'Rejected', 1),
  ('Vacation 12', '2023-10-15', '2023-10-20', 'Pending', 1),
  ('Vacation 13', '2023-10-25', '2023-10-30', 'Approved', 1),
  ('Vacation 14', '2023-11-05', '2023-11-10', 'Rejected', 1),
  ('Vacation 15', '2023-11-15', '2023-11-20', 'Pending', 1);

