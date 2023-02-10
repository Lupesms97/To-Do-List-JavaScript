


// let list = JSON.parse(localStorage.getItem("tasks")) || []





// adiconar task - botão
document.getElementById("add-tasks").onclick = function(){

    // variavel local com a lista
    let lista;

    // Recupera a string JSON da lista do Local Storage
    let listaJSON = localStorage.getItem('lista');

    // Converte a string JSON de volta para uma lista de JavaScript
    lista = JSON.parse(listaJSON);

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
        "titulo": task_Titulo,
        "descricao": task_descricao,
        "data": task_data,
        "prioridade": valor_selecionado
    };
    
    lista.push(task);


    // console.log(lista);
    // console.log(task);
    // console.log(task.titulo);
    // console.log(task.descricao);

    // traansformando lista em json
    listaJSON = JSON.stringify(lista);

    try {    
        // salvando lista em LocalStorage
        localStorage.setItem('lista', listaJSON);
        document.getElementById("task-titulo").value = "";
        document.getElementById("task-descricao").value = "";
        document.getElementById("prazo").value = "";
        campo_select.options.selectedIndex.value = "opt1";
        
    } catch (error) {

        console.error(error);
        
    }finally{
        // task_data = "";
        // valor_selecionado = "";
        // task_descricao = "";
        // task_Titulo = "";

    }
    // document.getElementById("spinner-loader").style.display = "initial";
    // window.setTimeout(function(){
    //     document.getElementById("spinner-loader").style.display = "none";
    // }, 2000);






  

    

    
};

// var lista = document.getElementById("tasks-list").value;


// var task = (function() {

//     var nome;
//     var prazo;
//     var descricao;
//     var nivelPriori;
    

