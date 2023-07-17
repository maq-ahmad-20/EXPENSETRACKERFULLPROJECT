const URl = 'http://localhost:7000';

function loginvalidation() {


    const useremail = document.querySelector('#email').value;

    const userpassword = document.querySelector('#password').value

    if (useremail === "") {
        alert("Please enter email");
        return false;
    } else if (useremail.includes("@") == false) {
        alert("please enter valid email")
        return false;
    }

    else if (userpassword === "") {
        alert("please enter password");
        return false;
    } else {
        return true;
    }

}


document.getElementById('login-user-button').addEventListener('click', async (e) => {

    if (loginvalidation() == true) {
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

            let postDataJson = await postData.json();

            console.log(postDataJson)

            if (postDataJson.data === "User not authorized") {
                alert("please enter Correct password")
            } else if (postDataJson.data === "User not found") {
                alert("User doesnot exist .. Please create new user by sigining up ")
            } else if (postDataJson.successfullylogged == true) {
                window.location.replace("../expensespage/expense.html");
            }

            document.querySelector('#email').value = "";

            document.querySelector('#password').value = "";


        } catch (err) {
            console.log(err);
        }
    }
})

