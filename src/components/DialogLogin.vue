<template>
  <v-dialog v-model="active" persistent max-width="600px" @keydown.esc="active = false">
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
                  name="email"
                  v-model="email"
                  :rules="validateRules.email"
                  required
                  @keyup.enter="submit"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 v-if="isRegister">
                <v-text-field
                  label="Name*"
                  v-model="name"
                  :rules="validateRules.name"
                  required
                  @keyup.enter="submit"
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="Password*"
                  name="password"
                  v-model="password"
                  :type="passwordShown ? 'text' : 'password'"
                  :append-icon="passwordShown ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="passwordShown = !passwordShown"
                  :rules="validateRules.password"
                  required
                  @keyup.enter="submit"
                ></v-text-field>
              </v-flex>

              <!-- Implement "Login with Google" -->
              <v-flex xs12 class="text-xs-center">
                <v-divider class="my-3"/>
                <img src="@/assets/sign-in-with-google.png"
                    @click="active = false; loginWithGoogle()"
                    style="width: 50%" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>

      <v-card-actions>
        <!-- <img src="@/assets/sign-in-with-google.png"
            @click="active = false; loginWithGoogle()"
            style="width: 30%" /> -->
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click="active = false">Close</v-btn>
        <v-btn color="primary" flat @click="submit" v-text="isRegister ? 'Register' : 'Login'"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    isRegister: { type: Boolean, default: false },
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordShown: false,

      validateRules: {
        email: [
          v => !!v || 'Email is required',
          v => (v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,7})+$/.test(v)) || 'Email must be valid email address'
        ],
        name: [v => !!v || 'Name is required', v => (v && v.length >= 5) || 'Name must be at least 5 characters'],
        password: [
          v => !!v || 'Password is required',
          //   this is Firebase requirement otherwise it's WEAK_PASSWOrD error
          v => (v && v.length >= 6) || 'Password must be at least 6 characters'
        ]
      }
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
        this.passwordShown = false;
      }
    }
  },
  methods: {
    ...mapActions(['loginWithGoogle']),
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
