"use strict";
(() => {
  var me = Object.create;
  var N = Object.defineProperty;
  var he = Object.getOwnPropertyDescriptor;
  var ge = Object.getOwnPropertyNames;
  var ve = Object.getPrototypeOf,
    Ce = Object.prototype.hasOwnProperty;
  var O = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports);
  var be = (e, t, n, r) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let o of ge(t)) !Ce.call(e, o) && o !== n && N(e, o, {
        get: () => t[o],
        enumerable: !(r = he(t, o)) || r.enumerable
      });
    return e
  };
  var j = (e, t, n) => (n = e != null ? me(ve(e)) : {}, be(t || !e || !e.__esModule ? N(n, "default", {
    value: e,
    enumerable: !0
  }) : n, e));
  var Q = O(($e, I) => {
    "use strict";
    var m = typeof Reflect == "object" ? Reflect : null,
      P = m && typeof m.apply == "function" ? m.apply : function(t, n, r) {
        return Function.prototype.apply.call(t, n, r)
      },
      x;
    m && typeof m.ownKeys == "function" ? x = m.ownKeys : Object.getOwnPropertySymbols ? x = function(t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
    } : x = function(t) {
      return Object.getOwnPropertyNames(t)
    };

    function ye(e) {
      console && console.warn && console.warn(e)
    }
    var H = Number.isNaN || function(t) {
      return t !== t
    };

    function i() {
      i.init.call(this)
    }
    I.exports = i;
    I.exports.once = Le;
    i.EventEmitter = i;
    i.prototype._events = void 0;
    i.prototype._eventsCount = 0;
    i.prototype._maxListeners = void 0;
    var B = 10;

    function T(e) {
      if (typeof e != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
    }
    Object.defineProperty(i, "defaultMaxListeners", {
      enumerable: !0,
      get: function() {
        return B
      },
      set: function(e) {
        if (typeof e != "number" || e < 0 || H(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
        B = e
      }
    });
    i.init = function() {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    };
    i.prototype.setMaxListeners = function(t) {
      if (typeof t != "number" || t < 0 || H(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this
    };

    function K(e) {
      return e._maxListeners === void 0 ? i.defaultMaxListeners : e._maxListeners
    }
    i.prototype.getMaxListeners = function() {
      return K(this)
    };
    i.prototype.emit = function(t) {
      for (var n = [], r = 1; r < arguments.length; r++) n.push(arguments[r]);
      var o = t === "error",
        s = this._events;
      if (s !== void 0) o = o && s.error === void 0;
      else if (!o) return !1;
      if (o) {
        var a;
        if (n.length > 0 && (a = n[0]), a instanceof Error) throw a;
        var l = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
        throw l.context = a, l
      }
      var p = s[t];
      if (p === void 0) return !1;
      if (typeof p == "function") P(p, this, n);
      else
        for (var f = p.length, d = z(p, f), r = 0; r < f; ++r) P(d[r], this, n);
      return !0
    };

    function U(e, t, n, r) {
      var o, s, a;
      if (T(n), s = e._events, s === void 0 ? (s = e._events = Object.create(null), e._eventsCount = 0) : (s.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), s = e._events), a = s[t]), a === void 0) a = s[t] = n, ++e._eventsCount;
      else if (typeof a == "function" ? a = s[t] = r ? [n, a] : [a, n] : r ? a.unshift(n) : a.push(n), o = K(e), o > 0 && a.length > o && !a.warned) {
        a.warned = !0;
        var l = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = t, l.count = a.length, ye(l)
      }
      return e
    }
    i.prototype.addListener = function(t, n) {
      return U(this, t, n, !1)
    };
    i.prototype.on = i.prototype.addListener;
    i.prototype.prependListener = function(t, n) {
      return U(this, t, n, !0)
    };

    function xe() {
      if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }

    function V(e, t, n) {
      var r = {
          fired: !1,
          wrapFn: void 0,
          target: e,
          type: t,
          listener: n
        },
        o = xe.bind(r);
      return o.listener = n, r.wrapFn = o, o
    }
    i.prototype.once = function(t, n) {
      return T(n), this.on(t, V(this, t, n)), this
    };
    i.prototype.prependOnceListener = function(t, n) {
      return T(n), this.prependListener(t, V(this, t, n)), this
    };
    i.prototype.removeListener = function(t, n) {
      var r, o, s, a, l;
      if (T(n), o = this._events, o === void 0) return this;
      if (r = o[t], r === void 0) return this;
      if (r === n || r.listener === n) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete o[t], o.removeListener && this.emit("removeListener", t, r.listener || n));
      else if (typeof r != "function") {
        for (s = -1, a = r.length - 1; a >= 0; a--)
          if (r[a] === n || r[a].listener === n) {
            l = r[a].listener, s = a;
            break
          } if (s < 0) return this;
        s === 0 ? r.shift() : Te(r, s), r.length === 1 && (o[t] = r[0]), o.removeListener !== void 0 && this.emit("removeListener", t, l || n)
      }
      return this
    };
    i.prototype.off = i.prototype.removeListener;
    i.prototype.removeAllListeners = function(t) {
      var n, r, o;
      if (r = this._events, r === void 0) return this;
      if (r.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete r[t]), this;
      if (arguments.length === 0) {
        var s = Object.keys(r),
          a;
        for (o = 0; o < s.length; ++o) a = s[o], a !== "removeListener" && this.removeAllListeners(a);
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
      }
      if (n = r[t], typeof n == "function") this.removeListener(t, n);
      else if (n !== void 0)
        for (o = n.length - 1; o >= 0; o--) this.removeListener(t, n[o]);
      return this
    };

    function W(e, t, n) {
      var r = e._events;
      if (r === void 0) return [];
      var o = r[t];
      return o === void 0 ? [] : typeof o == "function" ? n ? [o.listener || o] : [o] : n ? we(o) : z(o, o.length)
    }
    i.prototype.listeners = function(t) {
      return W(this, t, !0)
    };
    i.prototype.rawListeners = function(t) {
      return W(this, t, !1)
    };
    i.listenerCount = function(e, t) {
      return typeof e.listenerCount == "function" ? e.listenerCount(t) : q.call(e, t)
    };
    i.prototype.listenerCount = q;

    function q(e) {
      var t = this._events;
      if (t !== void 0) {
        var n = t[e];
        if (typeof n == "function") return 1;
        if (n !== void 0) return n.length
      }
      return 0
    }
    i.prototype.eventNames = function() {
      return this._eventsCount > 0 ? x(this._events) : []
    };

    function z(e, t) {
      for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
      return n
    }

    function Te(e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop()
    }

    function we(e) {
      for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
      return t
    }

    function Le(e, t) {
      return new Promise(function(n, r) {
        function o(a) {
          e.removeListener(t, s), r(a)
        }

        function s() {
          typeof e.removeListener == "function" && e.removeListener("error", o), n([].slice.call(arguments))
        }
        G(e, t, s, {
          once: !0
        }), t !== "error" && Ee(e, o, {
          once: !0
        })
      })
    }

    function Ee(e, t, n) {
      typeof e.on == "function" && G(e, "error", t, n)
    }

    function G(e, t, n, r) {
      if (typeof e.on == "function") r.once ? e.once(t, n) : e.on(t, n);
      else if (typeof e.addEventListener == "function") e.addEventListener(t, function o(s) {
        r.once && e.removeEventListener(t, o), n(s)
      });
      else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
    }
  });
  var J = O((et, u) => {
    u.exports.boot = function(e) {
      return e
    };
    u.exports.ssrMiddleware = function(e) {
      return e
    };
    u.exports.configure = function(e) {
      return e
    };
    u.exports.preFetch = function(e) {
      return e
    };
    u.exports.route = function(e) {
      return e
    };
    u.exports.store = function(e) {
      return e
    };
    u.exports.bexBackground = function(e) {
      return e
    };
    u.exports.bexContent = function(e) {
      return e
    };
    u.exports.bexDom = function(e) {
      return e
    };
    u.exports.ssrProductionExport = function(e) {
      return e
    };
    u.exports.ssrCreate = function(e) {
      return e
    };
    u.exports.ssrListen = function(e) {
      return e
    };
    u.exports.ssrClose = function(e) {
      return e
    };
    u.exports.ssrServeStaticContent = function(e) {
      return e
    };
    u.exports.ssrRenderPreloadTag = function(e) {
      return e
    }
  });
  var Y = j(Q());
  var R, w = 0,
    c = new Array(256);
  for (let e = 0; e < 256; e++) c[e] = (e + 256).toString(16).substring(1);
  var Me = (() => {
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
        for (let r = t; r > 0; r--) n.push(Math.floor(Math.random() * 256));
        return n
      }
    })(),
    $ = 4096;

  function X() {
    (R === void 0 || w + 16 > $) && (w = 0, R = Me($));
    let e = Array.prototype.slice.call(R, w, w += 16);
    return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, c[e[0]] + c[e[1]] + c[e[2]] + c[e[3]] + "-" + c[e[4]] + c[e[5]] + "-" + c[e[6]] + c[e[7]] + "-" + c[e[8]] + c[e[9]] + "-" + c[e[10]] + c[e[11]] + c[e[12]] + c[e[13]] + c[e[14]] + c[e[15]]
  }
  var ke = {
      undefined: () => 0,
      boolean: () => 4,
      number: () => 8,
      string: e => 2 * e.length,
      object: e => e ? Object.keys(e).reduce((t, n) => _(n) + _(e[n]) + t, 0) : 0
    },
    _ = e => ke[typeof e](e),
    g = class extends Y.EventEmitter {
      constructor(t) {
        super(), this.setMaxListeners(1 / 0), this.wall = t, t.listen(n => {
          Array.isArray(n) ? n.forEach(r => this._emit(r)) : this._emit(n)
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
        return super.on(t, r => {
          n({
            ...r,
            respond: o => this.send(r.eventResponseKey, o)
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
          r = `${n.event}.${X()}`,
          o = r + ".result";
        return new Promise((s, a) => {
          let l = [],
            p = f => {
              if (f !== void 0 && f._chunkSplit) {
                let d = f._chunkSplit;
                l = [...l, ...f.data], d.lastChunk && (this.off(o, p), s(l))
              } else this.off(o, p), s(f)
            };
          this.on(o, p);
          try {
            let f = t.map(d => ({
              ...d,
              payload: {
                data: d.payload,
                eventResponseKey: o
              }
            }));
            this.wall.send(f)
          } catch (f) {
            let d = "Message length exceeded maximum allowed length.";
            if (f.message === d && Array.isArray(n.payload)) {
              let A = _(n);
              if (A > this._maxMessageSize) {
                let y = Math.ceil(A / this._maxMessageSize),
                  pe = Math.ceil(n.payload.length / y),
                  F = n.payload;
                for (let k = 0; k < y; k++) {
                  let de = Math.min(F.length, pe);
                  this.wall.send([{
                    event: n.event,
                    payload: {
                      _chunkSplit: {
                        count: y,
                        lastChunk: k === y - 1
                      },
                      data: F.splice(0, de)
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
  var Z = (e, t) => {
    window.addEventListener("message", n => {
      if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
        let r = n.data[0],
          o = e.getEvents();
        for (let s in o) s === r.event && o[s](r.payload)
      }
    }, !1)
  };
  var ce = j(J());
  var Ie = chrome.runtime.getURL("assets/config.json");
  async function Re() {
    let e = await chrome.storage.local.get("defaultConfig");
    if (e.defaultConfig) return e.defaultConfig;
    let t = {},
      r = await (await fetch(Ie)).json();
    return r && (t = r, chrome.storage.local.set({
      defaultConfig: t
    })), t
  }
  var v = {
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
    ee = {
      proxyType: ["socks5", "http", "https", "socks4"],
      mode: ["click", "token"]
    };
  async function te() {
    let e = await Re(),
      t = Object.keys(e);
    for (let n of t)
      if (!(n === "proxyType" && !ee[n].includes(e[n]))) {
        {
          if (n.endsWith("Mode") && !ee.mode.includes(e[n])) continue;
          if (n === "port") {
            if (typeof e[n] != "number") continue;
            v[n] = e[n]
          }
        }
        Reflect.has(v, n) && typeof v[n] == typeof e[n] && (v[n] = e[n])
      } return v
  }
  var _e = te(),
    C = {
      default: _e,
      async get(e) {
        return (await this.getAll())[e]
      },
      async getAll() {
        let e = await te(),
          t = await chrome.storage.local.get("config");
        return C.joinConfig(e, t.config)
      },
      async set(e) {
        let t = await C.getAll(),
          n = C.joinConfig(t, e);
        return chrome.storage.local.set({
          config: n
        })
      },
      joinConfig(e, t) {
        let n = {};
        if (e)
          for (let r in e) n[r] = e[r];
        if (t)
          for (let r in t) n[r] = t[r];
        return n
      }
    };

  function ne(e) {
    return new Promise((t, n) => {
      let r = new Image;
      r.src = e, r.setAttribute("crossOrigin", "anonymous"), r.onload = () => {
        let o = document.createElement("canvas");
        o.width = r.width, o.height = r.height, o.getContext("2d").drawImage(r, 0, 0, r.width, r.height);
        let a = o.toDataURL();
        t(a)
      }, r.onerror = o => {
        n(o)
      }
    })
  }

  function re(e) {
    return new Promise(t => setTimeout(t, e))
  }

  function h(e, t) {
    var n;
    return "KeyboardEvent" in window ? n = new window.KeyboardEvent(t, {
      bubbles: !0,
      cancelable: !1
    }) : (n = e.ownerDocument.createEvent("Events"), n.initEvent(t, !0, !1), n.charCode = 0, n.keyCode = 0, n.which = 0, n.srcElement = e, n.target = e), n
  }

  function Se(e) {
    return !e || e && typeof e.click != "function" ? !1 : (e.click(), !0)
  }

  function De(e, t) {
    if (t) {
      var n = e.value;
      e.focus(), e.value !== n && (e.value = n)
    } else e.focus()
  }

  function Ae(e) {
    var t = e.value;
    Se(e), De(e, !1), e.dispatchEvent(h(e, "keydown")), e.dispatchEvent(h(e, "keypress")), e.dispatchEvent(h(e, "keyup")), e.value !== t && (e.value = t)
  }

  function Fe(e) {
    var t = e.value,
      n = e.ownerDocument.createEvent("HTMLEvents"),
      r = e.ownerDocument.createEvent("HTMLEvents");
    e.dispatchEvent(h(e, "keydown")), e.dispatchEvent(h(e, "keypress")), e.dispatchEvent(h(e, "keyup")), r.initEvent("input", !0, !0), e.dispatchEvent(r), n.initEvent("change", !0, !0), e.dispatchEvent(n), e.blur(), e.value !== t && (e.value = t)
  }
  async function S(e, t) {
    e.value = t, Ae(e), Fe(e)
  }
  var L = "capsolver-image-to-text-source",
    b = "capsolver-image-to-text-result",
    E = [],
    oe = 0;

  function se(e) {
    let t = "",
      n = "",
      r = [];
    e.style.backgroundImage ? n = e.style.backgroundImage : e.style.background && (n = e.style.background), r = n.split(",");
    let o = r.find(s => s.startsWith("url("));
    return o ? (t = o.slice(5, o.length - 2), t.startsWith("blob:") ? t.slice(5) : t) : ""
  }

  function Ne() {
    let e = "[" + L + "]",
      t = document.querySelectorAll(e),
      n = [];
    return Array.from(t).forEach(r => {
      let o = r.tagName,
        s = "";
      o === "IMG" ? s = r.getAttribute("src") : s = se(r), s && n.push(r)
    }), n
  }

  function Oe() {
    let e = "input[" + b + "]";
    return Array.from(document.querySelectorAll(e))
  }

  function je(e) {
    let t = e.naturalWidth,
      n = e.naturalHeight,
      r = document.createElement("canvas");
    return Object.assign(r, {
      width: t,
      height: n
    }), r.getContext("2d").drawImage(e, 0, 0, t, n, 0, 0, t, n), r.toDataURL("image/jpeg")
  }
  async function Pe(e) {
    if (e.tagName === "IMG") return je(e);
    {
      let n = se(e);
      return await ne(n)
    }
  }

  function Be(e, t) {
    let n = [];
    return t.forEach(r => {
      let o = r.getAttribute(b),
        s = e.find(a => a.getAttribute(L) === o);
      s && n.push({
        image: s,
        result: r,
        id: o
      })
    }), n
  }
  async function He(e, t) {
    let n = await Pe(e.image),
      r = {
        body: n.slice(n.indexOf(";base64,") + 8),
        id: e.id
      },
      o = {
        action: "solver",
        captchaType: "textCaptcha",
        params: r
      };
    chrome.runtime.sendMessage(o).then(s => {
      var a;
      if (!(s != null && s.response) || ((a = s == null ? void 0 : s.response) == null ? void 0 : a.error)) {
        oe++, oe <= t && E.splice(E.indexOf(e.id), 1);
        return
      }
      qe(s.response)
    })
  }
  var Ke = [{
      value: "mul",
      label: "\xD7"
    }, {
      value: "add",
      label: "+"
    }, {
      value: "subtract",
      label: "-"
    }],
    Ue = new Map([
      ["add", "+"],
      ["subtract", "-"],
      ["mul", "\xD7"]
    ]);

  function Ve(e, t) {
    let r = e.slice(0, e.length - 1).split(Ue.get(t));
    if (isNaN(Number(r[0])) || isNaN(Number(r[1]))) return NaN;
    let o;
    switch (t) {
      case "add": {
        o = Number(r[0]) + Number(r[1]);
        break
      }
      case "subtract": {
        o = Number(r[0]) - Number(r[1]);
        break
      }
      case "mul": {
        o = Number(r[0]) * Number(r[1]);
        break
      }
    }
    return o
  }

  function We(e) {
    return e[e.length - 1] !== "=" ? !1 : Ke.find(n => e.indexOf(n.label) !== -1).value
  }

  function qe(e) {
    var s;
    let t = (s = e.response) == null ? void 0 : s.solution,
      n = e.id,
      r = document.querySelector(`input[${b}="${n}"]`);
    if (!r) return;
    let o = We(t.text);
    if (!o) S(r, t.text);
    else {
      let a = Ve(t.text, o);
      S(r, isNaN(a) ? t.text : a)
    }
    chrome.runtime.sendMessage({
      action: "solved"
    })
  }

  function ae(e) {
    L = e.textCaptchaSourceAttribute || L, b = e.textCaptchaResultAttribute || b;
    let t = Ne();
    if (t.length <= 0) return !1;
    let n = Oe();
    if (n.length <= 0) return !1;
    let r = Be(t, n);
    return r.length <= 0 ? !1 : r
  }

  function ie(e, t) {
    let n = e.length;
    for (let r = 0; r < n; r++) E.includes(e[r].id) || (He(e[r], t), E.push(e[r].id))
  }
  async function ze(e) {
    !e.useCapsolver || !e.enabledForImageToText || !e.apiKey || e.enabledForBlacklistControl && e.isInBlackList || (await re(e.textCaptchaDelayTime), setInterval(async () => {
      let t = ae(e);
      !t || ie(t, e.textCaptchaRepeatTimes)
    }, 1e3))
  }
  var M = null;
  M && window.clearInterval(M);
  M = window.setInterval(async () => {
    let e = await C.getAll();
    !e.isInit || (ze(e), window.clearInterval(M))
  }, 100);
  var ue = (0, ce.bexContent)(e => {});
  var D = chrome.runtime.connect({
      name: "contentScript"
    }),
    le = !1;
  D.onDisconnect.addListener(() => {
    le = !0
  });
  var fe = new g({
    listen(e) {
      D.onMessage.addListener(e)
    },
    send(e) {
      le || (D.postMessage(e), window.postMessage({
        ...e,
        from: "bex-content-script"
      }, "*"))
    }
  });

  function Ge(e) {
    let t = document.createElement("script");
    t.src = e, t.onload = function() {
      this.remove()
    }, (document.head || document.documentElement).appendChild(t)
  }
  document instanceof HTMLDocument && Ge(chrome.runtime.getURL("dom.js"));
  Z(fe, "bex-dom");
  ue(fe);
})();