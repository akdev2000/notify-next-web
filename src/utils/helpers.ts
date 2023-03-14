import moment from "moment";

export function setSessionId(sesssionId: string) {
  localStorage.setItem("sessionId", sesssionId);
}

export function setDeviceId(deviceId: string) {
  localStorage.setItem("deviceId", deviceId);
}

export function getSessionId() {
  return localStorage.getItem("sessionId") || "";
}

export function getDeviceId() {
  return localStorage.getItem("deviceId") || "";
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function getDateOnly(date: Date | undefined) {
  if (date) {
      return moment(date, true).format("DD, MMM YYYY");
  }
  return "";
}

export function getTimeOnly(date: Date | undefined) {
  if (date) {
    return moment(date, true).format("hh:mm:ss");
  }
  return "";
}
