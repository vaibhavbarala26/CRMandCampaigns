const axios = require("axios")
const FetchMarketData = async()=>{
    const response = await axios("http://localhost:1042/market" , {
        method:"GET",
    })
    return response.data
}
module.exports = FetchMarketData;