const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "testing123",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
console.log("Connected");
startApp();
});

function startApp(){
    inquirer.prompt([
        {
          type: 'list',
          name: 'commandOptions',
          message: 'What do you want to do?',
          choices: ["View Employee", "Add Employee", "Delete Employee"]
        }
      ]).then(userAnswer => {
        switch(userAnswer.commandOptions){
            case "View Employee":
                showAllEmployee();
                break;
            case "Add Employee":
                insertEmployee();
                break;
            case "Delete Employee":
                deleteEmployee(6);
                break;
            default: 
                process.exit(1);

        }
      })
}

function showAllEmployee(){
    connection.query('SELECT * FROM employee ', function (error, results) {
        if (error) throw error;
        console.table(results);
        
      });
}

function deleteEmployee(id){
    connection.query('DELETE FROM employee WHERE id = ?',[id], function (error, results) {
        if (error) throw error;
        console.log(results);
      })
}

function insertEmployee(){
    var employeeData  = {first_name:'Jennifer', last_name:'White', role_id:1, manager_id:4};
   
var query = connection.query('INSERT INTO employee SET ?', employeeData, function (error, results) {
  if (error) throw error;
  console.log(results);
});
}
