function Task(description){
    this.description = description;
}

$(function () {
    let taskList = []; // Array de Strings con las tareas

    const newTaskBt = document.getElementById('newTaskBt');
    const newTaskDiv = document.getElementById('newTaskDiv')
    // console.log(newTaskBt);
    if(localStorage.getItem("taskList") !== null){
        //localStorage.setItem("taskList", JSON.stringify(taskList));
        taskList = JSON.parse(localStorage.getItem("taskList"));
        // onsole.log(tasks)

        for(let i = 0; i < taskList.length; i++){
            $('#taskListDiv').append('<button class="task">' + taskList[i] + ' </button>');
        }
    }
    else{
        console.log('Not here');
    }

    newTaskBt.addEventListener('click', function (){
        newTaskBt.disabled = true;
        const taskText = document.createElement('input');
        taskText.setAttribute('id', 'taskText');
        newTaskDiv.appendChild(taskText);

        const saveBt = document.createElement('input');
        saveBt.setAttribute('type', 'submit');
        saveBt.setAttribute('id', 'saveBt');
        saveBt.setAttribute('class', 'buttonStyle');
        saveBt.innerHTML = 'Guardar';
        newTaskDiv.appendChild(saveBt);

        const cancelBt = document.createElement('button');
        cancelBt.setAttribute('id', 'cancelBt');
        cancelBt.setAttribute('class', 'buttonStyle');
        cancelBt.innerHTML = 'Cancelar';
        newTaskDiv.appendChild(cancelBt);
    });    

    $('body').on('click', '#saveBt', function () { //Click eb el boton de guardar la nueva tarea
        let texto = $('#taskText').val();
        $('#taskListDiv').append('<button class="task">' + texto + ' </button>');
        taskList.push(texto);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        console.log(taskList);
    });

    $('body').on('click', '#cancelBt', function () { //Click eb el boton de guardar la nueva tarea
        newTaskBt.disabled = false;
        $('#saveBt').remove();
        $('#taskText').remove();
        $('#cancelBt').remove();
    });

    $('body').on('click', '.task', function () { //Click eb el boton de guardar la nueva tarea
        let idToDel = $(this).index();
        this.remove();
        taskList.splice(idToDel, 1);
        console.log(taskList);
        localStorage.setItem("taskList", JSON.stringify(taskList));
    });

    
});

/*
//Gestionarlos después de crearlos. TODO
document.getElementById('saveBt').addEventListener('click', function(){
    let task = new Task(document.getElementById('taskText').value);
    console.log(task)
});

cancelBt.addEventListener('click', function(){

});*/