var Person = require('./people/person.js'),
	Manager = require('./people/manager.js'),
  Tenant = require('./people/tenant.js');

var Building = require('./rental_property/building.js');
var Unit = require('./rental_property/unit.js');

// start our apartment module to export later
var App = {};

// Add our types of people to our 
// module
App.Person = Person;
App.Manager = Manager;
App.Tenant = Tenant;

// Add building and unit
App.Building = Building;
App.Unit = Unit;

module.exports = App;
