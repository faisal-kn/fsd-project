const server = require("../app");
const test = require("../test");
const assert = require("chai").assert;

describe("Server", () => {
  it("should return hello", () => {
    assert.equal(test(), "hello");
  });
});
