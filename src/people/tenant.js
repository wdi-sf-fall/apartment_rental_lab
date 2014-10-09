var Person = require("./person.js");

function Tenant(name, contact) {
  // inherits name contact from Person
  // ...
  // tennant has 'array' of references
  // ...
};

// Set prototype and constructor
// ...

Tenant.prototype.addReference = function(reference){
  // add reference to references. Reference must be of type Person
  // ...
};

Tenant.prototype.removeReference = function(reference) {
  // remove reference from references.
  // ...
};

module.exports = Tenant;
