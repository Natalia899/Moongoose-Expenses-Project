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
        return $.get(`/expenses?d1=${date1}&d2=${date2}`, (data) =>  data)
    }

    getExpensesByGroup(){
        let group = $('#groupValidator').val()
        console.log(group);
        return $.get(`/expenses/${group}`, (data) => data)
    }

    getTotal(){
        let group = $('#groupValidator').val()
        let total = true
        return $.get(`/expenses/${group}?total=${total}`, (data) => data)  
    }
}

