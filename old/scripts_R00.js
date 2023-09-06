const inputItem = document.querySelector(".input-item");
const inputQnt = document.querySelector(".input_qnt");
const inputUnit = document.querySelector(".input_unit");
const templateItem = document.querySelector(".template-item");

const btnAddItem = document.querySelector(".btn-add-item");
const ItensList = document.querySelector(".itens-list");
const btnDelete = document.querySelector(".btn-delete");

/* function check() {
  const input = this.querySelector("input");
  console.log(input);
  if (input.checked) {
    this.classList.remove("list-group-item-light");
    this.classList.add("list-group-item-success");
  } else {
    this.classList.remove("list-group-item-success");
    this.classList.add("list-group-item-light");
  }
}
 */

function addTask() {
  const value = inputItem.value;
  console.log(value);
  if (value) {
    const newItemTask = templateItem.content.cloneNode(true);
    newItemTask.querySelector("span").innerHTML = `${inputQnt.value} ${
      inputUnit.value
    } of ${value.bold()}`;
    newItemTask.querySelector("button").addEventListener("click", deleteItem);
    ItensList.insertBefore(newItemTask, ItensList.querySelector("li"));
    inputItem.value = "";
    inputQnt.value = "";
    inputUnit.value = "unit";
  }
}

function deleteItem() {
  const item = document.querySelector(".list-item");
  item.remove();
}

btnAddItem.addEventListener("click", addTask);

btnDelete.addEventListener("click", deleteItem);
