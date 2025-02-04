function filterTable(filterValue, transactions) {
  const rows = document.querySelectorAll(".table.table-striped tbody tr");

  let filteredTransactions = transactions;

  if (filterValue === "debit") {
    filteredTransactions = transactions.filter(transaction => transaction.type === "debit");
  } else if (filterValue === "credit") {
    filteredTransactions = transactions.filter(transaction => transaction.type === "credit");
  }

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    if (filterValue === "debit") {
      const hasClass = Array.from(cells).some((cell) =>
        cell.classList.contains("withdrawal")
      );
      if (hasClass) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    } else if (filterValue === "credit") {
      const hasClass = Array.from(cells).some((cell) =>
        cell.classList.contains("deposit")
      );
      if (hasClass) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    } else {
      row.style.display = "";
    }
  });

  return filteredTransactions;
}

function filterTableByDate(selectedDate) {
  const rows = document.querySelectorAll(".table.table-striped tbody tr");
  
  Array.from(rows).forEach((row) => {
    const dateCell = row.cells[0];
    const rowDate = dateCell.textContent;

    if (rowDate === selectedDate) {
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
