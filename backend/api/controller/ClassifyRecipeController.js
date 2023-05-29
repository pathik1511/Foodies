const axios = require("axios")
module.exports.classify = (request, response) => {
    let data = request.body;
    axios.post("https://us-central1-csci5410-s21.cloudfunctions.net/classify", data).then(res => {
        
        if (res.status == 200) {
            return response.status(200).json(res.data.result)
        } else if (res.status == 400) {
            return response.status(400).json({message: "Failure"})
        }
    })
}