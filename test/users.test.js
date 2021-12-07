/*
 * @description     : To test the CRUD operations on users using Mocha and Chai
 * @file            : users.test.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 06-12-2021
 */
require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

/**
 * @description CRUD testing for users in FundooNotes App
 */
describe("CRUD OPERATIONS FOR USERS", function () {
  const users = [
    {
      firstName: "Iron",
      lastName: "Man",
      password: "morgan@avengers3000",
      email: "rdj@gmail.com",
    },
    {
      firstName: "Hulk",
      lastName: " ",
      password: "Hulk3000*",
      email: "iamhulk@gmail.com",
    },
  ];

  /**
   * /POST request test
   * @description Checking for positive and negative test cases of validation for user details
   */
  it("Should create a user and add the data in database", (done) => {
    for (u in users) {
      chai
        .request(server)
        .post("/users")
        .send(users[u])
        .end((err, res) => {
          res.should.have.status(200);
          console.log("Response Body:", res.body);
        });
    }
    done();
  });

  /**
   * /GET request test
   * @description Checking if all the users can be retrieved or not
   */
  it("Should Retrieve all the users present in database", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, result) => {
        result.should.have.status(200);
        console.log("Result Body:", result.body);
        done();
      });
  });

  /**
   * /GET request test
   * @description Checking for positive and negative test cases of retrieving a particular user
   */
  it("Should Retrieve a particular user from the database", (done) => {
    chai
      .request(server)
      .get("/users/61a5d5ea92e2809066150af4")
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Fetched Particlar user using /GET/Users/:UserID :",
          result.body
        );
        done();
      });
  });

  /**
   * /PUT request test
   * @description Checking for positive and negative test cases of updating user details.
   */
  it("Should Update a particular user", (done) => {
    var updatedUser = {
      firstName: "Sanjanaaaaa",
      lastName: "Rao",
      password: "abcd1234#",
      email: "sanjanaaaaa310@gmail.com",
    };
    chai
      .request(server)
      .put("/users/61a7261e92a386e679362caf")
      .send(updatedUser)
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Updated Particlar User using /GET/UserS/:USERID :",
          result.body
        );
        done();
      });
  });

  /**
   * /GET request test
   * @description Checking if the updated user details is sent to database or not
   */
  it("Should check if the new data is updated in database", (done) => {
    chai
      .request(server)
      .get("/users/61a7261e92a386e679362caf")
      .end((err, result) => {
        result.should.have.status(200);
        result.body.message.email.should.eq("sanjanaaaaa310@gmail.com");
        console.log(
          "Fetched Particlar user using /GET/USERS/:USERID :",
          result.body
        );
        done();
      });
  });

  /**
   * /DELETE request test
   * @description Checking for positive and negative test cases of deleting a particular user
   */
  it("Should check if a particuar user is deleted", (done) => {
    chai
      .request(server)
      .delete("/users/61aee5b824ff0f91079ec337")
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Deleted a particlar user using /DELETE/USERS/:USERID:",
          result.body
        );
        done();
      });
  });

  /**
   * /POST request test
   * @description Checking for validation of user credentials for login
   */
  it("Should be success if the login credentials are valid", (done) => {
    chai.request(server)
      .post("/users/login")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ email: "sanjanagrao99@gmail.com", password: "Sanjana99#" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Successfully logged in.");
        done();
      });
  }); 
});
