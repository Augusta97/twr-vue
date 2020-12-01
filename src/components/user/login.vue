<template>
  <b-container
    fluid
    class="loginBg"
    :style="'background-color:' + GeneralSettings.row[0].bgcolor"
  >
    <b-container>
      <b-row>
        <div class="centerForm">
          <div class="panel panel-primary">
            <div class="text-center">
              <a class="mx-auto logo" href="#">
                <img
                  :src="GeneralSettings.row[0].logourl"
                  :style="'width:' + GeneralSettings.row[0].logosize + '%'"
                />
                <!-- <span class="logotxt">Bibleapp</span> -->
              </a>
            </div>
            <div class="panel-heading regis-head text-center">
              <div class="pt-4">
                <p v-if="msgFromSignup" class="valid-cls">
                  {{ msgFromSignup }}
                </p>
                <div class="valid-cls" v-show="msgFromForgotpass">
                  {{ msgFromForgotpass }}
                </div>
                <p v-if="msgFromResetPass" class="valid-cls">
                  {{ msgFromResetPass }}
                </p>
              </div>
              <h3 class="panel-title text-center">
                <span
                  class="clr-purple"
                  :style="'color:' + GeneralSettings.row[0].bgcolor"
                  >LOGIN</span
                >
              </h3>
            </div>
            <div class="panel-body">
              <b-form
                method="post"
                name="loginForm"
                @submit.prevent="loginSubmit"
              >
                <b-row>
                  <b-form-group class="col-sm-12">
                    <!-- <label for="emailOrPhone">Email / Phone</label> -->
                    <b-form-input
                      id="emailOrPhone"
                      v-model="emailOrPhone"
                      v-validate="'required|min:10'"
                      type="text"
                      name="emailOrPhone"
                      class="form-control"
                      :class="{ 'is-danger': errors.has('emailOrPhone') }"
                      @keypress="emailPress"
                      placeholder="Email / Phone"
                    />
                    <span
                      v-if="errors.has('emailOrPhone')"
                      class="help is-danger"
                      >{{ errors.first("emailOrPhone") }}</span
                    >
                  </b-form-group>
                </b-row>
                <!-- <b-row>
                  <b-form-group class="col-sm-12">
                      <label for="phone">Phone</label>
                      <b-form-input
                        v-model="phone"
                        v-validate="email.trim() == '' ? 'required|numeric|min:10|max:10' : ''"
                        type="text"
                        name="phone"
                        class="form-control input-nobg"
                        :class="{'input': true, 'is-danger': errors.has('phone') && email.trim() == '' }"
                      />
                      <span
                        v-if="errors.has('phone') && email.trim() == ''"
                        v-show="errors.has('phone')"
                        class="help is-danger"
                      >
                        {{ errors.first('phone') }}
                      </span>
                    </b-form-group>
                </b-row>-->
                <b-row>
                  <b-form-group class="col-sm-12">
                    <!-- <label for="password">Password</label> -->
                    <b-form-input
                      ref="password"
                      v-model="password"
                      v-validate="'required|min:8'"
                      type="password"
                      name="password"
                      :class="{ 'is-danger': errors.has('password') }"
                      class="form-control"
                      title="accept only 8 to 12 characters"
                      @keypress="passwordPress"
                      placeholder="Password"
                    />
                    <span
                      v-show="errors.has('password')"
                      class="help is-danger"
                      >{{ errors.first("password") }}</span
                    >
                  </b-form-group>
                </b-row>
                <b-form-group
                  class="height15 text-center"
                  style="padding-bottom: 20px;"
                >
                  <span class="invalid-cls" v-if="invalidPassword">{{
                    messages.loginerror
                  }}</span>
                </b-form-group>
                <b-form-group class="text-center">
                  <b-button
                    type="submit"
                    class="btn-long"
                    :style="
                      'background-color:' + GeneralSettings.row[0].bgcolor
                    "
                    >Login</b-button
                  >
                </b-form-group>
                <b-col sm="12" class="text-center text-deco">
                  <!-- <router-link to="/userRegistration" activeClass="active">
                    <a class="nav-links">Not a member ? Sign up now</a>
                  </router-link> -->
                  <router-link to="/forgotPassword" activeClass="active">
                    <a class="nav-links">Forgot Password</a>
                  </router-link>
                </b-col>
              </b-form>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
    <b-modal
      id="modal-token"
      ref="tokenModal"
      hide-header-close
      no-close-on-backdrop
      ok-title="Ok"
      @ok="handleOk"
    >
      <div class="text-center">
        <i class="fa fa-check-circle success-tick"></i>
      </div>
      <p class="my-4 text-center">{{ tokenMsg }}</p>
    </b-modal>
  </b-container>
