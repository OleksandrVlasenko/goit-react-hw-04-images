import Notiflix from 'notiflix';

export const Message = {
  success(message) {
    Notiflix.Notify.success(message);
  },

  failure(message) {
    Notiflix.Notify.failure(message);
  },

  warning(message) {
    Notiflix.Notify.warning(message);
  },
};
