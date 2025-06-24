const getSelectionText = () => {
  if (window.getSelection) return window.getSelection().toString();
  if (document.selection && document.selection.type !== "Control")
    return document.selection.createRange().text;
  return "";
};

const copy = (text) => {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const escapeURL = (service, q) => {
  return (
    url[service] + encodeURI(q).replaceAll("&", andEscape[service] || "%26")
  );
};

const openSidebar = (tar) => {
  window.open(tar, "_blank", "whale-sidebar");
};

const url = {
  google: "https://translate.google.com/?sl=auto&tl=ko&text=",
  papago: "https://papago.naver.com/?sk=auto&tk=ko&st=",
  kakaoi: "https://translate.kakao.com/?q=",
  bing: "https://www.bing.com/translator?from=auto&to=ko&text=",
  set: "https://papago.naver.com/?sk=auto&tk=ko&st=", // 번역기들 fallback
  yandex: "https://translate.yandex.com/?lang=en-ko&text=",
  flitto:
    "https://ko.flitto.com/language/translation/text?src_lang_id=17&dst_lang_id=33&lang_id=33&q=",
  samsung: "https://translate.samsung.com/?text=",
  deepl: "https://www.deepl.com/translator#auto/ko/",
};

const andEscape = {
  papago: "%25amp",
};

const translate = (arg) => {
  whale.storage.sync.get(
    {
      Service: "papago",
      Copy: 0,
    },
    (items) => {
      const q = arg || getSelectionText();
      const link = escapeURL(items.Service, q);
      if (items.Copy) copy(q);
      openSidebar(link);
    }
  );
};

export { translate };
