const textTransform = (str) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

const truncateText = (str, maxLength = 50) => {
  if (str.length > maxLength) {
    return `${str.substring(0, maxLength)  }...`;
  }
  return str;
};

export {
  textTransform,
  truncateText
};