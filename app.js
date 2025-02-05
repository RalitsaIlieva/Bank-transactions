function filterTable(filterTypeValue, filterDateValue) {
  const rows = document.querySelectorAll(".table.table-striped tbody tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const dateCell = row.cells[0]; 
    const rowDate = dateCell.textContent.trim();

    const isDebit = Array.from(cells).some((cell) =>
      cell.classList.contains("withdrawal")
    );
    const isCredit = Array.from(cells).some((cell) =>
      cell.classList.contains("deposit")
    );

    const matchesType =
      (filterTypeValue === "debit" && isDebit) ||
      (filterTypeValue === "credit" && isCredit) ||
      filterTypeValue === ""; 

    const matchesDate =
      filterDateValue === "" || rowDate === filterDateValue; 

    if (matchesType && matchesDate) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function toggleNavigationButtons(index) {
  const prevDiv = document.querySelector(".arrow-left");
  const nextDiv = document.querySelector(".arrow-right");

  if (index === 0) {
    nextDiv.style.display = "none";
    prevDiv.style.display = "block";
  } else {
    nextDiv.style.display = "block";
    prevDiv.style.display = "none";
  }
}

function togglePagesButtons(index, accounts, rowsPerPage, currentPage) {
  const account = accounts[index];

  const totalPages = Math.ceil(account.transactions.length / rowsPerPage);

  const prevButton = document.querySelector(".pagination .prev");
  const nextButton = document.querySelector(".pagination .next");

  if (currentPage === 1) {
    prevButton.disabled = true;
  }

  if (account.transactions.length === rowsPerPage) {
    nextButton.style.display = "none";
    prevButton.style.display = "none";
  } else if (currentPage === totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}
