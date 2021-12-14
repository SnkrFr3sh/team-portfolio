const Employee = require('./Employee');

class Manager extends Employee {
    constructor(role, name, id, email, officeNumber) {
    // constructor(name, id, email, role, officeNumber) {
        super(role, name, id, email)
        this.officeNumber = officeNumber;
    }


}

module.exports = Manager;