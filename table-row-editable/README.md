- tableの行を編集欄として用いる
- 保存ボタンは無く、暗黙的に保存要求したい

このような状態で、行単位の保存要求はできるのか？を考えたい。

基本的には入力欄からフォーカスが外れたのをトリガーとして保存要求を行うことになるはず。
ただし、行を続けて編集する意思がある場合はまだ保存要求に行ってはNG。

