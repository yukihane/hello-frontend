document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toastButton").addEventListener("click", () => {
    toast("Hello, Toast!");
  });
});

/**
 * toastを表示します。
 * @param {string} message 表示するメッセージ
 */
const toast = (message) => {
  const toastContainer = document.getElementById("toastContainer");
  const template = document.getElementById("toastTemplate");
  const toastClone = template.content.cloneNode(true);
  const toastMessage = toastClone.querySelector(".toast-message");
  toastMessage.textContent = message;

  toastContainer.appendChild(toastClone);

  const toastElement = toastContainer.lastElementChild;
  const toast = new bootstrap.Toast(toastElement, { delay: 5000 });
  toast.show();

  toastElement.addEventListener("hidden.bs.toast", () => {
    toastElement.remove();
  });
};
