// @ts-check
import { greet } from "./script.js";

/**
 * モーダルダイアログのイベントハンドラを設定
 */
export function setupModalHandlers() {
  // モーダルインスタンス取得
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));

  // 「はい」ボタン処理
  const confirmYes = document.getElementById("confirmYes");
  if (confirmYes) {
    confirmYes.addEventListener("click", () => {
      const message = greet("ユーザー");
      console.log(message);
      modal.hide(); // ダイアログを閉じる
    });
  }

  // 「いいえ」ボタン処理
  const confirmNo = document.getElementById("confirmNo");
  if (confirmNo) {
    confirmNo.addEventListener("click", () => {
      modal.hide(); // ダイアログを閉じる
    });
  }
}
