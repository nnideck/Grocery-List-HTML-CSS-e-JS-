const inputItem = document.querySelector(".input-item");
const inputQnt = document.querySelector(".input_qnt");
const inputUnit = document.querySelector(".input_unit");
const templateItem = document.querySelector(".template-item");

const btnAddItem = document.querySelector(".btn-add-item");
const ItensList = document.querySelector(".itens-list");

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
  const value = `${inputQnt.value} ${inputUnit.value} de ${inputItem.value}`;
  console.log(value);
  if (value) {
    const newItemTask = templateItem.content.cloneNode(true);
    newItemTask.querySelector("span").textContent = value;
    //newItemTask.querySelector("li").addEventListener("click", check);
    // newItemTask.querySelector("button").addEventListener("click", remove);
    ItensList.insertBefore(newItemTask, ItensList.querySelector("li"));
    // inputTask.value = "";
  }
}

btnAddItem.addEventListener("click", addTask);
