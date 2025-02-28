document.addEventListener("DOMContentLoaded", () => {
  const dndArea = document.getElementById("dnd-area");

  // ファイル選択ダイアログを開く
  dndArea.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        displayImage(file);
      }
    };
    input.click();
  });

  // ドラッグ&ドロップの処理
  dndArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dndArea.classList.add("dragover");
  });

  dndArea.addEventListener("dragleave", () => {
    dndArea.classList.remove("dragover");
  });

  dndArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dndArea.classList.remove("dragover");

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      displayImage(file);
    }
  });

  // 画像表示の関数
  function displayImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // 既存の画像があれば削除
      const existingImg = dndArea.querySelector("img");
      if (existingImg) {
        existingImg.remove();
      }

      // 新しい画像を追加
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "プレビュー";
      dndArea.insertBefore(img, dndArea.firstChild);
    };
    reader.readAsDataURL(file);
  }
});
