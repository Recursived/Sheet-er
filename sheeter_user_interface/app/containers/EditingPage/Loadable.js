/**
 *
 * Asynchronously loads the component for EditingPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
