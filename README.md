# 💰 CryptoTracker

CryptoTracker is a modern web application that provides **real-time cryptocurrency price tracking** with a sleek, user-friendly interface. It uses the **Binance WebSocket API** to display live data in a responsive table with features like sorting, searching, dark/light themes, and mini price charts.

🔗 **Live Demo**: [CryptoTracker Live Demo](crypto-tracker-raghavyas19.vercel.app)  
_Replace with your actual deployed app URL_

---

## 🚀 Features

- 📈 **Real-time price updates** using Binance WebSocket API
- 📊 **Interactive table** with sorting (name, price, % change, market cap, volume)
- 🔍 **Search** by cryptocurrency name or symbol
- 🌗 **Dark/Light mode** toggle (persists across reloads)
- 📉 **Mini charts** for 7-day price trends using Recharts
- ℹ️ **Tooltips** for additional info (market cap, volume, supply)
- ⭐ **Favorite** cryptocurrencies with a star toggle

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Data**: Binance WebSocket API
- **Charting**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: *(Add your platform e.g., Vercel, Netlify, GitHub Pages)*

---

## 🧱 Architecture

CryptoTracker follows a modular architecture with a focus on separation of concerns.

### 🔧 Components

- `CryptoTable.tsx`: Main table with sorting/filtering
- `CryptoRow.tsx`: Individual crypto rows with live animations and favorite toggle
- `PriceChart.tsx`: Mini price chart using Recharts
- `Header.tsx`: Search bar, theme toggle, global stats
- `InfoTooltip.tsx`: Hover/click tooltips

### 🧠 State Management

- `cryptoSlice.ts`: Manages app state via Redux Toolkit

### 🔌 Data Fetching

- `binanceWebSocket.ts`: WebSocket connection for live updates, dispatches data to Redux store

### 🧰 Utilities

- `formatters.ts`: Price, market cap, volume, and supply formatters

### 🎨 Styling

- Tailwind CSS with responsive utility-first design and full dark mode support

---

## ⚙️ Setup Instructions

### 📦 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/raghavyas19/crypto-tracker.git
cd cryptotracker

# Install dependencies
npm install
# or
yarn install
