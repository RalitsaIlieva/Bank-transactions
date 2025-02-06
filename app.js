// The function that handles row visibility based on filters
const filterTable = (filterTypeValue, filterDateValue) => {
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

    const matchesDate = filterDateValue === "" || rowDate === filterDateValue;

    if (matchesType && matchesDate) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// The function that handles the visibility of the buttons that change accounts
const toggleNavigationButtons = (index) => {
  const prevDiv = document.querySelector(".arrow-left");
  const nextDiv = document.querySelector(".arrow-right");
  const iconPrevButton = document.querySelector(".bi-chevron-left");
  const iconNextButton = document.querySelector(".bi-chevron-right")

  if (index === 0) {
    prevDiv.classList.remove("inactive");
    nextDiv.classList.add("inactive");

    iconPrevButton.classList.remove("inactive-arrow");
    iconNextButton.classList.add("inactive-arrow");

  } else if (index === 1) {
    prevDiv.classList.add("inactive");
    nextDiv.classList.remove("inactive");

    iconNextButton.classList.remove("inactive-arrow");
    iconPrevButton.classList.add("inactive-arrow");
  } else {
    prevDiv.classList.remove("inactive");
    nextDiv.classList.remove("inactive");
    iconPrevButton.classList.remove("inactive-arrow");
    iconNextButton.classList.remove("inactive-arrow");
  }
}

// Attach event listeners to the cloned filter controls
const attachEventListenersToClonedFilters = (filterControlsClone) => {
  const filterByType = filterControlsClone.querySelector("#type-filter");
  const filterByDate = filterControlsClone.querySelector("#date-filter");

  filterByType.addEventListener("input", () => {
    const filterTypeValue = filterByType.value.trim().toLowerCase();
    const filterDateValue = filterByDate.value.trim();
    filterTable(filterTypeValue, filterDateValue);
  });

  filterByDate.addEventListener("input", () => {
    const filterTypeValue = filterByType.value.trim().toLowerCase();
    const filterDateValue = filterByDate.value.trim();
    filterTable(filterTypeValue, filterDateValue);
  });
};

// Function to handle the display of account data
const displayAccountData = (accounts, currentAccountIndex, filterControls) => {
  const accountsContainer = document.getElementById("accounts-container");
  accountsContainer.innerHTML = ""; // Clear previous data

  const account = accounts[currentAccountIndex];
  const accountDiv = document.createElement("div");
  accountDiv.classList.add("account");

  const panelHeader = document.createElement("div");
  panelHeader.classList.add("panel-header");

  if (account.banner) {
    const bannerImg = document.createElement("img");
    bannerImg.src = account.banner;
    bannerImg.alt = `${account.accountName} Banner`;
    panelHeader.appendChild(bannerImg);
  }

  const accountNameHeading = document.createElement("h2");
  accountNameHeading.textContent = account.accountName;
  panelHeader.appendChild(accountNameHeading);

  accountDiv.appendChild(panelHeader);

  // Create the table for transaction data
  const table = createTransactionTable(account.transactions);
  accountDiv.appendChild(table);

  accountsContainer.appendChild(accountDiv);

  const newDiv = document.createElement("div");
  newDiv.classList.add("new-container");
  const tableHeading = document.createElement("h5");
  tableHeading.textContent = "Transaction history";
  const filterControlsClone = filterControls.cloneNode(true);
  filterControlsClone.style.display = "block";
  newDiv.appendChild(tableHeading);
  newDiv.appendChild(filterControlsClone);
  newDiv.appendChild(table);
  accountsContainer.appendChild(newDiv);

  attachEventListenersToClonedFilters(filterControlsClone);

  toggleNavigationButtons(currentAccountIndex);
}

// Function that creates the transaction table
const createTransactionTable = (transactions) => {
  const table = document.createElement("table");
  table.classList.add("table", "table-striped");

  const thead = document.createElement("thead");
  const headerRow = thead.insertRow();
  ["Date", "Amount", "Details"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  transactions.forEach((transaction) => {
    const row = tbody.insertRow();
    const dateCell = row.insertCell();
    const amountCell = row.insertCell();
    const detailsCell = row.insertCell();

    dateCell.textContent = transaction.date;
    amountCell.textContent = transaction.amount.toFixed(2);
    detailsCell.textContent = transaction.details;

    amountCell.classList.add("amount");

    if (transaction.type === "debit") {
      amountCell.classList.add("withdrawal");
    } else if (transaction.type === "credit") {
      amountCell.classList.add("deposit");
    }
  });

  table.appendChild(tbody);
  return table;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("transactions.json")
    .then((response) => response.json())
    .then((accounts) => {
      const accountsContainer = document.getElementById("accounts-container");

      const filterControls = document.querySelector(".filter-controls");
      filterControls.parentNode.removeChild(filterControls);
      let currentAccountIndex = 0;

      const prevDiv = document.createElement("div");
      prevDiv.classList.add("arrow-left");
      const prevButton = document.createElement("button");
      prevButton.classList.add("btn", "btn-arrow", "left");
      prevDiv.appendChild(prevButton);
      const iconPrevButton = document.createElement("i");
      iconPrevButton.classList.add("bi", "bi-chevron-left");
      prevButton.appendChild(iconPrevButton);
      prevDiv.addEventListener("click", () => {
        currentAccountIndex =
          (currentAccountIndex - 1 + accounts.length) % accounts.length;
        displayAccountData(accounts, currentAccountIndex, filterControls);
      });

      accountsContainer.parentNode.insertBefore(prevDiv, accountsContainer);

      const nextDiv = document.createElement("div");
      nextDiv.classList.add("arrow-right");
      const nextButton = document.createElement("button");
      nextButton.classList.add("btn", "btn-arrow", "right");
      nextDiv.appendChild(nextButton);
      const iconNextButton = document.createElement("i");
      iconNextButton.classList.add("bi", "bi-chevron-right");
      nextButton.appendChild(iconNextButton);
      nextDiv.addEventListener("click", () => {
        currentAccountIndex = (currentAccountIndex + 1) % accounts.length;
        displayAccountData(accounts, currentAccountIndex, filterControls);
      });
      accountsContainer.parentNode.insertBefore(
        nextDiv,
        accountsContainer.nextSibling
      );
      // Initial account display
      displayAccountData(accounts, currentAccountIndex, filterControls);
    });
});


