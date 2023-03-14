import { Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { OriginalNotificationType } from "../pages/Notifications";
import { NotificatonProps } from "./NotificationList";

export default function NotificationContent(props: {
  notification: OriginalNotificationType;
}) {
  const [notificationData, setNotificationData] = useState<NotificatonProps>();

  useEffect(() => {
    if (props.notification?.notificationData) {
      setNotificationData(JSON.parse(props.notification?.notificationData));
      console.log(JSON.parse(props.notification?.notificationData));
    }
    // else{
    //   setNotificationData({
    //     ...props.notification?.notificationData,
    //     text:""
    //   });
    // }
  }, [props.notification]);
  return (
    <Grid>
      <Paper elevation={3} sx={{ padding: 3, margin: 3 }}>
        <h2>{props.notification?.source}</h2>
        <h3>{props.notification?.title}</h3>
        {notificationData && <h3>{notificationData?.text}</h3>}
        {notificationData && <h3>{notificationData?.bigText}</h3>}
        <Typography variant="h5">
          {moment(props.notification?.createdAt, true).format("DD, MMM YYYY")}
        </Typography>
        <Typography variant="h6">
          {moment(props.notification?.createdAt, true).format("hh:mm:ss")}
        </Typography>
      </Paper>
    </Grid>
  );
}