</template>
<script>
import { Validator } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          },
          numeric: function() {
            return "Only accept digits";
          },
          min: function() {
            return "This field is required";
          },
          max: function() {
            return "This field is required";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      token: "",
      tokenMsg: "",
      format: "d MMMM yyyy",
      disabledDates: {
        from: new Date()
      },
      invalidPassword: false,
      emailOrPhone: "",
      password: "",
      images: {
        logo: require("../../assets/images/logo.png")
      },
      msgFromSignup: localStorage["objectToPass"],
      msgFromForgotpass: localStorage["msgToEmail"],
      msgFromResetPass: localStorage["msgToReset"]
    };
  },
  mounted() {
    this.$store.dispatch("loadExistingGeneralSettings");
    if (window.location == "https://twrradio.in/#/") {
      var uId = localStorage.getItem("userId");
      if (uId != null) {
        // setTimeout(function() {
        this.$router.push("/AddPage");
        // }, 3000);
      }
    }
    localStorage.removeItem("objectToPass");
    localStorage.removeItem("msgToEmail");
    localStorage.removeItem("msgToReset");
    var self = this;
    setTimeout(function() {
      self.msgFromResetPass = false;
      self.msgFromSignup = false;
      self.msgFromForgotpass = false;
    }, 8000);
  },
  methods: {
    ...mapActions(["login", "resetAPIToken"]),
    handleOk() {
      const payload = {
        emailOrPhone: this.emailOrPhone,
        token: this.token
      };
      this.$store
        .dispatch("resetAPIToken", payload)
        .then(re => {
          if (
            re.data.type === "success" &&
            (re.data.user[0].roleId === 1 || re.data.user[0].roleId === 99)
          ) {
            this.$store.dispatch("loadUsers");
            this.$router.push("/ViewPage");
          }
        })
        .catch(err => {
          if (err.response.data.type === "failure") {
            this.invalidPassword = true;
          }
        });
    },
    loginSubmit() {
      this.$validator.validateAll().then(valid => {
        this.invalidPassword = false;
        if (valid) {
          const payload = {
            emailOrPhone: this.emailOrPhone,
            password: this.password
          };
          this.$store
            .dispatch("login", payload)
            .then(re => {
              if (
                re.data.type === "success" &&
                re.data.auth === true &&
                (re.data.user[0].roleId === 1 || re.data.user[0].roleId === 99)
              ) {
                this.$store.dispatch("loadUsers");
                this.$store.dispatch("loadExistingPages");
                this.$router.push("/ViewPage");
              } else if (
                re.data.type === "success" &&
                re.data.auth === false &&
                (re.data.user[0].roleId === 1 || re.data.user[0].roleId === 99)
              ) {
                this.tokenMsg =
                  "You have already logged in. Do you wants to continue with this device ?";
                this.$bvModal.show("modal-token");
                this.token = re.data.token;
              } else {
                alert("You Don't Have the access to use.");
              }
            })
            .catch(err => {
              if (err.response.data.type === "failure") {
                this.invalidPassword = true;
              }
            });
        }
      });
    },
    emailPress() {
      this.invalidPassword = false;
    },
    passwordPress() {
      this.invalidPassword = false;
    },
    registerForm() {
      this.$router.push({ path: "/userRegistration" });
    },
    forgotPassword() {
      this.$router.push({ path: "/forgotPassword" });
    }
  },
  computed: {
    ...mapState(["access_token", "messages", "GeneralSettings"])
  }
};
</script>
