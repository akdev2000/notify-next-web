import {
  gql,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NotificationContent from "../components/NotificationContent";
import { NotificationList } from "../components/NotificationList";
import { SESSION_EXPIRED } from "../helpers/constants";
import { clearLocalStorage, getDeviceId, getSessionId } from "../utils/helpers";

const GET_NOTIFICATOINS = gql`
  query getNotificationByID($input: NotificationInputType!) {
    getNotificationByID(input: $input) {
      id
      user_id
      source
      title
      mainTitle
      notificationData
      notificationReceivedTime
      createdAt
    }
  }
`;

const LOGOUT = gql`
  mutation logoutSession($input: NotificationInputType!) {
    logoutSession(input: $input)
  }
`;

const SESSION_LOG_OUT_LISTENER = gql`
  subscription logoutListener {
    logoutListener {
      device_id
      session_id
    }
  }
`;

const NOTIFICATION_RECEIVED_LISTENER = gql`
  subscription receivedNotification {
    receivedNotification {
      device_id
      device_name
      id
      Notification {
        id
        mainTitle
      }
    }
  }
`;

type NotificationOutputType = {
  getNotificationByID: OriginalNotificationType[];
};

export type OriginalNotificationType = {
  id: number;
  user_id: number;
  source?: string;
  title?: string;
  mainTitle?: string;
  notificationData?: string;
  notificationReceivedTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
type NotificationInputType = {
  input: {
    device_id: string;
    session_id: string;
  };
};

export default function Notifications() {
  const [selectedNotification, setSelectedNotification] = useState<any>();
  const sessionLogoutListener = useSubscription(SESSION_LOG_OUT_LISTENER);
  const [logoutDevice, logoutDeviceResponse] = useMutation(LOGOUT);
  const [fetchNotification, getAllNotifications] = useLazyQuery<
    NotificationOutputType,
    NotificationInputType
  >(GET_NOTIFICATOINS);
  const notificationListener = useSubscription(NOTIFICATION_RECEIVED_LISTENER);
  const router = useRouter();

  const test = useQuery(gql`
    {
      test {
        id
      }
    }
  `);

  useEffect(() => {
    (async () => {
      await fetchNotification({
        variables: {
          input: {
            session_id: getSessionId(),
            device_id: getDeviceId(),
          },
        },
      });
    })();
  }, []);
  useEffect(() => {
    if (getAllNotifications?.data) {
      if (getAllNotifications.data?.getNotificationByID?.length > 0) {
        setSelectedNotification(
          getAllNotifications?.data?.getNotificationByID[0]
        );
      }
      console.log("getAllNotifications.data : ", getAllNotifications.data);
    }
  }, [getAllNotifications?.data]);

  useEffect(() => {
    if (getAllNotifications?.error) {
      if (getAllNotifications?.error?.message == SESSION_EXPIRED) {
        clearLocalStorage();
        router.push("/");
      }
    }
  }, [getAllNotifications?.error]);

  useEffect(() => {
    console.log("sessionLogoutListener?.data", sessionLogoutListener?.data);
    if (sessionLogoutListener?.data) {
      if (sessionLogoutListener?.data?.logoutListener) {
        const { session_id, device_id } =
          sessionLogoutListener?.data?.logoutListener;
        const s_id = getSessionId();
        const d_id = getDeviceId();

        if (session_id.includes(s_id) && d_id == device_id) {
          clearLocalStorage();
          router.push("/");
        }
      }
    }
  }, [sessionLogoutListener?.data]);

  useEffect(() => {
    if (logoutDeviceResponse?.data) {
      console.log("logoutDeviceResponse?.data : ", logoutDeviceResponse?.data);
      clearLocalStorage();
      router.push("/");
    }
  }, [logoutDeviceResponse?.data]);

  useEffect(() => {
    if (notificationListener?.data) {
      getAllNotifications?.refetch();
    }
  }, [notificationListener?.data]);

  // function clickNotification() {
  //     setSelectedNotification()
  // }
  return (
    <Grid
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   flexDirection
      //   // justifyContent: "space-between",
      // }}
      container
      direction={"row"}
      flexDirection="row"
    >
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
          // height: window.innerHeight,
          height:"100vh",
          overflow: "scroll",
          overflowX: "hidden",
        }}
        item
        xs={3}
      >
        <Paper
          variant="outlined"
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            cursor: "pointer",
            width: "100%",
            ml: 2,
            justifyContent: "space-between",
            position: "sticky",
            bottom: 0,
            height: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src="notify.png"
              style={{ width: 50, height: 50, marginRight: 15 }}
            />
            <Typography variant="h5">Notify Me</Typography>
          </div>
          <div>
            <Button
              sx={{ mr: 2 }}
              color="success"
              variant="contained"
              onClick={async () => {
                await logoutDevice({
                  variables: {
                    input: {
                      device_id: getDeviceId(),
                      session_id: [getSessionId()],
                    },
                  },
                });
              }}
            >
              Logout
            </Button>
          </div>
        </Paper>
        {getAllNotifications?.data?.getNotificationByID?.map(
          (notification, notificationKey) => {
            return (
              <NotificationList
                title={notification?.title}
                description={notification?.mainTitle}
                notification={notification?.notificationData}
                selected={notification.id == selectedNotification?.id}
                onClick={() => {
                  console.log("Notificatiom: ", notification);
                  setSelectedNotification(notification);
                }}
                createdAt={notification.createdAt}
                key={notificationKey}
              />
            );
          }
        )}
      </Grid>
      <Grid alignItems={"center"} item xs={9}>
        <NotificationContent
          notification={{
            ...selectedNotification,
            createdAt: new Date(selectedNotification?.createdAt),
          }}
        />
      </Grid>
    </Grid>
  );
}
