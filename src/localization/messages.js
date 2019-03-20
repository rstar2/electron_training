const messages = {
  en: {
    routes: {
      home: 'Home',
      about: 'About',
      logs: 'TrainingLogs',
      signup: 'SignUp'
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

    // Vuetify custom strings - in Vuetify also must be tweaked
    // TODO: get the used strings
    $vuetify: {
      datePicker: {
        month: 'JANUARY !!!',
        day: 'Sunday'
      }
    }
  }
};

export default messages;
