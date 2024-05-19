// BRING HTML ELEMENTS TO JS
let showFormBtn = document.querySelector("#show-form-btn");
let form = document.querySelector("#form");

let firstNameInput = document.querySelector("#first-name");
let lastNameInput = document.querySelector("#last-name");
let ageInput = document.querySelector("#age");
let showArea = document.querySelector("#show-area");
let studentOnBrowser = document.querySelector("#browser-display");

// ~~~~~~FUNCTIONS~~~~~~~
let ALL_STUDENTS_LIST = JSON.parse(localStorage.getItem("students")) || []
// Show form function
function showForm () {
    if (form.classList.contains('show')) {
        showFormBtn.innerHTML = 'SHOW'
        form.classList.remove('show')
        showArea.classList.remove('show')
    }else {
        form.classList.add('show')
        showArea.classList.add('show')
        showFormBtn.innerHTML = 'HIDE'
    }
}
// Submit form function
function submitForm (e) {
    e.preventDefault()

    function Person (firstName, lastName, age) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
    }

    let firstName = firstNameInput.value.trim()
    let lastName = lastNameInput.value.trim()
    let age = ageInput.value.trim()
    let newPerson = new Person(firstName, lastName, age)
    console.log(newPerson);

    if (firstName && lastName && age) {
        ALL_STUDENTS_LIST.push(newPerson)
        localStorage.setItem("students", JSON.stringify(ALL_STUDENTS_LIST))
    
        update ()
    } else {
        alert("Please, fill the form!")
    }
}
// Update function
function update () {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    studentOnBrowser.innerHTML = ``

    students.forEach((student, index) => {


        let studentDiv = document.createElement("div");
        studentDiv.classList.add("list-body");

        studentDiv = `
        <div class="list-body">
            <h2>${index+1}:</h2>
            <h2>${student.firstName}</h2>
            <h2>${student.lastName}</h2>
            <h2>${student.age}</h2>
        </div>
        `
        studentOnBrowser.innerHTML += studentDiv

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "DELETE"
        deleteBtn.classList.add("button-red")
        studentOnBrowser.appendChild(deleteBtn)

        deleteBtn.addEventListener("click", function () {
            let deleteIndex = students.findIndex(s => s === student );
            if (deleteIndex != -1) {
                students.splice(deleteIndex, 1)
                localStorage.setItem("students", JSON.stringify(students))
                update()
            }
        });


       

    });
    form.reset()



    
}


// ~~~~~~EVENT LISTENERS~~~~~~
showFormBtn.addEventListener("click", showForm)
form.addEventListener("submit", submitForm)







