const noTask = document.createElement('div');
noTask.classList.add('no-task');
noTask.textContent = 'No Task';

function checkNoTask(taskBox: Element | null) {
    if (!taskBox) return;

    const taskChildren = Array.from(taskBox.children).filter(child => 
        !child.classList.contains('top-bar'));

    if (taskChildren.length === 0) {
        if (!taskBox.contains(noTask)) {
            taskBox.appendChild(noTask);
        }
    } else {
        if (taskBox.contains(noTask)) {
            noTask.remove();
        }
    }
}

export default checkNoTask;
