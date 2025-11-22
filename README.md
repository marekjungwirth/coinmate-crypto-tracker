# 💰 Crypto Tracker (Electron)

A lightweight desktop application built with Electron for tracking Bitcoin exchange rates and Coinmate balances in real-time. The app features a dynamic privacy mode, portfolio trend analysis, and supports hardware wallet integration (Trezor).

## ✨ Key Features

* **Secure Storage:** API keys are stored locally in the OS-secure storage (Electron Store), never in the source code.
* **Privacy Mode:** Blurs sensitive balance information until hovered over—perfect for working in public spaces.
* **Portfolio Trend:** Visualizes percentage changes in your portfolio value over selected timeframes (24h, 7d, 30d, 1y).
* **Hardware Wallet Support:** Manually track cold storage funds (Trezor) alongside your exchange balance.
* **Customizable:** Choose your primary currency (CZK/EUR/USD) and preferred units (BTC/Sats).
* **Dark/Light Mode:** Automatically syncs with your macOS system theme.

## 🛠️ Development

### Prerequisites

* Node.js (v18+)
* NPM (or Yarn)

### Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run in development mode:**

    ```bash
    npm start
    ```

## 📦 Building the App (macOS)

To create a standalone `.dmg` installer that you can distribute:

```bash
npm run build
```

The installer will be generated in the `dist/` folder.

### ⚠️ Note regarding macOS Gatekeeper

Since this is an open-source project and not signed with a paid Apple Developer ID, macOS may block the app from opening ("Unidentified Developer").

**To open the app for the first time:**
1.  **Right-click** (or Control-click) the generated app icon.
2.  Select **Open** from the context menu.
3.  Click **Open** in the dialog box to confirm.

## ⚙️ Configuration

To fetch balances, you need to provide Coinmate API keys (read-only permission recommended):

1.  Click the **Settings (⚙️)** icon in the top-right corner.
2.  Navigate to the **Coinmate API** section.
3.  Enter your **Client ID**, **Public Key**, and **Private Key**.

> **Security Note:** Keys are stored locally in your user's *Application Support* folder.

## 💻 License

This project is licensed under the **ISC** license.
