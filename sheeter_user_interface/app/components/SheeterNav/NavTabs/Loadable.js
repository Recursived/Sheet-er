/**
 *
 * Asynchronously loads the component for NavTabs
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
