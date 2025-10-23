
document.addEventListener("DOMContentLoaded", async () => {
  
  const title = localStorage.getItem("tdiary") || "(제목 없음)";
  const content = localStorage.getItem("cdiary") || "(내용 없음)";
  const titleBox = document.getElementById("titlebox");
  const whiteBox = document.getElementById("whitebox");
  const downloadBtn = document.getElementById("download");
  const original = document.getElementById("yelbox");
  const Ma = document.getElementById("main");

  Ma.addEventListener("click", () => {
    location.href = "./diary.html";
  });

  titleBox.innerHTML = `<h1>${title}</h1>`;
  whiteBox.innerHTML = `<p>${content}</p><p>너구리가 답변하는 중...</p>`;

  const gptMessage = await getGPT35Comment(title, content);
  whiteBox.innerHTML = `<p>${content}</p><p>${gptMessage}</p>`;

  await document.fonts.ready;
  await new Promise(resolve => setTimeout(resolve, 500));
  
  downloadBtn.addEventListener("click", async () => {
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const clone = original.cloneNode(true);
    clone.id = "capture-target";

    // 강제 스타일 적용
    const rect = original.getBoundingClientRect();
    clone.style.position = "fixed";
    clone.style.top = "50%";
    clone.style.left = "50%";
    clone.style.transform = "translate(-50%, -50%)";
    clone.style.zIndex = "9999";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.zIndex = "9999";
    clone.style.background = "#F7D275";
    clone.style.color = "#000";
    clone.style.fontFamily = "Arial, sans-serif";
    clone.style.transform = "none";
    clone.style.animation = "none";
    clone.style.overflow = "visible";

    // titlebox 스타일 복제
    const cloneTitleBox = clone.querySelector("#titlebox");
    if (cloneTitleBox) {
      const s = window.getComputedStyle(titleBox);
      Object.assign(cloneTitleBox.style, {
        background: "#fff",
        color: "#000",
        fontFamily: "Arial, sans-serif",
        padding: s.padding,
        borderRadius: s.borderRadius,
        width: s.width,
        height: s.height,
        boxShadow: s.boxShadow,
        lineHeight: s.lineHeight || "1.2"
      });
    }

    // whitebox 스타일 복제
    const cloneWhiteBox = clone.querySelector("#whitebox");
    if (cloneWhiteBox) {
      const s = window.getComputedStyle(whiteBox);
      cloneWhiteBox.style.height = whiteBox.scrollHeight + "px";
      Object.assign(cloneWhiteBox.style, {
        background: "#fff",
        color: "#000",
        fontFamily: "Arial, sans-serif",
        padding: s.padding,
        borderRadius: s.borderRadius,
        width: s.width,
        boxShadow: s.boxShadow,
        lineHeight: s.lineHeight || "1.2",
        overflow: "visible",
        position: "relative"
      });
    }

    document.body.appendChild(clone);

clone.style.position = "fixed";
clone.style.top = "-9999px";  // 화면 위쪽 아주 멀리
clone.style.left = "-9999px"; // 화면 왼쪽 아주 멀리
clone.style.width = rect.width + "px";
clone.style.height = rect.height + "px";
clone.style.background = "#F7D275";
clone.style.color = "#000";
  
    const canvas = await html2canvas(clone, {
      useCORS: true,
      backgroundColor: "#fff",
      scale: 2,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    });

    const trimmed = trimCanvas(canvas);
    const ctx = trimmed.getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, trimmed.width, trimmed.height);

    document.body.removeChild(clone);
    trimmed.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  });
});

async function getGPT35Comment(title, content) {
  try {
    const res = await fetch("https://foxmoonbackend.onrender.com/api/gpt-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
      credentials: "include"
    });
    const data = await res.json();
    return data.message || "오늘 하루 수고했어요. 당신의 이야기를 들을 수 있어 기뻐요.";
  } catch (err) {
    console.error("프론트 GPT 오류:", err);
    return "오늘 하루 수고했어요. 당신의 이야기를 들을 수 있어 기뻐요.";
  }
}

function trimCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  let top = null, bottom = null, left = null, right = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = pixels[(y * width + x) * 4 + 3];
      if (alpha === 0) continue;
      if (top === null) top = y;
      bottom = y;
      if (left === null || x < left) left = x;
      if (right === null || x > right) right = x;
    }
  }

  if (top === null || bottom === null || left === null || right === null) {
    return canvas;
  }

  const trimmedWidth = right - left + 1;
  const trimmedHeight = bottom - top + 1;
  const trimmed = document.createElement("canvas");
  trimmed.width = trimmedWidth;
  trimmed.height = trimmedHeight;
  const trimmedCtx = trimmed.getContext("2d");
  trimmedCtx.putImageData(ctx.getImageData(left, top, trimmedWidth, trimmedHeight), 0, 0);

  return trimmed;
}

