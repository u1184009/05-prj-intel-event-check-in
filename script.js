// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendence
let count = 0;
const maxCount = 50; 

// Handle form submission
form.addEventListener("submit", function (event){
  // prevent page refresh on submit
  event.preventDefault();

  // Get for values

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Increment count
  count++;

  console.log("Total attendence count: "+count);

  // Update progress bar
  const percentage = Math.round((count/maxCount) * 100) + "%";

  console.log(`Precentage: ${percentage}`)

  // Update Team counter

  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Simple welcome message

  const message = `🎉 Welcome, ${name} from ${teamName}`;

  // alert(message);

  form.reset();
})