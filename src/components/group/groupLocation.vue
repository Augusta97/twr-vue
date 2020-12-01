<template>
  <div>
    <b-card no-body>
      <b-col class="marTopBot10 d-flex">
        <b-col md="9" class="mapbg">
          <b-card-body title="Google map">
            <google-map />
          </b-card-body>
        </b-col>
        <b-col md="3">
          <b-card-body class="marTop10">
            <b-card-text>
              <h5>Meeting Location</h5>
              <p>{{groupList[this.$route.params.id - 1].grpAddress}}</p>
              <h5>Meeting Day</h5>
              <p>{{groupList[this.$route.params.id - 1].meetingDay}}</p>
              <h5>Meeting Time</h5>
              <p>{{groupList[this.$route.params.id - 1].startTime.HH}} : {{groupList[this.$route.params.id - 1].startTime.mm}} <b>to</b>
                {{groupList[this.$route.params.id - 1].endTime.HH}} : {{groupList[this.$route.params.id - 1].endTime.mm}}
              </p>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-col>
    </b-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import GoogleMap from '../group/GoogleMap'
export default {
  data () {
    return {}
  },
  components: {
    GoogleMap
  },
  computed: {
    ...mapState(['groupList'])
  }
}
</script>
