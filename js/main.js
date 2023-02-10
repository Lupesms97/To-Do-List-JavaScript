
// var task 


// let list = JSON.parse(localStorage.getItem("tasks")) || []
var lista = [];

function adiconar_Task(a){
    lista.unshift(a);
    return console.log(lista.toString());
    
}



// adiconar task - botão
document.getElementById("add-tasks").onclick = function(){

    // titulo
    var task_Titulo =  document.getElementById("task-titulo").value;

    // descrição
    var task_descricao =  document.getElementById("task-descricao").value;

    // data
    var task_data = document.getElementById("prazo").value;

    // prioridade
    var campo_select  = document.getElementById("prioridade");
    var indice_selecionado = campo_select.options.selectedIndex;
    var valor_selecionado = campo_select.options[indice_selecionado].innerHTML;

    // console.log(task_Titulo);
    // console.log(task_descricao);
    // console.log(task_data);
    // console.log(valor_selecionado);

    var task = {
        'titulo': task_Titulo,
        'descricao': task_descricao,
        'data': task_data,
        'prioridade' : valor_selecionado

    }

    adiconar_Task(task);

  

    

    
};

// var lista = document.getElementById("tasks-list").value;














// var task = (function() {

//     var nome;
//     var prazo;
//     var descricao;
//     var nivelPriori;
    

