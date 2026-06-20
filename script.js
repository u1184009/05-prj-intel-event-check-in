// localStorage.clear();
// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const checkInBtn = document.getElementById("checkInBtn");

// Track attendence
let count = 0;
const maxCount = 10; 

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
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage;
  console.log(`Percentage: ${percentage}`);

  // Update Team counter

  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;


  // Update attendee count
  const currentCount = document.getElementById("attendeeCount");
  currentCount.textContent = count;

  // Simple welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  let winningTeam = "Team Water Wise";

  // Handle max capacity
  if(count >= maxCount){
    const waterWise = parseInt(document.getElementById("waterCount").textContent);
    const netZero = parseInt(document.getElementById("zeroCount").textContent);
    const renewable = parseInt(document.getElementById("powerCount").textContent);

    // Check the highest team count
    if(netZero > waterWise && netZero > renewable){
      winningTeam = "Team Net Zero";
    } else if(renewable > waterWise && renewable > netZero){
      winningTeam = "Team Renewable";
    }

    greeting.textContent = ` 🎉Event is at full capacity!🎉 ${winningTeam} has the highest attendence!`;

    // Disable form inputs
    checkInBtn.disabled = true;
    nameInput.disabled = true;
    teamSelect.disabled = true;
  }
  // Save current data
  saveData();
  // Clear entry after submission
  form.reset();
})

// Save data to local storage. 
function saveData() {
  localStorage.setItem("count", count);
  localStorage.setItem("greeting", greeting.textContent);
  localStorage.setItem("btnDisabled", checkInBtn.disabled);
  localStorage.setItem(
    "waterCount",
    document.getElementById("waterCount").textContent
  );
  localStorage.setItem(
    "zeroCount",
    document.getElementById("zeroCount").textContent
  );
  localStorage.setItem(
    "powerCount",
    document.getElementById("powerCount").textContent
  );
  console.log("Data saved to local storage.");
}

// Load the data from local storage
function loadData() {
  const savedCount = localStorage.getItem("count");
  const savedGreeting = localStorage.getItem("greeting");
  const btnDisabled = localStorage.getItem("btnDisabled") === "true";
  checkInBtn.disabled = btnDisabled;
  
  if (savedCount) {
    count = parseInt(savedCount);

    document.getElementById("attendeeCount").textContent = count;

    document.getElementById("waterCount").textContent =
      localStorage.getItem("waterCount") || 0;

    document.getElementById("zeroCount").textContent =
      localStorage.getItem("zeroCount") || 0;

    document.getElementById("powerCount").textContent =
      localStorage.getItem("powerCount") || 0;

    const percentage = Math.round((count / maxCount) * 100) + "%";

    document.getElementById("progressBar").style.width = percentage;
  }

  if (savedGreeting) {
    greeting.textContent = savedGreeting;
    greeting.classList.add("success-message");
    greeting.style.display = "block";
  }
}

// Load data on page load
loadData();