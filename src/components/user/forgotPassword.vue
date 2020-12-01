<template>
  <div class="container-fluid loginBg" :style="'background-color:'+GeneralSettings.row[0].bgcolor">
    <div class="container">
      <div class="row text-center">
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
              <h5 class="panel-title text-center">
                <span
                  class="clr-purple"
                  :style="'color:'+GeneralSettings.row[0].bgcolor"
                >FORGOT PASSWORD</span>
              </h5>
            </div>
            <div class="panel-body">
              <b-form method="post" name="passSubmit" @submit.prevent="verifyEmail">
                <div class="row">
                  <b-form-group class="col-sm-12">
                    <!-- <label for="email">Email / Phone</label> -->
                    <b-form-input
                      id="email"
                      v-model="email"
                      v-validate="'required|email'"
                      type="text"
                      name="email"
                      class="form-control"
                      :class="{'is-danger': errors.has('email')}"
                      @keypress="emailPress"
                      placeholder="Email"
                    />
                    <span
                      v-if="errors.has('email')"
                      class="help is-danger"
                    >{{ errors.first('email') }}</span>
                  </b-form-group>
                </div>
                <!-- <div
                  class="help is-success helpForm"
                  v-show="emailSent"
                  v-cloak
                >Your password sent to your email</div>-->
                <div
                  class="help is-danger text-center"
                  v-show="emailErr"
                  v-cloak
                >{{messages.forgotError}}</div>
                <div class="mt-3 text-center">
                  <button
                    type="submit"
                    class="btn-mid"
                    :style="'background-color:'+GeneralSettings.row[0].bgcolor"
                  >Submit</button>
                </div>
                <b-col sm="12" class="mt-2 text-center">
                  <router-link to="/" activeClass="active" v-if="$route.params.id!=1">
                    <a class="nav-links">Already have an account ? Sign in</a>
                  </router-link>
                </b-col>
                <!-- <div class="form-group text-right">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="changePassword"
                  >
                    Change Password
                  </button>
                </div>-->
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
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
      email: "",
      images: {
        logo: require("../../assets/images/logo.png")
      },
      emailSent: false,
      emailErr: false
    };
  },
  methods: {
    ...mapActions(["forgotPass"]),
    login() {
      this.$router.push("/");
    },
    verifyEmail() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            email: this.email
          };
          this.$store
            .dispatch("forgotPass", payload)
            .then(re => {
              if (re.data.type === "success") {
                localStorage.setItem("msgToEmail", this.messages.sentemail);
                this.$router.push("/");
              } else {
                this.emailErr = true;
                setTimeout(function() {
                  self.emailErr = false;
                }, 5000);
                // this.successPassword = false;
              }
            })
            .catch(err => {
              if (err.response.data.type === "failure") {
                this.emailErr = true;
                var self = this;
                setTimeout(function() {
                  self.emailErr = false;
                }, 5000);
              }
            });
        }
      });
    },
    emailPress() {
      this.emailSent = false;
      this.emailErr = false;
    }
    // changePassword () {
    //   this.$router.push('/changePassword')
    // }
  },
  computed: {
    ...mapState(["users", "messages", "GeneralSettings"])
  }
};
</script>
