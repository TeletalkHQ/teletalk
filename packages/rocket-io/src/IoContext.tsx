import { createContext } from 'react';

import type { IoContextInterface } from './types';

export const IoContext = createContext<IoContextInterface<any>>({
  createConnection: () => undefined,
  getConnection: () => undefined,
  registerSharedListener: () => () => {},
});
