
class Engineer {
    constructor(name, id, email, officeNumber) {
    this.employeeName = name;
    this.employeeId = id;
    this.employeeEmail = email;
    this.officeNumber = officeNumber;
}

printInfo() {
    console.log("Engineer", Engineer);
}
}

module.exports = Engineer;