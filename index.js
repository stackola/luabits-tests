const tests = require("./tests");
const axios = require("axios");
let liveUrl = "https://luabits.com/run";
let devUrl = "http://localhost:5001/luabits-a4c52/us-central1/run";
var deepEqual = require("deep-equal");
let dev = false;
let delay = dev ? 1000 : 5000;
var colors = require("colors");

const { performance } = require("perf_hooks");
let requestTimes = [];

let currentTest = 14;

let t0, t1;

let passed = 0;
let failed = 0;
console.clear();
function runTest(t) {
  t0 = performance.now();
  console.log("Test:   " + t.name);
  let urlToUse = dev ? devUrl : liveUrl;
  let url = urlToUse + t.path;
  let cb = res => {
    res = res.data;
    t.debug && console.log("Data before op", res);
    if (t.op) {
      res = t.op(res);
      t.debug && console.log("Data after op", res);
    }
    t.debug && console.log("Expected: ", t.response);

    if (t.type == "equal") {
      if (res == t.response) {
        testOk(t);
      } else {
        testFail(t);
      }
    }
    if (t.type == "objEqual") {
      if (deepEqual(res, t.response, { strict: true })) {
        testOk(t);
      } else {
        testFail(t);
      }
    }
  };
  if (t.method == "post") {
    axios
      .post(url, t.data)
      .then(res => {
        cb(res);
      })
      .catch(e => {
        console.log(e);
      });
  } else {
    axios
      .get(url)
      .then(res => {
        cb(res);
      })
      .catch(e => {
        console.log(e);
      });
  }
}

function testOk(t) {
  t1 = performance.now();
  let secs = Math.round((t1 - t0) / 10) / 100;
  requestTimes.push(secs);
  console.log(("        Passed! (" + secs + "s)").green);
  passed++;
  next();
}
function testFail(t) {
  t1 = performance.now();
  let secs = Math.round((t1 - t0) / 10) / 100;
  requestTimes.push(secs);
  console.log(("        Failed! (" + secs + "s)").red);
  failed++;
  next();
}

function next() {
  currentTest++;
  if (currentTest < tests.length) {
    setTimeout(() => {
      runTest(tests[currentTest]);
    }, delay);
  } else {
    console.log("---Done---");
    console.log("Passed: " + passed);
    console.log("Failed: " + failed);
    console.log(
      "Average time: " +
        Math.round(
          (requestTimes.reduce((a, b) => {
            return a + b;
          }) /
            requestTimes.length) *
            100
        ) /
          100 +
        "s"
    );
  }
}

if (dev) {
  console.log("Testing against dev".green);
} else {
  console.log("Testing against prod".red);
}
runTest(tests[currentTest]);
