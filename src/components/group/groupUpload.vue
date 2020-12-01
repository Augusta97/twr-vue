<template>
  <div>
    <b-card no-body>
      <b-form class="grpbg" enctype="multipart/form-data" @submit.prevent="uploadfiles">
        <div class="marginTop30">
          <b-form-group label="Upload Here">
            <b-col class="row">
              <!-- {{grpImage}} -->
              <!-- {{selected}} -->
              <li class="mt-2">Image</li>
              <b-col sm="9">
                <!-- <p>Image</p> -->
                <label for="image"></label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  class="form-control d-none"
                  v-validate="'image'"
                  accept="image/jpeg, image/png, image/gif, image/jpg"
                  :class="{ 'is-danger': errors.has('image') }"
                  v-on:change="handleFileUpload(0)"
                  ref="fileImage"
                />
                <font-awesome-icon
                  v-b-tooltip.hover
                  icon="image"
                  size="2x"
                  title="Image"
                  style="color: rgb(53, 93, 105);"
                  class="marTop5"
                  @click="$refs.fileImage.click()"
                ></font-awesome-icon>
                <b v-if="formData.imageUrl">{{$refs.fileImage.files[0].name}}</b>
                <!-- <span v-if="imgErr" class="help is-danger ml-2">{{imgErr}}</span> -->
                <!-- <b v-if="grpImage" class="mt-0">
                    {{$refs.fileImage.files[0].name}}
                </b>-->
              </b-col>
            </b-col>
            <b-col class="row">
              <progressBar
                v-if="progress.imageUpload"
                :max="progress.maxval"
                :colours="progress.imagecolours.variant"
                :percent="progress.imagePercent"
                class="col"
              ></progressBar>
            </b-col>
            <b-col class="row">
              <li class="mt-2">Audio</li>
              <b-col sm="9">
                <label for="audio"></label>
                <input
                  type="file"
                  name="audio"
                  id="audio"
                  class="form-control d-none"
                  v-validate
                  accept=".mp3"
                  :class="{ 'is-danger': errors.has('audio') }"
                  v-on:change="handleFileUpload(1)"
                  ref="fileAudio"
                />
                <font-awesome-icon
                  v-b-tooltip.hover
                  icon="volume-down"
                  size="2x"
                  title="Audio"
                  style="color: rgb(53, 93, 105);"
                  class="marTop5"
                  @click="$refs.fileAudio.click()"
                ></font-awesome-icon>
                <b v-if="formData.audioUrl">{{$refs.fileAudio.files[0].name}}</b>
                <!-- <span v-show="audioErr" class="help is-danger ml-2">{{audioErr}}</span> -->
                <!-- <b v-if="grpAudio">
                    {{$refs.fileAudio.files[0].name}}
                </b>-->
              </b-col>
            </b-col>
            <b-col class="row">
              <progressBar
                v-if="progress.audioUpload"
                :max="progress.maxval"
                :colours="progress.audiocolours.variant"
                :percent="progress.audioPercent"
                class="col"
              ></progressBar>
            </b-col>
            <b-col class="row">
              <li class="mt-2">Video</li>
              <b-col sm="9">
                <label for="video"></label>
                <input
                  type="file"
                  name="video"
                  id="video"
                  class="form-control d-none"
                  v-validate
                  accept=".mp4"
                  :class="{ 'is-danger': errors.has('video') }"
                  v-on:change="handleFileUpload(2)"
                  ref="fileVideo"
                />
                <font-awesome-icon
                  v-b-tooltip.hover
                  icon="video"
                  size="2x"
                  title="Video"
                  style="color: rgb(53, 93, 105);"
                  class="marTop5"
                  @click="$refs.fileVideo.click()"
                ></font-awesome-icon>
                <b v-if="formData.videoUrl">{{$refs.fileVideo.files[0].name}}</b>
                <!-- <span v-show="videoErr" class="help is-danger ml-2">{{videoErr}}</span> -->
                <!-- <p v-if="grpVideo">
                    {{$refs.fileVideo.files[0].name}}
                </p>-->
              </b-col>
            </b-col>
            <b-col class="row">
              <progressBar
                v-if="progress.videoUpload"
                :max="progress.maxval"
                :colours="progress.videocolours.variant"
                :percent="progress.videoPercent"
                class="col"
              ></progressBar>
            </b-col>
            <b-col class="row mt-2">
              <li>Text</li>
              <b-col sm="6" class="ml-3">
                <b-form-group label label-for="text-formatter">
                  <b-form-textarea
                    id="text-formatter"
                    v-model="formData.textUpload"
                    class="form-control"
                    placeholder="Enter your text"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-col>
          </b-form-group>
        </div>
        <b-row>
          <b-col>
            <b-form-group label="Event Date" class="marginTop30">
              <datepicker
                v-model="formData.eventDate"
                v-validate="'required'"
                placeholder="Select Date"
                input-class="form-control bg-white"
                data-vv-name="Date"
                input-name="Date"
                :format="format"
                :class="{'input': true, 'is-danger': errors.has('Date') }"
                :disabled-dates="disabledDates"
              />
              <span v-show="errors.has('Date')" class="help is-danger">{{ errors.first('Date') }}</span>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="marginTop30">
          <b-form-group label="Description" label-for="textarea-formatter">
            <b-form-input
              id="textarea-formatter"
              v-model="formData.description"
              v-validate="'required'"
              name="description"
            ></b-form-input>
            <span
              v-show="errors.has('description')"
              class="help is-danger"
            >{{ errors.first('description') }}</span>
          </b-form-group>
        </div>
        <b-form-group class="col-sm-12 text-right">
          <b-button type="submit" class="btn btn-success">Submit</b-button>
        </b-form-group>
      </b-form>
    </b-card>
    <b-modal title="Error Message" ref="incorrectModal" no-close-on-backdrop ok-title="Ok" ok-only>
      <p class="my-4">{{ incorrectmsg }}</p>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import { Validator } from "vee-validate";
