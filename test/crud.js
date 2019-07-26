var assert = require("chai").asssert;
var expect = require('chai').expect;
var crud = require("../controllers/crud");


describe('CRUD Tests', function(){
  this.beforeEach(function(){
      userDict = {
        firstName: "John",
        lastName: "Smith",
        email: "JohnSmith@email.com",
        phoneNumber: "8002223456",
        country: "USA",
        password: "testpassword",
        isLawyer: false,
        roomKey: "123456"
      };
  });

  it('#db_createUser - Creates new user', async function(){
    const user = await crud.db_createUser(userDict);
    expect(user).to.not.equal(null);
  }); //End create user

  it('#db_createUser - Validates entries', async function(){
    const user = await crud.db_createUser(userDict);
    expect(user.firstName).to.equal(userDict.firstName);
    expect(user.lastName).to.equal(userDict.lastName);
    expect(user.email).to.equal(userDict.email);
    expect(user.phoneNumber).to.equal(userDict.phoneNumber);
    expect(user.country).to.equal(userDict.country);
    expect(user.password).to.equal(userDict.password);
    expect(user.isLawyer).to.equal(userDict.isLawyer);
    expect(user.roomKey).to.equal(userDict.roomKey);
  });

  it('#db_createUser - Validates unique email', async function(){
    const user = await crud.db_createUser(userDict);
    // const fail_user = await crud.db_createUser(userDict);
    expect(() => crud.db_createUser(userDict).to.throw);
  });

});