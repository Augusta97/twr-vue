<template>
  <div>
    <div class="col-sm-12 marginTop20">
      <div
        v-for="(lang, inx) in existinglang.rows.filter(x => x.status == 0)"
        :key="inx"
      >
        <div class="row">
          <p class="col-sm-1 col-md-2">
            {{ inx + 1 }}] {{ lang.OriginalLangtext }}
          </p>
          <!-- <span><font-awesome-icon icon="plus" v-b-tooltip.hover title="add and edit label" class="marlr10 marTop5 clr-vio" @click="addLabel(lang.lang_id, lang)"></font-awesome-icon></span> -->
          <p class="spacelr">
            <font-awesome-icon
              v-b-tooltip.hover
              icon="edit"
              title="edit"
              class="marTop5 clr-green"
              @click="editNote(lang.langId, inx, lang)"
            />
          </p>
          <p>
            <font-awesome-icon
              v-b-tooltip.hover
              icon="trash"
              title="delete"
              class="marTop5 clr-trash"
              @click="deleteLang(lang.langId, inx)"
            />
          </p>
        </div>
      </div>
    </div>
    <!--edit label modal-->
    <b-modal
      id="modaledit"
      ref="editModal"
      title="Edit language"
      @ok="handleOk"
    >
      <form @submit.prevent="editFun">
        <p v-show="msg" class="invalid-cls">Data updated</p>
        <b-form-group
          label="Language label (eg: English, Spanish...)"
          label-for="langtype-input"
        >
          <b-form-input
            v-model="formData.editLangType"
            v-validate="'required'"
            name="editLangType"
            :class="{ input: true, 'is-danger': errors.has('editLangType') }"
          />
          <span v-show="errors.has('editLangType')" class="help is-danger">{{
            errors.first("editLangType")
          }}</span>
        </b-form-group>
        <b-form-group
          label="Language name in its native tongue (eg: English, española... )"
          label-for="ownlang-input"
        >
          <b-form-input
            v-model="formData.editOriginalLangtext"
            v-validate="'required'"
            name="editOriginalLangtext"
            :class="{
              input: true,
              'is-danger': errors.has('editOriginalLangtext')
            }"
          />
          <span
            v-show="errors.has('editOriginalLangtext')"
            class="help is-danger"
            >{{ errors.first("editOriginalLangtext") }}</span
          >
        </b-form-group>
      </form>
    </b-modal>
    <!--delete label modal-->
    <b-modal
      id="modal-delete"
      ref="deleteModal"
      title="Confirmation Message"
      no-close-on-backdrop
      ok-title="Yes"
      cancel-title="No"
      @ok="handleDelete"
    >
      <p class="my-4 text-center">{{ delMsg }}</p>
    </b-modal>
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
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      delId: "",
      delIndex: "",
      delMsg: "",
      msg: false,
      formData: {
        editLangType: "",
        editOriginalLangtext: ""
      },
      editlang_index: "",
      editlangId: ""
    };
  },
  methods: {
    ...mapActions(["editLanguage", "deleteLanguage"]),
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.editFun();
    },
    editNote(id, index, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.formData.editLangType = item.langType;
        this.formData.editOriginalLangtext = item.OriginalLangtext;
        this.editlang_index = index;
        this.editlang_id = id;
        this.$refs.editModal.show();
      }
    },
    editFun() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.existinglang.rows[
              this.editlang_index
            ].langType = this.formData.editLangType;
            this.existinglang.rows[
              this.editlang_index
            ].OriginalLangtext = this.formData.editOriginalLangtext;
            this.msg = true;
            const payload = {
              langId: this.editlang_id,
              index: this.editlang_index,
              userId: localStorage.getItem("userId"),
              langType: this.formData.editLangType,
              OriginalLangtext: this.formData.editOriginalLangtext
            };
            this.editLanguage(payload);
            var self = this;
            setTimeout(function() {
              self.msg = false;
            }, 5000);
          }
        });
      }
    },
    deleteLang(id, indx) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delId = id;
        this.delIndex = indx;
        this.delMsg = "Are you sure wants to delete ?";
        // show delete modal
        this.$refs.deleteModal.show();
      }
    },
    handleDelete() {
      if (this.delId) {
        // call delCallBack() to delete language
        this.delCallBack(this.delId, this.delIndex);
      }
    },
    delCallBack(id, indx) {
      this.existinglang.rows[indx].status = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: indx,
        langId: id,
        status: 1
      };
      this.deleteLanguage(payload);
    }
  },
  computed: {
    ...mapState(["existinglang"])
  }
};
</script>
