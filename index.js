const inquirer = require('inquirer')
const fs = require('fs')
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Employee = require('./lib/Employee.js');
const { response } = require ('express');
// const generateHtml = require('./lib/generateHtml.js');

// remember to require folders and files as you go

let team = [];
var cards = []


function makeCards() {
    console.log('team info within make cards function', team)
    cards = []
    for (let i = 0; i < team.length; i++) {
        if (team[i].role === 'Manager') {
            const managerCard  =  `            
            <div id="manager" class="row justify-content-center">
            <h1 class="col-12" style="text-align: center;">Manager</h1>
            <div class="card" style="width: 18rem;background-color: #273C2C; color: #FFFFFF;">
                <div class="card-body">
                    <h5 class="card-title">${team[i].name}</h5>
                    <h6 class="card-subtitle mb-2 fw-bolder">Manager</h6>
                    <p class="card-text">ID: ${team[i].id}</p>
                    <p class="card-text">Office: ${team[i].officeNumber}</p>
                    <p class="card-text">Email: <a class="link-light" href="mailto:${team[i].email}" target="_blank">${team[i].email}</a></p>
            </div>
        </div>
    </div>`
            cards.push(managerCard)
        } else if (team[i].role === 'Intern') {
            const internCard = `<div class="card col-3" style="width: 18rem;background-color: #3DA35D; color: #FFFFFF;">
            <div class="card-body">
                <h5 class="card-title">${team[i].name}</h5>
                <h6 class="card-subtitle mb-2 fw-bolder">${team[i].getRole()}</h6>
                <p class="card-text">ID: ${team[i].id}</p>
                <p class="card-text">School: ${team[i].school}</p>
                <p class="card-text">Email: <a class="link-light" href="mailto:${team[i].email}" class="card-link">${team[i].email}</a></p>
            </div>
            </div>`
            cards.push(internCard)
        } else if (team[i].role === 'Engineer') {
            const engineerCard = `
            <div class="card col-3" style="width: 18rem;background-color: #3E8914; color: #FFFFFF;">
            <div class="card-body">
                <h5 class="card-title">${team[i].name}</h5>
                <h6 class="card-subtitle mb-2 fw-bolder">${team[i].getRole()}</h6>
                <p class="card-text">ID: ${team[i].id}</p>
                <p class="card-text">Github: <a class="link-light" href="https://github.com/${team[i].github}" target="_blank">${team[i].github}</a></p>
                <p class="card-text">Email: <a class="link-light" href="mailto:${team[i].email}" class="card-link">${team[i].email}</a></p>
            </div>`
            cards.push(engineerCard)
        }

    } console.log('test cards', cards)

}




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
            else {
                console.log('this is the team', team);
            makeCards(team);
            generateHtml();
            }


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
            else { console.log('ALL TEAM INFO', team)
            makeCards(team);
            generateHtml();
        }
            

            // makeCards(team); 


        })

}

const htmlOpen =`
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</head>
<body>
    <nav class="nav-bar has-background-warning is-centered">
        <div class="navbar-menu has-text-centered">
        <div class='navbar-item is-centered'>
            Team Profile
        </div>
        </div>
    </nav>
    <section class="hero has-background-grey-light">
        <p class='hero-body'>body test</p>
    `;
    
const htmlClose =
    `
    </section>
</body>
</html>
    
    `;


function generateHtml(){
const htmlCombined = htmlOpen + cards + htmlClose;
    
console.log("html combined",htmlCombined)

fs.writeFile(
    `./dist/TeamProfile.html`,
    `${htmlCombined}`,
    (err) => err ? console.error(err) : console.log("html generated")
);
}









init()

// set classes and subclasses?