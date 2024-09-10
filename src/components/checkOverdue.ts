export function checkOverdue(taskDateObj: Date, 
    taskChildCont: HTMLElement, 
    dateCont: HTMLElement, 
    checkbox: HTMLInputElement) {
        
    const now = new Date();
    if (taskDateObj < now) {
      taskChildCont.classList.add('overdue');
      dateCont.style.color = 'white';
      checkbox.style.backgroundColor = 'red'
      checkbox.style.borderColor = 'red'
    } else {
      taskChildCont.classList.remove('overdue');
      // checkbox.style.backgroundColor = '#28a745'
      checkbox.style.borderColor = '#28a745'
      // checkbox.style.backgroundColor = 'green'
    }
  }
  
