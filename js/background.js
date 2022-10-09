const images = ["01.jpg", "02.jpg", "03.jpeg"];

const choseImage = images[Math.floor(Math.random() * images.length)];

// js로 html img 만들기
const bgImage = document.createElement("img");

// 어떤 이미지를 넣을 것인지 bgImg의 src 설정
bgImage.src = `img/${choseImage}`;

// bgImage를 body 내부에 추가하기
// insertBefore() 메서드 사용하면 body에 넣고 싶은 위치에 넣을 수 있다.
// document.body.insertBefore(bgImage, h2);
// ⬆️ h2 요소 앞에 bgImage가 추가 된다.
// prependChild() body의 맨 위에 위치하게 된다. append()는 bddy의 맨 뒤에 위치.
document.body.appendChild(bgImage);
