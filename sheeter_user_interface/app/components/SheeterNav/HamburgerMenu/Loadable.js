/**
 *
 * Asynchronously loads the component for HamburgerMenu
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
