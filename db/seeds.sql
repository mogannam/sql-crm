
-- update department set name='Engineering' where id=1;
-- if @@ROWCOUNT=0
--   insert into department (name) values ('Engineering');
  
insert into department (name)
  values
    ('Engineering'),
    ('Medical'),
    ('Human Resources'),
    ('Reception');

 
insert into role (title,salary,departmentId)
  values
    ('Lead Engineer', 100000.00,1),    
    ('Engineer',90000.00,1),
    ('Chief Medical Officer',100000.00,2),
    ('Counselor',90000.00,3),
    ('Executive Assistant',80000.00,4),
    ('Receptionist', 70000.00,4);

  insert into employee (firstName,lastName,roleId,ManagerId)
    values 
      ('Data','Data',1, null),
      ('Wessley','Crusher',2,1),
      ('Beverly','Crusher',3,null),
      ('Gunian', 'Gunian', 4,3),
      ('Nelix', 'Nelix',5,4),
      ('Kes', 'Kes',6,5);

-- INSERT INTO parties
--   (name, description)
-- VALUES
--   ('JS Juggernauts', 'The JS Juggernauts eat, breathe, and sleep JavaScript. They can build everything you could ever want in JS, including a new kitchen sink.'),
--   ('Heroes of HTML', 'Want to see a mock-up turn into an actual webpage in a matter of minutes? Well, the Heroes of HTML can get it done in a matter of seconds.'),
--   ('Git Gurus', 'Need to resolve a merge conflict? The Git Gurus have your back. Nobody knows Git like these folks do.');

-- INSERT INTO candidates
--   (first_name, last_name, party_id, industry_connected)
-- VALUES
--   ('Ronald', 'Firbank', 1, 1),
--   ('Virginia', 'Woolf', 1, 1),
--   ('Piers', 'Gaveston', 1, 0),
--   ('Charles', 'LeRoi', 2, 1),
--   ('Katherine', 'Mansfield', 2, 1),
--   ('Dora', 'Carrington', 3, 0),
--   ('Edward', 'Bellamy', 3, 0),
--   ('Montague', 'Summers', 3, 1),
--   ('Octavia', 'Butler', 3, 1),
--   ('Unica', 'Zurn', NULL, 1);
  