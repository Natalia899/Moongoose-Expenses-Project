const render = new Renderer()
const expenseManager = new ExpenseManager()
//expenseManager.getAllExpenses().then(dbData =>  render.renderExpenses(dbData))

$('#get').on('click', function(){
 // const dbData =  
   expenseManager.getAllExpenses().then(dbData =>  render.renderExpenses(dbData))
})
$('#add').on('click', function(){
    expenseManager.addExpense().then(dbData =>  render.renderExpenses(dbData))
    // expenseManager.getAllExpenses()
})

$('#getByDate').on('click', function(){
    expenseManager.getExpensesByDates().then(validData => render.renderExpenses(validData))
})

// const get = async () => {
//     await expenseManager.getExpenses()
// }
// get()
// $("#get").on('click', function(){
//   render.renderExpenses()
// })



