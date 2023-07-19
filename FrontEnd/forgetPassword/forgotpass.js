
const url = "http://localhost:7000"

document.getElementById('reset-password-button').addEventListener('click', async (e) => {
    try {
        let email = document.getElementById('useremail').value

        let paswordReq = await axios.post(`${url}/password/forgotpassword`, {
            email: email
        })

        if (paswordReq.data.success) {
            window.location.replace("../loginPage/login.html");
            alert("PasswordSendTotheRequestedMail.Please Check your mail")

        }

        console.log(paswordReq)
    } catch (err) {
        console.log(err)
        alert('Hey.. Your are not registered with us please sign up ')
    }
})