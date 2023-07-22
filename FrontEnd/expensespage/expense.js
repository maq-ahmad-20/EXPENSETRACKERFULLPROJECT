const url = 'http://localhost:7000';

const buyPremiumButton = document.querySelector('#buy-premium-button');



function addUserExpenseToScreen(data) {
    const tbody = document.querySelector('table tbody')

    var tr = document.createElement('tr');

    var TotalHtml = `<td>${data.expense}</td>
       <td>${data.description}</td><td>${data.item}</td>
       <td><button class="del-button btn btn-danger" type="submit"  id =${data.id} onclick ="deleteDataOnScreen('${data.id}')">Delete</button></td>
        `
    tr.innerHTML = TotalHtml;

    tbody.appendChild(tr)
}

function deluserExpenseOnScreen() {
    const tbody = document.querySelector('table tbody')
    tbody.innerHTML = "";
}




// insert record to db and display

const formbutton = document.querySelector('#expenseaddbutton');

formbutton.onclick = async function (e) {
    try {
        e.preventDefault();

        const expense = document.querySelector('#expense').value;
        const description = document.querySelector('#desc').value;
        const item = document.querySelector('#item').value;
        const date = new Date();
        const day = date.getDate()
        const month = date.getMonth() + 1; // as month start from 0
        const year = date.getFullYear()
        const formatDay = day.toString().padStart(2, "0"); // day < 10 ? `0${day}` : day;
        const formatMonth = month.toString().padStart(2, "0"); //month < 10 ? `0${month}` : month;
        const formatedDate = `${formatDay}-${formatMonth}-${year}` // save as dd-mm-yy as it helps to get yearly data in reports

        const token = localStorage.getItem("token");
        let fetchData = await fetch(`${url}/expense/addexpense`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token

            },
            method: "POST",
            body: JSON.stringify({ expense: expense, description: description, item: item, expenseamount: expense, date: formatedDate })
        })


        let jsonFetchdata = await fetchData.json()

        var objectData = jsonFetchdata['InsertedData']['data'];


        document.querySelector('#expense').value = "";
        document.querySelector('#desc').value = "";
        document.querySelector('#item').value = "";
        addUserExpenseToScreen(objectData);


    } catch (err) {
        console.log(err)
    }



}


async function deleteDataOnScreen(id) {

    try {
        const token = localStorage.getItem("token");

        let deleteData = await fetch(`${url}/expense/deleteuserexpense` + id, {
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
                    "Welcome to our Premium Membership.You have access to Reports and leaderboard"
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

            document.getElementById('leaderboard').style.display = "inline";
            document.getElementById('reports').style.display = "inline";
            document.getElementById('notPremieruser').style.display = "none";
            document.getElementById('buy-premium-button').innerHTML = "Premium User";
            buyPremiumButton.removeEventListener("click", buyPremiumMemberShip)
            document.getElementById('download-tfoot').style.display = 'inline'
            document.getElementById('showPreviousDownloads').style.display = "block"
            document.getElementById('showPreviousDownloads').style.marginTop = "80px"
            document.getElementById('showPreviousDownloads').style.width = "100%"




            return true;

        } else {
            return false;
        }



    } catch (err) {
        console.log(err)
    }

}

document.getElementById('pages-selected').addEventListener('change', (e) => {
    let pagesDataSelected = document.getElementById('pages-selected').value || 10;
    localStorage.setItem('dataOnPage', pagesDataSelected)
    location.reload()
})




function showPagination(data) {
    let paginationUl = document.getElementById('paginationList')

    for (let i = 1; i <= data.totalCount; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        li.setAttribute("class", "page-item");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "#");
        a.appendChild(document.createTextNode(i));
        li.appendChild(a);
        paginationUl.appendChild(li);
        a.addEventListener("click", pagiationDisplay);
    }


}

async function pagiationDisplay(e) {

    try {
        const token = localStorage.getItem("token");
        const dataOnPage = localStorage.getItem('dataOnPage')
        const pageno = e.target.textContent
        let totalData = await axios.get(`${url}/expense/getAllExpense/${pageno}/${dataOnPage}`, {
            headers: {
                'Authorization': token,

            }
        })

        console.log(totalData)

        console.log(totalData.data.expensesData)


        deluserExpenseOnScreen();

        totalData.data.expensesData.forEach(data => {
            addUserExpenseToScreen(data)
        })



    } catch (err) {
        console.log(err)
    }
}


document.addEventListener('DOMContentLoaded', async (e) => {



    try {
        e.preventDefault();

        const pagesDataSelected = localStorage.getItem('dataOnPage') || 10

        const token = localStorage.getItem("token");
        let totalData = await axios.get(`${url}/expense/getAllExpense/1/${pagesDataSelected}`, {
            headers: {
                'Authorization': token
            }
        });

        console.log(totalData)

        console.log(totalData.data.expensesData)
        console.log(totalData.data.hasNextPage)

        totalData.data.expensesData.forEach(data => {
            addUserExpenseToScreen(data)
        })


        showPagination(totalData.data)




    } catch (err) {
        console.log(err);


    }
})

document.getElementById('expenseDownloadButton').addEventListener('click', async (e) => {

    try {
        let token = localStorage.getItem('token');
        let awsS3Data = await axios.get(`${url}/expense/download`, { headers: { Authorization: token } })
        console.log(awsS3Data)
        console.log(awsS3Data.status)
        if (awsS3Data.status === 200) {

            var anchor = document.createElement('a');
            anchor.href = awsS3Data.data.fileUrl;
            anchor.download = 'expeses.csv';
            anchor.click();
            addDownloadsToScreen(awsS3Data.data.fileUrl)

        } else {
            throw new Error(response.data.message)
        }

    } catch (err) {
        console.log(err)
    }

})

function addDownloadsToScreen(fileurl) {
    const tbodyDown = document.getElementById('downloaded-links-tbody');

    var tr = document.createElement('tr');


    const anchor = `<a href= ${fileurl} download = "expenses.csv">${fileurl} </a>`
    //anchor.click();

    var TotalHtml = `<td>${anchor}</td>`


    tr.innerHTML = TotalHtml;

    tbodyDown.appendChild(tr)

}

async function showAllDownloadsOfUser() {
    try {
        let token = localStorage.getItem('token')
        let downloads = await axios.get(`${url}/expense/allDownloads`, { headers: { Authorization: token } })

        // console.log(downloads.data.allData)

        //  console.log(downloads.data.allData.fileurl)
        downloads.data.allData.forEach((element, index) => {
            addDownloadsToScreen(element.fileurl, index + 1)
        })


    } catch (err) {
        console.log(err)
    }
}

document.addEventListener('DOMContentLoaded', isPremierUser);
document.addEventListener('DOMContentLoaded', showAllDownloadsOfUser);


buyPremiumButton.addEventListener('click', buyPremiumMemberShip)