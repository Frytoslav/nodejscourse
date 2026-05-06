const {
    findTaskById,
    removeTask,
    countTasksByPriority,
    addTask,
} = require('./tasks.service');

const tasks = [
    { id: 1, title: 'Read about HTTP', done: false, priority: 'high' },
    { id: 2, title: 'Install Node', done: true, priority: 'medium' },
    { id: 3, title: 'Create API plan', done: false, priority: 'low' },
];

console.log(findTaskById(tasks, 2));

console.log(removeTask(tasks, 1));

console.log(countTasksByPriority(tasks));

console.log(addTask(tasks, 'Learn modules', 'high'));