/**
 *
 * Asynchronously loads the component for SheetPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
