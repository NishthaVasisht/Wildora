declare module '@barba/core' {
    export interface BarbaData {
      next: { container: HTMLElement };
      current: { container: HTMLElement };
    }
  
    interface Transition {
      name: string;
      enter?: (data: BarbaData) => void | Promise<void>;
      leave?: (data: BarbaData) => void | Promise<void>;
    }
  
    interface BarbaInitOptions {
      transitions?: Transition[];
      prevent?: (args: { el: HTMLElement }) => boolean;
    }
  
    const barba: {
      init: (options: BarbaInitOptions) => void;
      go: (href: string) => void;
    };
  
    export default barba;
  }
  