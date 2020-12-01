<template>
  <b-container
    fluid
    class="loginBg"
    :style="'background-color:' + GeneralSettings.row[0].bgcolor"
  >
    <b-container>
      <b-row>
        <div class="centerForm" style="width:50%;">
          <!-- <h4>Home / Registration</h4> -->
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
            <div class="panel-heading regis-head marginTop20">
              <h5 class="panel-title text-center">
                <span
                  class="clr-purple"
                  :style="'color:' + GeneralSettings.row[0].bgcolor"
                  >REGISTRATION FORM</span
                >
              </h5>
            </div>
            <div class="panel-body">
              <!-- <p v-if="msg" class="invalid-cls">{{msg}}</p> -->
              <b-form
                method="post"
                name="loginForm"
                @submit.prevent="registerSubmit"
              >
                <b-row>
                  <b-form-group class="col-sm-6">
                    <!-- <label for="fname">First Name</label> -->
                    <b-form-input
                      v-model="fname"
                      v-validate="'required'"
                      type="text"
                      name="fname"
                      class="form-control"
                      placeholder="First Name"
                      :class="{ input: true, 'is-danger': errors.has('fname') }"
                    />
                    <span v-show="errors.has('fname')" class="help is-danger">{{
                      errors.first("fname")
                    }}</span>
                  </b-form-group>
                  <b-form-group class="col-sm-6">
                    <!-- <label for="lname">Last Name</label> -->
                    <b-form-input
                      v-model="lname"
                      v-validate="'required'"
                      type="text"
                      name="lname"
                      class="form-control"
                      placeholder="Last Name"
                      :class="{ input: true, 'is-danger': errors.has('lname') }"
                    />
                    <span v-show="errors.has('lname')" class="help is-danger">{{
                      errors.first("lname")
                    }}</span>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-6">
                    <!-- <label for="email">Email</label> -->
                    <b-form-input
                      v-model="email"
                      v-validate="phone.trim() == '' ? 'required|email' : ''"
                      type="text"
                      name="email"
                      class="form-control"
                      placeholder="Email"
                      :class="{
                        input: true,
                        'is-danger': errors.has('email') && phone.trim() == ''
                      }"
                    />
                    <span
                      v-if="errors.has('email') && phone.trim() == ''"
                      v-show="errors.has('email')"
                      class="help is-danger"
                      >{{ errors.first("email") }}</span
                    >
                  </b-form-group>
                  <b-form-group class="col-sm-6">
                    <!-- <label for="phone">Phone</label> -->
                    <b-form-input
                      v-model="phone"
                      v-validate="
                        email.trim() == ''
                          ? 'required|numeric|min:10|max:10'
                          : ''
                      "
                      type="text"
                      name="phone"
                      class="form-control"
                      placeholder="Phone"
                      :class="{
                        input: true,
                        'is-danger': errors.has('phone') && email.trim() == ''
                      }"
                    />
                    <span
                      v-if="errors.has('phone') && email.trim() == ''"
                      v-show="errors.has('phone')"
                      class="help is-danger"
                      >{{ errors.first("phone") }}</span
                    >
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-form-group class="col-sm-6">
                    <!-- <label for="password">Password</label> -->
                    <b-form-input
                      ref="password"
                      v-model="password"
                      v-validate="'required|min:8'"
                      type="password"
                      name="password"
                      :class="{
                        input: true,
                        'is-danger': errors.has('password')
                      }"
                      class="form-control"
                      placeholder="Password"
                      title="accept only 8 to 12 characters"
                    />
                    <span
                      v-show="errors.has('password')"
                      class="help is-danger"
                      >{{ errors.first("password") }}</span
                    >
                  </b-form-group>
                  <b-form-group class="col-sm-6">
                    <!-- <label for="password_confirmation">Confirm Password</label> -->
                    <b-form-input
                      id="password_confirmation"
                      v-model="password_confirmation"
                      v-validate="'required|confirmed:password'"
                      type="password"
                      name="password_confirmation"
                      data-vv-as="password"
                      :class="{
                        input: true,
                        'is-danger': errors.has('password_confirmation')
                      }"
                      class="form-control"
                      placeholder="Confirm Password"
                      title="accept only 8 to 12 characters"
                    />
                    <span
                      v-show="errors.has('password_confirmation')"
                      class="help is-danger"
                      >{{ errors.first("password_confirmation") }}</span
                    >
                  </b-form-group>
                </b-row>
                <b-form-group class="text-center height15">
                  <p v-if="existmsg" class="invalid-cls">{{ existmsg }}</p>
                </b-form-group>
                <!-- </div> -->
                <b-col sm="12" class="text-center marginBot10">
                  <button
                    type="submit"
                    class="btn-mid"
                    :style="
                      'background-color:' + GeneralSettings.row[0].bgcolor
                    "
                  >
                    Submit
                  </button>
                </b-col>
                <b-col sm="12" class="text-center text-deco">
                  <router-link
                    to="/"
                    activeClass="active"
                    v-if="userId == null"
                  >
                    <a class="nav-links">Already have an account ? Sign in</a>
                  </router-link>
                  <button
                    @click="$router.back()"
                    :style="'color:' + GeneralSettings.row[0].bgcolor"
                    class="bg-no"
                    v-else
                  >
                    Back
                  </button>
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
          confirmed: function() {
            return "Password does not match";
          },
          min: function() {}
        }
      }
    };
    Validator.localize(dictionary);
    return {
      format: "d MMMM yyyy",
      disabledDates: {
        from: new Date()
      },
      existmsg: "",
      successmsg: "",
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      images: {
        logo: require("../../assets/images/logo.png")
      }
    };
  },
  methods: {
    ...mapActions(["signup"]),
    registerSubmit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          const payload = {
            email: this.email,
            password: this.password,
            firstname: this.fname,
            lastname: this.lname,
            phone: this.phone,
            roleId: 1
          };
          // this.signup(payload);
          // var self = this;
          // setTimeout(function() {
          //   self.msg = false;
          // }, 3000);
          this.$store
            .dispatch("signup", payload)
            .then(re => {
              if (re.data.type === "success") {
                this.successmsg = this.messages.signupsuccess;
                var self = this;
                setTimeout(function() {
                  self.successmsg = false;
                  self.$router.push("/viewParticipants");
                }, 3000);
              }
            })
            .catch(err => {
              if (err.response.data.type === "failure") {
                this.existmsg = this.messages.existmessage;
                var selfmsg = this;
                setTimeout(function() {
                  selfmsg.existmsg = false;
                }, 6000);
              }
            });
        }
      });
    }
  },
  computed: {
    ...mapState(["users", "messages", "GeneralSettings", "userId"])
  }
};
</script>
