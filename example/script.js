const container = document.getElementById('container');
const token = 'AUfSQeo62FLvYiMKx2Enkk7njtsqir5o';

let tour = undefined;

function createTour(container, token, forceLD = false) {
  const opts = {
    initialYawDegrees: 0,
    imagePathRoot: `https://s3.amazonaws.com/assets.sagetourstudio/${token}`,
    forceLD
  };

  tour = new SageTour(container, token, () => {}, opts);
  tour.on('context_lost', () => {
    tour.destroyDOM();
    createTour(container, token, true);
  });
}

createTour(container, token);