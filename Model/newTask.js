function Task(description){
    this.description = description;
}

const newTaskBt = document.getElementById('newTaskBt');

console.log(newTaskBt);

newTaskBt.addEventListener('click', function (){
    newTaskBt.disabled = true;
    const taskText = document.createElement('input');
    taskText.setAttribute('id', 'taskText');
    document.body.appendChild(taskText);

    const saveBt = document.createElement('button');
    saveBt.setAttribute('id', 'saveBt');
    saveBt.innerHTML = 'Guardar';
    document.body.appendChild(saveBt);

    const cancelBt = document.createElement('button');
    cancelBt.setAttribute('id', 'cancelBt');
    cancelBt.innerHTML = 'Cancelar';
    document.body.appendChild(cancelBt);
});

document.getElementById('saveBt').addEventListener('click', function(){
    let task = new Task(document.getElementById('taskText').value);
    console.log(task)
});

/*cancelBt.addEventListener('click', function(){

});*/