import '@total-typescript/ts-reset';
export {};

declare global {
  interface CustomEventMap {
    'sticky-header': { isSticky: boolean };
  }

  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEvent<CustomEventMap[K]>) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEvent<CustomEventMap[K]>) => any,
      options?: boolean | EventListenerOptions,
    ): void;
  }

  type Messages = typeof import('./messages/en.json');
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  declare interface IntlMessages extends Messages {}
}

declare module '@faker-js/faker' {
  interface HelpersModule {
    arrayElement<const T extends readonly string>(args: T[]): T;
    arrayElements<const T extends readonly string>(
      args: T[],
      options: { min: number; max: number },
    ): T[];
  }
}
