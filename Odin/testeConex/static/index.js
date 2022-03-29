alal = "http://192.168.0.117:8483/"
var socket = io(alal);
var WhoIAm = null;
socket.on('connect', function(){
    console.log('Connected')
});
socket.on('event', function(data){
console.log(data)
});
socket.on('disconnect', function(){
    console.log('Disconnected')
});
socket.on('welcome', function(data){
    console.log(data)
    WhoIAm = data.id
});

socket.on('subscribeResponse', function(data){
    console.log(data)
});

socket.on('getAgendaResponse', function(data){
    console.log(data)
});

socket.on('getClassRoomResponse', function(data){
    console.log(data)
});

log = () => {
    socket.emit('subscribe',{});
}  


dlog = () => {
    socket.emit('getAgenda',"1");
}  

ddlog = () => {
    socket.emit('getClassRoom',"1");
}  