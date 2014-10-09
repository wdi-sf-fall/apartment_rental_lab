var Person = require("./person");
var Building = require("../rental_property/building");

function Manager(name, contact) {
  // inherit name and contact
  // ...
  // manager manages an 'array' of buildings
  // ...

}

// Set prototype and constructor
// ...

Manager.prototype.addBuilding = function(building) {
  // check if building is an INSTANCEOF a Building
  // ...
  return this;
};

Manager.prototype.removeBuilding = function(building) {
  // remove building
  // ...
  return this;
};

module.exports = Manager;