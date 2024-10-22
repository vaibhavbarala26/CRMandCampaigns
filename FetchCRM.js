const axios = require("axios")
const fetchCRMData = async()=>{
    const response = await axios("http://localhost:1042/crm" , {
        method:"GET",
    })
    return response.data
}
module.exports = fetchCRMData;