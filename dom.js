"use strict";
(() => {
  console.log("dom.js loaded");
  var de = Object.create;
  var I = Object.defineProperty;
  var pe = Object.getOwnPropertyDescriptor;
  var me = Object.getOwnPropertyNames;
  var he = Object.getPrototypeOf,
    ge = Object.prototype.hasOwnProperty;
  var E = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports);
  var ve = (e, t, n, r) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let o of me(t)) !ge.call(e, o) && o !== n && I(e, o, {
        get: () => t[o],
        enumerable: !(r = pe(t, o)) || r.enumerable
      });
    return e
  };
  var S = (e, t, n) => (n = e != null ? de(he(e)) : {}, ve(t || !e || !e.__esModule ? I(n, "default", {
    value: e,
    enumerable: !0
  }) : n, e));
  var H = E((We, x) => {
    "use strict";
    var m = typeof Reflect == "object" ? Reflect : null,
      M = m && typeof m.apply == "function" ? m.apply : function(t, n, r) {
        return Function.prototype.apply.call(t, n, r)
      },
      v;
    m && typeof m.ownKeys == "function" ? v = m.ownKeys : Object.getOwnPropertySymbols ? v = function(t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
    } : v = function(t) {
      return Object.getOwnPropertyNames(t)
    };

    function ye(e) {
      console && console.warn && console.warn(e)
    }
    var R = Number.isNaN || function(t) {
      return t !== t
    };

    function u() {
      u.init.call(this)
    }
    x.exports = u;
    x.exports.once = we;
    u.EventEmitter = u;
    u.prototype._events = void 0;
    u.prototype._eventsCount = 0;
    u.prototype._maxListeners = void 0;
    var k = 10;

    function y(e) {
      if (typeof e != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
    }
    Object.defineProperty(u, "defaultMaxListeners", {
      enumerable: !0,
      get: function() {
        return k
      },
      set: function(e) {
        if (typeof e != "number" || e < 0 || R(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
        k = e
      }
    });
    u.init = function() {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    };
    u.prototype.setMaxListeners = function(t) {
      if (typeof t != "number" || t < 0 || R(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this
    };

    function B(e) {
      return e._maxListeners === void 0 ? u.defaultMaxListeners : e._maxListeners
    }
    u.prototype.getMaxListeners = function() {
      return B(this)
    };
    u.prototype.emit = function(t) {
      for (var n = [], r = 1; r < arguments.length; r++) n.push(arguments[r]);
      var o = t === "error",
        i = this._events;
      if (i !== void 0) o = o && i.error === void 0;
      else if (!o) return !1;
      if (o) {
        var a;
        if (n.length > 0 && (a = n[0]), a instanceof Error) throw a;
        var s = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
        throw s.context = a, s
      }
      var c = i[t];
      if (c === void 0) return !1;
      if (typeof c == "function") M(c, this, n);
      else
        for (var l = c.length, p = A(c, l), r = 0; r < l; ++r) M(p[r], this, n);
      return !0
    };

    function D(e, t, n, r) {
      var o, i, a;
      if (y(n), i = e._events, i === void 0 ? (i = e._events = Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), i = e._events), a = i[t]), a === void 0) a = i[t] = n, ++e._eventsCount;
      else if (typeof a == "function" ? a = i[t] = r ? [n, a] : [a, n] : r ? a.unshift(n) : a.push(n), o = B(e), o > 0 && a.length > o && !a.warned) {
        a.warned = !0;
        var s = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        s.name = "MaxListenersExceededWarning", s.emitter = e, s.type = t, s.count = a.length, ye(s)
      }
      return e
    }
    u.prototype.addListener = function(t, n) {
      return D(this, t, n, !1)
    };
    u.prototype.on = u.prototype.addListener;
    u.prototype.prependListener = function(t, n) {
      return D(this, t, n, !0)
    };

    function be() {
      if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }

    function W(e, t, n) {
      var r = {
          fired: !1,
          wrapFn: void 0,
          target: e,
          type: t,
          listener: n
        },
        o = be.bind(r);
      return o.listener = n, r.wrapFn = o, o
    }
    u.prototype.once = function(t, n) {
      return y(n), this.on(t, W(this, t, n)), this
    };
    u.prototype.prependOnceListener = function(t, n) {
      return y(n), this.prependListener(t, W(this, t, n)), this
    };
    u.prototype.removeListener = function(t, n) {
      var r, o, i, a, s;
      if (y(n), o = this._events, o === void 0) return this;
      if (r = o[t], r === void 0) return this;
      if (r === n || r.listener === n) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete o[t], o.removeListener && this.emit("removeListener", t, r.listener || n));
      else if (typeof r != "function") {
        for (i = -1, a = r.length - 1; a >= 0; a--)
          if (r[a] === n || r[a].listener === n) {
            s = r[a].listener, i = a;
            break
          } if (i < 0) return this;
        i === 0 ? r.shift() : Ce(r, i), r.length === 1 && (o[t] = r[0]), o.removeListener !== void 0 && this.emit("removeListener", t, s || n)
      }
      return this
    };
    u.prototype.off = u.prototype.removeListener;
    u.prototype.removeAllListeners = function(t) {
      var n, r, o;
      if (r = this._events, r === void 0) return this;
      if (r.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete r[t]), this;
      if (arguments.length === 0) {
        var i = Object.keys(r),
          a;
        for (o = 0; o < i.length; ++o) a = i[o], a !== "removeListener" && this.removeAllListeners(a);
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
      }
      if (n = r[t], typeof n == "function") this.removeListener(t, n);
      else if (n !== void 0)
        for (o = n.length - 1; o >= 0; o--) this.removeListener(t, n[o]);
      return this
    };

    function F(e, t, n) {
      var r = e._events;
      if (r === void 0) return [];
      var o = r[t];
      return o === void 0 ? [] : typeof o == "function" ? n ? [o.listener || o] : [o] : n ? xe(o) : A(o, o.length)
    }
    u.prototype.listeners = function(t) {
      return F(this, t, !0)
    };
    u.prototype.rawListeners = function(t) {
      return F(this, t, !1)
    };
    u.listenerCount = function(e, t) {
      return typeof e.listenerCount == "function" ? e.listenerCount(t) : O.call(e, t)
    };
    u.prototype.listenerCount = O;

    function O(e) {
      var t = this._events;
      if (t !== void 0) {
        var n = t[e];
        if (typeof n == "function") return 1;
        if (n !== void 0) return n.length
      }
      return 0
    }
    u.prototype.eventNames = function() {
      return this._eventsCount > 0 ? v(this._events) : []
    };

    function A(e, t) {
      for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
      return n
    }

    function Ce(e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop()
    }

    function xe(e) {
      for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
      return t
    }

    function we(e, t) {
      return new Promise(function(n, r) {
        function o(a) {
          e.removeListener(t, i), r(a)
        }

        function i() {
          typeof e.removeListener == "function" && e.removeListener("error", o), n([].slice.call(arguments))
        }
        P(e, t, i, {
          once: !0
        }), t !== "error" && Le(e, o, {
          once: !0
        })
      })
    }

    function Le(e, t, n) {
      typeof e.on == "function" && P(e, "error", t, n)
    }

    function P(e, t, n, r) {
      if (typeof e.on == "function") r.once ? e.once(t, n) : e.on(t, n);
      else if (typeof e.addEventListener == "function") e.addEventListener(t, function o(i) {
        r.once && e.removeEventListener(t, o), n(i)
      });
      else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
    }
  });
  var U = E((He, d) => {
    d.exports.boot = function(e) {
      return e
    };
    d.exports.ssrMiddleware = function(e) {
      return e
    };
    d.exports.configure = function(e) {
      return e
    };
    d.exports.preFetch = function(e) {
      return e
    };
    d.exports.route = function(e) {
      return e
    };
    d.exports.store = function(e) {
      return e
    };
    d.exports.bexBackground = function(e) {
      return e
    };
    d.exports.bexContent = function(e) {
      return e
    };
    d.exports.bexDom = function(e) {
      return e
    };
    d.exports.ssrProductionExport = function(e) {
      return e
    };
    d.exports.ssrCreate = function(e) {
      return e
    };
    d.exports.ssrListen = function(e) {
      return e
    };
    d.exports.ssrClose = function(e) {
      return e
    };
    d.exports.ssrServeStaticContent = function(e) {
      return e
    };
    d.exports.ssrRenderPreloadTag = function(e) {
      return e
    }
  });
  var j = S(H());
  var w, b = 0,
    f = new Array(256);
  for (let e = 0; e < 256; e++) f[e] = (e + 256).toString(16).substring(1);
  var _e = (() => {
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
    q = 4096;

  function N() {
    (w === void 0 || b + 16 > q) && (b = 0, w = _e(q));
    let e = Array.prototype.slice.call(w, b, b += 16);
    return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, f[e[0]] + f[e[1]] + f[e[2]] + f[e[3]] + "-" + f[e[4]] + f[e[5]] + "-" + f[e[6]] + f[e[7]] + "-" + f[e[8]] + f[e[9]] + "-" + f[e[10]] + f[e[11]] + f[e[12]] + f[e[13]] + f[e[14]] + f[e[15]]
  }
  var Te = {
      undefined: () => 0,
      boolean: () => 4,
      number: () => 8,
      string: e => 2 * e.length,
      object: e => e ? Object.keys(e).reduce((t, n) => L(n) + L(e[n]) + t, 0) : 0
    },
    L = e => Te[typeof e](e),
    h = class extends j.EventEmitter {
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
          r = `${n.event}.${N()}`,
          o = r + ".result";
        return new Promise((i, a) => {
          let s = [],
            c = l => {
              if (l !== void 0 && l._chunkSplit) {
                let p = l._chunkSplit;
                s = [...s, ...l.data], p.lastChunk && (this.off(o, c), i(s))
              } else this.off(o, c), i(l)
            };
          this.on(o, c);
          try {
            let l = t.map(p => ({
              ...p,
              payload: {
                data: p.payload,
                eventResponseKey: o
              }
            }));
            this.wall.send(l)
          } catch (l) {
            let p = "Message length exceeded maximum allowed length.";
            if (l.message === p && Array.isArray(n.payload)) {
              let _ = L(n);
              if (_ > this._maxMessageSize) {
                let g = Math.ceil(_ / this._maxMessageSize),
                  ue = Math.ceil(n.payload.length / g),
                  T = n.payload;
                for (let C = 0; C < g; C++) {
                  let fe = Math.min(T.length, ue);
                  this.wall.send([{
                    event: n.event,
                    payload: {
                      _chunkSplit: {
                        count: g,
                        lastChunk: C === g - 1
                      },
                      data: T.splice(0, fe)
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
  var K = (e, t) => {
    window.addEventListener("message", n => {
      if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
        let r = n.data[0],
          o = e.getEvents();
        for (let i in o) i === r.event && o[i](r.payload)
      }
    }, !1)
  };
  var se = S(U());

  function V(e) {
    window.sendMsgToSolverCS = function(t, n) {
      return new Promise((r, o) => {
        let i = document.querySelector("body > solver-ext-messages");
        i || (i = document.createElement("solver-ext-messages"), i.style.display = "none", document.body.appendChild(i));
        let a = document.createElement("solver-ext-message");
        a.dataset.action = t, a.dataset.messageId = Date.now().valueOf().toString(), n && (a.dataset.data = encodeURIComponent(JSON.stringify(n))), i.appendChild(a);
        let s = setInterval(() => {
          if (a.dataset.response) {
            try {
              let c = JSON.parse(decodeURIComponent(a.dataset.response));
              c.error ? o(new Error(c.error)) : r(c)
            } catch {
              o(new Error("Cannot parse message response"))
            }
            clearTimeout(s), a.remove(), i.childNodes.length || i.remove()
          }
        }, 200)
      })
    }, setInterval(function() {
      let t = document.querySelector("textarea[id=capsolver-callback-trigger]");
      if (t) {
        let n = t.getAttribute("data-function"),
          r = t.value;
        window[n] && window[n](r), t.remove()
      }
    }, 1e3), setInterval(function() {
      let t = document.querySelector("textarea[id=twocaptcha-autosubmit-code]");
      if (t) {
        let n = t.value.trim().split(`
`);
        t.remove();
        let r = null;
        for (let o = 0; o < n.length; o++) {
          let i = JSON.parse(n[o]);
          i.type === "source" ? (i.value === "window" && (r = window), i.value === "document" && (r = document)) : i.type === "property" ? r = r[i.value] : i.type === "method" ? i.args && i.args.length ? r = r[i.value](...i.args) : r = r[i.value]() : i.type === "index" && (r = r[i.value])
        }
      }
    }, 1e3)
  }

  function z(e) {
    return new Promise(t => setTimeout(t, e))
  }
  var Q = "hCaptcha",
    G = "0";
  var Ee = 1e3;

  function X(e) {
    console.log("in X func", e);
    setInterval(() => {
      let t = document.querySelector("textarea[name=h-captcha-response]");
      if (!t) return;
      let n = t.parentNode;
      n.id || (n.id = "hcaptcha-container-" + Date.now());
      let r = {
        captchaType: Q,
        widgetId: G,
        containerId: n.id,
        sitekey: n.dataset.sitekey || null,
        callback: n.dataset.callback || null,
        status: "ready"
      };
      e.send("registerCaptchaWidget", r).then()
    }, Ee)
  }

  function Y(e) {
    let t = function(n) {
      let r = {
          captchaType: "reCaptcha",
          widgetId: n.id,
          version: "v2",
          sitekey: null,
          action: null,
          s: null,
          callback: null,
          enterprise: !!window.grecaptcha.enterprise,
          containerId: null,
          bindedButtonId: null,
          status: "ready"
        },
        o = !1;
      e: for (let a in n)
        if (typeof n[a] == "object") {
          for (let s in n[a])
            if (n[a][s] && n[a][s].classList && n[a][s].classList.contains("grecaptcha-badge")) {
              o = !0;
              break e
            }
        }
      if (o) {
        r.version = "v3", r.captchaType = "reCaptcha3";
        for (let a in n) {
          let s = n[a];
          if (typeof s == "object")
            for (let c in s) typeof s[c] == "string" && s[c] == "fullscreen" && (r.version = "v2_invisible")
        }
      }
      let i;
      for (let a in n)
        if (n[a] && n[a].nodeType)
          if (n[a].id) r.containerId = n[a].id;
          else if (n[a].dataset.sitekey) n[a].id = "recaptcha-container-" + Date.now(), r.containerId = n[a].id;
      else {
        if (!i) {
          i = n[a];
          continue
        }
        if (n[a].isSameNode(i)) {
          n[a].id = "recaptcha-container-" + Date.now(), r.containerId = n[a].id;
          break
        }
      }
      for (let a in n) {
        let s = n[a];
        if (typeof s == "object") {
          for (let c in s)
            if (s[c] !== null && typeof s[c] == "object" && s[c].sitekey !== void 0 && s[c].action !== void 0)
              for (let l in s[c]) {
                if (l === "sitekey" && (r.sitekey = s[c][l]), l === "action" && (r.action = s[c][l]), l === "s" && (r.s = s[c][l]), ["callback", "promise-callback"].includes(l)) {
                  let p = s[c][l];
                  r.callback = p
                }
                if (l === "bind" && s[c][l])
                  if (typeof s[c][l] == "string") r.bindedButtonId = s[c][l];
                  else {
                    let p = s[c][l];
                    p.id === void 0 && (p.id = "recaptchaBindedElement" + n.id), r.bindedButtonId = p.id
                  }
              }
        }
      }
      if (typeof r.callback == "function") {
        let a = "reCaptchaWidgetCallback" + n.id;
        window[a] = r.callback, r.callback = a
      }
      return r
    };
    return setInterval(() => {
      if (window.___grecaptcha_cfg !== void 0 && window.___grecaptcha_cfg.clients !== void 0)
        for (let n in window.___grecaptcha_cfg.clients) {
          let r = window.___grecaptcha_cfg.clients[n],
            o = t(r);
          e.send("registerCaptchaWidget", o).then()
        }
    }, 2e3)
  }
  var Z = "funCaptcha",
    ee = "0";
  var Se = 1e3;

  function te(e) {
    let t = null;
    t && (clearInterval(t), t = null), t = setInterval(() => {
      let n = document.querySelector('#FunCaptcha-Token[name="fc-token"]');
      if (!n) return;
      let r = document.querySelector("#FunCaptcha");
      r && !(r != null && r.id) && (r.id = "funcaptcha-container-" + Date.now());
      let a = n.value.split("|").filter(l => l.startsWith("pk=")),
        s = a[0].slice(a[0].indexOf("=") + 1),
        c = {
          captchaType: Z,
          widgetId: ee,
          containerId: r == null ? void 0 : r.id,
          websitePublicKey: s,
          status: "ready"
        };
      r && e.send("registerCaptchaWidget", c).then()
    }, Se)
  }

  function ne() {
    let e = document.getElementsByTagName('map')[0]?.children[0];
    e == null || e.click()
  }
  var re = "cloudflare",
    oe = "0";

  function ae(e) {
    let t = document.querySelector('input[name="cf-turnstile-response"]').parentElement;
    t.id || (t.id = "cloudflare-container-" + Date.now());
    let n = {
      captchaType: re,
      widgetId: oe,
      containerId: t.id,
      status: "ready"
    };
    e.send("registerCaptchaWidget", n).then()
  }

  function Me() {
    let e = document.querySelector("#fail");
    return (e == null ? void 0 : e.style.display) !== "none"
  }

  function ke() {
    let e = document.querySelector('input[name="cf-turnstile-response"]'),
      t = e == null ? void 0 : e.parentElement.querySelector("iframe"),
      n = t == null ? void 0 : t.src;
    return (n == null ? void 0 : n.match("challenges.cloudflare.com/cdn-cgi/challenge-platform/")) !== null
  }

  function Re() {
    return location.href.match("challenges.cloudflare.com/cdn-cgi/challenge-platform/") !== null
  }
  async function ie(e, t) {
    let n = 0;
    setInterval(async () => {
      if (!(n >= t.cloudflareRepeatTimes))
        if (Me() && n++, t.cloudflareMode === "click") {
          if (!Re()) return;
          await z(t.cloudflareDelayTime), ne()
        } else {
          if (!ke()) return;
          ae(e)
        }
    }, 1e3)
  }
  var ce = (0, se.bexDom)(async e => {
    Be(e).then(), V(e)
  });
  async function Be(e) {
    let {
      data: t
    } = await e.send("config");
    !t.useCapsolver || (t.enabledForHCaptcha && X(e), (t.enabledForRecaptcha || t.enabledForRecaptchaV3) && Y(e), t.enabledForCloudflare && ie(e, t), t.enabledForFunCaptcha && te(e))
  }
  var le = new h({
    listen(e) {},
    send(e) {
      let t = {
        ...e,
        from: "bex-dom"
      };
      window.postMessage(t, "*")
    }
  });
  K(le, "bex-content-script");
  ce(le);
})();