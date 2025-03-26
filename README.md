# Employee Tracker

![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)

## Description

This is a TypeScript command line application that uses postgresql to query data tables and to performance actions. This helps to manage a company's employee database. The user has the ability to choose to view the data in the Department, Role, and Employee table, view employees by manager or view employees by department. Users can add Employees, Roles, and Departments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributions](#contributions)
- [Tests](#tests)
- [Questions](#questions)

## Installation

1. Open the command line and navigate to the location on your machine where you would like the application installed.
2. Install Node.js or Bun (if not already installed). Node.js and/ or Bun will allow you to run the application directly in the command line.
3. Package Manager
   If using Bun, in the command line, enter: Bun init to initilize and create the package.json.
4. Use the command line to install the inquirer package by entering: bun i.
5. Install Postgresql. Navigate to their website and install the application for your OS.
   [Postgresql](https://www.postgresql.org/download/)

## Usage

In the command line, navigate (cd 'folder name') to the sql folder. 1. In the command line enter 'postgres -U [username]' 2. Enter \i schema.sql
This will create your databse, tables, and also connect to your newly created database.

    3. Enter \i seeds.sql
    This will populate the tables with data.

    4. Enter \i q to exit out of postgres.

Once the sql files have ran, navigate to the folder with index.ts and enter bun run index.ts in the command line.

You will be prompted with a series of actions to choose from. Once you are done with the application, you can exit the actions by either selecting Quit or by selecting ctrl + c on your keyboard.

## License

Licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Contributions

N/A

## Tests

To test the application, open the command line and navigate to the directory where index.ts is located. Type 'bun index.ts'. Select the action(s) you would like to test.

## Questions

If you have any questions, please email me at <bud.triplett@yahoo.com> or for more information visit [GitHub](https://github.com/budtriplett).
