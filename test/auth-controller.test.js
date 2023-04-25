const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;
const mongoose = require("mongoose");
const User = require("../models/Users");
let server = require("../server");
chai.use(chaiHttp);

describe("GET /api/all-events", function () {
  var Cookies;
  var username;
  var eventid;
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://faisal:jSKFbWUHaFmRiI36@cluster0.euhxd.mongodb.net/mapper?retryWrites=true&w=majority"
      )
      .then((result) => {
        chai
          .request(app)
          .post("/api/user/login")
          .send({
            email: "yeshwanthvandrapu585@gmail.com",
            password: "Yesh@1234",
          })
          .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.status).to.equal("success");
            expect(res.body.token).to.be.a("string");
            expect(res.body.data.user).to.be.an("object");
            username = res.body.data.user.username;
            authToken = res.body.token; // save the auth token for later use
            Cookies = res.headers["set-cookie"].pop().split(";")[0];
            done();
          });
      });
  });

  it("should return all events", function (done) {
    chai
      .request(app)
      .get("/api/event/all-events")
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        expect(res.body.data.events).to.be.an("array");
        eventid = res.body.data.events[0]._id;
        done();
      });
  });

  it("should return an error if not authorized", function (done) {
    chai
      .request(app)
      .get("/api/event/all-events")
      .end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("should return all events of user", function (done) {
    chai
      .request(app)
      .get("/api/event/get-events-of-host")
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        expect(res.body.data.eventsOfHost).to.be.an("array");
        done();
      });
  });

  it("should return an error if not authorized", function (done) {
    chai
      .request(app)
      .get("/api/event/get-events-of-host")
      .end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("should return all users", function (done) {
    chai
      .request(app)
      .get("/api/user/allUsers")
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        expect(res.body.data.users).to.be.an("array");
        done();
      });
  });

  it("should return an error if not authorized", function (done) {
    chai
      .request(app)
      .get("/api/user/allUser")
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("should return all hobbies of user", function (done) {
    chai
      .request(app)
      .get("/api/user/hobbies")
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        expect(res.body.data.hobbies).to.be.an("array");
        done();
      });
  });

  it("should return an error if not authorized", function (done) {
    chai
      .request(app)
      .get("/api/user/allUser")
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("getuser - should return a user with that username", function (done) {
    chai
      .request(app)
      .get(`/api/user/getUser/${username}`)
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        done();
      });
  });

  it("getuser - should return an error if not authorized", function (done) {
    chai
      .request(app)
      .get(`/api/user/getUser/${username}`)
      .end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("eventid - should return an event", function (done) {
    chai
      .request(app)
      .get(`/api/event/one-event/${eventid}`)
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        done();
      });
  });

  it("eventid - should return an error if not authorized", function (done) {
    chai
      .request(app)
      .get(`/api/event/one-event/${eventid}`)
      .end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("delete user - should delete a user with that username", function (done) {
    chai
      .request(app)
      .delete(`/api/user/deleteUser/${"kafe"}`)
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        done();
      });
  });

  it("post user - signup ", function (done) {
    chai
      .request(app)
      .post("/api/user/signup")
      .send({
        username: "kafe",
        email: "kafe3@gmail.com",
        password: "0123456789",
        confirmPassword: "0123456789",
        hobbies: "Games",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        console.log(res.body.data.newUser);
        done();
      });
  });

  it("get-event-by-hobby", function (done) {
    chai
      .request(app)
      .get(`/api/event/get-event-by-hobby/${"Games"}`)
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        done();
      });
  });

  it("get-event-by-hobby - should return an error if not authorized", function (done) {
    chai
      .request(app)
      .get(`/api/event/get-event-by-hobby/${"Games"}`)
      .end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("get-event-by-id", function (done) {
    chai
      .request(app)
      .get(`/api/event/get-event-by-hobby/${"64266af57a1202c054fb9d18"}`)
      .set("Cookie", Cookies)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal("success");
        done();
      });
  });
});
