<template>
  <b-container fluid class="loginBg" :style="'background-color:'+GeneralSettings.row[0].bgcolor">
    <b-container>
      <b-row>
        <div class="centerForm">
          <div class="panel panel-primary">
            <div class="text-center">
              <a class="mx-auto logo" href="#">
                <img
                  :src="GeneralSettings.row[0].logourl"
                  :style="'width:'+GeneralSettings.row[0].logosize+'%'"
                />
                <!-- <span class="logotxt">Bibleapp</span> -->
              </a>
            </div>
            <div class="panel-heading regis-head marginTop20">
              <h4 class="panel-title text-center">
                <span
                  class="clr-purple"
                  :style="'color:'+GeneralSettings.row[0].bgcolor"
                >RESET PASSWORD</span>
              </h4>
            </div>
            <div class="panel-body">
              <b-form method="post" name="resetForm" @submit.prevent="resetSubmit">
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="password">Password</label>
                    <b-form-input
                      ref="password"
                      v-model="password"
                      v-validate="'required|min:8'"
                      type="password"
                      name="password"
                      :class="{'is-danger': errors.has('password') }"
                      class="form-control"
                      title="accept only 8 to 12 characters"
                      @keypress="passwordPress"
                    />
                    <span
                      v-show="errors.has('password')"
                      class="help is-danger"
                    >{{ errors.first('password') }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-12">
                    <label for="password">Confirm Password</label>
                    <b-form-input
                      id="confirmPass"
                      v-model="confirmPass"
                      v-validate="'required|confirmed:password'"
                      type="password"
                      name="confirmPass"
                      data-vv-as="password"
                      :class="{'form-control': true, 'is-danger': errors.has('confirmPass')}"
                      @keypress="confirmPassPress"
                    />
                    <span
                      v-show="errors.has('confirmPass')"
                      class="help is-danger"
                    >{{ errors.first('confirmPass') }}</span>
                  </b-form-group>
                </b-row>
                <b-form-group v-if="errorPassword">
                  <p class="invalid-cls text-center">Invalid password</p>
                </b-form-group>
                <!-- <b-form-group class="form-group height15">
                  <p
                    class="invalid-cls text-center"
                    v-if="successPassword"
                  >{{messages.resetmessage}}</p>
                </b-form-group>-->
                <b-form-group class="text-center">
                  <button
                    type="submit"
                    class="btn-mid"
                    :style="'background-color:'+GeneralSettings.row[0].bgcolor"
                  >Submit</button>
                </b-form-group>
                <b-col sm="12" class="text-center">
                  <router-link to="/" activeClass="active">
                    <a class="nav-links">Login here</a>
                  </router-link>
                  <!-- <b-button
                    type="submit"
                    class="btn btn-info"
                    @click="registerForm"
                  >
                    Register Now
                  </b-button>-->
                  <!-- <b-button
                    type="submit"
                    class="btn btn-info"
                    style="margin-left:10px;"
                    @click="forgotPassword"
                  >
                    Forgot Password
                  </b-button>-->
                </b-col>
              </b-form>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
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
      headerBgVariant: "info",
      password: "",
      confirmPass: "",
      errorPassword: false,
      successPassword: false,
      images: {
        logo: require("../../assets/images/logo.png")
      }
    };
  },
  methods: {
    ...mapActions(["resetpassword"]),
    resetSubmit() {
      this.$validator.validateAll().then(valid => {
        this.errorPassword = false;
        this.successPassword = false;
        if (valid) {
          const payload = {
            userId: this.$route.params.id,
            rolname: this.$route.params.name,
            confirmPass: this.confirmPass,
            newpassword: this.password
          };
          this.$store
            .dispatch("resetpassword", payload)
            .then(re => {
              if (re.data.type === "success") {
                this.errorPassword = false;
                localStorage.setItem("msgToReset", this.messages.resetmessage);
                this.$router.push("/");
                // this.$router.push("/");
              } else {
                this.errorPassword = true;
              }
            })
            .catch(err => {
              if (err.response.data.type === "failure") {
                this.errorPassword = true;
              }
            });
        }
      });
    },
    confirmPassPress() {
      this.errorPassword = false;
      this.successPassword = false;
    },
    passwordPress() {
      this.errorPassword = false;
      this.successPassword = false;
    }
  },
  mounted() {
    this.$store.dispatch("loadExistingGeneralSettings");
  },
  computed: {
    ...mapState(["users", "messages", "GeneralSettings"])
  }
};
</script>
