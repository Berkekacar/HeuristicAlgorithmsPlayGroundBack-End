const { PythonShell } = require("python-shell");

async function SaAlgorithm(req,res){
    const {initial_temperature,cool_down_factor,decrease_temperature_periodically}=req.body

    let options = {
        args: [
        initial_temperature,
        cool_down_factor,
        decrease_temperature_periodically
        ]
    };

    let pythonShell = new PythonShell("logic.py", options);

    pythonShell.on("message", function (message) {
        console.log("Python output:", message);
        res.write(`data: ${JSON.stringify({ message })}\n\n`);
    });

    pythonShell.end(function (err, code, signal) {
        if (err) {
        console.error("Python script finished with error:", err);
        res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
        } else {
        console.log("Python script finished with code", code);
        }
        res.end(); 
    });
}
module.exports= {SaAlgorithm}