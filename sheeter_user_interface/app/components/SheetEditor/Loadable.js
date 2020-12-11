/**
 *
 * Asynchronously loads the component for SheetEditor
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
