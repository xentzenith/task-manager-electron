const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
require('./data/seed');

// Path to the database file
const dbPath = path.join(__dirname, 'data', 'database.json');

// Function to read tasks from the database
const readTasks = () => {
  if (!fs.existsSync(dbPath)) return [];
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

// Function to write tasks to the database
const writeTasks = (tasks) => {
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
};

// Variable to keep track of the menu
let appMenu = null;

// Function to create a custom menu
function createMenu() {
  if (appMenu) return; // Menu already created

  const menuTemplate = [
    {
      label: 'Task Manager',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.minimize();
            }
          }
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.close();
            }
          }
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            dialog.showMessageBox(focusedWindow, {
              title: 'About Task Manager',
              message: 'Task Manager',
              detail: 'A simple task manager application built with Electron.\n\nhttps://github.com/xentzenith/task-manager-electron',
              type: 'info',
              buttons: ['Close']
            });
          }
        }
      ]
    }
  ];

  appMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(appMenu);
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer', 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      devTools: false
    }
  });

  mainWindow.removeMenu();
  createMenu(); // Create and set the custom menu

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  return mainWindow;
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers
ipcMain.handle('get-tasks', () => readTasks());
ipcMain.handle('save-tasks', (event, tasks) => {
  try {
    writeTasks(tasks);
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
});
ipcMain.handle('check-date', (event, timestamp) => timestamp >= Date.now());
ipcMain.handle('set-alarm', (event, note) => {
  console.log('Alarm set with note:', note);
});
