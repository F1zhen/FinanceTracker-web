document.addEventListener("DOMContentLoaded", function () {
    const debtForm = document.querySelector("form");
    const debtListTable = document.querySelector("table tbody");

    const totalOweElement = document.querySelector(".total_sum h1:first-of-type");
    const totalOwedElement = document.querySelector(".total_sum h1:last-of-type");

    let totalOwe = 0; // Инициализируем начальные значения
    let totalOwed = 0;

    function updateTotals() {
        totalOweElement.textContent = `Total I owe - ${totalOwe} ₸`;
        totalOwedElement.textContent = `Total owed to me - ${totalOwed} ₸`;
    }

    function createDeleteButton(row, amount, type) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-danger btn-sm me-2";
        deleteButton.addEventListener("click", function () {
            row.remove();
            if (type === "owe") {
                totalOwe -= amount;
            } else {
                totalOwed -= amount;
            }
            updateTotals();
        });
        return deleteButton;
    }

    function createEditButton(row, amount, type) {
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "btn btn-warning btn-sm";
        editButton.addEventListener("click", function () {
            const nameCell = row.cells[0];
            const amountCell = row.cells[1];
            const typeCell = row.cells[2];

            // Prompt user to edit values
            const newName = prompt("Enter new name:", nameCell.textContent);
            const newAmount = parseFloat(prompt("Enter new amount:", amountCell.textContent.replace(" ₸", "")));
            const newType = prompt("Enter new type (owe/owed):", type === "owe" ? "I owe" : "Owed to me");

            if (!isNaN(newAmount) && newAmount > 0) {
                nameCell.textContent = newName;
                amountCell.textContent = `${newAmount} ₸`;
                typeCell.textContent = newType === "owe" ? "I owe" : "Owed to me";
                typeCell.className = newType === "owe" ? "text-danger" : "text-success";

                // Adjust totals
                if (type === "owe") totalOwe -= amount;
                else totalOwed -= amount;

                if (newType === "owe") totalOwe += newAmount;
                else totalOwed += newAmount;

                updateTotals();
            } else {
                alert("Please enter a valid amount.");
            }
        });
        return editButton;
    }

    // Initialize delete and edit buttons for existing rows
    document.querySelectorAll("table tbody tr").forEach(row => {
        const amountText = row.cells[1].textContent;
        const typeText = row.cells[2].textContent;
        const amount = parseFloat(amountText.replace("₸", "").trim());

        const actionCell = document.createElement("td");
        const deleteButton = createDeleteButton(row, amount, typeText === "I owe" ? "owe" : "owed");
        const editButton = createEditButton(row, amount, typeText === "I owe" ? "owe" : "owed");

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
    });

    debtForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("debt-name").value;
        const amount = parseFloat(document.getElementById("debt-amount").value);
        const debtType = document.getElementById("debt-type").value;

        if (isNaN(amount) || amount <= 0) {
            alert("Пожалуйста, введите корректную сумму.");
            return;
        }

        const newRow = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        const amountCell = document.createElement("td");
        amountCell.textContent = `${amount} ₸`;

        const typeCell = document.createElement("td");
        typeCell.textContent = debtType === "owe" ? "I owe" : "Owed to me";
        typeCell.className = debtType === "owe" ? "text-danger" : "text-success";

        const actionCell = document.createElement("td");
        const deleteButton = createDeleteButton(newRow, amount, debtType);
        const editButton = createEditButton(newRow, amount, debtType);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        newRow.appendChild(nameCell);
        newRow.appendChild(amountCell);
        newRow.appendChild(typeCell);
        newRow.appendChild(actionCell);

        debtListTable.appendChild(newRow);

        if (debtType === "owe") {
            totalOwe += amount;
        } else {
            totalOwed += amount;
        }

        updateTotals();
        debtForm.reset();
    });

    updateTotals();
});
