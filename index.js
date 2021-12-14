const inquirer = require('inquirer')
const fs = require('fs')
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
let team = [];
let cards = []

//initialize application
function init() {
    console.log('Application Initializing');
    managerQuestions();
}

// Opening questions, starts with Manager Info
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
                answers.role,
                answers.name,
                answers.id,
                answers.email,
                answers.officeNumber,
            );
            team.push(manager);
            //console.log(manager)
            if (answers.role === 'Not Manager') {
                return console.log("Error: Managers' Only")
            }
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
                    answers.role,
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.school,
                );
                team.push(intern);
                //console.log(intern);
            }
            if (answers.role === 'Engineer') {
                const engineer = new Engineer(
                    answers.role,
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.github,
                );
                team.push(engineer);
                //console.log(engineer);
            }

            if (answers.addEmployee === true) {
                console.log('Add new team member information.')
                employeeQuestions()
            }
            else {
                console.log('ALL TEAM INFO', team)
                makeCards(team);
                generateHtml();
            }


            // makeCards(team); 


        })

}

function makeCards() {
    console.log('team info within make cards function', team)
    cards = []
    for (let i = 0; i < team.length; i++) {
        if (team[i].role === 'Manager') {
            const managerCard = 
`
<div id="manager" class="row justify-content-center">
<div class="card is-centered has-background-grey-darker has-text-white mb-4">
    <div class="card-body">
        <p class="card-header title is-4 p-2 has-background-grey has-text-white">${team[i].role}: ${team[i].name}</p>
        <p class="px-2">ID: ${team[i].id}</p>
        <p class="px-2">Office: ${team[i].officeNumber}</p>
        <p class="px-2 pb-4">Email: <a class="link-light" href="${team[i].email}"
                target="_blank">${team[i].email}</a></p>
    </div>
</div>
</div>
<section class='columns is-multiline'>
<p class='has-text-grey-light'>
`
            cards.push(managerCard)
        } else if (team[i].role === 'Intern') {
            const internCard = 
`
</p>
<div class="card column is-one-quarter mb-4">
    <div class="card-body">
        <p class="card-header title is-4 p-2 has-background-grey has-text-white">${team[i].name}</p>
        <p class="px-2">${team[i].role}</p>
        <p class="px-2">ID: ${team[i].id}</p>
        <p class="px-2">School: ${team[i].school}</p>
        <p class="px-2 pb-2">Email: <a class="link-light" href="mailto:${team[i].email}"
                class="card-link">${team[i].email}</a></p>
    </div>
</div>
<p class='has-text-grey-light'>
`
            cards.push(internCard)
        } else if (team[i].role === 'Engineer') {
            const engineerCard = 
`
</p>

    <div class="card column is-one-quarter mb-4">
        <div class="card-body">
            <p class="card-header title is-4 p-2 has-background-grey has-text-white">${team[i].name}</p>
            <p class="px-2">${team[i].role}</p>
            <p class="px-2">ID: ${team[i].id}</p>
            <p class="px-2">Github: <a class="link-light" href="https://github.com/${team[i].github}"
                    target="_blank">${team[i].github}</a></p>
            <p class="px-2 pb-2">Email: <a class="link-light" href="mailto:${team[i].email}"
                    class="card-link">${team[i].email}</a></p>
        </div>
    </div>
    <p class='has-text-grey-light '>
`
            cards.push(engineerCard)
        }

    } console.log('test cards', cards)

}

const htmlOpen = `
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
    <nav class="nav-bar has-background-grey-darker is-centered py-4">
        <div class="nav-brand title is-2 px-2 has-text-white">
            Team Profile
        </div>
    </nav>
    <section class="hero has-background-grey-light">
        <div class='hero-body'>
    `;

const htmlClose =
    `
    </p>
        </div>
    </section>
</body>

</html>
    
    `;

function generateHtml() {
    const htmlCombined = htmlOpen + cards + htmlClose;

    console.log("html combined", htmlCombined)

    fs.writeFile(
        `./dist/TeamProfile.html`,
        `${htmlCombined}`,
        (err) => err ? console.error(err) : console.log("html generated")
    );
}









init()

// set classes and subclasses?