// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    updateCart: 'done.invoke.cart.updatingCart:invocation[0]';
  };
  missingImplementations: {
    actions: 'addItem' | 'editItem' | 'removeItem';
    delays: never;
    guards: never;
    services: 'updateCart';
  };
  eventsCausingActions: {
    addItem: 'ADD_ITEM';
    editItem: 'EDIT_ITEM';
    removeItem: 'REMOVE_ITEM';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    updateCart: 'ADD_ITEM' | 'EDIT_ITEM' | 'REMOVE_ITEM';
  };
  matchesStates: 'idle' | 'updatingCart';
  tags: never;
}
