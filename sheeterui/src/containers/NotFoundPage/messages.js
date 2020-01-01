/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  helmetNotFoundPageTitle: {
    id: `${scope}.helmetNotFoundPageTitle`,
    defaultMessage: 'Sheeter - 404',
  },
  notFoundPage: {
    id: `${scope}.notFoundPage`,
    defaultMessage: 'Page introuvable',
  },
  sorryThisPageIsUnavailable: {
    id: `${scope}.sorryThisPageIsUnavailable`,
    defaultMessage: "Nous sommes désolés, cette page est introuvable.",
  },
  sorrySubheader: {
    id: `${scope}.sorrySubheader`,
    defaultMessage:
      'Le lien cliqué est peut-être corrompu ou la page que vous avez tenté d\'accéder n\'est plus disponible',
  },
});
