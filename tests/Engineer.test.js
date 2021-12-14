const Engineer = require("../lib/engineer")

describe("Engineer", () => {
    describe("Initialization of Engineer", () => {
        it("should return value with what it was initialized with", () => {
            const engineer = new Engineer("role","name", "id", "email", "specialproperty")
            expect(engineer.github).toEqual("specialproperty")
        });
        it("should have 5 keys inside the object", () => {
            const engineer = new Engineer("name", "id", "email", "specialproperty")
            expect(Object.keys(engineer).length).toEqual(5)
        });
    });
});
