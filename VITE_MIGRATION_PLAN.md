# X Time Search - Vite移行計画

## 概要
Next.js 9.x + Material-UI v4 から Vite + React + MUI v5 への完全移行計画

## フェーズ1: 環境準備と依存関係更新

### 1.1 新しい依存関係
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@mui/x-date-pickers": "^6.18.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "moment": "^2.29.4",
    "moment-timezone": "^0.5.43"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/moment-timezone": "^0.5.30",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0"
  }
}
```

### 1.2 新しいスクリプト
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

## フェーズ2: ファイル構造変更

### 2.1 新しいディレクトリ構造
```
/
├── index.html                    # 新規作成 (Viteエントリーポイント)
├── vite.config.ts               # 新規作成 (Vite設定)
├── src/                         # 新規ディレクトリ
│   ├── main.tsx                 # 新規作成 (Reactアプリエントリー)
│   ├── App.tsx                  # pages/index.tsx から移動・変更
│   ├── components/              # 既存のcomponents/から移動
│   │   ├── Main.tsx
│   │   ├── BeginDateTime.tsx
│   │   ├── EndDateTime.tsx
│   │   ├── KeywordText.tsx
│   │   ├── TimeZone.tsx
│   │   ├── History.tsx
│   │   └── Usage.tsx
│   ├── lib/                     # src/lib.ts から変更
│   │   └── index.ts
│   ├── hooks/                   # src/state.ts から変更
│   │   └── useLocalStorageReducer.ts
│   └── __tests__/               # 既存の__tests__/から移動
│       └── lib.test.ts
├── public/                      # 既存のpublic/そのまま
│   └── favicon.ico
└── 削除するファイル:
    ├── pages/
    ├── next-env.d.ts
    └── next.config.js (存在する場合)
```

### 2.2 新規作成ファイル

#### index.html
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>X Time Search</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

#### src/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

const theme = createTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

## フェーズ3: Material-UI v4 → MUI v5 移行

### 3.1 主要な変更点

#### インポートの変更
```typescript
// Before (Material-UI v4)
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Paper from '@material-ui/core/Paper'
import { Button } from "@material-ui/core"
import Grid from '@material-ui/core/Grid'

// After (MUI v5)
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
```

#### スタイリング手法の変更
```typescript
// Before: withStyles HOC
const styles = ({ breakpoints, palette, spacing }: Theme) => createStyles({
  root: {
    flexGrow: 1,
    paddingTop: 30,
    // ...
  }
})

// After: styled() API
const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  paddingTop: 30,
  paddingLeft: 5,
  paddingRight: 5,
  paddingBottom: 5,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: 600
  },
  marginLeft: "auto",
  marginRight: "auto",
}))
```

### 3.2 日付ピッカーの移行
```typescript
// Before: @material-ui/pickers
import { DateTimePicker } from '@material-ui/pickers'

// After: @mui/x-date-pickers
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
```

### 3.3 コンポーネント修正の詳細

#### Main.tsx の変更
1. `withStyles` → `styled` APIに変更
2. `WithStyles` 型の削除
3. テーマアクセス方法の変更
4. LocalizationProvider の追加

#### 各コンポーネントの変更点
- **BeginDateTime.tsx**: DateTimePicker のプロパティ名変更
- **EndDateTime.tsx**: 同上
- **KeywordText.tsx**: TextField のプロパティは互換性あり
- **TimeZone.tsx**: Select のプロパティは互換性あり
- **History.tsx**: List系コンポーネントは互換性あり
- **Usage.tsx**: Typography は互換性あり

## フェーズ4: テストの移行

### 4.1 Jest → Vitest への移行
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

### 4.2 テストファイルの更新
- `__tests__/lib.ts` → `src/__tests__/lib.test.ts`
- describe.each の構文はそのまま使用可能
- moment.js のテストロジックは変更不要

## フェーズ5: 最適化オプション

### 5.1 moment.js → dayjs への移行（オプション）
```typescript
// 軽量化のため、moment.js から dayjs への移行を検討
// ただし、timezone処理の互換性要確認

// Before
import moment from "moment-timezone"

// After  
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
```

### 5.2 Bundle Size 最適化
- Tree shakingの活用
- Dynamic importの検討
- Bundle Analyzerでサイズ確認

## 実行手順

### Step 1: バックアップ
```bash
git checkout -b nextjs-to-vite
```

### Step 2: 依存関係の更新
```bash
npm uninstall next @material-ui/core @material-ui/icons @material-ui/pickers @material-ui/styles @date-io/moment
npm install react@18 react-dom@18 @mui/material @mui/icons-material @mui/x-date-pickers @emotion/react @emotion/styled
npm install -D vite @vitejs/plugin-react vitest @testing-library/react @testing-library/jest-dom
```

### Step 3: 設定ファイルの作成
1. `vite.config.ts` 作成
2. `index.html` 作成
3. `src/main.tsx` 作成

### Step 4: ファイル移動とリファクタリング
1. `src/` ディレクトリ作成
2. コンポーネントファイルの移動
3. インポートパス修正
4. MUI v5 対応

### Step 5: テストと動作確認
```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド確認  
npm run test     # テスト実行
```

## 注意点とリスク

### 破壊的変更
1. **Material-UI v4 → MUI v5**: スタイリング API の大幅変更
2. **React 16 → 18**: ReactDOM.render の廃止
3. **TypeScript**: より厳密な型チェック

### 互換性の問題
1. moment.js のバージョン差異
2. ブラウザサポート範囲
3. ESModulesの扱い

### テスト項目
- [ ] 日付ピッカーの動作
- [ ] タイムゾーン変換
- [ ] ローカルストレージの永続化
- [ ] X検索URL生成
- [ ] レスポンシブデザイン
- [ ] 履歴機能

## 期待される改善点

1. **開発体験**
   - HMR (Hot Module Replacement) の高速化
   - ビルド時間の短縮
   - TypeScript型チェックの高速化

2. **パフォーマンス**
   - バンドルサイズの最適化
   - Tree shaking の向上
   - 起動時間の短縮

3. **保守性**
   - 最新のReactエコシステム対応
   - 長期サポート対象技術の採用

## 完了条件
- [ ] 既存機能がすべて動作する
- [ ] テストがすべて通る
- [ ] ビルドが正常に完了する
- [ ] 静的サイトとして配信可能
- [ ] パフォーマンスが向上している