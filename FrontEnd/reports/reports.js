const url = 'http://localhost:7000'




function addDataToScreen(data) {
    const tbody = document.querySelector('table tbody')

    var tr = document.createElement('tr');

    var TotalHtml = `<td>${data.date}</td>
       <td>${data.item}</td><td>${data.description}</td><td>${data.expense}</td>`
    tr.innerHTML = TotalHtml;

    tbody.appendChild(tr)
}

function removeDailyDataFromScreen() {
    document.querySelector('table tbody').innerHTML = "";
}

//daily expenses
document.getElementById('get-daily-expense').addEventListener('click', async (e) => {

    try {
        e.preventDefault()
        console.log(document.getElementById('date').value)
        const date = new Date(document.getElementById('date').value);
        const formatedDate = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;;

        const token = localStorage.getItem('token')

        let dailyExpenses = await axios.post(`${url}/getDailyReports`, { date: formatedDate }, { headers: { Authorization: token } })

        console.log(dailyExpenses.data)
        removeDailyDataFromScreen()
        dailyExpenses.data.forEach(data => {
            addDataToScreen(data)
        })


    } catch (err) {
        console.log(err)

    }
})

// monthly expenses
function addMonthDataToScreen(month, totalMonthlyAmount) {
    const tbodyM = document.getElementById('tbodyMonthId')

    var tr = document.createElement('tr');

    var TotalHtml = `<td>${month}</td>
       <td>${totalMonthlyAmount}</td>`
    tr.innerHTML = TotalHtml;

    tbodyM.appendChild(tr)

}
function removeMonthyDataFromScreen() {
    document.getElementById('tbodyMonthId').innerHTML = ""
}

document.getElementById('get-monthly-expense').addEventListener('click', async (e) => {

    try {
        e.preventDefault()
        console.log(document.getElementById('month').value)
        let monthEntered = new Date(document.getElementById('month').value);

        const monthFormat = `${(monthEntered.getMonth() + 1).toString().padStart(2, "0")}`;
        console.log(monthFormat)
        const token = localStorage.getItem('token');

        let monthlyExpenses = await axios.post(`${url}/getMonthlyReports`, { month: monthFormat }, { headers: { Authorization: token } })

        console.log(monthlyExpenses.data)


        let totalMonthlyAmount = 0;
        monthlyExpenses.data.forEach(data => {
            totalMonthlyAmount += data.expense;
        })
        removeMonthyDataFromScreen()
        addMonthDataToScreen(monthFormat, totalMonthlyAmount)


    } catch (err) {
        console.log(err)
    }
})


//Yearly Expenses

function addYearDataToScreen(year, totalAmount) {
    const tbodyyear = document.getElementById('tbodyYearId')

    var tr = document.createElement('tr');

    var TotalHtml = `<td>${year}</td>
       <td>${totalAmount}</td>`
    tr.innerHTML = TotalHtml;

    tbodyyear.appendChild(tr)

}
function removeYaerlyDataFromScreen() {
    document.getElementById('tbodyYearId').innerHTML = ""
}


document.getElementById('get-year-expense').addEventListener('click', async (e) => {
    try {
        e.preventDefault()
        const year = document.getElementById('year-input').value
        console.log(year);
        const token = localStorage.getItem('token')
        let yearData = await axios.post(`${url}/getYearlyyReports`, { year: year }, { headers: { Authorization: token } })

        console.log(yearData.data)
        let totalAmount = 0;
        yearData.data.forEach(data => {
            totalAmount += data.expense
        })
        removeYaerlyDataFromScreen()
        addYearDataToScreen(year, totalAmount)

    } catch (err) {
        console.log(err)
    }


})