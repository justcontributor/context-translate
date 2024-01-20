const regexp = new RegExp("^[a-z0-9!@#$%^&*()]$", "i");
let timer;
let save_options = () => {
  let ser = document.getElementById("service").value;
  let key = document.getElementById("shortcut").value;
  let copy = document.getElementById("copy").checked;
  let short = document.getElementById("short").checked;
  let alt = document.getElementById("alt").checked;
  let shift = document.getElementById("shift").checked;
  let ctrl = document.getElementById("ctrl").checked;
  whale.storage.sync.set(
    {
      Service: ser,
      Key: key,
      Copy: copy,
      Short: short,
      Alt: alt,
      Shift: shift,
      Ctrl: ctrl,
    },
    () => {
      msg("저장 완료. 일부 설정은 페이지를 새로고침해야 적용됩니다.");
    }
  );
};

let restore_options = () => {
  whale.storage.sync.get(
    {
      Service: "papago",
      Key: "F8",
      Copy: 0,
      Short: 1,
      Alt: 0,
      Ctrl: 0,
      Shift: 0, //기본값 파파고, F8, 복사 안 함, 단축키 사용
    },
    (items) => {
      document.getElementById("service").value = items.Service;
      document.getElementById("shortcut").value = items.Key;
      document.getElementById("copy").checked = items.Copy;
      document.getElementById("short").checked = items.Short;
      document.getElementById("alt").checked = items.Alt;
      document.getElementById("shift").checked = items.Shift;
      document.getElementById("ctrl").checked = items.Ctrl;
    }
  );
};

let change_shortcut = (e) => {
  e.preventDefault();
  if (
    e.key == "Control" ||
    e.key == "Shift" ||
    e.key == "Alt" ||
    e.key == "Meta"
  ) {
    msg(
      "해당 키는 단축키로 설정할 수 없습니다. 가급적 영숫자 키나 기능 키로 설정해주세요.",
      true
    );
  } else if (
    e.key.match(regexp) &&
    !document.getElementById("alt").checked &&
    !document.getElementById("ctrl").checked
  ) {
    msg(
      "단일 영숫자나 Shift+영숫자는 단축키로 설정할 수 없습니다. 우선 Ctrl이나 Alt를 활성화하세요.",
      true
    );
  } else {
    document.getElementById("shortcut").value = e.key.toUpperCase();
    save_options();
    document.getElementById("shortcut").blur();
  }
};

let msg = (txt, warn = false) => {
  let status = document.getElementById("status");
  status.innerHTML = txt;
  status.style.color = warn ? "#ff0000" : "green";
  window.clearTimeout(timer);

  timer = setTimeout(
    (let = () => {
      status.innerHTML = "";
    }),
    warn ? 6000 : 2000
  );
};

let toggle_options = (e) => {
  save_options();

  if (
    document.getElementById("shortcut").value.match(regexp) &&
    !document.getElementById("alt").checked &&
    !document.getElementById("ctrl").checked
  ) {
    document.getElementById("ctrl").checked = true;

    window.setTimeout(
      () =>
        msg(
          "단일 영문자나 Shift+영문자는 단축키로 설정할 수 없어서 Ctrl을 대신 활성화했습니다.<br/>우선 영문자를 다른 단축키로 할당하세요.",
          true
        ),
      2000
    );
  }
};

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("service").addEventListener("change", save_options);
document
  .getElementById("shortcut")
  .addEventListener("keydown", change_shortcut);
document.getElementById("copy").addEventListener("change", save_options);
document.getElementById("short").addEventListener("change", save_options);
document.getElementById("alt").addEventListener("change", toggle_options);
document.getElementById("shift").addEventListener("change", toggle_options);
document.getElementById("ctrl").addEventListener("change", toggle_options);
