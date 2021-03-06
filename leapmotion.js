import xesto from "xesto-wave-npm"
const client = xesto('3182202afc174a47b6b6ff5b00893dbe')
import Palm from './palm';
require("./libraries/three");
require("./scripts/materials");
require("./scripts/camera");
require("./scripts/cameraController");
require("./scripts/index")
require("./scripts/gridAxis")

let palm = new Palm();

client.connect().then( controller => {
  console.log('ee');
  //This is a Leap.Controller object, and we can pass it gesture names to have
  //our app react to gestures!

  controller.on("Down", () => {
    console.log("Woo! Swipe left!");
  });

  //Allows frames to update properly
  controller.on('connect', function(){
    /*setInterval(function(){
      let frame = controller.frame();
      if (frame.hands.length > 0) {
        updateHandPosition(frame);
      }
    }, 100/6);*/
  });

  controller.on('frame', frame => {
    //vector with palmPosition
    if (frame.hands.length > 0) {
      let palmPosition = frame.hands[0].palmPosition;
      palm.updatePosition(palmPosition);
      console.log(palm.position);
    }
  });

  controller.connect();
})
