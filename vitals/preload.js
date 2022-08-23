const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
    handleBoxToggled: (callback) => {
        ipcRenderer.removeAllListeners("box-toggled")
        ipcRenderer.on('box-toggled', callback)
    }
})