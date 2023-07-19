const url = 'http://localhost:7000';

const buyPremiumButton = document.querySelector('#buy-premium-button');



function addUserToScreen(data) {
    const tbody = document.querySelector('table tbody')

    var tr = document.createElement('tr');

    var TotalHtml = `<td>${data.expense}</td>
       <td>${data.description}</td><td>${data.item}</td>
       <td><button class="del-button btn btn-danger" type="submit"  id =${data.id} onclick ="deleteDataOnScreen('${data.id}')">Delete</button></td>
        `
    tr.innerHTML = TotalHtml;

    tbody.appendChild(tr)
}





// insert record to db and display

const formbutton = document.querySelector('#expenseaddbutton');

formbutton.onclick = async function (e) {
    try {
        e.preventDefault();

        const expense = document.querySelector('#expense').value;
        const description = document.querySelector('#desc').value;
        const item = document.querySelector('#item').value;


        const token = localStorage.getItem("token");
        let fetchData = await fetch(`${url}/addexpense`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token

            },
            method: "POST",
            body: JSON.stringify({ expense: expense, description: description, item: item })
        })


        let jsonFetchdata = await fetchData.json()

        var objectData = jsonFetchdata['InsertedData']['data'];


        document.querySelector('#expense').value = "";
        document.querySelector('#desc').value = "";
        document.querySelector('#item').value = "";
        addUserToScreen(objectData);


    } catch (err) {
        console.log(err)
    }



}


async function deleteDataOnScreen(id) {

    try {
        const token = localStorage.getItem("token");
        let deleteData = await fetch(`${url}/deleteuserexpense/` + id, {
            headers: {
                'Authorization': token
            },
            method: "DELETE"
        })

        document.getElementById(id).parentElement.parentElement.remove();

    } catch (err) {
        console.log(err);
    }
}



// buy premium functionality fetch doesnot fork inside a call back function

// document.querySelector('#buy-premium-button').addEventListener('click', async (e) => {
//     try {
//         e.preventDefault();
//         const token = localStorage.getItem('token');
//         console.log(token)

//         let paymentreqcors = await fetch(`${url}/purchasepremiermembership`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': token
//             },
//             method: 'GET'
//         })
//         let paymentreq = await paymentreqcors.json()
//         console.log(paymentreq.order.id)
//         console.log(paymentreq.key_id)
//         var options = {
//             key: paymentreq.key_id,
//             order_id: paymentreq.order.id,
//             handler: async function (response) {
//                 const postres = await fetch(
//                     `${url}/updateTransactionStatus`,
//                     {
//                         headers: { "Authorization": token },
//                         method: "POST",
//                         body: { order_id: options.order_id, payment_id: response.razorpay_payment_id },

//                     });
//                 const postreqJson = await postres.json()
//                 console.log(postreqJson);
//                 alert(
//                     "Welcome to our Premium Membership, You have now access to Reports and LeaderBoard"
//                 );
//                 window.location.reload();
//                 localStorage.setItem("token", res.data.token);
//             }

//         }
//         const rzp1 = new Razorpay(options);
//         rzp1.open();
//         e.preventDefault();

//     } catch (err) {
//         console.log(err);
//     }
// })




async function buyPremiumMemberShip(e) {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
            `${url}/purchasepremiermembership`,
            { headers: { Authorization: token } }
        );
        var options = {
            key: res.data.key_id,
            order_id: res.data.order.id,

            handler: async function (response) {
                const res = await axios.post(
                    `${url}/updateTransactionStatus`,
                    {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                    },
                    { headers: { Authorization: token } }
                );

                console.log(res);
                alert(
                    "Welcome to our Premium Membership.You have access to leaderboard"
                );
                window.location.reload();
                localStorage.setItem("token", res.data.token);

            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();

        e.preventDefault();

    } catch (err) {
        console.log(err)
    }

};

// showing Premieruser on screen and also showing if he logins again

async function isPremierUser() {

    try {

        let token = localStorage.getItem('token');

        let checkIfPremerUser = await axios.get(`${url}/checkpremieruser`, {
            headers: {
                Authorization: token
            }
        })  // use axios so no need to convert the result to json

        console.log(checkIfPremerUser.data.premierUser)
        if (checkIfPremerUser.data.premierUser) {
            document.getElementById('ispremiumuser').style.display = "inline";
            document.getElementById('leader-board').style.display = "inline"
            document.getElementById('leader-board').setAttribute("href", "../LeaderBoard/leaderboard.html");
            document.getElementById('buy-premium-button').innerHTML = "Premium User";
            buyPremiumButton.removeEventListener("click", buyPremiumMemberShip)

            // window.location.replace("../LeaderBoard/leaderboard.html");
        }



    } catch (err) {
        console.log(err)
    }

}




document.addEventListener('DOMContentLoaded', async (e) => {



    try {
        e.preventDefault();
        const token = localStorage.getItem("token");
        let totalData = await fetch(`${url}/getAllExpense`, {
            headers: {
                'Authorization': token
            }
        });

        let totalJsonData = await totalData.json();



        //console.log(totalJsonData.alldata)

        totalJsonData.alldata.forEach(element => {

            addUserToScreen(element)
        });

        // loadHtmlData(totalJsonData['data'])
    } catch (err) {
        console.log(err);


    }
})

document.addEventListener('DOMContentLoaded', isPremierUser);

buyPremiumButton.addEventListener('click', buyPremiumMemberShip)