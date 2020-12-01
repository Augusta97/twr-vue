<template>
  <nav class="col-sm-2 nav-spmenu">
    <div class="box">
      <div class="content">
        <!-- {{allAccess[i].access;}} -->
        <div class="border-botom" style="padding: 20px 0px;">
          <div role="tablist">
            <b-card no-body class="sidebar-card">
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon icon="sync" class="marTop5" />
                      <span class="sidebar_title col-sm-10">Dashboard</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 || (roleId === 1 && getIndexStatus('Page'))"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-h
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10">Page</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-h"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/AddPage" tag="li">
                      <a class="nav-links">Add Page</a>
                    </router-link>
                    <router-link to="/ViewPage" activeClass="active" tag="li">
                      <a class="nav-links">View Page</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 || (roleId === 1 && getIndexStatus('Media'))"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-i
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10">Media</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-i"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/AddMedia" tag="li">
                      <a class="nav-links">Add Media</a>
                    </router-link>
                    <router-link
                      to="/ViewGeneralMedia"
                      activeClass="active"
                      tag="li"
                    >
                      <a class="nav-links">General Media</a>
                    </router-link>
                    <router-link
                      to="/ViewCourseMedia"
                      activeClass="active"
                      tag="li"
                    >
                      <a class="nav-links">Course Media</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 || (roleId === 1 && getIndexStatus('Event'))"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-j
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10">Event</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-j"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/AddEvent" tag="li">
                      <a class="nav-links">Add Event</a>
                    </router-link>
                    <router-link to="/ViewEvent" activeClass="active" tag="li">
                      <a class="nav-links">View Event</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card class="sidebar-card" no-body v-if="roleId === 99">
              <b-card-header header-tag="header" class role="tab">
                <div
                  v-b-toggle.collapse-k
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon icon="book" class="marTop5" />
                      <span class="sidebar_title col-sm-10">Bible</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-k"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/AddBible" tag="li">
                      <a class="nav-links">Add Bible</a>
                    </router-link>
                    <router-link to="/plan" active-class="active" tag="li">
                      <a class="nav-links">Create Plan</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 || (roleId === 1 && getIndexStatus('Prayer'))"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-p
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10">Prayer</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-p"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/PrayerGroup" tag="li">
                      <a class="nav-links">Prayer Group</a>
                    </router-link>
                    <!-- <router-link to="/ViewThanksPrayer" tag="li">
                      <a class="nav-links">Thanks Prayer</a>
                    </router-link> -->
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 && getIndexStatus('Sidebar Menu')"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-l
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10">Sidebar Menu</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-l"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/AddSidebarMenu" tag="li">
                      <a class="nav-links">Add Sidebar Menu</a>
                    </router-link>
                    <router-link
                      to="/ViewSidebarMenu"
                      activeClass="active"
                      tag="li"
                    >
                      <a class="nav-links">View Sidebar Menu</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 && getIndexStatus('Footer Menu')"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-m
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10">Footer Menu</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-m"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/AddFooterMenu" tag="li">
                      <a class="nav-links">Add Footer Menu</a>
                    </router-link>
                    <router-link
                      to="/viewFooterMenu"
                      activeClass="active"
                      tag="li"
                    >
                      <a class="nav-links">View Footer Menu</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 && getIndexStatus('Generalization')"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-r
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10"
                        >Generalization</span
                      >
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-r"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/addGeneralization" tag="li">
                      <a class="nav-links">Add Generalization</a>
                    </router-link>
                    <router-link
                      to="/viewGeneralization"
                      activeClass="active"
                      tag="li"
                    >
                      <a class="nav-links">View Generalization</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="
                roleId === 99 ||
                  (roleId === 1 && getIndexStatus('Generalization') == 1)
              "
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-s
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10">Course</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-s"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/AddModularization" tag="li">
                      <a class="nav-links">Add Course</a>
                    </router-link>
                    <router-link to="/listModularization" tag="li">
                      <a class="nav-links">View Course</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 || (roleId === 1 && getIndexStatus('Users'))"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  v-b-toggle.collapse-c
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon icon="users" class="marTop5" />
                      <span class="sidebar_title col-sm-10"
                        >User Management</span
                      >
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-c"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link
                      :to="{ path: `/userRegistration/${userId}` }"
                      tag="li"
                    >
                      <a class="nav-links">Register User</a>
                    </router-link>
                    <a class="nav-links" v-b-modal.changePass
                      >Change Password</a
                    >
                    <router-link to="/viewParticipants" tag="li">
                      <a class="nav-links">View Participants</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 || (roleId === 1 && getIndexStatus('Group'))"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  v-b-toggle.collapse-d
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon icon="user" class="marTop5" />
                      <span class="sidebar_title col-sm-10">Group</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-d"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/groupCreation" tag="li">
                      <a class="nav-links">Group Creation</a>
                    </router-link>
                    <router-link to="/viewGroup" tag="li">
                      <a class="nav-links">View Group Details</a>
                    </router-link>
                    <router-link to="/addChurch" tag="li">
                      <a class="nav-links">Add Church</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card class="sidebar-card" no-body v-if="roleId === 99">
              <b-card-header header-tag="header" class role="tab">
                <div
                  id="heading2"
                  v-b-toggle.collapse-e
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p
                      class="mb-0 white-text font-thin d-flex"
                      style="color:white;"
                    >
                      <font-awesome-icon icon="users" class="marTop5" />
                      <span class="sidebar_title col-sm-10">Masters</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-e"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/masters" active-class="active" tag="li">
                      <a class="nav-links">Master</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId == 1 || roleId == 99"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  id="heading2"
                  v-b-toggle.collapse-f
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p
                      class="mb-0 white-text font-thin d-flex"
                      style="color:white;"
                    >
                      <font-awesome-icon icon="users" class="marTop5" />
                      <span class="sidebar_title col-sm-10">Language</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-f"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul
                    class="nav flex-column"
                    v-if="filterLang && filterLang.length"
                  >
                    <router-link
                      to="/addLabel"
                      active-class="active"
                      tag="li"
                      v-if="roleId == 99"
                    >
                      <a class="nav-links">Add Language</a>
                    </router-link>
                    <router-link
                      v-for="(lang, inx) in filterLang"
                      :key="inx"
                      :to="{ path: `/addLabelText/${lang.langId}` }"
                      active-class="active"
                      tag="li"
                    >
                      <a class="nav-links">{{ lang.OriginalLangtext }}</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              class="sidebar-card"
              no-body
              v-if="roleId === 99 || (roleId === 1 && getIndexStatus('Quiz'))"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  block
                  v-b-toggle.collapse-n
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex">
                      <font-awesome-icon
                        icon="book"
                        class="marTop5"
                      ></font-awesome-icon>
                      <span class="sidebar_title col-sm-10">Quiz</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-n"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/viewQuiz" activeClass="active" tag="li">
                      <a class="nav-links">View Quiz</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              no-body
              class="sidebar-card"
              v-if="roleId === 99 || (roleId === 1 && getIndexStatus('Help'))"
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  v-b-toggle.collapse-g
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p
                      class="mb-0 white-text font-thin d-flex"
                      style="color:white;"
                    >
                      <font-awesome-icon icon="users" class="marTop5" />
                      <span class="sidebar_title col-sm-10"
                        >Help Management</span
                      >
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-g"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link
                      to="/requestHelp"
                      tag="li"
                      v-if="roleId != 1 && roleId != 99"
                    >
                      <a class="nav-links">Request Help</a>
                    </router-link>
                    <router-link to="/viewHelp" active-class="active" tag="li">
                      <a class="nav-links">Help</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <b-card
              no-body
              class="sidebar-card"
              v-if="
                roleId === 99 || (roleId === 1 && getIndexStatus('Testimony'))
              "
            >
              <b-card-header header-tag="header" class role="tab">
                <div
                  v-b-toggle.collapse-k
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p
                      class="mb-0 white-text font-thin d-flex"
                      style="color:white;"
                    >
                      <font-awesome-icon icon="users" class="marTop5" />
                      <span class="sidebar_title col-sm-10">Testimony</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse
                id="collapse-k"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link
                      to="/viewTestimony"
                      active-class="active"
                      tag="li"
                    >
                      <a class="nav-links">View Testimony</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!-- <b-card no-body v-if="(roleId === 99) || (roleId === 1 && getIndexStatus('Media'))">
              <b-card-header header-tag="header" class role="tab">
                <div
                  id="heading3"
                  v-b-toggle.collapse-g
                  block
                  variant="info"
                  class="card-header sidebar_headspace z-depth-1"
                >
                  <a>
                    <p class="mb-0 white-text font-thin d-flex" style="color:white;">
                      <font-awesome-icon icon="users" class="marTop5" />
                      <span class="sidebar_title col-sm-10">Module</span>
                    </p>
                  </a>
                </div>
              </b-card-header>
              <b-collapse id="collapse-g" accordion="my-accordion" role="tabpanel">
                <b-card-body class="cardpadd mb-1 rgba-grey-light white-text">
                  <ul class="nav flex-column">
                    <router-link to="/module" active-class="active" tag="li">
                      <a class="nav-links">Add Module</a>
                    </router-link>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>-->
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userId: localStorage.getItem("userId")
    };
  },
  methods: {
    getIndexStatus(data) {
      let i = this.allAccess.findIndex(x => x.name == data);
      return this.allAccess[i].access;
    }
  },
  computed: {
    ...mapState(["existinglang", "allAccess", "roleId"]),
    filterLang() {
      if (this.roleId === 1) {
        return this.existinglang.rows.filter(x => x.langId !== 1);
      } else {
        return this.existinglang.rows;
      }
    }
  }
};
</script>
