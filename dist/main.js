const render = new Renderer()
const expenseManager = new ExpenseManager()
expenseManager.getAllExpenses().then(dbData => render.renderExpenses(dbData))

$('#add').on('click', function () {
    expenseManager.addExpense().then(dbData => render.renderExpenses(dbData))

})

$('#getByDate').on('click', function () {
    expenseManager.getExpensesByDates().then(validData => render.renderExpenses(validData))
})

$('#getByGroup').on('click', function () {
    expenseManager.getExpensesByGroup().then(validData => render.renderExpenses(validData))
})

$('#getTotalByGroup').on('click', function () {
    expenseManager.getTotal().then(total => render.renderExpenses(total))
})