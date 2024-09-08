function sortTasks(criteria: 'name' | 'date' | 'completed') {
    const taskBox = document.querySelector('.task-box');
    if (!taskBox) return;

    const tasks = Array.from(taskBox.children) as HTMLElement[];

    tasks.sort((a, b) => {
        const taskA = a as HTMLElement;
        const taskB = b as HTMLElement;

        let valueA, valueB;

        switch (criteria) {
            case 'name':
                valueA = taskA.querySelector('.task-name')?.textContent || '';
                valueB = taskB.querySelector('.task-name')?.textContent || '';
                return valueA.localeCompare(valueB);

            case 'date':
                valueA = new Date(taskA.querySelector('.date-cont')?.textContent || '').getTime();
                valueB = new Date(taskB.querySelector('.date-cont')?.textContent || '').getTime();
                return valueA - valueB;

            case 'completed':
                const checkboxA = taskA.querySelector('.checkbox') as HTMLInputElement | null;
                const checkboxB = taskB.querySelector('.checkbox') as HTMLInputElement | null;

                valueA = checkboxA ? (checkboxA.checked ? 1 : 0) : 0;
                valueB = checkboxB ? (checkboxB.checked ? 1 : 0) : 0;
                return valueA - valueB;

            default:
                return 0;
        }
    });

    tasks.forEach(task => taskBox.appendChild(task));
}

export default sortTasks;
