import userRegistration from '../components/user/userRegistration.vue'
import groupType from '../components/group/groupType.vue'
import addChurch from '../components/group/addChurch.vue'
import groupCreation from '../components/group/groupCreation.vue'
import groupProfile from '../components/group/groupProfile.vue'
import resetpassword from '../components/user/resetpassword.vue'
import groupAttendance from '../components/group/groupAttendance.vue'
import groupTableView from '../components/group/groupTableView.vue'
import AddBible from '../components/admin/bible/AddBible.vue'
import plan from '../components/admin/bible/plan.vue'
import login from '../components/user/login.vue'
import forgotPassword from '../components/user/forgotPassword.vue'
import changePassword from '../components/user/changePassword.vue'
import viewParticipants from '../components/admin/participants/viewParticipants.vue'
import viewGroup from '../components/group/viewGroup.vue'
import userProfile from '../components/user/userProfile.vue'
import adminProfile from '../components/user/adminProfile.vue'
import editUserProfile from '../components/user/editUserProfile.vue'
import editAdminProfile from '../components/user/editAdminProfile.vue'
import addLabel from '../components/admin/label/addLabel.vue'
import addLabelText from '../components/admin/label/addLabelText.vue'
import masters from '../components/admin/master/masters.vue'
import editChurch from '../components/group/editChurch.vue'
import addMedia from '../components/admin/media/addMedia.vue'
import viewGeneralMedia from '../components/admin/media/listGeneralMedia.vue'
import viewCourseMedia from '../components/admin/media/listCourseMedia.vue'
import editMedia from '../components/admin/media/editMedia.vue'
import footerMenu from '../components/admin/menu/addFooterMenu.vue'
import viewFooterMenu from '../components/admin/menu/listFooterMenu.vue'
import editFooterMenu from '../components/admin/menu/editFooterMenu.vue'
import sidebarMenu from '../components/admin/menu/addSidebarMenu.vue'
import viewSidebarMenu from '../components/admin/menu/listSidebarMenu.vue'
import editSidebarMenu from '../components/admin/menu/editSidebarMenu.vue'
import addPage from '../components/admin/page/addPage.vue'
import viewPage from '../components/admin/page/listPage.vue'
import editPage from '../components/admin/page/editPage.vue'
import addEvent from '../components/admin/event/addEvent.vue'
import viewEvent from '../components/admin/event/listEvent.vue'
import editEvent from '../components/admin/event/editEvent.vue'
import prayerGroup from '../components/admin/prayer/prayerGroup.vue'
import prayerTitle from '../components/admin/prayer/prayerTitle.vue'
import prayerDescription from '../components/admin/prayer/prayerDescription.vue'
import viewThanksPrayer from '../components/admin/prayer/viewThanksPrayer.vue'
import editGroup from '../components/group/editGroup.vue'
import viewQuiz from '../components/admin/quiz/listQuiz.vue'
import userAttendance from '../components/user/userAttendance.vue'
import userModule from '../components/user/userModule.vue'
import viewGroupUpload from '../components/group/viewGroupUpload.vue'
import requestHelp from '../components/help/requestHelp.vue'
import viewHelp from '../components/help/viewHelp.vue'
import viewTestimony from '../components/testimony/viewTestimony.vue'
import addGeneralization from '../components/admin/generalization/addGeneralization.vue'
import viewGeneralization from '../components/admin/generalization/viewGeneralization.vue'
import editGeneralization from '../components/admin/generalization/editGeneralization.vue'
import addModularization from '../components/admin/modularization/addModularization.vue'
import listModularization from '../components/admin/modularization/listModularization.vue'
import editModularization from '../components/admin/modularization/editModularization.vue'
import viewModularization from '../components/admin/modularization/viewModularization.vue'
export const routes = [{
    path: '/userRegistration',
    component: userRegistration
  },
  {
    path: '/userRegistration/:id',
    component: userRegistration
  },
  {
    path: '/groupType',
    component: groupType,
    meta: {
      breadcrumb: [{
          name: 'Group Details'
        },
        {
          name: 'Groups'
        }
      ]
    }
  },
  {
    path: '/groupCreation',
    component: groupCreation
  },
  {
    path: '/groupProfile/:id',
    component: groupProfile
  },
  {
    path: '/resetpassword/:id',
    component: resetpassword
  },
  {
    path: '/groupAttendance',
    component: groupAttendance
  },
  {
    path: '/groupTableView',
    component: groupTableView
  },
  {
    path: '/AddBible',
    component: AddBible
  },
  {
    path: '/plan',
    component: plan
  },
  {
    path: '/',
    component: login
  },
  {
    path: '/forgotPassword',
    component: forgotPassword
  },
  {
    path: '/changePassword',
    component: changePassword
  },
  {
    path: '/viewParticipants',
    component: viewParticipants
  },
  {
    path: '/userProfile/:id',
    component: userProfile
  },
  {
    path: '/adminProfile/:id',
    component: adminProfile
  },
  {
    path: '/editUserProfile/:id',
    component: editUserProfile
  },
  {
    path: '/editAdminProfile/:id',
    component: editAdminProfile
  },
  {
    path: '/addLabel',
    component: addLabel
  },
  {
    path: '/addLabelText/:id',
    component: addLabelText
  },
  {
    path: '/viewGroup',
    component: viewGroup
  },
  {
    path: '/masters',
    component: masters
  },
  {
    path: '/addChurch',
    component: addChurch
  },
  {
    path: '/editChurch/:id',
    component: editChurch
  },
  {
    path: '/ViewGeneralMedia',
    component: viewGeneralMedia
  },
  {
    path: '/ViewCourseMedia',
    component: viewCourseMedia
  },
  {
    path: '/AddMedia',
    component: addMedia
  },
  {
    path: '/EditMedia/:id',
    component: editMedia
  },
  {
    path: '/EditMedia/:id/:view',
    component: editMedia
  },
  {
    path: '/editModularization/:id',
    component: editModularization
  },
  {
    path: '/viewModularization/:id',
    component: viewModularization
  },
  {
    path: '/AddPage',
    component: addPage
  },
  {
    path: '/ViewPage',
    component: viewPage
  },
  {
    path: '/EditPage/:id',
    component: editPage
  },
  {
    path: '/EditPage/:id/:view',
    component: editPage
  },
  {
    path: '/AddEvent',
    component: addEvent
  },
  {
    path: '/ViewEvent',
    component: viewEvent
  },
  {
    path: '/EditEvent/:id',
    component: editEvent
  },
  {
    path: '/EditEvent/:id/:view',
    component: editEvent
  },
  {
    path: '/PrayerGroup',
    component: prayerGroup
  },
  {
    path: '/PrayerTitle/:id',
    component: prayerTitle
  },
  {
    path: '/PrayerDescription/:id',
    component: prayerDescription
  },
  {
    path: '/ViewThanksPrayer',
    component: viewThanksPrayer
  },
  {
    path: '/editGroup/:id',
    component: editGroup
  },
  {
    path: '/AddSidebarMenu',
    component: sidebarMenu
  },
  {
    path: '/ViewSidebarMenu',
    component: viewSidebarMenu
  },
  {
    path: '/EditSidebarMenu/:id',
    component: editSidebarMenu
  },
  {
    path: '/EditSidebarMenu/:id/:view',
    component: editSidebarMenu
  },
  {
    path: '/AddFooterMenu',
    component: footerMenu
  },
  {
    path: '/ViewFooterMenu',
    component: viewFooterMenu
  },
  {
    path: '/EditFooterMenu/:id',
    component: editFooterMenu
  },
  {
    path: '/EditFooterMenu/:id/:view',
    component: editFooterMenu
  },
  {
    path: '/ViewQuiz',
    component: viewQuiz
  },
  {
    path: '/userAttendance',
    component: userAttendance
  },
  {
    path: '/userModule',
    component: userModule
  },
  {
    path: '/viewGroupUpload',
    component: viewGroupUpload
  },
  {
    path: '/requestHelp',
    component: requestHelp
  },
  {
    path: '/viewHelp',
    component: viewHelp
  },
  {
    path: '/viewTestimony',
    component: viewTestimony
  },
  {
    path: '/addGeneralization',
    component: addGeneralization
  },
  {
    path: '/viewGeneralization',
    component: viewGeneralization
  },
  {
    path: '/EditGeneralization/:id',
    component: editGeneralization
  },
  {
    path: '/EditGeneralization/:id/:view',
    component: editGeneralization
  },
  {
    path: '/AddModularization',
    component: addModularization
  },
  {
    path: '/listModularization',
    component: listModularization
  }
]
