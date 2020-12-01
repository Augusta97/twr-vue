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
            <li class="breadcrumb-item active" aria-current="page">Manage Help</li>
          </ol>
        </div>

        <b-col class="mt-5">
          <h4>
            <b>Pending</b>
          </h4>
        </b-col>
        <b-card no-body>
          <b-tabs card class="clrtab">
            <b-tab no-body title="High" @click="HighClk()">
              <b-card-text class="col-sm-12 mt-5" v-if="help">
                <b-row
                  v-for="(helps, index) in help.filter(x=>x.priority=='HIGH' && x.answered==0)"
                  :key="index"
                >
                  <b-col lg="3" md="3">
                    <p>
                      {{helps.firstname + ' ' + helps.lastname }}
                      <b>
                        <br />ph:
                      </b>
                      {{helps.phone}}
                    </p>
                  </b-col>
                  <b-col lg="4" md="4">
                    <p>{{helps.query}}</p>
                  </b-col>
                  <b-col lg="2" sm="2">
                    <p>
                      <font-awesome-icon
                        icon="reply"
                        class="litgreen"
                        v-b-tooltip.hover
                        title="Click Here To Reply"
                        @click="reply(helps, index)"
                      />
                    </p>
                  </b-col>
                  <b-col lg="2" sm="3">
                    <p>{{helps.createdAt.substr(0, 10) + ' ' + helps.createdAt.substr(11, 5)}}</p>
                  </b-col>
                  <b-row v-if="helps.id==uniqueId" class="mx-1 mb-4">
                    <b-col sm="12" class="pb-3">
                      <b>Attached Images</b>
                    </b-col>
                    <b-col sm="2" v-for="(attach, i) in helpAttachment.attachment" :key="i">
                      <b-img
                        v-if="attach!=null"
                        :src="attach"
                        style="height: 100px;width: 100px;border: 1px solid #f2f4f9;"
                      ></b-img>
                    </b-col>
                  </b-row>
                  <reply-form v-if="helps.id==uniqueId" :hId="uniqueId"></reply-form>
                </b-row>
              </b-card-text>
              <b-card-footer>Priority | High</b-card-footer>
            </b-tab>
            <b-tab no-body title="Medium" @click="MediumClk()">
              <b-card-text class="col-sm-12 mt-5" v-if="help">
                <b-row
                  v-for="(helps, index) in help.filter(x=>x.priority=='MEDIUM' && x.answered==0)"
                  :key="index"
                >
                  <b-col lg="3" md="3">
                    <p>
                      {{helps.firstname + ' ' + helps.lastname }}
                      <b>
                        <br />ph:
                      </b>
                      {{helps.phone}}
                    </p>
                  </b-col>
                  <b-col lg="4" md="4">
                    <p>{{helps.query}}</p>
                  </b-col>
                  <b-col lg="2" sm="2">
                    <p>
                      <font-awesome-icon
                        icon="reply"
                        class="litgreen"
                        v-b-tooltip.hover
                        title="Click Here To Reply"
                        @click="reply(helps, index)"
                      />
                    </p>
                  </b-col>
                  <b-col lg="2" sm="3">
                    <p>{{helps.createdAt.substr(0, 10) + ' ' + helps.createdAt.substr(11, 5)}}</p>
                  </b-col>
                  <b-row v-if="helps.id==uniqueId" class="mx-1 mb-4">
                    <b-col sm="12" class="pb-3">
                      <b>Attached Images</b>
                    </b-col>
                    <b-col sm="2" v-for="(attach, i) in helpAttachment.attachment" :key="i">
                      <b-img
                        v-if="attach!=null"
                        :src="attach"
                        style="height: 100px;width: 100px;border: 1px solid #f2f4f9;"
                      ></b-img>
                    </b-col>
                  </b-row>
                  <reply-form v-if="helps.id==uniqueId" :hId="uniqueId"></reply-form>
                </b-row>
              </b-card-text>
              <b-card-footer>Priority | Medium</b-card-footer>
            </b-tab>
            <b-tab no-body title="Low" @click="LowClk()">
              <b-card-text class="col-sm-12 mt-5" v-if="help">
                <b-row
                  v-for="(helps, index) in help.filter(x=>x.priority=='LOW' && x.answered==0)"
                  :key="index"
                >
                  <b-col lg="3" md="3">
                    <p>
                      {{helps.firstname + ' ' + helps.lastname }}
                      <b>
                        <br />ph:
                      </b>
                      {{helps.phone}}
                    </p>
                  </b-col>
                  <b-col lg="4" md="4">
                    <p>{{helps.query}}</p>
                  </b-col>
                  <b-col lg="2" sm="2">
                    <p>
                      <font-awesome-icon
                        icon="reply"
                        class="litgreen"
                        v-b-tooltip.hover
                        title="Click Here To Reply"
                        @click="reply(helps, index)"
                      />
                    </p>
                  </b-col>
                  <b-col lg="2" sm="3">
                    <p>{{helps.createdAt.substr(0, 10) + ' ' + helps.createdAt.substr(11, 5)}}</p>
                  </b-col>
                  <b-row v-if="helps.id==uniqueId" class="mx-1 mb-4">
                    <b-col sm="12" class="pb-3">
                      <b>Attached Images</b>
                    </b-col>
                    <b-col sm="2" v-for="(attach, i) in helpAttachment.attachment" :key="i">
                      <b-img
                        v-if="attach!=null"
                        :src="attach"
                        style="height: 100px;width: 100px;border: 1px solid #f2f4f9;"
                      ></b-img>
                    </b-col>
                  </b-row>
                  <reply-form v-if="helps.id==uniqueId" :hId="uniqueId"></reply-form>
                </b-row>
              </b-card-text>
              <b-card-footer>Priority | Low</b-card-footer>
            </b-tab>
          </b-tabs>
        </b-card>
        <b-col class="mt-5">
          <h4>
            <b>Completed</b>
          </h4>
        </b-col>
        <b-card no-body class="mt-3">
          <b-tabs card class="clrtab">
            <b-tab no-body title="Completed">
              <b-card-text class="col-sm-12 mt-5" v-if="helpAnswer">
                <b-col v-for="(helps, index) in helpAnswer" :key="index">
                  <b-row class="mt-3">
                    <b-col lg="10" md="12">
                      <b-row class="ques-style">
                        <b-col lg="3" md="4">
                          <h6>{{helps.appuser_fname + ' ' + helps.appuser_lname }}</h6>
                          <h6>
                            <b>ph:</b>
                            {{helps.phone}}
                          </h6>
                          <p>{{helps.createdAt.substr(0, 10) + ' ' + helps.createdAt.substr(11, 5)}}</p>
                        </b-col>
                        <b-col lg="8" md="6">
                          <p>{{helps.query}}</p>
                        </b-col>
                        <b-col lg="1" md="2">
                          <p>
                            <font-awesome-icon
                              icon="reply"
                              class="litgreen"
                              v-b-tooltip.hover
                              title="Click Here To Reply"
                              @click="replyReapeat(helps, index)"
                            />
                          </p>
                        </b-col>
                        <b-row class="mx-2 mb-4">
                          <b-col sm="12" class="pb-3">
                            <b>Attached Images</b>
                          </b-col>
                          <b-col sm="2" v-for="(attach, i) in helps.attachment" :key="i">
                            <b-img
                              v-if="attach!=null"
                              :src="attach"
                              style="height: 100px;width: 100px;border: 1px solid #f2f4f9;"
                            ></b-img>
                          </b-col>
                        </b-row>
                        <!-- <b-col sm="3">
                          <p>{{helps.textedAt.substr(0, 10)}}<br>{{helps.textedAt.substr(11, 10)}}</p>
                        </b-col>-->
                        <reply-form v-if="helps.queryId==uId" :hId="uId"></reply-form>
                      </b-row>
                    </b-col>
                    <b-col lg="2"></b-col>
                  </b-row>
                  <b-row
                    v-for="(helpans, inx) in helpAnswer[index].answers"
                    :key="inx"
                    class="mt-2"
                  >
                    <b-col sm="2"></b-col>
                    <b-col sm="10">
                      <b-row class="ans-style">
                        <!-- <b-col sm="3">
                          <p>{{helpans.adminuser_fname + ' ' + helpans.adminuser_lname }}</p>
                        </b-col>-->
                        <b-col lg="9" sm="8">
                          <p>{{helpans.answer}}</p>
                        </b-col>
                        <b-col lg="3" sm="4">
                          <h6>{{helpans.adminuser_fname + ' ' + helpans.adminuser_lname }}</h6>
                          <p>{{helpans.createdAt.substr(0, 10) + ' ' + helpans.createdAt.substr(11, 5)}}</p>
                        </b-col>
                        <b-row class="mx-2 mb-4">
                          <b-col sm="12" class="pb-3">
                            <b>Attached Images</b>
                          </b-col>
                          <b-col sm="2" v-for="(attach, i) in helpans.ansattachment" :key="i">
                            <b-img
                              v-if="attach!=null"
                              :src="attach"
                              style="height: 75px;width: 75px;border: 1px solid #f2f4f9;"
                            ></b-img>
                          </b-col>
                        </b-row>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>
              </b-card-text>
              <b-card-footer>Status | Responded</b-card-footer>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import sidebar from "../admin/sidebar.vue";
