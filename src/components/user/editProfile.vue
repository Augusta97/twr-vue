<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Edit Profile</li>
          </ol>
        </div>
        <div />
        <form class="bgwhite" enctype="multipart/form-data" @submit.prevent="editPro">
          <p v-show="msg" class="invalid-cls">Data updated</p>
          <div style="padding: 0px 0px 50px;">
            <div class="userTopbg">
              <h5 class="col-sm-12 headEdit">
                <b>EDIT PROFILE</b>
              </h5>
              <div class="col-sm-12 d-flex">
                <div class="col-sm-2">
                  <img v-if="imgsrc != ''" class="user-profile img-thumbnail tick1" :src="imgsrc" />
                  <img v-else :src="userImage" class="user-profile img-thumbnail tick2" />
                  <b-form-file
                    v-model="file"
                    ref="file"
                    type="file"
                    class="pro-upload mt-3 d-none"
                    id="imageUpload"
                    name="file"
                    @change="onFileChange"
                  />
                  <label for="imageUpload" class="pro-upload"></label>
                  <br />
                  <br />
                  <br />
                </div>
                <!-- <div class="col-sm-1">
                <input type="file" @change="onFileChange"/>
                </div>-->
                <h6 class="col-sm-3 absolBot0">{{fullname}}</h6>
              </div>
            </div>
          </div>
          <b-row class="marginTop30">
            <b-form-group label="First name" label-for="f-name" class="col-sm-3">
              <b-form-input
                v-model="formData.firstname"
                v-validate="'required'"
                name="firstname"
                :class="{'input': true, 'is-danger': errors.has('firstname') }"
              />
              <span
                v-show="errors.has('firstname')"
                class="help is-danger"
              >{{ errors.first('firstname') }}</span>
            </b-form-group>
            <b-form-group label="Last name" label-for="l-name" class="col-sm-3">
              <b-form-input
                v-model="formData.lastname"
                v-validate="'required'"
                name="lastname"
                :class="{'input': true, 'is-danger': errors.has('lastname') }"
              />
              <span
                v-show="errors.has('lastname')"
                class="help is-danger"
              >{{ errors.first('lastname') }}</span>
            </b-form-group>
            <b-form-group label="gender" label-for="gender" class="col-sm-3">
              <b-form-select
                v-model="formData.gender"
                v-validate="'required'"
                name="gender"
                class="txtbox-design"
                :class="{'input': true, 'is-danger': errors.has('gender') }"
              >
                <option class="disable" disabled value>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </b-form-select>
              <span
                v-show="errors.has('gender')"
                class="help is-danger"
              >{{ errors.first('gender') }}</span>
            </b-form-group>
            <b-form-group label="Date of Birth" label-for="dob" class="col-sm-3">
              <datepicker
                v-model="formData.dob"
                v-validate="'required'"
                placeholder="Select Date"
                input-class="form-control bg-white"
                data-vv-name="dob"
                input-name="dob"
                :format="format"
                :class="{'input': true, 'is-danger': errors.has('dob') }"
                :disabled-dates="disabledDates"
              />
              <span v-show="errors.has('dob')" class="help is-danger">{{ errors.first('dob') }}</span>
            </b-form-group>
          </b-row>
          <b-row>
            <b-form-group label="Phone" label-for="phone" class="col-sm-4">
              <b-form-input
                v-model="formData.phone"
                v-validate="'required|numeric|min:10|max:10'"
                name="phone"
                :class="{'input': true, 'is-danger': errors.has('phone') }"
              />
              <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
            </b-form-group>
            <b-form-group label="Email" label-for="email" class="col-sm-4">
              <b-form-input
                v-model="formData.email"
                v-validate="'required'"
                name="email"
                :class="{'input': true, 'is-danger': errors.has('email') }"
              />
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </b-form-group>
            <b-form-group label="Address" label-for="address" class="col-sm-4">
              <b-form-textarea
                v-model="formData.address"
                v-validate="'required'"
                name="address"
                :class="{'input': true, 'is-danger': errors.has('address') }"
              />
              <span
                v-show="errors.has('address')"
                class="help is-danger"
              >{{ errors.first('address') }}</span>
            </b-form-group>
          </b-row>
          <b-row>
            <b-form-group label="City" label-for="city" class="col-sm-4">
              <b-form-input
                v-model="formData.city"
                v-validate="'required'"
                name="city"
                :class="{'input': true, 'is-danger': errors.has('city') }"
              />
              <span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
            </b-form-group>
            <b-form-group label="State" label-for="state" class="col-sm-4">
              <b-form-input
                v-model="formData.state"
                v-validate="'required'"
                name="state"
                :class="{'input': true, 'is-danger': errors.has('state') }"
              />
              <span v-show="errors.has('state')" class="help is-danger">{{ errors.first('state') }}</span>
            </b-form-group>
            <b-form-group label="Pincode" label-for="pincode" class="col-sm-4">
              <b-form-input
                v-model="formData.pincode"
                v-validate="'required'"
                name="pincode"
                :class="{'input': true, 'is-danger': errors.has('pincode') }"
              />
              <span
                v-show="errors.has('pincode')"
                class="help is-danger"
              >{{ errors.first('pincode') }}</span>
            </b-form-group>
          </b-row>
          <div class="text-right">
            <b-button class="btn btn-info" @click="backBtn">Back</b-button>
            <b-button type="submit" class="btn btn-success">Save</b-button>
          </div>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import { Validator } from "vee-validate";
