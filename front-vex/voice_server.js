// @ts-nocheck

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: true, /*Isi dengan domain frontend*/
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Connected");

    socket.on(
        "join",
        ({ room, peerId }) => {
            socket.peerId = peerId;
            socket.room = room;

            socket.join(room);

            const clients =
                Array.from(
                    io.sockets.adapter.rooms.get(room) || []
                );

            const peers = clients
                .filter(
                    (id) => id !== socket.id
                )
                .map((id) => ({
                    peerId:
                        io.sockets.sockets.get(id)
                            ?.peerId,
                }));

            socket.emit(
                "existing-peers",
                peers
            );

            socket
                .to(room)
                .emit(
                    "peer-joined",
                    {
                        peerId,
                    }
                );
        }
    );

    socket.on(
        "signal",
        (data) => {
            socket
                .to(data.room)
                .emit(
                    "signal",
                    data
                );
        }
    );

    socket.on(
        "disconnect",
        () => {
            if (
                socket.room &&
                socket.peerId
            ) {
                socket
                    .to(socket.room)
                    .emit(
                        "peer-left",
                        {
                            peerId:
                                socket.peerId,
                        }
                    );
            }
        }
    );
});

server.listen(3001, () => {
    console.log(
        "Voice Server Running"
    );
});