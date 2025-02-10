const { getAsync, setAsync } = require("./index");

async function saveTodoCount() {
  try {
    let currentCount = await getTodoCount();
    const newCount = ++currentCount;
    await setAsync("added_todos", newCount);
    console.log(`Saved todo count: ${newCount}`);
  } catch (err) {
    console.error("Error saving todo count:", err);
  }
}

async function getTodoCount() {
  try {
    let count = await getAsync("added_todos");
    if (count === null || isNaN(count)) {
      count = 0;
    }
    console.log(`Retrieved todo count: ${count}`);
    return parseInt(count);
  } catch (err) {
    console.error("Error retrieving todo count:", err);
    return 0;
  }
}

module.exports = {
  saveTodoCount,
  getTodoCount,
};
