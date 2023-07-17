const url = 'http://localhost:7000';



document.addEventListener('DOMContentLoaded', async (e) => {

    try {
        e.preventDefault();

        let totalData = await fetch(`${url}/getExpense`);

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



        let fetchData = await fetch(`${url}/addexpense`, {
            headers: {
                'Content-Type': 'application/json',

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
        let deleteData = await fetch(`${url}/deleteuser/` + id, {
            method: "DELETE"
        })

        document.getElementById(id).parentElement.parentElement.remove();

    } catch (err) {
        console.log(err);
    }
}



