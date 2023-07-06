	INSERT INTO users (email, password, nome, tipo, diasFerias, dataReg)
VALUES
    ('test@gmail.com', '1234', 'test', 1, 22, '2023-06-30'),
    ('example@gmail.com', 'abc123', 'example', 0, 22, '2023-06-30'),
    ('user@example.com', 'password', 'user', 1, 22, '2023-06-30'),
    ('john.doe@gmail.com', 'test456', 'john doe', 1, 22, '2023-06-30'),
    ('jane.smith@gmail.com', 'p@ssw0rd', 'jane smith', 1, 22, '2023-06-30'),
    ('demo@example.com', 'demo123', 'demo', 1, 22, '2023-06-30'),
    ('admin@admin.com', 'admin123', 'admin', 1, 22, '2023-06-30'),
    ('user1@example.com', 'secret', 'user1', 1, 22, '2023-06-30'),
    ('user2@example.com', '987654', 'user2', 1, 22, '2023-06-30'),
    ('user3@example.com', 'qwerty', 'user3', 1, 22, '2023-06-30');

		-- Insert mock data into the 'holidays' table
INSERT INTO holidays (notas, start_date, end_date, status, id_user)
VALUES
  ('Vacation', '2023-06-25', '2023-06-30', 'Pending', 2),
  ('Holiday Trip', '2023-07-10', '2023-07-15', 'Approved', 2),
  ('Family Vacation', '2023-08-05', '2023-08-15', 'Pending', 3),
  ('Summer Break', '2023-08-20', '2023-08-31', 'Rejected', 4),
  ('Weekend Getaway', '2023-09-08', '2023-09-10', 'Approved', 5),
  ('Vacation 1', '2023-06-25', '2023-06-30', 'Pending', 2),
  ('Vacation 2', '2023-07-05', '2023-07-10', 'Approved', 2),
  ('Vacation 3', '2023-07-15', '2023-07-20', 'Pending', 2),
  ('Vacation 4', '2023-07-25', '2023-07-30', 'Rejected', 2),
  ('Vacation 5', '2023-08-05', '2023-08-10', 'Approved', 2),
  ('Vacation 6', '2023-08-15', '2023-08-20', 'Pending', 2),
  ('Vacation 7', '2023-08-25', '2023-08-30', 'Approved', 3),
  ('Vacation 8', '2023-09-05', '2023-09-10', 'Rejected', 4),
  ('Vacation 9', '2023-09-15', '2023-09-20', 'Pending', 2),
  ('Vacation 10', '2023-09-25', '2023-09-30', 'Approved', 3),
  ('Vacation 11', '2023-10-05', '2023-10-10', 'Rejected', 2),
  ('Vacation 12', '2023-10-15', '2023-10-20', 'Pending', 4),
  ('Vacation 13', '2023-10-25', '2023-10-30', 'Approved', 3),
  ('Vacation 14', '2023-11-05', '2023-11-10', 'Rejected', 2),
  ('Vacation 15', '2023-11-15', '2023-11-20', 'Pending', 2);

  -- Insert mock data into the 'tickets' table
  INSERT INTO tickets (titulo, mensagem, datahora, estado, privacidade, id_user)
VALUES
  ('Issue with login', 'I am unable to login to my account.', '2023-07-01 09:32:15', 'Open', 'Public', 2),
  ('Payment not processed', 'I made a payment but it hasnt been processed yet.', '2023-07-02 14:18:47', 'Open', 'Public', 2),
  ('Product delivery delay', 'I havent received my order yet. When will it be delivered?', '2023-07-03 11:55:21', 'Open', 'Public', 3),
  ('Bug in the app', 'There is a bug in the mobile app. It crashes when I try to open a file.', '2023-07-04 16:45:09', 'Open', 'Public', 4),
  ('Password reset request', 'I forgot my password and need to reset it.', '2023-07-05 10:27:33', 'Open', 'Public', 5),
  ('Wrong billing amount', 'The billing amount on my invoice is incorrect. It should be $150, not $200.', '2023-07-06 13:12:55', 'Open', 'Public', 6),
  ('Feature request', 'I would like to suggest a new feature for the website.', '2023-07-07 08:59:17', 'Open', 'Public', 7),
  ('Data loss issue', 'I lost some important data from my account. Can it be recovered?', '2023-07-08 17:40:42', 'Open', 'Public', 8),
  ('Website downtime', 'The website is currently down. When will it be back up?', '2023-07-09 12:06:29', 'Open', 'Public', 9),
  ('Account suspension', 'My account has been suspended. I would like to know the reason.', '2023-07-10 15:22:51', 'Open', 'Public', 10);


