import firebase from "firebase";
import "firebase/firestore";

const initStream = async (localStreamId: string) => {
  const localVid1 = document.getElementById(localStreamId) as HTMLMediaElement;
  await navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => (localVid1.srcObject = stream));
};

const initConnection = async () => {
  // Initialize WebRTC
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  const newConnection = new RTCPeerConnection(servers);
  return newConnection;
};

const createOffer = async (
  connection: RTCPeerConnection,
  localStreamTrack: MediaStreamTrack
) => {
  connection.addTrack(localStreamTrack);
};

const iceCandidateEventListener = async (
  connection: RTCPeerConnection,
  database: firebase.database.Database,
  remoteUsername: string,
  currentUsername: string,
  remoteVideoId: string
) => {
  connection.onicecandidate = async (event) => {
    if (event.candidate) {
      await database.ref("/notifs/" + remoteUsername).update({
        type: "candidate",
        from: currentUsername,
        candidate: JSON.stringify(event.candidate),
      });
    }
  };

  connection.ontrack = async (event) => {
    const remoteStream = document.getElementById(
      remoteVideoId
    ) as HTMLMediaElement;
    if (remoteStream.srcObject !== event.streams[0]) {
      remoteStream.srcObject = event.streams[0];
    }
  };
};

const sendAnswer = async (
  connection: RTCPeerConnection,
  database: firebase.database.Database,
  localStreamTrack: MediaStreamTrack
) => {
  connection.addTrack(localStreamTrack);
};

export { initStream, initConnection, iceCandidateEventListener };
