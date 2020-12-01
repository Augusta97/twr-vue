export default {
  registerUser: (state, {
    data
  }) => {
    if (data.roleId !== 1 && data.roleId !== 99) {
      return state.users.push(data)
    } else {
      return state.superusers.push(data)
    }
  },
  loginUser: (state, data) => {
    state.accessToken = data.token
    state.roleId = data.user[0].roleId
    state.userId = data.user[0].userId
    state.fullname = data.user[0].firstname
    state.email = data.user[0].email
    state.phone = data.user[0].phone
    localStorage.setItem('authToken', data.token)
    localStorage.setItem('userId', data.user[0].userId)
    localStorage.setItem('fullname', data.user[0].firstname)
    localStorage.setItem('email', data.user[0].email)
    localStorage.setItem('phone', data.user[0].phone)
  },
  loadAttendance: (state, grpAttendance) => {
    state.grpAttendance = grpAttendance
  },
  loadGroupUploads: (state, groupUploads) => {
    state.groupUploads = groupUploads
  },
  loadGroupUploadAttachment: (state, groupAttachments) => {
    state.groupAttachments = groupAttachments
  },
  loadAllMediaClassification: (state, mediaType) => {
    state.mediaType = mediaType
  },
  loadAllUsers: (state, users) => {
    state.users = users
  },
  loadAllCourseMedia: (state, courseMedia) => {
    state.courseMedia = courseMedia
  },
  loadCourseById: (state, allCourse) => {
    state.allCourse = allCourse
  },
  loadAllPlans: (state, bibleplan) => {
    state.bibleplan = bibleplan
  },
  loadAllTestimony: (state, testimonyList) => {
    state.testimonyList = testimonyList
  },
  loadAllCourse: (state, course) => {
    state.course = course
  },
  loadAllMediaTests: (state, mediaTest) => {
    state.mediaTest = mediaTest
  },
  loadSection: (state, section) => {
    state.section = section
  },
  loadExistingGeneralization: (state, GeneralSettings) => {
    state.GeneralSettings = GeneralSettings
  },
  appendLangType: (state, {
    data
  }) => {
    state.existinglang.push(data)
  },
  appendPlans: (state, {
    plan
  }) => {
    state.plan.push(plan)
  },
  appendEnglishLabel: (state, {
    data
  }) => {
    state.LabelList.push(data)
  },
  appendVersion: (state, {
    data
  }) => {
    state.versionByLanguage.push(data)
  },
  appendPlanType: (state, {
    data
  }) => {
    state.planType.push(data)
  },
  appendGroup: (state, {
    data
  }) => {
    state.groupList.push(data)
  },
  assignEdit: (state, {
    assignupdate,
    data
  }) => {
    state.assignedMembers[assignupdate - 1].status = data.status
  },
  assignroleAndgrp: (state, {
    data,
    index
  }) => {
    state.users[index].roleId = data.roleId
    state.users[index].roleType = data.roleType
  },
  appendLeadingZeros(n) {
    if (n <= 9) {
      return '0' + n
    }
    return n
  },
  appendGroupAttendance: (state, {
    data
  }) => {
    // x.slice().sort((a, b) => new Date(a.attendanceDate) - new Date(b.attendanceDate))
    var m = new Date(data.attendanceDate)
    var dateYr = JSON.stringify(m.getFullYear())
    var c = m.getMonth() + 1
    var ldat = m.getDate()
    var b = (ldat <= 9 ? '0' + ldat : ldat) + '-' + (c <= 9 ? '0' + c : c) + '-' + dateYr.substr(2)
    state.grpAttendance.push({
      groupId: data.groupId,
      groupName: data.groupName,
      attendanceDate: b,
      attendance: data.attendance
    })
    for (var t = 0; t < state.grpAttendance.length; t++) {
      var original = state.grpAttendance[t].attendanceDate
      var dat = original.substr(0, 2)
      var mon = original.substr(3, 2)
      var yr = original.substr(6, 2)
      var r = mon + '-' + dat + '-' + yr
      var s = new Date(r)
      state.grpAttendance[t].attendanceDate = s
      state.grpAttendance[t].attendance.sort((a, b) => a.firstname.localeCompare(b.firstname))
    }
    state.grpAttendance = state.grpAttendance.slice().sort((a, b) => b.attendanceDate - a.attendanceDate)
    for (var k = 0; k < state.grpAttendance.length; k++) {
      var reorder = state.grpAttendance[k].attendanceDate
      var reMonth = reorder.getMonth() + 1
      var reDate = reorder.getDate()
      var reYr = JSON.stringify(reorder.getFullYear())
      var newOrder = (reDate <= 9 ? '0' + reDate : reDate) + '-' + (reMonth <= 9 ? '0' + reMonth : reMonth) + '-' + reYr.substr(2)
      state.grpAttendance[k].attendanceDate = newOrder
    }
    const arr = []
    for (var o = 0; o < state.grpAttendance.length; o++) {
      for (var p = 0; p < state.grpAttendance[o].attendance.length; p++) {
        arr.push({
          userId: state.grpAttendance[o].attendance[p].userId,
          firstname: state.grpAttendance[o].attendance[p].firstname,
          groupId: state.grpAttendance[o].groupId
        })
      }
    }
    var uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
    uniqueArray(arr)
    for (var q = 0; q < state.grpAttendance.length; q++) {
      for (var w = 0; w < uniqueArray(arr).length; w++) {
        state.grpAttendance[q].attendance.findIndex(x => x.userId === uniqueArray(arr)[w].userId === -1 && x.groupId === uniqueArray(arr)[w].groupId) !== -1 ? state.grpAttendance[q].attendance.push({
          userId: uniqueArray(arr)[w].userId,
          firstname: uniqueArray(arr)[w].firstname,
          attendanceStatus: '-'
        }) : console.log('object already exists')
      }
      state.grpAttendance[q].attendance.sort((a, b) => a.firstname.localeCompare(b.firstname))
    }
    // console.log(state.grpAttendance)
  },
  appendRole: (state, {
    data
  }) => {
    state.roles.push(data)
  },
  appendCountry: (state, {
    data
  }) => {
    state.countryList.push(data)
  },
  appendPriority: (state, {
    data
  }) => {
    state.priorityList.push(data)
  },
  appendAllMedia: (state, {
    data
  }) => {
    state.generalMedia.push(data)
  },
  appendAllPage: (state, {
    data
  }) => {
    state.allPages.push(data)
  },
  appendAllEvent: (state, {
    data
  }) => {
    state.allEvents.push(data)
  },
  appendAllSidebarMenu: (state, {
    data
  }) => {
    state.allSidebarMenu.push(data)
  },
  appendAllFooterMenu: (state, {
    data
  }) => {
    state.allFooterMenu.push(data)
  },
  loadAllExistingLanguages: (state, existinglang) => {
    state.existinglang = existinglang
  },
  updateLanguage: (state, {
    index,
    langType,
    OriginalLangtext
  }) => {
    state.existinglang[index].langType = langType
    state.existinglang[index].OriginalLangtext = OriginalLangtext
  },
  updateEngLabel: (state, {
    index,
    name,
    labelDesc
  }) => {
    state.LabelList[index].name = name
    state.LabelList[index].labelDesc = labelDesc
  },
  updateAllLabel: (state, {
    index,
    labelName,
    engId
  }) => {
    state.LabelList[index].labelName = labelName
    state.LabelList[index].engId = engId
  },
  updateVersion: (state, {
    versionId,
    data
  }) => {
    state.allVersion[versionId - 1].data = data
  },
  updateProfile: (state, {
    userId,
    data,
    roleId
  }) => {
    if (roleId === 1 || roleId === 99) {
      let index = state.superusers.findIndex(x => x.userId === userId)
      state.superusers[index].firstname = data.firstname
      state.superusers[index].lastname = data.lastname
      state.superusers[index].gender = data.gender
      state.superusers[index].dob = data.dob
      state.superusers[index].phone = data.phone
      state.superusers[index].email = data.email
      state.superusers[index].address = data.address
      state.superusers[index].city = data.city
      state.superusers[index].state = data.state
      state.superusers[index].pincode = data.pincode
      state.superusers[index].profilePic = data.profilePic
    } else {
      let index = state.users.findIndex(x => x.userId === userId)
      state.users[index].firstname = data.firstname
      state.users[index].lastname = data.lastname
      state.users[index].gender = data.gender
      state.users[index].dob = data.dob
      state.users[index].phone = data.phone
      state.users[index].email = data.email
      state.users[index].address = data.address
      state.users[index].city = data.city
      state.users[index].state = data.state
      state.users[index].pincode = data.pincode
      state.users[index].profilePic = data.profilePic
    }
  },
  updateRole: (state, {
    roleType,
    index
  }) => {
    state.roles[index].roleType = roleType
  },
  updateCountry: (state, {
    countryName,
    index
  }) => {
    state.countryList[index].countryName = countryName
  },
  updatePriority: (state, {
    priorityName,
    index
  }) => {
    state.priorityList[index].priorityName = priorityName
  },
  deleteRoleStatus: (state, {
    inx,
    data
  }) => {
    state.roles[inx].data = data
  },
  deleteCountryStatus: (state, {
    inx,
    data
  }) => {
    state.countryList[inx].data = data
  },
  deletePriorityStatus: (state, {
    inx,
    data
  }) => {
    state.priorityList[inx].data = data
  },
  deleteLangStatus: (state, {
    index,
    status
  }) => {
    state.existinglang[index].status = status
  },
  deleteEngStatus: (state, {
    index,
    status
  }) => {
    state.LabelList[index].status = status
  },
  deleteAllLabelStatus: (state, {
    index,
    status
  }) => {
    state.AllLabel[index].status = status
  },
  deleteGrpStatus: (state, {
    index,
    data
  }) => {
    state.groupList[index].data = data
  },
  deleteUserStatus: (state, {
    index,
    data
  }) => {
    var delIndex = state.assignedMembers.findIndex(y => y.assignId === data.assignId)
    state.users[index].roleId = data.roleId
    state.users[index].roleType = data.roleType
    state.assignedMembers[delIndex].roleId = data.roleId
    state.assignedMembers[delIndex].roleType = data.roleType
    state.assignedMembers[delIndex].status = data.status
  },
  deleteLeaderStatus: (state, {
    index,
    data,
    assignId
  }) => {
    var delIndex = state.assignedMembers.findIndex(y => y.assignId === data.assignId)
    state.assignedMembers[delIndex].status =
      data.status
  },
  transferMembers: (state, {
    data
  }) => {
    var transIndex = state.assignedMembers.findIndex(y => y.assignId === data.assignId)
    state.assignedMembers[transIndex].groupId = data.groupId
    state.assignedMembers[transIndex].groupName = data.groupName
  },
  loadEnglishLabel: (state, LabelList) => {
    state.LabelList = LabelList
  },
  LoadAssignedMembers: (state, assignedMembers) => {
    state.assignedMembers = assignedMembers
  },
  LoadAssignedLeaders: (state, groupLeader) => {
    state.groupLeader = groupLeader
  },
  loadAllLabel: (state, AllLabel) => {
    state.AllLabel = AllLabel
  },
  loadVersionByLang: (state, versionByLanguage) => {
    state.versionByLanguage = versionByLanguage
  },
  loadAllVersion: (state, allVersion) => {
    state.allVersion = allVersion
  },
  loadAllPlanType: (state, planType) => {
    state.planType = planType
  },
  loadAllGroups: (state, groupList) => {
    state.groupList = groupList
  },
  loadAllRoleType: (state, roles) => {
    state.roles = roles
  },
  loadAllCountry: (state, countryList) => {
    state.countryList = countryList
  },
  loadAllPriority: (state, priorityList) => {
    state.priorityList = priorityList
  },
  updatePassword: (state, {
    email,
    newpassword
  }) => {
    state.email = email
    state.password = newpassword
  },
  updateAttendance: (state, {
    data
  }) => {
    var m = state.grpAttendance.findIndex(y => parseInt(y.groupId) === parseInt(data.groupId) && y.attendanceDate === data.attendanceDate)
    var Indx = state.grpAttendance[m].attendance.findIndex(y => y.attendanceId === data.attendanceId)
    state.grpAttendance[m].attendance[Indx].attendanceStatus = data.attendanceStatus
  },
  appendDenomination: (state, {
    data
  }) => {
    state.denominationList.push(data)
  },
  updateDenomination: (state, {
    denominationName,
    index
  }) => {
    state.denominationList[index].denominationName = denominationName
  },
  deleteDenominationStatus: (state, {
    inx,
    data
  }) => {
    state.denominationList[inx].denominationName = data.denominationName
    state.denominationList[inx].status = data.status
  },
  loadAllDenomination: (state, denominationList) => {
    state.denominationList = denominationList
  },
  appendChurch: (state, {
    data
  }) => {
    state.churchList.push(data)
  },
  loadAllChurchList: (state, churchList) => {
    state.churchList = churchList
  },
  loadAllMedia: (state, allMedia) => {
    state.allMedia = allMedia
  },
  loadAllPages: (state, allPages) => {
    state.allPages = allPages
  },
  loadAllPrayerGroup: (state, prayerGroup) => {
    state.prayerGroup = prayerGroup
  },
  loadAllPrayerTitle: (state, prayerTitle) => {
    state.prayerTitle = prayerTitle
  },
  loadAllPrayerDescription: (state, prayerDescription) => {
    state.prayerDescription = prayerDescription
  },
  loadAllAnsweredPrayer: (state, answeredPrayer) => {
    state.answeredPrayer = answeredPrayer
  },
  loadAllEvents: (state, allEvents) => {
    state.allEvents = allEvents
  },
  loadThankPrayer: (state, thankPrayer) => {
    state.thankPrayer = thankPrayer
  },
  loadAllSidebarMenu: (state, allMenu) => {
    state.allSidebarMenu = allMenu
  },
  loadAllFooterMenu: (state, allMenu) => {
    state.allFooterMenu = allMenu
  },
  updateChurch: (state, {
    data,
    index
  }) => {
    state.churchList[index] = data
  },
  deleteChurchStatus: (state, {
    inx,
    data
  }) => {
    state.churchList[inx].data = data
  },
  updateGroup: (state, {
    data,
    index
  }) => {
    state.groupList[index].name = data.name
    state.groupList[index].area = data.area
    state.groupList[index].countryId = data.countryId
    state.groupList[index].countryName = data.countryName
    state.groupList[index].address = data.address
    state.groupList[index].city = data.city
    state.groupList[index].state = data.state
    state.groupList[index].pincode = data.pincode
    state.groupList[index].latitude = data.latitude
    state.groupList[index].longitude = data.longitude
    state.groupList[index].meetingDay = data.meetingDay
    state.groupList[index].startTime = JSON.stringify(data.startTime)
    state.groupList[index].endTime = JSON.stringify(data.endTime)
  },
  appendAccess: (state, {
    data
  }) => {
    state.allAccess.push(data)
  },
  getAllAccess: (state, data) => {
    state.allAccess = data
  },
  updatePage: (state, data) => {
    state.allPages.row[data.index].ID = data.ID
    state.allPages.row[data.index].content = data.content
    state.allPages.row[data.index].title = data.title
    state.allPages.row[data.index].excerpt = data.excerpt
    state.allPages.row[data.index].parentId = data.parentId
    state.allPages.row[data.index].showChild = data.showChild
    state.allPages.row[data.index].status = data.status
    state.allPages.row[data.index].expire = data.expire
    state.allPages.row[data.index].language = data.language
    state.allPages.row[data.index].bannerImageUrl = data.bannerImageUrl
    state.allPages.row[data.index].addedBy = data.addedBy
    state.allPages.row[data.index].editedBy = data.editedBy
  },
  updateEvent: (state, data) => {
    state.allEvents.row[data.index].ID = data.ID
    state.allEvents.row[data.index].content = data.content
    state.allEvents.row[data.index].title = data.title
    state.allEvents.row[data.index].excerpt = data.excerpt
    state.allEvents.row[data.index].parentId = data.parentId
    state.allEvents.row[data.index].showChild = data.showChild
    state.allEvents.row[data.index].status = data.status
    state.allEvents.row[data.index].expire = data.expire
    state.allEvents.row[data.index].language = data.language
    state.allEvents.row[data.index].bannerImageUrl = data.bannerImageUrl
    state.allEvents.row[data.index].addedBy = data.addedBy
    state.allEvents.row[data.index].startTime = data.startTime
    state.allEvents.row[data.index].endTime = data.endTime
    state.allEvents.row[data.index].editedBy = data.editedBy
    state.allEvents.row[data.index].location = data.location
    state.allEvents.row[data.index].latitude = data.latitude
    state.allEvents.row[data.index].longitude = data.longitude
  },
  updateMedia: (state, {
    data
  }) => {
    state.generalMedia[data.index].ID = data.ID
    state.generalMedia[data.index].content = data.content
    state.generalMedia[data.index].title = data.title
    state.generalMedia[data.index].excerpt = data.excerpt
    state.generalMedia[data.index].parentId = data.parentId
    state.generalMedia[data.index].showChild = data.showChild
    state.generalMedia[data.index].status = data.status
    state.generalMedia[data.index].expire = data.expire
    state.generalMedia[data.index].language = data.language
    state.generalMedia[data.index].mediaClassification = data.mediaClassification
    state.generalMedia[data.index].bannerImageUrl = data.bannerImageUrl
    state.generalMedia[data.index].addedBy = data.addedBy
    state.generalMedia[data.index].pdfUrl = data.pdfUrl
    state.generalMedia[data.index].editedBy = data.editedBy
    state.generalMedia[data.index].videoUrl = data.videoUrl
    state.generalMedia[data.index].audioUrl = data.audioUrl
  },
  updateSidebarMenu: (state, {
    data
  }) => {
    state.allSidebarMenu[data.index].ID = data.ID
    state.allSidebarMenu[data.index].name = data.name
    state.allSidebarMenu[data.index].iconUrl = data.iconUrl
    state.allSidebarMenu[data.index].pageId = data.pageId
    state.allSidebarMenu[data.index].langId = data.langId
  },
  updateFooterMenu: (state, {
    data
  }) => {
    state.allFooterMenu[data.index].ID = data.ID
    state.allFooterMenu[data.index].name = data.name
    state.allFooterMenu[data.index].iconUrl = data.iconUrl
    state.allFooterMenu[data.index].pageId = data.pageId
    state.allFooterMenu[data.index].langId = data.langId
  },
  updateGeneralization: (state, data) => {
    state.GeneralSettings.row[data.index].ID = data.ID
    state.GeneralSettings.row[data.index].appname = data.appname
    state.GeneralSettings.row[data.index].logourl = data.logourl
    state.GeneralSettings.row[data.index].logosize = data.logosize
    state.GeneralSettings.row[data.index].iconurl = data.iconurl
    state.GeneralSettings.row[data.index].iconsize = data.iconsize
    state.GeneralSettings.row[data.index].fontcolor = data.fontcolor
    state.GeneralSettings.row[data.index].fontsize = data.fontsize
    state.GeneralSettings.row[data.index].fontfamily = data.fontfamily
    state.GeneralSettings.row[data.index].fontupload = data.fontupload
    state.GeneralSettings.row[data.index].bgcolor = data.bgcolor
    state.GeneralSettings.row[data.index].editedby = data.editedby
    state.GeneralSettings.row[data.index].editedat = data.editedat
  },
  loadCurrentQnreAnsList: (state, data) => {
    state.tempQzUserList = data
  },
  deletePersonalInfoStatus: (state, {
    index,
    data,
    rolname
  }) => {
    if (rolname === 'usr') {
      state.users[index] =
        data
    } else {
      state.superusers[index] =
        data
    }
  },
  appendBible: (state, {
    data
  }) => {
    state.bibleType.push(data)
  },
  loadAllBible: (state, bibleType) => {
    state.bibleType = bibleType
  },
  updateBible: (state, {
    data
  }) => {
    state.bibleType[data.bibleId - 1].langId = data.langId
    state.bibleType[data.bibleId - 1].langType = data.langType
    state.bibleType[data.bibleId - 1].versionId = data.versionId
    state.bibleType[data.bibleId - 1].versionName = data.versionName
  },
  loadAllKjv: (state, kjv) => {
    state.kjv = kjv
  },
  loadAllBooks: (state, bookList) => {
    state.bookList = bookList
  },
  loadChapter: (state, chapter) => {
    state.chapter = chapter
  },
  loadVerse: (state, verse) => {
    state.verse = verse
  },
  loadWholeBibles: (state, bible) => {
    state.bible = bible
  },
  loadXmlBibles: (state, xmlbible) => {
    state.xmlbible = xmlbible
  },
  loadDistinctChapters: (state, distinctChapter) => {
    state.distinctChapter = distinctChapter
  },
  appendReading: (state, {
    data
  }) => {
    // x.slice().sort((a, b) => new Date(a.attendanceDate) - new Date(b.attendanceDate))
    state.dailyReading.push({
      planDetail: data.planDetail,
      readingPlan: data.readingPlan
    })
  },
  loadReadingByPlan: (state, dailyReading) => {
    state.dailyReading = dailyReading
  },
  updatePlan: (state, {
    index,
    data
  }) => {
    state.bibleplan[index].name = data.name
    state.bibleplan[index].planduration = data.planduration
    state.bibleplan[index].byDate = data.byDate
    state.bibleplan[index].makeupday = data.makeupday
    state.bibleplan[index].readingsperday = data.readingsperday
    state.bibleplan[index].creator = data.creator
    state.bibleplan[index].subject = data.subject
    state.bibleplan[index].description = data.description
  },
  // updateReading: (state, {
  //   index,
  //   data
  // }) => {
  //   state.dailyReading[index].planName = data.planName
  //   state.planType[index].planDuration = data.planDuration
  //   state.planType[index].totalDays = data.totalDays
  //   state.planType[index].fromDate = data.fromDate
  //   state.planType[index].toDate = data.toDate
  //   state.planType[index].ismakeUpDay = data.ismakeUpDay
  //   state.planType[index].makeUpday = data.makeUpday
  //   state.planType[index].noOfReadingPlan = data.noOfReadingPlan
  // },
  deleteUpload: (state, {
    inx,
    data
  }) => {
    state.groupUploads[inx].status = data.status
  },
  appendHelp: (state, {
    data
  }) => {
    // x.slice().sort((a, b) => new Date(a.attendanceDate) - new Date(b.attendanceDate))
    state.help.push(data)
  },
  loadAllHelp: (state, help) => {
    state.help = help
  },
  loadAllHelpAttachment: (state, helpAttachment) => {
    state.helpAttachment = helpAttachment
  },
  loadHelpAnswers: (state, helpAnswer) => {
    state.helpAnswer = helpAnswer
  },
  appendHelpAnswer: (state, {
    index,
    answer
  }) => {
    // x.slice().sort((a, b) => new Date(a.attendanceDate) - new Date(b.attendanceDate))
    // var ind = state.help.findIndex(x => x.helpId === data.helpI
    state.help[index].status = 1
    state.helpAnswer.push(answer.helpAnswer)
  },
  logout: (state) => {
    state.authToken = ''
    state.roles = null
    state.userId = ''
    state.email = ''
    state.phone = ''
  }
};
