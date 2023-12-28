package com.example.messagingstompwebsocket;

public class Greeting {

	private String content;
	private String soketId;
	public Greeting() {
	}

	public Greeting(String content,String soketId) {
		this.content = content;
		this.soketId = soketId;
	}

	public String getContent() {
		return content;
	}

	public String getSoketId() {
		return soketId;
	}

	public void setSoketId(String soketId) {
		this.soketId = soketId;
	}
}
