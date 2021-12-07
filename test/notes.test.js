/*
 * @description     : To test the CRUD operations on labels using Mocha and Chai
 * @file            : notes.test.js
 * @author          : Sanjana Rao
 * @version         : 1.0
 * @since           : 07-12-2021
 */
require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

/**
 * @description CRUD testing for notes in FundooNotes App
 */
describe("CRUD OPERATIONS ON NOTES", function () {
  let token = "";

  /**
   * /POST request test
   * @description To check if the user credentials are valid and token is generated for notes
   */
  it("Should pass if login credentials are valid", async () => {
    let res = await chai
      .request(server)
      .post("/users/login")
      .send({ email: "sanjanagrao99@gmail.com", password: "Sanjana99#" });
    res.should.have.status(200);
    token = res.body.message.Token;
  });

  /**
   * /POST request test
   * @description To validate the title and content of notes - Positive case
   */
  it("Should pass if a valid note is added to database", async () => {
    var notes = {
      title: "Deccan herald",
      content: "security forces kill 1 civillians in nagaland",
      isTrash: false,
      color: "red",
    };
    let res = await chai
      .request(server)
      .post("/notes")
      .auth(token, { type: "bearer" })
      .send(notes);
    res.should.have.status(200);
    console.log("Response Body:", res.body);
  });

  /**
   * /POST request test
   * @description To validate the title and content of notes - Negative case
   */
  it("Should pass if invalid title and content are passed to notes", async () => {
    var notesErr = [
      {
        title: " ",
        content: " ",
        isTrash: false,
        color: "red",
      },
    ];
    let res = await chai
      .request(server)
      .post("/notes")
      .auth(token, { type: "bearer" })
      .send(notesErr);
    res.should.have.status(400);
    console.log("Response Body:", res.body);
  });

  /**
   * /GET request test
   * @description To check if all the notes are getting retrieved
   */
  it("Should pass when all the notes are retrieved", async () => {
    let res = await chai
      .request(server)
      .get("/notes")
      .auth(token, { type: "bearer" });
    res.should.have.status(200);
    console.log(res.body);
    expect(res.body).to.have.a.lengthOf(13);
  });

  /**
   * /GET request test
   * @description To check if a particular note is getting retrieved
   */
  it("Should pass only when a particular note with a noteId is getting fetched", (done) => {
    chai
      .request(server)
      .get("/notes/61a886ed5be0522a085b554d")
      .auth(token, { type: "bearer" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Fetched Particlar note using /GET/Notes/:NoteID ::::",
          result.body
        );
        done();
      });
  });

  /**
   * /PUT request test
   * @description To update a particular note
   */
  it("Should pass only when a particular note with a noteId is updated", (done) => {
    var updatedNote = {
      title: "Z Library",
      content: "Online website for all your books updated",
      isTrash: true,
      color: "rgb(215, 174, 251)",
      profileImg:
        "07e2746a-3f5d-443a-95a6-2a1f5a58b036-9f83f86e-b9dd-4505-8823-fb963c2f75ea-1b69f129-82d3-45db-bda8-1c6036078d3a-evolving_google_identity_2x1.jpg",
    };
    chai
      .request(server)
      .put("/notes/61a06fd0c4efc9b43a5ecad0")
      .send(updatedNote)
      .auth(token, { type: "bearer" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Updated Particlar notes using /PUT/Notes/:NoteID  ::::",
          result.body
        );
        done();
      });
  });

  /**
   * /DELETE request test
   * @description To check if a particular note is getting deleted or not
   */
  it("Should pass when a particular note with a noteId is deleted", (done) => {
    chai
      .request(server)
      .delete("/notes/61a06fe5c4efc9b43a5ecad4")
      .auth(token, { type: "bearer" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log("Deleted Particlar note ", result.body);
        done();
      });
  });

  /**
   * /GET request test
   * @description To check the number of documents after deleting
   */
  it("Should pass only when the number of documents after deleting from database is the same", (done) => {
    chai
      .request(server)
      .get("/notes/")
      .auth(token, { type: "bearer" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log("Total notes in the database: ", result.body.length);
        done();
      });
  });
});
