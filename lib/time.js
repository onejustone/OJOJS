import moment from '_moment@2.24.0@moment/moment';
moment.locale('zh-cn');

const secondsOf1D = 60 * 60 * 24;

function isSameOf (a, b, unit) {
  return (a.clone().startOf(unit).unix() === b.clone().startOf(unit).unix());
}

function addSuffix (date, time, mode) {
  switch (mode) {
    case 'short':
      return date;
    default:
      return `${date} ${time}`;
  }
}

function humanize (timestamp, mode = 'long') {
  const now = moment();
  const target = moment.unix(timestamp);
  const deltaDay = Math.floor((timestamp - now.clone().startOf('day').unix()) / secondsOf1D);
  const time = target.format('HH:mm');
  if (!target.isValid() || timestamp < 0) {
    return '';
  } else if (isSameOf(now, target, 'day')) {
    // 今天
    return '今天';
    // return target.format('HH:mm')
  } else if (Math.abs(deltaDay) < 7) {
    // 7 天內;
    let date = `${deltaDay}天后`;
    if (deltaDay === 2) {
      date = `后天`;
    } else if (deltaDay === 1) {
      date = `明天`;
    } else if (deltaDay === -1) {
      date = `昨天`;
    } else if (deltaDay === -2) {
      date = `前天`;
    } else if (deltaDay < 0) {
      date = `${Math.abs(deltaDay)}天前`;
    }
    return addSuffix(date, time, mode);
  } else if (isSameOf(now, target, 'year')) {
    // 今年
    const date = target.format('MM-DD');
    return addSuffix(date, time, mode);
  } else {
    // 更远
    return target.format('YYYY-MM-DD');
  }
}

function standard(timestamp) {
  const target = moment.unix(timestamp);
  if (!target.isValid() || timestamp < 0) {
    return '';
  } else {
    return target.format('YYYY-MM-DD HH:mm:ss');
  }
}


export {
  standard,
  humanize
};

export default {
  standard,
  humanize
};
