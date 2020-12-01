<template>
  <b-form @submit.prevent="replyText" class="col-sm-12 helpForm">
    <b-row class="mb-3">
      <b-col sm="4"></b-col>
      <b-form-group class="col-sm-4">
        {{help}}
        <textarea
          id="answer"
          v-model="formData.answer"
          v-validate="'required'"
          name="answer"
          class="form-control"
          :class="{ 'is-danger': errors.has('answer') }"
          placeholder="Reply here..."
          rows="1 1/2"
          cols="30"
        ></textarea>
        <span v-show="errors.has('answer')" class="help is-danger">{{ errors.first("answer") }}</span>
      </b-form-group>
      <b-row class="col-sm-3">
        <b-form-group>
          <!-- <p>Image</p> -->
          <!-- <label for="image"></label> -->
          <input
            type="file"
            name="image"
            id="image"
            class="form-control"
            accept="image/jpeg, image/png, image/gif, image/jpg"
            v-on:change="handleFileUpload(0)"
            ref="file"
            multiple
          />
          <span v-if="imgErr" class="help is-danger ml-2">{{imgErr}}</span>
          <!-- <b v-if="grpImage" class="mt-0">
                      {{$refs.fileImage.files[0].name}}
          </b>-->
        </b-form-group>
        <progressBar
          class="col-sm-12"
          v-if="progress.imageUpload"
          :max="progress.maxval"
          :colours="progress.imagecolours.variant"
          :percent="progress.imagePercent"
        ></progressBar>
      </b-row>
      <b-form-group class="col-sm-1">
        <b-button type="submit" class="btn btn-success">
          <font-awesome-icon
            v-b-tooltip.hover
            :icon="['fas', 'paper-plane']"
            title="send your request"
          />
        </b-button>
      </b-form-group>
    </b-row>
  </b-form>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import progressBar from "../admin/progressBar.vue";
export default {
  props: {
    hId: Number
  },
  data() {
    return {
      formData: {
        answer: "",
        ansimageUrl: []
      },
      imgErr: false,
      maxval: 100,
      progress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        }
      }
    };
  },
  computed: {
    ...mapState(["help", "userId", "users"])
  },
  components: {
    progressBar
  },
  methods: {
    ...mapActions(["replyForHelp"]),
    handleFileUpload(i) {
      this.extension = "";
      var self = this;
      if (i === 0) {
        // alert(this.extension)
        this.imgErr = false;
        var files = this.$refs.file.files;
        for (var j = 0; j < files.length; j++) {
          this.file = files[j];
          console.log(this.file);
          let formData = new FormData();
          formData.append("file", this.file);
          this.progress.imagecolours.variant = "warning";
          this.progress.imageUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/image", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.imagePercent = 5;
                setTimeout(function() {
                  self.progress.imagePercent = 50;
                  self.progress.imagecolours.variant = "info";
                }, 100);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.imagePercent = 100;
                self.progress.imagecolours.variant = "success";
                self.formData.ansimageUrl.push(res.data.file);
                setTimeout(function() {
                  self.progress.imageUpload = false;
                  self.progress.imagePercent = 0;
                  self.progress.imagecolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.imgErr = "Check your internet connection";
              self.progress.imageUpload = false;
              console.log("FAILURE!!");
            });
        }
      }
    },
    replyText() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          // this.help[this.hId - 1].status = 1;
          const userId = localStorage.getItem("userId");
          const payload = {
            index: this.hId - 1,
            appuserId: this.help[this.hId - 1].userId,
            ansimageUrl: this.formData.ansimageUrl,
            answer: {
              queryId: this.hId,
              userId: userId,
              answer: this.formData.answer
            }
          };
          this.replyForHelp(payload);
          // this.msg = 'Data submitted'
          // this.$bvModal.show('modal-submit')
          this.formData.answer = "";
          this.formData.ansimageUrl = "";
        }
      });
    }
  }
};
</script>
