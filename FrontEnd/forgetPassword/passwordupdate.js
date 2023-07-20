const url = 'http://localhost:7000';

function validatePAssword() {
    let password = document.getElementById('updated-password').value
    if (password === "") {
        alert("please enter password");
        return false;
    } else {
        return true;
    }
}

document.getElementById('update-password-button').addEventListener('click', async (e) => {
    if (validatePAssword()) {
        try {
            e.preventDefault()
            let password = document.getElementById('updated-password').value;

            let updatedRes = await axios.put(`${url}/password/updatePassword`, { userpassword: password })

            console.log(updatedRes)
            window.location.href = '../FrontEnd/loginPage/login.html'

        } catch (err) {
            console.log(err)
        }
    }
})