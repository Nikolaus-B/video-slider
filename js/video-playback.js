import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);
const VIDEO_KEY = "videoplayer-current-time";

player.on("timeupdate", throttle(throttled, 1000));

function throttled(data) {
  localStorage.setItem("VIDEO_KEY", data.seconds);
}
player
  .setCurrentTime(localStorage.getItem("VIDEO_KEY"))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case "RangeError":
        break;

      default:
        break;
    }
  });
