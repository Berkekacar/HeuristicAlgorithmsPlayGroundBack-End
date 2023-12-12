const { PythonShell } = require("python-shell");

async function HarmonySearchAlogirthm(req,res){
    const {hms,bw,hmcr,par}=req.body

    let options = {
        args: [
            hms,
            bw,
            hmcr,
            par
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
module.exports= {HarmonySearchAlogirthm}