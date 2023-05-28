import VimeoPlayer from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

const onPlay = data => {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const storedTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(storedTime);
