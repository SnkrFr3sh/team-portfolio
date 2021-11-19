
class Manager {
    constructor(name, id, email, officeNumber) {
    this.employeeName = name;
    this.employeeId = id;
    this.employeeEmail = email;
    this.officeNumber = officeNumber;
}

printInfo() {
    console.log("Manager", Manager);
}
}

module.exports = Manager;