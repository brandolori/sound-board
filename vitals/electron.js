const { app, BrowserWindow, Tray, Menu, MenuItem } = require('electron');
// Module to create native browser window.

const { join } = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let tray;
let mainWindow;

/** @type {(item:MenuItem)=>void} */
const onClickMenu = (item) => {
    console.log(`L'elemento e' impostato su ${item.checked}`)
}

function createWindow() {

    appIcon = new Tray(join(__dirname, "../build/favicon.ico"))
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Super bello', type: "checkbox", click: onClickMenu },
        { label: 'Extra carino', type: "checkbox" },
        {
            label: 'Item4',
            type: "submenu",
            submenu: Menu.buildFromTemplate([
                { label: 'Item1', type: 'radio' },
                { label: 'Item2', type: 'radio' },
            ])
        },
    ])

    // Make a change to the context menu
    contextMenu.items[1].checked = false

    // Call this again for Linux because we modified the context menu
    appIcon.setContextMenu(contextMenu)

    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600, autoHideMenuBar: true });

    // and load the index.html of the app.
    mainWindow.loadURL(app.isPackaged
        ? `file://${join(__dirname, '../build/index.html')}`
        : 'http://localhost:3000');

    // Open the DevTools.
    if (!app.isPackaged)
        mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => createWindow());

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.