/**
 *
 * Asynchronously loads the component for NavDropMenu
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
