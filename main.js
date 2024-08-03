const students = [
  {
    id: 1,
    image: "https://i.natgeofe.com/k/015ed957-e87b-403b-92a5-75372e8a28c3/a-8-harry-potter-harry_3x4.jpg",
    firstName: "Harry",
    lastName: "Potter",
    house: "Gryffindor"
  },
  {
    id: 2,
    image: "https://media.harrypotterfanzone.com/hermione-granger-chamber-of-secrets-portrait-3.jpg",
    firstName: "Hermione",
    lastName: "Granger",
    house: "Gryffindor"
  },
  {
    id: 3,
    image: "https://images.squarespace-cdn.com/content/v1/5a5d268364b05f7a0f038afe/1532024159009-FMF41SUE0A4Q8BEOU021/Voldemort.jpg",
    firstName: "Lord",
    lastName: "Voldemort",
    house: "Slytherin"
  },
  {
    id: 4,
    image: "https://media.harrypotterfanzone.com/cedric-diggory-goblet-of-fire-portrait.jpg",
    firstName: "Cedric",
    lastName: "Diggory",
    house: "Hufflepuff"
  },
  {
    id: 5,
    image: "https://images.ctfassets.net/usf1vwtuqyxm/t6GVMDanqSKGOKaCWi8oi/74b6816d9f913623419b98048ec87d25/LunaLovegood_WB_F5_LunaLovegoodPromoCloseUp_Promo_080615_Port.jpg",
    firstName: "Luna",
    lastName: "Lovegood",
    house: "Ravenclaw"
  },
  {
    id: 6,
    image: "https://images.ctfassets.net/usf1vwtuqyxm/6o3lBfUzFoke5XPwn4vtdA/b3c3cbd509cb485515f616be8025d23f/FOUNDATIONAL-DISCOVER-FEATURE-newt-scamander-different-kind-of-hero-004PHOTOBU18181_PHUP_FB2.jpg",
    firstName: "Newt",
    lastName: "Scammander",
    house: "Hufflepuff"
  },
  {
    id: 7,
    image: "https://i.pinimg.com/474x/22/06/b9/2206b98fdd008df7f0b669cbb7711e0d.jpg",
    firstName: "Myrtle",
    lastName: "Warren",
    house: "Ravenclaw"
  },
  {
    id: 8,
    image: "https://upload.wikimedia.org/wikipedia/en/1/16/Draco_Mal.JPG",
    firstName: "Draco",
    lastName: "Malfoy",
    house: "Slytherin"
  }
]

// Constructing expelledStudents arrray

const expelledStudents = [];

// Constructing houseArray into which all student cards can be sorted

const houseArray = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

// Constructing getRandomHouse function to use to randomly sort all new students created through createStudent function below

const getRandomHouse = () => {
  index = Math.floor(Math.random() * 3)
  return houseArray[index];
};

// Utility (reusable) function to determine what element to target (divId) to use to render the House Cards to the DOM

const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

// Creating array to render House cards on DOM via domString variable and then calling on utility function above to apply pet cards to the DOM via .innerHTML

const studentsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" style="width: 18rem;">
    <h2 class="first-name">${student.firstName}</h2>
    <h2 class="last-name">${student.lastName}</h2>
    <h2 class="house-assignment" id="assignment--${student.house}">${student.house}</h2>
    <button class="btn btn-danger" id="delete--${student.id}">Delete</button>
    <button type="button" class="btn btn-dark" id="expel--${student.id}">Expel!!</button>
  </div>`;
  }
  
  renderToDom("#houseCards", domString);
};

const expelledStudentsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" style="width: 18rem;">
    <h2>Those who shall not be named!</h2>
    <h2 class="first-name">${student.firstName}</h2>
    <h2 class="last-name">${student.lastName}</h2>
    <h2 class="house-assignment" id="assignment--${student.house}">${student.house}</h2>
  </div>`;
  }
  
  renderToDom("#expelCards", domString);
};

