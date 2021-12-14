const Manager = require("../lib/manager")

describe("Manager", () => {
    describe("Initialization of Manager", () => {
        it("should return value with what it was initialized with", () => {
            const manager = new Manager("role","name", "id", "email", "specialproperty")
            expect(manager.officeNumber).toEqual("specialproperty")
        });
        it("should have 5 keys inside the object", () => {
            const manager = new Manager("role","name", "id", "email", "specialproperty")
            expect(Object.keys(manager).length).toEqual(5)
        });
    });
});