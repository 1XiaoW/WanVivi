// 人数显示处理
export const pNumHandler = (param: any) => {
  if (param > 9999) {
    let num = param / 10000;
    if (!Number.isInteger(num)) return num.toFixed(1) + '万';
    return num + '万';
  }
  return param;
};

// 时间显示处理
export const timeHandler = (param: any) => {
  let duration = (param / 60).toFixed(2);
  let hours = duration.split('.')[0];
  if (Number(hours) < 10) hours = '0' + hours;
  let restTime = Math.ceil(Number(duration.split('.')[1]) * 0.6);
  if (restTime < 10) (restTime as unknown as string) = restTime + '0';
  return `${hours}:${restTime}`;
};

// 多久前时间处理
export const timeAgo = (param: any) => {
  // 指定日期
  const specifiedDate: any = new Date(param);
  // 当前时间
  const currentDate: any = new Date();
  // 计算时间差（以毫秒为单位）
  const timeDifference: number = currentDate - specifiedDate;
  // 计算小时数、天数和日期
  const hours: number = Math.floor(timeDifference / (1000 * 60 * 60));
  const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const formattedDate: string = specifiedDate
    .toISOString()
    .split('T')[0]
    .substring(6);
  // 判断时间差并显示结果
  if (hours < 1) {
    return `最近更新`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return formattedDate;
  }
};
