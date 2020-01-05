/**
 *
 * Asynchronously loads the component for Sheet
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
