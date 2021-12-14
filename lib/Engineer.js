const Employee = require('./Employee')

class Engineer extends Employee{
    constructor(role, name, id, email, github) {
    super(role, name, id, email)
    this.github = github
}


}

module.exports = Engineer;