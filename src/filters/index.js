import Vue from 'vue';
import { format } from 'date-fns';

export const DATE_FORMAT = 'MM/DD/YYYY';

const dateFormat = value => {
  if (!value) return '';

  if (value instanceof Date) {
    return format(value, DATE_FORMAT);
  }

  return '' + value;
};

export default dateFormat;

// register global filter
Vue.filter('date', dateFormat);

// register as global mixin also
Vue.mixin({
  methods: {
    filterDate(date) {
      return Vue.filter('date')(date);
    }
  }
});
