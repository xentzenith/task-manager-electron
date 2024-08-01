const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  saveTasks: (tasks) => ipcRenderer.invoke('save-tasks', tasks),
  checkDate: (timestamp) => ipcRenderer.invoke('check-date', timestamp),
  setAlarm: (note) => ipcRenderer.invoke('set-alarm', note)
});
