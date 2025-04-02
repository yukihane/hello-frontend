// @ts-check

/**
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
  return `Hello, ${name}`;
}

// 型エラーのテスト
const result = greet(123); // 数値を渡すと型エラーが発生する