import adminHeader from "../admin/adminHeader.vue";
import replyForm from "../help/replyForm.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      uniqueId: "",
      uId: ""
    };
  },
  components: {
    "app-sidebar": sidebar,
    "admin-header": adminHeader,
    "reply-form": replyForm
  },
  computed: {
    ...mapState(["help", "helpAnswer", "helpAttachment"])
  },
  mounted() {
    this.$store.dispatch("loadHelpAnswer");
  },
  methods: {
    ...mapActions(["requestHelp", "loadHelp"]),
    HighClk() {
      const payload = {
        searchParam: "HIGH"
      };
      this.loadHelp(payload);
      // this.$store.dispatch("loadHelp", payload);
    },
    MediumClk() {
      const payload = {
        searchParam: "MEDIUM"
      };
      this.loadHelp(payload);
    },
    LowClk() {
      const payload = {
        searchParam: "LOW"
      };
      this.loadHelp(payload);
    },
    reply(itm, inx) {
      if (this.uniqueId === "") {
        this.uniqueId = itm.id;
        const payload = itm.id;
        this.$store.dispatch("loadHelpAttachment", payload);
      } else {
        this.uniqueId = "";
      }
    },
    replyReapeat(itm, inx) {
      if (this.uId === "") {
        this.uId = itm.queryId;
      } else {
        this.uId = "";
      }
    }
  }
};
</script>
