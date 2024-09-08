
const noTask = document.createElement('div');
noTask.classList.add('no-task');
noTask.textContent = 'No Task';

function checkNoTask(taskBox: Element | null) {

    if (taskBox?.children.length === 1 && taskBox.contains(noTask)) {
        return;
    } else if (taskBox?.children.length === 0) {
        taskBox.appendChild(noTask);
    } else {
        noTask.remove();
    }
}

export default checkNoTask;
