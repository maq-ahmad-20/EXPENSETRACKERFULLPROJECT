
const url = 'http://localhost:7000';


function addDataToScreen(data) {
    const tbody = document.querySelector('table tbody')

    var tr = document.createElement('tr');

    var TotalHtml = `<td>${data.name}</td>
       <td>${data.totalexpense}</td>
       `
    tr.innerHTML = TotalHtml;

    tbody.appendChild(tr)
}

async function displayLeaderBoard() {
    try {

        let leaderBoardData = await axios.get(`${url}/getAllLeaderboardData`);
        console.log(leaderBoardData.data)

        leaderBoardData.data.forEach(data => {
            addDataToScreen(data)
        })

    } catch (err) {
        console.log(err)
    }
}

document.addEventListener('DOMContentLoaded', displayLeaderBoard)