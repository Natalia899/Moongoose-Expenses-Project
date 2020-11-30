const render = new Renderer()
const expenseManager = new ExpenseManager()


$('#get').on('click', function(){
   const dbData =  expenseManager.getAllExpenses().then(dbData =>  render.renderExpenses(dbData))
})
$('#add').on('click', function(){
    expenseManager.addExpense().then(dbData =>  render.renderExpenses(dbData))
    // expenseManager.getAllExpenses()
})

// const get = async () => {
//     await expenseManager.getExpenses()
// }
// get()
// $("#get").on('click', function(){
//   render.renderExpenses()
// })



