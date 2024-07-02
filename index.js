const newDiv = document.getElementById('child2');

document.getElementById('addButton').onclick = function(event) {
    event.preventDefault();                             // Prevent form from submitting and reloading the page
    registration();
    
    const animeName = document.getElementById('name').value;
    const animeStudentId = document.getElementById('studentId').value;
    const animeEmail = document.getElementById('email').value;
    const animeRollNumber = document.getElementById('rollNumber').value;
    
    if(animeName !== "" && animeStudentId !== "" && animeEmail !== "" && animeRollNumber !== ""){
        const submitAnimation = document.getElementById('child1');
        submitAnimation.style.border = '5px solid whitesmoke';
    }
};

function registration() {
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const rollNumber = document.getElementById('rollNumber').value;

    const nameRegex = /^[a-zA-Z\s]+$/;                                  //only characters will be added
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;                    // for valid email address tobe added

    if (!nameRegex.test(name)) {
        window.alert("Name should only contain characters.");
        return;
    }

    if (!emailRegex.test(email)) {
        window.alert("Please enter a valid email address.");
        return;
    }

    if (name === "" || studentId === "" || email === "" || rollNumber === "") {
        window.alert("Enter all the details.");
        return;
    }

    const parent = document.getElementById('child2');

    let table = parent.querySelector('table');
    if (!table) {
        table = document.createElement('table');

        table.style.overflow = 'scroll';

        // Add table headings
        const headingRow = document.createElement('tr');
        const nameHeading = document.createElement('th');
        nameHeading.innerHTML = 'Name';
        const studentIdHeading = document.createElement('th');
        studentIdHeading.innerHTML = 'Student ID';
        const emailHeading = document.createElement('th');
        emailHeading.innerHTML = 'Email';
        const rollnumberHeading = document.createElement('th');
        rollnumberHeading.innerHTML = 'Roll Number';
        const actionsHeading = document.createElement('th');
        actionsHeading.innerHTML = 'Actions';

        headingRow.appendChild(nameHeading);
        headingRow.appendChild(studentIdHeading);
        headingRow.appendChild(emailHeading);
        headingRow.appendChild(rollnumberHeading);
        headingRow.appendChild(actionsHeading);
        table.appendChild(headingRow);
    }

    const tableRow = document.createElement('tr');
    const nameChild = document.createElement('td');
    const studentIdChild = document.createElement('td');
    const emailChild = document.createElement('td');
    const rollnumberChild = document.createElement('td');
    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    
    nameChild.innerHTML = name;
    studentIdChild.innerHTML = studentId;
    emailChild.innerHTML = email;
    rollnumberChild.innerHTML = rollNumber;

    nameChild.style.textAlign = 'center';
    studentIdChild.style.textAlign = 'center';
    emailChild.style.textAlign = 'center';
    rollnumberChild.style.textAlign = 'center';

    tableRow.appendChild(nameChild);
    tableRow.appendChild(studentIdChild);
    tableRow.appendChild(emailChild);
    tableRow.appendChild(rollnumberChild);

    const actionsCell = document.createElement('td');                           // we use remove() method to delete the data
    actionsCell.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    actionsCell.appendChild(editButton);

    tableRow.appendChild(actionsCell);
    table.appendChild(tableRow);
    parent.appendChild(table);

    document.getElementById('resetAnimation').onclick = function() {
        const child1Animation = document.getElementById('child1');
        child1Animation.style.border = '2px solid black';
    }

    saveToLocalStorage();

    deleteButton.addEventListener('click', function() {
        tableRow.remove();
        if (table.rows.length === 1) {
            table.remove();
        }
        saveToLocalStorage();
    });

    editButton.addEventListener('click', function() {                       // for edit functionality first we have to create new input field after clicking on edit option
        const nameInput = document.createElement('input');                  // next we have to enter new values in that newly created input field
        nameInput.value = nameChild.innerHTML;                              // we have to create save button and to replace edit with save button 
        nameChild.innerHTML = '';                                           // after clicking on save button we have to remove input fields and new values will be added
        nameChild.appendChild(nameInput);

        const studentIdInput = document.createElement('input');
        studentIdInput.value = studentIdChild.innerHTML;
        studentIdChild.innerHTML = '';
        studentIdChild.appendChild(studentIdInput);

        const emailInput = document.createElement('input');
        emailInput.value = emailChild.innerHTML;
        emailChild.innerHTML = '';
        emailChild.appendChild(emailInput);

        const rollNumberInput = document.createElement('input');
        rollNumberInput.value = rollnumberChild.innerHTML;
        rollnumberChild.innerHTML = '';
        rollnumberChild.appendChild(rollNumberInput);

        const saveButton = document.createElement('button');
        saveButton.innerHTML = 'Save';
        editButton.replaceWith(saveButton);

        saveButton.addEventListener('click', function() {
            nameChild.innerHTML = nameInput.value;
            studentIdChild.innerHTML = studentIdInput.value;
            emailChild.innerHTML = emailInput.value;
            rollnumberChild.innerHTML = rollNumberInput.value;

            nameInput.remove();
            studentIdInput.remove();
            emailInput.remove();
            rollNumberInput.remove();

            saveButton.replaceWith(editButton);
            saveToLocalStorage();
        });
    });
}

function saveToLocalStorage() {
    const table = document.querySelector('#child2 table');
    const data = [];
    if (table) {
        for (let i = 1; i < table.rows.length; i++) {                       // Skip header row
            const row = table.rows[i];
            const rowData = {
                name: row.cells[0].innerHTML,                               // pushing added data to the cells(in an order) 
                studentId: row.cells[1].innerHTML,
                email: row.cells[2].innerHTML,
                rollNumber: row.cells[3].innerHTML
            };
            data.push(rowData);
        }
    }
    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('tableData'));
    if (data && data.length > 0) {
        data.forEach(item => {
            document.getElementById('name').value = item.name;
            document.getElementById('studentId').value = item.studentId;
            document.getElementById('email').value = item.email;
            document.getElementById('rollNumber').value = item.rollNumber;
            registration();
        });
        // Clear form fields after loading data
        document.getElementById('name').value = '';
        document.getElementById('studentId').value = '';
        document.getElementById('email').value = '';
        document.getElementById('rollNumber').value = '';
    }
}

// Load data from localStorage when the page loads
window.onload = function() {
    loadFromLocalStorage();
};
