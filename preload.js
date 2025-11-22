const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchCoinmateBalance: () => ipcRenderer.invoke('get-coinmate-balance'),
    
    // Nové funkce pro nastavení
    getSettings: () => ipcRenderer.invoke('get-settings'),
    saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),

    onThemeUpdate: (callback) => ipcRenderer.on('theme-updated', (_event, isDarkMode) => callback(isDarkMode))
});
