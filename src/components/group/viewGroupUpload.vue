<template>
  <b-card no-body>
    <b-row class="px-4 mt-5">
      <b-col>
        <b>Name</b>
      </b-col>
      <b-col sm="4">
        <b>Description</b>
      </b-col>
      <b-col>
        <b>Date</b>
      </b-col>
      <b-col>
        <b>Attachments</b>
      </b-col>
    </b-row>
    <b-row class="px-4 py-2" v-for="(upload, index) in groupUploads.data" :key="index">
      <b-col>{{upload.firstname}}</b-col>
      <b-col sm="4">{{upload.description}}</b-col>
      <b-col>{{upload.day}}</b-col>
      <b-col>
        <i
          class="fa fa-eye"
          block
          v-b-toggle="'accordion-'+index"
          @click="showUploads(upload.groupUploadId)"
        ></i>
      </b-col>
      <b-collapse
        v-if="show && groupAttachments.data"
        :id="'accordion-'+index"
        accordion="my-accordion"
        class="col-sm-12"
        role="tabpanel"
      >
        <b-row class="col mt-3">{{upload.text}}</b-row>
        <b-row class="py-4" v-for="(a, inx) in groupAttachments.data" :key="inx">
          <b-col sm="4" v-if="a.substr(a.length - 4) =='.jpg' || a.substr(a.length - 4) =='.png'">
            <b-img
              class="img-thumbnail tick1"
              :src="a"
              alt="Fluid image"
              style="height: 125px;width: 125px;"
            />
          </b-col>
          <b-col sm="4" v-if="a.substr(a.length - 4) =='.mp3'">
            <b-embed
              class="audiocls bg-iavt bgcards mt-3"
              type="audio"
              v-if="a.substr(a.length - 4) =='.mp3'"
              controls
            >
              <source :src="a" type="audio/webm" />
              <source :src="a" type="audio/mp3" />
            </b-embed>
          </b-col>
          <b-col sm="4" v-if="a.substr(a.length - 4) =='.mp4'">
            <b-embed
              class="audiocls bg-iavt bgcards mt-3"
              type="video"
              v-if="a.substr(a.length - 4) =='.mp4'"
              controls
            >
              <source :src="a" type="video/webm" />
              <source :src="a" type="video/mp4" />
            </b-embed>
          </b-col>
        </b-row>
      </b-collapse>
    </b-row>
  </b-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    // video = new Video(require(groupUploads[1].videoUrl));
    return {
      // audio: require('@/assets/audio/audio.mp3'),
      // video: require('@/assets/video/video.mp4'),
      // userImage: require('@/assets/images/userImage.png'),
      show: false,
      delId: "",
      delIndex: "",
      delMsg: "",
      search: "",
      fromDate: "",
      toDate: "",
      format: "d MMMM yyyy",
      disabledDates: {
        from: new Date()
      },
      acceptedImage: [".jpg", ".jpeg", ".png", ".gif"],
      acceptedAudio: [".mp3", ".ogg"],
      acceptedVideo: [".mp4", ".mpeg"]
    };
  },
  computed: {
    ...mapState(["groupUploads", "groupAttachments"])
  },
  watch: {
    fmDat() {
      if (this.fromDate !== "") {
        var a = this.fromDate;
        return (
          a.getFullYear() +
          "-" +
          this.appendLeadingZeros(a.getMonth() + 1) +
          "-" +
          this.appendLeadingZeros(a.getDate())
        );
      }
    },
    toDat() {
      if (this.toDate !== "") {
        var b = this.toDate;
        return (
          b.getFullYear() +
          "-" +
          this.appendLeadingZeros(b.getMonth() + 1) +
          "-" +
          this.appendLeadingZeros(b.getDate())
        );
      }
    }
  },
  methods: {
    ...mapActions(["loadGroupUpload", "deleteUploads"]),
    delFiles(id, inx) {
      this.delId = id;
      this.delIndex = inx;
      this.delMsg = "Are you sure wants to delete the Group ?";
      this.$refs.deleteModal.show();
    },
    handleDelete() {
      if (this.delId) {
        this.delCallBack(this.delId, this.delIndex);
      }
    },
    delCallBack(id, inx) {
      this.groupUploads[inx].status = 1;
      const payload = {
        userId: localStorage.getItem("userId"),
        index: inx,
        data: {
          uploadId: id,
          status: 1
        }
      };
      this.deleteUploads(payload);
    },
    appendLeadingZeros(n) {
      if (n <= 9) {
        return "0" + n;
      }
      return n;
    },
    showUploads(id) {
      const payload = {
        groupUploadId: id
      };
      this.$store.dispatch("loadgrpUploadAttachments", payload);
      this.show = true;
    }
  }
};
</script>
