
const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const { google } = require('googleapis');
const drive = google.drive('v3');
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const opinions = {
  debug: true,
}

app.use("/peerjs", ExpressPeerServer(server, opinions));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});


io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    setTimeout(() => {
      socket.to(roomId).broadcast.emit("user-connected", userId);
    }, 1000);
    socket.on("draw", (data) => {
      io.to(roomId).emit("draw", data);
    });
    socket.on("clear", () => {
      io.to(roomId).emit("clear");
    });
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
    socket.on("message", (message) => {
      io.to(roomId).emit("message", message, userName);
    });
  });
});

server.listen(process.env.PORT || 3030);

// gửi file
// Thay đổi dòng emit trong sự kiện "message"
// socket.on("message", (message) => {
//   if (message.type === "file") {
//     io.to(roomId).emit("file", message);
//   } else {
//     io.to(roomId).emit("createMessage", message, userName);
//   }
// });

// // Thêm một mảng lưu trữ thông tin về file
// const files = [];

// // Xử lý sự kiện "file"
// socket.on("file", (message) => {
//   files.push(message);
//   io.to(roomId).emit("file", message);
// });






// socket.on("file", (message) => {
//   const fileData = message.data;
//   const fileName = message.name;

//   // Tạo file trên Google Drive
//   drive.files.create(
//     {
//       resource: {
//         name: fileName,
//         mimeType: "application/octet-stream",
//       },
//       media: {
//         mimeType: "application/octet-stream",
//         body: Buffer.from(fileData.split(",")[1], "base64"),
//       },
//     },
//     (err, res) => {
//       if (err) {
//         console.error("Lỗi khi tạo tệp trên Google Drive:", err);
//         return;
//       }

//       // Lấy URL công khai của tệp
//       const fileId = res.data.id;
//       drive.files.get(
//         {
//           fileId: fileId,
//           fields: "webViewLink",
//         },
//         (err, res) => {
//           if (err) {
//             console.error("Lỗi khi lấy URL tệp từ Google Drive:", err);
//             return;
//           }

//           // Gửi URL công khai của tệp cho tất cả các máy khác trong phòng
//           const fileUrl = res.data.webViewLink;
//           const fileMessage = {
//             type: "file",
//             name: fileName,
//             url: fileUrl,
//           };
//           io.to(roomId).emit("file", fileMessage);
//         }
//       );
//     }
//   );
// });
