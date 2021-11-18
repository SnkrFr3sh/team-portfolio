const inquirer = require('inquirer')
const fs = require('fs')
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js')
// remember to require folders and files as you go

let employees = []

const Employee = {
    Engineer: 'Engineer',
    Intern: 'Intern',
    Manager: 'Manager',
    
}

//function to write answers to a file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        console.log('Error', err)
    }
    )
}


//initialize application
function init(){
    console.log('Application Initializing');
    managerQuestions();
    //add write to file line
}

const managerQuestions = () => {
    inquirer
        .prompt ([
    
    {
        type: 'input',
        message: "Team manager's name:",
        name: "name",
    }, 
    {
        type: 'input',
        message: "Team manager employee ID:",
        name: "ID",
    }, 
    {
        type: 'input',
        message: "Team manager email:",
        name: "email",
        validate: (email) => {
  
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log(`
                ** Please enter a valid email **`)
                return false;
            }
        }
    }, 
    {
        type: 'input',
        message: "Team manager office number:",
        name: "managerOffice",
    }, 
    {
        type: 'confirm',
        message: "Are you ready to add team member information?",
        name: "addTeamInfo",
    }, 

    ])
    .then((answers) =>{
        // const manager = new Manager(
        //     answers.employeeName,
        //     answers.employeeID,
        //     answers.employeeEmail,
        //     answers.officeNumber
        // );
        // employees.push(manager);
        // console.log('manager',manager);

        if (answers.addTeamInfo === true){
            console.log('Please as team member information.')
            employeeQuestions()
        };


    });    
}



const employeeQuestions = () => {
    inquirer
        .prompt([
    // employee class info
    { 
        type: 'input', 
        message: 'Employeer Name:', 
        name: 'name' 
    },
    { 
        type: 'input', 
        message: 'Employee ID:', 
        name: 'ID', 
    },
    { 
        type: 'imput', 
        message: 'Employee Email:', 
        name: 'email', 
        validate: (email) => {
  
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log(`
                    ** Please enter a valid email **`)
                return false;
            }
        }
    },
    { 
        type: 'list', 
        message: 'Role on team:', 
        name: 'employeeType', 
        choices: ['Engineer', 'Intern'] 
    },
    //intern questions
    { 
        type: 'input', 
        message: 'What school do you attend?', 
        name: 'school', 
        when: (answers) => answers.employeeType === 'Intern',
    },
    //engineer questions
    { 
        type: 'input', 
        message: 'Enter your GitHub username: ', 
        name: 'github', 
        when: (answers) => answers.employeeType === 'Engineer', 
    },
    //manager questions
    { 
        type: 'input', 
        message: 'Enter your GitHub username: ', 
        name: 'github', 
        when: (answers) => answers.employeeType === 'Engineer', 
    },
    {
        type: 'confirm',
        message: "Would you like to add another employee to the Team?",
        name: "addEmployee",
    }, 


])
    .then((answers) => {
        if (answers.addEmployee === true){
            console.log('Please add team member information.')
            employeeQuestions()
        } else console.log(employees[answers])
    
    });
}

init()
// set classes and subclasses?