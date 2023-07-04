-- Create the 'users' table
CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  tipo bit NOT NULL
);

-- Create the 'holidays' table
CREATE TABLE holidays (
  id INT IDENTITY(1,1) PRIMARY KEY,
  notas VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(255) NOT NULL default('Pendente'),
  id_user INT,
  FOREIGN KEY (id_user) REFERENCES users(id)
  );

-- Create the 'tickets' table
  CREATE TABLE tickets (
	id INT IDENTITY	(1,1) PRIMARY KEY,
	titulo VARCHAR(255) NOT NULL,
	mensagem VARCHAR(MAX) NOT NULL,
	datahora DATETIME NOT NULL,
	estado VARCHAR(255),
	privacidade VARCHAR(255),
	id_user INT, FOREIGN KEY (id_user) REFERENCES users(id)
);