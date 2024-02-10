var form = document.getElementById('myForm');
form.addEventListener("submit", submitted);

var validFirstName = false;
var validLastName = false;
var validEmail = false;
var validPhone = false;
var validStreetAddress = false;
var validCity = false;
var validState = false;
var validZipcode = false;
var validHowDidYouHear = false;
var validComments = false;

// checkbox counter
var checkboxCounter = 0;
var checkBoxValues = [];
var customizationsEnabled = false;

// regex for name, email and phone
var regExName = /^[a-z A-Z]+$/;
var regExEmail = /\b[A-Za-z0-9._%+-]+@northeastern\.edu$/;
var regExPhone = /^(\d{3}-?\d{3}-?\d{4}|\d{10})$/;
var regexZipcode = /^\d{5}$/;
var regexBasicAlphaNumeric = /^[A-Z a-z0-9]+$/;

// values from HTML
var firstName = document.getElementById('firstName');
firstName.addEventListener('input', validate);

var lastName = document.getElementById('lastName');
lastName.addEventListener('input', validate);

var emailId = document.getElementById('emailId');
emailId.addEventListener('input', validate);

var phoneNumber = document.getElementById('phoneNumber');
phoneNumber.addEventListener('input', validate);

var streetAddress1 = document.getElementById('streetAddress1');
streetAddress1.addEventListener('input', validate);

var city = document.getElementById('city');
city.addEventListener('input', validate);

var state = document.getElementById('state');
state.addEventListener('input', validate);

var zipcode = document.getElementById('zipcode');
zipcode.addEventListener('input', validate);

var comments = document.getElementById('comments');
comments.addEventListener('input', validate);

// checkboxes and select field
var sourceCheckboxes = document.getElementsByName('source');
sourceCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', validate);
});

var drinksSelect = document.getElementById('drinks');
drinksSelect.addEventListener('change', validate);

// validate function
function validate(e) {
    var type = e.target.id; // id of the field
    var em = "error_" + type;
    var value = e.target.value;

    switch (type) {
        case "firstName":
        case "lastName":
        case "city":
        case "state":
            validField(type, regExName, em);
            break;
        case "emailId":
            validField(type, regExEmail, em);
            break;
        case "phoneNumber":
            validField(type, regExPhone, em);
            break;
        case "streetAddress1":
            validStreetAddress = value.trim() !== "";
            break;
        case "zipcode":
            validField(type, regexZipcode, em);
            break;
        case "comments":
            validComments = value.trim() !== "";
            break;
        case "drinks":
            validHowDidYouHear = value !== "";
            updateCheckboxValidation();
            break;
        default:
            if (type === "source") {
                updateCheckboxValidation();
            }
            break;
    }

    // Enable or disable the submit button based on the validation status
    var isSubmitDisabled = !(validFirstName && validLastName && validEmail && validPhone && validStreetAddress && validCity && validState && validZipcode && validHowDidYouHear && validComments);
    document.getElementById('submitButton').disabled = isSubmitDisabled;
}

// Enable or disable the submit button based on checkbox validation
function updateCheckboxValidation() {
    validHowDidYouHear = checkboxCounter > 0;
    document.getElementsByName('source').forEach(function (checkbox) {
        if (checkbox.checked) {
            validHowDidYouHear = true;
            return;
        }
    });
}

// Validate common fields (name, email, phone, zipcode)
function validField(type, regex, em) {
    var field = document.getElementById(type);
    if (!field.value.trim().match(regex)) {
        document.getElementById(em).style.display = "block";
        field.style.border = '2px solid red';
        switch (type) {
            case "firstName":
                validFirstName = false;
                break;
            case "lastName":
                validLastName = false;
                break;
            case "emailId":
                validEmail = false;
                break;
            case "phoneNumber":
                validPhone = false;
                break;
            case "city":
                validCity = false;
                break;
            case "state":
                validState = false;
                break;
            case "zipcode":
                validZipcode = false;
                break;
        }
    } else {
        document.getElementById(em).style.display = "none";
        field.style.border = '';
        switch (type) {
            case "firstName":
                validFirstName = true;
                break;
            case "lastName":
                validLastName = true;
                break;
            case "emailId":
                validEmail = true;
                break;
            case "phoneNumber":
                validPhone = true;
                break;
            case "city":
                validCity = true;
                break;
            case "state":
                validState = true;
                break;
            case "zipcode":
                validZipcode = true;
                break;
        }
    }
}

// checkboxes validation function
function checkBoxValidation(checkbox) {
    if (checkbox.checked) {
        checkboxCounter++;
        checkBoxValues.push(checkbox.value);
    } else {
        checkboxCounter--;
        checkBoxValues.splice(checkBoxValues.indexOf(checkbox.value), 1);
    }

    // Enable or disable the submit button based on checkbox validation
    updateCheckboxValidation();
}

// submitted function
function submitted(e) {
    e.preventDefault();
    if (validFirstName && validLastName && validEmail && validPhone && validStreetAddress && validCity && validState && validZipcode && validHowDidYouHear && validComments) {
        alert("Data entered successfully!");
        createTable();
    } else {
        alert("Please enter valid details!");
    }
}


// handle select list changes
function listChanges() {
    var selectedValue = document.getElementById('drinks').value;
    if (selectedValue !== '') {
        var label = document.getElementById('generatedLabel');
        label.innerHTML = selectedValue + ' - Large ($1 extra)';
        document.getElementById('generatedDiv').style.display = 'block';
    } else {
        document.getElementById('generatedDiv').style.display = 'none';
    }
}

