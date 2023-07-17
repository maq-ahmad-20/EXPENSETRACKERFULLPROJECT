const URl = 'http://localhost:7000';


document.getElementById('login-user-button').addEventListener('click', async (e) => {

    try {
        e.preventDefault();
        console.log("I am in login page")

        const useremail = document.querySelector('#email').value;

        const userpassword = document.querySelector('#password').value
        let postData = await fetch(`${URl}/login`, {
            headers: {
                'Content-Type': 'application/json',

            },
            method: "POST",
            body: JSON.stringify({ useremail: useremail, userpassword: userpassword })
        })

    } catch (err) {
        console.log(err);
    }
})