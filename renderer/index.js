document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const popup = document.getElementById('popup');
    const openPopupBtn = document.getElementById('open-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const addTaskBtn = document.getElementById('add-task');
  
    function renderTasks(tasks) {
      taskList.innerHTML = '';
      if (tasks.length === 0) {
        taskList.innerHTML = '<p class="text-gray-600">What about creating a new one?? ^_^</p>';
        return;
      }
      tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'bg-white p-4 mb-4 rounded shadow-md' + (task.completed ? ' border-green-500 border-2' : 'border-orange-500 border-2');
        taskItem.innerHTML = `
          <h3 class="text-lg font-semibold">${task.name}</h3>
          <p>${task.description}</p>
          <p class="text-gray-600">Due: ${new Date(task.dueDate).toLocaleDateString()}</p>
          <p class="text-gray-600">Priority: ${task.priority}</p>
          <button class="bg-red-500 text-white px-4 py-2 rounded mr-2" onclick="removeTask('${task.id}')">Remove</button>
          <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="toggleComplete('${task.id}')">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(taskItem);
      });
    }
  
    function showPopup() {
      popup.classList.remove('hidden');
    }
  
    function hidePopup() {
      popup.classList.add('hidden');
    }
  
    openPopupBtn.addEventListener('click', showPopup);
    closePopupBtn.addEventListener('click', hidePopup);
  
    addTaskBtn.addEventListener('click', async () => {
      const name = document.getElementById('task-name').value;
      const description = document.getElementById('task-description').value;
      const priority = document.getElementById('task-priority').value;
      const dueDate = new Date(document.getElementById('task-due-date').value).getTime();
  
      const isValidDate = await window.ipcRenderer.checkDate(dueDate);
  
      if (!name || !description) {
        alert('Please provide both task name and description.');
        return;
      }
  
      if (!isValidDate) {
        alert('You cannot pick a past date for the task.');
        return;
      }
  
      window.ipcRenderer.getTasks().then(tasks => {
        const newTask = {
          id: Date.now().toString(),
          name,
          description,
          priority,
          dueDate,
          completed: false
        };
        tasks.push(newTask);
        window.ipcRenderer.saveTasks(tasks).then(() => {
          renderTasks(tasks);
          hidePopup();
        });
      });
    });
  
    function removeTask(id) {
      window.ipcRenderer.getTasks().then(tasks => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        window.ipcRenderer.saveTasks(updatedTasks).then(() => renderTasks(updatedTasks));
      });
    }
  
    function toggleComplete(id) {
      window.ipcRenderer.getTasks().then(tasks => {
        const task = tasks.find(task => task.id === id);
        if (task) {
          task.completed = !task.completed;
          window.ipcRenderer.saveTasks(tasks).then(() => renderTasks(tasks));
        }
      });
    }
  
    window.removeTask = removeTask;
    window.toggleComplete = toggleComplete;
  
    // Initial load
    window.ipcRenderer.getTasks().then(renderTasks);
  });
  