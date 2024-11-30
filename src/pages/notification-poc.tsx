import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { gql, useLazyQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { NotificationInputType, NotificationOutputType } from './notification';
const { Title, Text } = Typography;
const headerBarHeight = 100;

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

const NotificationPoc = () => {
    const [expand, setExpand] = useState(false);
    const [fetchNotification, getAllNotifications] = useLazyQuery<
        NotificationOutputType,
        NotificationInputType
    >(GET_NOTIFICATOINS);

    useEffect(() => {
        (async () => {
            await fetchNotification({
                variables: {
                    input: {
                        session_id: "",
                        device_id: "",
                    },
                },
            }).catch((err) => {
                console.log("Fetch Notification Erro : ", err);
            });
        })();
    }, []);

    return (
        <Grid
            container
            direction={"row"}
            flexDirection="row"
        >
            <Grid
                style={{
                    backgroundColor: "#f9f9f9",
                }}
                item
                xs={3}
            >
                <div style={{ height: headerBarHeight, backgroundColor: "#f6f6f6" }} >
                    dd
                </div>
                <div style={{
                    height: `calc(100vh - ${headerBarHeight + 10}px)`,
                    overflow: "scroll",
                    overflowX: "hidden",
                    padding: 15
                }} >
                    {
                        [1, 2, 3, 4, 5, 6].map((val) => <Collapsable />)
                    }
                </div>
            </Grid>
            <Grid alignItems={"center"} item xs={9}>
                <div >
                </div>
            </Grid>
        </Grid>
    );
}


const Collapsable = () => {
    const [expand, setExpand] = useState(false);
    return (
        <div style={{ marginBottom: 20 }}>
            <Collapsible
                trigger={<CollapseHeader expand={expand} />}
                onTriggerOpening={() => setExpand(true)}
                onTriggerClosing={() => setExpand(false)}
            >
                <div>
                    {
                        [1, 2, 3, 6].map(() => {
                            return (
                                <div>
                                    <p>
                                        This is the collapsible content. It can be any element or React
                                        component you like.
                                    </p>
                                    {/* <p>
                                        It can even be another Collapsible component. Check out the next
                                        section!
                                    </p> */}
                                </div>
                            )
                        })
                    }

                </div>
            </Collapsible>
        </div>
    )
}

interface Props {
    expand: boolean;
}
const CollapseHeader = ({ expand }: Props) => {
    return (
        <div style={{ height: 120, display: "flex", alignItems: "center" }}>
            <Grid
                container
                direction={"row"}
                // spacing={2}
                flex={1}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid xs={2} alignItems={"center"} >
                    <div>
                        <img style={{ height: 50, width: 50 }} src='notifyme.png' />
                    </div>
                </Grid>
                <Grid xs={8} >
                    <div>
                        <Typography style={{ fontSize: 25, padding: 0 }} >Header</Typography>
                        <Text type="secondary" >Description</Text>
                    </div>
                </Grid>
                <Grid xs={2} >
                    <div>
                        {expand ? <UpOutlined /> : <DownOutlined />}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}


export default NotificationPoc;
