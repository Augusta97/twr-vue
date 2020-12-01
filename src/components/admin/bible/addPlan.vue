<template>
  <div>
    <!-- create paln form-->
    <b-form @submit.prevent="addPlan">
      <b-form-group
        label="Plan Name"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="lang-name"
      >
        <b-form-input
          v-model="formData.name"
          v-validate="{
            required: true,
            is:
              typeof bibleplan.find(o => o.name == formData.name.trim()) !=
              'undefined'
          }"
          type="text"
          name="name"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('name') }"
        />
        <span v-show="errors.has('name')" class="help is-danger">{{
          errors.first("name")
        }}</span>
      </b-form-group>
      <b-form-group label="Study By" label-cols-sm="4" label-cols-lg="3">
        <b-form-radio-group
          v-model="formData.byDate"
          name="byDate"
          v-validate="'required'"
          :class="{ input: true, 'is-danger': errors.has('byDate') }"
        >
          <b-form-radio value="0">1. By Day</b-form-radio>
          <b-form-radio value="1">2. By Date</b-form-radio>
        </b-form-radio-group>
        <span v-show="errors.has('byDate')" class="help is-danger">{{
          errors.first("byDate")
        }}</span>
      </b-form-group>
      <b-form-group label="Make Up Day" label-cols-sm="4" label-cols-lg="3">
        <b-form-radio-group
          v-model="formData.ismakeUpDay"
          name="ismakeUpDay"
          v-validate="'required'"
          :class="{ input: true, 'is-danger': errors.has('ismakeUpDay') }"
        >
          <b-form-radio value="1">1. Yes</b-form-radio>
          <b-form-radio value="0">2. No</b-form-radio>
        </b-form-radio-group>
        <span v-show="errors.has('ismakeUpDay')" class="help is-danger">{{
          errors.first("ismakeUpDay")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Specify Make Up Day"
        label-cols-sm="4"
        label-cols-lg="3"
        v-if="formData.ismakeUpDay == 1"
      >
        <b-form-select
          v-model="formData.makeUpday"
          v-validate="'required'"
          type="text"
          :class="{ input: true, 'is-danger': errors.has('makeUpday') }"
          class="form-control"
          name="makeUpday"
        >
          <option disabled value>select</option>
          <option value="1">First day of the week</option>
          <option value="2">Second day of the week</option>
          <option value="3">Third day of the week</option>
          <option value="4">Fourth day of the week</option>
          <option value="5">Fifth day of the week</option>
          <option value="6">Sixth day of the week</option>
          <option value="7">Seventh day of the week</option>
        </b-form-select>
        <span v-show="errors.has('makeUpday')" class="help is-danger">{{
          errors.first("makeUpday")
        }}</span>
      </b-form-group>
      <b-form-group label="Status" label-cols-sm="4" label-cols-lg="3">
        <b-form-select
          v-model="formData.status"
          v-validate="'required'"
          type="text"
          :class="{ input: true, 'is-danger': errors.has('status') }"
          class="form-control"
          name="status"
        >
          <option class="disable" disabled value>Select</option>
          <option value="Published">Published</option>
          <option value="Private">Private</option>
          <option value="Draft">Draft</option>
        </b-form-select>
        <span v-show="errors.has('status')" class="help is-danger">{{
          errors.first("status")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Plan Duration"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-dur"
      >
        <b-form-input
          v-model="formData.planDuration"
          v-validate="'required|numeric'"
          type="text"
          name="planDuration"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('planDuration') }"
        />
        <span v-show="errors.has('planDuration')" class="help is-danger">{{
          errors.first("planDuration")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Max No of Readings per Day"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-dur"
      >
        <b-form-input
          v-model="formData.readingsPerDay"
          v-validate="'required|numeric'"
          type="text"
          name="readingsPerDay"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('readingsPerDay') }"
          readonly
        />
        <span v-show="errors.has('readingsPerDay')" class="help is-danger">{{
          errors.first("readingsPerDay")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Creator"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-creator"
      >
        <b-form-input
          v-model="formData.creator"
          type="text"
          name="creator"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('creator') }"
        />
        <span v-show="errors.has('creator')" class="help is-danger">{{
          errors.first("creator")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Subject"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-creator"
      >
        <b-form-input
          v-model="formData.subject"
          type="text"
          name="subject"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('subject') }"
        />
        <span v-show="errors.has('subject')" class="help is-danger">{{
          errors.first("subject")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Description"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-creator"
      >
        <b-form-input
          v-model="formData.description"
          type="text"
          name="description"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('description') }"
        />
        <span v-show="errors.has('description')" class="help is-danger">{{
          errors.first("description")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Publisher"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-publisher"
      >
        <b-form-input
          v-model="formData.publisher"
          type="text"
          name="publisher"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('publisher') }"
        />
        <span v-show="errors.has('publisher')" class="help is-danger">{{
          errors.first("publisher")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Contributors"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-contributors"
      >
        <b-form-input
          v-model="formData.contributors"
          type="text"
          name="contributors"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('contributors') }"
        />
        <span v-show="errors.has('contributors')" class="help is-danger">{{
          errors.first("contributors")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Type"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-type"
      >
        <b-form-input
          v-model="formData.type"
          type="text"
          name="type"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('type') }"
        />
        <span v-show="errors.has('type')" class="help is-danger">{{
          errors.first("type")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Identifier"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-identifier"
      >
        <b-form-input
          v-model="formData.identifier"
          type="text"
          name="identifier"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('identifier') }"
        />
        <span v-show="errors.has('identifier')" class="help is-danger">{{
          errors.first("identifier")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Source"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-source"
      >
        <b-form-input
          v-model="formData.source"
          type="text"
          name="source"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('source') }"
        />
        <span v-show="errors.has('source')" class="help is-danger">{{
          errors.first("source")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Coverage"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-coverage"
      >
        <b-form-input
          v-model="formData.coverage"
          type="text"
          name="coverage"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('coverage') }"
        />
        <span v-show="errors.has('coverage')" class="help is-danger">{{
          errors.first("coverage")
        }}</span>
      </b-form-group>
      <b-form-group
        label="Rights"
        label-cols-sm="4"
        label-cols-lg="3"
        label-for="plan-rights"
      >
        <b-form-input
          v-model="formData.rights"
          type="text"
          name="rights"
          class="form-control"
          :class="{ input: true, 'is-danger': errors.has('rights') }"
        />
        <span v-show="errors.has('rights')" class="help is-danger">{{
          errors.first("rights")
        }}</span>
      </b-form-group>
      <b-form-group class="text-right">
        <b-button type="submit" class="btn btn-success">Submit</b-button>
      </b-form-group>
    </b-form>
    <!-- successfully added modal-->
    <b-modal
      id="modal-add"
      ref="addModal"
      hide-header-close
      no-close-on-backdrop
      ok-only
      ok-title="Ok"
    >
      <div class="text-center">
        <i class="fa fa-check-circle success-tick"></i>
      </div>
      <p class="my-4 text-center">{{ messages.addmessage }}</p>
    </b-modal>
    <!-- (add)plan confirm modal-->
    <b-modal
      id="modal-planConfirm"
      ref="planModal"
      hide-header-close
      no-close-on-backdrop
      @ok="handlePlan"
    >
      <div class="text-center">
        <i class="fa fa-check-circle success-tick"></i>
      </div>
      <p class="my-4 text-center">{{ messages.planmessage }}</p>
    </b-modal>

    <!--if the application logout but opened in another tab then it will apear-->
    <session-modal></session-modal>
  </div>
</template>
<script>
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import sessionModal from "../../sessionModal.vue";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
            return "This field is required";
          },
          numeric: function() {
            return "Only accept numbers";
          },
          is: function() {
            return "This name already exist";
          }
        }
      }
    };
    Validator.localize(dictionary);
    return {
      formData: {
        name: "",
        byDate: "",
        ismakeUpDay: "",
        makeUpday: "",
        planDuration: "",
        readingsPerDay: 4,
        creator: "",
        subject: "",
        description: "",
        publisher: "",
        contributors: "",
        type: "",
        identifier: "",
        source: "",
        coverage: "",
        rights: "",
        status: ""
      }
    };
  },
  methods: {
    ...mapActions(["createPlan"]),
    addPlan() {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.$validator.validateAll().then(valid => {
          if (valid) {
            this.$bvModal.show("modal-planConfirm");
          }
        });
      }
    },
    handlePlan() {
      var str = this.formData.name;
      str = str.replace(/ +/g, "");
      if (this.formData.ismakeUpDay === "0") {
        this.formData.makeUpDay = "";
      }
      const payload = {
        plan: {
          name: this.formData.name,
          byDate: this.formData.byDate,
          status: this.formData.status,
          planduration: this.formData.planDuration,
          ismakeupday: this.formData.ismakeUpDay,
          makeupday:
            this.formData.ismakeUpDay != "" ? this.formData.makeUpday : null,
          readingsperday: this.formData.readingsPerDay,
          creator: this.formData.creator,
          subject: this.formData.subject,
          description: this.formData.description,
          publisher: this.formData.publisher,
          contributors: this.formData.contributors,
          type: this.formData.type,
          identifier: this.formData.identifier,
          source: this.formData.source,
          coverage: this.formData.coverage,
          rights: this.formData.rights,
          tblName: "tp_" + str.replace("-", "_")
        }
      };
      // call's createPlan method in action.js
      this.createPlan(payload);
      this.$bvModal.show("modal-add");
      this.messages.addmessage = "Added Successfully";
      this.formData.name = "";
    }
  },
  computed: {
    ...mapState(["messages", "bibleplan"])
  },
  components: {
    "session-modal": sessionModal
  }
};
</script>
