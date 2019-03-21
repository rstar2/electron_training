# TODOs

- ~~show error on failed actions - login/.../new_log~~
- show loading indicator
- ~~move 'logs' to global Vuex state~~
    > use namespaces Vuex module 'logs'
- ~~save/retrieve startData/dueDate as firebase-Timestamp~~
- ~~login with Firebase - Google OAuth2~~
    > create/configure Google OAuth2 app and etc...
- login with Firebase - Facebook/Google OAuth2
- ~~browser auto-prefill/suggest form inputs~~
    > the inputs have to be named
- ~~localize~~
    > use VueI18n
- ~~localize using lazy-loading of a locale~~
    > use the Webpack dynamic modules loading feature
- ~~localize Vuetify~~ 
    > https://vuetifyjs.com/en/framework/internationalization, and for DatePicker tweak the VDatePicker default prop formatters
- ~~TrainingLog single log page~~
- TrainingLog single log page - real data from the 'log'
- ~~fix Vuex to work in strict mode~~
    > don't store the fireBase.User directly in the Vuex state as its props are internally mutated by Firebase (which is against the strict mode, to happen always in mutation handlers)
- implement user's dashboard - friends/request/etc...