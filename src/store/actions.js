import {
  HTTP
} from '../axios'
import store from '.'
export default {
  signup: ({
      commit
    }, payload) =>
    new Promise((resolve, reject) => {
      const url = '/user/register'
      HTTP.post(url, payload, {
          params: {
            cms: 'yes'
          }
        })
        .then(response => {
          // commit('registerUser', payload)
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    }),
  login: ({
      commit
    }, payload) =>
    new Promise((resolve, reject) => {
      const url = '/user/auth'
      HTTP.post(url, payload)
        .then(response => {
          if (response.data.type === 'success' && response.data.auth === true) {
            commit('loginUser', response.data)
            store.dispatch('loadExistingPages')
            store.dispatch('loadExistingLanguages')
            store.dispatch('loadLabelList')
            store.dispatch('loadAllLabelList')
            store.dispatch('loadGroupList')
            store.dispatch('loadRoleType')
            store.dispatch('loadCountry')
            store.dispatch('loadPriority')
            store.dispatch('loadDenomination')
            store.dispatch('loadChurchList')
            store.dispatch('loadExistingMedia')
            store.dispatch('loadExistingEvents')
            store.dispatch('loadExistingSidebarMenu')
            store.dispatch('loadExistingFooterMenu')
            store.dispatch('getAccess')
            store.dispatch('loadTestimony')
            store.dispatch('loadCourse')
            store.dispatch('loadMediaTest')
            store.dispatch('loadWholeBible')
            store.dispatch('loadXmlBible')
            store.dispatch('loadDistinctChapter')
            store.dispatch('loadBooks')
            store.dispatch('LoadAssignedMembers')
            store.dispatch('LoadAssignedLeaders')
            store.dispatch('loadPlan')
            store.dispatch('loadMediaClassification')
            store.dispatch('loadCourseMedia')
            store.dispatch('loadExistingPrayerGroup')
          }
          resolve(response)
        })
        .catch(err => {
          // alert('action' + err)
          console.log(err)
          reject(err)
        })
    }),
  resetAPIToken: ({
      commit
    }, payload) =>
    new Promise((resolve, reject) => {
      const url = '/user/apiTokenReset'
      HTTP.post(url, payload)
        .then(response => {
          commit('loginUser', response.data)
          store.dispatch('loadExistingPages')
          store.dispatch('loadExistingLanguages')
          store.dispatch('loadLabelList')
          store.dispatch('loadAllLabelList')
          store.dispatch('loadGroupList')
          store.dispatch('loadRoleType')
          store.dispatch('loadCountry')
          store.dispatch('loadPriority')
          store.dispatch('loadDenomination')
          store.dispatch('loadChurchList')
          store.dispatch('loadExistingMedia')
          store.dispatch('loadExistingEvents')
          store.dispatch('loadExistingSidebarMenu')
          store.dispatch('loadExistingFooterMenu')
          store.dispatch('getAccess')
          store.dispatch('loadTestimony')
          store.dispatch('loadCourse')
          store.dispatch('loadMediaTest')
          store.dispatch('loadWholeBible')
          store.dispatch('loadXmlBible')
          store.dispatch('loadDistinctChapter')
          store.dispatch('loadBooks')
          store.dispatch('LoadAssignedMembers')
          store.dispatch('LoadAssignedLeaders')
          store.dispatch('loadPlan')
          store.dispatch('loadMediaClassification')
          store.dispatch('loadCourseMedia')
          store.dispatch('loadExistingPrayerGroup')
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    }),
  loadUsers: ({
    commit
  }) => {
    HTTP.get('user/alluser', {
        params: {
          cms: 'yes',
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllUsers', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadTestimony: ({
    commit
  }) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    HTTP.get('Testimony/alltestimony', auth)
      .then(response => {
        commit('loadAllTestimony', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadCourse: ({
    commit
  }) => {
    HTTP.get('Course/allcourse', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllCourse', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadCourseMedia: ({
    commit
  }) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    HTTP.get('Course/courseMedia', auth)
      .then(response => {
        commit('loadAllCourseMedia', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadMediaTest: ({
    commit
  }) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    HTTP.get('Course/MediaTest', auth)
      .then(response => {
        commit('loadAllMediaTests', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadSectionByCourseId: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `Course/section/${payload.courseId}`
    HTTP.get(url, auth)
      .then(response => {
        commit('loadSection', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  // logout: ({
  //     commit
  //   }) =>
  //   new Promise(resolve => {
  //     commit('logout')
  //     localStorage.removeItem('userId')
  //     localStorage.removeItem('fullname')
  //     localStorage.removeItem('email')
  //     localStorage.removeItem('phone')
  //     localStorage.clear()
  //     localStorage.removeItem('authToken')
  //     delete HTTP.defaults.headers.common.Authorization
  //     resolve()
  //   }),
  logout: ({
      commit
    }) =>
    HTTP.get("user/logout", {
      params: {
        userId: localStorage.getItem('userId'),
        cms: 'yes',
        emailOrPhone: localStorage.getItem('email') ? localStorage.getItem('email') : localStorage.getItem('phone')
      }
    })
    .then(response => {
      commit('logout')
      localStorage.removeItem('userId')
      localStorage.removeItem('fullname')
      localStorage.removeItem('email')
      localStorage.removeItem('phone')
      localStorage.clear()
      localStorage.removeItem('authToken')
      // delete HTTP.defaults.headers['x-access-token']
    })
    .catch(err => {
      console.log(err)
    }),
  createLangType: ({
    commit
  }, payload) => {
    const url = 'Label/LangType'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Language Notification",
          message: "New Language has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingLanguages')
        // commit('appendLangType', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingLanguages: ({
    commit
  }) => {
    HTTP.get('Label', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllExistingLanguages', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingMedia: ({
    commit
  }) => {
    HTTP.get('Media', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllMedia', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingPages: ({
    commit
  }) => {
    HTTP.get('Page', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllPages', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingPrayerGroup: ({
    commit
  }) => {
    HTTP.get('prayer/group', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllPrayerGroup', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingPrayerTitle: ({
    commit
  }, payload) => {
    HTTP.get('prayer/title', {
        params: {
          groupId: payload.groupId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllPrayerTitle', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingPrayerDescription: ({
    commit
  }, payload) => {
    HTTP.get('prayer/description', {
        params: {
          titleId: payload.titleId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllPrayerDescription', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadAnsweredPrayer: ({
    commit
  }, payload) => {
    HTTP.get('prayer/answered', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllAnsweredPrayer', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingEvents: ({
    commit
  }) => {
    HTTP.get('Event', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllEvents', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingGeneralSettings: ({
    commit
  }) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    HTTP.get('Generalization', auth)
      .then(response => {
        commit('loadExistingGeneralization', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingSidebarMenu: ({
    commit
  }) => {
    HTTP.get('Menu/sidemenu', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllSidebarMenu', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingFooterMenu: ({
    commit
  }) => {
    HTTP.get('Menu/footermenu', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllFooterMenu', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadRoleType: ({
    commit
  }) => {
    HTTP.get('Master/getrole', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllRoleType', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadCountry: ({
    commit
  }) => {
    HTTP.get('Master/getcountry', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllCountry', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadPriority: ({
    commit
  }) => {
    HTTP.get('Master/priority', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllPriority', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadMediaClassification: ({
    commit
  }) => {
    HTTP.get('Master/mediaClassification', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllMediaClassification', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadLabelList: ({
    commit
  }) => {
    HTTP.get('Label/getEnglishLabel', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadEnglishLabel', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadAllLabelList: ({
    commit
  }) => {
    HTTP.get('Label/getAllLabel', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllLabel', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadPlan: ({
    commit
  }) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    HTTP.get('bibleplan', auth)
      .then(response => {
        commit('loadAllPlans', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadGroupList: ({
    commit
  }) => {
    HTTP.get('Group/all', {
        params: {
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllGroups', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadGroupMembers: ({
    commit
  }) => {
    HTTP.get('user/getGroupMembers', {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        }
      })
      .then(response => {
        commit('loadAllGrpMembers', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  // loadChapterByBook: ({
  //   commit
  // }, payload) => {
  //   const url = `Bible/chapter/${payload.b}`
  //   HTTP.get(url, {
  //       params: {
  //         userId: localStorage.getItem('userId')
  //       },
  //       payload
  //     })
  //     .then(response => {
  //       commit('loadChapter', response.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },
  loadCourseById: ({
    commit
  }, payload) => {
    const url = `course/course`
    HTTP.get(url, {
        params: {
          courseId: payload.courseId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        },
        payload
      })
      .then(response => {
        commit('loadCourseById', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createReading: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'bibleplan/readingPlan'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('appendReading', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editReadingPlan: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'bibleplan/readingPlan'
    HTTP.put(url, payload, auth)
      .then(response => {
        store.dispatch("loadExistingReading");
        // commit('updateReading', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  // loadReading: ({
  //   commit
  // }) => {
  //   HTTP.get('Plan/Reading', {
  //       params: {
  //         userId: localStorage.getItem('userId')
  //       }
  //     })
  //     .then(response => {
  //       commit('loadAllReading', response.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },
  loadBooks: ({
    commit
  }) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    HTTP.get('bibleplan/book/list', auth)
      .then(response => {
        commit('loadAllBooks', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadChapterByBook: ({
    commit
  }, payload) => {
    const url = `bibleplan/chapter/list`
    HTTP.get(url, {
        params: {
          bookId: payload.b
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        },
        payload
      })
      .then(response => {
        commit('loadChapter', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadVerse: ({
    commit
  }, payload) => {
    const url = `bibleplan/verse/list`
    HTTP.get(url, {
        params: {
          bookId: payload.b,
          chapterId: payload.c
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        },
        payload
      })
      .then(response => {
        commit('loadVerse', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadWholeBible: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `bibleplan/allbible`
    HTTP.get(url, auth)
      .then(response => {
        commit('loadWholeBibles', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadXmlBible: ({
    commit
  }, payload) => {
    const url = `Bible`
    HTTP.get(url, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadXmlBibles', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadDistinctChapter: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `bibleplan/distinctchapter`
    HTTP.get(url, auth)
      .then(response => {
        commit('loadDistinctChapters', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadExistingReading: ({
    commit
  }, payload) => {
    HTTP.get('bibleplan/allReading', {
        params: {
          planId: payload.planId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadReadingByPlan', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  GeneratePlanXml: ({
    commit
  }, payload) => {
    HTTP.get('download/plan/generatexml', {
        params: {
          planId: payload.planId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Bible Plan Notification",
          message: "Bible Plan has been added or updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        // commit('loadReadingByPlan', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  LoadAssignedMembers: ({
    commit
  }) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    HTTP.get('Group/groupmember', auth)
      .then(response => {
        commit('LoadAssignedMembers', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  LoadAssignedLeaders: ({
    commit
  }) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    HTTP.get('Group/groupleader', auth)
      .then(response => {
        commit('LoadAssignedLeaders', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  groupUpload: ({
    commit
  }, payload) => {
    const url = 'Group/proof'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          groupId: payload.uploadData.groupId,
          title: "Something uploaded",
          message: "New Upload has been done"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch("loadUploads", payload.uploadData);
        // commit('appendUploads', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteUploads: ({
    commit
  }, payload) => {
    const url = 'Group/deleteUploads'
    HTTP.post(url, payload)
      .then(response => {
        commit('deleteUpload', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  requestHelp: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    let url = 'Help'
    HTTP.post(url, payload, auth)
      .then(response => {
        const data = {
          userId: payload.data.userId,
          title: "Support Answer",
          message: "Support answered"
        }
        let helpurl = 'notify/user'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        commit('appendHelp', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadHelp: ({
    commit
  }, payload) => {
    // var x = "HIGH";
    HTTP.get('Help/queries', {
        params: {
          searchParam: payload.searchParam
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllHelp', response.data)
        this.$store.dispatch("loadHelp", payload);
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadHelpAttachment: ({
    commit
  }, payload) => {
    // var x = "HIGH";
    HTTP.get('Help/fetchQuery', {
        params: {
          queryId: payload
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllHelpAttachment', response.data)
        // this.$store.dispatch("loadHelp", payload);
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadHelpAnswer: ({
    commit
  }) => {
    HTTP.get('Help/HelpAnswered', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadHelpAnswers', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  replyForHelp: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    let url = 'Help/answer'
    HTTP.post(url, payload, auth)
      .then(response => {
        const data = {
          userId: payload.appuserId,
          title: "Help Desk Notification",
          message: "New Help Notification has been added"
        }
        let helpurl = 'notify/user'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        this.$store.dispatch("loadHelpAnswer");
        // commit('appendHelpAnswer', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  forgotPass: ({
      commit
    }, payload) =>
    new Promise((resolve, reject) => {
      const url = 'Mail/forgot'
      HTTP.post(url, payload)
        .then(response => {
          // commit('appendHelpAnswer', payload)
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    }),
  editBible: ({
    commit
  }, payload) => {
    const url = `Bible/${payload.id}`
    HTTP.put(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Bible Notification",
          message: "Bible has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        // commit('appendBible', response.data)
        store.dispatch("loadXmlBible")
        // commit('updateBible', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  changePass: ({
      commit
    }, payload) =>
    new Promise((resolve, reject) => {
      const auth = {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      }
      const url = '/user/edit-password'
      HTTP.post(url, payload, auth)
        .then(response => {
          commit('updatePassword', payload)
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    }),
  resetpassword: ({
      commit
    }, payload) =>
    new Promise((resolve, reject) => {
      const url = '/user/reset-password'
      HTTP.post(url, payload, {
          params: {
            userId: payload.userId,
            rolName: payload.name
          }
        })
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    }),
  editLanguage: ({
    commit
  }, payload) => {
    const url = `Label/${payload.langId}`
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Language Notification",
          message: "Language has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        commit('updateLanguage', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createEnglishLabel: ({
    commit
  }, payload) => {
    const url = 'Label/EnglishLabel'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "English Label Notification",
          message: "New English Label has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadLabelList')
        store.dispatch('loadAllLabelList')
        // commit('appendEnglishLabel', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createPlan: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'bibleplan'
    HTTP.post(url, payload, auth)
      .then(response => {
        store.dispatch('loadPlan')
        commit('appendPlans', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editPlan: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `bibleplan`
    HTTP.put(url, payload, auth)
      .then(response => {
        store.dispatch('loadPlan')
        // commit('updatePlan', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editEngLabel: ({
    commit
  }, payload) => {
    const url = `Label/EnglishLabel/${payload.engId}`
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Label Notification",
          message: "English Label has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        // commit('updateEngLabel', payload)
        store.dispatch('loadLabelList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editAllLabel: ({
    commit
  }, payload) => {
    const url = `Label/updateAllLabel/${payload.labelId}`
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Label Notification",
          message: "Label has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        // commit('updateAllLabel', payload)
        store.dispatch('loadAllLabelList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editProfile: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'user/edit-profile'
    HTTP.put(url, payload, auth)
      .then(response => {
        commit('updateProfile', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  addGroup: ({
    commit
  }, payload) => {
    const url = 'Group'
    HTTP.post(url, payload, {
        params: {
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('appendGroup', response.data)
        store.dispatch('loadGroupList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editGroup: ({
    commit
  }, payload) => {
    const url = `Group`
    HTTP.put(url, payload, {
        params: {
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('updateGroup', response.data)
        // store.dispatch('loadGroupList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  // addToGrpBasic: ({
  //   commit,
  // }, payload) => {
  //   const url = 'user/addtogrp-basic'
  //   HTTP.post(url, payload)
  //     .then((response) => {
  //       commit('addToGroupBasic', response.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },
  assignLeaders: ({
    commit
  }, payload) => {
    const url = 'Group/addLeader'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          groupId: payload.groupId,
          title: "Leader added",
          message: "Leader has been assigned."
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        // commit('assignroleAndgrp', response.data)
        store.dispatch('LoadAssignedLeaders')
        store.dispatch('loadUsers')
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadAttendance: ({
    commit
  }, payload) => {
    HTTP.get('Group/attendance', {
        params: {
          groupId: payload.groupId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        },
        payload
      })
      .then(response => {
        commit('loadAttendance', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadUploads: ({
    commit
  }, payload) => {
    HTTP.get('Group/proof', {
        params: {
          groupId: payload.groupId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        },
        payload
      })
      .then(response => {
        commit('loadGroupUploads', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadgrpUploadAttachments: ({
    commit
  }, payload) => {
    HTTP.get('Group/attachment', {
        params: {
          groupUploadId: payload.groupUploadId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        },
        payload
      })
      .then(response => {
        commit('loadGroupUploadAttachment', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editGroupAttendance: ({
    commit
  }, payload) => {
    const url = `Group/attendance/${payload.data.groupId}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        }
      })
      .then(response => {
        const data = {
          groupId: payload.data.groupId,
          title: "Attendance update",
          message: "Attendance has been updated"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        commit('updateAttendance', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  groupAttendance: ({
    commit
  }, payload) => {
    const url = 'Group/attendance'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          groupId: payload.groupId,
          title: "Attendance added",
          message: "New Attendance has been added"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        // commit('appendGroupAttendance', response.data)
        store.dispatch("loadAttendance", payload);
        // store.dispatch('loadPlan')
      })
      .catch(err => {
        console.log(err)
      })
  },
  assignMemberRoleAndGroup: ({
    commit
  }, payload) => {
    const url = 'Group/adduser'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          groupId: payload.groupId,
          title: "Member added",
          message: "New Member has been added"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        // commit('assignroleAndgrp', response.data)

        store.dispatch('LoadAssignedMembers')
        store.dispatch('loadUsers')
      })
      .catch(err => {
        console.log(err)
      })
  },
  assignUpdate: ({
    commit
  }, payload1) => {
    const url = 'Group/assignupdate'
    HTTP.post(url, payload1, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        }
      })
      .then(response => {
        const data = {
          groupId: payload1.groupId,
          title: "Member added",
          message: "New Member has been added"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        commit('assignEdit', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  addRole: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/addrole'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('appendRole', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editRole: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `Master/role/${payload.roleId}`
    HTTP.put(url, payload, auth)
      .then(response => {
        commit('updateRole', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteRole: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/deleterole'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('deleteRoleStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  addCountry: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/addcountry'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('appendCountry', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  addPriority: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/addpriority'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('appendPriority', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  addMediaClassification: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/mediaClassification'
    HTTP.post(url, payload, auth)
      .then(response => {
        store.dispatch('loadMediaClassification')
        // commit('appendMediaClassification', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editMediaClassification: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `Master/mediaClassification/${payload.mediaClassifyId}`
    HTTP.put(url, payload, auth)
      .then(response => {
        store.dispatch('loadMediaClassification')
        // commit('updateCountry', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteMediaClassification: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/mediaClassification/delete'
    HTTP.post(url, payload, auth)
      .then(response => {
        store.dispatch('loadMediaClassification')
        // commit('deleteCountryStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editCountry: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `Master/country/${payload.countryId}`
    HTTP.put(url, payload, auth)
      .then(response => {
        commit('updateCountry', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editPriority: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `Master/priority/${payload.priorityId}`
    HTTP.put(url, payload, auth)
      .then(response => {
        commit('updatePriority', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteCountry: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/deletecountry'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('deleteCountryStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deletePriority: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/deletepriority'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('deletePriorityStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  addDenomination: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/addDenomination'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('appendDenomination', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editDenomination: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `Master/denomination/${payload.denominationId}`
    HTTP.put(url, payload, auth)
      .then(response => {
        commit('updateDenomination', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteDenomination: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Master/deleteDenomination'
    HTTP.post(url, payload, auth)
      .then(response => {
        commit('deleteDenominationStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadDenomination: ({
    commit
  }) => {
    HTTP.get('Master/getdenomination', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllDenomination', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteLanguage: ({
    commit
  }, payload) => {
    const url = 'Label/deletelang'
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        // commit('deleteLangStatus', payload)
        store.dispatch('loadExistingLanguages')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteEngLabel: ({
    commit
  }, payload) => {
    const url = 'Label/delete-english'
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        // commit('deleteEngStatus', payload)
        store.dispatch('loadLabelList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteAllLabel: ({
    commit
  }, payload) => {
    const url = 'Label/delete-allLabel'
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadAllLabelList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteGroup: ({
    commit
  }, payload) => {
    const url = 'Group/deletegroup'
    HTTP.post(url, payload, {
        params: {
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('deleteGrpStatus', payload)
        store.dispatch('LoadAssignedMembers')
        store.dispatch('LoadAssignedLeaders')
        store.dispatch('loadGroupList')
        store.dispatch('loadUsers')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteUser: ({
    commit
  }, payload) => {
    const url = 'Group/deleteuser'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          groupId: payload.groupId,
          title: "Member removed",
          message: "Member has been removed"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('LoadAssignedMembers')
        store.dispatch('loadUsers')
        // commit('deleteUserStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteLeader: ({
    commit
  }, payload) => {
    const url = 'Group/removeleadership'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          groupId: payload.groupId,
          title: "Leader removed",
          message: "Leader has been removed"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('LoadAssignedLeaders')
        store.dispatch('loadUsers')
        // commit('deleteLeaderStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  transferMember: ({
    commit
  }, payload) => {
    const url = 'Group/transferuser'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          groupId: payload.groupId,
          title: "Member transfered",
          message: "Member has been transfered"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('LoadAssignedMembers')
        store.dispatch('loadUsers')
        // commit('transferMembers', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  transferLeader: ({
    commit
  }, payload) => {
    const url = 'Group/transferleader'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          groupId: payload.groupId,
          title: "Leader transfered",
          message: "Leader has been transfered"
        }
        let helpurl = 'notify/group'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('LoadAssignedLeaders')
        store.dispatch('loadUsers')
        // commit('transferMembers', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  addChurch: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Church'
    HTTP.post(url, auth, payload)
      .then(response => {
        commit('appendChurch', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  loadChurchList: ({
    commit
  }) => {
    HTTP.get('Church', {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadAllChurchList', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editChurch: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = `Church/${payload.data.churchId}`
    HTTP.put(url, auth, payload)
      .then(response => {
        commit('updateChurch', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteChurch: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Church/delete'
    HTTP.post(url, auth, payload)
      .then(response => {
        commit('deleteChurchStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteUsrPersonalInfo: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'user/deletePersonalInfo'
    HTTP.post(url, payload, auth)
      .then(response => {
        store.dispatch('loadUsers')
        // commit('deletePersonalInfoStatus', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createNewBible: ({
    commit
  }, payload) => {
    const url = 'Bible'
    HTTP.post(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Bible Notification",
          message: "New Bible has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        // commit('appendBible', response.data)
        store.dispatch("loadXmlBible")
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteBible: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'Bible/deletebible'
    HTTP.post(url, payload, auth)
      .then(response => {
        store.dispatch('loadXmlBible')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deletePlan: ({
    commit
  }, payload) => {
    const auth = {
      headers: {
        "x-access-token": localStorage.getItem('authToken')
      }
    }
    const url = 'bibleplan/deleteplan'
    HTTP.post(url, payload, auth)
      .then(response => {
        store.dispatch('loadPlan')
      })
      .catch(err => {
        console.log(err)
      })
  },
  createNewMedia: ({
    commit
  }, payload) => {
    let url = 'Media'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Media Notification",
          message: "New Media has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingMedia')
        store.dispatch('loadCourseMedia')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editMediaById: ({
    commit
  }, payload) => {
    const url = `Media/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Media Notification",
          message: "Media has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingMedia')
        store.dispatch('loadCourseMedia')
        // commit('updateMedia', response)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createNewPage: ({
    commit
  }, payload) => {
    let url = 'Page'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Page Notification",
          message: "New Page has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingPages')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editPageById: ({
    commit
  }, payload) => {
    const url = `Page/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Page Notification",
          message: "Page has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        commit('updatePage', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createPrayerGroup: ({
    commit
  }, payload) => {
    let url = 'prayer/group'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Prayer Notification",
          message: "New Prayer Group has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingPrayerGroup')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editPrayerGroup: ({
    commit
  }, payload) => {
    const url = `prayer/group`
    HTTP.put(url, payload, {
        params: {
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Prayer Notification",
          message: "Prayer Group has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingPrayerGroup')
      })
      .catch(err => {
        console.log(err)
      })
  },
  createPrayerTitle: ({
    commit
  }, payload) => {
    let url = 'prayer/title'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Prayer Notification",
          message: "New Prayer Title has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingPrayerTitle', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editPrayerTitle: ({
    commit
  }, payload) => {
    const url = `prayer/title`
    HTTP.put(url, payload, {
        params: {
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Prayer Notification",
          message: "Prayer Title has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingPrayerTitle', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createPrayerDescription: ({
    commit
  }, payload) => {
    let url = 'prayer/description'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Prayer Notification",
          message: "New Prayer Request has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingPrayerDescription', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editPrayerDescription: ({
    commit
  }, payload) => {
    const url = `prayer/description`
    HTTP.put(url, payload, {
        params: {
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Prayer Notification",
          message: "Prayer Description has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingPrayerDescription', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  // answeredPrayer: ({
  //   commit
  // }, payload) => {
  //   const url = `prayer/answered`
  //   HTTP.put(url, payload, {
  //       params: {
  //         cms: 'yes'
  //       },
  //       headers: {
  //         "x-access-token": localStorage.getItem('authToken')
  //       }
  //     })
  //     .then(response => {
  //       const data = {
  //         title: "Prayer Notification",
  //         message: "Answered Prayer"
  //       }
  //       let helpurl = 'notify/all'
  //       HTTP.post(helpurl, {
  //           headers: {
  //             "x-access-token": localStorage.getItem('authToken')
  //           },
  //           data
  //         })
  //         .then(response => {})
  //       store.dispatch('loadExistingPrayerDescription', payload)
  //       store.dispatch('loadAnsweredPrayer')
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },
  createNewEvent: ({
    commit
  }, payload) => {
    let url = 'Event'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Event Notification",
          message: "New Event has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingEvents')
      })
      .catch(err => {
        console.log(err)
      })
  },
  createGeneralSettings: ({
    commit
  }, payload) => {
    let url = 'Generalization'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingGeneralSettings')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editEventById: ({
    commit
  }, payload) => {
    const url = `Event/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Event Notification",
          message: "Event has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        commit('updateEvent', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editGeneralizationById: ({
    commit
  }, payload) => {
    const url = `Generalization/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('updateGeneralization', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createSidebarMenu: ({
    commit
  }, payload) => {
    let url = 'Menu/sidemenu'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Sidebar Notification",
          message: "New Sidebar Menu has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingSidebarMenu')
        store.dispatch('loadLabelList')
        store.dispatch('loadAllLabelList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  createCourses: ({
    commit
  }, payload) => {
    let url = 'Course'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadCourse')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editSidebarMenuById: ({
    commit
  }, payload) => {
    let url = `Menu/sidemenu/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Sidebar Notification",
          message: "Sidebar Menu has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingSidebarMenu')
        store.dispatch('loadLabelList')
        store.dispatch('loadAllLabelList')
        // commit('updateSidebarMenu', response)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createFooterMenu: ({
    commit
  }, payload) => {
    let url = 'Menu/footermenu'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Footer Menu Notification",
          message: "Footer Menu has been added"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingFooterMenu')
        store.dispatch('loadLabelList')
        store.dispatch('loadAllLabelList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  editFooterMenuById: ({
    commit
  }, payload) => {
    let url = `Menu/footermenu/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId'),
          cms: 'yes'
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        const data = {
          title: "Footer Menu Notification",
          message: "Footer Menu has been updated"
        }
        let helpurl = 'notify/all'
        HTTP.post(helpurl, data, {
            headers: {
              "x-access-token": localStorage.getItem('authToken')
            }
          })
          .then(response => {})
        store.dispatch('loadExistingFooterMenu')
        store.dispatch('loadLabelList')
        // commit('updateFooterMenu', response)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createAccess: ({
    commit
  }, payload) => {
    let url = 'access'
    HTTP.post(url, payload, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('appendAccess', response)
      })
      .catch(err => {
        console.log(err)
      })
  },
  editAccess: ({
    commit
  }, payload) => {
    let url = 'access'
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('editAccess', response)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getAccess: ({
    commit
  }, payload) => {
    let url = 'access'
    HTTP.get(url, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('getAllAccess', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteEvent: ({
    commit
  }, payload) => {
    const url = `Event/delete/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingEvents')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteMedia: ({
    commit
  }, payload) => {
    const url = `Media/delete/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingMedia')
        store.dispatch('loadCourseMedia')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteFooterMenu: ({
    commit
  }, payload) => {
    let url = `Menu/deletefootermenu/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingFooterMenu')
        store.dispatch('loadLabelList')
        store.dispatch('loadAllLabelList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteSidebarMenu: ({
    commit
  }, payload) => {
    let url = `Menu/deletesidemenu/${payload.id}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingSidebarMenu')
        store.dispatch('loadLabelList')
        store.dispatch('loadAllLabelList')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deletePage: ({
    commit
  }, payload) => {
    const url = `Page/delete/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingPages')
      })
      .catch(err => {
        console.log(err)
      })
  },
  thankfulPrayerGroup: ({
    commit
  }, payload) => {
    const url = `prayer/group/{groupId}`
    HTTP.get(url, {
        params: {
          groupId: payload.groupId,
          userId: payload.userId
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        commit('loadThankPrayer', response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deletePrayerGroup: ({
    commit
  }, payload) => {
    const url = `prayer/group/` + payload.groupId
    HTTP.delete(url, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingPrayerGroup')
      })
      .catch(err => {
        console.log(err)
      })
  },
  deletePrayerDescription: ({
    commit
  }, payload) => {
    const url = `prayer/description/` + payload.descriptionId
    HTTP.delete(url, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingPrayerDescription', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deletePrayerTitle: ({
    commit
  }, payload) => {
    const url = `prayer/title/` + payload.titleId
    HTTP.delete(url, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadExistingPrayerTitle', payload)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteCourse: ({
    commit
  }, payload) => {
    const url = `Course/delete/${payload.ID}`
    HTTP.put(url, payload, {
        params: {
          userId: localStorage.getItem('userId')
        },
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(response => {
        store.dispatch('loadCourse')
        // store.dispatch('loadExistingPages')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
