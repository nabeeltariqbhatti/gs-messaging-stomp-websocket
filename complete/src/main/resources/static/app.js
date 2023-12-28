const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);

};


function  subscribe(socketId){
    stompClient.subscribe('/topic/greetings/'.concat(socketId), (greeting) => {
        console.log(greeting);
        showGreeting(JSON.parse(greeting.body).content.concat(" my socket id this time is " + JSON.parse(greeting.body).soketId));
    });
}
stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function generateWebSocketId() {
    return 'websocket-id-' + Math.floor(Math.random() * 1000);
}
function sendName() {
    let socketId = generateWebSocketId();
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': $("#name").val(), 'socketId':socketId})
    });
    subscribe(socketId);
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});

