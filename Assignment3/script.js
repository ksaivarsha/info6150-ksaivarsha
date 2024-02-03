//Title constructor function that creates a Title object
function addNewRow() {
  var table = document.getElementById("myTable");
  var tbodyRef = document.getElementsByTagName("tbody")[0];
  var lastStudent = table.lastElementChild.lastElementChild?.firstElementChild?.nextElementSibling?.innerHTML || "Student 0";
  var lastIndex = lastStudent.split(" ")[1];

  var tdNode = document.createElement("tr");

  var concat = '<input type="checkbox" onclick="onCheckBoxClick(this)" />';
  concat += '<br />';
  concat += '<br />';
  concat += '<a href="javascript:void(0);" onclick="onImageClick(this)">';
  concat += '<img src="down.png" width="25px" />';
  concat += '</a>';

  var trCheckboxCell = document.createElement("td");
  trCheckboxCell.innerHTML = concat;

  var trStudentCell = document.createElement("td");
  trStudentCell.innerHTML = "Student " + (parseInt(lastIndex) + 1);

  var trAdvisorCell = document.createElement("td");
  trAdvisorCell.innerHTML = "Teacher " + (parseInt(lastIndex) + 1);

  var trAwardStatusCell = document.createElement("td");
  trAwardStatusCell.innerHTML = "Approved";

  var trSemesterCell = document.createElement("td");
  trSemesterCell.innerHTML = "Fall";

  var trTypeCell = document.createElement("td");
  trTypeCell.innerHTML = "TA";

  var trBudgetCell = document.createElement("td");
  trBudgetCell.innerHTML = "Budget " + (parseInt(lastIndex) + 1);

  var trPercentCell = document.createElement("td");
  trPercentCell.innerHTML = "100%";

  tdNode.appendChild(trCheckboxCell);
  tdNode.appendChild(trStudentCell);
  tdNode.appendChild(trAdvisorCell);
  tdNode.appendChild(trAwardStatusCell);
  tdNode.appendChild(trSemesterCell);
  tdNode.appendChild(trTypeCell);
  tdNode.appendChild(trBudgetCell);
  tdNode.appendChild(trPercentCell);

  tbodyRef.appendChild(tdNode);

  

  alert("Student " + (parseInt(lastIndex) + 1) + " added successfully");
}





function onImageClick(image) {
  var row = image.closest('tr'); // Get the closest parent row of the clicked image

  // Check if the next row is already added (visible)
  var nextRow = row.nextElementSibling;

  if (nextRow && nextRow.classList.contains("additional-row")) {
      // If the row is visible, hide it by removing the class
      nextRow.remove();
  } else {
      // If the row is not visible, create and append the additional row
      var additionalRow = createAdditionalRow(row.cells.length); // Pass the number of cells in the row
      row.parentNode.insertBefore(additionalRow, nextRow);
  }
}





function createAdditionalRow(cellCount) {
  // Create a new row with additional information
  var additionalRow = document.createElement("tr");
  additionalRow.classList.add("additional-row");

  // Create and append a cell with additional information
  var additionalCell = document.createElement("td");
  additionalCell.colSpan = cellCount; // Span the cells to cover the entire row

  var additionalContent = `
      <div>
         Advisor<br>
          <br>
          Award Details<br>
          Summer 1-2014(TA)<br>
          Budget Number: <br>
          Tuition Number: <br>
          Comments: <br>
          <br>
          Award Status:<br>
      </div>
  `;

  additionalCell.innerHTML = additionalContent;
  additionalRow.appendChild(additionalCell);

  return additionalRow;
}





//row.style.backgroundColor="white"
function onCheckBoxClick(checkbox) {
  var row = checkbox.parentNode.parentNode;

  // Check if the checkbox is checked
  if (checkbox.checked) {
    row.style.backgroundColor="yellow"      
          addColumn(row, "DELETE");      
          addColumn(row, "EDIT");
      
  } else {
    row.style.backgroundColor="white"
      // If the checkbox is unchecked, remove the delete and edit columns
      removeColumn(row, "DELETE");
      removeColumn(row, "EDIT");
  }

  // Check if there are no more checkboxes selected
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checkboxes.length === 0) {
    row.style.backgroundColor="white"
      // Remove the "DELETE" and "EDIT" headings and update submit button state
      removeHeading("DELETE");
      removeHeading("EDIT");
      updateSubmitButtonState();
  } else {
      // Update the submit button state
      updateSubmitButtonState();
  }
}





