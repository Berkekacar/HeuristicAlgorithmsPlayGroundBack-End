const { PythonShell } = require("python-shell");

let options = {
    args: [10, 5, 4]
  };
  
let pyshell = new PythonShell("logic.py", options);


pyshell.on("message", function (message) {
    console.log("Python output:", message);
});

pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("Python script finished with code", code);
});
