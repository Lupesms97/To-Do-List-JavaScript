
var lista_tasks = [];
var task = {};


var banco_de_dados = (function () {

    return {
        buscar_tasks: function () {
            var storedTasks = localStorage.getItem("lista-tasks");
            if (storedTasks) {
                lista_tasks = JSON.parse(storedTasks);
            }
            return lista_tasks;

        },
        enviar_task: function () {
            lista_tasks.push(task);
            listaJSON = JSON.stringify(lista_tasks);
            localStorage.setItem("lista-tasks", listaJSON);

        },
        apagar_task: function (index) {
            let task = this.buscar_tasks();
            task.splice(index, 1);
            localStorage.setItem("lista-tasks", JSON.stringify(lista_tasks));

        },
        editar_task: function (index, task) {
            lista_tasks[index] = task;
            localStorage.setItem("lista-tasks", JSON.stringify(lista_tasks));
        },
        mostrar_task: function(){

        }
    };
})();

function diferencaEmDias() {
    
    var inputData = document.getElementById("prazo");
  
    
    var data = inputData.value;
  
    
    var dataPrazo = new Date(data);
  
  
    var dataAtual = new Date();
  
    
    var diferenca = dataPrazo - dataAtual;
  

    var dias = Math.floor(diferenca / 1000 / 60 / 60 / 24);
  
   
    return dias;
  }

function DisplayTasks() {
    let tasks = banco_de_dados.buscar_tasks();
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = '';
    

    for (let i = 0; i < tasks.length; i++) {
        var taskIndex = tasks[i].id;
        let tr = tbody.insertRow();

        let td_id = tr.insertCell();
        let td_titulo = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_prazo = tr.insertCell();
        let td_prioridade = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_id.innerText = tasks[i].id;
        td_titulo.innerText = tasks[i].titulo;
        td_descricao.innerText = tasks[i].descricao;
        td_prazo.innerText = tasks[i].prazo
        td_prioridade.innerText = tasks[i].prioridade;

        td_id.classList.add('center');
        
        tr.appendChild(td_id);
        tr.appendChild(td_titulo);
        tr.appendChild(td_descricao);
        tr.appendChild(td_prazo);
        tr.appendChild(td_prioridade);
        tr.appendChild(td_acoes);
    
        tbody.appendChild(tr);
        

        let imgEditar = document.createElement("img");
        imgEditar.src = "img/editar-texto.png";
        imgEditar.setAttribute("onClick", "prepararEditar("+JSON.stringify(tasks[i]+")"));
        
        let imgExcluir = document.createElement("img");
        imgExcluir.src = "img/excluir.png";
        imgExcluir.setAttribute("onClick", "excluirTask("+ tasks[i].id +")");
        
        td_acoes.appendChild(imgEditar);
        td_acoes.appendChild(imgExcluir)

    }


}

function validarCampos() {
    let mensa = '';

    if (task_Titulso == null) {
        alert("Adicione um titulo")
    }
    if (task_descricao == null) {
        alert("Adicione uma descri????o")
    }
    if (mensa != '') {
        alert(mensa);
        return false;
    }

    return true;


};



function limpar_campos() {
        document.getElementById("task-titulo").value = "";
        document.getElementById("task-descricao").value = "";
        document.getElementById("prazo").value = "";
}

document.getElementById("add-tasks").onclick = function () {


    banco_de_dados.buscar_tasks();


    // titulo
    var task_Titulo = document.getElementById("task-titulo").value;

    // descri????o
    var task_descricao = document.getElementById("task-descricao").value;

    // data

    var task_data = diferencaEmDias();

    // prioridade
    var campo_select = document.getElementById("prioridade");
    var indice_selecionado = campo_select.options.selectedIndex;
    var valor_selecionado = campo_select.options[indice_selecionado].innerHTML;

    task  = {
        "id": lista_tasks.length + 1,
        "titulo": task_Titulo,
        "descricao": task_descricao,
        "data": task_data,
        "prioridade": valor_selecionado
    };



    try {
        if (validarCampos) {
            banco_de_dados.enviar_task(task);
 
        }
    } catch (error) {

        console.error(error);

    }

    limpar_campos();
    DisplayTasks();
    



};
function prepararEditar(dados){

    // document.getElementById("task-titulo").value =  task_Titulo ;

    
    // document.getElementById("task-descricao").value = task_descricao;

    

    // diferencaEmDias() = task_data;


    // campo_select = document.getElementById("prioridade");
    // campo_select.value = valor_selecionado;

    // document.getElementById("clear-all-tasks").innerHTML = "Cancelar";
    // document.getElementById("add-tasks").innerHTML = "Salvar";

    var task_Titulo = document.getElementById("task-titulo").value;
    var task_descricao = document.getElementById("task-descricao").value;
    var task_data = diferencaEmDias();
    var campo_select = document.getElementById("prioridade");
    var valor_selecionado = campo_select.options[campo_select.selectedIndex].innerHTML;

    // Definir o objeto task com os novos valores
    task = {
        "id": dados.id,
        "titulo": task_Titulo,
        "descricao": task_descricao,
        "data": task_data,
        "prioridade": valor_selecionado
    };

    document.getElementById("clear-all-tasks").innerHTML = "Cancelar";
    document.getElementById("add-tasks").innerHTML = "Salvar";

}




function editarTask(index, task56){
    lista_tasks[index] = task;

    // Atualizar a lista de tarefas no armazenamento local
    localStorage.setItem("lista-tasks", JSON.stringify(lista_tasks));

    // Limpar os campos do formul??rio de edi????o
    limpar_campos();

    // Atualizar a tabela de tarefas
    DisplayTasks();

    // Alterar o texto dos bot??es
    document.getElementById("clear-all-tasks").innerHTML = "CAncelar Tarefas";
    document.getElementById("add-tasks").innerHTML = "Salvar Tarefa";

    document.getElementById("add-tasks").onclick = function () {
        // ...
    
        try {
            if (validarCampos) {
                if (taskIndex !== -1) {
                    // Se o ??ndice da tarefa ?? v??lido, atualizar a tarefa
                    editarTask(taskIndex, task);
                } else {
                    // Se o ??ndice da tarefa ?? inv??lido, adicionar uma nova tarefa
                    banco_de_dados.enviar_task(task);
                }
            }
        } catch (error) {
            console.error(error);
        }
    
        
    
    }
}



function excluirTask(id){

    let tbody = document.getElementById("tbody");
    let tasks = banco_de_dados.buscar_tasks();

    if(confirm("Deseja deletar a tarefa de "+id+ "?")){
        for (let i = 0; i < tasks.length; i++) {
            if(tasks[i].id == id){
                tasks.splice(i, 1);
                banco_de_dados.apagar_task(i);
            }
    
        }
    
        banco_de_dados.enviar_task();
        DisplayTasks();
    

    }

   

  
}



DisplayTasks();


