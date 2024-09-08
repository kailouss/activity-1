import checkNoTask from "./components/noTask";
import { checkOverdue } from "./components/checkOverdue";
import sortTasks from "./components/sortTask";

const taskBox = document.querySelector('.task-box');

//add task func
function addTask(taskName: string, taskDate: string) {

 // Add "sort by" container if it doesn't exist
 let sortByCont = document.querySelector('.sort-by-cont');
 if (!sortByCont) {
  sortByCont = document.createElement('div');
  sortByCont.classList.add('sort-by-cont');

  const sortByButton = document.createElement('button');
  sortByButton.classList.add('sort-button')
  sortByButton.textContent = 'Sort By';
  
  const optionsContainer = document.createElement('div');
  optionsContainer.classList.add('sort-options');
  optionsContainer.style.display = 'none';


  //sort by name button
  const sortByName = document.createElement('button');
  sortByName.textContent = 'Name';
  sortByName.addEventListener('click', () => sortTasks('name'));

  //sort by date button
  const sortByDate = document.createElement('button');
  sortByDate.textContent = 'Date';
  sortByDate.addEventListener('click', () => sortTasks('date'));

  //sort by completed button
  const sortByCompleted = document.createElement('button');
  sortByCompleted.textContent = 'Completed';
  sortByCompleted.addEventListener('click', () => sortTasks('completed'));

  //appending to the main button
  optionsContainer.appendChild(sortByName);
  optionsContainer.appendChild(sortByDate);
  optionsContainer.appendChild(sortByCompleted);

  sortByButton.addEventListener('click', () => {
    optionsContainer.style.display = optionsContainer.style.display === 'none' ? 'block' : 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target !== sortByButton) {
      optionsContainer.style.display = 'none';
    }
  });

  sortByCont.appendChild(sortByButton);
  sortByCont.appendChild(optionsContainer);

  const taskBox = document.querySelector('.task-box');
  taskBox?.prepend(sortByCont)
  // document.querySelector('.task-box')?.parentElement?.insertBefore(sortByCont, taskBox);
 }



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
  deleteImg.src = "images/trash.webp";
  deleteImg.alt = "Delete";
  deleteButton.appendChild(deleteImg);

  deleteButton.addEventListener('click', () => {
      taskBox?.removeChild(taskChildCont);

      checkNoTask(taskBox);

      const taskChildren = Array.from(taskBox?.children || []).filter(child => 
        !child.classList.contains('sort-by-cont')
      );

      console.log('TaskBox children count after deletion:', taskBox?.children.length);

      // check and remove the container if no tasks are left
      if (taskChildren.length === 0) {
        const sortByCont = document.querySelector('.sort-by-cont');
        if (sortByCont) {
          console.log('container found, removing it.');
          sortByCont.remove();
        } else {
          console.log('container not found.');
        }
      }

      checkNoTask(taskBox);

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

      // Check overdue
      const taskDateObj = new Date(taskDate);
    
      checkOverdue(taskDateObj, taskChildCont, dateCont, checkbox);
    
      setInterval(() => {
        checkOverdue(taskDateObj, taskChildCont, dateCont, checkbox);
      }, 1000);


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

  checkNoTask(taskBox);
}

//add task
document.querySelector('#task-button')?.addEventListener('click', () => {
  const taskInput = document.querySelector('#new-task-input') as HTMLInputElement;
  const dateInput = document.querySelector('#task-date-input') as HTMLInputElement;
  
  if (taskInput.value && dateInput.value) {
      addTask(taskInput.value, dateInput.value);
      taskInput.value = '';
      dateInput.value = '';
  }
});

checkNoTask(taskBox);
