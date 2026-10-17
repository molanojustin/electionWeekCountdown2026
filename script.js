// US general elections fall on the Tuesday after the first Monday in November
// of even-numbered years, i.e. the first Tuesday between November 2 and 8.
function getElectionDay(year) {
    const novFirst = new Date(year, 10, 1).getDay();
    const daysUntilMonday = (1 - novFirst + 7) % 7;
    return 1 + daysUntilMonday + 1;
}

// Returns the next election as { year, day }. Election day itself counts as
// "next" so the video shows all day; the countdown rolls over the day after.
function getNextElection(currentDate) {
    let year = currentDate.getFullYear();
    if (year % 2 !== 0) year++;
    const dayAfterElection = new Date(year, 10, getElectionDay(year) + 1);
    if (currentDate >= dayAfterElection) year += 2;
    return { year, day: getElectionDay(year) };
}

function calculateWeeksUntilElection(currentDate, election) {
    const electionDate = Date.UTC(election.year, 10, election.day);
    const inputDate = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate());
    // while (inputDate.getDay() !== 2) {
    //     inputDate.setDate(inputDate.getDate() + 1);
    // }
    const weeksUntilElection = Math.ceil((electionDate - inputDate) / (7 * 24 * 60 * 60 * 1000));
    return weeksUntilElection;
}

// Function to calculate days until election
function calculateDaysUntilElection(currentDate, electionDate) {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const diffDays = Math.ceil((electionDate - currentDate) / oneDay);
    return diffDays;
}

function calculateZacharias(date, electionDate) {
    let inputDate = new Date(date);
    const secondsUntilElection = Math.ceil((electionDate - inputDate) / 1000);
    const zachariasUntilElection = (secondsUntilElection / (5 * 24 * 60 * 60)).toFixed(6);
    return zachariasUntilElection;
}

document.addEventListener('DOMContentLoaded', async (event) => {
    const currentDate = new Date();
    const election = getNextElection(currentDate);
    const electionDate = new Date(election.year, 10, election.day); // Election date in local time

    if (currentDate >= electionDate) {
        // Embed the video
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = `
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/jt6riM2aDLk?start=18" title="YouTube video player" loading="lazy" style="border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;
    } else {
        const weeksUntilElection = calculateWeeksUntilElection(currentDate, election);
        const daysUntilElection = calculateDaysUntilElection(currentDate, electionDate);
        const countdownElement = document.getElementById('countdown');
        const daysElement = document.getElementById('days');
        const zachariasElement = document.getElementById('zacharias');
        countdownElement.textContent = `Week: ${weeksUntilElection}`;
        daysElement.textContent = `Day: ${daysUntilElection}`;

        function updateZacharias() {
            const currentDateTime = new Date().toISOString();
            const zachariasUntilElection = calculateZacharias(currentDateTime, electionDate);
            zachariasElement.innerHTML = `Zacharia${zachariasUntilElection !== 1 ? 's' : ''}<sup style="font-size: 3vw;"><a href="https://www.nytimes.com/2026/10/16/us/politics/katie-zacharia-fired-press-secretary.html" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">*</a></sup>: ${zachariasUntilElection}`;
        }

        updateZacharias();
        setInterval(updateZacharias, 1000);
    }
});