function addColumn(row, columnName) {
  var button = document.createElement("button");
  button.textContent = columnName;
  if (columnName === "DELETE") {
      button.onclick = function () {
          var deletedStudent = row.querySelector('td:nth-child(2)').innerHTML;
          row.remove();
          updateSubmitButtonState();
          alert(deletedStudent + " Record deleted successfully");
      };
  } else if (columnName === "EDIT") {
      button.onclick = function () {
          var studentName = row.querySelector('td:nth-child(2)').innerHTML;
          displayEditPopup(studentName);
      };
  }

  var cell = row.insertCell(-1);
  cell.appendChild(button);
  cell.classList.add(columnName.toLowerCase() + "-cell");

  // Add heading to the column
  addHeading(columnName);
}





// Function to remove a specific column by name
function removeColumn(row, columnName) {
  var cellIndex = Array.from(row.cells).findIndex(cell => cell.innerText === columnName);
  if (cellIndex !== -1) {
      row.deleteCell(cellIndex);
  }
}





// Function to add heading for a specific column
function addHeading(headingName) {
  var table = document.getElementById("myTable");
  var headerRow = table.rows[0];

  // Add the heading if it doesn't exist
  var heading = headerRow.querySelector("." + headingName.toLowerCase() + "-heading");
  if (!heading) {
      var lastCellIndex = headerRow.cells.length;
      heading = headerRow.insertCell(lastCellIndex);
      heading.innerHTML = "<b>" + headingName + "</b>";
      heading.classList.add(headingName.toLowerCase() + "-heading");
  }
}




// Function to remove a specific heading by name
function removeHeading(headingName) {
  var heading = document.querySelector("." + headingName.toLowerCase() + "-heading");
  if (heading) {
      heading.remove();
  }
}




// Function to display the edit popup
function displayEditPopup(studentName) {
  // Retrieve student details from the table
  var table = document.getElementById("myTable");
  var studentDetails = null;

  // Loop through each row (starting from index 1 to skip the header row)
  for (var i = 1; i < table.rows.length; i++) {
      var currentRow = table.rows[i];
      var currentStudentName = currentRow.cells[1].innerText; 

      // Check if the current row corresponds to the requested student
      if (currentStudentName === studentName) {
          // Extract student details from the row
          studentDetails = {
              student: currentRow.cells[1].innerText,
              advisor: currentRow.cells[2].innerText,
              awardStatus: currentRow.cells[3].innerText,
              semester: currentRow.cells[4].innerText,
              type: currentRow.cells[5].innerText,
              budget: currentRow.cells[6].innerText,
              percentage: currentRow.cells[7].innerText,
          };
          break;
      }
  }

  // Display the edit popup
  var editPopup = document.createElement("div");
  editPopup.className = "edit-popup";

  var title = document.createElement("h2");
  title.textContent = "Edit details of " + studentDetails.student;
  editPopup.appendChild(title);

  // Display student details in the popup
  for (var key in studentDetails) {
      if (studentDetails.hasOwnProperty(key)) {
          var detailItem = document.createElement("p");
          detailItem.textContent = key + ": " + studentDetails[key];
          editPopup.appendChild(detailItem);
      }
  }
  // Add "Update" and "Cancel" buttons
  var updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.onclick = function () {
      alert(studentDetails.student + " data updated successfully");
      closeEditPopup();
  };

  var cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.onclick = closeEditPopup;

  editPopup.appendChild(updateButton);
  editPopup.appendChild(cancelButton);

  // Append the edit popup to the body
  document.body.appendChild(editPopup);
}




function closeEditPopup() {
  // Close the edit popup
  var editPopup = document.querySelector(".edit-popup");
  if (editPopup) {
      editPopup.remove();
  }
}




function updateSubmitButtonState() {
  var submitButton = document.getElementById("button");
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

  if (checkedCheckboxes.length > 0) {
      submitButton.disabled = false;
      submitButton.style.backgroundColor = "orange";
  } else {
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "grey";
  }
}
