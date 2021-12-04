DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS voters;

drop table if exists employee;
drop table if exists role;
drop table if exists department;


CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
);


create table role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL UNIQUE,
  salary decimal(10) NOT NULL,
  departmentId INTEGER,
  CONSTRAINT fk_department
    FOREIGN KEY (departmentId)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  firstName varchar(30) NOT NULL,
  lastName varchar(30) NOT NULL,
  roleId integer,
  managerId integer,
  CONSTRAINT fk_roleId FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE CASCADE
  -- CONSTRAINT fk_managerId FOREIGN KEY (managerId) REFERENCES employee(id) ON DELETE CASCADE
);

-- CREATE TABLE voters (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   email VARCHAR(50) NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE votes (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   voter_id INTEGER NOT NULL,
--   candidate_id INTEGER NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT uc_voter UNIQUE (voter_id),
--   CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
--   CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
-- );
