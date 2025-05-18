"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const sockjs_client_1 = __importDefault(require("sockjs-client"));
const stompjs_1 = require("stompjs");
let localStream = undefined;
let stompClient;
let localStreamElement = document.querySelector("#local-stream");
const myKey = Math.random().toString(36).substring(2, 11);
let pcListMap = new Map();
let roomId = '-1';
let otherKeyList = [];
const url = {
  signaling: () => '/signaling',
  peerOffer: (camKey, roomId) => `/peer/offer/${camKey}/${roomId}`,
  peerIce: (camKey, roomId) => `/peer/iceCandidate/${camKey}/${roomId}`,
  peerAnswer: (camKey, roomId) => `/peer/answer/${camKey}/${roomId}`,
  callKey: () => "/call/key",
  sendKey: () => "/send/key"
};
const bindRoomNo = roomNo => roomId = roomNo;
const startCam = () => __awaiter(void 0, void 0, void 0, function* () {
  if (!localStreamElement) return;
  if (navigator.mediaDevices === undefined) return;
  try {
    const stream = yield navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    localStream = stream;
    stream.getAudioTracks()[0].enabled = true;
    localStreamElement.srcObject = localStream;
  } catch (e) {
    console.error(e);
  }
});
const connectSocket = () => __awaiter(void 0, void 0, void 0, function* () {
  const socket = new sockjs_client_1.default(url.signaling());
  stompClient = (0, stompjs_1.over)(socket);
  stompClient.connect({}, () => {
    console.log("Connect to WebRTC server");
    if (!stompClient || roomId == '-1') return;
    stompClient.subscribe(url.peerIce(myKey, roomId), onIceCandidate);
    stompClient.subscribe(url.peerOffer(myKey, roomId), onPeerOffer);
    stompClient.subscribe(url.peerAnswer(myKey, roomId), onAnswer);
    stompClient.subscribe(url.callKey(), onCall);
    stompClient.subscribe(url.sendKey(), onSend);
  });
});
const callKey = () => __awaiter(void 0, void 0, void 0, function* () {
  yield stompClient === null || stompClient === void 0 ? void 0 : stompClient.send(url.sendKey(), {});
});
const bindPeerConnections = () => {
  otherKeyList.map(key => {
    if (!pcListMap.has(key)) {
      pcListMap.set(key, createPeerConnection(key));
      sendOffer(pcListMap.get(key), key);
    }
  });
};
const getLocalStream = () => localStream;
const sendOffer = (pc, otherKey) => __awaiter(void 0, void 0, void 0, function* () {
  if (!pc) return;
  const offer = yield pc.createOffer();
  setLocalAndSendMessage(pc, offer);
  const payload = JSON.stringify({
    key: myKey,
    body: offer
  });
  stompClient === null || stompClient === void 0 ? void 0 : stompClient.send(url.peerOffer(otherKey, roomId), {}, payload);
  console.log('Send offer');
});
const onListenIceCandidate = (event, otherKey) => {
  if (event.candidate) {
    console.log('ICE candidate');
    stompClient === null || stompClient === void 0 ? void 0 : stompClient.send(`/app/peer/iceCandidate/${otherKey}/${roomId}`, {}, JSON.stringify({
      key: myKey,
      body: event.candidate
    }));
  }
};
const onListenTrack = (event, otherKey) => {
  var _a;
  if (document.getElementById(`${otherKey}`) === null) {
    const video = document.createElement('video');
    video.autoplay = true;
    video.controls = true;
    video.id = otherKey;
    video.srcObject = event.streams[0];
    (_a = document.getElementById('remote-stream-div')) === null || _a === void 0 ? void 0 : _a.appendChild(video);
  }
};
const createPeerConnection = otherKey => {
  const pc = new RTCPeerConnection();
  try {
    // peerConnection 에서 icecandidate 이벤트가 발생시 onIceCandidate 함수 실행
    pc.addEventListener('icecandidate', event => {
      onListenIceCandidate(event, otherKey);
    });
    // peerConnection 에서 track 이벤트가 발생시 onTrack 함수를 실행
    pc.addEventListener('track', event => {
      onListenTrack(event, otherKey);
    });
    // 만약 localStream 이 존재하면 peerConnection에 addTrack 으로 추가함
    localStream === null || localStream === void 0 ? void 0 : localStream.getTracks().forEach(track => {
      if (!localStream) return;
      pc.addTrack(track, localStream);
    });
    console.log('PeerConnection created');
  } catch (error) {
    console.error('PeerConnection failed: ', error);
  }
  return pc;
};
const onIceCandidate = candidate => {
  var _a;
  const {
    body
  } = candidate;
  const {
    key,
    message
  } = JSON.parse(body);
  (_a = pcListMap.get(key)) === null || _a === void 0 ? void 0 : _a.addIceCandidate(new RTCIceCandidate({
    candidate: message.candidate,
    sdpMLineIndex: message.sdpMLineIndex,
    sdpMid: message.sdpMid
  }));
};
const onPeerOffer = offer => {
  var _a;
  const {
    body
  } = offer;
  const {
    key,
    message
  } = JSON.parse(body);
  pcListMap.set(key, createPeerConnection(key));
  (_a = pcListMap.get(key)) === null || _a === void 0 ? void 0 : _a.setRemoteDescription(new RTCSessionDescription({
    type: message.type,
    sdp: message.sdp
  }));
  if (pcListMap.get(key)) {
    sendAnswer(pcListMap.get(key), key);
  }
};
const onAnswer = answer => {
  var _a;
  const {
    body
  } = answer;
  const {
    key,
    message
  } = JSON.parse(body);
  (_a = pcListMap.get(key)) === null || _a === void 0 ? void 0 : _a.setRemoteDescription(new RTCSessionDescription(message));
};
const onCall = _ => {
  stompClient === null || stompClient === void 0 ? void 0 : stompClient.send(url.sendKey(), {}, JSON.stringify(myKey));
};
const onSend = message => {
  const key = JSON.parse(message.body);
  if (key != myKey && otherKeyList.find(mapKey => mapKey == myKey) === undefined) {
    otherKeyList.push(key);
  }
};
const sendAnswer = (pc, otherKey) => __awaiter(void 0, void 0, void 0, function* () {
  if (!RTCPeerConnection) return;
  if (!pc) return;
  const answer = yield pc.createAnswer();
  setLocalAndSendMessage(pc, answer);
  const payload = JSON.stringify({
    key: myKey,
    body: answer
  });
  stompClient === null || stompClient === void 0 ? void 0 : stompClient.send(url.peerAnswer(otherKey, roomId), {}, payload);
  console.log('Send answer');
});
const setLocalAndSendMessage = (pc, sessionDescription) => {
  pc === null || pc === void 0 ? void 0 : pc.setLocalDescription(sessionDescription);
};
const enterRoom = () => __awaiter(void 0, void 0, void 0, function* () {
  yield startCam();
  if (getLocalStream() !== undefined) {
    const localStreamElement = document.querySelector('#local-stream');
    const startStreamBtnElement = document.querySelector('#start-stream-btn');
    localStreamElement.style.display = 'block';
    startStreamBtnElement.style.display = '';
  }
  const roomIdInputElement = document.querySelector("#room-id-input");
  const enterRoomButtonElement = document.querySelector("#enter-room-btn");
  const roomId = roomIdInputElement.value;
  bindRoomNo(roomId);
  roomIdInputElement.disabled = true;
  enterRoomButtonElement.disabled = true;
  yield connectSocket();
});
const stream = () => __awaiter(void 0, void 0, void 0, function* () {
  yield callKey();
  setTimeout(bindPeerConnections, 1000);
});