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
        if(!references) {continue;}
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
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }  
);

menu.addItem('(implement me) Show available units', 
  function() {
      console.log("Implement me");
    } 
);

menu.addItem('(implement me) Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
  	  // Note: Don't create a new Tenant. Pick a name of exiting tenant.
  	  // Find the corresponding tenant object and add reference. Reference
  	  // is a new Person object.
      console.log("Implement me. Show error if tenant is unknown. Note: a reference is a person");
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);

menu.addItem('(implement me) Move tenant in unit', 
  function(unit_number, tenant_name) {
  	  // Assumes that tenant and unit were previously created. 
      // Find tenant and unit objects, then use building's addTenant() function.
      console.log("Implement me.");
    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Evict tenant', 
  function(tenant_name) {
      // Similar to above, use building's removeTenant() function.
      console.log("Implement me");
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('(implement me) Show total sqft rented', 
  function() {
      console.log("Implement me");
    } 
);

menu.addItem('(implement me) Show total yearly income', 
  function() {
      // Note: only rented units produce income
      console.log("Implement me.");
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
