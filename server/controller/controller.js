
async function pickAlgorithm(req,res){
    const {algorithm_name} = req.body
    let link = "/"+algorithm_name
    console.log("berke")
    res.redirect(link)
}


module.exports = {
    pickAlgorithm
}
