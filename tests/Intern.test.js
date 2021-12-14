const Intern = require("../lib/intern")

describe("Intern", () => {
    describe("Initialization of Intern", () => {
        it("should have 5 keys inside the object", () => {
            const intern = new Intern("role","id","name", "email", "specialproperty")
            expect(Object.keys(intern).length).toEqual(5)
        });
        it("should return value with what it was initialized with", () => {
            const intern = new Intern("role","id","name", "email", "specialproperty")
            expect(intern.school).toEqual("specialproperty")
        });
    });

});