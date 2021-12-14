const Employee = require("../lib/employee")

describe("Employee", () => {
    describe("Initialization of Employee", () => {
        it("should return value with what it was initialized with", () => {
            const employee = new Employee("role","name", "id", "email")
            expect(employee.email).toEqual("email")
        });
        it("should have 4 keys inside the object", () => {
            const employee = new Employee("role","name", "id", "email")
            expect(Object.keys(employee).length).toEqual(4)
        });
    });
});