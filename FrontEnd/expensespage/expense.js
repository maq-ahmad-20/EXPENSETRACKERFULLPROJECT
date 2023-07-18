const url = 'http://localhost:7000';



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



// buy premium functionality

document.querySelector('#buy-premium-button').addEventListener('click', async (e) => {
    try {

        const token = localStorage.getItem('token');
        console.log(token)

        let paymentreq = await fetch(`${url}/purchasepremiermembership`, {
            headers: {
                'Authorization': token
            }
        })
        var options = {
            key: paymentreq.data.key_id,
            order_id: paymentreq.data.order.id,
            handler: async function (response) {
                const res = await fetch(
                    `${url}/updateTransactionStatus`,
                    { headers: { Authorization: token } },
                    {
                        body: {
                            order_id: options.order_id,
                            payment_id: response.razorpay_payment_id,
                        }

                    });

                console.log(res);
                alert(
                    "Welcome to our Premium Membership, You have now access to Reports and LeaderBoard"
                );
                window.location.reload();
                localStorage.setItem("token", res.data.token);
            }

        }
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

    } catch (err) {
        console.log(err);
    }
})