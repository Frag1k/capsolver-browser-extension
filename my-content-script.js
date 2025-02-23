"use strict";
(() => {
  console.log("Testing");
  var Se = Object.create;
  var E = Object.defineProperty;
  var Le = Object.getOwnPropertyDescriptor;
  var De = Object.getOwnPropertyNames;
  var We = Object.getPrototypeOf,
    Ie = Object.prototype.hasOwnProperty;
  var ke = (e, t, n) => t in e ? E(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
  var q = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports);
  var Ee = (e, t, n, o) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let r of De(t)) !Ie.call(e, r) && r !== n && E(e, r, {
        get: () => t[r],
        enumerable: !(o = Le(t, r)) || o.enumerable
      });
    return e
  };
  var j = (e, t, n) => (n = e != null ? Se(We(e)) : {}, Ee(t || !e || !e.__esModule ? E(n, "default", {
    value: e,
    enumerable: !0
  }) : n, e));
  var h = (e, t, n) => (ke(e, typeof t != "symbol" ? t + "" : t, n), n);
  var Y = q((at, R) => {
    "use strict";
    var C = typeof Reflect == "object" ? Reflect : null,
      N = C && typeof C.apply == "function" ? C.apply : function(t, n, o) {
        return Function.prototype.apply.call(t, n, o)
      },
      M;
    C && typeof C.ownKeys == "function" ? M = C.ownKeys : Object.getOwnPropertySymbols ? M = function(t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
    } : M = function(t) {
      return Object.getOwnPropertyNames(t)
    };

    function Re(e) {
      console && console.warn && console.warn(e)
    }
    var $ = Number.isNaN || function(t) {
      return t !== t
    };

    function i() {
      i.init.call(this)
    }
    R.exports = i;
    R.exports.once = Fe;
    i.EventEmitter = i;
    i.prototype._events = void 0;
    i.prototype._eventsCount = 0;
    i.prototype._maxListeners = void 0;
    var K = 10;

    function S(e) {
      if (typeof e != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
    }
    Object.defineProperty(i, "defaultMaxListeners", {
      enumerable: !0,
      get: function() {
        return K
      },
      set: function(e) {
        if (typeof e != "number" || e < 0 || $(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
        K = e
      }
    });
    i.init = function() {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    };
    i.prototype.setMaxListeners = function(t) {
      if (typeof t != "number" || t < 0 || $(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this
    };

    function U(e) {
      return e._maxListeners === void 0 ? i.defaultMaxListeners : e._maxListeners
    }
    i.prototype.getMaxListeners = function() {
      return U(this)
    };
    i.prototype.emit = function(t) {
      for (var n = [], o = 1; o < arguments.length; o++) n.push(arguments[o]);
      var r = t === "error",
        a = this._events;
      if (a !== void 0) r = r && a.error === void 0;
      else if (!r) return !1;
      if (r) {
        var s;
        if (n.length > 0 && (s = n[0]), s instanceof Error) throw s;
        var c = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
        throw c.context = s, c
      }
      var g = a[t];
      if (g === void 0) return !1;
      if (typeof g == "function") N(g, this, n);
      else
        for (var f = g.length, v = J(g, f), o = 0; o < f; ++o) N(v[o], this, n);
      return !0
    };

    function V(e, t, n, o) {
      var r, a, s;
      if (S(n), a = e._events, a === void 0 ? (a = e._events = Object.create(null), e._eventsCount = 0) : (a.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), a = e._events), s = a[t]), s === void 0) s = a[t] = n, ++e._eventsCount;
      else if (typeof s == "function" ? s = a[t] = o ? [n, s] : [s, n] : o ? s.unshift(n) : s.push(n), r = U(e), r > 0 && s.length > r && !s.warned) {
        s.warned = !0;
        var c = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = s.length, Re(c)
      }
      return e
    }
    i.prototype.addListener = function(t, n) {
      return V(this, t, n, !1)
    };
    i.prototype.on = i.prototype.addListener;
    i.prototype.prependListener = function(t, n) {
      return V(this, t, n, !0)
    };

    function Pe() {
      if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }

    function z(e, t, n) {
      var o = {
          fired: !1,
          wrapFn: void 0,
          target: e,
          type: t,
          listener: n
        },
        r = Pe.bind(o);
      return r.listener = n, o.wrapFn = r, r
    }
    i.prototype.once = function(t, n) {
      return S(n), this.on(t, z(this, t, n)), this
    };
    i.prototype.prependOnceListener = function(t, n) {
      return S(n), this.prependListener(t, z(this, t, n)), this
    };
    i.prototype.removeListener = function(t, n) {
      var o, r, a, s, c;
      if (S(n), r = this._events, r === void 0) return this;
      if (o = r[t], o === void 0) return this;
      if (o === n || o.listener === n) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete r[t], r.removeListener && this.emit("removeListener", t, o.listener || n));
      else if (typeof o != "function") {
        for (a = -1, s = o.length - 1; s >= 0; s--)
          if (o[s] === n || o[s].listener === n) {
            c = o[s].listener, a = s;
            break
          } if (a < 0) return this;
        a === 0 ? o.shift() : Be(o, a), o.length === 1 && (r[t] = o[0]), r.removeListener !== void 0 && this.emit("removeListener", t, c || n)
      }
      return this
    };
    i.prototype.off = i.prototype.removeListener;
    i.prototype.removeAllListeners = function(t) {
      var n, o, r;
      if (o = this._events, o === void 0) return this;
      if (o.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : o[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete o[t]), this;
      if (arguments.length === 0) {
        var a = Object.keys(o),
          s;
        for (r = 0; r < a.length; ++r) s = a[r], s !== "removeListener" && this.removeAllListeners(s);
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
      }
      if (n = o[t], typeof n == "function") this.removeListener(t, n);
      else if (n !== void 0)
        for (r = n.length - 1; r >= 0; r--) this.removeListener(t, n[r]);
      return this
    };

    function Q(e, t, n) {
      var o = e._events;
      if (o === void 0) return [];
      var r = o[t];
      return r === void 0 ? [] : typeof r == "function" ? n ? [r.listener || r] : [r] : n ? _e(r) : J(r, r.length)
    }
    i.prototype.listeners = function(t) {
      return Q(this, t, !0)
    };
    i.prototype.rawListeners = function(t) {
      return Q(this, t, !1)
    };
    i.listenerCount = function(e, t) {
      return typeof e.listenerCount == "function" ? e.listenerCount(t) : G.call(e, t)
    };
    i.prototype.listenerCount = G;

    function G(e) {
      var t = this._events;
      if (t !== void 0) {
        var n = t[e];
        if (typeof n == "function") return 1;
        if (n !== void 0) return n.length
      }
      return 0
    }
    i.prototype.eventNames = function() {
      return this._eventsCount > 0 ? M(this._events) : []
    };

    function J(e, t) {
      for (var n = new Array(t), o = 0; o < t; ++o) n[o] = e[o];
      return n
    }

    function Be(e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop()
    }

    function _e(e) {
      for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
      return t
    }

    function Fe(e, t) {
      return new Promise(function(n, o) {
        function r(s) {
          e.removeListener(t, a), o(s)
        }

        function a() {
          typeof e.removeListener == "function" && e.removeListener("error", r), n([].slice.call(arguments))
        }
        X(e, t, a, {
          once: !0
        }), t !== "error" && Ae(e, r, {
          once: !0
        })
      })
    }

    function Ae(e, t, n) {
      typeof e.on == "function" && X(e, "error", t, n)
    }

    function X(e, t, n, o) {
      if (typeof e.on == "function") o.once ? e.once(t, n) : e.on(t, n);
      else if (typeof e.addEventListener == "function") e.addEventListener(t, function r(a) {
        o.once && e.removeEventListener(t, r), n(a)
      });
      else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
    }
  });
  var oe = q((pt, p) => {
    p.exports.boot = function(e) {
      return e
    };
    p.exports.ssrMiddleware = function(e) {
      return e
    };
    p.exports.configure = function(e) {
      return e
    };
    p.exports.preFetch = function(e) {
      return e
    };
    p.exports.route = function(e) {
      return e
    };
    p.exports.store = function(e) {
      return e
    };
    p.exports.bexBackground = function(e) {
      return e
    };
    p.exports.bexContent = function(e) {
      return e
    };
    p.exports.bexDom = function(e) {
      return e
    };
    p.exports.ssrProductionExport = function(e) {
      return e
    };
    p.exports.ssrCreate = function(e) {
      return e
    };
    p.exports.ssrListen = function(e) {
      return e
    };
    p.exports.ssrClose = function(e) {
      return e
    };
    p.exports.ssrServeStaticContent = function(e) {
      return e
    };
    p.exports.ssrRenderPreloadTag = function(e) {
      return e
    }
  });
  var te = j(Y());
  var P, L = 0,
    l = new Array(256);
  for (let e = 0; e < 256; e++) l[e] = (e + 256).toString(16).substring(1);
  var He = (() => {
      let e = typeof crypto != "undefined" ? crypto : typeof window != "undefined" ? window.crypto || window.msCrypto : void 0;
      if (e !== void 0) {
        if (e.randomBytes !== void 0) return e.randomBytes;
        if (e.getRandomValues !== void 0) return t => {
          let n = new Uint8Array(t);
          return e.getRandomValues(n), n
        }
      }
      return t => {
        let n = [];
        for (let o = t; o > 0; o--) n.push(Math.floor(Math.random() * 256));
        return n
      }
    })(),
    Z = 4096;

  function ee() {
    (P === void 0 || L + 16 > Z) && (L = 0, P = He(Z));
    let e = Array.prototype.slice.call(P, L, L += 16);
    return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, l[e[0]] + l[e[1]] + l[e[2]] + l[e[3]] + "-" + l[e[4]] + l[e[5]] + "-" + l[e[6]] + l[e[7]] + "-" + l[e[8]] + l[e[9]] + "-" + l[e[10]] + l[e[11]] + l[e[12]] + l[e[13]] + l[e[14]] + l[e[15]]
  }
  var Oe = {
      undefined: () => 0,
      boolean: () => 4,
      number: () => 8,
      string: e => 2 * e.length,
      object: e => e ? Object.keys(e).reduce((t, n) => B(n) + B(e[n]) + t, 0) : 0
    },
    B = e => Oe[typeof e](e),
    y = class extends te.EventEmitter {
      constructor(t) {
        super(), this.setMaxListeners(1 / 0), this.wall = t, t.listen(n => {
          Array.isArray(n) ? n.forEach(o => this._emit(o)) : this._emit(n)
        }), this._sendingQueue = [], this._sending = !1, this._maxMessageSize = 32 * 1024 * 1024
      }
      send(t, n) {
        return this._send([{
          event: t,
          payload: n
        }])
      }
      getEvents() {
        return this._events
      }
      on(t, n) {
        return super.on(t, o => {
          n({
            ...o,
            respond: r => this.send(o.eventResponseKey, r)
          })
        })
      }
      _emit(t) {
        typeof t == "string" ? this.emit(t) : this.emit(t.event, t.payload)
      }
      _send(t) {
        return this._sendingQueue.push(t), this._nextSend()
      }
      _nextSend() {
        if (!this._sendingQueue.length || this._sending) return Promise.resolve();
        this._sending = !0;
        let t = this._sendingQueue.shift(),
          n = t[0],
          o = `${n.event}.${ee()}`,
          r = o + ".result";
        return new Promise((a, s) => {
          let c = [],
            g = f => {
              if (f !== void 0 && f._chunkSplit) {
                let v = f._chunkSplit;
                c = [...c, ...f.data], v.lastChunk && (this.off(r, g), a(c))
              } else this.off(r, g), a(f)
            };
          this.on(r, g);
          try {
            let f = t.map(v => ({
              ...v,
              payload: {
                data: v.payload,
                eventResponseKey: r
              }
            }));
            this.wall.send(f)
          } catch (f) {
            let v = "Message length exceeded maximum allowed length.";
            if (f.message === v && Array.isArray(n.payload)) {
              let H = B(n);
              if (H > this._maxMessageSize) {
                let T = Math.ceil(H / this._maxMessageSize),
                  Te = Math.ceil(n.payload.length / T),
                  O = n.payload;
                for (let k = 0; k < T; k++) {
                  let Me = Math.min(O.length, Te);
                  this.wall.send([{
                    event: n.event,
                    payload: {
                      _chunkSplit: {
                        count: T,
                        lastChunk: k === T - 1
                      },
                      data: O.splice(0, Me)
                    }
                  }])
                }
              }
            }
          }
          this._sending = !1, setTimeout(() => this._nextSend(), 16)
        })
      }
    };
  var ne = (e, t) => {
    window.addEventListener("message", n => {
      if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
        let o = n.data[0],
          r = e.getEvents();
        for (let a in r) a === o.event && r[a](o.payload)
      }
    }, !1)
  };
  var Ce = j(oe());
  var qe = chrome.runtime.getURL("assets/config.json");
  async function je() {
    let e = await chrome.storage.local.get("defaultConfig");
    if (e.defaultConfig) return e.defaultConfig;
    let t = {},
      o = await (await fetch(qe)).json();
    return o && (t = o, chrome.storage.local.set({
      defaultConfig: t
    })), t
  }
  var b = {
      manualSolving: !1,
      apiKey: "",
      appId: "",
      enabledForImageToText: !0,
      enabledForRecaptchaV3: !0,
      enabledForHCaptcha: !0,
      enabledForGeetestV4: !1,
      recaptchaV3MinScore: .5,
      enabledForRecaptcha: !0,
      enabledForFunCaptcha: !0,
      enabledForDataDome: !1,
      useProxy: !1,
      proxyType: "http",
      hostOrIp: "",
      port: "",
      proxyLogin: "",
      proxyPassword: "",
      enabledForBlacklistControl: !1,
      blackUrlList: [],
      isInBlackList: !1,
      reCaptchaMode: "click",
      reCaptchaDelayTime: 0,
      reCaptchaCollapse: !1,
      reCaptchaRepeatTimes: 10,
      reCaptcha3Mode: "token",
      reCaptcha3DelayTime: 0,
      reCaptcha3Collapse: !1,
      reCaptcha3RepeatTimes: 10,
      hCaptchaMode: "click",
      hCaptchaDelayTime: 0,
      hCaptchaCollapse: !1,
      hCaptchaRepeatTimes: 10,
      funCaptchaMode: "click",
      funCaptchaDelayTime: 0,
      funCaptchaCollapse: !1,
      funCaptchaRepeatTimes: 10,
      geetestMode: "click",
      geetestCollapse: !1,
      geetestDelayTime: 0,
      geetestRepeatTimes: 10,
      textCaptchaMode: "click",
      textCaptchaCollapse: !1,
      textCaptchaDelayTime: 0,
      textCaptchaRepeatTimes: 10,
      enabledForCloudflare: !1,
      cloudflareMode: "click",
      cloudflareCollapse: !1,
      cloudflareDelayTime: 0,
      cloudflareRepeatTimes: 10,
      datadomeMode: "click",
      datadomeCollapse: !1,
      datadomeDelayTime: 0,
      datadomeRepeatTimes: 10,
      enabledForAws: !1,
      awsMode: "click",
      awsCollapse: !1,
      awsDelayTime: 0,
      awsRepeatTimes: 10,
      useCapsolver: !0,
      isInit: !1,
      solvedCallback: "captchaSolvedCallback",
      textCaptchaSourceAttribute: "capsolver-image-to-text-source",
      textCaptchaResultAttribute: "capsolver-image-to-text-result"
    },
    re = {
      proxyType: ["socks5", "http", "https", "socks4"],
      mode: ["click", "token"]
    };
  async function ae() {
    let e = await je(),
      t = Object.keys(e);
    for (let n of t)
      if (!(n === "proxyType" && !re[n].includes(e[n]))) {
        {
          if (n.endsWith("Mode") && !re.mode.includes(e[n])) continue;
          if (n === "port") {
            if (typeof e[n] != "number") continue;
            b[n] = e[n]
          }
        }
        Reflect.has(b, n) && typeof b[n] == typeof e[n] && (b[n] = e[n])
      } return b
  }
  var Ne = ae(),
    d = {
      default: Ne,
      async get(e) {
        return (await this.getAll())[e]
      },
      async getAll() {
        let e = await ae(),
          t = await chrome.storage.local.get("config");
        return d.joinConfig(e, t.config)
      },
      async set(e) {
        let t = await d.getAll(),
          n = d.joinConfig(t, e);
        return chrome.storage.local.set({
          config: n
        })
      },
      joinConfig(e, t) {
        let n = {};
        if (e)
          for (let o in e) n[o] = e[o];
        if (t)
          for (let o in t) n[o] = t[o];
        return n
      }
    };

  function se(e) {
    e.on("config", async ({
      respond: t
    }) => {
      let n = await d.getAll();
      t(n).then()
    }), e.on("registerCaptchaWidget", ({
      data: t,
      respond: n
    }) => {
      window.registerCaptchaWidget(t)
    })
  }

  function ie() {
    let e = document.querySelector("head > capsolver-widgets");
    e || (e = document.createElement("capsolver-widgets"), document.head.appendChild(e)), window.registerCaptchaWidget = t => {
      let n = Ke(t);
      if (window.isCaptchaWidgetRegistered(n)) return;
      let o = document.createElement("capsolver-widget");
      for (let r in n) o.dataset[r] = n[r];
      e.appendChild(o)
    }, window.isCaptchaWidgetRegistered = t => {
      let {
        captchaType: n,
        widgetId: o
      } = t, r = e.children;
      for (let a = 0; a < r.length; a++) {
        let s = r[a],
          c = s.dataset.captchaType,
          g = s.dataset.widgetId;
        if (!(c !== n || g !== o)) return !0
      }
      return !1
    }, window.resetCaptchaWidget = t => {
      let {
        captchaType: n,
        widgetId: o
      } = t, r = e.children;
      for (let a = 0; a < r.length; a++) {
        let c = r[a].dataset;
        if (c.captchaType === n && c.widgetId === o) {
          c.reset = String(!0);
          break
        }
      }
    }, window.getCaptchaWidget = t => {
      let {
        captchaType: n
      } = t, o = `capsolver-widget[data-captcha-type="${n}"]`;
      return document.querySelector(o)
    }, window.getCaptchaWidgetDataset = (t, n) => {
      var o;
      return (o = window.getCaptchaWidget({
        captchaType: t,
        widgetId: n
      })) == null ? void 0 : o.dataset
    }, window.setCaptchaWidgetDataset = (t, n, o) => {
      let r;
      t ? r = `capsolver-widget[data-widget-id="${t}"]` : r = "capsolver-widget";
      let a = document.querySelector(r);
      a && (a.dataset[n] = o)
    }
  }

  function Ke(e) {
    let t = {};
    for (let n in e) e[n] === null || e[n] === void 0 || (t[n] = `${e[n]}`);
    return t
  }

  function _() {
    let e = document.createElement("div");
    e.id = "capsolver-solver-tip-button", e.classList.add("capsolver-solver"), e.dataset.state = "solving";
    let t = document.createElement("div");
    t.classList.add("capsolver-solver-image");
    let n = document.createElement("img");
    n.src = chrome.runtime.getURL("assets/images/logo_solved.png"), n.alt = "", t.appendChild(n);
    let o = document.createElement("div");
    return o.classList.add("capsolver-solver-info"), o.innerText = chrome.i18n.getMessage("solving"), e.appendChild(t), e.appendChild(o), e
  }

  function u(e, t) {
    let n = document.querySelector("#capsolver-solver-tip-button"),
      o = n == null ? void 0 : n.querySelector(".capsolver-solver-info");
    o && (o.innerHTML = e), t && n && (n.dataset.state = t)
  }
  var $e = "hCaptcha";
  var D = class {
    constructor() {
      h(this, "captchaType", $e)
    }
    setSolveButton(t, n) {
      let o = document.querySelector(`#${t.containerId}`),
        r = n;
      r.style.width = o.querySelector("iframe").offsetWidth + "px", o.append(r)
    }
    getParams(t, n) {
      return {
        url: location.href,
        sitekey: t.sitekey
      }
    }
    onSolved(t, n) {
      u(chrome.i18n.getMessage("solved"), "solved");
      let o = document.getElementById(t.containerId);
      if (!o) return;
      o.querySelectorAll("iframe[data-hcaptcha-widget-id]").forEach(a => {
        let s = a.attributes["data-hcaptcha-widget-id"].value,
          c = JSON.stringify({
            source: "hcaptcha",
            label: "challenge-closed",
            id: s,
            contents: {
              event: "challenge-passed",
              response: n,
              expiration: 120
            }
          });
        window.dispatchEvent(new MessageEvent("message", {
          data: c
        }))
      })
    }
    getForm(t) {
      return document.querySelector(`#${t.containerId}`).querySelector("form")
    }
    getCallback(t) {
      return t.callback
    }
  };
  var Ue = "reCaptcha";
  var x = class {
    constructor(t) {
      h(this, "captchaType", Ue);
      this.captchaType = t
    }
    setSolveButton(t, n) {
      let o = n,
        r = this.getBindedElements(t);
      r.textarea && r.textarea.parentElement ? (r.textarea.parentElement.style.height = "auto", r.textarea.parentElement.insertBefore(o, r.textarea.nextSibling)) : r.button.parentElement.insertBefore(o, r.button.nextSibling)
    }
    getParams(t, n) {
      return {
        sitekey: t.sitekey,
        url: location.href,
        version: (t == null ? void 0 : t.version) || "v2",
        score: (n == null ? void 0 : n.recaptchaV3MinScore) || .7,
        action: (t == null ? void 0 : t.action) || "",
        invisible: (t == null ? void 0 : t.version) === "v2_invisible",
        enterprise: !!t.enterprise,
        s: (t == null ? void 0 : t.s) || ""
      }
    }
    onSolved(t, n) {
      u(chrome.i18n.getMessage("solved"), "solved");
      let o = this.getBindedElements(t).textarea;
      o || (o = this.getForm(t).find("textarea[name=g-recaptcha-response]")), o.innerHTML = n, o.value = n
    }
    getForm(t) {
      var o;
      let n = this.getBindedElements(t);
      return n.textarea ? n.textarea.closest("form") : (o = n.button) == null ? void 0 : o.closest("form")
    }
    getCallback(t) {
      return t.callback
    }
    getBindedElements(t) {
      let n = {
        button: null,
        textarea: null
      };
      if (t.bindedButtonId) {
        let o = document.querySelector(`#${t.bindedButtonId}`);
        o && (n.button = o)
      } else {
        let o = document.querySelector(`#${t.containerId} textarea[name=g-recaptcha-response]`);
        o && (n.textarea = o)
      }
      return n
    }
  };
  var Ve = "funCaptcha";
  var ce = 304;

  function ze(e) {
    return e - ce > 0 ? (e - ce) / 2 : 0
  }
  var W = class {
    constructor() {
      h(this, "captchaType", Ve)
    }
    setSolveButton(t, n) {
      let o = document.querySelector("#" + t.containerId),
        r = n;
      r.style.width = o.querySelector("iframe").offsetWidth + "px", r.style.position = "absolute", r.style.left = ze(o.querySelector("iframe").offsetWidth) + "px", r.style.bottom = "20px", o.append(r)
    }
    getParams(t) {
      return {
        websiteURL: location.href,
        websitePublicKey: t.websitePublicKey
      }
    }
    onSolved(t, n) {}
    getCallback(t) {
      return "onSuccess"
    }
  };
  var Qe = "cloudflare";

  function Ge() {
    let t = location.href.split("/");
    return t.slice(t.indexOf("turnstile")).sort((o, r) => r.length - o.length)[0]
  }
  var I = class {
    constructor() {
      h(this, "captchaType", Qe)
    }
    getParams(t, n) {
      return {
        websiteURL: location.href,
        websiteKey: Ge(),
        type: "turnstile"
      }
    }
    setSolveButton(t, n) {
      let o = document.querySelector(`#${t.containerId}`),
        r = n;
      r.style.width = o.querySelector("iframe").offsetWidth + "px", o.append(r)
    }
    onSolved(t, n) {
      u(chrome.i18n.getMessage("solved"), "solved");
      let o = this.getResponseInput(t);
      o.value = n
    }
    getResponseInput(t) {
      let {
        containerId: n
      } = t, o = document.querySelector(`#${n}`);
      return o == null ? void 0 : o.querySelector('input[name="cf-turnstile-response"]')
    }
    getForm(t) {
      return null
    }
    getCallback(t) {
      return t == null ? void 0 : t.callback
    }
  };
  var F = class {
      constructor() {
        h(this, "list", [])
      }
      register(t) {
        this.list[t.captchaType] = t
      }
      get(t) {
        return this.list[t]
      }
    },
    m = new F;

  function le(e) {
    m.register(new D), m.register(new x("reCaptcha")), m.register(new x("reCaptcha3")), m.register(new W), m.register(new I)
  }
  var pe = 0;

  function fe(e) {
    if (e != null && e.response) {
      let {
        action: t
      } = e.response;
      switch (t) {
        case "solver":
          Je(e.response);
          break;
        case "solved":
          u(chrome.i18n.getMessage("solved"), "solved"), ge();
          break
      }
    }
  }

  function Je(e) {
    var t;
    try {
      if ((t = e.request) != null && t.messageId) return Ye(e);
      let n = {
        captchaType: e.request.captchaType,
        widgetId: e.request.widgetId
      };
      e.error ? (d.getAll().then(o => {
        e.error === "Error: Capsover: No API Kye set up yet!" && !(o != null && o.apiKey) && u("Please input your API key!", "error"), o[`${n.captchaType}RepeatTimes`] >= pe ? window.setCaptchaWidgetDataset(n.widgetId, "status", "ready") : window.setCaptchaWidgetDataset(n.widgetId, "status", "error")
      }), pe++) : (window.setCaptchaWidgetDataset(n.widgetId, "status", "success"), Xe(e), ge())
    } catch (n) {
      console.error("handle error\uFF1A", n)
    }
  }

  function Xe(e) {
    let t = window.getCaptchaWidgetDataset(e.request.captchaType, e.request.widgetId),
      n = m.get(e.request.captchaType);
    n.onSolved(t, e.response.code);
    let o = n.getCallback(t);
    if (o) {
      let r = document.createElement("textarea");
      r.id = "capsolver-callback-trigger", r.setAttribute("data-function", o), r.value = e.response.code, document.body.appendChild(r)
    }
  }

  function ge() {
    chrome.runtime.sendMessage({
      action: "callback"
    })
  }

  function Ye(e) {
    let t = document.querySelector("body > solver-ext-messages > solver-ext-message[data-message-id=" + e.request.messageId + "]");
    !t || (e.error ? ue(t[0], {
      error: e.error
    }) : ue(t[0], {
      response: e.response.code
    }))
  }

  function ue(e, t) {
    e.dataset.response = encodeURIComponent(JSON.stringify(t))
  }

  function me(e) {
    if (document.querySelector("#capsolver-solver-tip-button")) return;
    let t = m.get(e.captchaType),
      n = _();
    t.setSolveButton(e, n)
  }

  function Ze(e, t) {
    if (document.querySelector("#capsolver-solver-tip-button")) return;
    let n = m.get(e.captchaType),
      o = _();
    o.onclick = () => {
      t === "token" ? window.onTaskByToken(e) : chrome.runtime.sendMessage({
        action: "execute"
      }), u(chrome.i18n.getMessage("solving"), "solving")
    }, n.setSolveButton(e, o), u(chrome.i18n.getMessage("solveWithCapsolver"), "ready")
  }

  function he() {
    window.getSolverButton = e => {
      let {
        captchaType: t,
        widgetId: n
      } = e, o = `.capsolver-solver[data-captcha-type="${t}"][data-widget-id="${n}"]`;
      return document.querySelector(o)
    }, window.setSolverButtonState = (e, t, n) => {
      let o = window.getSolverButton(e);
      if (!o) return;
      o.setAttribute("data-state", t);
      let r = o.querySelector(".capsolver-solver-info");
      if (r && (r.innerHTML = n), t === "error") {
        let a = parseInt(o.dataset.countErrors || "0") + 1;
        o.dataset.countErrors = String(a)
      }
    }, window.onTaskByToken = e => {
      let {
        captchaType: t,
        widgetId: n
      } = e, o = window.getCaptchaWidgetDataset(t, n);
      d.getAll().then(r => {
        let s = m.get(t).getParams(o, r);
        me(e);
        let c = {
          action: "solver",
          captchaType: t,
          widgetId: n,
          params: s
        };
        window.setCaptchaWidgetDataset(n, "status", "processing"), chrome.runtime.sendMessage(c).then(fe)
      })
    }
  }
  var et = (e, t) => {
    let n = new Map([
      ["funCaptcha", "enabledForFunCaptcha"],
      ["hCaptcha", "enabledForHCaptcha"],
      ["reCaptcha", "enabledForRecaptcha"],
      ["reCaptcha3", "enabledForRecaptchaV3"],
      ["cloudflare", "enabledForCloudflare"]
    ]);
    return !!(e[n.get(t.captchaType)] && t.containerId)
  };

  function ve() {
    return setInterval(async () => {
      let e = await d.getAll(),
        t = document.querySelector("head").getElementsByTagName("capsolver-widget");
      for (let n = 0; n < t.length; n++) {
        let r = t.item(n).dataset;
        if (!(e != null && e.apiKey)) {
          me(r), u("Please input your API key!", "error");
          return
        }
        if (!et(e, r) || r.status !== "ready") return;
        e.manualSolving ? Ze(r, e[`${r.captchaType}Mode`]) : e[`${r.captchaType}Mode`] === "token" && window.onTaskByToken(r)
      }
    }, 2e3)
  }
  var ye = [],
    tt = ["arkoselabs.com/fc", "funcaptcha.com/fc", "hcaptcha.com/captcha", "google.com/recaptcha", "recaptcha.net/recaptcha", "recaptcha.net/recaptcha"],
    nt = chrome.runtime.connect({
      name: "content"
    });
  nt.onDisconnect.addListener(e => {
    for (let t of ye) t && clearInterval(t)
  });
  chrome.runtime.onMessage.addListener(e => {
    var n;
    switch ((n = e == null ? void 0 : e.response) == null ? void 0 : n.action) {
      case "solved":
        u(chrome.i18n.getMessage("solved"), "solved"), chrome.runtime.sendMessage({
          action: "callback"
        });
        break;
      default:
        break
    }
    return !1
  });
  d.getAll().then(function(e) {
    ie(), le(e), he();
    let t = window.location.origin,
      n = window.location.pathname,
      o = t + n,
      r = tt.some(s => o.indexOf(s) !== -1),
      a = e.blackUrlList.includes(o);
    d.set({
      isInBlackList: r ? e.isInBlackList : a,
      isInit: !0
    }).then(() => {
      (!e.enabledForBlacklistControl || !a) && e.useCapsolver && ye.push(ve())
    })
  });
  var be = (0, Ce.bexContent)(e => {
    se(e)
  });
  var A = chrome.runtime.connect({
      name: "contentScript"
    }),
    we = !1;
  A.onDisconnect.addListener(() => {
    we = !0
  });
  var xe = new y({
    listen(e) {
      A.onMessage.addListener(e)
    },
    send(e) {
      we || (A.postMessage(e), window.postMessage({
        ...e,
        from: "bex-content-script"
      }, "*"))
    }
  });

  function ot(e) {
    let t = document.createElement("script");
    t.src = e, t.onload = function() {
      this.remove()
    }, (document.head || document.documentElement).appendChild(t)
  }
  document instanceof HTMLDocument && ot(chrome.runtime.getURL("dom.js"));
  ne(xe, "bex-dom");
  be(xe);
})();