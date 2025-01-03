const socket = io();
let isUserAction = true;
let initialPlay = false;

document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("chatForm");
  chatForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const roomId = document.getElementById("roomIdInput").value;
    const message = document.getElementById("messageInput").value;
    socket.emit("sendMessage", roomId, message);
    document.getElementById("messageInput").value = "";
  });

  document.getElementById("createRoom").addEventListener("click", function () {
    socket.emit("createRoom");
  });

  document.getElementById("joinRoom").addEventListener("click", function () {
    const roomId = document.getElementById("roomIdInput").value;
    socket.emit("joinRoom", roomId);
  });

  window.embed = function (videoUrl) {
    const roomId = document.getElementById("roomIdInput").value;
    const embedUrl = convertToEmbedUrl(videoUrl);
    socket.emit("embedVideo", roomId, embedUrl);
  };

  document.getElementById("embedVideo").addEventListener("click", function () {
    const roomId = document.getElementById("roomIdInput").value;
    let videoUrl = document.getElementById("videoUrlInput").value;

    // Convert to embed URL if necessary
    videoUrl = convertToEmbedUrl(videoUrl);

    socket.emit("embedVideo", roomId, videoUrl);
  });
});

socket.on("roomCreated", function (roomId) {
  alert(`Room created with ID: ${roomId}`);
  document.getElementById("roomIdInput").value = roomId;
  joinRoom(roomId);
});

socket.on("roomJoined", function (roomId, videoUrl, currentTime, isPlaying) {
  alert(`Joined room: ${roomId}`);
  document.getElementById("roomIdInput").value = roomId;
  if (videoUrl) {
    displayVideo(videoUrl);

    const videoElement = document.getElementById("videoElement");
    videoElement.currentTime = currentTime;
    if (isPlaying) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }
});

socket.on("videoEmbedded", function (videoUrl) {
  displayVideo(videoUrl);
});

socket.on("error", function (message) {
  alert(message);
});

socket.on("playVideo", function (currentTime) {
  const videoElement = document.getElementById("videoElement");
  isUserAction = false;
  videoElement.currentTime = currentTime;
  if (initialPlay) {
    videoElement.play();
  }
});

socket.on("pauseVideo", function (currentTime) {
  const videoElement = document.getElementById("videoElement");
  isUserAction = false;
  videoElement.currentTime = currentTime;
  if (initialPlay) {
    videoElement.pause();
  }
});

socket.on("seekVideo", function (currentTime) {
  const videoElement = document.getElementById("videoElement");
  isUserAction = false;
  videoElement.currentTime = currentTime;
});

socket.on("receiveMessage", function (data) {
  const chatContainer = document.getElementById("chatMessages");
  const messageElement = document.createElement("p");
  messageElement.textContent = `User ${data.userId}: ${data.message}`;
  chatContainer.appendChild(messageElement);
});

function joinRoom(roomId) {
  socket.emit("joinRoom", roomId);
}

function displayVideo(videoUrl) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.style.display = "flex";

  let videoType = getVideoType(videoUrl);

  switch (videoType) {
    case "youtube":
      videoContainer.innerHTML = `<iframe id="videoElement" width="560" height="315"
                                      src="${videoUrl}"
                                      title="YouTube video player"
                                      frameborder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowfullscreen></iframe>`;
      break;
    case "direct":
      videoContainer.innerHTML = `<video id="videoElement" width="560" height="315" controls>
                                      <source src="${videoUrl}" type="video/mp4">
                                  </video>`;
      break;
    default:
      throw new Error("Unsupported video type");
  }

  const videoElement = document.getElementById("videoElement");

  videoElement.addEventListener("play", function () {
    if (isUserAction) {
      const roomId = document.getElementById("roomIdInput").value;
      socket.emit("playVideo", roomId, videoElement.currentTime);
    }
    isUserAction = true;
    initialPlay = true;
  });

  videoElement.addEventListener("pause", function () {
    if (isUserAction) {
      const roomId = document.getElementById("roomIdInput").value;
      socket.emit("pauseVideo", roomId, videoElement.currentTime);
    }
    isUserAction = true;
    initialPlay = true;
  });

  videoElement.addEventListener("seeking", function () {
    if (isUserAction) {
      const roomId = document.getElementById("roomIdInput").value;
      socket.emit("seekVideo", roomId, videoElement.currentTime);
    }
    isUserAction = true;
  });
}

function convertToEmbedUrl(url) {
  if (isYouTubeUrl(url)) {
    const videoId = getYouTubeVideoId(url);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
}

function getVideoType(videoUrl) {
  if (isYouTubeUrl(videoUrl)) {
    return "youtube";
  } else {
    // Assume it's a direct video URL
    return "direct";
  }
}

function getYouTubeVideoId(url) {
  const regex =
    /^(?:https?:\/\/)?(?:www\.youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error("Invalid YouTube URL");
  }
}

function isYouTubeUrl(url) {
  const regex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)/;
  return regex.test(url);
}
