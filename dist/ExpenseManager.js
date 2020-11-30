class ExpenseManager {
    constructor() {
        this.expenses = []
    }
    addExpense() {
        let name = $("#name").val()
        let date = $("#date").val()
        let amount = $("#amount").val()
        let group = $("#group").val()
        let newExpense = { name, date, amount, group }
        return $.post('/expense', newExpense, (data) =>  data)
    }

    getAllExpenses() {
        return $.get('/all_expenses', (data) =>  data )
    }
}

