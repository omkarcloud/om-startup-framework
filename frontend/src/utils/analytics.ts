import Api from './api';
function callOnce(fn) {
  let called = false;

  return function (...args) {
    if (!called) {
      called = true;
      return fn(...args);
    }
  };
}

function trackExceptions() {
  if (typeof window.onerror == 'object') {
    window.onerror = function (err, url, line) {
      Api.trackAction('frontend_exception', {
        url,
        err,
        line,
        ex_description: line + ' ' + err,
      });
    };
  }
}


const trackTimeSpent = callOnce(() => {
  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
  }

  let startDate = new Date();
  let elapsedTime = 0;

  const focus = function () {
    startDate = new Date();
  };

  const blur = function () {
    const endDate = new Date();
    const spentTime = endDate.getTime() - startDate.getTime();
    elapsedTime += spentTime;
  };

  const beforeunload = function () {
    const endDate = new Date();
    const spentTime = endDate.getTime() - startDate.getTime();

    elapsedTime += spentTime;
    // Api.trackAction('time_spent', {
    //   time: msToTime(spentTime),
    //   time_ms: spentTime,
    // })
  };

  window.addEventListener('focus', focus);
  window.addEventListener('blur', blur);
  window.addEventListener('beforeunload', beforeunload);
});

const trackVisit = () => {
  const data = {
    path: window.location.pathname,
    referrer: document.referrer,
  }
  
  Api.trackAction('visit', data);
};

const Analytics = {
  trackExceptions,
  trackTimeSpent,
  trackVisit,
};

export default Analytics;
