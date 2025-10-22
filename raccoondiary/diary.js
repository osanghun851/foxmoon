document.frmd.movmain.addEventListener("click",function(){
    location.href = "./main.html"
})
const messages = [
  "&nbsp;&nbsp;&nbsp;&nbsp;당신에게 일어난 일 중에서, 나다운 반응을 했던 순간은 언제였고 왜 그렇게 생각하나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신의 마음을 환하게 해준 생각은 무엇이었나요",
  
  "&nbsp;&nbsp;&nbsp;&nbsp;당신이 들은 말 중 기억에 오래 남을 말이 있다면, 무엇이었나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신을 웃게 만든 상황이나 사람이 있었다면, 왜 그게 그렇게 기분이 좋았나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;오늘 당신이 한 행동 중 가장 자랑스러웠던 일은 무엇인가요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신이 옛날 같았으면 못했을 일을 해낸 경험이 있나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신은 어떤 순간에 ‘내가 바뀌고 있구나’라고 느끼나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;오늘 당신이 한 선택 중 미래의 당신을 위한 결정은 무엇이었나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신은 어떤 두려움을 마주했고, 그것에 어떻게 반응했나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;오늘 하루 중, 당신은 어떤 순간에 ‘괜찮아, 이대로도 좋아’라고 느꼈나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신은 어떤 모습일 때 스스로에게 가장 따뜻한 시선을 보낼 수 있나요",
  
  "&nbsp;&nbsp;&nbsp;&nbsp;당신은 얼마나 솔직하게 감정에 반응했나요? 숨긴 감정이 있다면 이유는 무엇인가요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신이 느낀 감정 중 가장 놀라웠던 감정은 무엇인가요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신을 지치게 만든 일은 무엇이었고, 회복하기 위해 무엇을 했나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;당신이 내린 결정 중에서 가장 만족스러운 결정은 무엇이었나요",
  "&nbsp;&nbsp;&nbsp;&nbsp;고맙다고 말하지 못했지만 마음속으로 감사했던 사람은 누구인가요",
  "&nbsp;&nbsp;&nbsp;&nbsp;오늘 한 실수를 통해 얻은 교훈은 무엇인가요",
  "&nbsp;&nbsp;&nbsp;&nbsp;오늘 당신이 '아, 이거 좋아'라고 느낀 감각(냄새, 소리, 촉감, 풍경 등)은 무엇인가요"
];

let index = 0;
const p = document.getElementById("pquestion");
const q = document.getElementById("past");
const c = document.getElementById('cdiary');
setInterval(() => {
  index = (index + 1) % messages.length;
  p.innerHTML = messages[index]; 
}, 5000);
c.addEventListener('input', () => {
  q.innerHTML = `${c.value.length}자`;
});