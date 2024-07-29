const students = [
  {
    id: 1,
    firstName: "Harry",
    lastName: "Potter",
    preferToDo: "What is right"
  },
  {
    id: 2,
    firstName: "Hermione",
    lastName: "Granger",
    preferToDo: "What is right"
  },
  {
    id: 3,
    firstName: "Lord",
    lastName: "Voldemort",
    preferToDo: "What is necessary"
  },
  {
    id: 4,
    firstName: "Cedric",
    lastName: "Diggory",
    preferToDo: "What is kind"
  },
  {
    id: 5,
    firstName: "Luna",
    lastName: "Lovegood",
    preferToDo: "What is wise"
  }
]

// Utility (reusable) function to determine what element to target (divId) to use to render the House Cards to the DOM

const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

// Creating array to render House cards on DOM via domString variable and then calling on utility function above to apply pet cards to the DOM via .innerHTML

const cardsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h2 class="first-name">${student.firstName}</h2>
      <h2 class="last-name">${student.lastName}</h2>
    </div>
    <h2 class="house-student house-student-footer--${student.preferToDo}">${student.preferToDo}</h2>
    <button class="btn btn-danger" id="delete--${student.id}">Delete</button>
  </div>`;
  }
  
  renderToDom("#houseCards", domString);
};

// Creating filter function to filter results of array based on "preferToD" results via preferTo variable into available houses (Gryffindor, Hufflepuff, Ravenclaw,or Slytherin) and then returning the array

const filter = (array, preference) => {
  const preferArray = [];
  for (member of array) {
    if (member.preferToDo === preference) {
      preferArray.push(member);
    }
  }
  return preferArray;
}

// Creating createStudent function to add new student cards

const form = document.querySelector("form");  // Targeting form element in HTML to use for House object details
  
const createStudent = (e) => {
  e.preventDefault(); // Prevents page from reloading prior to changes being made
  const selectedRadioButton = document.querySelector('input[name="flexRadioDefault"]:checked');
  const newPreferToDo = document.querySelector(`label[for="${selectedRadioButton.id}"]`).innerText;
  const newStudentObj = {  // Creating variable to use to create new pet card object
    id: students.length +1,
    firstName: document.querySelector("#exampleFirstName").value,
    lastName: document.querySelector("#exampleLastName").value,
    preferToDo: newPreferToDo
  };
  students.push(newStudentObj);  // Pushes new student card object to end of existing petCards array
  cardsOnDom(students);  // Repaints DOM with new array
  form.reset();  // Resets form
}
form.addEventListener("submit", createStudent);  // Creates listener event to apply new pet object entry when submit button is clicked

// Creating function to delete House card

const houseCards = document.querySelector("#houseCards");  // Targets houseCards ID in HTML to use find and delete House card entry
houseCards.addEventListener("click", (e) => {  // adds Event Listener to listen for click
  if (e.target.id.includes("delete")) {  // Checks that e.target.id includes "delete"
    const [, id] = e.target.id.split("--");  // Destructures to split "ID" and card position, remove wording, and keep position number only
    const index = students.findIndex((e) => e.id === Number(id));  // Adds logic to remove from array via findIndex method - also makes sure that card being deleted matches the card's ID number
    students.splice(index, 1);  // modifies original array by removing index (the one deleted card) only
    cardsOnDom(students);
  }
});

// Creating Listener Event to listen for when "Show All Pets" button is clicked to show all students

const showAllButton = document.querySelector("#showAll");
const showGryffindorButton = document.querySelector("#showGryffindor");
const showHufflepuffButton = document.querySelector("#showHufflepuff");
const showRavenclawButton = document.querySelector("#showRavenclaw");
const showSlytherinButton = document.querySelector("#showSlytherin");

// Creating Listener Event to listen for when "Show All Pets" button is clicked to show all pets

showAllButton.addEventListener("click", () => {
  cardsOnDom(students);
});

// Creating Listener Event to listen for when "Gryffindor" button is clicked to show Gryffindor students only

showGryffindorButton.addEventListener("click", () => {
  const gryff = filter(students, "What is right");
  cardsOnDom(gryff);
});

// Creating Listener Event to listen for when "Hufflepuff" button is clicked to show Hufflepuff students only

showHufflepuffButton.addEventListener("click", () => {
  const huff = filter(students, "What is kind");
  cardsOnDom(huff);
});

// Creating Listener Event to listen for when "Ravenclaw" button is clicked to show Ravenclaw students only

showRavenclawButton.addEventListener("click", () => {
  const raven = filter(students, "What is wise");
  cardsOnDom(raven);
});

// Creating Listener Event to listen for when "Slytherin" button is clicked to show Slytherin students only

showSlytherinButton.addEventListener("click", () => {
  const slyth = filter(students, "What is necessary");
  cardsOnDom(slyth);
});

const startApp = () => {
  cardsOnDom(students);
}

startApp();
