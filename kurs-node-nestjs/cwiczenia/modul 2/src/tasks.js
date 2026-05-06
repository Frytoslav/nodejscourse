const tasks = [
    { id: 1, title: 'Read about HTTP', done: false, priority: 'high' },
    { id: 2, title: 'Install Node', done: true, priority: 'medium' },
    { id: 3, title: 'Create API plan', done: false, priority: 'low' },
];

function listOpenTasks(items) {
    return items.filter((task) => !task.done);
}

function markTaskDone(items, id) {
    return items.map((task) => {
        if (task.id !== id) {
            return task;
        }

        return {
            ...task,
            done: true,
        };
    });
}

console.log(listOpenTasks(tasks));
console.log(markTaskDone(tasks, 1));

function findTaskById(tasks, id) {
    return tasks.find((task) => task.id === id);
}

console.log(findTaskById(tasks, 1));

function removeTask(tasks, id){
    return tasks.filter((task) => task.id !== id);
}

console.log("Task remover")
console.log(removeTask(tasks, 3))

function countTaskByPriority(tasks) {
    const priorities = {
        high: 0,
        medium: 0,
        low: 0,
    };

    tasks.forEach((task) => {
        if (task.priority in priorities) {
            priorities[task.priority] += 1;
        }
    });

    return priorities;
}

console.log("Count priorities")
console.log(countTaskByPriority(tasks));

function addTask(tasks, title, priority, id) {
    if (!title || title.trim() === '') {
        throw new Error('Title is required');
    }

    const newTask = {
        id: id,
        title: title.trim(),
        done: false,
        priority,
    };

    return [...tasks, newTask];
}
