const inquirer = require('inquirer')
const fs = require('fs')
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Employee = require('./lib/Employee.js');
// const generateHtml = require('./lib/generateHtml.js');

// remember to require folders and files as you go

let team = [];
var cards = []




//function to write answers to a file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        console.log('Error', err)
    }
    )
};


//initialize application
function init() {
    console.log('Application Initializing');
    managerQuestions();

    //add write to file line

}

const managerQuestions = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Manager Use Only. What is your role on the team?',
                name: 'role',
                choices: [Manager, 'Not Manager']
            },

            {
                type: 'input',
                message: "Team manager's name:",
                name: "name",
            },
            {
                type: 'input',
                message: "Team manager employee ID:",
                name: "id",
            },
            {
                type: 'input',
                message: "Team manager email:",
                name: "email",
                // validate: (email) => {

                //     valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                //     if (valid) {
                //         return true;
                //     } else {
                //         console.log(`
                // ** Please enter a valid email **`)
                //         return false;
                //     }
                // }
            },
            {
                type: 'input',
                message: "Team manager office number:",
                name: "officeNumber",
            },
            {
                type: 'confirm',
                message: "Are you ready to add team member information?",
                name: "addTeamInfo",
            },

        ])
        .then((answers) => {
            const manager = new Manager(
                answers.name,
                answers.id,
                answers.email,
                answers.role,
                answers.officeNumber,
            );
            team.push(manager);
            //console.log(manager);

            if (answers.addTeamInfo === true) {
                console.log('Please as team member information.')
                employeeQuestions()
            }
            else
                console.log('this is the team', team)
            // makeCards()



        });
}



const employeeQuestions = () => {
    inquirer
        .prompt([
            // employee class info
            {
                type: 'input',
                message: 'Employee Name:',
                name: 'name'
            },
            {
                type: 'input',
                message: 'Employee ID:',
                name: 'id',
            },
            {
                type: 'imput',
                message: 'Employee Email:',
                name: 'email',
                // validate: (email) => {

                //     valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                //     if (valid) {
                //         return true;
                //     } else {
                //         console.log(`
                //     ** Please enter a valid email **`)
                //         return false;
                //     }
                // }
            },
            {
                type: 'list',
                message: 'Role on team:',
                name: 'role',
                choices: [Engineer, Intern]
            },
            //intern questions
            {
                type: 'input',
                message: 'What school do you attend?',
                name: 'school',
                when: (answers) => answers.role === 'Intern',
            },
            //engineer questions
            {
                type: 'input',
                message: 'Enter your GitHub username: ',
                name: 'github',
                when: (answers) => answers.role === 'Engineer',
            },
            {
                type: 'confirm',
                message: "Would you like to add another employee to the Team?",
                name: "addEmployee",
            },


        ])
        .then((answers) => {
            if (answers.role === 'Intern') {
                const intern = new Intern(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.role,
                    answers.school,
                );
                team.push(intern);
                //console.log(intern);
            }
            if (answers.role === 'Engineer') {
                const engineer = new Engineer(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.role,
                    answers.github,
                );
                team.push(engineer);
                //console.log(engineer);
            }

            if (answers.addEmployee === true) {
                console.log('Add new team member information.')
                employeeQuestions()
            }
            else console.log('ALL TEAM INFO', team)
                for (let i = 0; i < team.length; i++) {
                    if (team[i].role === 'Manager') {
                        cards.push(`<h1>  Hi I'm ${team[i].name}, the team manager</h1>`)
                    } else if (team[i].role === 'Intern') {
                        cards.push(`<h1>Our intern,${team[i].name} is great!</h1>`)
                    } else if (team[i].role === 'Engineer') {
                        cards.push(`<h1>Shout out to Enginner ${team[i].name}!</h1>`)
                    }
            
                } console.log('test cards', cards)
            
            

            // makeCards(team); 


        })

}



init()

// set classes and subclasses?