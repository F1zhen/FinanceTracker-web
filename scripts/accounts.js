const accounts = {
    "Main Account": 50000,
    "Deposit": 15000
};

// Функция для обновления отображения балансов на странице
function updateBalances() {
    document.getElementById("main-account-balance").innerText = `${accounts["Main Account"]} ₸`;
    document.getElementById("deposit-account-balance").innerText = `${accounts["Deposit"]} ₸`;
}

// Функция для обработки перевода
document.getElementById("transfer-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Останавливаем отправку формы

    // Получаем значения полей формы
    const fromAccount = document.getElementById("from-account").value;
    const toAccount = document.getElementById("to-account").value;
    const amount = parseFloat(document.getElementById("amount").value);


    if (fromAccount === toAccount) {
        alert("From and To accounts must be different.");
    } 
    else if (amount <= 0) {
        alert("Please enter a valid transfer amount.");
    } 
    else if (amount > accounts[fromAccount]) {
        alert("Insufficient funds in the selected account.");
    } 
 
    else {
      
        accounts[fromAccount] -= amount;
        accounts[toAccount] += amount;

        // Обновляем отображение балансов
        updateBalances();

        alert("Transfer successful!");
    }
});

// Инициализация отображения балансов при загрузке страницы
updateBalances();