<template>
  <b-container fluid>
    <b-row class="form-height">
      <app-sidebar />
      <b-col md="10" class="mb-2 form-bg">
        <admin-header />
        <div aria-label="breadcrumb" class="breadcrumpCss">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Add Church
            </li>
          </ol>
        </div>
        <form class="grpbg" @submit.prevent="createChurch">
          <div class="row">
            <div class="form-group col-sm-12">
              <h5>Create Partner Church</h5>
            </div>
          </div>
          <div class="row marginTop">
            <div class="col-sm-4 form-group">
              <label for="churchName">Church Name</label>
              <input
                id="churchName"
                v-model="formData.churchName"
                v-validate="'required'"
                type="text"
                name="churchName"
                class="form-control"
                :class="{ 'is-danger': errors.has('churchName') }"
              />
              <span v-show="errors.has('churchName')" class="help is-danger">{{
                errors.first("churchName")
              }}</span>
            </div>
            <div class="col-sm-4 form-group">
              <label for="denomination">Denomination</label>
              <model-select
                v-model="formData.denomination"
                :options="searchDenomination"
                :selected-option="formData.denomination"
                placeholder="select"
                name="denomination"
                @select="onSelectDenomination"
              />
              <span v-show="denominationErr" class="help is-danger"
                >This field is required</span
              >
            </div>
            <div class="col-sm-4 form-group">
              <label for="country">Country</label>
              <model-select
                v-model="item"
                :options="searchCountry"
                :selected-option="item"
                placeholder="select"
                name="country"
                @select="onSelect"
              />
              <span v-show="countryErr" class="help is-danger"
                >This field is required</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3 form-group">
              <label for="churchAddress">Address</label>
              <textarea
                id="churchAddress"
                v-model="formData.churchAddress"
                v-validate="'required'"
                type="textarea"
                name="churchAddress"
                class="form-control"
                :class="{ 'is-danger': errors.has('churchAddress') }"
              />
              <span
                v-show="errors.has('churchAddress')"
                class="help is-danger"
                >{{ errors.first("churchAddress") }}</span
              >
            </div>
            <div class="col-sm-3 form-group">
              <label for="churchCity">City</label>
              <input
                id="churchCity"
                v-model="formData.churchCity"
                v-validate="'required|alpha_spaces'"
                type="text"
                name="churchCity"
                class="form-control"
                :class="{ 'is-danger': errors.has('churchCity') }"
              />
              <span v-show="errors.has('churchCity')" class="help is-danger">{{
                errors.first("churchCity")
              }}</span>
            </div>
            <div class="col-sm-3 form-group">
              <label for="churchState">State</label>
              <input
                id="churchState"
                v-model="formData.churchState"
                v-validate="'required|alpha_spaces'"
                type="text"
                name="churchState"
                class="form-control"
                :class="{ 'is-danger': errors.has('churchState') }"
              />
              <span v-show="errors.has('churchState')" class="help is-danger">{{
                errors.first("churchState")
              }}</span>
            </div>
            <div class="col-sm-3 form-group">
              <label for="churchPincode">Pincode</label>
              <input
                id="churchPincode"
                v-model="formData.churchPincode"
                v-validate="'required|numeric'"
                type="text"
                name="churchPincode"
                class="form-control"
                :class="{ 'is-danger': errors.has('churchPincode') }"
              />
              <span
                v-show="errors.has('churchPincode')"
                class="help is-danger"
                >{{ errors.first("churchPincode") }}</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3 form-group">
              <label for="contactName">Contact Person Name</label>
              <input
                id="contactName"
                v-model="formData.contactName"
                v-validate="'required'"
                type="text"
                name="contactName"
                class="form-control"
                :class="{ 'is-danger': errors.has('contactName') }"
              />
              <span v-show="errors.has('contactName')" class="help is-danger">{{
                errors.first("contactName")
              }}</span>
            </div>
            <div class="col-sm-3 form-group">
              <label for="contactNo">Contact no</label>
              <input
                id="contactNo"
                v-model="formData.contactNo"
                v-validate="'required|numeric|min:10|max:10'"
                type="text"
                name="contactNo"
                class="form-control"
                :class="{ 'is-danger': errors.has('contactNo') }"
              />
              <span v-show="errors.has('contactNo')" class="help is-danger">{{
                errors.first("contactNo")
              }}</span>
            </div>
            <div class="col-sm-3 form-group">
              <label for="contactDesignation">Designation</label>
              <input
                id="contactDesignation"
                v-model="formData.contactDesignation"
                v-validate="'required'"
                type="text"
                name="contactDesignation"
                class="form-control"
                :class="{ 'is-danger': errors.has('contactDesignation') }"
              />
              <span
                v-show="errors.has('contactDesignation')"
                class="help is-danger"
                >{{ errors.first("contactDesignation") }}</span
              >
            </div>
            <div class="form-group col-sm-3">
              <label for>Partner agreement signed</label>
              <b-row>
                <legend :class="{ error: errors.has('issigned') }"></legend>
                <div class="radio col-sm-6">
                  <b-form-radio
                    type="radio"
                    v-model="formData.issigned"
                    name="issigned"
                    v-validate="'required|included:yes,no'"
                    value="yes"
                    class="checkx"
                  >
                    <span class="check-paddleft">1. Yes</span>
                  </b-form-radio>
                </div>
                <div class="radio col-sm-6">
                  <b-form-radio
                    type="radio"
                    v-model="formData.issigned"
                    name="issigned"
                    value="no"
                    class="checkx"
                  >
                    <span class="check-paddleft">2. No</span>
                  </b-form-radio>
                </div>
              </b-row>
              <span v-show="errors.has('issigned')" class="help is-danger">{{
                errors.first("issigned")
              }}</span>
            </div>
          </div>
          <b-row>
            <div class="col-sm-3 form-group">
              <label for="Latitude">Latitude</label>
              <input
                id="Latitude"
                v-model="formData.Latitude"
                v-validate="'required'"
                type="text"
                name="Latitude"
                class="form-control"
                :class="{ 'is-danger': errors.has('Latitude') }"
              />
              <span v-show="errors.has('Latitude')" class="help is-danger">{{
                errors.first("Latitude")
              }}</span>
            </div>
            <div class="col-sm-3 form-group">
              <label for="Longitude">Longitude</label>
              <input
                id="Longitude"
                v-model="formData.Longitude"
                v-validate="'required'"
                type="text"
                name="Longitude"
                class="form-control"
                :class="{ 'is-danger': errors.has('Longitude') }"
              />
              <span v-show="errors.has('Longitude')" class="help is-danger">{{
                errors.first("Longitude")
              }}</span>
            </div>
          </b-row>
          <div class="form-group col-sm-12 text-right">
            <button type="submit" class="btn btn-warning">Submit</button>
          </div>
        </form>
        <viewChurch></viewChurch>
      </b-col>
    </b-row>
    <b-modal id="modal-submit" ok-only hide-header-close no-close-on-backdrop>
      <p class="my-4 text-center">{{ msg }}</p>
    </b-modal>
    <b-modal
      id="modal-alreadyexist"
      ok-only
      hide-header-close
      no-close-on-backdrop
    >
      <p class="my-4 text-center">{{ existMsg }}</p>
    </b-modal>
  </b-container>
