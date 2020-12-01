import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roles: null,
    users: null,
    superusers: [],
    roleId: null,
    userId: null,
    allAccess: null,
    fullname: null,
    email: null,
    phone: null,
    LabelList: null,
    existinglang: null,
    AllLabel: null,
    allVersion: null,
    versionByLanguage: null,
    bibleplan: null,
    groupList: null,
    groupLeader: null,
    allMedia: null,
    prayerGroup: null,
    prayerTitle: null,
    prayerDescription: null,
    answeredPrayer: null,
    courseMedia: null,
    mediaTest: null,
    allPages: null,
    allEvents: null,
    assignedMembers: null,
    grpAttendance: null,
    allSidebarMenu: null,
    allFooterMenu: null,
    churchList: {},
    allQuiz: null,
    thankPrayer: null,
    tempQzUserList: [],
    bible: null,
    xmlbible: null,
    kjv: null,
    distinctChapter: null,
    bookList: null,
    chapter: {},
    dailyReading: null,
    groupUploads: null,
    groupAttachments: null,
    help: null,
    helpAttachment: null,
    helpAnswer: null,
    countryList: null,
    priorityList: null,
    denominationList: null,
    testimonyList: null,
    GeneralSettings: null,
    course: null,
    allCourse: null,
    mediaType: null,
    section: null,
    accessToken: localStorage.getItem('authToken') || '',
    messages: {
      addmessage: "Added successfully",
      editmessage: "Edited successfully",
      signupsuccess: "You have registered successfully. Login here",
      existmessage: "Already exist",
      sentemail: "Your password sent to your email",
      loginerror: "Invalid email or phone / password",
      forgotError: "You haven't registered yet !",
      resetmessage: "Password changed successfully",
      commondelete: "Are you sure wants to delete ?",
      planmessage: "Once you add You cannot edit planduration and makeup day. Are you sure wants to add ?"
    }
  },
  plugins: [createPersistedState()],
  mutations,
  actions,
  getters: {
    isLoggedIn: state => !!state.access_token
  }
})
