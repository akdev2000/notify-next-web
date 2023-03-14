import { gql, useMutation, useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import QRCode from "react-qr-code";
import animationData from "../components/notificatiom_animation.json";
import { Root } from "../components/Root";
import { generateRandomString } from "../helpers";
import {
  getDeviceId,
  getSessionId,
  setDeviceId,
  setSessionId
} from "../utils/helpers";

const SESSION_LOGGEDIN_LISTENER = gql`
  subscription sessionLoggedIn {
    sessionLoggedIn {
      device_id
      session_id
    }
  }
`;

const UPDATE_SESSION_INFO = gql`
  mutation update_session_info($input: UpdateSessionInfoInputProps!) {
    update_session_info(input: $input) {
      id
      session_id
      browser_name
    }
  }
`;

const generatedSessionId = generateRandomString(20);

export default function Index() {
  const sessionLoggedInListener = useSubscription(SESSION_LOGGEDIN_LISTENER, {
    onData: (data) => {
      console.log("Subscription Data : ", data);
    },
  });
  const router = useRouter();

  const [updateSessionInfo, updateSessionInfoResponse] =
    useMutation(UPDATE_SESSION_INFO);
  useEffect(() => {
    if (sessionLoggedInListener?.data?.sessionLoggedIn) {
      console.log(
        "sessionLoggedInListener?.data :  ",
        sessionLoggedInListener?.data
      );
      if (
        sessionLoggedInListener?.data?.sessionLoggedIn?.session_id ==
          generatedSessionId &&
        sessionLoggedInListener?.data?.sessionLoggedIn?.device_id
      ) {
        toast.success("Connected Successfylly");
        router.push("/notification");
        setSessionId(
          sessionLoggedInListener?.data?.sessionLoggedIn?.session_id
        );
        setDeviceId(sessionLoggedInListener?.data?.sessionLoggedIn?.device_id);
        (async () => {
          await updateSessionInfo({
            variables: {
              input: {
                device_id:
                  sessionLoggedInListener?.data?.sessionLoggedIn?.device_id,
                session_id:
                  sessionLoggedInListener?.data?.sessionLoggedIn?.session_id,
              },
            },
          });
        })();
      } else {
        toast.error("Cannot connect, Please try again");
      }
    }
  }, [sessionLoggedInListener?.data]);

  useEffect(() => {
    const sessionId = getSessionId();
    const deviceId = getDeviceId();
    if (sessionId && deviceId) {
      router.push("/notification");
    }
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Root>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Lottie options={defaultOptions} height={400} width={400} />
        {/* <NotificationList title={"Test"} description={"Testing description"} /> */}
        <QRCode value={generatedSessionId} />
        {/* <button>test</button> */}
      </div>
    </Root>
  );
}
