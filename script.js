const informationBox = document.getElementById("information-balance-box");
document.getElementById("add-income").addEventListener("click", addIncome);
document.getElementById("add-expense").addEventListener("click", addExpense);

const incomes = [];
const expenses = [];

function addIncome() {
  addItem("income");
}

function addExpense() {
  addItem("expense");
}

function addItem(type) {
  const name = document.getElementById(`${type}-name`).value;
  const amount = parseFloat(document.getElementById(`${type}-amount`).value);

  if (!name || !amount) {
    return;
  }

  if (type === "income" && amount < 0) {
    alert("Wpisz wartość dodatnią!")
    return;
  }

  const itemData = { name, value: amount.toFixed(2) };
  if (type === "income") {
    incomes.push(itemData);
  } else {
    expenses.push(itemData);
  }

  renderListItem(type, itemData);
  updateBalance();
}

function renderListItem(type, itemData) {
  let item = document.createElement("li");
  let span = document.createElement('span');
  span.textContent = `${itemData.name}: ${itemData.value} zł`;
  let createEditBtn = document.createElement('button');
  createEditBtn.textContent = "Edytuj";
  createEditBtn.classList.add('edit-btn');
  let createDeleteBtn = document.createElement('button');
  createDeleteBtn.textContent = "Usuń";
  createDeleteBtn.classList.add('delete-btn');
  item.appendChild(span);
  item.appendChild(createEditBtn);
  item.appendChild(createDeleteBtn);

  item
    .querySelector(".edit-btn")
    .addEventListener("click", () => editItem(item, type));
  item
    .querySelector(".delete-btn")
    .addEventListener("click", () => deleteItem(item, type));

  document.getElementById(`${type}-list`).appendChild(item);

  document.getElementById(`${type}-name`).value = "";
  document.getElementById(`${type}-amount`).value = "";
}

function editItem(item, type) {
  const currentAmount = parseFloat(
    item.firstChild.textContent.split(": ")[1].split(" ")[0]
  );
  const currentName = item.firstChild.textContent.split(": ")[0];

  const newName = prompt("Podaj nową nazwę:", currentName);
  const newAmount = parseFloat(prompt("Podaj nową kwotę:", currentAmount));

  if (newName && newAmount) {
    item.firstChild.textContent = `${newName}: ${newAmount.toFixed(2)} zł`;

    const itemId = Array.from(item.parentElement.children).indexOf(item);
    const itemData = { name: newName, value: newAmount.toFixed(2) };

    if (type === "income") {
      incomes[itemId] = itemData;
    } else {
      expenses[itemId] = itemData;
    }

    updateBalance();
  }
}

function deleteItem(item, type) {
  const itemId = Array.from(item.parentElement.children).indexOf(item);

  if (type === 'income') {
    incomes.splice(itemId, 1);
  } else {
    expenses.splice(itemId, 1);
  }

  item.remove();
  updateBalance();
}

function updateBalance() {
  const totalIncomes = incomes.reduce((total, current) => total + parseFloat(current.value), 0);
  const totalExpenses = expenses.reduce((total, current) => total + parseFloat(current.value), 0);

  document.getElementById("income-total").textContent = `Suma przychodów: ${totalIncomes.toFixed(2)} zł`;
  document.getElementById("expense-total").textContent = `Suma wydatków: ${totalExpenses.toFixed(2)} zł`;

  const topBalance = totalIncomes - totalExpenses;
  document.getElementById(
    "top-balance-message"
  ).textContent = `${topBalance.toFixed(2)} zł`;

  if (topBalance.toFixed(2) < 0) {
    informationBox.textContent = 'Bilans jest ujemny. Jesteś na minusie:';
  } else {
    informationBox.textContent = 'Możesz jeszcze wydać:';
  }
}