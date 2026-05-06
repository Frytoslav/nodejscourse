function findTaskById(tasks, id) {
    return tasks.find((task) => task.id === id);
}

function removeTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}

function countTasksByPriority(tasks) {
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

function addTask(tasks, title, priority) {
    if (!title || title.trim() === '') {
        throw new Error('Title is required');
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        done: false,
        priority,
    };

    return [...tasks, newTask];
}

module.exports = {
    findTaskById,
    removeTask,
    countTasksByPriority,
    addTask,
};