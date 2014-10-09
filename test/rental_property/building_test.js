var expect = require("chai").expect,
    app = require("../../src/app"),
    Building = app.Building,
    Unit = app.Unit,
    Person = app.Person,
    Manager = app.Manager,
    Tenant = app.Tenant;

describe("Building", function(){
    var manager, 
      tenant, 
      contactOne, 
      contactTwo,
      myBuilding,
      myUnit;

    beforeEach(function(){
      manager = new Manager("Jane Doe", "123-4567"), 
      tenant = new Tenant("Jackie Adams", "123-7654"),  
      contactOne = new Person("Anna Adams", "765-4321"), 
      contactTwo = new Person("Devin Daniels", "765-1234")
      myBuilding = new Building("123 Gotham Ave");
      myUnit = new Unit("806", myBuilding, 400, 2000);
    });
    describe("has own props", function(){
      it("should include @address", function(){
        expect(myBuilding.address).to.eql("123 Gotham Ave");
      });

      it("should include @units", function(){
        expect(myBuilding.units).to.eql([]);
      });
    });
    describe("#setManager", function(){
      it("should set @manager for a manager", function(){
        myBuilding.setManager(manager);
        expect(myBuilding.manager).to.eql(manager);
      });
    });

    describe("#getManger", function(){
      it("should return the manager", function(){
        myBuilding.setManager(manager);
        expect(myBuilding.getManager()).to.eql(manager);
      });
    });

    describe("#addTenant", function(){
      it("should not add a tenant with less than two references", function(){
        myBuilding.units = [myUnit];
        myBuilding.setManager(manager);
        myBuilding.addTenant(myUnit, tenant);
        expect(myUnit.available()).to.eql(true);
      });

      it("should not add a tenant if there is no manager", function(){
        myBuilding.units = [myUnit];
        tenant.addReference(contactOne);
        tenant.addReference(contactTwo);
        myBuilding.addTenant(myUnit, tenant);
        expect(myUnit.available()).to.eql(true);
      });

      it("should not add a tenant to unit not included in @units", function(){
        myBuilding.setManager(manager);
        tenant.addReference(contactOne);
        tenant.addReference(contactTwo);
        myBuilding.addTenant(myUnit, tenant);
        expect(myUnit.available()).to.eql(true);
      });


      it("should not add a tenant to unit not available", function(){
        myBuilding.units = [myUnit];
        myBuilding.setManager(manager);
        tenantTwo =  new Tenant("Ruby Ra", "122-3344");
        myUnit.tenant = tenantTwo;
        tenant.addReference(contactOne);
        tenant.addReference(contactTwo);
        myBuilding.addTenant(myUnit, tenant);
        expect(myUnit.tenant).to.eql(tenantTwo);
      });


      it("should add a tenant to a valid available unit", function(){
        myBuilding.units = [myUnit];
        myBuilding.setManager(manager);
        tenant.addReference(contactOne);
        tenant.addReference(contactTwo);
        myBuilding.addTenant(myUnit, tenant);
        expect(myUnit.tenant).to.eql(tenant);
      });

    });

   describe("#removeTenant", function(){
      beforeEach(function(){
        myBuilding.units = [myUnit];
        myBuilding.setManager(manager);
        tenant.addReference(contactOne);
        tenant.addReference(contactTwo);
        myBuilding.addTenant(myUnit, tenant);
      });


      it("should not remove a tenant if there is no manager", function(){
        myBuilding.manager = null;
        myBuilding.removeTenant(myUnit, tenant);
        expect(myUnit.available()).to.eql(false);
      });

      it("should not remove a tenant from a unit not included in @units", function(){
        myBuilding.units = [];
        myBuilding.removeTenant(myUnit, tenant);
        expect(myUnit.available()).to.eql(false);
      });

      it("should only remove a tenant from their own unit", function(){
        var tenantTwo =  new Tenant("Ruby Ra", "122-3344");
        myBuilding.removeTenant(myUnit, tenantTwo);
        expect(myUnit.available()).to.eql(false);
      });

      it("should remove a tenant to from a valid unit", function(){
        myBuilding.removeTenant(myUnit, tenant);
        expect(myUnit.tenant).to.eql(null);
      });

    });

    describe("#availableUnits", function(){
      it("should return available units",function(){
        var newUnit = new Unit("807", myBuilding, 500, 2050);
        myBuilding.units = [myUnit, newUnit];
        myBuilding.setManager(manager);
        tenant.addReference(contactOne);
        tenant.addReference(contactTwo);
        myBuilding.addTenant(myUnit, tenant);
        expect(myBuilding.availableUnits()).to.eql([newUnit]);
      });
    });

    describe("#rentedUnits", function(){
      it("should return rented units",function(){
        var newUnit = new Unit("807", myBuilding, 500, 2050);
        myBuilding.units = [myUnit, newUnit];
        myBuilding.setManager(manager);
        tenant.addReference(contactOne);
        tenant.addReference(contactTwo);
        myBuilding.addTenant(myUnit, tenant);
        expect(myBuilding.rentedUnits()).to.eql([myUnit]);
      });
    });
});