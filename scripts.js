const inputItem = document.querySelector(".input-item");
const inputQnt = document.querySelector(".input_qnt");
const inputUnit = document.querySelector(".input_unit");
const templateItem = document.querySelector(".template-item");

const btnAddItem = document.querySelector(".btn-add-item");
const ItensList = document.querySelector(".itens-list");
const btnDelete = document.querySelector(".btn-delete");

// 1 - lista para salvar tasks - OK
// 2 - criar função para salvar tasks - STRING - OK
// 3 - criar função para logar tasks - OK
// 4 - criar função para handle task - OK
// CRIAR FUNÇÃO PARA CARREGAR AS TASKS SALVAS - OK
// 5 - adaptar função addtask para receber tbm as tarefas salvas - OK
// 6 - adaptar a função check para salvar as tarefas com check
// 7 - adaptar a função delete para retornar as tarefas não deletadas - OK

let savedList = [];

function saveItem(newItem) {
  //pq if? toda vez que invoco a função ela de fato tem um novo item..
  if (newItem) {
    const savedItens = JSON.stringify(newItem);
    localStorage.setItem("List", savedItens);
  }
}

function loadItens() {
  const loadedItens = localStorage.getItem("List");
  const itens = JSON.parse(loadedItens);
  return itens;
}

function setItens() {
  const loadedItensList = loadItens();
  if (loadedItensList) {
    savedList = loadedItensList;
    loadedItensList.forEach(function (item) {
      addTask(item);
    });
  }
}
setItens();

function handleAddItem() {
  const value = inputItem.value;
  const qntValue = inputQnt.value;
  const unitValue = inputUnit.value;
  if (value) {
    const newId = Math.random() * 10000;
    const item = {
      text: `${qntValue} ${unitValue} of ${value}`,
      id: newId,
      checked: false,
    };
    savedList.push(item);
    saveItem(savedList);
    addTask(item);
    console.log("criar", savedList);
    inputItem.value = "";
    inputQnt.value = "";
    inputUnit.value = "unit";
  }
}

function addTask(newItem) {
  const newListItem = templateItem.content.cloneNode(true);
  newListItem.querySelector("span").innerHTML = newItem.text;
  //pq as tres linhas abaixo?
  const input = newListItem.querySelector("input");
  const li = newListItem.querySelector("li");
  li.setAttribute("id", newItem.id);

  newListItem.querySelector("button").addEventListener("click", deleteItem);
  ItensList.appendChild(newListItem);
  console.log(newItem.checked);
  if (newItem.checked == true) {
    input.setAttribute("checked", "true");
  }
  // PQ QNDO COLOCO O ELSE DÁ ERRO?
  /* else {
    input.setAttribute("checked", "false");
  } */
  input.addEventListener("click", check);
}

function deleteItem() {
  const item = document.querySelector(".list-item");
  const id = item.id;
  savedList = savedList.filter(function (eachItem) {
    return eachItem.id != id;
  });
  saveItem(savedList);
  item.remove();
}

function check() {
  //const input = this.querySelector("input");
  const item = this.parentNode.parentNode.parentNode;
  //document.querySelector(".list-item");
  const id = item.id;
  if (this.checked == true) {
    savedList.forEach(function (eachItem) {
      if (eachItem.id == id) {
        eachItem.checked = true;
      }
    });
    //ñ entendi a necessidade do else
  } else {
    savedList.forEach(function (eachItem) {
      if (eachItem.id == id) {
        eachItem.checked = false;
      }
    });
  }
  saveItem(savedList);
}

btnAddItem.addEventListener("click", handleAddItem);
