<template>
  <div>
    <b-modal
      id="changePass"
      ref="changepassword"
      size="lg"
      title="Change Password"
      ok-title="Submit"
      no-close-on-backdrop
      :header-bg-variant="headerBgVariant"
      @ok="changePassword"
    >
      <b-form>
        <div class="modal-body changepass-padd">
          <b-row class="form-group margin-space">
            <label class="col-sm-3">Old Password</label>
            <b-form-input
              id="oldPass"
              v-model="oldPass"
              v-validate="'required|min:8'"
              type="password"
              name="oldPass"
              data-vv-as="old password"
              :class="{'form-control': true, 'is-danger': errors.has('oldPass')}"
              class="col-sm-8"
              @keypress="oldPassPress"
            />
            <span
              v-show="errors.has('oldPass')"
              class="help is-danger"
            >{{ errors.first('oldPass') }}</span>
          </b-row>
          <b-row class="form-group margin-space">
            <label class="col-sm-3">New Password</label>
            <b-form-input
              id="newPass"
              ref="password"
              v-model="newPass"
              type="password"
              v-validate="'required|min:8'"
              name="newPass"
              data-vv-as="new password"
              :class="{'form-control': true, 'is-danger': errors.has('newPass')}"
              class="col-sm-8"
              @keypress="newPassPress"
            />
            <span
              v-show="errors.has('newPass')"
              class="help is-danger"
            >{{ errors.first('newPass') }}</span>
          </b-row>
          <b-row class="form-group margin-space">
            <label class="col-sm-3">Confirm Password</label>
            <b-form-input
              id="confirmPass"
              v-model="confirmPass"
              v-validate="'required|confirmed:password'"
              type="password"
              name="confirmPass"
              data-vv-as="password"
              :class="{'form-control': true, 'is-danger': errors.has('confirmPass')}"
              class="col-sm-8"
              @keypress="confirmPassPress"
            />
            <span
              v-show="errors.has('confirmPass')"
              class="help is-danger"
            >{{ errors.first('confirmPass') }}</span>
          </b-row>
          <b-form-group class="height15">
            <p class="invalid-cls text-center" v-if="errorPassword">Invalid password</p>
            <p class="invalid-cls text-center" v-if="successPassword">{{messages.resetmessage}}</p>
          </b-form-group>
        </div>
      </b-form>
    </b-modal>
    <session-modal></session-modal>
  </div>
</template>
<script>
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import sessionModal from "../sessionModal.vue";
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
      oldPass: "",
      newPass: "",
      confirmPass: "",
      errorPassword: false,
      successPassword: false
    };
  },
  methods: {
    ...mapActions(["changePass"]),
    changePassword(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(result => {
          this.errorPassword = false;
          this.successPassword = false;
          if (result) {
            const payload = {
              userId: localStorage.getItem("userId"),
              emailOrPhone:
                localStorage.getItem("email") !== ""
                  ? localStorage.getItem("email")
                  : localStorage.getItem("phone"),
              oldpassword: this.oldPass,
              newpassword: this.newPass
            };
            this.$store
              .dispatch("changePass", payload)
              .then(re => {
                if (re.data.type === "success") {
                  this.errorPassword = false;
                  this.successPassword = true;
                  var self = this;
                  setTimeout(function() {
                    self.successPassword = false;
                  }, 5000);
                } else {
                  this.errorPassword = true;
                  this.successPassword = false;
                }
              })
              .catch(err => {
                if (err.response.data.type === "failure") {
                  this.errorPassword = true;
                }
              });
          }
        });
      }
    },
    oldPassPress() {
      this.errorPassword = false;
      this.successPassword = false;
    },
    newPassPress() {
      this.errorPassword = false;
      this.successPassword = false;
    },
    confirmPassPress() {
      this.errorPassword = false;
      this.successPassword = false;
    }
  },
  computed: {
    ...mapState(["access_token", "messages"])
  },
  components: {
    "session-modal": sessionModal
  }
};
</script>
