
const URl = 'http://localhost:7000';

function formValidation() {

    const username = document.querySelector('#name').value;
    const useremail = document.querySelector('#email').value;
    const userphonenumber = document.querySelector('#phonenumber').value;
    const userpassword = document.querySelector('#password').value

    if (username === "") {
        alert('Please Enter Name')
        return false;
    } else if (useremail === "") {
        alert('please enter Email')
        return false
    } else if (useremail.includes("@") == false) {
        alert("please enter valid email")
        return false;

    } else if (userphonenumber === "") {
        alert('please enter phone number')
        return false
    } else if (userpassword === "") {
        alert('please enter password')
        return false
    } else if (userpassword.length < 5) {
        alert('please enter more than equal to 5  characters')
        return false;
    } else {
        return true;
    }



}



document.getElementById('create-user-button').addEventListener('click', async (e) => {
    if (formValidation() == true) {
        try {
            e.preventDefault();


            const username = document.querySelector('#name').value;
            const useremail = document.querySelector('#email').value;
            const userphonenumber = document.querySelector('#phonenumber').value;
            const userpassword = document.querySelector('#password').value
            let postData = await fetch(`${URl}/signup`, {
                headers: {
                    'Content-Type': 'application/json',

                },
                method: "POST",
                body: JSON.stringify({ username: username, useremail: useremail, userphonenumber: userphonenumber, userpassword: userpassword })
            })

            let postResponse = await postData.json();
            console.log(postResponse)

            if (postResponse.success === false) {
                alert('User All Ready Exits')
            } else if (postResponse.message === "successfullyusercreated") {

                document.querySelector('#name').value = "";
                document.querySelector('#email').value = "";
                document.querySelector('#phonenumber').value = "";
                document.querySelector('#password').value = "";
                alert('User created Successfully')
                window.location.replace("../loginPage/login.html");
            }



        } catch (err) {
            console.log(err)
        }

    }

})