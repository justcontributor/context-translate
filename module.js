const getSelectionText = () => {
  if (window.getSelection) {
    return window.getSelection().toString();
  }
  if (document.selection && document.selection.type != "Control") {
    return document.selection.createRange().text;
  }
};

const copy = (text) => {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.cssText = "position: absolute; left: -9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy"); // new API requests permission too frequently
  document.body.removeChild(el);
};

const openSidebar = (url, q, andEscape = "%26") => {
  const tar = url + encodeURI(q).replaceAll("&", andEscape);
  window.open(tar, "_blank", "whale-sidebar");
};

const translate = (arg) => {
  const url = {
    google: "https://translate.google.com/?sl=auto&tl=ko&text=",
    papago: "https://papago.naver.com/?sk=auto&tk=ko&st=",
    kakaoi: "https://translate.kakao.com/?q=",
    bing: "https://www.bing.com/translator?from=auto&to=ko&text=",
    set: "https://translators.to/?source=&target=ko&text=",
    yandex: "https://translate.yandex.com/?lang=en-ko&text=",
    flitto:
      "https://ko.flitto.com/language/translation/text?src_lang_id=17&dst_lang_id=33&lang_id=33&q=",
    samsung: "https://translate.samsung.com/?text=",
    deepl: "https://www.deepl.com/translator#auto/ko/",
  };

  const andEscape = {
    papago: "%25amp",
  };

  whale.storage.sync.get(
    {
      Service: "papago",
      Copy: 0,
    },
    (items) => {
      let q = arg ? arg : getSelectionText();
      if (items.Copy) copy(q);
      let service = items.Service;
      openSidebar(url[service], q, andEscape[service]);
    }
  );
};

export { translate };
