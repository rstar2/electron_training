<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <!-- The activator slot - Note the 'on' slot-prop is needed
          as it handles the click and etc... listeners -->
    <template v-slot:activator="{ on }">
      <v-btn flat color="purple" dark v-on="on">New Training Log</v-btn>
    </template>

    <!--  The default slot - e.g the dialog's content -->
    <v-card>
      <v-card-title>
        <span class="headline">New Training Log</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Title*" v-model="title" :rules="[v => !!v || 'Title is required']" required></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  label="Description*"
                  v-model="description"
                  :rules="[v => !!v || 'Description is required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Start Date*"
                  v-model="startDate"
                  :rules="[v => !!v || 'Start Date is required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Due Date" v-model="dueDate"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click="dialog = false">Close</v-btn>
        <v-btn color="primary" flat @click="submit">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,

      name: '',
      email: ''
    };
  },
  watch: {
    // every time the dialog is show reset the form
    dialog(isShown) {
      if (isShown) {
        // this.$refs.form.reset(); // this resets them to 'undefined',
        // so use resetValidation() and manually reset the state
        this.$refs.form.resetValidation();
        this.email = this.name = '';
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.$emit('create', { name: this.name, email: this.email });
      }
    }
  }
};
</script>
