/**
 *
 * Asynchronously loads the component for DashboardCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
