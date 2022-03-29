const fetch = require("node-fetch");
const io = require("socket.io");
const {Auth} = require("./src/auth/duckbox/auth.js");
const {Login} = require("./src/login/duckbox/login.js");
const {Events,Courses} = require("./src/get/google/get.js");
const {Aula} = require("./src/create/duckbox/create.js");
const {Disconnect} = require("./src/disconnect/duckbox/disconnect.js");
const {InAula,OutAula,CloseAula,isAula} = require("./src/set/duckbox/set.js");
const {Aluno,Professor,Responsavel} = require("./src/get/duckbox/get.js");
server = io({autoConnect: false, reconnection: false}).listen(8483)
server.on("connection", async (socket) => {
    console.log(await server.sockets.adapter.rooms)
    socket.join(await socket.handshake.query.rande)
    if(await server.sockets.adapter.rooms[await socket.handshake.query.rande] != undefined){
   if(await server.sockets.adapter.rooms[await socket.handshake.query.rande].length > 1){
     socket.close()
    }
}
    
    socket.on("auth", async (data) => {
        var email = data.email;
        var origin = data.origin;
        var who = data.who;
        socket.emit('authResponse',{response:await Auth(email,origin,who)})
    });

    socket.on("login", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var who = data.who;
        var result = await Login(auth,origin,who)
if(result.go){
    socket.join(data.auth,()=>{})
    if(server.sockets.adapter.rooms[data.auth].length > 1){
     socket.close()   
    }else{
        socket.emit('loginResponse',{response:await result})
    }
}else{
    socket.emit('loginResponse',{response:await result})
}

    
    });

    socket.on("getEvents", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var who = data.who;
        socket.emit('getEventsResponse',{response:await Events(auth,origin,who)})
    });

    socket.on("getCourses", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var who = data.who;
        socket.emit('getCoursesResponse',{response:await Courses(auth,origin,who)})
        console.log('ci')
    });

    socket.on("getAluno", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var who = data.who;
        socket.emit('getAlunoResponse',{response:await Aluno(auth,origin,who)})
    });

    socket.on("getProfessor", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var who = data.who;
        socket.emit('getProfessorResponse',{response:await Professor(auth,origin,who)})
    });

    socket.on("getResponsavel", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var who = data.who;
        socket.emit('getResponsavelResponse',{response:await Responsavel(auth,origin,who)})
    });

    socket.on("createAula", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var idEvent = data.idEvent;
        socket.emit('createAulaResponse',{response:await Aula(auth,origin,idEvent)})
    });

    socket.on("getInAula", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var what = data.what;
        var who = data.who;
        var name = data.name;
        await socket.join(data.what)
        var aulah = await InAula(auth,origin,who,what)
        console.log(server.sockets.adapter.rooms[data.what].length)
        await server.in(data.what).emit('getAulaUpdate', {length:await server.sockets.adapter.rooms[data.what].length,who:await aulah,type:'in',name:await name});
        await socket.emit('getInAulaResponse',{response:aulah})
    });

    socket.on("isAula", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var what = data.what;
        var who = data.who;
        await socket.emit('getisAulaResponse',{response:await isAula(auth,origin,who,what)})
    });

    socket.on("getOutAula", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var who = data.who;
        var what = data.what;
        var name = data.name;
        var aulah = await OutAula(auth,origin,who,what)
        console.log(server.sockets.adapter.rooms[data.what].length)
        await server.in(data.what).emit('getAulaUpdate', {length:await server.sockets.adapter.rooms[data.what].length,who:await aulah,type:'out',name:await name});
        await socket.leave(data.what);
        socket.emit('getOutAulaResponse',{response: await aulah})
    });

    socket.on('sendAulaUpdate',async(data)=>{
        var auth = data.auth;
        var origin = data.origin;
        var who = data.who;
        var what = data.what;
        var aulah = {response:{type:'professor'}}
        await server.in(data.what).emit('getAulaUpdate', {length:await server.sockets.adapter.rooms[await data.what].length,who:await aulah,type:'in',prof:true});

    })

    socket.on("closeAula", async (data) => {
        var auth = data.auth;
        var origin = data.origin;
        var what = data.what;
        socket.emit('closeAulaResponse',{response:await CloseAula(auth,origin,what)})
    });

    socket.on("disconnect", async () => {
        var email = await socket.handshake.query.email;
        var origin = await socket.handshake.query.origin;
        var who = await socket.handshake.query.who;
        var name = await socket.handshake.query.name;
        console.log(await socket.handshake.query)
        var response = await Disconnect(email,origin,who)
        var aulah = {response:{type:await response.response.type},type:'disconnected'}
        await server.in(await response.response.idEvent).emit('getAulaUpdate', {length:await server.sockets.adapter.rooms[await response.response.idEvent].length,who:await aulah,type:'out',name:await name});
        console.log('Client Out: '+socket.id)
    });
});


