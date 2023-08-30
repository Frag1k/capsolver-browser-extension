"use strict";
(() => {
  var ke = Object.create;
  var Y = Object.defineProperty;
  var _e = Object.getOwnPropertyDescriptor;
  var Ae = Object.getOwnPropertyNames;
  var Pe = Object.getPrototypeOf,
    Oe = Object.prototype.hasOwnProperty;
  var G = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports);
  var Ie = (e, t, n, o) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let r of Ae(t)) !Oe.call(e, r) && r !== n && Y(e, r, {
        get: () => t[r],
        enumerable: !(o = _e(t, r)) || o.enumerable
      });
    return e
  };
  var J = (e, t, n) => (n = e != null ? ke(Pe(e)) : {}, Ie(t || !e || !e.__esModule ? Y(n, "default", {
    value: e,
    enumerable: !0
  }) : n, e));
  var ce = G((ft, D) => {
    "use strict";
    var v = typeof Reflect == "object" ? Reflect : null,
      $ = v && typeof v.apply == "function" ? v.apply : function(t, n, o) {
        return Function.prototype.apply.call(t, n, o)
      },
      R;
    v && typeof v.ownKeys == "function" ? R = v.ownKeys : Object.getOwnPropertySymbols ? R = function(t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
    } : R = function(t) {
      return Object.getOwnPropertyNames(t)
    };

    function De(e) {
      console && console.warn && console.warn(e)
    }
    var ee = Number.isNaN || function(t) {
      return t !== t
    };

    function a() {
      a.init.call(this)
    }
    D.exports = a;
    D.exports.once = He;
    a.EventEmitter = a;
    a.prototype._events = void 0;
    a.prototype._eventsCount = 0;
    a.prototype._maxListeners = void 0;
    var Z = 10;

    function S(e) {
      if (typeof e != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
    }
    Object.defineProperty(a, "defaultMaxListeners", {
      enumerable: !0,
      get: function() {
        return Z
      },
      set: function(e) {
        if (typeof e != "number" || e < 0 || ee(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
        Z = e
      }
    });
    a.init = function() {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    };
    a.prototype.setMaxListeners = function(t) {
      if (typeof t != "number" || t < 0 || ee(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this
    };

    function te(e) {
      return e._maxListeners === void 0 ? a.defaultMaxListeners : e._maxListeners
    }
    a.prototype.getMaxListeners = function() {
      return te(this)
    };
    a.prototype.emit = function(t) {
      for (var n = [], o = 1; o < arguments.length; o++) n.push(arguments[o]);
      var r = t === "error",
        i = this._events;
      if (i !== void 0) r = r && i.error === void 0;
      else if (!r) return !1;
      if (r) {
        var s;
        if (n.length > 0 && (s = n[0]), s instanceof Error) throw s;
        var c = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
        throw c.context = s, c
      }
      var f = i[t];
      if (f === void 0) return !1;
      if (typeof f == "function") $(f, this, n);
      else
        for (var l = f.length, p = se(f, l), o = 0; o < l; ++o) $(p[o], this, n);
      return !0
    };

    function ne(e, t, n, o) {
      var r, i, s;
      if (S(n), i = e._events, i === void 0 ? (i = e._events = Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), i = e._events), s = i[t]), s === void 0) s = i[t] = n, ++e._eventsCount;
      else if (typeof s == "function" ? s = i[t] = o ? [n, s] : [s, n] : o ? s.unshift(n) : s.push(n), r = te(e), r > 0 && s.length > r && !s.warned) {
        s.warned = !0;
        var c = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = s.length, De(c)
      }
      return e
    }
    a.prototype.addListener = function(t, n) {
      return ne(this, t, n, !1)
    };
    a.prototype.on = a.prototype.addListener;
    a.prototype.prependListener = function(t, n) {
      return ne(this, t, n, !0)
    };

    function Fe() {
      if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }

    function oe(e, t, n) {
      var o = {
          fired: !1,
          wrapFn: void 0,
          target: e,
          type: t,
          listener: n
        },
        r = Fe.bind(o);
      return r.listener = n, o.wrapFn = r, r
    }
    a.prototype.once = function(t, n) {
      return S(n), this.on(t, oe(this, t, n)), this
    };
    a.prototype.prependOnceListener = function(t, n) {
      return S(n), this.prependListener(t, oe(this, t, n)), this
    };
    a.prototype.removeListener = function(t, n) {
      var o, r, i, s, c;
      if (S(n), r = this._events, r === void 0) return this;
      if (o = r[t], o === void 0) return this;
      if (o === n || o.listener === n) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete r[t], r.removeListener && this.emit("removeListener", t, o.listener || n));
      else if (typeof o != "function") {
        for (i = -1, s = o.length - 1; s >= 0; s--)
          if (o[s] === n || o[s].listener === n) {
            c = o[s].listener, i = s;
            break
          } if (i < 0) return this;
        i === 0 ? o.shift() : je(o, i), o.length === 1 && (r[t] = o[0]), r.removeListener !== void 0 && this.emit("removeListener", t, c || n)
      }
      return this
    };
    a.prototype.off = a.prototype.removeListener;
    a.prototype.removeAllListeners = function(t) {
      var n, o, r;
      if (o = this._events, o === void 0) return this;
      if (o.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : o[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete o[t]), this;
      if (arguments.length === 0) {
        var i = Object.keys(o),
          s;
        for (r = 0; r < i.length; ++r) s = i[r], s !== "removeListener" && this.removeAllListeners(s);
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
      }
      if (n = o[t], typeof n == "function") this.removeListener(t, n);
      else if (n !== void 0)
        for (r = n.length - 1; r >= 0; r--) this.removeListener(t, n[r]);
      return this
    };

    function re(e, t, n) {
      var o = e._events;
      if (o === void 0) return [];
      var r = o[t];
      return r === void 0 ? [] : typeof r == "function" ? n ? [r.listener || r] : [r] : n ? Be(r) : se(r, r.length)
    }
    a.prototype.listeners = function(t) {
      return re(this, t, !0)
    };
    a.prototype.rawListeners = function(t) {
      return re(this, t, !1)
    };
    a.listenerCount = function(e, t) {
      return typeof e.listenerCount == "function" ? e.listenerCount(t) : ie.call(e, t)
    };
    a.prototype.listenerCount = ie;

    function ie(e) {
      var t = this._events;
      if (t !== void 0) {
        var n = t[e];
        if (typeof n == "function") return 1;
        if (n !== void 0) return n.length
      }
      return 0
    }
    a.prototype.eventNames = function() {
      return this._eventsCount > 0 ? R(this._events) : []
    };

    function se(e, t) {
      for (var n = new Array(t), o = 0; o < t; ++o) n[o] = e[o];
      return n
    }

    function je(e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop()
    }

    function Be(e) {
      for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
      return t
    }

    function He(e, t) {
      return new Promise(function(n, o) {
        function r(s) {
          e.removeListener(t, i), o(s)
        }

        function i() {
          typeof e.removeListener == "function" && e.removeListener("error", r), n([].slice.call(arguments))
        }
        ae(e, t, i, {
          once: !0
        }), t !== "error" && qe(e, r, {
          once: !0
        })
      })
    }

    function qe(e, t, n) {
      typeof e.on == "function" && ae(e, "error", t, n)
    }

    function ae(e, t, n, o) {
      if (typeof e.on == "function") o.once ? e.once(t, n) : e.on(t, n);
      else if (typeof e.addEventListener == "function") e.addEventListener(t, function r(i) {
        o.once && e.removeEventListener(t, r), n(i)
      });
      else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
    }
  });
  var de = G((gt, m) => {
    m.exports.boot = function(e) {
      return e
    };
    m.exports.ssrMiddleware = function(e) {
      return e
    };
    m.exports.configure = function(e) {
      return e
    };
    m.exports.preFetch = function(e) {
      return e
    };
    m.exports.route = function(e) {
      return e
    };
    m.exports.store = function(e) {
      return e
    };
    m.exports.bexBackground = function(e) {
      return e
    };
    m.exports.bexContent = function(e) {
      return e
    };
    m.exports.bexDom = function(e) {
      return e
    };
    m.exports.ssrProductionExport = function(e) {
      return e
    };
    m.exports.ssrCreate = function(e) {
      return e
    };
    m.exports.ssrListen = function(e) {
      return e
    };
    m.exports.ssrClose = function(e) {
      return e
    };
    m.exports.ssrServeStaticContent = function(e) {
      return e
    };
    m.exports.ssrRenderPreloadTag = function(e) {
      return e
    }
  });
  var fe = J(ce());
  var F, k = 0,
    d = new Array(256);
  for (let e = 0; e < 256; e++) d[e] = (e + 256).toString(16).substring(1);
  var Ne = (() => {
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
    le = 4096;

  function ue() {
    (F === void 0 || k + 16 > le) && (k = 0, F = Ne(le));
    let e = Array.prototype.slice.call(F, k, k += 16);
    return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, d[e[0]] + d[e[1]] + d[e[2]] + d[e[3]] + "-" + d[e[4]] + d[e[5]] + "-" + d[e[6]] + d[e[7]] + "-" + d[e[8]] + d[e[9]] + "-" + d[e[10]] + d[e[11]] + d[e[12]] + d[e[13]] + d[e[14]] + d[e[15]]
  }
  var Ke = {
      undefined: () => 0,
      boolean: () => 4,
      number: () => 8,
      string: e => 2 * e.length,
      object: e => e ? Object.keys(e).reduce((t, n) => j(n) + j(e[n]) + t, 0) : 0
    },
    j = e => Ke[typeof e](e),
    w = class extends fe.EventEmitter {
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
          o = `${n.event}.${ue()}`,
          r = o + ".result";
        return new Promise((i, s) => {
          let c = [],
            f = l => {
              if (l !== void 0 && l._chunkSplit) {
                let p = l._chunkSplit;
                c = [...c, ...l.data], p.lastChunk && (this.off(r, f), i(c))
              } else this.off(r, f), i(l)
            };
          this.on(r, f);
          try {
            let l = t.map(p => ({
              ...p,
              payload: {
                data: p.payload,
                eventResponseKey: r
              }
            }));
            this.wall.send(l)
          } catch (l) {
            let p = "Message length exceeded maximum allowed length.";
            if (l.message === p && Array.isArray(n.payload)) {
              let h = j(n);
              if (h > this._maxMessageSize) {
                let g = Math.ceil(h / this._maxMessageSize),
                  x = Math.ceil(n.payload.length / g),
                  E = n.payload;
                for (let I = 0; I < g; I++) {
                  let Se = Math.min(E.length, x);
                  this.wall.send([{
                    event: n.event,
                    payload: {
                      _chunkSplit: {
                        count: g,
                        lastChunk: I === g - 1
                      },
                      data: E.splice(0, Se)
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
  var pe = (e, t) => {
    window.addEventListener("message", n => {
      if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
        let o = n.data[0],
          r = e.getEvents();
        for (let i in r) i === o.event && r[i](o.payload)
      }
    }, !1)
  };
  var Me = J(de());
  var Ue = chrome.runtime.getURL("assets/config.json");
  async function Qe() {
    let e = await chrome.storage.local.get("defaultConfig");
    if (e.defaultConfig) return e.defaultConfig;
    let t = {},
      o = await (await fetch(Ue)).json();
    return o && (t = o, chrome.storage.local.set({
      defaultConfig: t
    })), t
  }
  var M = {
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
    me = {
      proxyType: ["socks5", "http", "https", "socks4"],
      mode: ["click", "token"]
    };
  async function he() {
    let e = await Qe(),
      t = Object.keys(e);
    for (let n of t)
      if (!(n === "proxyType" && !me[n].includes(e[n]))) {
        {
          if (n.endsWith("Mode") && !me.mode.includes(e[n])) continue;
          if (n === "port") {
            if (typeof e[n] != "number") continue;
            M[n] = e[n]
          }
        }
        Reflect.has(M, n) && typeof M[n] == typeof e[n] && (M[n] = e[n])
      } return M
  }
  var Ve = he(),
    L = {
      default: Ve,
      async get(e) {
        return (await this.getAll())[e]
      },
      async getAll() {
        let e = await he(),
          t = await chrome.storage.local.get("config");
        return L.joinConfig(e, t.config)
      },
      async set(e) {
        let t = await L.getAll(),
          n = L.joinConfig(t, e);
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

  function ge(e) {
    return new Promise((t, n) => {
      let o = new Image;
      o.src = e, o.setAttribute("crossOrigin", "anonymous"), o.onload = () => {
        let r = document.createElement("canvas");
        r.width = o.width, r.height = o.height, r.getContext("2d").drawImage(o, 0, 0, o.width, o.height);
        let s = r.toDataURL();
        t(s)
      }, o.onerror = r => {
        n(r)
      }
    })
  }

  function y(e) {
    return new Promise(t => setTimeout(t, e))
  }

  function u(e, t) {
    let n = t - e + 1;
    return Math.floor(Math.random() * n + e)
  }

  function B(e) {
    let t = e.getBoundingClientRect();
    return {
      x: t.top + window.scrollY - document.documentElement.clientTop + u(-5, 5),
      y: t.left + window.scrollX - document.documentElement.clientLeft + u(-5, 5)
    }
  }

  function We(e, t, n, o, r) {
    let [i, s] = t, [c, f] = r, [l, p] = n, [h, g] = o, x = i * (1 - e) * (1 - e) * (1 - e) + 3 * l * e * (1 - e) * (1 - e) + 3 * h * e * e * (1 - e) + c * e * e * e, E = s * (1 - e) * (1 - e) * (1 - e) + 3 * p * e * (1 - e) * (1 - e) + 3 * g * e * e * (1 - e) + f * e * e * e;
    return [x, E]
  }

  function ze(e, t, n = 30) {
    let o = [],
      r = 0,
      i = 1;
    for (let h = 0; h < n; ++h) o.push(r), h < n * 1 / 10 ? i += u(60, 100) : h >= n * 9 / 10 && (i -= u(60, 100), i = Math.max(20, i)), r += i;
    let s = [],
      c = [e.x, e.y],
      f = [(e.x + t.x) / 2 + u(30, 100) * 1, (e.y + t.y) / 2 + u(30, 100) * 1],
      l = [(e.x + t.x) / 2 + u(30, 100) * 1, (e.y + t.y) / 2 + u(30, 100) * 1],
      p = [t.x, t.y];
    for (let h of o) {
      let [g, x] = We(h / r, c, f, l, p);
      s.push({
        x: g,
        y: x
      })
    }
    return s
  }

  function Xe(e, t) {
    let n = ze(e, t, u(15, 30));
    for (let o = 0; o < n.length; o++) document.body.dispatchEvent(new MouseEvent("mousemove", {
      bubbles: !0,
      clientX: n[o].x,
      clientY: n[o].y
    }))
  }

  function Ye({
    x: e,
    y: t
  }) {
    document.body.dispatchEvent(new MouseEvent("mousedown", {
      bubbles: !0,
      clientX: e,
      clientY: t
    }))
  }

  function Ge({
    x: e,
    y: t
  }) {
    document.body.dispatchEvent(new MouseEvent("mouseup", {
      bubbles: !0,
      clientX: e,
      clientY: t
    }))
  }
  async function Je(e, t) {
    Xe(e, t), await y(u(30, 80)), Ye(t), await y(u(30, 80)), Ge(t)
  }
  async function $e(e) {
    for (let t = 0; t < e.length - 1; t++) await Je(e[t], e[t + 1])
  }

  function Ze(e, t, n) {
    let r = [n ? B(n) : {
      x: t ? u(420, 530) : u(10, 100),
      y: t ? u(200, 300) : u(5, 200)
    }];
    for (let i = 0; i < e.length; i++) {
      let s = B(e[i]);
      r.push(s)
    }
    return r
  }
  async function _(e, t = null) {
    let n = Ze(e, !1, t);
    await $e(n)
  }
  var H = "",
    A = [],
    q = -1,
    K = 0,
    T = 0,
    C = [],
    b = null,
    N = !1;

  function et() {
    return document.querySelector(".rc-imageselect-error-select-more").style.display !== "none"
  }

  function tt() {
    return document.querySelector(".rc-imageselect-error-dynamic-more").style.display !== "none"
  }
  async function ye() {
    let e = Array.from(document.querySelectorAll(".rc-imageselect-tile")),
      t = u(0, e.length);
    e[t].click(), await _([e[t]], b), b = e[t], be()
  }

  function nt() {
    var t;
    let e = ((t = document.querySelector("#recaptcha-anchor")) == null ? void 0 : t.getAttribute("aria-checked")) === "true";
    return e && (T = 0, !N && chrome.runtime.sendMessage({
      action: "solved"
    }), N = !0), e
  }

  function Ce() {
    let e = document.querySelector(".rc-imageselect-incorrect-response");
    return (e == null ? void 0 : e.style.display) === ""
  }

  function ot() {
    var e;
    (e = document.querySelector("#recaptcha-anchor")) == null || e.click()
  }

  function rt() {
    return C.length > 0 ? C[0] : !1
  }
  async function ve(e) {
    let t = await ge(e.image),
      n = {
        image: t.slice(t.indexOf(";base64,") + 8),
        question: e.question
      };
    e.index && (n.index = e.index), chrome.runtime.sendMessage({
      action: "solver",
      captchaType: "reCaptcha",
      params: n
    }).then(o => {
      var r;
      if (!(o != null && o.response) || ((r = o == null ? void 0 : o.response) == null ? void 0 : r.error)) {
        H = "", !Ce() && T++;
        return
      }
      it(o.response)
    })
  }
  async function be() {
    var e;
    (q === 3 && K === 0 && await P() || q === 4) && ((e = document.querySelector("#recaptcha-verify-button")) == null || e.click(), b = null, A = [], C.shift(), await _([document.querySelector("#recaptcha-verify-button")], b))
  }

  function U() {
    return document.querySelector("#recaptcha-anchor") !== null
  }

  function Q() {
    if (nt()) {
      T = 0;
      return
    }
    ot(), N = !1
  }

  function V() {
    return document.querySelector("#rc-imageselect") !== null
  }

  function P() {
    return new Promise(e => {
      let t = document.querySelectorAll(".rc-imageselect-tile"),
        n = document.querySelectorAll(".rc-imageselect-dynamic-selected");
      t.length > 0 && n.length === 0 ? e(!0) : e(!1)
    })
  }

  function W(e) {
    return new Promise(t => {
      e <= T && t(!1);
      let n = rt();
      n || t(!1), et() && (ye(), t(!1)), tt() && (ye(), t(!1));
      let o = Array.from(document.querySelectorAll(".rc-imageselect-tile img")),
        r = o.length,
        i = Array(r).fill(null),
        s = "",
        c = !1,
        f = "";
      r !== 9 && r !== 16 && t(!1), q = r === 9 ? 3 : 4;
      for (let l = 0; l < r; l++) {
        let p = o[l];
        p.naturalWidth >= 300 ? s = p.getAttribute("src") : p.naturalWidth === 100 && (i[l] = p.getAttribute("src"), c = !0)
      }
      c && (s = null), f = JSON.stringify([s, i]), H === f && t(!1), H = f, K = 0, t({
        question: n,
        url: s,
        urls: i
      })
    })
  }
  async function z(e) {
    Ce() && T++;
    let {
      question: t,
      url: n,
      urls: o
    } = e, r = "";
    if (n) r = n, await ve({
      question: t,
      image: r
    });
    else
      for (let i = 0; i < o.length; i++) !o[i] || A.includes(o[i]) || (r = o[i], A.push(r), await ve({
        question: t,
        image: r,
        index: i
      }))
  }
  async function it(e) {
    var r;
    let t = Array.from(document.querySelectorAll(".rc-imageselect-tile")),
      n = (r = e == null ? void 0 : e.response) == null ? void 0 : r.solution,
      o = [];
    if (n.hasOwnProperty("hasObject")) e.hasOwnProperty("index") && n.hasObject && (K++, t[e.index].click(), A.splice(e.index, 1), o.push(t[e.index]));
    else {
      let i = n.objects,
        s = i.length;
      for (let c = 0; c < s; c++) await y(100), t[i[c]].click(), o.push(t[i[c]])
    }
    await _(o, b), b = o[o.length - 1], await y(500), be()
  }

  function xe(e) {
    let t = e.length,
      n = [];
    for (let o = 0; o < t; o++)
      if (Array.isArray(e[o]) && e[o][0] !== "pmeta") n = xe(e[o]);
      else if (Array.isArray(e[o]) && e[o][0] === "pmeta") {
      n = e[o];
      break
    }
    return n
  }

  function we(e) {
    try {
      let t = JSON.parse(e.split(`
`)[1]),
        n = xe(t),
        o = n.length;
      if (o === 0) {
        C = [];
        return
      }
      let r = [];
      for (let i = 0; i < o; i++)
        if (Array.isArray(n[i])) {
          r = n[i];
          break
        } else continue;
      Array.isArray(r[0]) ? r[0].forEach(i => {
        C.push(i[0])
      }) : C.push(r[0])
    } catch {
      console.log("Get question failed")
    }
  }
  var Le = document.createElement("script");
  Le.src = chrome.runtime.getURL("assets/inject/injected.js");
  var st = document.head || document.documentElement;
  st.appendChild(Le);
  window.addEventListener("message", function(e) {
    var t, n;
    (((t = e == null ? void 0 : e.data) == null ? void 0 : t.type) === "xhr" || ((n = e == null ? void 0 : e.data) == null ? void 0 : n.type) === "fetch") && we(e.data.data)
  });
  async function at(e) {
    !e.useCapsolver || !e.enabledForRecaptcha || !e.apiKey || e.enabledForBlacklistControl && e.isInBlackList || e.reCaptchaMode !== "click" || (await y(e.reCaptchaDelayTime), setInterval(async () => {
      if (U() && Q(), V()) {
        if (!await P()) return;
        let n = await W(e.reCaptchaRepeatTimes);
        if (!n) return;
        await z(n)
      }
    }, 1e3))
  }
  async function ct(e) {
    setInterval(async () => {
      if (U() && Q(), V()) {
        if (!await P()) return;
        let n = await W(e.reCaptchaRepeatTimes);
        if (!n) return;
        await z(n)
      }
    }, 1e3)
  }
  var O = null;
  O && window.clearInterval(O);
  O = window.setInterval(async () => {
    let e = await L.getAll();
    !e.isInit || (e.manualSolving ? chrome.runtime.onMessage.addListener(t => {
      t.command === "execute" && ct(e)
    }) : at(e), window.clearInterval(O))
  }, 100);
  var Te = (0, Me.bexContent)(e => {});
  var X = chrome.runtime.connect({
      name: "contentScript"
    }),
    Ee = !1;
  X.onDisconnect.addListener(() => {
    Ee = !0
  });
  var Re = new w({
    listen(e) {
      X.onMessage.addListener(e)
    },
    send(e) {
      Ee || (X.postMessage(e), window.postMessage({
        ...e,
        from: "bex-content-script"
      }, "*"))
    }
  });

  function lt(e) {
    let t = document.createElement("script");
    t.src = e, t.onload = function() {
      this.remove()
    }, (document.head || document.documentElement).appendChild(t)
  }
  document instanceof HTMLDocument && lt(chrome.runtime.getURL("dom.js"));
  pe(Re, "bex-dom");
  Te(Re);
})();