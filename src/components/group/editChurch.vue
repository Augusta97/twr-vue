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
              Edit Church
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
            <!-- <div class="col-sm-3 form-group">
              <label for="churchId">Church Id</label>
              <input
                id="churchId"
                v-model="formData.churchId"
                v-validate="'required'"
                type="text"
                name="churchId"
                class="form-control"
                :class="{'is-danger': errors.has('churchId')}"
              >
              <span
                v-show="errors.has('churchId')"
                class="help is-danger"
              >{{ errors.first('churchId') }}</span>
            </div> -->
            <div class="col-sm-4 form-group">
              <label for="editChurchName">Church Name</label>
              <input
                id="editChurchName"
                v-model="formData.editChurchName"
                v-validate="'required'"
                type="text"
                name="editChurchName"
                class="form-control"
                :class="{ 'is-danger': errors.has('editChurchName') }"
              />
              <span
                v-show="errors.has('editChurchName')"
                class="help is-danger"
                >{{ errors.first("editChurchName") }}</span
              >
            </div>
            <div class="col-sm-4 form-group">
              <label for="editDenomination">Denomination</label>
              <model-select
                v-model="formData.editDenomination"
                :options="searchDenomination"
                :selected-option="formData.editDenomination"
                placeholder="select"
                name="editDenomination"
                @select="onSelectDenomination"
              />
              <span v-show="denominationErr" class="help is-danger"
                >This field is required
              </span>
            </div>
            <div class="col-sm-4 form-group">
              <label for="editCountry">Country</label>
              <model-select
                v-model="item"
                :options="searchCountry"
                :selected-option="item"
                placeholder="select"
                name="editCountry"
                @select="onSelect"
              />
              <span v-show="countryErr" class="help is-danger"
                >This field is required
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3 form-group">
              <label for="editChurchAddress">Address</label>
              <textarea
                id="editChurchAddress"
                v-model="formData.editChurchAddress"
                v-validate="'required'"
                type="textarea"
                name="editChurchAddress"
                class="form-control"
                :class="{ 'is-danger': errors.has('editChurchAddress') }"
              />
              <span
                v-show="errors.has('editChurchAddress')"
                class="help is-danger"
                >{{ errors.first("editChurchAddress") }}</span
              >
            </div>
            <div class="col-sm-3 form-group">
              <label for="editChurchCity">City</label>
              <input
                id="editChurchCity"
                v-model="formData.editChurchCity"
                v-validate="'required|alpha_spaces'"
                type="text"
                name="editChurchCity"
                class="form-control"
                :class="{ 'is-danger': errors.has('editChurchCity') }"
              />
              <span
                v-show="errors.has('editChurchCity')"
                class="help is-danger"
                >{{ errors.first("editChurchCity") }}</span
              >
            </div>
            <div class="col-sm-3 form-group">
              <label for="editChurchState">State</label>
              <input
                id="editChurchState"
                v-model="formData.editChurchState"
                v-validate="'required|alpha_spaces'"
                type="text"
                name="editChurchState"
                class="form-control"
                :class="{ 'is-danger': errors.has('editChurchState') }"
              />
              <span
                v-show="errors.has('editChurchState')"
                class="help is-danger"
                >{{ errors.first("editChurchState") }}</span
              >
            </div>
            <div class="col-sm-3 form-group">
              <label for="editChurchPincode">Pincode</label>
              <input
                id="editChurchPincode"
                v-model="formData.editChurchPincode"
                v-validate="'required|numeric'"
                type="text"
                name="editChurchPincode"
                class="form-control"
                :class="{ 'is-danger': errors.has('editChurchPincode') }"
              />
              <span
                v-show="errors.has('editChurchPincode')"
                class="help is-danger"
                >{{ errors.first("editChurchPincode") }}</span
              >
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3 form-group">
              <label for="editContactName">Contact Person Name</label>
              <input
                id="editContactName"
                v-model="formData.editContactName"
                v-validate="'required'"
                type="text"
                name="editContactName"
                class="form-control"
                :class="{ 'is-danger': errors.has('editContactName') }"
              />
              <span
                v-show="errors.has('editContactName')"
                class="help is-danger"
                >{{ errors.first("editContactName") }}</span
              >
            </div>
            <div class="col-sm-3 form-group">
              <label for="editContactNo">Contact no</label>
              <input
                id="editContactNo"
                v-model="formData.editContactNo"
                v-validate="'required|numeric|min:10|max:10'"
                type="text"
                name="editContactNo"
                class="form-control"
                :class="{ 'is-danger': errors.has('editContactNo') }"
              />
              <span
                v-show="errors.has('editContactNo')"
                class="help is-danger"
                >{{ errors.first("editContactNo") }}</span
              >
            </div>
            <div class="col-sm-3 form-group">
              <label for="editContactDesignation">Designation</label>
              <input
                id="editContactDesignation"
                v-model="formData.editContactDesignation"
                v-validate="'required'"
                type="text"
                name="editContactDesignation"
                class="form-control"
                :class="{ 'is-danger': errors.has('editContactDesignation') }"
              />
              <span
                v-show="errors.has('editContactDesignation')"
                class="help is-danger"
                >{{ errors.first("editContactDesignation") }}</span
              >
            </div>
            <div class="form-group col-sm-3">
              <label for>Partner agreement signed</label>
              <b-row>
                <legend :class="{ error: errors.has('editIssigned') }"></legend>
                <div class="radio col-sm-6">
                  <b-form-radio
                    type="radio"
                    v-model="formData.editIssigned"
                    name="editIssigned"
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
                    v-model="formData.editIssigned"
                    name="editIssigned"
                    value="no"
                    class="checkx"
                  >
                    <span class="check-paddleft">2. No</span>
                  </b-form-radio>
                </div>
              </b-row>
              <span
                v-show="errors.has('editIssigned')"
                class="help is-danger"
                >{{ errors.first("editIssigned") }}</span
              >
            </div>
          </div>
          <b-row>
            <div class="col-sm-3 form-group">
              <label for="editLatitude">Latitude</label>
              <input
                id="editLatitude"
                v-model="formData.editLatitude"
                v-validate="'required'"
                type="text"
                name="editLatitude"
                class="form-control"
                :class="{ 'is-danger': errors.has('editLatitude') }"
              />
              <span
                v-show="errors.has('editLatitude')"
                class="help is-danger"
                >{{ errors.first("editLatitude") }}</span
              >
            </div>
            <div class="col-sm-3 form-group">
              <label for="editLongitude">Longitude</label>
              <input
                id="editLongitude"
                v-model="formData.editLongitude"
                v-validate="'required'"
                type="text"
                name="editLongitude"
                class="form-control"
                :class="{ 'is-danger': errors.has('editLongitude') }"
              />
              <span
                v-show="errors.has('editLongitude')"
                class="help is-danger"
                >{{ errors.first("editLongitude") }}</span
              >
            </div>
          </b-row>
          <b-form-group class="col-sm-12 text-right">
            <b-button
              type="button"
              class="btn btn-warning spacelr"
              @click="backBtn"
            >
              Back
            </b-button>
            <b-button type="submit" class="btn btn-warning">
              Save
            </b-button>
          </b-form-group>
        </form>
      </b-col>
    </b-row>
    <b-modal id="modal-submit" ok-only hide-header-close no-close-on-backdrop>
      <p class="my-4 text-center">
        {{ msg }}
      </p>
    </b-modal>
    <b-modal
      id="modal-alreadyexist"
      ok-only
      hide-header-close
      no-close-on-backdrop
    >
      <p class="my-4 text-center">
        {{ existMsg }}
      </p>
    </b-modal>
  </b-container>
