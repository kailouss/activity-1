const taskBox = document.querySelector('.task-box');
 //if there's no task
 const noTask = document.createElement('div');
 noTask.classList.add('no-task');
 noTask.textContent = 'No Task';
 taskBox?.appendChild(noTask)
 
 function checkNoTask() {
    if (taskBox?.children.length === 1 && taskBox.contains(noTask)) {
        return;
    } else if (taskBox?.children.length === 0) {
        taskBox.appendChild(noTask);
    } else {
        noTask.remove();
    }
}

//add task func
function addTask(taskName: string, taskDate: string) {

  //task container
  const taskChildCont = document.createElement('div');
  taskChildCont.classList.add('task-child-cont');

  //add name span
  const taskSpan = document.createElement('div');
  taskSpan.classList.add('task-name');
  taskSpan.textContent = taskName;
  
  //date cont
  const dateCont = document.createElement('div');
  dateCont.classList.add('date-cont');
  dateCont.textContent = taskDate;
  
  //task name
  const taskNameContainer = document.createElement('div');
  taskNameContainer.classList.add('task-name-container');
  taskNameContainer.appendChild(taskSpan);
  taskNameContainer.appendChild(dateCont);

  //del button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');

  const deleteImg = document.createElement('img');
  deleteImg.src = "trash.webp";
  deleteImg.alt = "Delete";
  deleteButton.appendChild(deleteImg);

  deleteButton.addEventListener('click', () => {
      taskBox?.removeChild(taskChildCont);

      checkNoTask();
  });

  //checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');

  //strikethrough when clicked
  checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
          taskSpan.classList.add('completed');
          taskChildCont.classList.add('completed');
      } else {
          taskSpan.classList.remove('completed');
          taskChildCont.classList.remove('completed')
      }
  });

  // div for del check
  const delcheckCont = document.createElement('div');
  delcheckCont.classList.add('delcheck-cont');
  delcheckCont.appendChild(deleteButton);
  delcheckCont.appendChild(checkbox);

  //append -> task cont
  taskChildCont.appendChild(taskNameContainer);
  taskChildCont.appendChild(delcheckCont);

  //func add task
  taskBox?.appendChild(taskChildCont);

  checkNoTask();
}

//add task
document.querySelector('#task-button')?.addEventListener('click', () => {
  const taskInput = document.querySelector('#new-task-input') as HTMLInputElement;
  const dateInput = document.querySelector('#task-date-input') as HTMLInputElement;
  
  if (taskInput.value && dateInput.value) {
      addTask(taskInput.value, dateInput.value);
      //clear
      taskInput.value = '';
      dateInput.value = '';
  }
});

checkNoTask();
