//*já crio as variáveis com todos os itens "fixos" JÁ EXISTENTES que utilizarei
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
// 6 - adaptar a função check para salvar as tarefas com check - OK
// 7 - adaptar a função delete para retornar as tarefas não deletadas - OK

//* 1 - criar lista vazia para salvar os objects (itens criados)
let savedList = [];

//* 2 - função para transformar todas as modificações feitas nos objetos em strings e salvar no localHost
function saveItem(listItens) {
  //!pq if? toda vez que invoco a função ela de fato tem um novo item..
  //! apenas garantir a existência de um item.. Pois pode ser que eu execute ela vazia (por algum erro) e zere a lista
  //* SE tenho valor inputado, executo a função
  if (listItens) {
    //* crio uma variável para guardar as informações em forma de string e jogo no JSON o valor que recebi
    const savedItens = JSON.stringify(listItens);
    //*com a função de setItem eu salvo no localstorage informando (nome do 'documento salvo', o conteudo que ele recebe)
    localStorage.setItem("List", savedItens);
  }
}

//* 3 - função para dar load no documento salvo no navegador - o transformando de volta em array/objects
function loadItens() {
  //*crio uma variavel para receber meu conteúdo salvo 'getItem' e referencio no nome o meu documento
  const loadedItens = localStorage.getItem("List");
  //*crio uma variável transformando o conteúdo recebido em array novamente
  const itens = JSON.parse(loadedItens);
  //*o resultado é retornar a lista já como array, para ser lida pelo navegador nas funções seguintes
  return itens;
}

//* 4- função informando ao navegador o que ele deve fazer com as informações retornadas do load
function setItens() {
  //*variável que executa a função de load e recebe, como return, o array salvo
  const loadedItensList = loadItens();
  //* SE tenho algo que veio do load..
  if (loadedItensList) {
    //* 1- informo que a lista de itens recebe o conteúdo completo da lista que foi carregada
    savedList = loadedItensList;
    //* 2- crio um loop dizendo que para cada item (obj, neste caso) do meu array recebido executo nele a função de addTask
    loadedItensList.forEach(function (item) {
      //*o que addTask recebe é cada item (obj) do array
      addTask(item);
    });
  }
}
//* chamo a função de setItens (composta também pela loadItens), executando assim que o código é lido
setItens();

//* 5 - função executada pelo botão que adiciona tarefa. Aqui recebo a informação inputada pelo usuário e disparo para dois lados: criar objeto para salvar no localstorage e criar item na lista de itens (visual)
//* Todo este conteúdo é executado toda vez que clico no botão
function handleAddItem() {
  //* crio constante para guardar o conteúdo que foi inputado no campo de texto (inputItem)
  const value = inputItem.value;
  //* crio constante para guardar o conteúdo que foi inputado no campo de quantidade (inputQnt)
  const qntValue = inputQnt.value;
  //* crio constante para guardar o conteúdo que foi inputado no campo de unidade (inputUnit)
  const unitValue = inputUnit.value;
  //* SE algo foi inputado no campo de texto - SE a constante value existe..
  if (value) {
    //* crio uma constante que vai receber um novo id a cada vez que é a função é executada. O novo id recebe um valor random - aqui multiplicado por 10000 apenas para perder a vírgula
    const newId = Math.random() * 10000;
    //* constante criando um objeto toda vez que a função é executada (usuário inputa algum item)
    const item = {
      //*obj com o texto do item - composto por quantidade + unidade + item (variaveis resgatadas)
      text: `${qntValue} ${unitValue} of ${value}`,
      //* id que recebe a variável criada acima, com random
      //! posso jogar a função do random direto aqui? PODE
      id: newId,
      //* propriedade referente ao checkbox. Sempre iniciado como false, já que um item não começa já "checked". Aqui é onde guardamos "por escrito" o status do checked - que será lido em outra função
      checked: false,
    };
    //*1 - após criar tudo que preciso com a informação do usuario, jogo este novo item criado para a lista principal
    savedList.push(item);
    //*salvo a lista principal (transformo em string e jogo no localstorage)
    saveItem(savedList);
    //* 2 - o item criado como obj é tbm destinado à função addTask
    addTask(item);
    //* aqui, após clicar no botão, espera-se que os campos de valor zerem
    inputItem.value = "";
    inputQnt.value = "";
    inputUnit.value = "unit";
  }
}