</template>
<script>
import sidebar from "../admin/sidebar.vue";
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
        editChurchName: "",
        editDenomination: {
          value: "",
          text: ""
        },
        editChurchAddress: "",
        editChurchCity: "",
        editChurchState: "",
        editChurchPincode: "",
        editContactName: "",
        editContactNo: "",
        editContactDesignation: "",
        editIssigned: "",
        editLatitude: "",
        editLongitude: ""
      }
    };
  },
  methods: {
    ...mapActions(["editChurch"]),
    onSelect(item) {
      this.item = item;
    },
    onSelectDenomination(editDenomination) {
      this.formData.editDenomination = editDenomination;
    },
    backBtn() {
      this.$router.push({ path: "/addChurch" });
    },
    createChurch() {
      this.$validator.validateAll().then(valid => {
        if (
          this.formData.editDenomination.value !== "" &&
          this.item.value !== ""
        ) {
          this.denominationErr = false;
          this.countryErr = false;
          if (valid) {
            const payload = {
              userId: localStorage.getItem("userId"),
              data: {
                churchId: this.churchList[this.$route.params.id - 1].churchId,
                churchName: this.formData.editChurchName,
                denominationId: this.formData.editDenomination.value,
                countryId: this.item.value,
                churchAddress: this.formData.editChurchAddress,
                churchCity: this.formData.editChurchCity,
                churchState: this.formData.editChurchState,
                churchPincode: this.formData.editChurchPincode,
                contactName: this.formData.editContactName,
                contactNo: this.formData.editContactNo,
                contactDesignation: this.formData.editContactDesignation,
                signedStatus: this.formData.editIssigned,
                latitude: this.formData.editLatitude,
                longitude: this.formData.editLongitude
              }
            };
            this.editChurch(payload);
            this.msg = "Data Updated";
            this.$bvModal.show("modal-submit");
          }
        } else {
          this.denominationErr = true;
          this.countryErr = true;
        }
      });
    }
  },
  created() {
    this.formData.editChurchName = this.churchList[
      this.$route.params.id - 1
    ].churchName;
    this.formData.editDenomination.value = this.churchList[
      this.$route.params.id - 1
    ].denominationId;
    this.item.value = this.churchList[this.$route.params.id - 1].countryId;
    this.formData.editChurchAddress = this.churchList[
      this.$route.params.id - 1
    ].churchAddress;
    this.formData.editChurchCity = this.churchList[
      this.$route.params.id - 1
    ].churchCity;
    this.formData.editChurchState = this.churchList[
      this.$route.params.id - 1
    ].churchState;
    this.formData.editChurchPincode = this.churchList[
      this.$route.params.id - 1
    ].churchPincode;
    this.formData.editContactName = this.churchList[
      this.$route.params.id - 1
    ].contactName;
    this.formData.editContactNo = this.churchList[
      this.$route.params.id - 1
    ].contactNo;
    this.formData.editContactDesignation = this.churchList[
      this.$route.params.id - 1
    ].contactDesignation;
    this.formData.editIssigned = this.churchList[
      this.$route.params.id - 1
    ].signedStatus;
    this.formData.editLatitude = this.churchList[
      this.$route.params.id - 1
    ].latitude;
    this.formData.editLongitude = this.churchList[
      this.$route.params.id - 1
    ].longitude;
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
    "admin-header": adminHeader
  }
};
</script>
