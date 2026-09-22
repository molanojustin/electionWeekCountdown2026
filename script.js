function calculateWeeksUntilElection(date) {
    const electionDate = new Date('2026-11-03');
    const currentYear = new Date().getFullYear();
    let inputDate = new Date(`${currentYear}-${date}`);
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

function calculateMooches(date) {
    const electionDate = new Date('2026-11-03T00:00:00');
    let inputDate = new Date(date);
    const secondsUntilElection = Math.ceil((electionDate - inputDate) / 1000);
    const moochesUntilElection = (secondsUntilElection / (15840*60)).toFixed(6);
    return moochesUntilElection;
}

document.addEventListener('DOMContentLoaded', async (event) => {
    const currentDate = new Date();
    const electionDate = new Date('2026-11-03T00:00:00'); // Election date in local time

    if (currentDate >= electionDate) {
        // Embed the video
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = `
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/jt6riM2aDLk?start=18" title="YouTube video player" loading="lazy" style="border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;
    } else {
        const date = currentDate.toISOString().slice(5, 10); // Get current date in MM-DD format
        const weeksUntilElection = calculateWeeksUntilElection(date);
        const daysUntilElection = calculateDaysUntilElection(currentDate, electionDate);
        const countdownElement = document.getElementById('countdown');
        const daysElement = document.getElementById('days');
        const moochesElement = document.getElementById('mooches');
        countdownElement.textContent = `Week: ${weeksUntilElection}`;
        daysElement.textContent = `Day: ${daysUntilElection}`;

        function updateMooches() {
            const currentDateTime = new Date().toISOString();
            const moochesUntilElection = calculateMooches(currentDateTime);
            moochesElement.innerHTML = `Mooche${moochesUntilElection !== 1 ? 's' : ''}<sup style="font-size: 3vw;"><a href="https://www.nbcnews.com/politics/politics-news/scaramucci-sets-new-record-shortest-term-communications-director-n788281" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">*</a></sup>: ${moochesUntilElection}`;
        }

        updateMooches();
        setInterval(updateMooches, 1000);
    }
});
