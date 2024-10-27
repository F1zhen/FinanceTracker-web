document.addEventListener('DOMContentLoaded', function() {
    function validateForm() {
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;

      
        let isValid = true;
        let errorMessage = '';

   
        if (type === '') {
            errorMessage += 'Please select a transaction type.\n';
            isValid = false;
        }

    
        if (category === '' || /\d/.test(category)) {
            errorMessage += 'Category is empty, or have a number\n';
            isValid = false;
        }

     
        if (amount === '' || isNaN(amount) || amount <= 0) {
            errorMessage += 'Please enter a valid amount (positive number).\n';
            isValid = false;
        }

     
        if (date === '') {
            errorMessage += 'Please enter a valid date.\n';
            isValid = false;
        }

    
        if (!isValid) {
            alert(errorMessage);
        }

        return isValid; 
    }

    
    document.getElementById('addTransactionButton').addEventListener('click', function(event) {
        if (!validateForm()) {
            event.preventDefault(); 
        }
    });
});