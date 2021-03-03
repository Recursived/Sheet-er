/**
 *
 * Asynchronously loads the component for SheeterEditor
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
