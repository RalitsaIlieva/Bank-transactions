function filterTable(filterValue) {
    const rows = document.querySelectorAll(
      ".table.table-striped tbody tr"
    );

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
  };

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
  };