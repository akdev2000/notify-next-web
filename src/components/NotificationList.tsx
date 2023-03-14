import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDateOnly, getTimeOnly } from "../utils/helpers";

type Props = {
  title?: string;
  description?: string;
  notification?: string;
  selected?: boolean;
  onClick?: () => void;
  createdAt?: Date;
};

export type NotificatonProps = {
  app: string;
  audioContentsURI: string;
  bigText: string;
  extraInfoText: string;
  groupedMessages: string;
  icon: string;
  iconLarge: string;
  image: string;
  imageBackgroundURI: string;
  subText: string;
  summaryText: string;
  text: string;
  time: string;
  title: string;
  titleBig: string;
};
export function NotificationList(props: Props) {
  const [notificationdata, setNotificationData] = useState<NotificatonProps>();
  useEffect(() => {
    console.log("Propss:   ", props);
    if (props?.notification) {
      setNotificationData(JSON.parse(props.notification));
      console.log(JSON.parse(props.notification));
    }
  }, []);
  return (
    <Grid container direction="row" justifyContent={"space-between"}>
      <Paper
        variant="outlined"
        // elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          // margin: 1,
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: props.selected ? "#ECECEC" : "",
          cursor: "pointer",
          width: "100%",
          borderRadius: 0,
        }}
        onClick={props.onClick}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={notificationdata?.iconLarge}
            style={{
              width: 50,
              height: 50,
              marginRight: 15,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            alt={notificationdata?.title}
          />
          {/* <img
            src={notificationdata?.icon}
            style={{ width: 50, height: 50, marginRight: 15, backgroundColor:"black" }}
          /> */}
          <div>
            <Typography
              variant="h6"
              sx={{
                width: 220,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {notificationdata?.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                width: 220,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {notificationdata?.text}
            </Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1">
            {getDateOnly(props?.createdAt)}
          </Typography>
          <Typography variant="subtitle2">
            {getTimeOnly(props?.createdAt)}
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
}
