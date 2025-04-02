// Bootstrap Modalの型定義
declare namespace bootstrap {
  class Modal {
    constructor(element: HTMLElement);
    show(): void;
    hide(): void;
  }
}

// greet関数の型定義
declare function greet(name: string): string;