// Creating filter function to filter results of array based on "preferToD" results via preferTo variable into available houses (Gryffindor, Hufflepuff, Ravenclaw,or Slytherin) and then returning the array

const filter = (array, house) => {
  const randomArray = [];
  for (member of array) {
    if (member.house === house) {
      randomArray.push(member);
    }
  }
  return randomArray;
}

// Creating createStudent function to add new student cards

const form = document.querySelector("form");  // Targeting form element in HTML to use for House object details
  
const createStudent = (e) => {
  e.preventDefault(); // Prevents page from reloading prior to changes being made
  const newStudentObj = {  // Creating variable to use to create new pet card object
    id: students.length +1,
    // image: document.querySelector("#exampleFormControlFile1").value,
    firstName: document.querySelector("#exampleFirstName").value,
    lastName: document.querySelector("#exampleLastName").value,
    house: getRandomHouse()
  };
  students.push(newStudentObj);  // Pushes new student card object to end of existing petCards array
  studentsOnDom(students);  // Repaints DOM with new array
  form.reset();  // Resets form
}
form.addEventListener("submit", createStudent);  // Creates listener event to apply new pet object entry when submit button is clicked

// Creating function to delete House card

const houseCards = document.querySelector("#houseCards");  // Targets houseCards ID in HTML to use to find and delete House card entry
houseCards.addEventListener("click", (e) => {  // adds Event Listener to listen for click
  if (e.target.id.includes("delete")) {  // Checks that e.target.id includes "delete"
    const [, id] = e.target.id.split("--");  // Destructures to split "ID" and card position, remove wording, and keep position number only
    const index = students.findIndex((e) => e.id === Number(id));  // Adds logic to remove from array via findIndex method - also makes sure that card being deleted matches the card's ID number
    students.splice(index, 1);  // Modifies original array by removing index (the one deleted card) only
    studentsOnDom(students);
  }
});

houseCards.addEventListener("click", (e) => {
  if (e.target.id.includes("expel")) {
    const [, id] = e.target.id.split("--");
    const index = students.findIndex((e) => e.id === Number(id));
    const expelledStudent = students[index];
    students.splice(index, 1);
    expelledStudents.push(expelledStudent);
    studentsOnDom(students);
    expelledStudentsOnDom(expelledStudents);
  }
})


// Creating Listener Event to listen for when "Show All Pets" button is clicked to show all students

const showAllButton = document.querySelector("#showAll");
const showGryffindorButton = document.querySelector("#showGryffindor");
const showHufflepuffButton = document.querySelector("#showHufflepuff");
const showRavenclawButton = document.querySelector("#showRavenclaw");
const showSlytherinButton = document.querySelector("#showSlytherin");

// Creating Listener Event to listen for when "Show All Pets" button is clicked to show all pets

showAllButton.addEventListener("click", () => {
  studentsOnDom(students);
});

// Creating Listener Event to listen for when "Gryffindor" button is clicked to show Gryffindor students only

showGryffindorButton.addEventListener("click", () => {
  const gryff = filter(students, "Gryffindor");
  studentsOnDom(gryff);
});

// Creating Listener Event to listen for when "Hufflepuff" button is clicked to show Hufflepuff students only

showHufflepuffButton.addEventListener("click", () => {
  const huff = filter(students, "Hufflepuff");
  studentsOnDom(huff);
});

// Creating Listener Event to listen for when "Ravenclaw" button is clicked to show Ravenclaw students only

showRavenclawButton.addEventListener("click", () => {
  const raven = filter(students, "Ravenclaw");
  studentsOnDom(raven);
});

// Creating Listener Event to listen for when "Slytherin" button is clicked to show Slytherin students only

showSlytherinButton.addEventListener("click", () => {
  const slyth = filter(students, "Slytherin");
  studentsOnDom(slyth);
});

const startApp = () => {
  studentsOnDom(students);
}

startApp();