import sidebar from "../admin/sidebar.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    "app-sidebar": sidebar,
    Datepicker
  },
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
            return "Enter minimum 10 digits";
          },
          max: function() {
            return "Enter maximum 10 digits";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      msg: false,
      file: null,
      selectedFile: null,
      imgsrc: "",
      format: "d MMMM yyyy",
      disabledDates: {
        from: new Date()
      },
      userImage: require("@/assets/images/usericon.png"),
      formData: {
        firstname: "",
        lastname: "",
        gender: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        profilePic: ""
      }
    };
  },
  methods: {
    ...mapActions(["editProfile"]),
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile.name);
      this.imgsrc = require("@/assets/images/" + this.selectedFile.name);
      console.log(this.imgsrc);
      // this.url = URL.createObjectURL(this.selectedFile)
    },
    backBtn() {
      this.$router.push({ path: "/viewParticipants" });
    },
    editPro() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.users[
            this.$route.params.id - 1
          ].firstname = this.formData.firstname;
          this.users[
            this.$route.params.id - 1
          ].lastname = this.formData.lastname;
          this.users[this.$route.params.id - 1].gender = this.formData.gender;
          this.users[this.$route.params.id - 1].dob = this.formData.dob;
          this.users[this.$route.params.id - 1].phone = this.formData.phone;
          this.users[this.$route.params.id - 1].email = this.formData.email;
          this.users[this.$route.params.id - 1].address = this.formData.address;
          this.users[this.$route.params.id - 1].profilePic = this.imgsrc;
          this.msg = true;
          const payload = {
            userId: localStorage.getItem("userId"),
            index: this.$route.params.id - 1,
            data: {
              userId: this.$route.params.id,
              firstname: this.formData.firstname,
              lastname: this.formData.lastname,
              gender: this.formData.gender,
              dob: this.formData.dob,
              phone: this.formData.phone,
              email: this.formData.email,
              address: this.formData.address,
              city: this.formData.city,
              state: this.formData.state,
              pincode: this.formData.pincode,
              profilePic: this.imgsrc
            }
          };
          this.editProfile(payload);
          var self = this;
          setTimeout(function() {
            self.msg = false;
          }, 5000);
        }
      });
    }
  },
  created() {
    this.formData.firstname = this.users[this.$route.params.id - 1].firstname;
    this.formData.lastname = this.users[this.$route.params.id - 1].lastname;
    this.formData.phone = this.users[this.$route.params.id - 1].phone;
    this.formData.email = this.users[this.$route.params.id - 1].email;
    this.formData.gender = this.users[this.$route.params.id - 1].gender;
    this.formData.dob = this.users[this.$route.params.id - 1].dob;
    this.formData.address = this.users[this.$route.params.id - 1].address;
    this.formData.city = this.users[this.$route.params.id - 1].city;
    this.formData.state = this.users[this.$route.params.id - 1].state;
    this.formData.pincode = this.users[this.$route.params.id - 1].pincode;
    this.imgsrc = this.users[this.$route.params.id - 1].profilePic;
    this.$refs["file"] = this.users[this.$route.params.id - 1].profilePic;
  },
  computed: {
    ...mapState(["users"]),
    fullname: function() {
      // `this` points to the vm instance
      return (
        this.users[this.$route.params.id - 1].firstname +
        " " +
        this.users[this.$route.params.id - 1].lastname
      );
    }
  }
};
</script>
