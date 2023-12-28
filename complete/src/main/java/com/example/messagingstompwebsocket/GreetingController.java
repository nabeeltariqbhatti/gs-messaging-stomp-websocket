package com.example.messagingstompwebsocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@RestController
public class GreetingController {
	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/hello")
	public void greeting(HelloMessage message) throws Exception {
		Thread.sleep(2000); // simulated delay
		System.out.println(message.getSocketId());
		Greeting greeting = new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!", message.getSocketId());
		simpMessagingTemplate.convertAndSend("/topic/greetings/"+message.getSocketId(), greeting);
	}

}
