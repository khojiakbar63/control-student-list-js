// BRING HTML ELEMENTS TO JS
let showFormBtn = document.querySelector("#show-form-btn");
let form = document.querySelector("#form");
let firstNameInput = document.querySelector("#first-name");
let lastNameInput = document.querySelector("#last-name");
let ageInput = document.querySelector("#age");
let showArea = document.querySelector("#show-area");
let showListBtn = document.querySelector("#show-list-btn");
// let submitBtn = document.querySelector("#submit-btn");
// ~~~~~~FUNCTIONS~~~~~~~
let ALL_STUDENTS_LIST = JSON.parse(localStorage.getItem("students")) || []
// Show form function
function showForm () {
    if (form.classList.contains('show')) {
        showFormBtn.innerHTML = 'SHOW FORM'
        form.classList.remove('show')
    }else {
        form.classList.add('show')
        showFormBtn.innerHTML = 'HIDE FORM'
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

    let firstName = firstNameInput.value
    let lastName = lastNameInput.value
    let age = ageInput.value
    let newPerson = new Person(firstName, lastName, age)
    console.log(newPerson);

    ALL_STUDENTS_LIST.push(newPerson)
    localStorage.setItem("students", JSON.stringify(ALL_STUDENTS_LIST))

    update ()
}
// Update function
function update () {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    showArea.innerHTML = ``
    students.forEach((student, index) => {
        console.log(student.firstName, student.lastName, student.age);

        showArea.innerHTML += `
        <div class="list-body">
            <h2>${student.firstName}</h2>
            <h2>${student.lastName}</h2>
            <h2>${student.age}</h2>
        </div>
        `
        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "DELETE"
        deleteBtn.classList.add("delete-btn")
        showArea.appendChild(deleteBtn)

        deleteBtn.addEventListener("click", function () {
            let index = students.indexOf(student)
            students.splice(index, 1)
            localStorage.setItem("students", JSON.stringify(students))
            update()
        })
    });

    document.getElementById('form').reset()
    window.onload = function() {
        update()
    }
}

function showList() {
    if (showArea.classList.contains('show-list')) {
        showListBtn.innerHTML = 'SHOW LIST';
        showArea.classList.remove('show-list');
        showArea.classList.add('hide-list');
    } else {
        showArea.classList.add('show-list');
        showArea.classList.remove('hide-list');
        showListBtn.innerHTML = 'HIDE LIST';
    }
}
// ~~~~~~EVENT LISTENERS~~~~~~
showFormBtn.addEventListener("click", showForm)
form.addEventListener("submit", submitForm)
showListBtn.addEventListener("click", showList)

















window.onload = function () {
    showFormBtn.click()
    console.log("Hello".repeat(100));
}