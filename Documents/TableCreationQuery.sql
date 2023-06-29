-- Create the 'users' table
CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL
);

-- Create the 'holidays' table
CREATE TABLE holidays (
  id INT IDENTITY(1,1) PRIMARY KEY,
  notas VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  id_user INT,
  FOREIGN KEY (id_user) REFERENCES users(id)
  );