// enable text field based on generated checkbox actions
function handleCheckboxActions(checkbox) {
    if (checkbox.checked) {
        document.getElementById('customizationsDiv').style.display = 'block';
        document.getElementById('customizations').setAttribute('required', 'required');
        customizationsEnabled = true;
    } else {
        document.getElementById('customizationsDiv').style.display = 'none';
        document.getElementById('customizations').removeAttribute('required');
        customizationsEnabled = false;
    }
}

// checkboxes validation function 
function checkBoxValidation(checkbox) {
    if (checkbox.checked == true) {
        checkboxCounter++;
        checkBoxValues.push(checkbox.value);
        // remove required attribute for all three checkboxes
        document.getElementsByName('source').forEach((item) => {
            item.removeAttribute('required');
        });
    } else {
        checkboxCounter--;
        checkBoxValues.splice(checkBoxValues.indexOf(checkbox.value), 1);
        if (checkboxCounter == 0) {
            //add required attribute for all three checkboxes
            document.getElementsByName('source').forEach((item) => {
                item.setAttribute('required', '');
            });
        } // else don't add required because checkboxCounter is not zero(that means one or more checkboxes are selected)
    }
}

// submitted function 
function submitted(e) {
    e.preventDefault();
    if (validFirstName && validLastName && validEmail && validPhone && streetAddress1.value && validCity && validState && validZipcode && comments.value) {
        alert("Data entered successfully!");
        createTable();
    } else {
        alert("Please enter valid details!");
    }
}

// Handle Table Display
function createTable() {
    form.style.display = 'none';
    document.getElementById('tableDiv').style.display = 'block';

    var table = document.getElementById('myTable');
    var headingRow = document.createElement('tr');
    headingRow.innerHTML = '<th width="25%">Label</th><th width="75%">Value</th>';
    table.appendChild(document.createElement('tbody'));
    table.children[0].appendChild(headingRow);
    var firstNameRow = document.createElement('tr');
    firstNameRow.innerHTML = `<td width='25%'>First Name</td><td width='75%'>${firstName.value}</td>`;
    var lastNameRow = document.createElement('tr');
    lastNameRow.innerHTML = `<td width='25%'>Last Name</td><td width='75%'>${lastName.value}</td>`;
    var emailIdRow = document.createElement('tr');
    emailIdRow.innerHTML = `<td width='25%'>Email ID</td><td width='75%'>${emailId.value}</td>`;
    var phoneNumberRow = document.createElement('tr');
    phoneNumberRow.innerHTML = `<td width='25%'>Phone Number</td><td width='75%'>${phoneNumber.value}</td>`;
    var streetAddress1Row = document.createElement('tr');
    streetAddress1Row.innerHTML = `<td width='25%'>Street Address 1</td><td width='75%'>${streetAddress1.value}</td>`;
    var streetAddress2Row = document.createElement('tr');
    streetAddress2Row.innerHTML = `<td width='25%'>Street Address 2</td><td width='75%'>${streetAddress2.value}</td>`;
    var cityRow = document.createElement('tr');
    cityRow.innerHTML = `<td width='25%'>City</td><td width='75%'>${city.value}</td>`;
    var stateRow = document.createElement('tr');
    stateRow.innerHTML = `<td width='25%'>State</td><td width='75%'>${state.value}</td>`;
    var zipcodeRow = document.createElement('tr');
    zipcodeRow.innerHTML = `<td width='25%'>Zipcode</td><td width='75%'>${zipcode.value}</td>`;
    var howDidYouHearRow = document.createElement('tr');
    howDidYouHearRow.innerHTML = `<td width='25%'>How Did You Hear About Us</td><td width='75%'>${checkBoxValues}</td>`;
    var drinksRow = document.createElement('tr');
    if (customizationsEnabled) {
        drinksRow.innerHTML = `<td width='25%'>Drinks</td><td width='75%'>${document.getElementById('drinks').value + ' - Large'}</td>`
    } else {
        drinksRow.innerHTML = `<td width='25%'>Drinks</td><td width='75%'>${document.getElementById('drinks').value}</td>`;
    }

    if (customizationsEnabled) {
        var customizationsRow = document.createElement('tr');
        customizationsRow.innerHTML = `<td width='25%'>customizations</td><td width='75%'>${document.getElementById('customizations').value}</td>`;
    }

    var commentsRow = document.createElement('tr');
    commentsRow.innerHTML = `<td width='25%'>Comments</td><td width='75%'>${comments.value}</td>`;

    table.children[0].appendChild(firstNameRow);
    table.children[0].appendChild(lastNameRow);
    table.children[0].appendChild(emailIdRow);
    table.children[0].appendChild(phoneNumberRow);
    table.children[0].appendChild(streetAddress1Row);
    table.children[0].appendChild(streetAddress2Row);
    table.children[0].appendChild(cityRow);
    table.children[0].appendChild(stateRow);
    table.children[0].appendChild(zipcodeRow);
    table.children[0].appendChild(howDidYouHearRow);
    table.children[0].appendChild(drinksRow);

    if (customizationsEnabled) {
        table.children[0].appendChild(customizationsRow);
    }

    table.children[0].appendChild(commentsRow);
}

function handleTableButton() {

    var table = document.getElementById('myTable');
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    document.getElementById('tableDiv').style.display = 'none';
    form.style.display = 'block';
    form.reset();
    document.getElementById('customizationsDiv').style.display = 'none';
    document.getElementById('customizations').removeAttribute('required');
    customizationsEnabled = false;
    checkboxCounter = 0;
    checkBoxValues = [];
    document.getElementById('generatedDiv').style.display = 'none';
    window.location.reload();
}