"use strict"
var menu = require('node-menu');
var _ = require('underscore');

var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

// Add some seed data

people.push(new app.Person("Anna", "765-4321"));
var john = new app.Manager("John", "700-4321");
building.setManager(john);
people.push(john);
var devin = new app.Tenant("Devin", "765-1234");
devin.addReference(new app.Person("Carl", "415 3536 222"));
devin.addReference(new app.Person("Steve", "415 1111 222"));
people.push(devin);
people.push(new app.Tenant("Steve", "744-1234"));

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    _.each(building.units, function(aUnit) {
      console.log(" num: " + aUnit.number + 
                  " sqft: " + aUnit.sqft +
                  " rent: $" + aUnit.rent);
      if(aUnit.tenant !== null){
         console.log(" -> tenant: " + aUnit.tenant.name);
      } 
    }); 
  }
);

menu.addItem('Show available units', function() {
      var availUnits = _.filter(building.units, function(aUnit){ 
        return aUnit.available();
      });
      _.each(availUnits, function(aUnit) {
        console.log(" num: " + aUnit.number + 
                    " sqft: " + aUnit.sqft +
                    " rent: $" + aUnit.rent);
      });
    }
);

menu.addItem('Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
      // Note: Don't create a new Tenant. Pick a name of exiting tenant.
      // Find the corresponding tenant object and add reference. Reference
      // is a new Person object.
      // Find tenant
      var tenant = _.find(people, function(person){ 
        return person.name === tenant_name
      });
      if (tenant === undefined){
        console.log("I don't know this person, sorry ...");
        return;
      }
      if (!(tenant instanceof app.Tenant)){
        console.log("This person is not eligible, sorry ...");
        return;
      }
      tenant.addReference(new app.Person(ref_name, ref_contact));
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);

menu.addItem('Move tenant in unit', 
  function(unit_number, tenant_name) {
      // Assumes that tenant and unit were previously created. 
      // Find tenant and unit objects, then use building's addTenant() function.
      var tenant = _.find(people, function(person){ 
        return person.name === tenant_name
      });
      if (tenant === undefined){
        console.log("I don't know this person, sorry ...");
        return;
      }
      if (!(tenant instanceof app.Tenant)){
        console.log("This person is not eligible, sorry ...");
        return;
      }
      if (tenant.references.length < 2){
        console.log("Tenant needs at least two references, sorry ...");
        return;
      }
      var unit = _.find(building.units, function(aUnit){ 
        return aUnit.number == unit_number;
      });
      if (unit === undefined){
        console.log("That's not a unit, sorry ...");
        return;
      }
      if (!(unit.available())){
        console.log("Unit taken, sorry ...");
        return;
      }
      if (building.getManager() == null) {
        console.log("The building needs a manager, sorry ...");
        return;
      }
      building.addTenant(unit,tenant);
    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('Evict tenant', 
  function(tenant_name) {
      // Similar to above, use building's removeTenant() function.
      var tenant = _.find(people, function(person){ 
        return person.name == tenant_name
      });
      var unit = _.find(building.units, function(aUnit){ 
        return aUnit.tenant.name == tenant.name;
      });
      if(unit == null){
        console.log("This person does not live here, sorry ...");
        return;
      }
      building.removeTenant(unit, tenant);
      console.log("Removed " + tenant_name + " from unit #" + unit.number);
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('Show total sqft rented', 
  function() {
      console.log("Currently rented: " + building.totalSqftRented() + " sqft");
    } 
);

menu.addItem('Show total yearly income', 
  function() {
      // Note: only rented units produce income
      console.log("Moolah per year: $" + building.totalYearlyIncome());
    } 
);

menu.addItem('(Add your own feature ...)', 
  function() {
      console.log("Implement a feature that you find is useful");
    } 
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();