
const url = "http://localhost:7000"

document.getElementById('reset-password-button').addEventListener('click', async (e) => {

    let paswordReq = await axios.get(`${url}/password/forgotpassword`)

})