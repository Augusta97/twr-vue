<template>
  <div class="marginTop30">
    <b-col md="12" class="mb-2">
      <b-row class="text-center pb-2">
        <b-col md="6" class="my-1 text-left">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input
                v-model="filter"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="4" class="my-1 text-right">
          <b-form-group label-cols-sm="7" label="Per page" class="mb-0">
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        class="table-bordered viewtable-width marginTop30"
        :items="bibleplan"
        :fields="columns"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
      >
        <template v-slot:cell(action)="data">
          <div class="action-cls">
            <i
              @click="viewPlanClk(data.item.id, data.index, data.item)"
              v-b-tooltip.hover
              title="view"
              style="color: rgb(11, 79, 148);"
              class="fa fa-eye action-icons edit-active"
            ></i>
            <i
              @click="editPlanClk(data.item.id, data.index, data.item)"
              v-b-tooltip.hover
              title="edit"
              class="far fa-edit action-icons edit-active"
            ></i>
            <i
              style="color: red;"
              @click="delPlanClk(data.item.id, data.index, data.item)"
              v-b-tooltip.hover
              title="edit"
              class="fa fa-trash edit-active"
            ></i>
          </div>
        </template>
      </b-table>
      <div class="marginTop30">
        <b-col md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="bibleplan.length"
            :per-page="perPage"
            class="my-0"
          ></b-pagination>
        </b-col>
      </div>
    </b-col>
    <b-modal
      id="modal-viewplan"
      ref="viewPlan"
      size="md"
      centered
      title="View Plan"
      no-close-on-backdrop
      ok-title="Cancel"
      ok-only
    >
      <form>
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
            readonly
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
            readonly
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
            readonly
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
            :class="{ input: true, 'is-danger': errors.has('makeUpday') }"
            class="form-control"
            name="makeUpday"
            readonly
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
            readonly
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
            readonly
            :class="{ input: true, 'is-danger': errors.has('planDuration') }"
          />
          <span v-show="errors.has('planDuration')" class="help is-danger">{{
            errors.first("planDuration")
          }}</span>
        </b-form-group>

        <b-form-group
          label="No of Readings per Day"
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
            readonly
            :class="{ input: true, 'is-danger': errors.has('readingsPerDay') }"
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
            readonly
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
            readonly
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
            readonly
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
            readonly
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
            readonly
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
            readonly
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
            readonly
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
            readonly
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
            readonly
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
            readonly
            :class="{ input: true, 'is-danger': errors.has('rights') }"
          />
          <span v-show="errors.has('rights')" class="help is-danger">{{
            errors.first("rights")
          }}</span>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="modal-editplan"
      ref="editPlan"
      size="md"
      centered
      title="Edit Plan"
      no-close-on-backdrop
      ok-title="Update"
      @ok="handleEditPlan"
    >
      <form @submit.prevent="editPlanType">
        <p v-if="msg" class="invalid-cls">{{ msg }}</p>
        <b-form-group
          label="Plan Name"
          label-cols-sm="4"
          label-cols-lg="3"
          label-for="lang-name"
        >
          <b-form-input
            v-model="formData.name"
            v-validate="'required'"
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
            readonly
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
            readonly
            class="form-control"
            :class="{ input: true, 'is-danger': errors.has('readingsPerDay') }"
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
        <!-- <b-form-group class="text-right">
        <b-button type="submit" class="btn btn-success">Submit</b-button>
        </b-form-group>-->
      </form>
    </b-modal>
    <b-modal
      id="modal-delete"
      ref="deleModal"
      hide-header-close
      no-close-on-backdrop
      ok-title="Ok"
      @ok="handleDelete"
    >
      <p class="my-4 text-center">Are you sure wants to delete?</p>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      delpId: "",
      planId: "",
      itm: "",
      planIndex: "",
      msg: false,
      columns: [
        {
          key: "name",
          label: "Plan Name",
          class: "row2",
          sortable: true
        },
        {
          key: "byDate",
          label: "Plan By",
          class: "row3",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "planduration",
          label: "Total Days",
          class: "row3",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "status",
          label: "Status",
          class: "row3",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "updatedOn",
          label: "Updated On",
          class: "row3",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "action", class: "row6 text-center", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 50, 100],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      formData: {
        name: "",
        byDate: "",
        ismakeUpDay: "",
        makeUpday: "",
        status: "",
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
        rights: ""
      }
    };
  },
  computed: {
    ...mapState(["bibleplan"])
  },
  methods: {
    ...mapActions(["editPlan", "deletePlan"]),
    editPlanType(id, index) {
      var str = this.formData.name;
      str = str.replace(/ +/g, "");
      this.$validator.validateAll().then(valid => {
        if (valid) {
          if (
            this.bibleplan.filter(x => x.name === this.formData.name).length <=
            1
          ) {
            if (this.formData.ismakeUpDay === "0") {
              this.formData.makeUpDay = "";
            }
            const payload = {
              userId: localStorage.getItem("userId"),
              index: index,
              plan: {
                id: id,
                name: this.formData.name,
                byDate: this.formData.byDate,
                status: this.formData.status,
                planduration: this.formData.planDuration,
                makeupday: this.formData.makeUpday,
                ismakeupday: this.formData.ismakeUpDay,
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
            this.editPlan(payload);
            this.msg = "Plan Updated Successfully";
            var self = this;
            setTimeout(function() {
              self.msg = false;
              self.$refs.editPlan.hide();
            }, 3000);
          } else {
            this.msg = "Plan with this name already exist";
            var sel = this;
            setTimeout(function() {
              sel.msg = "";
              sel.msg = false;
            }, 5000);
          }
        }
      });
    },
    editPlanClk(id, index, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.planId = id;
        this.planIndex = index;
        this.itm = item;
        this.formData.name = item.name;
        this.formData.byDate = item.byDate;
        this.formData.status = item.status;
        this.formData.planDuration = item.planduration;
        this.formData.makeUpday = item.makeupday;
        this.formData.ismakeUpDay = item.ismakeupday;
        this.formData.creator = item.creator;
        this.formData.subject = item.subject;
        this.formData.description = item.description;
        this.formData.publisher = item.publisher;
        this.formData.contributors = item.contributors;
        this.formData.type = item.type;
        this.formData.identifier = item.identifier;
        this.formData.source = item.source;
        this.formData.coverage = item.coverage;
        this.formData.rights = item.rights;
        this.$refs.editPlan.show();
      }
    },
    viewPlanClk(id, index, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.planId = id;
        this.planIndex = index;
        this.itm = item;
        this.formData.name = item.name;
        this.formData.byDate = item.byDate;
        this.formData.planDuration = item.planduration;
        this.formData.makeUpday = item.makeupday;
        this.formData.ismakeUpDay = item.ismakeupday;
        this.formData.creator = item.creator;
        this.formData.subject = item.subject;
        this.formData.description = item.description;
        this.formData.publisher = item.publisher;
        this.formData.contributors = item.contributors;
        this.formData.type = item.type;
        this.formData.identifier = item.identifier;
        this.formData.source = item.source;
        this.formData.coverage = item.coverage;
        this.formData.rights = item.rights;
        this.$refs.viewPlan.show();
      }
    },
    handleEditPlan(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.planId) {
        this.editPlanType(this.planId, this.planIndex, this.itm);
      }
    },
    delPlanClk(id, index, item) {
      if (localStorage.getItem("userId") == null) {
        this.$bvModal.show("modal-sessionout");
      } else {
        this.delpId = id;
        this.$refs.deleModal.show();
      }
    },
    handleDelete(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.delpId) {
        this.delePlan(this.delpId);
      }
    },
    delePlan(id) {
      const payload = {
        id: id
      };
      this.deletePlan(payload);
      this.$nextTick(() => {
        this.$refs.deleModal.hide();
      });
      this.delpId = "";
    }
  }
};
</script>
