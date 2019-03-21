const messages = {
  en: {
    routes: {
      home: 'Home',
      about: 'About',
      logs: 'TrainingLogs',
      signup: 'SignUp',
      dashboard: 'Dashboard'
    },
    Navigation: {
      login: 'Login',
      logout: 'Logout',
      register: 'Register'
    },
    DialogLogin: {
      email: 'Email',
      name: 'Name',
      password: 'Password',
      login: 'Login',
      register: 'Register',
      errors: {
        email: {
          valid: 'Email must be valid email address'
        }
      }
    },
    TrainingLog: {
      header: 'Training Log: ',
      missing: 'No such log'
    },
    TrainingLogs: {
      title: 'Training Logs',
      log: {
        new: 'New Log',
        view: 'View',
        dueBy: 'Due by {0}'
      },
      info: {
        added: 'Training Log project added',
        added_error: 'Adding new Training Log project failed',
        removed: 'Training Log project removed',
        removed_error: 'Removing a Training Log project failed'
      }
    },
    DialogNewTrainingLog: {
      title: 'New Training Log',
      log: {
        title: 'Title',
        description: 'Description',
        startDate: 'Start Date',
        dueDate: 'Due Date'
      },
      create: 'Create'
    },

    // common strings
    close: 'Close',
    remove: 'Remove',
    submit: 'Submit',
    required_fields: 'indicates required field',
    errors: {
      required: '{0} is required',
      min: '{0} must be at least {1} characters'
    },

    datePicker: {
      day: {
        '0': 'Monday',
        '1': 'Tuesday',
        '2': 'Wednesday',
        '3': 'Thursday',
        '4': 'Friday',
        '5': 'Saturday',
        '6': 'Sunday'
      },
      month: {
        '0': 'January',
        '1': 'February',
        '2': 'March',
        '3': 'April ',
        '4': 'May',
        '5': 'June',
        '6': 'July',
        '7': 'August',
        '8': 'September',
        '9': 'October',
        '10': 'November',
        '11': 'December'
      }
    },

    // Vuetify custom strings
    // localize the Vuetify language keys,
    // also in the Vuetify plugin it is tweaked to use the VueI18n translate method
    // Unfortunately the Vuetify DatePicker is using formatting/localization functions, so there are no language keys for it
    $vuetify: {
      dataTable: {
        rowsPerPageText: 'Rows per page:'
      }
    }
  }
};

export default messages;
