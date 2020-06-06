function Task(description){
    this.description = description;
}

window.onload = function(){
    const newTaskBt = document.getElementById('newTaskBt');
    const newTaskDiv = document.getElementById('newTaskDiv')
    console.log(newTaskBt);

    newTaskBt.addEventListener('click', function (){
        newTaskBt.disabled = true;
        const taskText = document.createElement('input');
        taskText.setAttribute('id', 'taskText');
        newTaskDiv.appendChild(taskText);

        const saveBt = document.createElement('button');
        saveBt.setAttribute('id', 'saveBt');
        saveBt.innerHTML = 'Guardar';
        newTaskDiv.appendChild(saveBt);

        const cancelBt = document.createElement('button');
        cancelBt.setAttribute('id', 'cancelBt');
        cancelBt.innerHTML = 'Cancelar';
        newTaskDiv.appendChild(cancelBt);
    });    
}

/*
//Gestionarlos después de crearlos. TODO
document.getElementById('saveBt').addEventListener('click', function(){
    let task = new Task(document.getElementById('taskText').value);
    console.log(task)
});

cancelBt.addEventListener('click', function(){

});*/