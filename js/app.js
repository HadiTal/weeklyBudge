//class

class Budget {
    constructor(budget) {

        this.budget = budget;

        this.budgetLeft = this.budget;

    }

    calcBudget(amount) {

        return this.budgetLeft -= amount
    }
}

//class =This class is for HTML
class HTMLUI {
    insertBudget(amount) {
        budgetTotal.textContent = amount;
        budgetLeft.textContent = amount;
    }

    printMessage(message, classBootsrapt) {

        const div = document.createElement('div');

        const primary = document.querySelector('.primary');

        div.classList.add('alert', 'text-center', classBootsrapt);

        primary.insertBefore(div, addExpenseFrom);

        div.appendChild(document.createTextNode(message));


        //Hide display message after 3 seconds
        setTimeout(() => {

            document.querySelector('.alert').remove();

        }, 3000);

        addExpenseFrom.reset()

    }

    insertExpense(expense, mount) {

        const expenses = document.querySelector('#expenses ul');

        const li = document.createElement('li');

        li.classList.add('list-group-item', 'justify-content-between', 'align-items-center', 'd-flex')

        li.innerHTML = `${expense} <span class="badge badge-primary badge-pill">${mount}</span> `;

        expenses.appendChild(li);

    }

    //Display remaining user budget
    displayBudget(amount) {

        console.log(amount);


        let budgetLeftTomans = budget.calcBudget(amount);

        budgetLeft.textContent = budgetLeftTomans

        //If we divide the budget by 4 and the result was more than
        // the budget, more than 25% of the budget has been spent
        if ((budget.budget / 4) > budgetLeftTomans) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
            //If we divide the budget by 4 and the result was more than
            // the budget, more than 50% of the budget has been spent
        } else if ((budget.budget / 2) > budgetLeftTomans) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }

}

//varaible
let usearBudget;

const budgetTotal = document.querySelector("span#total");
const budgetLeft = document.querySelector("span#left");
const addExpenseFrom = document.getElementById("add-expense");
let budget;

console.log(budget);

const html = new HTMLUI();

//eventListner
eventListner();

function eventListner() {
    document.addEventListener("DOMContentLoaded", function() {
        //We receive the budget from the user via prompt
        usearBudget = window.prompt("لطفا بودجه هفته خود را وارد کنید");

        if (usearBudget === null || usearBudget === "" || usearBudget === 0) {
            window.location.reload();
        } else {
            //Send user budget to Budget class
            budget = new Budget(usearBudget);

            console.log(budget);

            //Submit funding to a function within HTMLUI
            html.insertBudget(budget.budget);
        }
    });

    // Add costs when sumit is clicked
    addExpenseFrom.addEventListener("submit", function(event) {
        event.preventDefault();

        const expense = document.getElementById("expense").value;
        const mount = document.getElementById("amount").value;

        if (
            expense !== "" &&
            mount !== "" &&
            !expense.match(/^[-+]?[0-9]+$/) &&
            mount.match(/^[-+]?[0-9]+$/)
        ) {
            //Enter the cost name and cost price to add the cost list
            html.insertExpense(expense, mount);

            //Show the remaining budget
            html.displayBudget(mount)

        } else {

            html.printMessage('فیلد ها را صحیح وارد کنید', 'alert-danger');
        }
    });
}