var Person = require("./person");
var Building = require("../rental_property/building");


function Manager(name, contact) {
  // set name and contact
  Person.call(this, name, contact);
  this.buildings = [];
}

Manager.prototype = new Person();
Manager.prototype.constructor = Manager;

Manager.prototype.addBuilding = function(building) {
  // check if building is an INSTANCEOF a Building
  if (building instanceof Building) {
    this.buildings.push(building);
  } else {
    console.error("Failed to add building:", building);
  }

  return this;
};

Manager.prototype.removeBuilding = function(building) {
  // remove building
  var indexOfBuilding = this.buildings.indexOf(building);
  if(indexOfBuilding !== -1) {
   this.buildings.splice(indexOfBuilding, 1);
  } else {
    console.error("Failed to remove building:", building);
  }

  return this;
};

module.exports = Manager;