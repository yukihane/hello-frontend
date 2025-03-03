document.addEventListener("DOMContentLoaded", () => {
  const dndArea = document.getElementById("dnd-area");
  const form = document.getElementById("upload-form");
  const imageData = document.getElementById("image-data");
  // 選択されたファイルを保持する変数
  let selectedFile = null;

  // ファイル選択ダイアログを開く
  dndArea.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        selectedFile = file; // ファイル参照を保存
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
      selectedFile = file; // ファイル参照を保存
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

      // 説明テキストを非表示に
      const text = dndArea.querySelector(".text");
      if (text) {
        text.style.display = "none";
      }

      // 新しい画像を追加
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "プレビュー";
      dndArea.insertBefore(img, dndArea.firstChild);

      // フォームに画像データを設定
      imageData.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // フォームのsubmit処理
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("画像を選択してください");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); // ファイルを直接追加

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("アップロード成功");
      } else {
        alert("アップロードに失敗しました");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("エラーが発生しました");
    }
  });
});
