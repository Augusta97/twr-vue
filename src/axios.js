import axios from 'axios'

export const HTTP = axios.create({
  // baseURL: 'http://www.Nexusnyi.com:3000/',
  baseURL: process.env.VUE_APP_DB_API,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    put: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

// HTTP.interceptors.request.use(
//   (config) => {
//     let token = localStorage.getItem('authtoken')
//     // let userId = localStorage.getItem('user_id')

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//       // config.params['user_id'] = userId
//     }

//     return config
//   },

//   (error) => {
//     return Promise.reject(error)
//   }
// )
