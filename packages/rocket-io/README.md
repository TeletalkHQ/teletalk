# rocket-io

<a href="https://github.com/AbdUlHamedMaree/rocket-io/actions/workflows/release.yml">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/AbdUlHamedMaree/rocket-io/release.yml?logo=github">
</a>
<a href="https://www.npmjs.com/package/rocket-io">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/rocket-io?logo=npm">
</a>
<a href="https://www.npmjs.com/package/rocket-io">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/rocket-io?logo=npm">
</a>
<a href="https://www.npmjs.com/package/rocket-io">
  <img alt="NPM License" src="https://img.shields.io/npm/l/rocket-io">
</a>
<a href="https://jsr.io/@mrii/rocket-io">
  <img alt="JSR Version" src="https://img.shields.io/jsr/v/%40mrii/rocket-io?logo=jsr">
</a>
<a href="https://github.com/AbdUlHamedMaree/rocket-io">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/AbdUlHamedMaree/rocket-io">
</a>

Wrapper for socket.io-client in ReactJs - works for React Native.

This package is using [`lbundle`](https://github.com/AbdUlHamedMaree/lbundle) as bundler ✨

# Install

### NPM registry

```sh
# npm
npm i socket.io-client rocket-io

# yarn
yarn add socket.io-client rocket-io

# bun
bun install socket.io-client rocket-io

# pnpm
pnpm i socket.io-client rocket-io
```

### JSR registry

```bash
# deno
deno add @mrii/rocket-io

# jsr
npx jsr add @mrii/rocket-io
```

# Usage

## Initialization

Call the `createSocketHooks` to get an instance of the hooks with the socket:

`socket.io-hooks.ts`

```tsx
import { io } from 'socket.io-client';
import { createSocketHooks } from 'rocket-io';

const socketInstance = io(/* ... */);

// exports the hooks
export const {
  socket,
  useDisconnectOnUnmount,
  useSocket,
  useOn,
  useOnce,
  useEmit,
  useImmediateEmit,
  useEmitEffect,
} = createSocketHooks(socketInstance);
```

### Alternative without `io`

you can pass `io` arguments to `createSocketHooks` and it will create the socket internally:

`socket.io-hooks.ts`

```tsx
export const {
  /* ... */
} = createSocketHooks(url, options);

// or with only options
export const {
  /* ... */
} = createSocketHooks(options);
```

### Alternative without initial socket - Lazy Initialization

you can delay the creating of the socket if you need information from the react tree, use `useInitSocket` to initialize it:

`socket.io-hooks.ts`

```tsx
export const {
  useInitSocket,
  /* ... */
} = createSocketHooks();
```

Later on in the App

`app.tsx`

```tsx
/* ... */

const App: React.FC = () => {
  /* ... */

  useInitSocket('<url>', { auth: { token } });

  // if the token isn't ready, or you don't want to initialize the socket yet, pass the `ready` arg

  useInitSocket('<url>', { auth: { token } }, isReady);

  /* ... */
};
```

### Using the hooks

`component.tsx`

```tsx
/* ... */

export const Component: React.FC = () => {
  /* ... */

  useOn('event', data => {
    console.log('[event] fired with: ', data);
  });

  useImmediateEmit('event-2', 'event-2 fired immediately');

  const emit = useEmit();
  /* ... */

  return <button onClick={() => emit('event', 'event data')}>emit event</button>;
};
```

## TypeScript Support

You can pass your events map to `createSocketHooks` to provide you with safe listeners and emission events:

`socket.io-hooks.ts`

```tsx
export type EmitEvents = {
  send_message: (message: string) => void;
};

export type ListenEvents = {
  message: (message: string) => void;
};

export const {
  /* ... */
} = createSocketHooks<EmitEvents, ListenEvents>();
```

`component.tsx`

```tsx
/* ... */

export const Component: React.FC = () => {
  /* ... */

  useOn(
    /* typed! */
    'message',

    /* data type is provided! */
    data => {
      console.log('[message] fired with: ', data);
    }
  );

  useImmediateEmit(
    /* typed! */
    'send_message',

    /* emit arguments type is provided! */
    'message'
  );
};
```

# Examples

## Eager Initialization - casual applications

create and export the hooks:

`socket.io-hooks.ts`

```tsx
import { createSocketHooks } from 'rocket-io';

// exports the hooks
export const {
  socket,
  useDisconnectOnUnmount,
  useSocket,
  useOn,
  useOnce,
  useEmit,
  useImmediateEmit,
  useEmitEffect,
} = createSocketHooks('<url>', {
  /* options */
});
```

disconnect on application unmount:

`app.tsx`

```tsx
/* ... */

const App: React.FC = () => {
  /* ... */

  useDisconnectOnUnmount();

  /* ... */
};
```

use the hooks:

`component.tsx`

```tsx
/* ... */

export const Component: React.FC = () => {
  /* ... */

  // listen to event
  useOn('event', data => {
    console.log('[event] fired with: ', data);
  });

  // listen to event once
  useOn('ready', () => {
    console.log('[ready] event fired');
  });

  // emit event when `Component` mounts
  useImmediateEmit('event-2', 'event-2 fired immediately');

  // emit event when dependencies array changes - similar to `useEffect(, deps)`
  useEmitEffect([message], 'event-3', 'event-3 fired with new message: ' + message);

  // get emit function
  const emit = useEmit();

  /* ... */

  return <button onClick={() => emit('event', 'event data')}>emit event</button>;
};
```

## Lazy Initialization - authorized sockets

create and export the hooks:

`socket.io-hooks.ts`

```tsx
import { createSocketHooks } from 'rocket-io';

// exports the hooks
export const {
  useInitSocket,
  useDisconnectOnUnmount,
  useSocket,
  useOn,
  useOnce,
  useEmit,
  useImmediateEmit,
  useEmitEffect,
} = createSocketHooks();
```

initialize the socket once args is ready:

`app.tsx`

```tsx
/* ... */

const App: React.FC = () => {
  /* ... */

  useInitSocket('<url>', { auth: { token } }, typeof token === 'string');

  useDisconnectOnUnmount();

  /* ... */
};
```

and then use the hooks normally

## Multiple Sockets

you can create two socket hooks by calling `createSocketHooks`:

`admin-socket-hooks.ts`

```tsx
import { createSocketHooks } from 'rocket-io';

export const adminSocketHooks = createSocketHooks('<admin-url>', {
  /* admin options */
});
```

`products-socket-hooks.ts`

```tsx
import { createSocketHooks } from 'rocket-io';

export const productsSocketHooks = createSocketHooks('<products-url>', {
  /* products options */
});
```

# API

<!-- ## `createSocketHooks`

function that creates a socket instance and return the hooks.

| Property     | Type                                       | Default     | Description                      | Version |
| ------------ | ------------------------------------------ | ----------- | -------------------------------- | ------- |
| arg0:uri     | `string?`                                  | `undefined` | socket uri (`io(uri)`)           | 0.0.1     |
| arg1:options | `Partial<ManagerOptions & SocketOptions>?` | `undefined` | socket options (`io(, options)`) | 0.0.1     |

return: `void`

--- -->

## `socket`

the socket in case you initialized it using `createSocketHooks`.

type `Socket<TListenEvents, TEmitEvents>`.

it will be `undefined` in case of Lazy Initialization.

---

## `useInitSocket`

hook to init your socket in the app in case of Lazy Initialization.

| Property     | Type                                       | Default     | Description                      | Version |
| ------------ | ------------------------------------------ | ----------- | -------------------------------- | ------- |
| arg0:uri     | `string`                                   | `undefined` | socket uri (`io(uri)`)           | 0.0.1   |
| arg1:options | `Partial<ManagerOptions & SocketOptions>?` | `undefined` | socket options (`io(, options)`) | 0.0.1   |
| arg2:start   | `boolean?`                                 | `true`      | start initializing the socket    | 0.0.1   |

return: `void`

---

## `useDisconnectOnUnmount`

hook to disconnect and destroy the socket instance on unmounting, use in your root app if needed.

take no args

return: `void`

---

## `useSocket`

hook that returns the instance of the socket.

take no args

return: `Socket<TListenEvents, TEmitEvents>`

it might return `undefined` in case of Lazy Initialization

---

## `useOn`

hook to listen on every event emission.

| Property      | Type       | Default     | Description                                                                      | Version |
| ------------- | ---------- | ----------- | -------------------------------------------------------------------------------- | ------- |
| arg0:key      | `string`   | `undefined` | event key to listen on (`socket.on(key)`)                                        | 0.0.1   |
| arg1:listener | `Function` | `undefined` | listener that will will be called when the event fires (`socket.on(, listener)`) | 0.0.1   |

return: `void`

---

## `useOnce`

hook to listen once on event emission.

| Property      | Type       | Default     | Description                                                                        | Version |
| ------------- | ---------- | ----------- | ---------------------------------------------------------------------------------- | ------- |
| arg0:key      | `string`   | `undefined` | event key to listen on (`socket.once(key)`)                                        | 0.0.1   |
| arg1:listener | `Function` | `undefined` | listener that will will be called when the event fires (`socket.once(, listener)`) | 0.0.1   |

return: `void`

---

## `useEmit`

hook that return the `socket.emit` function, or a lazy emission function in case of Lazy Initialization,

lazy emission function will emit if socket is available, or record event until the socket is available.

take no args.

return: `socket.emit` function.

---

## `useImmediateEmit`

hook to emit an event once.

| Property | Type        | Default     | Description                                             | Version |
| -------- | ----------- | ----------- | ------------------------------------------------------- | ------- |
| arg0:key | `string`    | `undefined` | event key to emit (`socket.emit(key)`)                  | 0.0.1   |
| ...args  | `unknown[]` | `undefined` | extra arguments to emit them (`socket.emit(, ...args)`) | 0.0.1   |

return: `void`

---

## `useEmitEffect`

hook to emit an event on mount and once the dependency array changes.

| Property  | Type        | Default     | Description                                              | Version |
| --------- | ----------- | ----------- | -------------------------------------------------------- | ------- |
| arg0:deps | `unknown[]` | `undefined` | dependency array to listen on (like `useEffect(, deps)`) | 0.0.1   |
| arg1:key  | `string`    | `undefined` | event key to emit (`socket.emit(key)`)                   | 0.0.1   |
| ...args   | `unknown[]` | `undefined` | extra arguments to emit them (`socket.emit(, ...args)`)  | 0.0.1   |

return: `void`

# NOTES

- try to use the hooks (`useEmit`, `useOn`, ...) instead of getting the `socket` from `useSocket` and use it, because there some extra cases handled in those hooks.

- `useInitSocket` will not reinitialize the socket in case it's already initialized, utilize the third argument `ready` to indicate when you have all of the required properties to start initializing.

- no need to use `useCallback` with `useOn(, cb)` or `useOnce(, cb)` because it's handled internally.

- changing the event name during renders will not affect `useImmediateEmit(ev)` or `useEmitEffect(, ev)`, so if you want such behavior make sure to add it to the deps array using `useEmitEffect([ev], ev)`.
