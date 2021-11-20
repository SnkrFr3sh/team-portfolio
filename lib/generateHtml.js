// function makeCards(team) {
//     console.log('team info within make cards function', team)
//     cards = []
//     for (let i = 0; i < team.length; i++) {
//         if (team[i].role === 'Manager') {
//             cards.push(`<h1>  Hi I'm ${team[i].name}, the team manager</h1>`)
//         } else if (team[i].role === 'Intern') {
//             cards.push(`<h1>Our intern,${team[i].name} is great!</h1>`)
//         } else if (team[i].role === 'Engineer') {
//             cards.push(`<h1>Shout out to Enginner ${team[i].name}!</h1>`)
//         }

//     } console.log('test cards', cards)

// }




function generateHtml() {
    return `
    
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
        ${data.card}
    </section>
</body>
</html>
    
    `
}

module.exports = generateHtml();