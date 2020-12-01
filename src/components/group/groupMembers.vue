<template>
  <b-tab title="Group Members">
    <b-row>
      <div class="col-sm-9">
        <p class="marTop10">
          Group Members
        </p>
        <div
          v-for="(mem, index) in assignedMembers"
          :key="index"
          class=""
        >
          <div
            v-if="mem.groupId==$route.params.id && mem.roleId==3 && mem.status==0"
            class="d-flex memberbg"
          >
            <img
              v-if="mem.profilePic == ''"
              class="memberPic rounded-circle"
              :src="userImage"
            >
            <img
              v-else
              :src="mem.profilePic"
              class="memberPic rounded-circle"
            >
            <span
              v-if="mem.groupId==$route.params.id"
              class="col-sm-2 marTop10"
            >{{ mem.firstname }}</span>
            <font-awesome-icon
              icon="phone"
              class="marTop10 col-sm-1 litgreen"
            /><span class="marTop10 col-sm-2">{{ mem.phone }}</span>
            <h6 class="col-sm-2 marTop10 clr-trash" @click="delUser(mem.assignId, index, mem)">Remove</h6>
            <b
              class="txt-orange marTop10 col-sm-2"
              @click="transfer(mem.assignId, index, mem)"
            ><span>Transfer</span></b>
            <b-col sm="3" class="marTop10">
              <router-link :to="{path: `/userProfile/${mem.userId}`}">
                <a class="">View Profile</a>
              </router-link>
            </b-col>
          </div>
        </div>
      </div>
      <div class="col-sm-6" />
    </b-row>
    <p v-if="transferMemMsg" class="invalid-cls">{{transferMemMsg}}</p>
    <p v-if="transleadmsg" class="invalid-cls">{{transleadmsg}}</p>
  </b-tab>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