</template>
<script>
import sidebar from "../admin/sidebar.vue";
import viewChurch from "../group/viewChurch.vue";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import adminHeader from "../admin/adminHeader.vue";
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
          },
          alpha_spaces: function() {
            return "Only accept alphabets and spaces";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      denominationErr: false,
      countryErr: false,
      msg: "",
      existMsg: "",
      searchCountry: [],
      searchDenomination: [],
      item: {
        value: "",
        text: ""
      },
      formData: {
        churchName: "",
        denomination: {
          value: "",
          text: ""
        },
        churchAddress: "",
        churchCity: "",
        churchState: "",
        churchPincode: "",
        contactName: "",
        contactNo: "",
        contactDesignation: "",
        issigned: "",
        Latitude: "",
        Longitude: ""
      }
    };
  },
  methods: {
    ...mapActions(["addChurch"]),
    onSelect(item) {
      this.item = item;
    },
    onSelectDenomination(denomination) {
      this.formData.denomination = denomination;
    },
    createChurch() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(valid => {
          if (
            this.formData.denomination.value !== "" &&
            this.item.value !== ""
          ) {
            this.denominationErr = false;
            this.countryErr = false;
            if (valid) {
              const payload = {
                data: {
                  churchId: this.churchList.length + 1,
                  churchName: this.formData.churchName,
                  denominationId: this.formData.denomination.value,
                  denominationName: this.formData.denomination.text,
                  countryId: this.item.value,
                  countryName: this.item.text,
                  churchAddress: this.formData.churchAddress,
                  churchCity: this.formData.churchCity,
                  churchState: this.formData.churchState,
                  churchPincode: this.formData.churchPincode,
                  contactName: this.formData.contactName,
                  contactNo: this.formData.contactNo,
                  contactDesignation: this.formData.contactDesignation,
                  signedStatus: this.formData.issigned,
                  latitude: this.formData.Latitude,
                  longitude: this.formData.Longitude,
                  status: 0
                }
              };
              this.addChurch(payload);
              this.msg = "Data submitted";
              this.$bvModal.show("modal-submit");
              this.formData.churchName = "";
              this.formData.denomination = "";
              this.item = "";
              this.formData.churchAddress = "";
              this.formData.churchCity = "";
              this.formData.churchState = "";
              this.formData.churchPincode = "";
              this.formData.contactName = "";
              this.formData.contactNo = "";
              this.formData.contactDesignation = "";
              this.formData.issigned = "";
              this.formData.Latitude = "";
              this.formData.Longitude = "";
            }
          } else {
            this.denominationErr = true;
            this.countryErr = true;
          }
        });
      }
    }
  },
  mounted() {
    var SearchList = this.countryList;
    SearchList = SearchList.map(function(x) {
      return { value: x.countryId, text: x.countryName };
    });
    this.searchCountry = SearchList;
    var SearchDenom = this.denominationList;
    SearchDenom = SearchDenom.map(function(x) {
      return { value: x.denominationId, text: x.denominationName };
    });
    this.searchDenomination = SearchDenom;
  },
  computed: {
    ...mapState(["denominationList", "countryList", "churchList"])
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    viewChurch
  }
};
</script>
