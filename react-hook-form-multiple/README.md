# React Hook Form Multiple Users

React Hook Formを使用して動的にユーザー情報を入力できるフォームのサンプルアプリケーションです。

## 機能

- ユーザー名と年齢を入力するフォーム
- 「追加」ボタンで新しいユーザー入力欄を動的に追加
- 「送信」ボタンでフォームデータをJSON形式でコンソールに出力
- TypeScriptによる型安全性

## 起動方法

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

ブラウザで `http://localhost:5173` にアクセスし、ブラウザの開発者ツールのコンソールで送信データを確認できます。

## 技術解説：React Hook Formでの動的配列管理

### 基本的な仕組み

このアプリケーションでは、`useForm`と`useFieldArray`を組み合わせて動的に増減する配列データを管理しています。

#### 1. useFormの設定

```typescript
const { control, handleSubmit, register } = useForm<FormData>({
  defaultValues: {
    users: [{ name: '', age: '' }] // 初期値として1人分のデータを設定
  }
})
```

- `control`: フォーム全体の状態を管理するオブジェクト
- `defaultValues`: フォームの初期値。配列の場合は配列として定義

#### 2. useFieldArrayの活用

```typescript
const { fields, append } = useFieldArray({
  control,
  name: 'users' // フォームデータ内の配列のフィールド名
})
```

**重要なポイント:**
- `fields`: 現在の配列の各要素。各要素には一意の`id`が自動で付与される
- `append`: 配列に新しい要素を追加する関数
- `control`を通じて`useForm`と連携している

#### 3. 動的レンダリング

```typescript
{fields.map((field, index) => (
  <div key={field.id}> {/* 必ずfield.idをkeyに使用 */}
    <input
      {...register(`users.${index}.name` as const)}
      // `users.${index}.name` でネストした配列の特定要素にアクセス
    />
    <input
      {...register(`users.${index}.age` as const)}
    />
  </div>
))}
```

**キーポイント:**
- `key={field.id}`: Reactの効率的な再レンダリングのため必須
- `register`でのパス指定: `users.${index}.fieldName`の形式
- `as const`でTypeScriptの型推論を正確にする

#### 4. データの流れ

1. **初期化**: `defaultValues`で配列の初期状態を設定
2. **表示**: `fields`配列をmapでレンダリング
3. **追加**: `append()`で新しい要素を配列に追加
4. **入力**: `register`で各フィールドを登録・管理
5. **送信**: `handleSubmit`で全配列データを取得

#### 5. その他の便利な機能

useFieldArrayには他にも便利な機能があります：

```typescript
const { fields, append, remove, insert } = useFieldArray({
  control,
  name: 'users'
})

// 要素を削除
const removeUser = (index: number) => {
  remove(index)
}

// 特定位置に挿入
const insertUser = (index: number) => {
  insert(index, { name: '', age: '' })
}
```

この仕組みにより、配列の長さが動的に変わっても、react-hook-formが各フィールドの状態を適切に管理してくれます。

## useFieldArrayの設計思想と用途

### useFieldArrayが解決する課題

`useFieldArray`は以下のようなケースで使用することを意図して設計された機能です：

#### 主な使用場面

1. **動的な配列データの管理**
   - ユーザーが任意の数の項目を追加・削除できるフォーム
   - 例：連絡先リスト、商品一覧、タスクリスト、家族構成など

2. **複雑なネストした構造**
   ```typescript
   // 例：注文フォームの商品リスト
   {
     customerName: "田中太郎",
     items: [
       { productName: "商品A", quantity: 2, price: 1000 },
       { productName: "商品B", quantity: 1, price: 2000 }
     ]
   }
   ```

3. **一括操作が必要なフォーム**
   - 複数のレコードを同時に編集
   - 例：従業員情報の一括更新、設定項目の複数選択など

#### 従来の問題点と解決

**useState だけでは困難だった課題:**

```typescript
// 従来の方法（複雑で管理が困難）
const [users, setUsers] = useState([{ name: '', age: '' }])
const [errors, setErrors] = useState({})
const [touched, setTouched] = useState({})

// 項目追加時に手動で状態管理
const addUser = () => {
  setUsers([...users, { name: '', age: '' }])
  // エラー状態、タッチ状態も手動で管理する必要がある
}
```

**useFieldArrayによる解決:**

```typescript
// useFieldArrayで簡潔に
const { fields, append, remove } = useFieldArray({
  control,
  name: 'users'
})

// バリデーション、状態管理は自動
const addUser = () => append({ name: '', age: '' })
```

#### 具体的なメリット

1. **状態管理の自動化**
   - 各フィールドのバリデーション状態
   - フォームの dirty/touched 状態
   - エラーメッセージの管理

2. **パフォーマンス最適化**
   - 必要な部分のみ再レンダリング
   - 大量のデータでも効率的

3. **型安全性**
   - TypeScriptと組み合わせた完全な型チェック
   - ネストした配列でも型推論が効く

4. **豊富な操作メソッド**
   ```typescript
   const { fields, append, prepend, remove, insert, swap, move } = useFieldArray({
     control,
     name: 'items'
   })
   ```

#### 実際の用途例

- **ECサイトの買い物カゴ**
- **アンケートの動的質問項目**
- **プロジェクト管理のタスクリスト**
- **履歴書の職歴・学歴欄**
- **設定画面の複数項目管理**

つまり、`useFieldArray`は「配列データを含むフォームを簡潔かつ安全に管理する」ために設計された、React Hook Formの核心的な機能の一つです。

## 使用技術

- React 19.1.1
- React Hook Form 7.62.0
- TypeScript 5.8.3
- Vite 7.1.5

## プロジェクト構成

```
src/
├── App.tsx          # メインコンポーネント（動的フォーム）
├── main.tsx         # エントリーポイント
├── App.css          # スタイル
└── vite-env.d.ts    # Vite用型定義
```
