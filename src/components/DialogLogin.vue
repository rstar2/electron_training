<template>
  <v-dialog v-model="active" persistent max-width="600px">
    <!--  The default slot - e.g the dialog's content -->
    <v-card>
      <v-card-title>
        <span class="headline" v-text="isRegister ? 'Register' : 'Login'"></span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Email*"
                  v-model="email"
                  :rules="[
                    v => !!v || 'Email is required',
                    v => (v && v.length <= 10) || 'Email must be valid email address'
                  ]"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="isRegister">
                <v-text-field
                  label="Name*"
                  v-model="name"
                  :rules="[
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 5) || 'Name must be at least 5 characters'
                  ]"
                  required
                ></v-text-field>
              </v-flex>
              <v-text-field
                label="Password*"
                v-model="password"
                :rules="[
                  v => !!v || 'Password is required',
                  v => (v && v.length >= 4) || 'Password must be at least 4 characters'
                ]"
                required
              ></v-text-field
              >>
            </v-layout>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click="active = false">Close</v-btn>
        <v-btn
          color="primary"
          flat
          @click="submit"
          v-text="isRegister ? 'Register' : 'Login'"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isRegister: { type: Boolean, default: false },
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  computed: {
    active: {
      // getter
      get: function() {
        return !!this.show;
      },
      // setter
      set: function(isShown) {
        if (!isShown) {
          // this is as if this.show = false, BUT mutating the parent's passed prop
          this.$emit('update:show', false);
        }
      }
    }
  },
  watch: {
    // every time the dialog is show reset the form
    active(isShown) {
      if (isShown) {
        // this.$refs.form.reset(); // this resets them to 'undefined',
        // so use resetValidation() and manually reset the state
        this.$refs.form.resetValidation();
        this.email = this.name = this.password = '';
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.active = false;
        this.$emit('action', {
          email: this.email,
          password: this.password,
          name: this.name,
          isRegister: this.isRegister
        });
      }
    }
  }
};
</script>
