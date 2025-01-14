## 使用

```bash
pnpm add @repo/view
```

### 启动

```bash
pnpm dev
```

### 引入

```tsx
//样式
import "@repo/view/styles.css";

//react
import { ReactView } from "@repo/view";

const App = () => {
  return <ReactView.Root className="w-full h-full" />;
};
```

### icon

颜色：#1b1b1f
大小：20px
