import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faUser, faSync, faTrash, faBook, faUsers, faBuilding, faEdit, faPhone, faPlus, faRandom, faSearch, faEye, faCamera, fas, faPaperPlane, faReply
} from '@fortawesome/free-solid-svg-icons'
import { faUserCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

library.add(
  faUser,
  faUsers,
  faTrash,
  faSync,
  faBuilding,
  faUserCircle,
  faCheckCircle,
  faBook,
  faEdit,
  faPhone,
  faPlus,
  faRandom,
  faSearch,
  faEye,
  faCamera,
  faPaperPlane,
  faReply
)
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon) // registered globally
