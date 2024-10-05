//------Https------\\

if (window.location.protocol != "https:") {
  window.location.protocol="https:";
}

const hash = document.querySelector(".hash");
const txt = document.querySelector(".txt");
const txtHash = document.querySelector(".txtHash");

const copieHash = document.querySelector(".a");
const copieTxt = document.querySelector(".b");
const copieTxtHash = document.querySelector(".c");

let hashValue;

hash.addEventListener("input", function() {
  hashValue = hash.value;
})

function encryptDecrypt(text, hashValue) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let textChar = text.charCodeAt(i);
    let hashChar = hashValue.charCodeAt(i % hashValue.length);
    result += String.fromCharCode(textChar ^ hashChar);
  }
  return result;
}

txt.addEventListener("input", function() {
  try {
    let encrypted = encryptDecrypt(txt.value, hashValue);
    txtHash.value = btoa(encrypted);
  } catch {}
});

txtHash.addEventListener("input", function() {
  try {
    let decrypted = atob(txtHash.value);
    txt.value = encryptDecrypt(decrypted, hashValue);
  } catch {}
});

function copyToClipboard(element, text) {
  element.classList.add("active");

  navigator.clipboard.writeText(text || '');

  setTimeout(function() {
    element.classList.remove("active");
  }, 2500);
}

copieHash.onclick = function() {
  copyToClipboard(copieHash, hashValue);
}

copieTxt.onclick = function() {
  copyToClipboard(copieTxt, txt.value);
}

copieTxtHash.onclick = function() {
  copyToClipboard(copieTxtHash, txtHash.value);
}