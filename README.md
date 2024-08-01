# Task Manager

A simple and elegant task management application built with [Electron](https://www.electronjs.org/), [Node.js](https://nodejs.org/), and styled with [Tailwind CSS](https://tailwindcss.com/). This desktop app allows users to manage their tasks efficiently with features such as setting priorities, due dates, and managing tasks through a clean and user-friendly interface.

## Features

- **Add New Tasks**: Create tasks with a name, description, priority, and due date.
- **Edit and Delete Tasks**: Easily manage your tasks by editing or removing them.
- **Custom Menu**: Includes options for minimizing, closing, and quitting the application.
- **Stylish UI**: Modern design using Tailwind CSS.
- **Cross-Platform**: Runs on Windows, macOS, and Linux.

## Installation

To get started with the Task Manager application, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/xentzenith/task-manager-electron.git
   cd task-manager-electron
    ```
2. **Install the Dependencies**:
    ```bash
    npm install
    ```
3. **Run the Application**:
    ```bash
    npm start
    ```

## Usage
    - Click the "Add New Task" button to open a popup for creating tasks.
    - Fill in the task name, description, priority, and due date.
    - Use the "Minimize", "Close", and "Quit" options in the custom menu.
    - Tasks are saved locally in the database.json file in the data directory.

## Configuration
The application uses a local JSON file (`database.json`) for storing tasks. You can modify the `database.json` file directly if needed.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you have any improvements or new features to add ^_^


## Acknowledgements
- [Electron](https://www.electronjs.org/): Build cross-platform desktop apps with JavaScript, HTML, and CSS.
- [Node.js](https://nodejs.org/): JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.