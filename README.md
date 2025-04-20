# GliaCloud 前端面試作業

## 專案簡介

此專案為 GliaCloud 前端面試作業，基於 [Create React App](https://github.com/facebook/create-react-app) 建立，旨在展示候選人對 React 技術的掌握程度及前端開發能力。

## 功能描述

- **基本功能**：實現指定的功能需求，展示候選人對 React 組件、狀態管理及事件處理的理解。
- **響應式設計**：確保應用在不同裝置上的良好顯示效果。
- **程式碼品質**：遵循最佳實踐，確保程式碼可讀性與可維護性。

## 技術選擇

本專案採用了以下技術：

- **React**：作為核心框架，用於構建高效的前端應用。
- **MUI**：提供現代化的 UI 元件庫，提升開發效率與一致性。
- **React-Player**：用於實現題目要求的影片播放器功能，支援多種影片來源。
- **Sass/SCSS**：選用 Sass/SCSS 進行樣式編輯，因其強大的功能與靈活性，能更高效地編輯管理小部分區域樣式。
- **Netlify**：用於快速部署與托管前端應用，提供簡單的 CI/CD 流程，支援自動化部署與自訂網域，適合小型專案的 MVP 快速上線。

技術選擇基於熟悉度與實用性，旨在快速實現需求並確保程式碼的可維護性。

## 安裝與操作手冊

### 環境需求

- Node.js 20.16
- npm 10.0.1

### 安裝步驟

1. 克隆專案到本地：

   ```bash
   git clone https://github.com/wade0615/GliaCloud.git
   cd glia-cloud
   ```

2. 安裝依賴：
   ```bash
   npm install
   ```

### 可用指令

在專案目錄中，您可以執行以下指令：

#### `npm run start`

啟動開發伺服器。\
開啟 [http://localhost:3000](http://localhost:3000) 在瀏覽器中查看。

#### `npm test`

啟動測試執行器，進行互動式測試。

#### `npm run build`

將應用程式打包為生產模式，輸出至 `build` 資料夾。

#### `npm run lint`

檢查程式碼是否符合規範。

### 部署

1. 確保已執行 `npm run build`，生成生產模式的檔案。
2. 將 `build` 資料夾中的內容上傳至您的伺服器或部署平台（如 Vercel、Netlify）。
