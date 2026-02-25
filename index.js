console.log('Happy developing ✨')
function buildObject(keys, values) {
    const result = {};
    for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }
    return result;
}

// Example usage:
const keys = ['name', 'age', 'city'];
const values = ['Alice', 30, 'New York'];
const obj = buildObject(keys, values);
console.log(obj); // Output: { name: 'Alice', age: 30, city: 'New York' }