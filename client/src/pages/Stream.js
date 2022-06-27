import React from 'react'
import { useEffect } from 'react';
import Wrapper from '../assets/wrappers/StreamPage';
import { AgoraRTM,createChannel,createClient,RtmMessage}from 'agora-rtm-react'
import phone from '../pages/phone.png'
import {Link ,  Redirect} from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'


let localStream  ;
let remoteStream ;
let peerConnection;  
let APP_ID = 'a2326e926e3e4e5c9ee1a9e2147c8684';
let token = null;
const useclient   = createClient(APP_ID)



let client  ;
let channel ;
//generate the randomUID over here
let uid =  String(Math.floor(Math.random() * 10000))

const localDeviceRequest ={
    video: true,
    audio: false, 
}


const Stream = () => {
    const navigate = useNavigate();

    const {isStreaming, leaveStream,roomId} = useAppContext();

    const init  = async() => {
    
        // create an instance of the client and login this client 
        
        if(!roomId){
            console.log('null');
        }

        client  = await useclient();
        await client.login({uid ,token});
        channel = client.createChannel(roomId);
        await channel.join();
          
        // event listener for handling the event that user join the room 
        channel.on('MemberJoined',handleUserJoined);
        // create message handle from peer to peer. 
        client.on('MessageFromPeer', handleMessageFromPeer);
        // event listener for handling the event that user join the room 
        channel.on('MemberLeft',handleUserLeft);
        localStream = await navigator.mediaDevices.getUserMedia(localDeviceRequest);
        document.getElementById('user-1').srcObject = localStream; 
        
        
    }
    
    
    const server = {
        'iceServers': [
            {
                'urls': ['stun:stun1.l.google.come:19302', 'stun:stun2.l.google.com:19302']
            }
        ]
    }
    
    // event listener for handling user's join 
    const handleUserJoined = async(MemberUID) => {
        
        console.log('a new user joined the channel : ',MemberUID);
    
        // create offer function called; 
        createOffer(MemberUID);
    
    
    }
    
    
    const handleUserLeft  = async() => {
        document.getElementById('user-2').style.display = 'none';
        document.getElementById('user-1').classList.remove('smallFrame');
        console.log('user left');
    }
    
    // event listner for handling sending the message from peer to peer 
    const handleMessageFromPeer = async (message,MemberUID) => {
    
        // parse the message  offer and ICE candidate   
        message = JSON.parse(message.text);
        console.log("message: ", message);
        if(message.type === 'offer'){
        
            console.log('here1', message.offer);
            createAnswer(MemberUID, message.offer);
        }
    
        if(message.type === 'answer'){
            console.log('here2' , message.answer);
            addAnswer(message.answer);
        }
    
        if(message.type === 'candidate'){
            if(peerConnection){
                console.log('here3' );
                await peerConnection.addIceCandidate(message.candidate); 
            }
        }
    
    }
    
    
    
    
    // create SDP offer 
    const createOffer = async (MemberUID) => {
        // createPeerConnection
        await creatPeerConnection(MemberUID);
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        //sent this offer to the client
        client.sendMessageToPeer({text: JSON.stringify({'type':'offer', 'offer':offer})}, MemberUID)
    
    
    }
    
    
    const createAnswer = async(MemberUID, offer) => {
        
        // MemberUID is the uid of the sender, which is remote side
        await creatPeerConnection(MemberUID);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer)); 
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        client.sendMessageToPeer({text: JSON.stringify({'type':'answer' , 'answer' : answer})},MemberUID)
        
    }
    
    const addAnswer = async (answer) => {
        if(!peerConnection.currentRemoteDescription){
            console.log('setting up the remote Description')
            peerConnection.setRemoteDescription(answer); 
        }
    } 
    
    
    
    const creatPeerConnection  = async (MemberUID)=> {
        peerConnection = new RTCPeerConnection({ configuration: {
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
          },server});
        remoteStream   = new MediaStream();
        document.getElementById('user-2').srcObject = remoteStream;
        // show the second screen when the user-2 joins the room. 
        document.getElementById('user-2').style.display = 'block';
        document.getElementById('user-1').classList.add('smallFrame');
    
    
        
        // retrive all the tracks of audio and video by calling getTracks
        // and add the sets of tracks and transmit it to other peer. 
        if(!localStream){
            localStream =  await navigator.mediaDevices.getUserMedia(localDeviceRequest);
            document.getElementById('user-1').srcObject = localStream; 
        }
    
    
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track,localStream);
        });
    
         
    
        // event listner and listen for track comes from another user 
        // get the track of video of the remote.
        peerConnection.ontrack =  (event)=>{
        
            event.streams[0].getTracks().forEach((track) => {
                 remoteStream.addTrack(track);
             })
         }
    
       
    
        // Trickle ICE listen for the icecandidate 
                                      // icecandidate
          peerConnection.onicecandidate = async (event) => {
            if(event.candidate){
               
               client.sendMessageToPeer({text: JSON.stringify({'type': 'candidate', 'candidate': event.candidate})},MemberUID);
           }
        }; 
    
    
    }


    const leaveChannel = async () => {
        await channel.leave();
        await client.logout();
        
        
    }

    const reload =async ()=>{
        await channel.leave();
        await client.logout();
        window.location.reload();
    }


 useEffect(()=>{


    window.addEventListener('beforeunload',leaveChannel );
    init();
    return()=> {
        window.addEventListener('beforeunload',leaveChannel );

    }
 },[])
  return (
    <Wrapper>
      <div id = "videos">
            <video className="video-player" id ='user-1' autoPlay = {"playsinline"}></video>
            <video className="video-player" id ='user-2' autoPlay  ={"playsinline"}></video>
      </div>

    <div id = "control">
        <button id ="button-configure" onClick={reload}>
         <a href = "/profile">
           <div className = "control-container" id = "leave-btn" >
                <img src ={phone} />
               </div>
         </a>
        </button>
      </div>
      
  
  </Wrapper>

  )
}

export default Stream
