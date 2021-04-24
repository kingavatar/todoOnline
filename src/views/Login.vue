<template>
  <div id="login">
    <b-container fluid class="h-100 w-100 laysize">
      <b-row class="h-100 w-100" align-h="center" align-v="center">
        <b-card class="shadow" style="width:600px;">
          <b-card-title id="card-heading">Todo Online</b-card-title>
          <b-card-sub-title id="card-sub-heading">Sign in</b-card-sub-title>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Email address"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-pass"
              label="Password"
              label-for="text-password"
            >
              <b-form-input
                type="password"
                id="text-password"
                v-model="form.password"
                aria-describedby="password-help-block"
                required
                :state="passValidation"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!passSize" :state="passSize">
                Your password must be 8-20 characters long.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-if="!passAlphaNumeric"
                :state="passAlphaNumeric"
              >
                Your password must must not contain spaces, special characters,
                or emoji.
              </b-form-invalid-feedback>
              <b-form-text id="password-help-block">
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </b-form-text>
            </b-form-group>
            <b-row align-h="around" style="padding-top:30px;">
              <b-button type="reset" variant="danger">Reset</b-button>
              <b-button type="submit" variant="primary">
                Submit
              </b-button>
            </b-row>
          </b-form>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import store from "../store";
export default Vue.extend({
  name: "Login",
  data: function() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store
        .dispatch("auth/login", this.form)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  // mounted() {},
  computed: {
    passValidation() {
      return this.form.password.length == 0
        ? null
        : this.form.password.length > 7 &&
            this.form.password.length < 21 &&
            this.form.password == this.form.password.match(/^[a-zA-Z0-9]*$/);
    },
    passAlphaNumeric() {
      return this.form.password.length == 0
        ? null
        : this.form.password == this.form.password.match(/^[a-zA-Z0-9]*$/);
    },
    passSize() {
      return this.form.password.length == 0
        ? null
        : this.form.password.length > 7 && this.form.password.length < 21;
    },
    ...mapGetters(["auth/isLoggedIn"])
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters["auth/isLoggedIn"]) {
      next("/dashboard");
    } else {
      next();
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";
@import "~@/scss/_fonts.scss";
.laysize {
  text-align: initial;
}

#card-heading {
  font-family: Pacifico;
  // font-family: FredokaOne;
  font-size: 30px;
  color: #798794;
  margin-bottom: 30px;
  cursor: pointer;
  text-align: center;
}
#card-sub-heading {
  font-size: 22px;
  // color: black !important;
  // font-weight:bold;
  padding-bottom: 30px;
  text-align: center;
}
// #login{
//   height:100%;
//   width:100%;
//   text-align: initial;
// }
</style>
