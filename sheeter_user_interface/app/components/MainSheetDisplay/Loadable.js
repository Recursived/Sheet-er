/**
 *
 * Asynchronously loads the component for MainSheetDisplay
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