//* 6 - função para que o navegador receba o item criado ao apertar o botão (handle) e o renderize como um item da lista, com todas as propriedades
//* E TAMBÉM para que receba a lista de itens salva e os transforme novamente em visual. Para cada obj da lista ela é executada
function addTask(newItem) {
  //* 1 - crio uma variável 'genérica' que recebe um clone do meu template criado no HTML. O 'true' é padrão.
  //*criando um cloneNode, de todo o conteudo (content) do item que localizei em uma varíavel lá em cima. O template é um item <li> completo
  const newListItem = templateItem.content.cloneNode(true);
  //* do meu clone, localizo a tag span (que sei que existe no HTML) e defino que ela recebe o texto: propriedade text (.text) do item que acabou de ser criado no handle e recebido na função
  newListItem.querySelector("span").innerHTML = newItem.text;
  //* crio uma varíavel para localizar a tag input (pois sei que vou precisar dela) dentro do clone
  const input = newListItem.querySelector("input");
  //* crio uma varíavel para localizar a tag li (pois sei que vou precisar dela) dentro do clone
  const li = newListItem.querySelector("li");
  //* 2 - defino que a tag li acabou de receber um atributo ID, cujo conteúdo indico que e o mesmo do id do item que acabou de ser recebido
  //*isso garante que o item 'visual' da lista criada terá uma correspondência exata (id) com o item que foi salvo no documento do localhost. Para quando eu modificar o item da lista visual eu conseguir também atualizar as informações salvas
  //!é isso? SIM
  li.setAttribute("id", newItem.id);
  //* 3 - localizo o botão do delete no clone criado e defino que a intervenção de click startará a função de deletar o item. Este pode ser feito direto no template no HTML também
  newListItem.querySelector("button").addEventListener("click", deleteItem);
  //* 4 - dou a ordem para quem minha ul (variavel itenslist localizada lá em cima) receba meu clone, já com todo o conteúdo 'customizado' que fiz acima (texto e id);
  ItensList.appendChild(newListItem);

  //* 5 - a função é executada em dois momentos, no handle e no recebimento da lista salva. No handle, já está definido que meu checked é falso - então não preciso garantir essa "leitura"
  //* porém se o checked está como 'true' na lista salva, preciso garantir que o navegador o entenda como um item 'verdinho', previamente checked pelo usuario.
  if (newItem.checked == true) {
    //*se a propriedade do meu item recebido é true, jogo esta informação como atributo do meu input, para garantir que ele renderize checked
    //* (nome do atributo, conteúdo do atributo)
    input.setAttribute("checked", true);
  }
  //! PQ QNDO COLOCO O ELSE DÁ ERRO? Pq o atributo "checked", só pelo fato de existir, já é considerado como true. Não importa se há texto 'false' ou qualquer outro..
  //! sempre que ele existir, será considerado true
  /* else {
    input.setAttribute("checked", "false");
  } */
  //* 6 - por fim, defino que o meu input, toda vez que clicado, invocará a função check. Isso posso fazer no HTML também
  input.addEventListener("click", check);
}

//* 7 - função a ser invocada quando o usuario aperta no botão de delete
function deleteItem() {
  //* guardo numa variável o item inteiro em questão (<li>) - pois sei que ele deverá ser deletado também por inteiro
  //* o localizo através de uma classe que defini no template do html
  const item = document.querySelector(".list-item");
  //* guardo numa variável o id desta <li>, para garantir a correspondência com a lista salva (de onde ele será retirado)
  const id = item.id;
  //* 1 - para que ele seja deletado da lista salva, faço um loop (filter) inteirando todos os itens da lista e
  //* para cada um deles executando a função: item que tiver o id diferente do id do item em questão (deletado) será retornado pela função.
  //*logo no começo indico que a minha lista salva (savedList) está recebendo todos os retornos deste filtro. Ou seja, todos os itens com id's diferentes do deletado, garantindo que ele fique de fora.
  savedList = savedList.filter(function (eachItem) {
    return eachItem.id != id;
  });
  //* 2 -invoco a função de salvar a lista recém filtrada (transforma em string e salva)
  saveItem(savedList);
  //* 3 -removo o meu item <li> inteiro
  item.remove();
}

//* 8 - função a ser invocada quando o usuario clica no checkbox do item.
//* a configuração de verdinho e riscado já está configurada no CSS, porém toda vez que o usuário dá um check, preciso também garantir salvar esta informação na lista do localhost
function check() {
  //* sei que a correspondencia que preciso entre item visual e da lista salva é o id, localizado no <li> do item. Como esta é uma função linkada ao input (filha de um li), preciso subir até encontrar a minha <li> pai
  //* salvo ele numa variável
  const item = this.parentNode.parentNode.parentNode;
  //* agora sim, jogo numa variável o id que localizei o li
  const id = item.id;
  //* 1- SE o atributo checked deste input (this) é igual a true (usuário acbou de dar checked)
  if (this.checked == true) {
    //* faço um loop na lista salva, inteirando todos os itens, encontrando seu id correspondente
    savedList.forEach(function (eachItem) {
      if (eachItem.id == id) {
        //* quando localizado, indico que a propriedade checked deste obj agora recebe o valor true
        eachItem.checked = true;
      }
    });
    //*  2 - SE NÃO - ou seja, se o click no checkbox não foi para dar um checked e sim para tirar o checked (contrario o true acima)
  } else {
    //* faço um loop na lista salva, inteirando todos os itens, encontrando seu id correspondente
    savedList.forEach(function (eachItem) {
      if (eachItem.id == id) {
        //* quando localizado, indico que a propriedade checked deste obj agora recebe o valor false
        eachItem.checked = false;
      }
    });
  }
  //* 3 -invoco a função de salvar a lista recém atualizada (transforma em string e salva)
  saveItem(savedList);
}

//* defino que meu botão de add, toda vez que clicado, invoca a função handleAddItem.
//* está no final apenas para garantir a leitura completa da função antes da sua execução
btnAddItem.addEventListener("click", handleAddItem);
