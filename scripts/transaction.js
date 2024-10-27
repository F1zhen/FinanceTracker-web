document.addEventListener('DOMContentLoaded', () => {
    const addTransactionButton = document.getElementById('addTransactionButton');
    const transactionsTable = document.querySelector('.transactions_block tbody');
    const balanceDisplay = document.getElementById('balanceDisplay'); // Элемент для отображения баланса

    let transactions = [
        { type: 'income', category: 'Gym', amount: 50000, date: '2024-09-01' },
        { type: 'expense', category: 'Food', amount: 3000, date: '2024-09-02' },
        { type: 'income', category: 'Health', amount: 3000, date: '2024-09-02' }
    ];

    let balance = 55000;

    // Функция для рендеринга транзакций
    function renderTransactions() {
        transactionsTable.innerHTML = ''; 

        transactions.forEach((transaction, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.type}</td>
                <td>${transaction.category}</td>
                <td>${transaction.amount.toLocaleString()} ₸</td>
                <td>${transaction.date}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
                    <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Change</button>
                </td>
            `;
            transactionsTable.appendChild(row);
        });
        updateBalanceDisplay(); // Обновляем отображение баланса
    }



    // Функция для обновления отображения баланса
    function updateBalanceDisplay() {
        balanceDisplay.textContent = `Текущий баланс: ${balance.toLocaleString()} ₸`;
    }

    // Обработчик события для добавления транзакции
    addTransactionButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        if (type && category && !isNaN(amount) && amount > 0 && date) {
            const newTransaction = { type, category, amount, date };
            transactions.push(newTransaction);

            // Обновляем баланс
            if (type === 'income') {
                balance += amount; 
            } else {
                balance -= amount; 
            }

            renderTransactions();

            // Очищаем поля ввода
            document.getElementById('type').value = '';
            document.getElementById('category').value = '';
            document.getElementById('amount').value = '';
            document.getElementById('date').value = '';
        } else {
            alert('Пожалуйста, заполните все поля корректно.');
        }
    });

    // Обработчик события для удаления и изменения транзакции
    transactionsTable.addEventListener('click', function(event) {
        const index = event.target.dataset.index;

        if (event.target.classList.contains('delete-btn')) {
            const removedTransaction = transactions[index];
            transactions.splice(index, 1);
            // Обновляем баланс
            if (removedTransaction.type === "income") {
                balance -= removedTransaction.amount;
            } else {
                balance += removedTransaction.amount;
            }
            renderTransactions();
        }

        if (event.target.classList.contains('edit-btn')) {
            const transaction = transactions[index];
            document.getElementById('type').value = transaction.type;
            document.getElementById('category').value = transaction.category;
            document.getElementById('amount').value = transaction.amount;
            document.getElementById('date').value = transaction.date;

            // Удаляем старую транзакцию
            const oldTransaction = transactions.splice(index, 1)[0];

            // Обновляем баланс на основе старой транзакции
            if (oldTransaction.type === "income") {
                balance -= oldTransaction.amount;
            } else {
                balance += oldTransaction.amount;
            }

            // Не забывайте обновить отображение после редактирования
            updateBalanceDisplay();
        }
    });

    // Изначально отображаем транзакции и баланс
    renderTransactions();
});
