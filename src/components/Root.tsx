import React, { ReactElement } from "react";

type Props = {
  children: React.ReactElement;
};
export function Root(props: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: typeof window != "undefined" ? window.innerHeight : "100%",
      }}
    >
      <div
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ margin: 20, textAlign: "center" }}>Notify-Me</h1>
        <h3
          style={{
            margin: 20,
            textAlign: "center",
            fontWeight: "normal",
            width: "70%",
            color: "gray",
          }}
        >
          Are you tired of taking your phone again and again while working on
          your system ? Try notify-me to know the priority of the notification
          in your mobile, You will get notified with every messages in your
          Laptop.
        </h3>
        <ul>
          <li>
            <h3 style={{ fontWeight: "normal" }}>
              Get the mobile app now <a href="https://playstore">Click Here</a>
            </h3>
          </li>
          <li>
            <h3 style={{ fontWeight: "normal" }}>
              Click on the Scanner Icon in your Mobile App
            </h3>
          </li>
          <li>
            <h3 style={{ fontWeight: "normal" }}>
              Scan the blow QR code in your Phone
            </h3>
          </li>
        </ul>
        {props.children}
      </div>
      {/* <div style={{ marginBottom: 30 }}></div> */}
    </div>
  );
}
