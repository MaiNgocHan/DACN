// script.js



///////////
const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
myVideo.muted = true;

backBtn.addEventListener("click", () => {
  document.querySelector(".main__left").style.display = "flex";
  document.querySelector(".main__left").style.flex = "1";
  document.querySelector(".main__right").style.display = "none";
  document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});

const user = prompt("Vui lòng nhập tên của bạn");

const peer = new Peer({
  host: '127.0.0.1',
  port: 3030,
  path: '/peerjs',
  config: {
    'iceServers': [
      { url: 'stun:stun01.sipphone.com' },
      { url: 'stun:stun.ekiga.net' },
      { url: 'stun:stunserver.org' },
      { url: 'stun:stun.softjoys.com' },
      { url: 'stun:stun.voiparound.com' },
      { url: 'stun:stun.voipbuster.com' },
      { url: 'stun:stun.voipstunt.com' },
      { url: 'stun:stun.voxgratia.org' },
      { url: 'stun:stun.xten.com' },
      {
        url: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      },
      {
        url: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      }
    ]
  },

  debug: 3
});

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      console.log('someone call me');
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

const connectToNewUser = (userId, stream) => {
  console.log('I call someone' + userId);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

peer.on("open", (id) => {
  console.log('my id is' + id);
  socket.emit("join-room", ROOM_ID, id, user);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
  if (text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt(
    "Sao chép liên kết này và gửi cho những người bạn muốn gặp",
    window.location.href
  );
});

socket.on("createMessage", (message, userName) => {
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${userName === user ? "me" : userName
    }</span> </b>
        <span>${message}</span>
    </div>`;
});



// bảng trắng
const canvasContainer = document.querySelector(".canvas-container");
const toggleButton = document.getElementById("toggleCanvasButton");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let isErasing = false;

toggleButton.addEventListener("click", () => {
  canvasContainer.classList.toggle("show");
  if (!canvasContainer.classList.contains("show")) {
    isDrawing = false;
    isErasing = false;
  }
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

function startDrawing(event) {
  if (isErasing || event.target.id === "clearButton") return;

  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const x = event.pageX - rect.left;
  const y = event.pageY - rect.top;
  // const x = event.clientX - canvas.getBoundingClientRect().left;
  // const y = event.clientY - canvas.getBoundingClientRect().top;
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function draw(event) {
  if (!isDrawing || isErasing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = event.pageX - rect.left;
  const y = event.pageY - rect.top;
  // const x = event.clientX - canvas.getBoundingClientRect().left;
  // const y = event.clientY - canvas.getBoundingClientRect().top;
  ctx.lineWidth = isErasing ? 8 : 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = isErasing ? "#ffffff" : "#000000";
  ctx.lineTo(x, y);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", () => {
  canvasContainer.classList.remove("show");
  clearCanvas();
  isDrawing = false;
  isErasing = false;
});

const penButton = document.getElementById("penButton");
const eraserButton = document.getElementById("eraserButton");

penButton.addEventListener("click", () => {
  isDrawing = true;
  isErasing = false;
  penButton.classList.add("active");
  eraserButton.classList.remove("active");
  ctx.strokeStyle = "#000000"; // Đặt màu đường vẽ trở lại màu đen
});

eraserButton.addEventListener("click", () => {
  isDrawing = true;
  isErasing = true;
  penButton.classList.remove("active");
  eraserButton.classList.add("active");
  ctx.strokeStyle = "#ffffff"; // Đặt màu đường vẽ thành màu trắng
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  if (isErasing) {
    clearCanvas();
  }
});



////////gửi file
// var sendButton = document.getElementById("send");
//   var menu = document.getElementById("menu");

//   sendButton.addEventListener("click", function() {
//     if (menu.style.display === "none") {
//       menu.style.display = "block";
//     } else {
//       menu.style.display = "none";
//     }
//   });

//   var sendFileLink = document.querySelector("#menu li:nth-child(1) a");
//   var otherLink = document.querySelector("#menu li:nth-child(2) a");

//   sendFileLink.addEventListener("click", function(e) {
//     e.preventDefault();
//     menu.style.display = "none";
//     // Thực hiện các hành động khi người dùng chọn "Gửi file"
//   });

//   otherLink.addEventListener("click", function(e) {
//     e.preventDefault();
//     menu.style.display = "none";
//     // Thực hiện các hành động khi người dùng chọn "Khác"
//   });  
var sendButton = document.getElementById("send");
  var menu = document.getElementById("menu");

  sendButton.addEventListener("click", function() {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });

  document.addEventListener("click", function(e) {
    if (!menu.contains(e.target) && !sendButton.contains(e.target)) {
      menu.style.display = "none";
    }
  });

  //Xử lý sự kiện "message"
  socket.on("message", (message, userName) => {
    displayMessage(message, userName);
  });
  
  // Hiển thị tin nhắn trong phần messages
  function displayMessage(message, userName) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
  
    // const userSpan = document.createElement("span");
    // userSpan.innerHTML = `<b><i class="far fa-user-circle"></i> <span>${userName === user ? "me" : userName}</span></b>`;
  
    if (message.type === "file") {
      const fileNameElement = document.createElement("p");
      fileNameElement.textContent = `File: ${message.fileName}`;
  
      const downloadLink = document.createElement("a");
      downloadLink.href = message.data;
      downloadLink.download = message.fileName;
      downloadLink.textContent = "Tải xuống";
  
      // messageElement.appendChild(userSpan);
      messageElement.appendChild(fileNameElement);
      messageElement.appendChild(downloadLink);
    }
  
    messagesContainer.appendChild(messageElement);
  }
  
  // Sự kiện khi chọn file
  function selectFile() {
    const input = document.createElement('input');
    input.type = 'file';
  
    // Xử lý sự kiện khi chọn file
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      // Xử lý sự kiện khi đọc file hoàn tất
      reader.onload = (e) => {
        const fileData = e.target.result;
  
        // Gửi thông điệp chứa file đến server
        const message = {
          type: 'file',
          fileName: file.name,
          data: fileData,
        };
        socket.emit('message', message, user);
        // displayMessage(message, user);
      };
  
      // Đọc file
      reader.readAsDataURL(file);
    });
  
    // Mở hộp thoại chọn file
    input.click();
  }
  //đây là đoạn server.js
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId, userName) => {
      socket.join(roomId);
      setTimeout(() => {
        socket.to(roomId).broadcast.emit("user-connected", userId);
      }, 1000);
      socket.on("message", (message) => {
        io.to(roomId).emit("message", message, userName);
      });
    });
  });