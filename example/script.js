const container = document.getElementById('container');
const token = 'AUfSQeo62FLvYiMKx2Enkk7njtsqir5o';
const opts = {
  initialYawDegrees: 0,
  imagePathRoot: `https://s3.amazonaws.com/assets.sagetourstudio/${token}`,
};
const tour = new SageTour(container, token, () => {}, opts);