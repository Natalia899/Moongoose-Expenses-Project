class ExpenseManager {
    
    addExpense() {
        let name = $("#name").val()
        let date = $("#date").val()
        let amount = $("#amount").val()
        let group = $("#group").val()
        let newExpense = { name, date, amount, group }
        return $.post('/expense', newExpense, (data) =>  data)
    }

    getAllExpenses() {
        return $.get('/expenses', (data) =>  data )
    }

    getExpensesByDates() {
        let date1 = $('#d1').val()
        let date2 = $('#d2').val()
        console.log(date1);
        console.log(date2);
        return $.get(`/expenses?d1=${date1}&d2=${date2}`, (data) =>  data)
    }

    getExpensesByGroup(){
        let group = $('#groupValidator').val()
        let total = $('#totalValidator').val()
        return $.get(`/expenses/${group}?total=${total}`, (data) => data)
    }
}

