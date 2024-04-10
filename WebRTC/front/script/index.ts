import SockJS from 'sockjs-client'
import {Client, Message, over} from 'stompjs'

let localStream: MediaStream|undefined = undefined
let stompClient: Client| null
let localStreamElement: HTMLVideoElement|null = document.querySelector("#local-stream")
const myKey: string = Math.random().toString(36).substring(2, 11)
let pcListMap:Map<string, RTCPeerConnection> = new Map();
let roomId: string = '-1'
let otherKeyList: string[] = []

const url = {
    signaling: (): string => '/signaling',
    peerOffer : (camKey: string, roomId: string): string => `/peer/offer/${camKey}/${roomId}`,
    peerIce : (camKey: string, roomId: string): string => `/peer/iceCandidate/${camKey}/${roomId}`,
    peerAnswer : (camKey: string, roomId: string): string => `/peer/answer/${camKey}/${roomId}`,
    callKey : (): string => "/call/key",
    sendKey : (): string => "/send/key"
}

const bindRoomNo = (roomNo: string) => (roomId = roomNo)

const startCam = async () => {
    if( !localStreamElement ) return
    if( navigator.mediaDevices === undefined ) return

    try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
        localStream = stream;

        stream.getAudioTracks()[0].enabled = true;
        localStreamElement.srcObject = localStream
    } catch (e) {  console.error(e)  }
}

const connectSocket = async () => {
    const socket = new SockJS(url.signaling())
    stompClient = over(socket)
    stompClient.connect({}, () => {
        console.log("Connect to WebRTC server")

        if( !stompClient || roomId == '-1' ) return
        stompClient.subscribe(url.peerIce(myKey, roomId), onIceCandidate)
        stompClient.subscribe(url.peerOffer(myKey, roomId), onPeerOffer)
        stompClient.subscribe(url.peerAnswer(myKey, roomId), onAnswer)
        stompClient.subscribe(url.callKey(), onCall)
        stompClient.subscribe(url.sendKey(), onSend)
    })
}
const callKey = async () => {
    await stompClient?.send(url.sendKey(), {});
}
const  bindPeerConnections = () => {
    otherKeyList.map((key) => {
        if( !pcListMap.has(key) ) {
            pcListMap.set(key, createPeerConnection(key))
            sendOffer(pcListMap.get(key), key)
        }
    })
}
const getLocalStream = () => localStream


const sendOffer = async (pc: RTCPeerConnection|undefined,otherKey:string) => {
    if(!pc) return
    const offer: RTCSessionDescriptionInit =  await pc.createOffer()
    setLocalAndSendMessage(pc, offer);
    const payload =  JSON.stringify({
        key : myKey,
        body : offer
    })

    stompClient?.send(url.peerOffer(otherKey, roomId), {},payload);
    console.log('Send offer');
};
const onListenIceCandidate = (event: RTCPeerConnectionIceEvent, otherKey:string) => {
    if (event.candidate) {
        console.log('ICE candidate');
        stompClient?.send(`/app/peer/iceCandidate/${otherKey}/${roomId}`,{}, JSON.stringify({
            key : myKey,
            body : event.candidate
        }));
    }
};
const onListenTrack = (event: RTCTrackEvent, otherKey:string) => {
    if(document.getElementById(`${otherKey}`) === null){
        const video =  document.createElement('video');

        video.autoplay = true;
        video.controls = true;
        video.id = otherKey;
        video.srcObject = event.streams[0];

        document.getElementById('remote-stream-div')?.appendChild(video);
    }
};
const createPeerConnection = (otherKey: string) =>{
    const pc = new RTCPeerConnection();
    try {
        // peerConnection 에서 icecandidate 이벤트가 발생시 onIceCandidate 함수 실행
        pc.addEventListener('icecandidate', (event) => {
            onListenIceCandidate(event, otherKey);
        });
        // peerConnection 에서 track 이벤트가 발생시 onTrack 함수를 실행
        pc.addEventListener('track', (event) =>{
            onListenTrack(event, otherKey);
        });

        // 만약 localStream 이 존재하면 peerConnection에 addTrack 으로 추가함
        localStream?.getTracks().forEach(track => {
            if(!localStream ) return
            pc.addTrack(track, localStream);
        });
        console.log('PeerConnection created');
    } catch (error) {
        console.error('PeerConnection failed: ', error);
    }
    return pc;
}
const onIceCandidate = (candidate: Message) => {
    const {body} = candidate
    const {key, message} = JSON.parse(body)
    pcListMap.get(key)?.addIceCandidate(new RTCIceCandidate({
        candidate:message.candidate,
        sdpMLineIndex:message.sdpMLineIndex,
        sdpMid:message.sdpMid
    }))
}
const onPeerOffer = (offer: Message) => {
    const {body} = offer
    const {key, message} = JSON.parse(body)
    pcListMap.set(key, createPeerConnection(key));
    pcListMap.get(key)?.setRemoteDescription(new RTCSessionDescription({type: message.type, sdp: message.sdp}));

    if( pcListMap.get(key) ) {
        sendAnswer(pcListMap.get(key), key)
    }

}
const onAnswer = (answer: Message) => {
    const {body} = answer
    const {key, message} = JSON.parse(body)

    pcListMap.get(key)?.setRemoteDescription(new RTCSessionDescription(message))
}
const onCall = (_: Message) => {
    stompClient?.send(url.sendKey(), {}, JSON.stringify(myKey))
}
const onSend = (message: Message) => {
    const key = JSON.parse(message.body)
    if( key != myKey && otherKeyList.find((mapKey) => mapKey == myKey) === undefined) {
        otherKeyList.push(key)
    }
}

const sendAnswer = async (pc: RTCPeerConnection| undefined, otherKey:string) => {
    if( !RTCPeerConnection ) return

    if(!pc) return
    const answer: RTCSessionDescriptionInit = await pc.createAnswer()

    setLocalAndSendMessage(pc ,answer);
    const payload = JSON.stringify({
        key : myKey,
        body : answer
    })
    stompClient?.send(url.peerAnswer(otherKey, roomId), {}, payload);
    console.log('Send answer');
};

const setLocalAndSendMessage = (pc: RTCPeerConnection|undefined ,sessionDescription: RTCSessionDescriptionInit) =>{
    pc?.setLocalDescription(sessionDescription);
}



 const enterRoom = async ( ) => {
    await startCam();

    if (getLocalStream() !== undefined) {
        const localStreamElement: HTMLVideoElement = document.querySelector('#local-stream')!;
        const startStreamBtnElement: HTMLButtonElement = document.querySelector('#start-stream-btn')!
        localStreamElement.style.display = 'block';
        startStreamBtnElement.style.display = ''
    }
    const roomIdInputElement: HTMLInputElement = document.querySelector("#room-id-input")!
    const enterRoomButtonElement: HTMLButtonElement = document.querySelector("#enter-room-btn")!

    const roomId = roomIdInputElement.value
    bindRoomNo(roomId)

    roomIdInputElement.disabled = true
    enterRoomButtonElement.disabled = true

    await connectSocket()


}
 const stream = async () => {
    await callKey()
    setTimeout(bindPeerConnections, 1000)
}
