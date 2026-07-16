import  {Server}  from "socket.io"

let io;

export async function initSocket(httpServer) {
     io = new Server(httpServer,{
      cors:{
        origin:"http://localhost:5173",
        credentials:true
      }
     }) 

     console.log("Socket.io server is running ");
     

     io.on("connection",(socket)=>{
      console.log("a user connected : "+ socket.id);
     })
}

export async function getId() {
  if(!io){
    throw new Error("Socket.io not initilaized")
  }

  return io
}