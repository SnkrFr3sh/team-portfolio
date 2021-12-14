const Employee = require('./Employee');

class Intern extends Employee {
    constructor(role, id, name, email, school) {
        super(role, id, name, email,)
        this.school = school;
    }

}


module.exports = Intern;