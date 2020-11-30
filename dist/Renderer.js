class Renderer{
    renderExpenses(data){
      const source = $('#expenses-template').html()
      const template = Handlebars.compile(source)
      const expense = template({data})
      $('.expenses-container').empty().append(expense )
    }
    renderAdd(newExpense){
        const source = $('#newExpense-template').html()
        const template = Handlebars.compile(source)
        const expense = template({newExpense})
        $('.newExpense-container').empty().append(expense )   
    }
}