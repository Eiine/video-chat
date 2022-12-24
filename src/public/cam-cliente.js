const video = document.getElementById("video");
const video2 = document.getElementById("video2");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const canva = document.getElementById("canvas");
const peerConnection = new RTCPeerConnection();
const socket = io();

startBtn.addEventListener("click", async function () {
  try {
    let videoC = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    video.srcObject = videoC;
    let track = videoC.getVideoTracks();
    let track2 = peerConnection.addTrack(track[0], videoC);
    let offer = await peerConnection.createOffer();
    let local = await peerConnection.setLocalDescription(offer);
    function sendOffer() {
      const message = {
        type: "offer",
        offer: offer,
        id: socket.id,
      };
      socket.send(JSON.stringify(message));
    }
    sendOffer(offer);
    
  } catch (error) {
    console.log(error);
  }
});
