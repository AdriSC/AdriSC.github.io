
//Registrar SW, sacado de los apuntes
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js');
    });
}

$(function () {

    let taskList = []; // Array de Strings con las tareas

    //Inicializar la lista de tareas
    //Si existe una lista almacenada, la carga
    if (localStorage.getItem("taskList") !== null) {
        taskList = JSON.parse(localStorage.getItem("taskList"));

        for (let i = 0; i < taskList.length; i++) {
            let taskDiv = $('<div id="taskDiv"></div>');
            $('#taskListUl').append(taskDiv);
            let task = $('<button class="task">' + taskList[i] + ' </button>');
            taskDiv.append(task);
        }
    }
    
    //Botón para Añadir Tarea
    $('#newTaskBt').on('click', () => {
        //Se deshabilita el botón
        $('#newTaskBt').prop('disabled', true);
        //Se crean los nuevos botones y el cuadro de texto
        let taskText = $('<input required type="text" id="taskText"></input>');
        let saveBt = $('<button class="buttonStyle" id="saveBt"></button>').text('Guardar');
        let cancelBt = $('<button class="buttonStyle" id="cancelBt"></button>').text('Cancelar');
        //Se añaden a la vista dentro de newTaskDiv
        $('#newTaskDiv').append(taskText, saveBt, cancelBt);
    });

    //Botón para guardar una nueva tarea
    $('body').on('click', '#saveBt', function () {
        //Se comprueba si el cuadro de texto está vacío
        //Si tiene texto, guardamos la tarea
        let texto = $('#taskText').val();
        if (texto !== "") {
            let taskDiv = $('<li id="taskDiv"></li>');
            $('#taskListUl').append(taskDiv);
            //Se crea la tarea y se muestra como un botón
            let task = $('<button class="task">' + texto + '</button>');
            taskDiv.append(task);
            //Se guarda la tarea en la lista de tareas
            taskList.push(texto);
            //Se guarda la lista en localStorage
            localStorage.setItem("taskList", JSON.stringify(taskList));
            //Se vuelve a activar el botón de añadir tarea y se deja en su estado inicial
            $('#newTaskBt').prop('disabled', false);
            $('#saveBt').remove();
            $('#taskText').remove();
            $('#cancelBt').remove();
        }
    });

    //Botón para cancelar la acción de añadir tarea
    $('body').on('click', '#cancelBt', function () {
        //Se deja el botón de añadir tarea en su estado inicial
        $('#newTaskBt').prop('disabled', false);
        $('#saveBt').remove();
        $('#taskText').remove();
        $('#cancelBt').remove();
    });

    //Botón para editar la tarea
    let indexEdit;
    let initText;
    $('body').on('click', '.task', function () { 
        let parent = $(this).parent();
        indexEdit = $(this).parent().index();

        initText = $(this).text();

        //Se cambia el botón por un cuadro de texto con el texto del botón
        $(this).remove();
        parent.append('<div id="editBox"></div>');
        let taskTextEdit = $('<input required type="text" id="taskTextEdit"></input>');
        taskTextEdit.val(initText);
        $(':button').prop('disabled', true); // Desactiva los botones de la pagina

        //Se crean los botones para editar la tarea
        let deleteBt = $('<button class="buttonStyle" id="deleteButton"></button>').text('Eliminar');
        let cancelBt = $('<button class="buttonStyle" id="cancelBtEdit"></button>').text('Cancelar');
        let saveBt = $('<button class="buttonStyle" id="saveBtEdit"></button>').text('Guardar');
        let div = $('<div id="options"></div>');

        //Se modifica la vista
        div.append(deleteBt, cancelBt, saveBt);
        $('#editBox').append(taskTextEdit, div);
    });

    //Botón para cancelar la edición
    $('body').on('click', '#cancelBtEdit', () => {
        
        //Se recupera el botón de la tarea
        let parent = $('#editBox').parent();
        $('#editBox').remove();
        let task = $('<button class="task">' + initText + '</button>');
        parent.append(task);
        $(':button').prop('disabled', false); // Activa los botones de la pagina
    });

    //Botón para borrar una tarea
    $('body').on('click', '#deleteButton', function () { // Boton de eliminar la tarea
        //se borra la tarea en la vista
        $('#editBox').parent().remove();
        //Se borra en la lista de tareas
        taskList.splice(indexEdit, 1);
        //Se actualiza la lista en localStorage
        localStorage.setItem("taskList", JSON.stringify(taskList));
        $(':button').prop('disabled', false); // Activa los botones de la pagina
    });

    //Botón para guardar los cambios en una tarea
    $('body').on('click', '#saveBtEdit', function () { // Boton para guardar las modificaciones en la tarea
        
        let parent = $('#editBox').parent();
        //Se modifica la tarea en la lista
        taskList[indexEdit] = $('#taskTextEdit').val();
        let task = $('<button class="task">' + taskList[indexEdit] + '</button>');
         //Se recupera el botón de la tarea
        $('#editBox').remove();
        parent.append(task);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        $(':button').prop('disabled', false); // Activa los botones de la pagina
    });

});
