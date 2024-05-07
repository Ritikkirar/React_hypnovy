import io from 'socket.io-client';
//  export const backend_uri_local = "http://localhost:5000";
// export const backend_uri_local = "http://localhost:8080";
// export const backend_uri_local = "http://192.168.1.62:8080";
 export const backend_uri_local = "http://platinum-security-2031565007.us-east-1.elb.amazonaws.com"

 
export const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NiY2UxMmNiNzU2MDYxYmYyMzE2MWYiLCJpYXQiOjE2NzQzMDA5NjB9.q7tMMup6zzTkBDT_UbFfL4GFbNLUHHUy_IU8brWCvnA"
export const REACT_APP_MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidmFyc2hhLXRoYWt1cjE3IiwiYSI6ImNsZ3Z5bWR0ZTA4Z28za3Bsc2V2cjdqYnkifQ.AL81EnsAuFgCMNPL-wJZVw"


export const socket = io(backend_uri_local, { autoConnect: false });

