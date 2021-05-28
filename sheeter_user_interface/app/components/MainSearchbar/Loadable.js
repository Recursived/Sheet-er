/**
 *
 * Asynchronously loads the component for MainSearchbar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
