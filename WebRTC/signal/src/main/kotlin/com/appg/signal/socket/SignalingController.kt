package com.appg.signal.socket

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin("*")
class SignalingController {
    private val log: Logger = LoggerFactory.getLogger(this.javaClass)

    @MessageMapping(value = ["/peer/offer/{camKey}/{roomId}"])
    @SendTo(value = ["/topic/peer/offer/{camKey}/{roomId}"])
    fun peerHandleOffer (@Payload offer: String, @DestinationVariable(value = "roomId") roomId: String,
                         @DestinationVariable(value = "camKey") camKey: String
    ): String {
        log.info("[offer] {} : {}", camKey, offer)
        return offer;
    }

    //camKey : 각 요청하는 캠의 key , roomId : 룸 아이디
    @MessageMapping("/peer/iceCandidate/{camKey}/{roomId}")
    @SendTo("/topic/peer/iceCandidate/{camKey}/{roomId}")
    fun peerHandleIceCandidate(@Payload candidate: String, @DestinationVariable(value = "roomId") roomId: String,
                               @DestinationVariable(value = "camKey") camKey: String): String {
        log.info("[ICECANDIDATE] {} : {}", camKey, candidate)
        return candidate
    }


    @MessageMapping(value = ["/peer/answer/{camKey}/{roomId}"])
    @SendTo(value = ["/topic/peer/answer/{camKey}/{roomId}"])
    fun peerHandleAnswer (@Payload answer: String, @DestinationVariable(value = "roomId") roomId: String,
                          @DestinationVariable(value = "camKey") camKey: String ): String {

        log.info("[ANSWER] {} :  {}", camKey, answer )
        return answer;
    }


    @MessageMapping(value = ["/call/key"])
    @SendTo(value = ["/topic/call/key"])
    fun callKey (@Payload message: String) : String {
        log.info("[CALL Key] : {}", message)
        return message
    }

    @MessageMapping(value = ["/send/key"])
    @SendTo(value = ["/topic/send/key"])
    fun sendKey (@Payload message: String) : String {
        log.info("[SEND Key] : {}", message)
        return message
    }
}
