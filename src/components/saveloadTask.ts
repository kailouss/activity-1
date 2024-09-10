import { addTask } from "../main";

export function saveTask() {
    const taskBox = document.querySelector('.task-box');
    if (!taskBox) return;

    const tasks = Array.from(taskBox.children)
        .map(task => {
            const taskName = task.querySelector('.task-name')?.textContent || '';
            const taskDate = task.querySelector('.date-cont')?.textContent || '';
            const done = (task.querySelector('.checkbox') as HTMLInputElement)?.checked || false;

            return { taskName, taskDate, done };
        })
        .filter(task => task.taskName && task.taskDate);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Tasks saved!');
}


export function loadTask() {
    const savedTasks = localStorage.getItem('tasks');
    if (!savedTasks) {
        alert('No TASKS to load!');
        return;
}

    const tasks = JSON.parse(savedTasks);


    const taskBox = document.querySelector('.task-box');
    taskBox!.innerHTML = ''

    tasks.forEach((task: { taskName: string, taskDate: string, done: boolean}) => {
        addTask(task.taskName, task.taskDate);

        const lastTask = taskBox!.lastChild as HTMLElement;
        const checkbox = lastTask.querySelector('.checkbox') as HTMLInputElement;
        if (task.done) {
            checkbox.checked = true;
            lastTask.querySelector('.task-name')?.classList.add('completed');
            lastTask.classList.add('completed');
        }
    });

    alert('Tasks Loaded!')
}

export function clearTask() {
    localStorage.removeItem('tasks');
    alert('All tasks have been cleared!');
}