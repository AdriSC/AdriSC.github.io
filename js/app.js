if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/sw.js').then(reg => {
            console.log('SW ok', reg)
        }, function (err) {
            console.log('Fallo SW', err)
        })
    })
}

$(function () {

    let taskList = []; // Array de Strings con las tareas

    //const newTaskBt = document.getElementById('newTaskBt');
    const newTaskDiv = document.getElementById('newTaskDiv')
    // console.log(newTaskBt);
    if (localStorage.getItem("taskList") !== null) {
        //localStorage.setItem("taskList", JSON.stringify(taskList));
        taskList = JSON.parse(localStorage.getItem("taskList"));
        console.log(taskList)

        for (let i = 0; i < taskList.length; i++) {
            let taskDiv = $('<div id="taskDiv"></div>');
            $('#taskListUl').append(taskDiv);
            let task = $('<button class="task">' + taskList[i] + ' </button>');
            taskDiv.append(task);
        }
    }
    else {
        console.log('Not here');
    }

    $('#newTaskBt').on('click', () => {
        $('#newTaskBt').prop('disabled', true);
        let taskText = $('<input required type="text" id="taskText"></input>');
        let saveBt = $('<button class="buttonStyle" id="saveBt"></button>').text('Guardar');
        let cancelBt = $('<button class="buttonStyle" id="cancelBt"></button>').text('Cancelar');
        $('#newTaskDiv').append(taskText, saveBt, cancelBt);
    });

    $('body').on('click', '#saveBt', function () { //Click eb el boton de guardar la nueva tarea
        let texto = $('#taskText').val();
        if (texto !== "") {
            let taskDiv = $('<li id="taskDiv"></li>');
            $('#taskListUl').append(taskDiv);
            let task = $('<button class="task">' + texto + '</button>');
            taskDiv.append(task);
            taskList.push(texto);
            localStorage.setItem("taskList", JSON.stringify(taskList)); //Update en el local storage
            console.log(taskList);
            $('#newTaskBt').prop('disabled', false);
            $('#saveBt').remove();
            $('#taskText').remove();
            $('#cancelBt').remove();
        }
    });

    $('body').on('click', '#cancelBt', function () { //Click eb el boton de cancelar la nueva tarea
        $('#newTaskBt').prop('disabled', false);
        $('#saveBt').remove();
        $('#taskText').remove();
        $('#cancelBt').remove();
    });

    let indexEdit;
    let initText;
    $('body').on('click', '.task', function () { // Click en la Tarea
        let parent = $(this).parent();
        indexEdit = $(this).parent().index();

        initText = $(this).text();

        $(this).remove(); // Se borra el boton
        parent.append('<div id="editBox"></div>');
        let taskTextEdit = $('<input required type="text" id="taskTextEdit"></input>');
        taskTextEdit.val(initText);
        $(':button').prop('disabled', true); // Desactiva los botones de la pagina

        let deleteBt = $('<button class="buttonStyle" id="deleteButton"></button>').text('Eliminar');
        let cancelBt = $('<button class="buttonStyle" id="cancelBtEdit"></button>').text('Cancelar');
        let saveBt = $('<button class="buttonStyle" id="saveBtEdit"></button>').text('Guardar');
        let div = $('<div id="options"></div>');
        div.append(deleteBt, cancelBt, saveBt);
        $('#editBox').append(taskTextEdit, div);
    });

    $('body').on('click', '#cancelBtEdit', () => { // Boton de Cancelar editar la tarea
        console.log('Click on Calcel Btn')
        let parent = $('#editBox').parent();
        $('#editBox').remove();
        let task = $('<button class="task">' + initText + '</button>');
        parent.append(task);
        $(':button').prop('disabled', false); // Activa los botones de la pagina
    });

    $('body').on('click', '#deleteButton', function () { // Boton de eliminar la tarea
        $('#editBox').parent().remove();
        taskList.splice(indexEdit, 1);
        console.log(taskList);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        $(':button').prop('disabled', false); // Activa los botones de la pagina
    });

    $('body').on('click', '#saveBtEdit', function () { // Boton para guardar las modificaciones en la tarea
        let parent = $('#editBox').parent();

        taskList[indexEdit] = $('#taskTextEdit').val();
        let task = $('<button class="task">' + taskList[indexEdit] + '</button>');
        $('#editBox').remove();
        parent.append(task);
        console.log(taskList);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        $(':button').prop('disabled', false); // Activa los botones de la pagina
    });

});
