"use strict"

function Building(address) {
  // building has an address
  // ...
  // and array of units
  // ...
}

Building.prototype.setManager = function(person) {
  // set this.manager to person. Person needs to be of type Manager
  // ...
};

Building.prototype.getManager = function(){
  // return this.manager 
  // ..
};

Building.prototype.addTenant = function(unit, tenant) {
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  // Note that tenenat does not belong to Building, but to Unit
  // ...
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  // ...
};

Building.prototype.availableUnits = function(){
  // return units available
  // ...
};

Building.prototype.rentedUnits = function(){
  // return rented units
  // ...
};

module.exports = Building;
