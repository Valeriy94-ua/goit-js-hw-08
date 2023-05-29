import VimeoPlayer from '@vimeo/player';
import localstorageAPI from './localstorage.js';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

const onPlay = data => {
  localstorageAPI.save('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const storedTime = localstorageAPI.load('videoplayer-current-time');

if (storedTime) {
  player.setCurrentTime(storedTime);
}
