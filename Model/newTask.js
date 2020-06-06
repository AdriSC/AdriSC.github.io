$(function () {
    let taskList = []; // Array de Strings con las tareas

    //const newTaskBt = document.getElementById('newTaskBt');
    const newTaskDiv = document.getElementById('newTaskDiv')
    // console.log(newTaskBt);
    if(localStorage.getItem("taskList") !== null){
        //localStorage.setItem("taskList", JSON.stringify(taskList));
        taskList = JSON.parse(localStorage.getItem("taskList"));
        // onsole.log(tasks)

        for(let i = 0; i < taskList.length; i++){
            $('#taskListUl').append('<button class="task">' + taskList[i] + ' </button>');
        }
    }
    else{
        console.log('Not here');
    }

    $('#newTaskBt').on('click', ()=>{
        $('#newTaskBt').prop('disabled', true);
        let taskText = $('<input type="text" id="taskText"></input>');
        let saveBt = $('<button id="saveBt"></button>').text('Guardar');
        let cancelBt = $('<button id="cancelBt"></button>').text('Cancelar');
        $('#newTaskDiv').append(taskText, saveBt, cancelBt);
    }); 

    $('body').on('click', '#saveBt', function () { //Click eb el boton de guardar la nueva tarea
        let texto = $('#taskText').val();
        if (texto !== ""){
            let taskDiv =$('<div id="taskDiv"></div>');
            $('#taskListUl').append(taskDiv);
            let task =$('<button class="task">' + texto + ' </button>');
            taskDiv.append(task);
            taskList.push(texto);
            localStorage.setItem("taskList", JSON.stringify(taskList));
            console.log(taskList);
        }
    });

    $('body').on('click', '#cancelBt', function () { //Click eb el boton de guardar la nueva tarea
        $('#newTaskBt').prop('disabled', false);
        $('#saveBt').remove();
        $('#taskText').remove();
        $('#cancelBt').remove();
    });

    $('body').on('click', '.task', function () { //Click eb el boton de guardar la nueva tarea
        let task = $(this).text();
        let idToDel = taskList.indexOf(task);
        this.remove();
        taskList.splice(idToDel, 1);
        console.log(taskList);
        localStorage.setItem("taskList", JSON.stringify(taskList));
    });

    
});
