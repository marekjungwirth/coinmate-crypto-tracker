const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path');
const fetch = require('electron-fetch').default;
const crypto = require('crypto-js');
const Store = require('electron-store');

// Inicializace úložiště
const store = new Store();

// Výchozí nastavení
const defaultSettings = {
    apiClientId: "",
    apiPublicKey: "",
    apiPrivateKey: "",
    trezorSats: 0,
    currency: "CZK", // NOVÉ: Výchozí měna
    selectedCurrencies: {
        BTC: true,
        ETH: false,
        LTC: false,
        XRP: false,
        ADA: false,
        SOL: false
    }
};

function getSettings() {
    const saved = store.get('settings') || {};
    // Sloučíme, aby se přidala i nová políčka (currency)
    return { 
        ...defaultSettings, 
        ...saved, 
        selectedCurrencies: { ...defaultSettings.selectedCurrencies, ...(saved.selectedCurrencies || {}) } 
    };
}

async function getCoinmateBalance() {
    const settings = getSettings();

    // Validace klíčů
    if (!settings.apiClientId || !settings.apiPublicKey || !settings.apiPrivateKey) {
        return { success: false, error: 'missing_keys' };
    }

    const nonce = Date.now();
    const signature = crypto.HmacSHA256(nonce + settings.apiClientId + settings.apiPublicKey, settings.apiPrivateKey).toString(crypto.enc.Hex).toUpperCase();
    
    const url = 'https://coinmate.io/api/balances'; 
    
    const body = new URLSearchParams({
        clientId: settings.apiClientId,
        publicKey: settings.apiPublicKey,
        nonce,
        signature
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        
        const data = await response.json();

        if (data.error || !data.data) {
            return { success: false, error: data.errorMessage || 'API error' };
        }
        
        return { success: true, data: data.data };

    } catch (error) {
        console.error('[main.js] Chyba sítě:', error);
        return { success: false, error: 'network_error' };
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 550,
        height: 750,
        frame: false,
        titleBarStyle: 'hidden',
        vibrancy: 'popover', 
        visualEffectState: 'active',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');
    
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('theme-updated', nativeTheme.shouldUseDarkColors);
    });
}

app.whenReady().then(() => {
    ipcMain.handle('get-coinmate-balance', getCoinmateBalance);
    
    ipcMain.handle('get-settings', () => {
        return getSettings();
    });

    ipcMain.handle('save-settings', (event, newSettings) => {
        store.set('settings', newSettings);
        return { success: true };
    });

    nativeTheme.on('updated', () => {
        const windows = BrowserWindow.getAllWindows();
        if (windows.length > 0) {
            windows[0].webContents.send('theme-updated', nativeTheme.shouldUseDarkColors);
        }
    });

    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
