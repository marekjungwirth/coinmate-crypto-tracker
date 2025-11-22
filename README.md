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
