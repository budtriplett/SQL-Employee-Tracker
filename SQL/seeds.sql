INSERT INTO department (name) VALUES 
('Sales'),
('Engineering'),
('HR'),
('Marketing'),
('Finance');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 75000, 1), 
('Engineer', 90000, 2), 
('HR Manager', 80000, 3), 
('Marketing Specialist', 65000, 4),
('Finance Analyst', 70000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Carter', 'Wells', 1, NULL),       
('Ava', 'Kim', 2, 1),               
('Ethan', 'Parker', 3, NULL),      
('Sophie', 'Lopez', 4, 1),          
('Mason', 'Gonzalez', 5, NULL),     
('Nora', 'Chavez', 2, 2),            
('Luca', 'Reid', 3, 3),             
('Charlotte', 'Foster', 4, 1),      
('Xander', 'Bennett', 5, 5),        
('Zara', 'Singh', 2, 2);             
