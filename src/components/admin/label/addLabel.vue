<template>
  <b-container fluid v-if="roleId == 99">
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
              Add Label
            </li>
          </ol>
        </div>
        <!--language creation-->
        <form class="common-bg" method="post" @submit.prevent="addlabelType">
          <div class="row col-sm-12">
            <div class="col-sm-3 col-md-4">
              <label>Language label (eg: English, Spanish...)</label>
              <b-form-input
                v-model="formData.langType"
                v-validate="'required'"
                type="text"
                name="langType"
                :class="{ input: true, 'is-danger': errors.has('langType') }"
              />
              <span v-show="errors.has('langType')" class="help is-danger">{{
                errors.first("langType")
              }}</span>
            </div>
            <div class="col-sm-6">
              <label>
                Language name in its native tongue (eg: English, española... )
              </label>
              <b-form-input
                v-model="formData.OriginalLangtext"
                v-validate="'required'"
                type="text"
                name="OriginalLangtext"
                :class="{
                  input: true,
                  'is-danger': errors.has('OriginalLangtext')
                }"
              />
              <span
                v-show="errors.has('OriginalLangtext')"
                class="help is-danger"
                >{{ errors.first("OriginalLangtext") }}</span
              >
            </div>
            <div class="col-sm-2 marginTop30">
              <button type="submit" class="btn btn-success">Create</button>
            </div>
            <br />
          </div>
        </form>

        <!--display existing languages-->
        <edit-label class="common-bg" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../../admin/sidebar.vue";
import adminHeader from "../../admin/adminHeader.vue";
import { Validator } from "vee-validate";
import editLabel from "../../admin/label/editLabel.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      formData: {
        langType: "",
        OriginalLangtext: ""
      }
    };
  },
  methods: {
    ...mapActions(["createLangType"]),
    addlabelType() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(valid => {
          if (valid) {
            const payload = {
              data: {
                langId: this.existinglang.rows.length + 1,
                langType: this.formData.langType,
                OriginalLangtext: this.formData.OriginalLangtext,
                status: 0
              }
            };
            this.createLangType(payload);
            this.formData.langType = "";
            this.formData.OriginalLangtext = "";
          }
        });
      }
    }
  },
  components: {
    "edit-label": editLabel,
    "admin-header": adminHeader,
    "app-sidebar": sidebar
  },
  computed: {
    ...mapState(["existinglang", "roleId"])
  }
};
</script>
