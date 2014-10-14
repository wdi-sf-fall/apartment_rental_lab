"use strict"
var _ = require('underscore');

function Building(address) {
  this.address = address;
  this.units = [];
}

Building.prototype.setManager = function(person) {
  // set this.manager to person

  if(person.constructor.name === "Manager"){
    this.manager = person;
  }

  return this;
};

Building.prototype.getManager = function(){
  // return this.manager 
  return this.manager;
};

Building.prototype.addTenant = function(unit, tenant) {
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  var validUnit = this.units.indexOf(unit) !== -1 && unit.available();
  var validTenant = tenant.references.length >= 2 && tenant.constructor.name === "Tenant";

  if(this.manager && validUnit && validTenant){
    unit.tenant = tenant;
  }
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  var validUnit = this.units.indexOf(unit) !== -1;
  var validTenant = unit.tenant === tenant;
  if(this.manager && validUnit && validTenant){
    unit.tenant = null;
  }
};

Building.prototype.availableUnits = function(){
  // return units available
  return this.units.filter(function(unit){
    return unit.available();
  });
};

Building.prototype.rentedUnits = function(){
  // return rented units
  return this.units.filter(function(unit){
    return !unit.available();
  });
};

Building.prototype.totalSqftRented = function(){
  // returns totale sqft rented
  var runningTotal = 0;

  var sum =  _.reduce(this.units, 
              function(runningTotal, aUnit){
                if (!(aUnit.available())){
                  return runningTotal + aUnit.sqft;
                } else
                  return runningTotal;   
              }, 
              0);
  return (sum == undefined) ? 0 : sum;
};

Building.prototype.totalYearlyIncome = function(){
  // returns totale sqft rented
  var runningTotal = 0;
  var sum = _.reduce(this.units, 
              function(runningTotal, aUnit){
                if (!(aUnit.available()))
                  return runningTotal + aUnit.rent;
                else
                  return runningTotal;   
              }, 
              0);
  return (sum == undefined) ? 0 : sum * 12;
};



module.exports = Building;
