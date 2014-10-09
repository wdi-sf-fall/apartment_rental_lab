var expect = require("chai").expect,
  app = require("../../src/app"),
  Person = app.Person,
  Manager = app.Manager;

describe("Manager", function() {
  var jane;

  beforeEach(function(){
    jane = new Manager("Jane Doe", "123-4567");
  });

  describe("has own props", function(){
    it("should include @name", function() {
      expect(jane.name).to.eql("Jane Doe");
      return false;
    });

    it("should include @contact", function() {
      expect(jane.contact).to.eql("123-4567");
    })
  });

  describe("inheriting from Person", function(){
    it("should still have constructor [Function: Manager]", function() {
      expect(jane.constructor).to.eql(Manager);
    });

    it("should have instanceof Person return true", function() {
      expect(jane instanceof Person).to.eql(true);
    });
  });

  describe("#addBuilding", function(){
    it("should add instances of Building", function() {
      var building = new app.Building("123 Gotham Ave");
      jane.addBuilding(building)
      expect(jane.buildings).to.eql([building]);
    });
  });

  describe("#removeBuilding", function(){
    it("should remove instances of Building", function() {
      var building = new app.Building("123 Gotham Ave");
      jane.addBuilding(building);
      jane.removeBuilding(building);
      expect(jane.buildings).to.eql([]);
    });
  });
});