# ApartmentRental App
## Working with Relationships and Inheritance

### Description

In this application we have three main types of things we are dealing with.

* `Person`
* `Building`
* `Unit`


#### Person

With `Person` we have two main subtypes:

* `Manager`
* `Tenant`

Both `Manager` and `Tenant` should *inherit* methods from `Person`, and implement any extra behavior they need to play their role in the App.

##### Relationships

* `Manager` has many `Buildings`.
* `Tenant` has a many `References` that are just `Person` instances with contact info. 

#### Building

A `Building` should always have a `Manager` before `Tenants` can move in. All `Tenants` should have `two` references before moving in.

##### Relationships

* `Building` has many `Unit`s. 
* `Building` has a `Manager`. A `Tenant` may not be the building manager. 

#### `Unit`

* A `Unit` belongs to one `Building` and has one `Tenant`. As a rule, `Managers` are not allowed to live in the `Building`.


## Phase I: Build out the apartment rental object model

Take a look at `apartment rental object` code stubs in `src` folder. The ground work is done, you need to fill in the blanks.

### Run tests

You get a complete set of tests, they are all written for you . Yeah!

in project folder, run:
	
	npm test
	
**They should all fail!** 

In true TDD fashion, your task is to make them all pass! 

You can target individual tests by calling test files directly, for example:

	mocha test/rental_property/building_test.js


### Take a close look at the tests

They tell you everything you need to implement apartment rental objects and their relationships. Check out how tests use `apartment rental objects`, like referencing properties and calling methods.


### Playing In Console

* Open the node REPL and `require('./src/app.js')`

```
$ node
> var app = require('./src/app.js')
```

* Create a few objects and inspect them.

```
> var person = app.Person();
> var building = app.Building();
> var manager = app.Manager();
```

not much here, the objects are *empty*. As you build out objects and tests turn green, come back to REPL and play around, try out properties and methods that you added, experiment.

============

* A good place to start is look for low hanging fruits, like adding properties to your objects, if you do it right, it should turn a bunch of test green right off the bat.

* Then think about the relationships. For example, implementing inheritance for `Manager`

You could do the following:

```
var person = require("./person");

function Manager(name, contact) {
  this.name = name;
  this.contact = contact;
  this.buildings = [];
}

// Inheriting
Manager.prototype = new Person();
Manager.prototype.constructor = Manager;

```

But the following makes use of a cool `call` method you can use with functions that avoids a bunch extra work.

```
var person = require("./person");

function Manager(name, contact) {

  // Note here the use of "call"
  //  which will run the method 
  //  with a context.
  Person.call(this, name, contact);
  this.buildings = [];
}

// Inheriting
Manager.prototype = new Person();
Manager.prototype.constructor = Manager;

```

**etc .**


## Phase II: Write Appartent Rental app

Once all tests succeed, go and write an apartment rental app for the *Waterfront Tower* down the road. We understand that you strive to be web developers, yet the app your are going to build is a good old `command line interface` app. But good news, again, the ground work is already done. In the `src` folder, run:

	node main.js

**DEMO** (the app is not very user friendly ...)
	
Check out the *beautiful* user interface! Feature 1 to 5 are already implemented. Inspect `main.js` and take a look at how the menu is set up. Implement the missing menu functions. A good place to start is menu item 6 `Show available units`. It should be very similar to 5. 

*Hint:* You will find yourself iterating over arrays quite a lot. Why not use the `Iterators` module that you built this week? 	

	




