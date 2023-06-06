import _ from 'lodash'
import AxiosInstance from './axios'

function sendEmail(subject, content) {
  return AxiosInstance.post(`/send-email/`, { subject, content }, {
    silent: true,
  }).catch(console.error)
}

async function getUsers(payload: any) {
  return AxiosInstance.get('/users/', {
    params: payload,
    silent: true,
  })
}

async function updateUser(id, payload: any) {
  return AxiosInstance.patch(`/users/${id}/`, payload, {})
}

async function deleteUser(id) {
  return AxiosInstance.delete(`/users/${id}/`)
}

async function updateOnboarding(id, payload: any) {
  return AxiosInstance.patch(`/users-onboarding/${id}/`, payload, {})
}


function downloadViaLink(filename) {
  return response => {
    // create a Blob from the response data
    const url = window.URL.createObjectURL(new Blob([response.data]))
    // create a link element
    const link = document.createElement('a')
    // set the link's href to the URL created above
    link.href = url
    // set the link's download attribute to the desired file name
    link.setAttribute('download', filename)
    // append the link to the body and trigger the download
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}


async function sendGoogleAuthToken(token: string) {
  return AxiosInstance.post(
    '/auth/google-auth/',
    {},
    {
      silent: true,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  )
}

async function getMe(cookie: any) {
  return AxiosInstance.get('/auth/me/', {
    silent: true,
    headers: cookie ? { cookie } : undefined,
  })
}
export function is403(error: any) {
  return error.response?.status === 403
}

export function is404(error: any) {
  return error.response?.status === 404
}


async function createShortUrl(payload: any) {
  return AxiosInstance.post(`/short-urls/`, payload,)
}

async function getShortUrls(payload: any) {
  return AxiosInstance.get('/short-urls/', {
    params: payload,
    silent: true,
  })
}

async function updateShortUrl(id, payload: any) {
  return AxiosInstance.patch(`/short-urls/${id}/`, payload, {})
}


async function incrementReferralLinkClicks(code) {
  return AxiosInstance.patch(`/users/increment-referral-link-clicks/${code}/`, {}, {
    silent: true,
  })
}

async function getFirstNameByReferralCode(code) {
  return AxiosInstance.get(`/users/get-first-name-by-referral-code/${code}/`, {
    silent: true,
  })
}

async function deleteShortUrl(id) {
  return AxiosInstance.delete(`/short-urls/${id}/`)
}


async function getIpInfo() {
  return AxiosInstance.get(`/ipinfo/`, {
    silent: true,
  })
}

async function trackAction(type, payload) {
  return AxiosInstance.post(`/actions/`, {type,  data:payload}, {
    silent: true,
  }).catch(console.error)
}


async function getStats(payload) {
  return AxiosInstance.post(`/stats/`, payload, {
    silent: true,
  })
}

async function getActions(payload) {
  return AxiosInstance.get(`/actions/`, {
    silent: true,
    silenceError: true,
    params: payload,
  })
}

async function downloadUsers() {
  return AxiosInstance.get(
    '/users/export/', {
    message: 'Downloading all Users',
  }
  ).then(downloadViaLink('users.csv'))
}
const Api = {
  getActions, 
  downloadUsers,
  getStats,
  trackAction,
  getIpInfo,
  getFirstNameByReferralCode,
  incrementReferralLinkClicks,
  getShortUrls,
  updateShortUrl,
  deleteShortUrl,
  createShortUrl,
  sendEmail,
  getMe,
  sendGoogleAuthToken,
  getUsers,
  updateUser,
  deleteUser,
  updateOnboarding,

}


export default Api
