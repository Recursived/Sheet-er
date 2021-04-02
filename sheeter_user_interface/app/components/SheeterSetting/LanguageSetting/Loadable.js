/**
 *
 * Asynchronously loads the component for BottomBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