import { mapState, mapActions } from "vuex";
import progressBar from "./../admin/progressBar.vue";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
export default {
  data() {
    const dictionary = {
      en: {
        messages: {
          required: function() {
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
      formData: {
        imageUrl: "",
        audioUrl: "",
        videoUrl: "",
        textUpload: "",
        description: "",
        eventDate: ""
      },
      format: "d MMMM yyyy",
      disabledDates: {
        from: new Date()
      },
      grpImage: "",
      grpAudio: "",
      grpVideo: "",
      selected: [],
      extension: "",
      imgErr: false,
      audioErr: false,
      videoErr: false,
      acceptedImage: [".jpg", ".jpeg", ".png", ".gif"],
      acceptedAudio: [".mp3", ".ogg"],
      acceptedVideo: [".mp4", ".mpeg"],
      progress: {
        imagePercent: 0,
        imageUpload: false,
        imagecolours: {
          variant: "warning"
        },
        audioPercent: 0,
        audioUpload: false,
        maxval: 100,
        audiocolours: {
          variant: "warning"
        },
        videoPercent: 0,
        videoUpload: false,
        videocolours: {
          variant: "warning"
        }
      },
      incorrectmsg: ""
    };
  },
  computed: {
    ...mapState(["roleId", "userId", "groupUploads"])
  },
  mounted() {
    const payload = {
      groupId: this.$route.params.id
    };
    this.$store.dispatch("loadUploads", payload);
  },
  methods: {
    ...mapActions(["groupUpload"]),
    handleFileUpload(i) {
      this.extension = "";
      var self = this;
      if (i === 0) {
        this.extension =
          this.$refs.fileImage.files[0] !== undefined
            ? this.$refs.fileImage.files[0].name.substring(
                this.$refs.fileImage.files[0].name.lastIndexOf(".")
              )
            : "";
        // alert(this.extension)
        if (this.acceptedImage.includes(this.extension)) {
          this.imgErr = false;
          this.grpImage = this.$refs.fileImage.files[0];
          let formData = new FormData();
          formData.append("file", this.grpImage);
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
                self.formData.imageUrl = res.data.file;
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
        } else {
          self.progress.imageUpload = false;
          this.imgErr =
            "Image field must be an (.jpg or .jpeg or .png or .gif) file format";
        }
      } else if (i === 1) {
        this.extension =
          this.$refs.fileAudio.files[0] !== undefined
            ? this.$refs.fileAudio.files[0].name.substring(
                this.$refs.fileAudio.files[0].name.lastIndexOf(".")
              )
            : "";
        if (this.acceptedAudio.includes(this.extension)) {
          this.audioErr = false;
          this.grpAudio = this.$refs.fileAudio.files[0];
          let formData = new FormData();
          formData.append("file", this.grpAudio);
          this.progress.audiocolours.variant = "warning";
          this.progress.audioUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/audio", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.audioPercent = 5;
                setTimeout(function() {
                  self.progress.audioPercent = 50;
                  self.progress.audiocolours.variant = "info";
                }, 2000);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.audioPercent = 100;
                self.progress.audiocolours.variant = "success";
                self.formData.audioUrl = res.data.file;
                setTimeout(function() {
                  self.progress.audioUpload = false;
                  self.progress.audioPercent = 0;
                  self.progress.audiocolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.audioErr = "Check your internet connection";
              self.progress.audioUpload = false;
              console.log("FAILURE!!");
            });
        } else {
          self.progress.audioUpload = false;
          this.audioErr = "Audio field must be an (.mp3 or .ogg) file format";
        }
      } else if (i === 2) {
        this.extension =
          this.$refs.fileVideo.files[0] !== undefined
            ? this.$refs.fileVideo.files[0].name.substring(
                this.$refs.fileVideo.files[0].name.lastIndexOf(".")
              )
            : "";
        if (this.acceptedVideo.includes(this.extension)) {
          this.videoErr = false;
          this.grpVideo = this.$refs.fileVideo.files[0];
          let formData = new FormData();
          formData.append("file", this.grpVideo);
          this.progress.videocolours.variant = "warning";
          this.progress.videoUpload = true;
          axios
            .post(process.env.VUE_APP_DB_API + "upload/video", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              onUploadProgress: function(progressEvent) {
                this.progress.videoPercent = 5;
                setTimeout(function() {
                  self.progress.videoPercent = 50;
                  self.progress.videocolours.variant = "info";
                }, 2000);
              }.bind(this)
            })
            .then(function(res) {
              if (typeof res.data.file === "string") {
                self.progress.videoPercent = 100;
                self.progress.videocolours.variant = "success";
                self.formData.videoUrl = res.data.file;
                setTimeout(function() {
                  self.progress.videoUpload = false;
                  self.progress.videoPercent = 0;
                  self.progress.videocolours.variant = "light";
                }, 3000);
              }
            })
            .catch(function() {
              self.videoErr = "Check your internet connection";
              self.progress.videoUpload = false;
              console.log("FAILURE!!");
            });
        } else {
          self.progress.videoUpload = false;
          this.videoErr = "Video field must be an (.mp4 or .mpeg) file format";
        }
      }
    },
    appendLeadingZeros(n) {
      if (n <= 9) {
        return "0" + n;
      }
      return n;
    },
    uploadfiles() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (
            this.formData.imageUrl !== "" ||
            this.formData.audioUrl !== "" ||
            this.formData.videoUrl !== "" ||
            this.formData.textUpload !== ""
          ) {
            var a = this.formData.eventDate;
            if (this.formData.imageUrl !== "") {
              this.selected.push(this.formData.imageUrl);
            }
            if (this.formData.audioUrl !== "") {
              this.selected.push(this.formData.audioUrl);
            }
            if (this.formData.videoUrl !== "") {
              this.selected.push(this.formData.videoUrl);
            }
            const payload = {
              uploadData: {
                text: this.formData.textUpload,
                description: this.formData.description,
                day:
                  a.getFullYear() +
                  "-" +
                  this.appendLeadingZeros(a.getMonth() + 1) +
                  "-" +
                  this.appendLeadingZeros(a.getDate()),
                userId: localStorage.getItem("userId"),
                groupId: this.$route.params.id
              },
              attachment: this.selected
            };
            console.log(payload);
            this.groupUpload(payload);
            this.formData.textUpload = "";
            this.formData.description = "";
            this.formData.eventDate = "";
            this.formData.imageUrl = "";
            this.formData.audioUrl = "";
            this.formData.videoUrl = "";
            this.selected = [];
          }
        }
      });
    }
  },
  components: {
    Datepicker,
    progressBar
  }
  // mounted () {
  //   this.extension = this.$refs.fileAudio.files[0].name.substring(this.$refs.fileAudio.files[0].name.lastIndexOf(".")+1,this.$refs.fileAudio.files[0].name.length)
  // }
};
</script>
