import { useEffect } from "react";
import styles from "../../styles/Meet/MeetingId.module.scss";
import { initConnection, initStream } from "../../Utils/RTC/Meeting";
import firebase from "firebase/app";
import "firebase/database";
import { Button } from "@mui/material";

async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

const Meeting = () => {
  useEffect(() => {
    const foo = async () => {
      async function getConnectedDevices(type) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter((device) => device.kind === type);
      }

      // Open camera with at least minWidth and minHeight capabilities
      async function openCamera(cameraId, minWidth, minHeight) {
        const constraints = {
          audio: { echoCancellation: true },
          video: {
            deviceId: cameraId,
            width: { min: minWidth },
            height: { min: minHeight },
          },
        };

        return await navigator.mediaDevices.getUserMedia(constraints);
      }

      const cameras = getConnectedDevices("videoinput");
      cameras.then((camera) => {
        if (camera && camera.length > 0) {
          // Open first available video camera with a resolution of 1280x720 pixels
          const stream = openCamera(camera[0].deviceId, 1280, 720);
        }
      });

      async function playVideoFromCamera() {
        try {
          const constraints = { video: true, audio: true };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          const videoElement = document.querySelector(
            "video#localVideo"
          ) as HTMLMediaElement;
          videoElement.srcObject = stream;
        } catch (error) {
          console.error("Error opening video camera.", error);
        }
      }
      playVideoFromCamera();
    };

    foo();
  }, []);

  return (
    <div className={styles.MeetingContainer}>
      <div className={styles.VideoContainer}>
        <video
          className={styles.VideoStream}
          id="localVideo"
          autoPlay
          playsInline
        />
        <video className={styles.VideoStream} id="vid2" />
      </div>
      <div className={styles.ButtonContainer}>
        <Button>Camera</Button>
        <Button>Audio</Button>
      </div>
    </div>
  );
};

export default Meeting;
