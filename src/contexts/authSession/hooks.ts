import { useContext } from 'react';

import { AuthContext } from './context';

/** The signed-in user, as restored from the session cookie on mount. */
export const useAuthSession = () => useContext(AuthContext);
