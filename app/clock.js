const ampm = ['午前', '午後'];
const gan = '甲乙丙丁戊己庚辛壬癸';
const zhi = '子丑寅卯辰巳午未申酉戌亥';
function mod60_to_ganzhi(x) {
  let m10 = x % 10;
  let m12 = x % 12;
  return gan[m10] + zhi[m12];
}

function calc_ganzhi() {
  let now = new Date();
  let hour_ampm = Math.floor(now.getHours() / 12);
  let hour_12 = now.getHours() % 12;
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  return `${ampm[hour_ampm]} ${zhi[hour_12]}:${mod60_to_ganzhi(minutes)}:${mod60_to_ganzhi(seconds)}`;
}

function share() {
  const str = calc_ganzhi();
  const url = encodeURI(`https://twitter.com/intent/tweet?text=今の時刻は${str}です&url=https://poyo.me/ganzhi-clock/&hashtags=デジタル干支時計`);
  window.open(url, 'twitter');
}

window.onload = function() {
  let iid = setInterval(() => {
    let str = calc_ganzhi();
    document.getElementById("clock").textContent = str;
  }, 10);
  document.getElementById("gan_str").textContent = gan;
  document.getElementById("zhi_str").textContent = zhi;
  let inner = "<tr><td></td>";
  for (let col = 0; col < 12; col++) {
    inner += `<th scope="col">${zhi[col]}</th>`;
  }
  inner += "</tr>";
  let answer = new Array(120);
  for (let i = 0; i < 60; ++i) {
    let col = i % 12;
    let row = i % 10;
    let index = row * 12 + col;
    answer[index] = mod60_to_ganzhi(i) + `=${i}`;
  }
  for (let row = 0; row < 10; row++) {
    inner += `<tr><th scope="row">${gan[row]}</th>`;
    for (let col = 0; col < 12; col++) {
      if ((row + col) % 2 == 0) {
        let index = row * 12 + col;
        inner += `<td>${answer[index]}</td>`;
      } else {
        inner += "<td></td>";
      }
    }
    inner += "</tr>";
  }
  document.getElementById("ganzhi-table").innerHTML = inner;
}
