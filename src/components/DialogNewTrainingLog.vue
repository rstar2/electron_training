<template>
  <!-- Close on ESC and submit on ENTER -->
  <v-dialog v-model="dialog" persistent max-width="600px" @keydown.esc="dialog = false">
    <!-- The activator slot - Note the 'on' slot-prop is needed
          as it handles the click and etc... listeners -->
    <template v-slot:activator="{ on }">
      <v-btn flat color="purple" dark v-on="on">
        <!-- Insert default slot, with predifined text if not applied in the parent -->
        <slot>
          New Training Log
        </slot>
      </v-btn>
    </template>

    <!--  The default slot - e.g the dialog's content -->
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('DialogNewTrainingLog.title') }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  :label="$t('DialogNewTrainingLog.log.title') + '*'"
                  v-model="title"
                  :rules="[v => !!v || this.$t('errors.required', [this.$t('DialogNewTrainingLog.log.title')])]"
                  required
                  @keyup.enter="submit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :label="$t('DialogNewTrainingLog.log.description') + '*'"
                  v-model="description"
                  :rules="[v => !!v || this.$t('errors.required', [this.$t('DialogNewTrainingLog.log.description')])]"
                  required
                  @keyup.enter="submit"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  v-model="startDatePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="startDate"
                    :label="$t('DialogNewTrainingLog.log.startDate') + '*'"
                    prepend-icon="mdi-calendar"
                    readonly
                    required
                    :rules="[v => !!v || this.$t('errors.required', [this.$t('DialogNewTrainingLog.log.startDate')])]"
                    @keyup.enter="submit"
                  ></v-text-field>
                  <v-date-picker v-model="startDate" @input="startDatePicker = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  v-model="dueDatePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="dueDate"
                    :label="$t('DialogNewTrainingLog.log.dueDate')"
                    prepend-icon="mdi-calendar"
                    readonly
                    required
                    @keyup.enter="submit"
                  ></v-text-field>
                  <v-date-picker v-model="dueDate" @input="dueDatePicker = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <small>*{{ $t('required_fields') }}</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click="dialog = false">{{ $t('close') }}</v-btn>
        <v-btn color="primary" flat @click="submit">{{ $t('DialogNewTrainingLog.create') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { weekdayFormatter } from '../localization';

export default {
  name: 'DialogNewTrainingLog',
  data() {
    return {
      // control the visibility of the dialog
      dialog: false,

      //
      title: '',
      description: '',
      startDate: '',
      dueDate: '',

      // control the Date pickers
      startDatePicker: false,
      dueDatePicker: false
    };
  },
  watch: {
    // every time the dialog is show reset the form
    dialog(isShown) {
      if (isShown) {
        // this.$refs.form.reset(); // this resets them to 'undefined',
        // so use resetValidation() and manually reset the state
        this.$refs.form.resetValidation();
        this.title = this.description = this.startDate = this.dueDate = '';
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.$emit('create', {
          title: this.title,
          description: this.description,
          startDate: this.startDate,
          dueDate: this.dueDate
        });
      }
    }
  }
};
</script>
