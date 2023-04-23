const assert = require("chai").assert;
const server = require("../app");
const test = require("../test");

describe("Server", () => {
  it("should return hello", () => {
    assert.equal(test(), "hello");
  });
});
