import inquirer from 'inquirer';
import { connectToDb } from './db';
import {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    getEmployeesByManager,
    getEmployeesByDepartment,
    getManagers
} from './queries';

const menu = async (): Promise<void> => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update employee manager', 
                'View employees by manager', 
                'View employees by department', 
                'Delete a department', 
                'Delete a role', 
                'Delete an employee', 
                'Exit',
            ],
        },
    ]);

    switch (action) {
        case 'View All Departments':
            console.table(await getDepartments());
            break;

        case 'View All Roles':
            console.table(await getRoles());
            break;

        case 'View All Employees':
            console.table(await getEmployees());
            break;

        case 'Add a Department':
            const { name } = await inquirer.prompt([{ type: 'input', name: 'name', message: 'Enter department name:' }]);
            await addDepartment(name);
            console.log('Department added successfully.');
            break;

        case 'Add a Role':
            const departments = await getDepartments();
            const { title, salary, department_id } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter role title:' },
                { type: 'input', name: 'salary', message: 'Enter role salary:' },
                { type: 'list', name: 'department_id', message: 'Select department:', choices: departments.map(dept => ({ name: dept.name, value: dept.id })) },
            ]);
            await addRole(title, parseFloat(salary), department_id);
            console.log('Role added successfully.');
            break;

        case 'Add an Employee':
            const roles = await getRoles();
            const employees = await getEmployees();
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                { type: 'input', name: 'first_name', message: 'Enter employee first name:' },
                { type: 'input', name: 'last_name', message: 'Enter employee last name:' },
                { type: 'list', name: 'role_id', message: 'Select role:', choices: roles.map(role => ({ name: role.title, value: role.id })) },
                { type: 'list', name: 'manager_id', message: 'Select manager:', choices: [{ name: 'None', value: null }, ...employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))] },
            ]);
            await addEmployee(first_name, last_name, role_id, manager_id);
            console.log('Employee added successfully.');
            break;

        case 'Update an Employee Role':
            const employeeList = await getEmployees();
            const roleList = await getRoles();
            const { employee_id, new_role_id } = await inquirer.prompt([
                { type: 'list', name: 'employee_id', message: 'Select employee to update:', choices: employeeList.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })) },
                { type: 'list', name: 'new_role_id', message: 'Select new role:', choices: roleList.map(role => ({ name: role.title, value: role.id })) },
            ]);
            await updateEmployeeRole(employee_id, new_role_id);
            console.log('Employee role updated successfully.');
            break;

        case 'Update employee manager':
            const employeesList = await getEmployees();
            const { employee_id: empId, manager_id: manId } = await inquirer.prompt([
                { type: 'list', name: 'employee_id', message: 'Select employee to update:', choices: employeesList.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })) },
                { type: 'list', name: 'manager_id', message: 'Select new manager:', choices: employeesList.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })) },
            ]);
            await updateEmployeeManager(empId, manId);
            console.log('Employee manager updated successfully.');
            break;

        case 'Delete a department':
            const departmentsListToDelete = await getDepartments();
            const { department_id: deptId } = await inquirer.prompt([
                { type: 'list', name: 'department_id', message: 'Select department to delete:', choices: departmentsListToDelete.map(dept => ({ name: dept.name, value: dept.id })) },
            ]);
            await deleteDepartment(deptId);
            console.log('Department deleted successfully.');
            break;

        case 'Delete a role':
            const rolesList = await getRoles();
            const { role_id: roleId } = await inquirer.prompt([
                { type: 'list', name: 'role_id', message: 'Select role to delete:', choices: rolesList.map(role => ({ name: role.title, value: role.id })) },
            ]);
            await deleteRole(roleId);
            console.log('Role deleted successfully.');
            break;

        case 'Delete an employee':
            const employeesListToDelete = await getEmployees();
            const { employee_id: empIdToDelete } = await inquirer.prompt([
                { type: 'list', name: 'employee_id', message: 'Select employee to delete:', choices: employeesListToDelete.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })) },
            ]);
            await deleteEmployee(empIdToDelete);
            console.log('Employee deleted successfully.');
            break;
        
        case 'View employees by manager':
            const managersList = await getManagers();
            const { manager_id: manIdView } = await inquirer.prompt([
                { type: 'list', name: 'manager_id', message: 'Select manager to view employees:', choices: managersList.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })) },
            ]);
            console.table(await getEmployeesByManager(manIdView));
            break;

        case 'View employees by department':
            const departmentsListToView = await getDepartments();
            const { department_id: deptIdView } = await inquirer.prompt([
                { type: 'list', name: 'department_id', message: 'Select department to view employees:', choices: departmentsListToView.map(dept => ({ name: dept.name, value: dept.id })) },
            ]);
            console.table(await getEmployeesByDepartment(deptIdView));
            break;
        
        case "Get the Managers List":
            console.table(await getManagers());
            break;
            
        default:
            console.log('Have a great Day!!');
            process.exit(0);
    }

    menu();
};

(async () => {
    await connectToDb();
    menu();
})();