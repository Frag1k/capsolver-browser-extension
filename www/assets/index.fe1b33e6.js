var e = Object.defineProperty,
  t = (t, n, o) => (((t, n, o) => {
    n in t ? e(t, n, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: o
    }) : t[n] = o
  })(t, "symbol" != typeof n ? n + "" : n, o), o);
const n = function() {
    const e = document.createElement("link").relList;
    return e && e.supports && e.supports("modulepreload") ? "modulepreload" : "preload"
  }(),
  o = {},
  l = function(e, t) {
    return t && 0 !== t.length ? Promise.all(t.map((e => {
      if ((e = `${e}`) in o) return;
      o[e] = !0;
      const t = e.endsWith(".css"),
        l = t ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${e}"]${l}`)) return;
      const a = document.createElement("link");
      return a.rel = t ? "stylesheet" : n, t || (a.as = "script", a.crossOrigin = ""), a.href = e, document.head.appendChild(a), t ? new Promise(((t, n) => {
        a.addEventListener("load", t), a.addEventListener("error", (() => n(new Error(`Unable to preload CSS for ${e}`))))
      })) : void 0
    }))).then((() => e())) : e()
  };

function a(e, t) {
  const n = Object.create(null),
    o = e.split(",");
  for (let l = 0; l < o.length; l++) n[o[l]] = !0;
  return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}

function r(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n],
        l = R(o) ? c(o) : r(o);
      if (l)
        for (const e in l) t[e] = l[e]
    }
    return t
  }
  return R(e) || V(e) ? e : void 0
}
const i = /;(?![^(]*\))/g,
  s = /:([^]+)/,
  u = /\/\*.*?\*\//gs;

function c(e) {
  const t = {};
  return e.replace(u, "").split(i).forEach((e => {
    if (e) {
      const n = e.split(s);
      n.length > 1 && (t[n[0].trim()] = n[1].trim())
    }
  })), t
}

function d(e) {
  let t = "";
  if (R(e)) t = e;
  else if (A(e))
    for (let n = 0; n < e.length; n++) {
      const o = d(e[n]);
      o && (t += o + " ")
    } else if (V(e))
      for (const n in e) e[n] && (t += n + " ");
  return t.trim()
}
const p = a("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function f(e) {
  return !!e || "" === e
}
const v = e => R(e) ? e : null == e ? "" : A(e) || V(e) && (e.toString === F || !O(e.toString)) ? JSON.stringify(e, m, 2) : String(e),
  m = (e, t) => t && t.__v_isRef ? m(e, t.value) : L(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce(((e, [t, n]) => (e[`${t} =>`] = n, e)), {})
  } : T(t) ? {
    [`Set(${t.size})`]: [...t.values()]
  } : !V(t) || A(t) || P(t) ? t : String(t),
  h = {},
  g = [],
  y = () => {},
  b = () => !1,
  _ = /^on[^a-z]/,
  w = e => _.test(e),
  k = e => e.startsWith("onUpdate:"),
  x = Object.assign,
  S = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
  },
  C = Object.prototype.hasOwnProperty,
  E = (e, t) => C.call(e, t),
  A = Array.isArray,
  L = e => "[object Map]" === z(e),
  T = e => "[object Set]" === z(e),
  O = e => "function" == typeof e,
  R = e => "string" == typeof e,
  q = e => "symbol" == typeof e,
  V = e => null !== e && "object" == typeof e,
  M = e => V(e) && O(e.then) && O(e.catch),
  F = Object.prototype.toString,
  z = e => F.call(e),
  P = e => "[object Object]" === z(e),
  B = e => R(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
  I = a(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  N = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n))
  },
  $ = /-(\w)/g,
  j = N((e => e.replace($, ((e, t) => t ? t.toUpperCase() : "")))),
  D = /\B([A-Z])/g,
  H = N((e => e.replace(D, "-$1").toLowerCase())),
  U = N((e => e.charAt(0).toUpperCase() + e.slice(1))),
  W = N((e => e ? `on${U(e)}` : "")),
  K = (e, t) => !Object.is(e, t),
  Q = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  G = (e, t, n) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      value: n
    })
  },
  X = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
  };
let J;
let Z;
class Y {
  constructor(e = !1) {
    this.detached = e, this.active = !0, this.effects = [], this.cleanups = [], this.parent = Z, !e && Z && (this.index = (Z.scopes || (Z.scopes = [])).push(this) - 1)
  }
  run(e) {
    if (this.active) {
      const t = Z;
      try {
        return Z = this, e()
      } finally {
        Z = t
      }
    }
  }
  on() {
    Z = this
  }
  off() {
    Z = this.parent
  }
  stop(e) {
    if (this.active) {
      let t, n;
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
      for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
      if (!this.detached && this.parent && !e) {
        const e = this.parent.scopes.pop();
        e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index)
      }
      this.parent = void 0, this.active = !1
    }
  }
}

function ee(e) {
  return new Y(e)
}
const te = e => {
    const t = new Set(e);
    return t.w = 0, t.n = 0, t
  },
  ne = e => (e.w & re) > 0,
  oe = e => (e.n & re) > 0,
  le = new WeakMap;
let ae = 0,
  re = 1;
let ie;
const se = Symbol(""),
  ue = Symbol("");
class ce {
  constructor(e, t = null, n) {
    this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0,
      function(e, t = Z) {
        t && t.active && t.effects.push(e)
      }(this, n)
  }
  run() {
    if (!this.active) return this.fn();
    let e = ie,
      t = pe;
    for (; e;) {
      if (e === this) return;
      e = e.parent
    }
    try {
      return this.parent = ie, ie = this, pe = !0, re = 1 << ++ae, ae <= 30 ? (({
        deps: e
      }) => {
        if (e.length)
          for (let t = 0; t < e.length; t++) e[t].w |= re
      })(this) : de(this), this.fn()
    } finally {
      ae <= 30 && (e => {
        const {
          deps: t
        } = e;
        if (t.length) {
          let n = 0;
          for (let o = 0; o < t.length; o++) {
            const l = t[o];
            ne(l) && !oe(l) ? l.delete(e) : t[n++] = l, l.w &= ~re, l.n &= ~re
          }
          t.length = n
        }
      })(this), re = 1 << --ae, ie = this.parent, pe = t, this.parent = void 0, this.deferStop && this.stop()
    }
  }
  stop() {
    ie === this ? this.deferStop = !0 : this.active && (de(this), this.onStop && this.onStop(), this.active = !1)
  }
}

function de(e) {
  const {
    deps: t
  } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0
  }
}
let pe = !0;
const fe = [];

function ve() {
  fe.push(pe), pe = !1
}

function me() {
  const e = fe.pop();
  pe = void 0 === e || e
}

function he(e, t, n) {
  if (pe && ie) {
    let t = le.get(e);
    t || le.set(e, t = new Map);
    let o = t.get(n);
    o || t.set(n, o = te()), ge(o)
  }
}

function ge(e, t) {
  let n = !1;
  ae <= 30 ? oe(e) || (e.n |= re, n = !ne(e)) : n = !e.has(ie), n && (e.add(ie), ie.deps.push(e))
}

function ye(e, t, n, o, l, a) {
  const r = le.get(e);
  if (!r) return;
  let i = [];
  if ("clear" === t) i = [...r.values()];
  else if ("length" === n && A(e)) {
    const e = X(o);
    r.forEach(((t, n) => {
      ("length" === n || n >= e) && i.push(t)
    }))
  } else switch (void 0 !== n && i.push(r.get(n)), t) {
    case "add":
      A(e) ? B(n) && i.push(r.get("length")) : (i.push(r.get(se)), L(e) && i.push(r.get(ue)));
      break;
    case "delete":
      A(e) || (i.push(r.get(se)), L(e) && i.push(r.get(ue)));
      break;
    case "set":
      L(e) && i.push(r.get(se))
  }
  if (1 === i.length) i[0] && be(i[0]);
  else {
    const e = [];
    for (const t of i) t && e.push(...t);
    be(te(e))
  }
}

function be(e, t) {
  const n = A(e) ? e : [...e];
  for (const o of n) o.computed && _e(o);
  for (const o of n) o.computed || _e(o)
}

function _e(e, t) {
  (e !== ie || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const we = a("__proto__,__v_isRef,__isVue"),
  ke = new Set(Object.getOwnPropertyNames(Symbol).filter((e => "arguments" !== e && "caller" !== e)).map((e => Symbol[e])).filter(q)),
  xe = Le(),
  Se = Le(!1, !0),
  Ce = Le(!0),
  Ee = Ae();

function Ae() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
    e[t] = function(...e) {
      const n = pt(this);
      for (let t = 0, l = this.length; t < l; t++) he(n, 0, t + "");
      const o = n[t](...e);
      return -1 === o || !1 === o ? n[t](...e.map(pt)) : o
    }
  })), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
    e[t] = function(...e) {
      ve();
      const n = pt(this)[t].apply(this, e);
      return me(), n
    }
  })), e
}

function Le(e = !1, t = !1) {
  return function(n, o, l) {
    if ("__v_isReactive" === o) return !e;
    if ("__v_isReadonly" === o) return e;
    if ("__v_isShallow" === o) return t;
    if ("__v_raw" === o && l === (e ? t ? ot : nt : t ? tt : et).get(n)) return n;
    const a = A(n);
    if (!e && a && E(Ee, o)) return Reflect.get(Ee, o, l);
    const r = Reflect.get(n, o, l);
    return (q(o) ? ke.has(o) : we(o)) ? r : (e || he(n, 0, o), t ? r : yt(r) ? a && B(o) ? r : r.value : V(r) ? e ? rt(r) : at(r) : r)
  }
}

function Te(e = !1) {
  return function(t, n, o, l) {
    let a = t[n];
    if (ut(a) && yt(a) && !yt(o)) return !1;
    if (!e && (ct(o) || ut(o) || (a = pt(a), o = pt(o)), !A(t) && yt(a) && !yt(o))) return a.value = o, !0;
    const r = A(t) && B(n) ? Number(n) < t.length : E(t, n),
      i = Reflect.set(t, n, o, l);
    return t === pt(l) && (r ? K(o, a) && ye(t, "set", n, o) : ye(t, "add", n, o)), i
  }
}
const Oe = {
    get: xe,
    set: Te(),
    deleteProperty: function(e, t) {
      const n = E(e, t);
      e[t];
      const o = Reflect.deleteProperty(e, t);
      return o && n && ye(e, "delete", t, void 0), o
    },
    has: function(e, t) {
      const n = Reflect.has(e, t);
      return q(t) && ke.has(t) || he(e, 0, t), n
    },
    ownKeys: function(e) {
      return he(e, 0, A(e) ? "length" : se), Reflect.ownKeys(e)
    }
  },
  Re = {
    get: Ce,
    set: (e, t) => !0,
    deleteProperty: (e, t) => !0
  },
  qe = x({}, Oe, {
    get: Se,
    set: Te(!0)
  }),
  Ve = e => e,
  Me = e => Reflect.getPrototypeOf(e);

function Fe(e, t, n = !1, o = !1) {
  const l = pt(e = e.__v_raw),
    a = pt(t);
  n || (t !== a && he(l, 0, t), he(l, 0, a));
  const {
    has: r
  } = Me(l), i = o ? Ve : n ? mt : vt;
  return r.call(l, t) ? i(e.get(t)) : r.call(l, a) ? i(e.get(a)) : void(e !== l && e.get(t))
}

function ze(e, t = !1) {
  const n = this.__v_raw,
    o = pt(n),
    l = pt(e);
  return t || (e !== l && he(o, 0, e), he(o, 0, l)), e === l ? n.has(e) : n.has(e) || n.has(l)
}

function Pe(e, t = !1) {
  return e = e.__v_raw, !t && he(pt(e), 0, se), Reflect.get(e, "size", e)
}

function Be(e) {
  e = pt(e);
  const t = pt(this);
  return Me(t).has.call(t, e) || (t.add(e), ye(t, "add", e, e)), this
}

function Ie(e, t) {
  t = pt(t);
  const n = pt(this),
    {
      has: o,
      get: l
    } = Me(n);
  let a = o.call(n, e);
  a || (e = pt(e), a = o.call(n, e));
  const r = l.call(n, e);
  return n.set(e, t), a ? K(t, r) && ye(n, "set", e, t) : ye(n, "add", e, t), this
}

function Ne(e) {
  const t = pt(this),
    {
      has: n,
      get: o
    } = Me(t);
  let l = n.call(t, e);
  l || (e = pt(e), l = n.call(t, e)), o && o.call(t, e);
  const a = t.delete(e);
  return l && ye(t, "delete", e, void 0), a
}

function $e() {
  const e = pt(this),
    t = 0 !== e.size,
    n = e.clear();
  return t && ye(e, "clear", void 0, void 0), n
}

function je(e, t) {
  return function(n, o) {
    const l = this,
      a = l.__v_raw,
      r = pt(a),
      i = t ? Ve : e ? mt : vt;
    return !e && he(r, 0, se), a.forEach(((e, t) => n.call(o, i(e), i(t), l)))
  }
}

function De(e, t, n) {
  return function(...o) {
    const l = this.__v_raw,
      a = pt(l),
      r = L(a),
      i = "entries" === e || e === Symbol.iterator && r,
      s = "keys" === e && r,
      u = l[e](...o),
      c = n ? Ve : t ? mt : vt;
    return !t && he(a, 0, s ? ue : se), {
      next() {
        const {
          value: e,
          done: t
        } = u.next();
        return t ? {
          value: e,
          done: t
        } : {
          value: i ? [c(e[0]), c(e[1])] : c(e),
          done: t
        }
      },
      [Symbol.iterator]() {
        return this
      }
    }
  }
}

function He(e) {
  return function(...t) {
    return "delete" !== e && this
  }
}

function Ue() {
  const e = {
      get(e) {
        return Fe(this, e)
      },
      get size() {
        return Pe(this)
      },
      has: ze,
      add: Be,
      set: Ie,
      delete: Ne,
      clear: $e,
      forEach: je(!1, !1)
    },
    t = {
      get(e) {
        return Fe(this, e, !1, !0)
      },
      get size() {
        return Pe(this)
      },
      has: ze,
      add: Be,
      set: Ie,
      delete: Ne,
      clear: $e,
      forEach: je(!1, !0)
    },
    n = {
      get(e) {
        return Fe(this, e, !0)
      },
      get size() {
        return Pe(this, !0)
      },
      has(e) {
        return ze.call(this, e, !0)
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: je(!0, !1)
    },
    o = {
      get(e) {
        return Fe(this, e, !0, !0)
      },
      get size() {
        return Pe(this, !0)
      },
      has(e) {
        return ze.call(this, e, !0)
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: je(!0, !0)
    };
  return ["keys", "values", "entries", Symbol.iterator].forEach((l => {
    e[l] = De(l, !1, !1), n[l] = De(l, !0, !1), t[l] = De(l, !1, !0), o[l] = De(l, !0, !0)
  })), [e, n, t, o]
}
const [We, Ke, Qe, Ge] = Ue();

function Xe(e, t) {
  const n = t ? e ? Ge : Qe : e ? Ke : We;
  return (t, o, l) => "__v_isReactive" === o ? !e : "__v_isReadonly" === o ? e : "__v_raw" === o ? t : Reflect.get(E(n, o) && o in t ? n : t, o, l)
}
const Je = {
    get: Xe(!1, !1)
  },
  Ze = {
    get: Xe(!1, !0)
  },
  Ye = {
    get: Xe(!0, !1)
  },
  et = new WeakMap,
  tt = new WeakMap,
  nt = new WeakMap,
  ot = new WeakMap;

function lt(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : function(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0
    }
  }((e => z(e).slice(8, -1))(e))
}

function at(e) {
  return ut(e) ? e : it(e, !1, Oe, Je, et)
}

function rt(e) {
  return it(e, !0, Re, Ye, nt)
}

function it(e, t, n, o, l) {
  if (!V(e)) return e;
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
  const a = l.get(e);
  if (a) return a;
  const r = lt(e);
  if (0 === r) return e;
  const i = new Proxy(e, 2 === r ? o : n);
  return l.set(e, i), i
}

function st(e) {
  return ut(e) ? st(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function ut(e) {
  return !(!e || !e.__v_isReadonly)
}

function ct(e) {
  return !(!e || !e.__v_isShallow)
}

function dt(e) {
  return st(e) || ut(e)
}

function pt(e) {
  const t = e && e.__v_raw;
  return t ? pt(t) : e
}

function ft(e) {
  return G(e, "__v_skip", !0), e
}
const vt = e => V(e) ? at(e) : e,
  mt = e => V(e) ? rt(e) : e;

function ht(e) {
  pe && ie && ge((e = pt(e)).dep || (e.dep = te()))
}

function gt(e, t) {
  (e = pt(e)).dep && be(e.dep)
}

function yt(e) {
  return !(!e || !0 !== e.__v_isRef)
}

function bt(e) {
  return _t(e, !1)
}

function _t(e, t) {
  return yt(e) ? e : new wt(e, t)
}
class wt {
  constructor(e, t) {
    this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : pt(e), this._value = t ? e : vt(e)
  }
  get value() {
    return ht(this), this._value
  }
  set value(e) {
    const t = this.__v_isShallow || ct(e) || ut(e);
    e = t ? e : pt(e), K(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : vt(e), gt(this))
  }
}

function kt(e) {
  return yt(e) ? e.value : e
}
const xt = {
  get: (e, t, n) => kt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const l = e[t];
    return yt(l) && !yt(n) ? (l.value = n, !0) : Reflect.set(e, t, n, o)
  }
};

function St(e) {
  return st(e) ? e : new Proxy(e, xt)
}
var Ct;
class Et {
  constructor(e, t, n, o) {
    this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[Ct] = !1, this._dirty = !0, this.effect = new ce(e, (() => {
      this._dirty || (this._dirty = !0, gt(this))
    })), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n
  }
  get value() {
    const e = pt(this);
    return ht(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value
  }
  set value(e) {
    this._setter(e)
  }
}

function At(e, t, n, o) {
  let l;
  try {
    l = o ? e(...o) : e()
  } catch (a) {
    Tt(a, t, n)
  }
  return l
}

function Lt(e, t, n, o) {
  if (O(e)) {
    const l = At(e, t, n, o);
    return l && M(l) && l.catch((e => {
      Tt(e, t, n)
    })), l
  }
  const l = [];
  for (let a = 0; a < e.length; a++) l.push(Lt(e[a], t, n, o));
  return l
}

function Tt(e, t, n, o = !0) {
  t && t.vnode;
  if (t) {
    let o = t.parent;
    const l = t.proxy,
      a = n;
    for (; o;) {
      const t = o.ec;
      if (t)
        for (let n = 0; n < t.length; n++)
          if (!1 === t[n](e, l, a)) return;
      o = o.parent
    }
    const r = t.appContext.config.errorHandler;
    if (r) return void At(r, null, 10, [e, l, a])
  }! function(e, t, n, o = !0) {
    console.error(e)
  }(e, 0, 0, o)
}
Ct = "__v_isReadonly";
let Ot = !1,
  Rt = !1;
const qt = [];
let Vt = 0;
const Mt = [];
let Ft = null,
  zt = 0;
const Pt = Promise.resolve();
let Bt = null;

function It(e) {
  const t = Bt || Pt;
  return e ? t.then(this ? e.bind(this) : e) : t
}

function Nt(e) {
  qt.length && qt.includes(e, Ot && e.allowRecurse ? Vt + 1 : Vt) || (null == e.id ? qt.push(e) : qt.splice(function(e) {
    let t = Vt + 1,
      n = qt.length;
    for (; t < n;) {
      const o = t + n >>> 1;
      Ut(qt[o]) < e ? t = o + 1 : n = o
    }
    return t
  }(e.id), 0, e), $t())
}

function $t() {
  Ot || Rt || (Rt = !0, Bt = Pt.then(Kt))
}

function jt(e) {
  A(e) ? Mt.push(...e) : Ft && Ft.includes(e, e.allowRecurse ? zt + 1 : zt) || Mt.push(e), $t()
}

function Dt(e, t = (Ot ? Vt + 1 : 0)) {
  for (; t < qt.length; t++) {
    const e = qt[t];
    e && e.pre && (qt.splice(t, 1), t--, e())
  }
}

function Ht(e) {
  if (Mt.length) {
    const e = [...new Set(Mt)];
    if (Mt.length = 0, Ft) return void Ft.push(...e);
    for (Ft = e, Ft.sort(((e, t) => Ut(e) - Ut(t))), zt = 0; zt < Ft.length; zt++) Ft[zt]();
    Ft = null, zt = 0
  }
}
const Ut = e => null == e.id ? 1 / 0 : e.id,
  Wt = (e, t) => {
    const n = Ut(e) - Ut(t);
    if (0 === n) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1
    }
    return n
  };

function Kt(e) {
  Rt = !1, Ot = !0, qt.sort(Wt);
  try {
    for (Vt = 0; Vt < qt.length; Vt++) {
      const e = qt[Vt];
      e && !1 !== e.active && At(e, null, 14)
    }
  } finally {
    Vt = 0, qt.length = 0, Ht(), Ot = !1, Bt = null, (qt.length || Mt.length) && Kt()
  }
}

function Qt(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || h;
  let l = n;
  const a = t.startsWith("update:"),
    r = a && t.slice(7);
  if (r && r in o) {
    const e = `${"modelValue"===r?"model":r}Modifiers`,
      {
        number: t,
        trim: a
      } = o[e] || h;
    a && (l = n.map((e => R(e) ? e.trim() : e))), t && (l = n.map(X))
  }
  let i, s = o[i = W(t)] || o[i = W(j(t))];
  !s && a && (s = o[i = W(H(t))]), s && Lt(s, e, 6, l);
  const u = o[i + "Once"];
  if (u) {
    if (e.emitted) {
      if (e.emitted[i]) return
    } else e.emitted = {};
    e.emitted[i] = !0, Lt(u, e, 6, l)
  }
}

function Gt(e, t, n = !1) {
  const o = t.emitsCache,
    l = o.get(e);
  if (void 0 !== l) return l;
  const a = e.emits;
  let r = {},
    i = !1;
  if (!O(e)) {
    const o = e => {
      const n = Gt(e, t, !0);
      n && (i = !0, x(r, n))
    };
    !n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
  }
  return a || i ? (A(a) ? a.forEach((e => r[e] = null)) : x(r, a), V(e) && o.set(e, r), r) : (V(e) && o.set(e, null), null)
}

function Xt(e, t) {
  return !(!e || !w(t)) && (t = t.slice(2).replace(/Once$/, ""), E(e, t[0].toLowerCase() + t.slice(1)) || E(e, H(t)) || E(e, t))
}
let Jt = null,
  Zt = null;

function Yt(e) {
  const t = Jt;
  return Jt = e, Zt = e && e.type.__scopeId || null, t
}

function en(e) {
  Zt = e
}

function tn() {
  Zt = null
}

function nn(e, t = Jt, n) {
  if (!t) return e;
  if (e._n) return e;
  const o = (...n) => {
    o._d && tl(-1);
    const l = Yt(t);
    let a;
    try {
      a = e(...n)
    } finally {
      Yt(l), o._d && tl(1)
    }
    return a
  };
  return o._n = !0, o._c = !0, o._d = !0, o
}

function on(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: l,
    props: a,
    propsOptions: [r],
    slots: i,
    attrs: s,
    emit: u,
    render: c,
    renderCache: d,
    data: p,
    setupState: f,
    ctx: v,
    inheritAttrs: m
  } = e;
  let h, g;
  const y = Yt(e);
  try {
    if (4 & n.shapeFlag) {
      const e = l || o;
      h = ml(c.call(e, e, d, a, f, p, v)), g = s
    } else {
      const e = t;
      0, h = ml(e.length > 1 ? e(a, {
        attrs: s,
        slots: i,
        emit: u
      }) : e(a, null)), g = t.props ? s : ln(s)
    }
  } catch (_) {
    Xo.length = 0, Tt(_, e, 1), h = dl(Qo)
  }
  let b = h;
  if (g && !1 !== m) {
    const e = Object.keys(g),
      {
        shapeFlag: t
      } = b;
    e.length && 7 & t && (r && e.some(k) && (g = an(g, r)), b = pl(b, g))
  }
  return n.dirs && (b = pl(b), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && (b.transition = n.transition), h = b, Yt(y), h
}
const ln = e => {
    let t;
    for (const n in e)("class" === n || "style" === n || w(n)) && ((t || (t = {}))[n] = e[n]);
    return t
  },
  an = (e, t) => {
    const n = {};
    for (const o in e) k(o) && o.slice(9) in t || (n[o] = e[o]);
    return n
  };

function rn(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length) return !0;
  for (let l = 0; l < o.length; l++) {
    const a = o[l];
    if (t[a] !== e[a] && !Xt(n, a)) return !0
  }
  return !1
}

function sn({
  vnode: e,
  parent: t
}, n) {
  for (; t && t.subTree === e;)(e = t.vnode).el = n, t = t.parent
}
const un = {
  name: "Suspense",
  __isSuspense: !0,
  process(e, t, n, o, l, a, r, i, s, u) {
    null == e ? function(e, t, n, o, l, a, r, i, s) {
      const {
        p: u,
        o: {
          createElement: c
        }
      } = s, d = c("div"), p = e.suspense = dn(e, l, o, t, d, n, a, r, i, s);
      u(null, p.pendingBranch = e.ssContent, d, null, o, p, a, r), p.deps > 0 ? (cn(e, "onPending"), cn(e, "onFallback"), u(null, e.ssFallback, t, n, o, null, a, r), fn(p, e.ssFallback)) : p.resolve()
    }(t, n, o, l, a, r, i, s, u) : function(e, t, n, o, l, a, r, i, {
      p: s,
      um: u,
      o: {
        createElement: c
      }
    }) {
      const d = t.suspense = e.suspense;
      d.vnode = t, t.el = e.el;
      const p = t.ssContent,
        f = t.ssFallback,
        {
          activeBranch: v,
          pendingBranch: m,
          isInFallback: h,
          isHydrating: g
        } = d;
      if (m) d.pendingBranch = p, rl(p, m) ? (s(m, p, d.hiddenContainer, null, l, d, a, r, i), d.deps <= 0 ? d.resolve() : h && (s(v, f, n, o, l, null, a, r, i), fn(d, f))) : (d.pendingId++, g ? (d.isHydrating = !1, d.activeBranch = m) : u(m, l, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = c("div"), h ? (s(null, p, d.hiddenContainer, null, l, d, a, r, i), d.deps <= 0 ? d.resolve() : (s(v, f, n, o, l, null, a, r, i), fn(d, f))) : v && rl(p, v) ? (s(v, p, n, o, l, d, a, r, i), d.resolve(!0)) : (s(null, p, d.hiddenContainer, null, l, d, a, r, i), d.deps <= 0 && d.resolve()));
      else if (v && rl(p, v)) s(v, p, n, o, l, d, a, r, i), fn(d, p);
      else if (cn(t, "onPending"), d.pendingBranch = p, d.pendingId++, s(null, p, d.hiddenContainer, null, l, d, a, r, i), d.deps <= 0) d.resolve();
      else {
        const {
          timeout: e,
          pendingId: t
        } = d;
        e > 0 ? setTimeout((() => {
          d.pendingId === t && d.fallback(f)
        }), e) : 0 === e && d.fallback(f)
      }
    }(e, t, n, o, l, r, i, s, u)
  },
  hydrate: function(e, t, n, o, l, a, r, i, s) {
    const u = t.suspense = dn(t, o, n, e.parentNode, document.createElement("div"), null, l, a, r, i, !0),
      c = s(e, u.pendingBranch = t.ssContent, n, u, a, r);
    0 === u.deps && u.resolve();
    return c
  },
  create: dn,
  normalize: function(e) {
    const {
      shapeFlag: t,
      children: n
    } = e, o = 32 & t;
    e.ssContent = pn(o ? n.default : n), e.ssFallback = o ? pn(n.fallback) : dl(Qo)
  }
};

function cn(e, t) {
  const n = e.props && e.props[t];
  O(n) && n()
}

function dn(e, t, n, o, l, a, r, i, s, u, c = !1) {
  const {
    p: d,
    m: p,
    um: f,
    n: v,
    o: {
      parentNode: m,
      remove: h
    }
  } = u, g = X(e.props && e.props.timeout), y = {
    vnode: e,
    parent: t,
    parentComponent: n,
    isSVG: r,
    container: o,
    hiddenContainer: l,
    anchor: a,
    deps: 0,
    pendingId: 0,
    timeout: "number" == typeof g ? g : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !0,
    isHydrating: c,
    isUnmounted: !1,
    effects: [],
    resolve(e = !1) {
      const {
        vnode: t,
        activeBranch: n,
        pendingBranch: o,
        pendingId: l,
        effects: a,
        parentComponent: r,
        container: i
      } = y;
      if (y.isHydrating) y.isHydrating = !1;
      else if (!e) {
        const e = n && o.transition && "out-in" === o.transition.mode;
        e && (n.transition.afterLeave = () => {
          l === y.pendingId && p(o, i, t, 0)
        });
        let {
          anchor: t
        } = y;
        n && (t = v(n), f(n, r, y, !0)), e || p(o, i, t, 0)
      }
      fn(y, o), y.pendingBranch = null, y.isInFallback = !1;
      let s = y.parent,
        u = !1;
      for (; s;) {
        if (s.pendingBranch) {
          s.effects.push(...a), u = !0;
          break
        }
        s = s.parent
      }
      u || jt(a), y.effects = [], cn(t, "onResolve")
    },
    fallback(e) {
      if (!y.pendingBranch) return;
      const {
        vnode: t,
        activeBranch: n,
        parentComponent: o,
        container: l,
        isSVG: a
      } = y;
      cn(t, "onFallback");
      const r = v(n),
        u = () => {
          y.isInFallback && (d(null, e, l, r, o, null, a, i, s), fn(y, e))
        },
        c = e.transition && "out-in" === e.transition.mode;
      c && (n.transition.afterLeave = u), y.isInFallback = !0, f(n, o, null, !0), c || u()
    },
    move(e, t, n) {
      y.activeBranch && p(y.activeBranch, e, t, n), y.container = e
    },
    next: () => y.activeBranch && v(y.activeBranch),
    registerDep(e, t) {
      const n = !!y.pendingBranch;
      n && y.deps++;
      const o = e.vnode.el;
      e.asyncDep.catch((t => {
        Tt(t, e, 0)
      })).then((l => {
        if (e.isUnmounted || y.isUnmounted || y.pendingId !== e.suspenseId) return;
        e.asyncResolved = !0;
        const {
          vnode: a
        } = e;
        Ll(e, l, !1), o && (a.el = o);
        const i = !o && e.subTree.el;
        t(e, a, m(o || e.subTree.el), o ? null : v(e.subTree), y, r, s), i && h(i), sn(e, a.el), n && 0 == --y.deps && y.resolve()
      }))
    },
    unmount(e, t) {
      y.isUnmounted = !0, y.activeBranch && f(y.activeBranch, n, e, t), y.pendingBranch && f(y.pendingBranch, n, e, t)
    }
  };
  return y
}

function pn(e) {
  let t;
  if (O(e)) {
    const n = el && e._c;
    n && (e._d = !1, Zo()), e = e(), n && (e._d = !0, t = Jo, Yo())
  }
  if (A(e)) {
    const t = function(e) {
      let t;
      for (let n = 0; n < e.length; n++) {
        const o = e[n];
        if (!al(o)) return;
        if (o.type !== Qo || "v-if" === o.children) {
          if (t) return;
          t = o
        }
      }
      return t
    }(e);
    e = t
  }
  return e = ml(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t => t !== e))), e
}

function fn(e, t) {
  e.activeBranch = t;
  const {
    vnode: n,
    parentComponent: o
  } = e, l = n.el = t.el;
  o && o.subTree === n && (o.vnode.el = l, sn(o, l))
}

function vn(e, t) {
  if (kl) {
    let n = kl.provides;
    const o = kl.parent && kl.parent.provides;
    o === n && (n = kl.provides = Object.create(o)), n[e] = t
  } else;
}

function mn(e, t, n = !1) {
  const o = kl || Jt;
  if (o) {
    const l = null == o.parent ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
    if (l && e in l) return l[e];
    if (arguments.length > 1) return n && O(t) ? t.call(o.proxy) : t
  }
}
const hn = {};

function gn(e, t, n) {
  return yn(e, t, n)
}

function yn(e, t, {
  immediate: n,
  deep: o,
  flush: l,
  onTrack: a,
  onTrigger: r
} = h) {
  const i = kl;
  let s, u, c = !1,
    d = !1;
  if (yt(e) ? (s = () => e.value, c = ct(e)) : st(e) ? (s = () => e, o = !0) : A(e) ? (d = !0, c = e.some((e => st(e) || ct(e))), s = () => e.map((e => yt(e) ? e.value : st(e) ? wn(e) : O(e) ? At(e, i, 2) : void 0))) : s = O(e) ? t ? () => At(e, i, 2) : () => {
      if (!i || !i.isUnmounted) return u && u(), Lt(e, i, 3, [f])
    } : y, t && o) {
    const e = s;
    s = () => wn(e())
  }
  let p, f = e => {
    u = b.onStop = () => {
      At(e, i, 4)
    }
  };
  if (Al) {
    if (f = y, t ? n && Lt(t, i, 3, [s(), d ? [] : void 0, f]) : s(), "sync" !== l) return y;
    {
      const e = Ml();
      p = e.__watcherHandles || (e.__watcherHandles = [])
    }
  }
  let v = d ? new Array(e.length).fill(hn) : hn;
  const m = () => {
    if (b.active)
      if (t) {
        const e = b.run();
        (o || c || (d ? e.some(((e, t) => K(e, v[t]))) : K(e, v))) && (u && u(), Lt(t, i, 3, [e, v === hn ? void 0 : d && v[0] === hn ? [] : v, f]), v = e)
      } else b.run()
  };
  let g;
  m.allowRecurse = !!t, "sync" === l ? g = m : "post" === l ? g = () => zo(m, i && i.suspense) : (m.pre = !0, i && (m.id = i.uid), g = () => Nt(m));
  const b = new ce(s, g);
  t ? n ? m() : v = b.run() : "post" === l ? zo(b.run.bind(b), i && i.suspense) : b.run();
  const _ = () => {
    b.stop(), i && i.scope && S(i.scope.effects, b)
  };
  return p && p.push(_), _
}

function bn(e, t, n) {
  const o = this.proxy,
    l = R(e) ? e.includes(".") ? _n(o, e) : () => o[e] : e.bind(o, o);
  let a;
  O(t) ? a = t : (a = t.handler, n = t);
  const r = kl;
  Sl(this);
  const i = yn(l, a.bind(o), n);
  return r ? Sl(r) : Cl(), i
}

function _n(e, t) {
  const n = t.split(".");
  return () => {
    let t = e;
    for (let e = 0; e < n.length && t; e++) t = t[n[e]];
    return t
  }
}

function wn(e, t) {
  if (!V(e) || e.__v_skip) return e;
  if ((t = t || new Set).has(e)) return e;
  if (t.add(e), yt(e)) wn(e.value, t);
  else if (A(e))
    for (let n = 0; n < e.length; n++) wn(e[n], t);
  else if (T(e) || L(e)) e.forEach((e => {
    wn(e, t)
  }));
  else if (P(e))
    for (const n in e) wn(e[n], t);
  return e
}
const kn = [Function, Array],
  xn = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: kn,
      onEnter: kn,
      onAfterEnter: kn,
      onEnterCancelled: kn,
      onBeforeLeave: kn,
      onLeave: kn,
      onAfterLeave: kn,
      onLeaveCancelled: kn,
      onBeforeAppear: kn,
      onAppear: kn,
      onAfterAppear: kn,
      onAppearCancelled: kn
    },
    setup(e, {
      slots: t
    }) {
      const n = xl(),
        o = function() {
          const e = {
            isMounted: !1,
            isLeaving: !1,
            isUnmounting: !1,
            leavingVNodes: new Map
          };
          return Nn((() => {
            e.isMounted = !0
          })), Dn((() => {
            e.isUnmounting = !0
          })), e
        }();
      let l;
      return () => {
        const a = t.default && Tn(t.default(), !0);
        if (!a || !a.length) return;
        let r = a[0];
        if (a.length > 1)
          for (const e of a)
            if (e.type !== Qo) {
              r = e;
              break
            } const i = pt(e),
          {
            mode: s
          } = i;
        if (o.isLeaving) return En(r);
        const u = An(r);
        if (!u) return En(r);
        const c = Cn(u, i, o, n);
        Ln(u, c);
        const d = n.subTree,
          p = d && An(d);
        let f = !1;
        const {
          getTransitionKey: v
        } = u.type;
        if (v) {
          const e = v();
          void 0 === l ? l = e : e !== l && (l = e, f = !0)
        }
        if (p && p.type !== Qo && (!rl(u, p) || f)) {
          const e = Cn(p, i, o, n);
          if (Ln(p, e), "out-in" === s) return o.isLeaving = !0, e.afterLeave = () => {
            o.isLeaving = !1, !1 !== n.update.active && n.update()
          }, En(r);
          "in-out" === s && u.type !== Qo && (e.delayLeave = (e, t, n) => {
            Sn(o, p)[String(p.key)] = p, e._leaveCb = () => {
              t(), e._leaveCb = void 0, delete c.delayedLeave
            }, c.delayedLeave = n
          })
        }
        return r
      }
    }
  };

function Sn(e, t) {
  const {
    leavingVNodes: n
  } = e;
  let o = n.get(t.type);
  return o || (o = Object.create(null), n.set(t.type, o)), o
}

function Cn(e, t, n, o) {
  const {
    appear: l,
    mode: a,
    persisted: r = !1,
    onBeforeEnter: i,
    onEnter: s,
    onAfterEnter: u,
    onEnterCancelled: c,
    onBeforeLeave: d,
    onLeave: p,
    onAfterLeave: f,
    onLeaveCancelled: v,
    onBeforeAppear: m,
    onAppear: h,
    onAfterAppear: g,
    onAppearCancelled: y
  } = t, b = String(e.key), _ = Sn(n, e), w = (e, t) => {
    e && Lt(e, o, 9, t)
  }, k = (e, t) => {
    const n = t[1];
    w(e, t), A(e) ? e.every((e => e.length <= 1)) && n() : e.length <= 1 && n()
  }, x = {
    mode: a,
    persisted: r,
    beforeEnter(t) {
      let o = i;
      if (!n.isMounted) {
        if (!l) return;
        o = m || i
      }
      t._leaveCb && t._leaveCb(!0);
      const a = _[b];
      a && rl(e, a) && a.el._leaveCb && a.el._leaveCb(), w(o, [t])
    },
    enter(e) {
      let t = s,
        o = u,
        a = c;
      if (!n.isMounted) {
        if (!l) return;
        t = h || s, o = g || u, a = y || c
      }
      let r = !1;
      const i = e._enterCb = t => {
        r || (r = !0, w(t ? a : o, [e]), x.delayedLeave && x.delayedLeave(), e._enterCb = void 0)
      };
      t ? k(t, [e, i]) : i()
    },
    leave(t, o) {
      const l = String(e.key);
      if (t._enterCb && t._enterCb(!0), n.isUnmounting) return o();
      w(d, [t]);
      let a = !1;
      const r = t._leaveCb = n => {
        a || (a = !0, o(), w(n ? v : f, [t]), t._leaveCb = void 0, _[l] === e && delete _[l])
      };
      _[l] = e, p ? k(p, [t, r]) : r()
    },
    clone: e => Cn(e, t, n, o)
  };
  return x
}

function En(e) {
  if (qn(e)) return (e = pl(e)).children = null, e
}

function An(e) {
  return qn(e) ? e.children ? e.children[0] : void 0 : e
}

function Ln(e, t) {
  6 & e.shapeFlag && e.component ? Ln(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function Tn(e, t = !1, n) {
  let o = [],
    l = 0;
  for (let a = 0; a < e.length; a++) {
    let r = e[a];
    const i = null == n ? r.key : String(n) + String(null != r.key ? r.key : a);
    r.type === Wo ? (128 & r.patchFlag && l++, o = o.concat(Tn(r.children, t, i))) : (t || r.type !== Qo) && o.push(null != i ? pl(r, {
      key: i
    }) : r)
  }
  if (l > 1)
    for (let a = 0; a < o.length; a++) o[a].patchFlag = -2;
  return o
}

function On(e) {
  return O(e) ? {
    setup: e,
    name: e.name
  } : e
}
const Rn = e => !!e.type.__asyncLoader,
  qn = e => e.type.__isKeepAlive;

function Vn(e, t) {
  Fn(e, "a", t)
}

function Mn(e, t) {
  Fn(e, "da", t)
}

function Fn(e, t, n = kl) {
  const o = e.__wdc || (e.__wdc = () => {
    let t = n;
    for (; t;) {
      if (t.isDeactivated) return;
      t = t.parent
    }
    return e()
  });
  if (Pn(t, o, n), n) {
    let e = n.parent;
    for (; e && e.parent;) qn(e.parent.vnode) && zn(o, t, n, e), e = e.parent
  }
}

function zn(e, t, n, o) {
  const l = Pn(t, e, o, !0);
  Hn((() => {
    S(o[t], l)
  }), n)
}

function Pn(e, t, n = kl, o = !1) {
  if (n) {
    const l = n[e] || (n[e] = []),
      a = t.__weh || (t.__weh = (...o) => {
        if (n.isUnmounted) return;
        ve(), Sl(n);
        const l = Lt(t, n, e, o);
        return Cl(), me(), l
      });
    return o ? l.unshift(a) : l.push(a), a
  }
}
const Bn = e => (t, n = kl) => (!Al || "sp" === e) && Pn(e, ((...e) => t(...e)), n),
  In = Bn("bm"),
  Nn = Bn("m"),
  $n = Bn("bu"),
  jn = Bn("u"),
  Dn = Bn("bum"),
  Hn = Bn("um"),
  Un = Bn("sp"),
  Wn = Bn("rtg"),
  Kn = Bn("rtc");

function Qn(e, t = kl) {
  Pn("ec", e, t)
}

function Gn(e, t) {
  const n = Jt;
  if (null === n) return e;
  const o = Ol(n) || n.proxy,
    l = e.dirs || (e.dirs = []);
  for (let a = 0; a < t.length; a++) {
    let [e, n, r, i = h] = t[a];
    e && (O(e) && (e = {
      mounted: e,
      updated: e
    }), e.deep && wn(n), l.push({
      dir: e,
      instance: o,
      value: n,
      oldValue: void 0,
      arg: r,
      modifiers: i
    }))
  }
  return e
}

function Xn(e, t, n, o) {
  const l = e.dirs,
    a = t && t.dirs;
  for (let r = 0; r < l.length; r++) {
    const i = l[r];
    a && (i.oldValue = a[r].value);
    let s = i.dir[o];
    s && (ve(), Lt(s, n, 8, [e.el, i, e, t]), me())
  }
}

function Jn(e, t) {
  return function(e, t, n = !0, o = !1) {
    const l = Jt || kl;
    if (l) {
      const n = l.type;
      if ("components" === e) {
        const e = function(e, t = !0) {
          return O(e) ? e.displayName || e.name : e.name || t && e.__name
        }(n, !1);
        if (e && (e === t || e === j(t) || e === U(j(t)))) return n
      }
      const a = Yn(l[e] || n[e], t) || Yn(l.appContext[e], t);
      return !a && o ? n : a
    }
  }("components", e, !0, t) || e
}
const Zn = Symbol();

function Yn(e, t) {
  return e && (e[t] || e[j(t)] || e[U(j(t))])
}

function eo(e, t, n, o) {
  let l;
  const a = n && n[o];
  if (A(e) || R(e)) {
    l = new Array(e.length);
    for (let n = 0, o = e.length; n < o; n++) l[n] = t(e[n], n, void 0, a && a[n])
  } else if ("number" == typeof e) {
    l = new Array(e);
    for (let n = 0; n < e; n++) l[n] = t(n + 1, n, void 0, a && a[n])
  } else if (V(e))
    if (e[Symbol.iterator]) l = Array.from(e, ((e, n) => t(e, n, void 0, a && a[n])));
    else {
      const n = Object.keys(e);
      l = new Array(n.length);
      for (let o = 0, r = n.length; o < r; o++) {
        const r = n[o];
        l[o] = t(e[r], r, o, a && a[o])
      }
    }
  else l = [];
  return n && (n[o] = l), l
}

function to(e, t, n = {}, o, l) {
  if (Jt.isCE || Jt.parent && Rn(Jt.parent) && Jt.parent.isCE) return "default" !== t && (n.name = t), dl("slot", n, o && o());
  let a = e[t];
  a && a._c && (a._d = !1), Zo();
  const r = a && no(a(n)),
    i = ll(Wo, {
      key: n.key || r && r.key || `_${t}`
    }, r || (o ? o() : []), r && 1 === e._ ? 64 : -2);
  return !l && i.scopeId && (i.slotScopeIds = [i.scopeId + "-s"]), a && a._c && (a._d = !0), i
}

function no(e) {
  return e.some((e => !al(e) || e.type !== Qo && !(e.type === Wo && !no(e.children)))) ? e : null
}
const oo = e => e ? El(e) ? Ol(e) || e.proxy : oo(e.parent) : null,
  lo = x(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => oo(e.parent),
    $root: e => oo(e.root),
    $emit: e => e.emit,
    $options: e => po(e),
    $forceUpdate: e => e.f || (e.f = () => Nt(e.update)),
    $nextTick: e => e.n || (e.n = It.bind(e.proxy)),
    $watch: e => bn.bind(e)
  }),
  ao = (e, t) => e !== h && !e.__isScriptSetup && E(e, t),
  ro = {
    get({
      _: e
    }, t) {
      const {
        ctx: n,
        setupState: o,
        data: l,
        props: a,
        accessCache: r,
        type: i,
        appContext: s
      } = e;
      let u;
      if ("$" !== t[0]) {
        const i = r[t];
        if (void 0 !== i) switch (i) {
          case 1:
            return o[t];
          case 2:
            return l[t];
          case 4:
            return n[t];
          case 3:
            return a[t]
        } else {
          if (ao(o, t)) return r[t] = 1, o[t];
          if (l !== h && E(l, t)) return r[t] = 2, l[t];
          if ((u = e.propsOptions[0]) && E(u, t)) return r[t] = 3, a[t];
          if (n !== h && E(n, t)) return r[t] = 4, n[t];
          io && (r[t] = 0)
        }
      }
      const c = lo[t];
      let d, p;
      return c ? ("$attrs" === t && he(e, 0, t), c(e)) : (d = i.__cssModules) && (d = d[t]) ? d : n !== h && E(n, t) ? (r[t] = 4, n[t]) : (p = s.config.globalProperties, E(p, t) ? p[t] : void 0)
    },
    set({
      _: e
    }, t, n) {
      const {
        data: o,
        setupState: l,
        ctx: a
      } = e;
      return ao(l, t) ? (l[t] = n, !0) : o !== h && E(o, t) ? (o[t] = n, !0) : !E(e.props, t) && (("$" !== t[0] || !(t.slice(1) in e)) && (a[t] = n, !0))
    },
    has({
      _: {
        data: e,
        setupState: t,
        accessCache: n,
        ctx: o,
        appContext: l,
        propsOptions: a
      }
    }, r) {
      let i;
      return !!n[r] || e !== h && E(e, r) || ao(t, r) || (i = a[0]) && E(i, r) || E(o, r) || E(lo, r) || E(l.config.globalProperties, r)
    },
    defineProperty(e, t, n) {
      return null != n.get ? e._.accessCache[t] = 0 : E(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
  };
let io = !0;

function so(e) {
  const t = po(e),
    n = e.proxy,
    o = e.ctx;
  io = !1, t.beforeCreate && uo(t.beforeCreate, e, "bc");
  const {
    data: l,
    computed: a,
    methods: r,
    watch: i,
    provide: s,
    inject: u,
    created: c,
    beforeMount: d,
    mounted: p,
    beforeUpdate: f,
    updated: v,
    activated: m,
    deactivated: h,
    beforeDestroy: g,
    beforeUnmount: b,
    destroyed: _,
    unmounted: w,
    render: k,
    renderTracked: x,
    renderTriggered: S,
    errorCaptured: C,
    serverPrefetch: E,
    expose: L,
    inheritAttrs: T,
    components: R,
    directives: q,
    filters: M
  } = t;
  if (u && function(e, t, n = y, o = !1) {
      A(e) && (e = ho(e));
      for (const l in e) {
        const n = e[l];
        let a;
        a = V(n) ? "default" in n ? mn(n.from || l, n.default, !0) : mn(n.from || l) : mn(n), yt(a) && o ? Object.defineProperty(t, l, {
          enumerable: !0,
          configurable: !0,
          get: () => a.value,
          set: e => a.value = e
        }) : t[l] = a
      }
    }(u, o, null, e.appContext.config.unwrapInjectedRef), r)
    for (const y in r) {
      const e = r[y];
      O(e) && (o[y] = e.bind(n))
    }
  if (l) {
    const t = l.call(n, n);
    V(t) && (e.data = at(t))
  }
  if (io = !0, a)
    for (const A in a) {
      const e = a[A],
        t = O(e) ? e.bind(n, n) : O(e.get) ? e.get.bind(n, n) : y,
        l = !O(e) && O(e.set) ? e.set.bind(n) : y,
        r = Rl({
          get: t,
          set: l
        });
      Object.defineProperty(o, A, {
        enumerable: !0,
        configurable: !0,
        get: () => r.value,
        set: e => r.value = e
      })
    }
  if (i)
    for (const y in i) co(i[y], o, n, y);
  if (s) {
    const e = O(s) ? s.call(n) : s;
    Reflect.ownKeys(e).forEach((t => {
      vn(t, e[t])
    }))
  }

  function F(e, t) {
    A(t) ? t.forEach((t => e(t.bind(n)))) : t && e(t.bind(n))
  }
  if (c && uo(c, e, "c"), F(In, d), F(Nn, p), F($n, f), F(jn, v), F(Vn, m), F(Mn, h), F(Qn, C), F(Kn, x), F(Wn, S), F(Dn, b), F(Hn, w), F(Un, E), A(L))
    if (L.length) {
      const t = e.exposed || (e.exposed = {});
      L.forEach((e => {
        Object.defineProperty(t, e, {
          get: () => n[e],
          set: t => n[e] = t
        })
      }))
    } else e.exposed || (e.exposed = {});
  k && e.render === y && (e.render = k), null != T && (e.inheritAttrs = T), R && (e.components = R), q && (e.directives = q)
}

function uo(e, t, n) {
  Lt(A(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n)
}

function co(e, t, n, o) {
  const l = o.includes(".") ? _n(n, o) : () => n[o];
  if (R(e)) {
    const n = t[e];
    O(n) && gn(l, n)
  } else if (O(e)) gn(l, e.bind(n));
  else if (V(e))
    if (A(e)) e.forEach((e => co(e, t, n, o)));
    else {
      const o = O(e.handler) ? e.handler.bind(n) : t[e.handler];
      O(o) && gn(l, o, e)
    }
}

function po(e) {
  const t = e.type,
    {
      mixins: n,
      extends: o
    } = t,
    {
      mixins: l,
      optionsCache: a,
      config: {
        optionMergeStrategies: r
      }
    } = e.appContext,
    i = a.get(t);
  let s;
  return i ? s = i : l.length || n || o ? (s = {}, l.length && l.forEach((e => fo(s, e, r, !0))), fo(s, t, r)) : s = t, V(t) && a.set(t, s), s
}

function fo(e, t, n, o = !1) {
  const {
    mixins: l,
    extends: a
  } = t;
  a && fo(e, a, n, !0), l && l.forEach((t => fo(e, t, n, !0)));
  for (const r in t)
    if (o && "expose" === r);
    else {
      const o = vo[r] || n && n[r];
      e[r] = o ? o(e[r], t[r]) : t[r]
    } return e
}
const vo = {
  data: mo,
  props: yo,
  emits: yo,
  methods: yo,
  computed: yo,
  beforeCreate: go,
  created: go,
  beforeMount: go,
  mounted: go,
  beforeUpdate: go,
  updated: go,
  beforeDestroy: go,
  beforeUnmount: go,
  destroyed: go,
  unmounted: go,
  activated: go,
  deactivated: go,
  errorCaptured: go,
  serverPrefetch: go,
  components: yo,
  directives: yo,
  watch: function(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = x(Object.create(null), e);
    for (const o in t) n[o] = go(e[o], t[o]);
    return n
  },
  provide: mo,
  inject: function(e, t) {
    return yo(ho(e), ho(t))
  }
};

function mo(e, t) {
  return t ? e ? function() {
    return x(O(e) ? e.call(this, this) : e, O(t) ? t.call(this, this) : t)
  } : t : e
}

function ho(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t
  }
  return e
}

function go(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}

function yo(e, t) {
  return e ? x(x(Object.create(null), e), t) : t
}

function bo(e, t, n, o = !1) {
  const l = {},
    a = {};
  G(a, il, 1), e.propsDefaults = Object.create(null), _o(e, t, l, a);
  for (const r in e.propsOptions[0]) r in l || (l[r] = void 0);
  n ? e.props = o ? l : it(l, !1, qe, Ze, tt) : e.type.props ? e.props = l : e.props = a, e.attrs = a
}

function _o(e, t, n, o) {
  const [l, a] = e.propsOptions;
  let r, i = !1;
  if (t)
    for (let s in t) {
      if (I(s)) continue;
      const u = t[s];
      let c;
      l && E(l, c = j(s)) ? a && a.includes(c) ? (r || (r = {}))[c] = u : n[c] = u : Xt(e.emitsOptions, s) || s in o && u === o[s] || (o[s] = u, i = !0)
    }
  if (a) {
    const t = pt(n),
      o = r || h;
    for (let r = 0; r < a.length; r++) {
      const i = a[r];
      n[i] = wo(l, t, i, o[i], e, !E(o, i))
    }
  }
  return i
}

function wo(e, t, n, o, l, a) {
  const r = e[n];
  if (null != r) {
    const e = E(r, "default");
    if (e && void 0 === o) {
      const e = r.default;
      if (r.type !== Function && O(e)) {
        const {
          propsDefaults: a
        } = l;
        n in a ? o = a[n] : (Sl(l), o = a[n] = e.call(null, t), Cl())
      } else o = e
    }
    r[0] && (a && !e ? o = !1 : !r[1] || "" !== o && o !== H(n) || (o = !0))
  }
  return o
}

function ko(e, t, n = !1) {
  const o = t.propsCache,
    l = o.get(e);
  if (l) return l;
  const a = e.props,
    r = {},
    i = [];
  let s = !1;
  if (!O(e)) {
    const o = e => {
      s = !0;
      const [n, o] = ko(e, t, !0);
      x(r, n), o && i.push(...o)
    };
    !n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
  }
  if (!a && !s) return V(e) && o.set(e, g), g;
  if (A(a))
    for (let c = 0; c < a.length; c++) {
      const e = j(a[c]);
      xo(e) && (r[e] = h)
    } else if (a)
      for (const c in a) {
        const e = j(c);
        if (xo(e)) {
          const t = a[c],
            n = r[e] = A(t) || O(t) ? {
              type: t
            } : Object.assign({}, t);
          if (n) {
            const t = Eo(Boolean, n.type),
              o = Eo(String, n.type);
            n[0] = t > -1, n[1] = o < 0 || t < o, (t > -1 || E(n, "default")) && i.push(e)
          }
        }
      }
  const u = [r, i];
  return V(e) && o.set(e, u), u
}

function xo(e) {
  return "$" !== e[0]
}

function So(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : null === e ? "null" : ""
}

function Co(e, t) {
  return So(e) === So(t)
}

function Eo(e, t) {
  return A(t) ? t.findIndex((t => Co(t, e))) : O(t) && Co(t, e) ? 0 : -1
}
const Ao = e => "_" === e[0] || "$stable" === e,
  Lo = e => A(e) ? e.map(ml) : [ml(e)],
  To = (e, t, n) => {
    if (t._n) return t;
    const o = nn(((...e) => Lo(t(...e))), n);
    return o._c = !1, o
  },
  Oo = (e, t, n) => {
    const o = e._ctx;
    for (const l in e) {
      if (Ao(l)) continue;
      const n = e[l];
      if (O(n)) t[l] = To(0, n, o);
      else if (null != n) {
        const e = Lo(n);
        t[l] = () => e
      }
    }
  },
  Ro = (e, t) => {
    const n = Lo(t);
    e.slots.default = () => n
  };

function qo() {
  return {
    app: null,
    config: {
      isNativeTag: b,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}
let Vo = 0;

function Mo(e, t) {
  return function(n, o = null) {
    O(n) || (n = Object.assign({}, n)), null == o || V(o) || (o = null);
    const l = qo(),
      a = new Set;
    let r = !1;
    const i = l.app = {
      _uid: Vo++,
      _component: n,
      _props: o,
      _container: null,
      _context: l,
      _instance: null,
      version: Fl,
      get config() {
        return l.config
      },
      set config(e) {},
      use: (e, ...t) => (a.has(e) || (e && O(e.install) ? (a.add(e), e.install(i, ...t)) : O(e) && (a.add(e), e(i, ...t))), i),
      mixin: e => (l.mixins.includes(e) || l.mixins.push(e), i),
      component: (e, t) => t ? (l.components[e] = t, i) : l.components[e],
      directive: (e, t) => t ? (l.directives[e] = t, i) : l.directives[e],
      mount(a, s, u) {
        if (!r) {
          const c = dl(n, o);
          return c.appContext = l, s && t ? t(c, a) : e(c, a, u), r = !0, i._container = a, a.__vue_app__ = i, Ol(c.component) || c.component.proxy
        }
      },
      unmount() {
        r && (e(null, i._container), delete i._container.__vue_app__)
      },
      provide: (e, t) => (l.provides[e] = t, i)
    };
    return i
  }
}

function Fo(e, t, n, o, l = !1) {
  if (A(e)) return void e.forEach(((e, a) => Fo(e, t && (A(t) ? t[a] : t), n, o, l)));
  if (Rn(o) && !l) return;
  const a = 4 & o.shapeFlag ? Ol(o.component) || o.component.proxy : o.el,
    r = l ? null : a,
    {
      i: i,
      r: s
    } = e,
    u = t && t.r,
    c = i.refs === h ? i.refs = {} : i.refs,
    d = i.setupState;
  if (null != u && u !== s && (R(u) ? (c[u] = null, E(d, u) && (d[u] = null)) : yt(u) && (u.value = null)), O(s)) At(s, i, 12, [r, c]);
  else {
    const t = R(s),
      o = yt(s);
    if (t || o) {
      const i = () => {
        if (e.f) {
          const n = t ? E(d, s) ? d[s] : c[s] : s.value;
          l ? A(n) && S(n, a) : A(n) ? n.includes(a) || n.push(a) : t ? (c[s] = [a], E(d, s) && (d[s] = c[s])) : (s.value = [a], e.k && (c[e.k] = s.value))
        } else t ? (c[s] = r, E(d, s) && (d[s] = r)) : o && (s.value = r, e.k && (c[e.k] = r))
      };
      r ? (i.id = -1, zo(i, n)) : i()
    }
  }
}
const zo = function(e, t) {
  t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : jt(e)
};

function Po(e) {
  return function(e, t) {
    (J || (J = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})).__VUE__ = !0;
    const {
      insert: n,
      remove: o,
      patchProp: l,
      createElement: a,
      createText: r,
      createComment: i,
      setText: s,
      setElementText: u,
      parentNode: c,
      nextSibling: d,
      setScopeId: p = y,
      insertStaticContent: f
    } = e, v = (e, t, n, o = null, l = null, a = null, r = !1, i = null, s = !!t.dynamicChildren) => {
      if (e === t) return;
      e && !rl(e, t) && (o = te(e), W(e, l, a, !0), e = null), -2 === t.patchFlag && (s = !1, t.dynamicChildren = null);
      const {
        type: u,
        ref: c,
        shapeFlag: d
      } = t;
      switch (u) {
        case Ko:
          m(e, t, n, o);
          break;
        case Qo:
          b(e, t, n, o);
          break;
        case Go:
          null == e && _(t, n, o, r);
          break;
        case Wo:
          q(e, t, n, o, l, a, r, i, s);
          break;
        default:
          1 & d ? S(e, t, n, o, l, a, r, i, s) : 6 & d ? V(e, t, n, o, l, a, r, i, s) : (64 & d || 128 & d) && u.process(e, t, n, o, l, a, r, i, s, oe)
      }
      null != c && l && Fo(c, e && e.ref, a, t || e, !t)
    }, m = (e, t, o, l) => {
      if (null == e) n(t.el = r(t.children), o, l);
      else {
        const n = t.el = e.el;
        t.children !== e.children && s(n, t.children)
      }
    }, b = (e, t, o, l) => {
      null == e ? n(t.el = i(t.children || ""), o, l) : t.el = e.el
    }, _ = (e, t, n, o) => {
      [e.el, e.anchor] = f(e.children, t, n, o, e.el, e.anchor)
    }, w = ({
      el: e,
      anchor: t
    }, o, l) => {
      let a;
      for (; e && e !== t;) a = d(e), n(e, o, l), e = a;
      n(t, o, l)
    }, k = ({
      el: e,
      anchor: t
    }) => {
      let n;
      for (; e && e !== t;) n = d(e), o(e), e = n;
      o(t)
    }, S = (e, t, n, o, l, a, r, i, s) => {
      r = r || "svg" === t.type, null == e ? C(t, n, o, l, a, r, i, s) : T(e, t, l, a, r, i, s)
    }, C = (e, t, o, r, i, s, c, d) => {
      let p, f;
      const {
        type: v,
        props: m,
        shapeFlag: h,
        transition: g,
        dirs: y
      } = e;
      if (p = e.el = a(e.type, s, m && m.is, m), 8 & h ? u(p, e.children) : 16 & h && L(e.children, p, null, r, i, s && "foreignObject" !== v, c, d), y && Xn(e, null, r, "created"), m) {
        for (const t in m) "value" === t || I(t) || l(p, t, null, m[t], s, e.children, r, i, ee);
        "value" in m && l(p, "value", null, m.value), (f = m.onVnodeBeforeMount) && bl(f, r, e)
      }
      A(p, e, e.scopeId, c, r), y && Xn(e, null, r, "beforeMount");
      const b = (!i || i && !i.pendingBranch) && g && !g.persisted;
      b && g.beforeEnter(p), n(p, t, o), ((f = m && m.onVnodeMounted) || b || y) && zo((() => {
        f && bl(f, r, e), b && g.enter(p), y && Xn(e, null, r, "mounted")
      }), i)
    }, A = (e, t, n, o, l) => {
      if (n && p(e, n), o)
        for (let a = 0; a < o.length; a++) p(e, o[a]);
      if (l) {
        if (t === l.subTree) {
          const t = l.vnode;
          A(e, t, t.scopeId, t.slotScopeIds, l.parent)
        }
      }
    }, L = (e, t, n, o, l, a, r, i, s = 0) => {
      for (let u = s; u < e.length; u++) {
        const s = e[u] = i ? hl(e[u]) : ml(e[u]);
        v(null, s, t, n, o, l, a, r, i)
      }
    }, T = (e, t, n, o, a, r, i) => {
      const s = t.el = e.el;
      let {
        patchFlag: c,
        dynamicChildren: d,
        dirs: p
      } = t;
      c |= 16 & e.patchFlag;
      const f = e.props || h,
        v = t.props || h;
      let m;
      n && Bo(n, !1), (m = v.onVnodeBeforeUpdate) && bl(m, n, t, e), p && Xn(t, e, n, "beforeUpdate"), n && Bo(n, !0);
      const g = a && "foreignObject" !== t.type;
      if (d ? O(e.dynamicChildren, d, s, n, o, g, r) : i || N(e, t, s, null, n, o, g, r, !1), c > 0) {
        if (16 & c) R(s, t, f, v, n, o, a);
        else if (2 & c && f.class !== v.class && l(s, "class", null, v.class, a), 4 & c && l(s, "style", f.style, v.style, a), 8 & c) {
          const r = t.dynamicProps;
          for (let t = 0; t < r.length; t++) {
            const i = r[t],
              u = f[i],
              c = v[i];
            c === u && "value" !== i || l(s, i, u, c, a, e.children, n, o, ee)
          }
        }
        1 & c && e.children !== t.children && u(s, t.children)
      } else i || null != d || R(s, t, f, v, n, o, a);
      ((m = v.onVnodeUpdated) || p) && zo((() => {
        m && bl(m, n, t, e), p && Xn(t, e, n, "updated")
      }), o)
    }, O = (e, t, n, o, l, a, r) => {
      for (let i = 0; i < t.length; i++) {
        const s = e[i],
          u = t[i],
          d = s.el && (s.type === Wo || !rl(s, u) || 70 & s.shapeFlag) ? c(s.el) : n;
        v(s, u, d, null, o, l, a, r, !0)
      }
    }, R = (e, t, n, o, a, r, i) => {
      if (n !== o) {
        if (n !== h)
          for (const s in n) I(s) || s in o || l(e, s, n[s], null, i, t.children, a, r, ee);
        for (const s in o) {
          if (I(s)) continue;
          const u = o[s],
            c = n[s];
          u !== c && "value" !== s && l(e, s, c, u, i, t.children, a, r, ee)
        }
        "value" in o && l(e, "value", n.value, o.value)
      }
    }, q = (e, t, o, l, a, i, s, u, c) => {
      const d = t.el = e ? e.el : r(""),
        p = t.anchor = e ? e.anchor : r("");
      let {
        patchFlag: f,
        dynamicChildren: v,
        slotScopeIds: m
      } = t;
      m && (u = u ? u.concat(m) : m), null == e ? (n(d, o, l), n(p, o, l), L(t.children, o, p, a, i, s, u, c)) : f > 0 && 64 & f && v && e.dynamicChildren ? (O(e.dynamicChildren, v, o, a, i, s, u), (null != t.key || a && t === a.subTree) && Io(e, t, !0)) : N(e, t, o, p, a, i, s, u, c)
    }, V = (e, t, n, o, l, a, r, i, s) => {
      t.slotScopeIds = i, null == e ? 512 & t.shapeFlag ? l.ctx.activate(t, n, o, r, s) : F(t, n, o, l, a, r, s) : z(e, t, s)
    }, F = (e, t, n, o, l, a, r) => {
      const i = e.component = function(e, t, n) {
        const o = e.type,
          l = (t ? t.appContext : e.appContext) || _l,
          a = {
            uid: wl++,
            vnode: e,
            type: o,
            parent: t,
            appContext: l,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Y(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(l.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: ko(o, l),
            emitsOptions: Gt(o, l),
            emit: null,
            emitted: null,
            propsDefaults: h,
            inheritAttrs: o.inheritAttrs,
            ctx: h,
            data: h,
            props: h,
            attrs: h,
            slots: h,
            refs: h,
            setupState: h,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
          };
        a.ctx = {
          _: a
        }, a.root = t ? t.root : a, a.emit = Qt.bind(null, a), e.ce && e.ce(a);
        return a
      }(e, o, l);
      if (qn(e) && (i.ctx.renderer = oe), function(e, t = !1) {
          Al = t;
          const {
            props: n,
            children: o
          } = e.vnode, l = El(e);
          bo(e, n, l, t), ((e, t) => {
            if (32 & e.vnode.shapeFlag) {
              const n = t._;
              n ? (e.slots = pt(t), G(t, "_", n)) : Oo(t, e.slots = {})
            } else e.slots = {}, t && Ro(e, t);
            G(e.slots, il, 1)
          })(e, o);
          const a = l ? function(e, t) {
            const n = e.type;
            e.accessCache = Object.create(null), e.proxy = ft(new Proxy(e.ctx, ro));
            const {
              setup: o
            } = n;
            if (o) {
              const n = e.setupContext = o.length > 1 ? function(e) {
                const t = t => {
                  e.exposed = t || {}
                };
                let n;
                return {
                  get attrs() {
                    return n || (n = function(e) {
                      return new Proxy(e.attrs, {
                        get: (t, n) => (he(e, 0, "$attrs"), t[n])
                      })
                    }(e))
                  },
                  slots: e.slots,
                  emit: e.emit,
                  expose: t
                }
              }(e) : null;
              Sl(e), ve();
              const l = At(o, e, 0, [e.props, n]);
              if (me(), Cl(), M(l)) {
                if (l.then(Cl, Cl), t) return l.then((n => {
                  Ll(e, n, t)
                })).catch((t => {
                  Tt(t, e, 0)
                }));
                e.asyncDep = l
              } else Ll(e, l, t)
            } else Tl(e, t)
          }(e, t) : void 0;
          Al = !1
        }(i), i.asyncDep) {
        if (l && l.registerDep(i, P), !e.el) {
          const e = i.subTree = dl(Qo);
          b(null, e, t, n)
        }
      } else P(i, e, t, n, l, a, r)
    }, z = (e, t, n) => {
      const o = t.component = e.component;
      if (function(e, t, n) {
          const {
            props: o,
            children: l,
            component: a
          } = e, {
            props: r,
            children: i,
            patchFlag: s
          } = t, u = a.emitsOptions;
          if (t.dirs || t.transition) return !0;
          if (!(n && s >= 0)) return !(!l && !i || i && i.$stable) || o !== r && (o ? !r || rn(o, r, u) : !!r);
          if (1024 & s) return !0;
          if (16 & s) return o ? rn(o, r, u) : !!r;
          if (8 & s) {
            const e = t.dynamicProps;
            for (let t = 0; t < e.length; t++) {
              const n = e[t];
              if (r[n] !== o[n] && !Xt(u, n)) return !0
            }
          }
          return !1
        }(e, t, n)) {
        if (o.asyncDep && !o.asyncResolved) return void B(o, t, n);
        o.next = t,
          function(e) {
            const t = qt.indexOf(e);
            t > Vt && qt.splice(t, 1)
          }(o.update), o.update()
      } else t.el = e.el, o.vnode = t
    }, P = (e, t, n, o, l, a, r) => {
      const i = () => {
          if (e.isMounted) {
            let t, {
                next: n,
                bu: o,
                u: i,
                parent: s,
                vnode: u
              } = e,
              d = n;
            Bo(e, !1), n ? (n.el = u.el, B(e, n, r)) : n = u, o && Q(o), (t = n.props && n.props.onVnodeBeforeUpdate) && bl(t, s, n, u), Bo(e, !0);
            const p = on(e),
              f = e.subTree;
            e.subTree = p, v(f, p, c(f.el), te(f), e, l, a), n.el = p.el, null === d && sn(e, p.el), i && zo(i, l), (t = n.props && n.props.onVnodeUpdated) && zo((() => bl(t, s, n, u)), l)
          } else {
            let r;
            const {
              el: i,
              props: s
            } = t, {
              bm: u,
              m: c,
              parent: d
            } = e, p = Rn(t);
            if (Bo(e, !1), u && Q(u), !p && (r = s && s.onVnodeBeforeMount) && bl(r, d, t), Bo(e, !0), i && ae) {
              const n = () => {
                e.subTree = on(e), ae(i, e.subTree, e, l, null)
              };
              p ? t.type.__asyncLoader().then((() => !e.isUnmounted && n())) : n()
            } else {
              const r = e.subTree = on(e);
              v(null, r, n, o, e, l, a), t.el = r.el
            }
            if (c && zo(c, l), !p && (r = s && s.onVnodeMounted)) {
              const e = t;
              zo((() => bl(r, d, e)), l)
            }(256 & t.shapeFlag || d && Rn(d.vnode) && 256 & d.vnode.shapeFlag) && e.a && zo(e.a, l), e.isMounted = !0, t = n = o = null
          }
        },
        s = e.effect = new ce(i, (() => Nt(u)), e.scope),
        u = e.update = () => s.run();
      u.id = e.uid, Bo(e, !0), u()
    }, B = (e, t, n) => {
      t.component = e;
      const o = e.vnode.props;
      e.vnode = t, e.next = null,
        function(e, t, n, o) {
          const {
            props: l,
            attrs: a,
            vnode: {
              patchFlag: r
            }
          } = e, i = pt(l), [s] = e.propsOptions;
          let u = !1;
          if (!(o || r > 0) || 16 & r) {
            let o;
            _o(e, t, l, a) && (u = !0);
            for (const a in i) t && (E(t, a) || (o = H(a)) !== a && E(t, o)) || (s ? !n || void 0 === n[a] && void 0 === n[o] || (l[a] = wo(s, i, a, void 0, e, !0)) : delete l[a]);
            if (a !== i)
              for (const e in a) t && E(t, e) || (delete a[e], u = !0)
          } else if (8 & r) {
            const n = e.vnode.dynamicProps;
            for (let o = 0; o < n.length; o++) {
              let r = n[o];
              if (Xt(e.emitsOptions, r)) continue;
              const c = t[r];
              if (s)
                if (E(a, r)) c !== a[r] && (a[r] = c, u = !0);
                else {
                  const t = j(r);
                  l[t] = wo(s, i, t, c, e, !1)
                }
              else c !== a[r] && (a[r] = c, u = !0)
            }
          }
          u && ye(e, "set", "$attrs")
        }(e, t.props, o, n), ((e, t, n) => {
          const {
            vnode: o,
            slots: l
          } = e;
          let a = !0,
            r = h;
          if (32 & o.shapeFlag) {
            const e = t._;
            e ? n && 1 === e ? a = !1 : (x(l, t), n || 1 !== e || delete l._) : (a = !t.$stable, Oo(t, l)), r = t
          } else t && (Ro(e, t), r = {
            default: 1
          });
          if (a)
            for (const i in l) Ao(i) || i in r || delete l[i]
        })(e, t.children, n), ve(), Dt(), me()
    }, N = (e, t, n, o, l, a, r, i, s = !1) => {
      const c = e && e.children,
        d = e ? e.shapeFlag : 0,
        p = t.children,
        {
          patchFlag: f,
          shapeFlag: v
        } = t;
      if (f > 0) {
        if (128 & f) return void D(c, p, n, o, l, a, r, i, s);
        if (256 & f) return void $(c, p, n, o, l, a, r, i, s)
      }
      8 & v ? (16 & d && ee(c, l, a), p !== c && u(n, p)) : 16 & d ? 16 & v ? D(c, p, n, o, l, a, r, i, s) : ee(c, l, a, !0) : (8 & d && u(n, ""), 16 & v && L(p, n, o, l, a, r, i, s))
    }, $ = (e, t, n, o, l, a, r, i, s) => {
      t = t || g;
      const u = (e = e || g).length,
        c = t.length,
        d = Math.min(u, c);
      let p;
      for (p = 0; p < d; p++) {
        const o = t[p] = s ? hl(t[p]) : ml(t[p]);
        v(e[p], o, n, null, l, a, r, i, s)
      }
      u > c ? ee(e, l, a, !0, !1, d) : L(t, n, o, l, a, r, i, s, d)
    }, D = (e, t, n, o, l, a, r, i, s) => {
      let u = 0;
      const c = t.length;
      let d = e.length - 1,
        p = c - 1;
      for (; u <= d && u <= p;) {
        const o = e[u],
          c = t[u] = s ? hl(t[u]) : ml(t[u]);
        if (!rl(o, c)) break;
        v(o, c, n, null, l, a, r, i, s), u++
      }
      for (; u <= d && u <= p;) {
        const o = e[d],
          u = t[p] = s ? hl(t[p]) : ml(t[p]);
        if (!rl(o, u)) break;
        v(o, u, n, null, l, a, r, i, s), d--, p--
      }
      if (u > d) {
        if (u <= p) {
          const e = p + 1,
            d = e < c ? t[e].el : o;
          for (; u <= p;) v(null, t[u] = s ? hl(t[u]) : ml(t[u]), n, d, l, a, r, i, s), u++
        }
      } else if (u > p)
        for (; u <= d;) W(e[u], l, a, !0), u++;
      else {
        const f = u,
          m = u,
          h = new Map;
        for (u = m; u <= p; u++) {
          const e = t[u] = s ? hl(t[u]) : ml(t[u]);
          null != e.key && h.set(e.key, u)
        }
        let y, b = 0;
        const _ = p - m + 1;
        let w = !1,
          k = 0;
        const x = new Array(_);
        for (u = 0; u < _; u++) x[u] = 0;
        for (u = f; u <= d; u++) {
          const o = e[u];
          if (b >= _) {
            W(o, l, a, !0);
            continue
          }
          let c;
          if (null != o.key) c = h.get(o.key);
          else
            for (y = m; y <= p; y++)
              if (0 === x[y - m] && rl(o, t[y])) {
                c = y;
                break
              } void 0 === c ? W(o, l, a, !0) : (x[c - m] = u + 1, c >= k ? k = c : w = !0, v(o, t[c], n, null, l, a, r, i, s), b++)
        }
        const S = w ? function(e) {
          const t = e.slice(),
            n = [0];
          let o, l, a, r, i;
          const s = e.length;
          for (o = 0; o < s; o++) {
            const s = e[o];
            if (0 !== s) {
              if (l = n[n.length - 1], e[l] < s) {
                t[o] = l, n.push(o);
                continue
              }
              for (a = 0, r = n.length - 1; a < r;) i = a + r >> 1, e[n[i]] < s ? a = i + 1 : r = i;
              s < e[n[a]] && (a > 0 && (t[o] = n[a - 1]), n[a] = o)
            }
          }
          a = n.length, r = n[a - 1];
          for (; a-- > 0;) n[a] = r, r = t[r];
          return n
        }(x) : g;
        for (y = S.length - 1, u = _ - 1; u >= 0; u--) {
          const e = m + u,
            d = t[e],
            p = e + 1 < c ? t[e + 1].el : o;
          0 === x[u] ? v(null, d, n, p, l, a, r, i, s) : w && (y < 0 || u !== S[y] ? U(d, n, p, 2) : y--)
        }
      }
    }, U = (e, t, o, l, a = null) => {
      const {
        el: r,
        type: i,
        transition: s,
        children: u,
        shapeFlag: c
      } = e;
      if (6 & c) return void U(e.component.subTree, t, o, l);
      if (128 & c) return void e.suspense.move(t, o, l);
      if (64 & c) return void i.move(e, t, o, oe);
      if (i === Wo) {
        n(r, t, o);
        for (let e = 0; e < u.length; e++) U(u[e], t, o, l);
        return void n(e.anchor, t, o)
      }
      if (i === Go) return void w(e, t, o);
      if (2 !== l && 1 & c && s)
        if (0 === l) s.beforeEnter(r), n(r, t, o), zo((() => s.enter(r)), a);
        else {
          const {
            leave: e,
            delayLeave: l,
            afterLeave: a
          } = s, i = () => n(r, t, o), u = () => {
            e(r, (() => {
              i(), a && a()
            }))
          };
          l ? l(r, i, u) : u()
        }
      else n(r, t, o)
    }, W = (e, t, n, o = !1, l = !1) => {
      const {
        type: a,
        props: r,
        ref: i,
        children: s,
        dynamicChildren: u,
        shapeFlag: c,
        patchFlag: d,
        dirs: p
      } = e;
      if (null != i && Fo(i, null, n, e, !0), 256 & c) return void t.ctx.deactivate(e);
      const f = 1 & c && p,
        v = !Rn(e);
      let m;
      if (v && (m = r && r.onVnodeBeforeUnmount) && bl(m, t, e), 6 & c) Z(e.component, n, o);
      else {
        if (128 & c) return void e.suspense.unmount(n, o);
        f && Xn(e, null, t, "beforeUnmount"), 64 & c ? e.type.remove(e, t, n, l, oe, o) : u && (a !== Wo || d > 0 && 64 & d) ? ee(u, t, n, !1, !0) : (a === Wo && 384 & d || !l && 16 & c) && ee(s, t, n), o && K(e)
      }(v && (m = r && r.onVnodeUnmounted) || f) && zo((() => {
        m && bl(m, t, e), f && Xn(e, null, t, "unmounted")
      }), n)
    }, K = e => {
      const {
        type: t,
        el: n,
        anchor: l,
        transition: a
      } = e;
      if (t === Wo) return void X(n, l);
      if (t === Go) return void k(e);
      const r = () => {
        o(n), a && !a.persisted && a.afterLeave && a.afterLeave()
      };
      if (1 & e.shapeFlag && a && !a.persisted) {
        const {
          leave: t,
          delayLeave: o
        } = a, l = () => t(n, r);
        o ? o(e.el, r, l) : l()
      } else r()
    }, X = (e, t) => {
      let n;
      for (; e !== t;) n = d(e), o(e), e = n;
      o(t)
    }, Z = (e, t, n) => {
      const {
        bum: o,
        scope: l,
        update: a,
        subTree: r,
        um: i
      } = e;
      o && Q(o), l.stop(), a && (a.active = !1, W(r, e, t, n)), i && zo(i, t), zo((() => {
        e.isUnmounted = !0
      }), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
    }, ee = (e, t, n, o = !1, l = !1, a = 0) => {
      for (let r = a; r < e.length; r++) W(e[r], t, n, o, l)
    }, te = e => 6 & e.shapeFlag ? te(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : d(e.anchor || e.el), ne = (e, t, n) => {
      null == e ? t._vnode && W(t._vnode, null, null, !0) : v(t._vnode || null, e, t, null, null, null, n), Dt(), Ht(), t._vnode = e
    }, oe = {
      p: v,
      um: W,
      m: U,
      r: K,
      mt: F,
      mc: L,
      pc: N,
      pbc: O,
      n: te,
      o: e
    };
    let le, ae;
    t && ([le, ae] = t(oe));
    return {
      render: ne,
      hydrate: le,
      createApp: Mo(ne, le)
    }
  }(e)
}

function Bo({
  effect: e,
  update: t
}, n) {
  e.allowRecurse = t.allowRecurse = n
}

function Io(e, t, n = !1) {
  const o = e.children,
    l = t.children;
  if (A(o) && A(l))
    for (let a = 0; a < o.length; a++) {
      const e = o[a];
      let t = l[a];
      1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = l[a] = hl(l[a]), t.el = e.el), n || Io(e, t)), t.type === Ko && (t.el = e.el)
    }
}
const No = e => e && (e.disabled || "" === e.disabled),
  $o = e => "undefined" != typeof SVGElement && e instanceof SVGElement,
  jo = (e, t) => {
    const n = e && e.to;
    if (R(n)) {
      if (t) {
        return t(n)
      }
      return null
    }
    return n
  };

function Do(e, t, n, {
  o: {
    insert: o
  },
  m: l
}, a = 2) {
  0 === a && o(e.targetAnchor, t, n);
  const {
    el: r,
    anchor: i,
    shapeFlag: s,
    children: u,
    props: c
  } = e, d = 2 === a;
  if (d && o(r, t, n), (!d || No(c)) && 16 & s)
    for (let p = 0; p < u.length; p++) l(u[p], t, n, 2);
  d && o(i, t, n)
}
const Ho = {
  __isTeleport: !0,
  process(e, t, n, o, l, a, r, i, s, u) {
    const {
      mc: c,
      pc: d,
      pbc: p,
      o: {
        insert: f,
        querySelector: v,
        createText: m,
        createComment: h
      }
    } = u, g = No(t.props);
    let {
      shapeFlag: y,
      children: b,
      dynamicChildren: _
    } = t;
    if (null == e) {
      const e = t.el = m(""),
        u = t.anchor = m("");
      f(e, n, o), f(u, n, o);
      const d = t.target = jo(t.props, v),
        p = t.targetAnchor = m("");
      d && (f(p, d), r = r || $o(d));
      const h = (e, t) => {
        16 & y && c(b, e, t, l, a, r, i, s)
      };
      g ? h(n, u) : d && h(d, p)
    } else {
      t.el = e.el;
      const o = t.anchor = e.anchor,
        c = t.target = e.target,
        f = t.targetAnchor = e.targetAnchor,
        m = No(e.props),
        h = m ? n : c,
        y = m ? o : f;
      if (r = r || $o(c), _ ? (p(e.dynamicChildren, _, h, l, a, r, i), Io(e, t, !0)) : s || d(e, t, h, y, l, a, r, i, !1), g) m || Do(t, n, o, u, 1);
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const e = t.target = jo(t.props, v);
        e && Do(t, e, null, u, 0)
      } else m && Do(t, c, f, u, 1)
    }
    Uo(t)
  },
  remove(e, t, n, o, {
    um: l,
    o: {
      remove: a
    }
  }, r) {
    const {
      shapeFlag: i,
      children: s,
      anchor: u,
      targetAnchor: c,
      target: d,
      props: p
    } = e;
    if (d && a(c), (r || !No(p)) && (a(u), 16 & i))
      for (let f = 0; f < s.length; f++) {
        const e = s[f];
        l(e, t, n, !0, !!e.dynamicChildren)
      }
  },
  move: Do,
  hydrate: function(e, t, n, o, l, a, {
    o: {
      nextSibling: r,
      parentNode: i,
      querySelector: s
    }
  }, u) {
    const c = t.target = jo(t.props, s);
    if (c) {
      const s = c._lpa || c.firstChild;
      if (16 & t.shapeFlag)
        if (No(t.props)) t.anchor = u(r(e), t, i(e), n, o, l, a), t.targetAnchor = s;
        else {
          t.anchor = r(e);
          let i = s;
          for (; i;)
            if (i = r(i), i && 8 === i.nodeType && "teleport anchor" === i.data) {
              t.targetAnchor = i, c._lpa = t.targetAnchor && r(t.targetAnchor);
              break
            } u(s, t, c, n, o, l, a)
        } Uo(t)
    }
    return t.anchor && r(t.anchor)
  }
};

function Uo(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor;) 1 === n.nodeType && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut()
  }
}
const Wo = Symbol(void 0),
  Ko = Symbol(void 0),
  Qo = Symbol(void 0),
  Go = Symbol(void 0),
  Xo = [];
let Jo = null;

function Zo(e = !1) {
  Xo.push(Jo = e ? null : [])
}

function Yo() {
  Xo.pop(), Jo = Xo[Xo.length - 1] || null
}
let el = 1;

function tl(e) {
  el += e
}

function nl(e) {
  return e.dynamicChildren = el > 0 ? Jo || g : null, Yo(), el > 0 && Jo && Jo.push(e), e
}

function ol(e, t, n, o, l, a) {
  return nl(cl(e, t, n, o, l, a, !0))
}

function ll(e, t, n, o, l) {
  return nl(dl(e, t, n, o, l, !0))
}

function al(e) {
  return !!e && !0 === e.__v_isVNode
}

function rl(e, t) {
  return e.type === t.type && e.key === t.key
}
const il = "__vInternal",
  sl = ({
    key: e
  }) => null != e ? e : null,
  ul = ({
    ref: e,
    ref_key: t,
    ref_for: n
  }) => null != e ? R(e) || yt(e) || O(e) ? {
    i: Jt,
    r: e,
    k: t,
    f: !!n
  } : e : null;

function cl(e, t = null, n = null, o = 0, l = null, a = (e === Wo ? 0 : 1), r = !1, i = !1) {
  const s = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sl(t),
    ref: t && ul(t),
    scopeId: Zt,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: o,
    dynamicProps: l,
    dynamicChildren: null,
    appContext: null,
    ctx: Jt
  };
  return i ? (gl(s, n), 128 & a && e.normalize(s)) : n && (s.shapeFlag |= R(n) ? 8 : 16), el > 0 && !r && Jo && (s.patchFlag > 0 || 6 & a) && 32 !== s.patchFlag && Jo.push(s), s
}
const dl = function(e, t = null, n = null, o = 0, l = null, a = !1) {
  e && e !== Zn || (e = Qo);
  if (al(e)) {
    const o = pl(e, t, !0);
    return n && gl(o, n), el > 0 && !a && Jo && (6 & o.shapeFlag ? Jo[Jo.indexOf(e)] = o : Jo.push(o)), o.patchFlag |= -2, o
  }
  i = e, O(i) && "__vccOpts" in i && (e = e.__vccOpts);
  var i;
  if (t) {
    t = function(e) {
      return e ? dt(e) || il in e ? x({}, e) : e : null
    }(t);
    let {
      class: e,
      style: n
    } = t;
    e && !R(e) && (t.class = d(e)), V(n) && (dt(n) && !A(n) && (n = x({}, n)), t.style = r(n))
  }
  const s = R(e) ? 1 : (e => e.__isSuspense)(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : V(e) ? 4 : O(e) ? 2 : 0;
  return cl(e, t, n, o, l, s, a, !0)
};

function pl(e, t, n = !1) {
  const {
    props: o,
    ref: l,
    patchFlag: a,
    children: r
  } = e, i = t ? yl(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && sl(i),
    ref: t && t.ref ? n && l ? A(l) ? l.concat(ul(t)) : [l, ul(t)] : ul(t) : l,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Wo ? -1 === a ? 16 : 16 | a : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && pl(e.ssContent),
    ssFallback: e.ssFallback && pl(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  }
}

function fl(e = " ", t = 0) {
  return dl(Ko, null, e, t)
}

function vl(e = "", t = !1) {
  return t ? (Zo(), ll(Qo, null, e)) : dl(Qo, null, e)
}

function ml(e) {
  return null == e || "boolean" == typeof e ? dl(Qo) : A(e) ? dl(Wo, null, e.slice()) : "object" == typeof e ? hl(e) : dl(Ko, null, String(e))
}

function hl(e) {
  return null === e.el && -1 !== e.patchFlag || e.memo ? e : pl(e)
}

function gl(e, t) {
  let n = 0;
  const {
    shapeFlag: o
  } = e;
  if (null == t) t = null;
  else if (A(t)) n = 16;
  else if ("object" == typeof t) {
    if (65 & o) {
      const n = t.default;
      return void(n && (n._c && (n._d = !1), gl(e, n()), n._c && (n._d = !0)))
    } {
      n = 32;
      const o = t._;
      o || il in t ? 3 === o && Jt && (1 === Jt.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = Jt
    }
  } else O(t) ? (t = {
    default: t,
    _ctx: Jt
  }, n = 32) : (t = String(t), 64 & o ? (n = 16, t = [fl(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n
}

function yl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const e in o)
      if ("class" === e) t.class !== o.class && (t.class = d([t.class, o.class]));
      else if ("style" === e) t.style = r([t.style, o.style]);
    else if (w(e)) {
      const n = t[e],
        l = o[e];
      !l || n === l || A(n) && n.includes(l) || (t[e] = n ? [].concat(n, l) : l)
    } else "" !== e && (t[e] = o[e])
  }
  return t
}

function bl(e, t, n, o = null) {
  Lt(e, t, 7, [n, o])
}
const _l = qo();
let wl = 0;
let kl = null;
const xl = () => kl || Jt,
  Sl = e => {
    kl = e, e.scope.on()
  },
  Cl = () => {
    kl && kl.scope.off(), kl = null
  };

function El(e) {
  return 4 & e.vnode.shapeFlag
}
let Al = !1;

function Ll(e, t, n) {
  O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : V(t) && (e.setupState = St(t)), Tl(e, n)
}

function Tl(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || y), Sl(e), ve(), so(e), me(), Cl()
}

function Ol(e) {
  if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(St(ft(e.exposed)), {
    get: (t, n) => n in t ? t[n] : n in lo ? lo[n](e) : void 0,
    has: (e, t) => t in e || t in lo
  }))
}
const Rl = (e, t) => function(e, t, n = !1) {
  let o, l;
  const a = O(e);
  return a ? (o = e, l = y) : (o = e.get, l = e.set), new Et(o, l, a || !l, n)
}(e, 0, Al);

function ql(e, t, n) {
  const o = arguments.length;
  return 2 === o ? V(t) && !A(t) ? al(t) ? dl(e, null, [t]) : dl(e, t) : dl(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === o && al(n) && (n = [n]), dl(e, t, n))
}
const Vl = Symbol(""),
  Ml = () => mn(Vl),
  Fl = "3.2.45",
  zl = "undefined" != typeof document ? document : null,
  Pl = zl && zl.createElement("template"),
  Bl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e)
    },
    createElement: (e, t, n, o) => {
      const l = t ? zl.createElementNS("http://www.w3.org/2000/svg", e) : zl.createElement(e, n ? {
        is: n
      } : void 0);
      return "select" === e && o && null != o.multiple && l.setAttribute("multiple", o.multiple), l
    },
    createText: e => zl.createTextNode(e),
    createComment: e => zl.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => zl.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, o, l, a) {
      const r = n ? n.previousSibling : t.lastChild;
      if (l && (l === a || l.nextSibling))
        for (; t.insertBefore(l.cloneNode(!0), n), l !== a && (l = l.nextSibling););
      else {
        Pl.innerHTML = o ? `<svg>${e}</svg>` : e;
        const l = Pl.content;
        if (o) {
          const e = l.firstChild;
          for (; e.firstChild;) l.appendChild(e.firstChild);
          l.removeChild(e)
        }
        t.insertBefore(l, n)
      }
      return [r ? r.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  };
const Il = /\s*!important$/;

function Nl(e, t, n) {
  if (A(n)) n.forEach((n => Nl(e, t, n)));
  else if (null == n && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const o = function(e, t) {
      const n = jl[t];
      if (n) return n;
      let o = j(t);
      if ("filter" !== o && o in e) return jl[t] = o;
      o = U(o);
      for (let l = 0; l < $l.length; l++) {
        const n = $l[l] + o;
        if (n in e) return jl[t] = n
      }
      return t
    }(e, t);
    Il.test(n) ? e.setProperty(H(o), n.replace(Il, ""), "important") : e[o] = n
  }
}
const $l = ["Webkit", "Moz", "ms"],
  jl = {};
const Dl = "http://www.w3.org/1999/xlink";

function Hl(e, t, n, o, l = null) {
  const a = e._vei || (e._vei = {}),
    r = a[t];
  if (o && r) r.value = o;
  else {
    const [n, i] = function(e) {
      let t;
      if (Ul.test(e)) {
        let n;
        for (t = {}; n = e.match(Ul);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
      }
      return [":" === e[2] ? e.slice(3) : H(e.slice(2)), t]
    }(t);
    if (o) {
      const r = a[t] = function(e, t) {
        const n = e => {
          if (e._vts) {
            if (e._vts <= n.attached) return
          } else e._vts = Date.now();
          Lt(function(e, t) {
            if (A(t)) {
              const n = e.stopImmediatePropagation;
              return e.stopImmediatePropagation = () => {
                n.call(e), e._stopped = !0
              }, t.map((e => t => !t._stopped && e && e(t)))
            }
            return t
          }(e, n.value), t, 5, [e])
        };
        return n.value = e, n.attached = (() => Wl || (Kl.then((() => Wl = 0)), Wl = Date.now()))(), n
      }(o, l);
      ! function(e, t, n, o) {
        e.addEventListener(t, n, o)
      }(e, n, r, i)
    } else r && (! function(e, t, n, o) {
      e.removeEventListener(t, n, o)
    }(e, n, r, i), a[t] = void 0)
  }
}
const Ul = /(?:Once|Passive|Capture)$/;
let Wl = 0;
const Kl = Promise.resolve();
const Ql = /^on[a-z]/;
const Gl = "transition",
  Xl = (e, {
    slots: t
  }) => ql(xn, function(e) {
    const t = {};
    for (const x in e) x in Jl || (t[x] = e[x]);
    if (!1 === e.css) return t;
    const {
      name: n = "v",
      type: o,
      duration: l,
      enterFromClass: a = `${n}-enter-from`,
      enterActiveClass: r = `${n}-enter-active`,
      enterToClass: i = `${n}-enter-to`,
      appearFromClass: s = a,
      appearActiveClass: u = r,
      appearToClass: c = i,
      leaveFromClass: d = `${n}-leave-from`,
      leaveActiveClass: p = `${n}-leave-active`,
      leaveToClass: f = `${n}-leave-to`
    } = e, v = function(e) {
      if (null == e) return null;
      if (V(e)) return [ea(e.enter), ea(e.leave)];
      {
        const t = ea(e);
        return [t, t]
      }
    }(l), m = v && v[0], h = v && v[1], {
      onBeforeEnter: g,
      onEnter: y,
      onEnterCancelled: b,
      onLeave: _,
      onLeaveCancelled: w,
      onBeforeAppear: k = g,
      onAppear: S = y,
      onAppearCancelled: C = b
    } = t, E = (e, t, n) => {
      na(e, t ? c : i), na(e, t ? u : r), n && n()
    }, A = (e, t) => {
      e._isLeaving = !1, na(e, d), na(e, f), na(e, p), t && t()
    }, L = e => (t, n) => {
      const l = e ? S : y,
        r = () => E(t, e, n);
      Zl(l, [t, r]), oa((() => {
        na(t, e ? s : a), ta(t, e ? c : i), Yl(l) || aa(t, o, m, r)
      }))
    };
    return x(t, {
      onBeforeEnter(e) {
        Zl(g, [e]), ta(e, a), ta(e, r)
      },
      onBeforeAppear(e) {
        Zl(k, [e]), ta(e, s), ta(e, u)
      },
      onEnter: L(!1),
      onAppear: L(!0),
      onLeave(e, t) {
        e._isLeaving = !0;
        const n = () => A(e, t);
        ta(e, d), document.body.offsetHeight, ta(e, p), oa((() => {
          e._isLeaving && (na(e, d), ta(e, f), Yl(_) || aa(e, o, h, n))
        })), Zl(_, [e, n])
      },
      onEnterCancelled(e) {
        E(e, !1), Zl(b, [e])
      },
      onAppearCancelled(e) {
        E(e, !0), Zl(C, [e])
      },
      onLeaveCancelled(e) {
        A(e), Zl(w, [e])
      }
    })
  }(e), t);
Xl.displayName = "Transition";
const Jl = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Xl.props = x({}, xn.props, Jl);
const Zl = (e, t = []) => {
    A(e) ? e.forEach((e => e(...t))) : e && e(...t)
  },
  Yl = e => !!e && (A(e) ? e.some((e => e.length > 1)) : e.length > 1);

function ea(e) {
  return X(e)
}

function ta(e, t) {
  t.split(/\s+/).forEach((t => t && e.classList.add(t))), (e._vtc || (e._vtc = new Set)).add(t)
}

function na(e, t) {
  t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
  const {
    _vtc: n
  } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0))
}

function oa(e) {
  requestAnimationFrame((() => {
    requestAnimationFrame(e)
  }))
}
let la = 0;

function aa(e, t, n, o) {
  const l = e._endId = ++la,
    a = () => {
      l === e._endId && o()
    };
  if (n) return setTimeout(a, n);
  const {
    type: r,
    timeout: i,
    propCount: s
  } = function(e, t) {
    const n = window.getComputedStyle(e),
      o = e => (n[e] || "").split(", "),
      l = o("transitionDelay"),
      a = o("transitionDuration"),
      r = ra(l, a),
      i = o("animationDelay"),
      s = o("animationDuration"),
      u = ra(i, s);
    let c = null,
      d = 0,
      p = 0;
    t === Gl ? r > 0 && (c = Gl, d = r, p = a.length) : "animation" === t ? u > 0 && (c = "animation", d = u, p = s.length) : (d = Math.max(r, u), c = d > 0 ? r > u ? Gl : "animation" : null, p = c ? c === Gl ? a.length : s.length : 0);
    const f = c === Gl && /\b(transform|all)(,|$)/.test(o("transitionProperty").toString());
    return {
      type: c,
      timeout: d,
      propCount: p,
      hasTransform: f
    }
  }(e, t);
  if (!r) return o();
  const u = r + "end";
  let c = 0;
  const d = () => {
      e.removeEventListener(u, p), a()
    },
    p = t => {
      t.target === e && ++c >= s && d()
    };
  setTimeout((() => {
    c < s && d()
  }), i + 1), e.addEventListener(u, p)
}

function ra(e, t) {
  for (; e.length < t.length;) e = e.concat(e);
  return Math.max(...t.map(((t, n) => ia(t) + ia(e[n]))))
}

function ia(e) {
  return 1e3 * Number(e.slice(0, -1).replace(",", "."))
}
const sa = ["ctrl", "shift", "alt", "meta"],
  ua = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => "button" in e && 0 !== e.button,
    middle: e => "button" in e && 1 !== e.button,
    right: e => "button" in e && 2 !== e.button,
    exact: (e, t) => sa.some((n => e[`${n}Key`] && !t.includes(n)))
  },
  ca = {
    beforeMount(e, {
      value: t
    }, {
      transition: n
    }) {
      e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : da(e, t)
    },
    mounted(e, {
      value: t
    }, {
      transition: n
    }) {
      n && t && n.enter(e)
    },
    updated(e, {
      value: t,
      oldValue: n
    }, {
      transition: o
    }) {
      !t != !n && (o ? t ? (o.beforeEnter(e), da(e, !0), o.enter(e)) : o.leave(e, (() => {
        da(e, !1)
      })) : da(e, t))
    },
    beforeUnmount(e, {
      value: t
    }) {
      da(e, t)
    }
  };

function da(e, t) {
  e.style.display = t ? e._vod : "none"
}
const pa = x({
  patchProp: (e, t, n, o, l = !1, a, r, i, s) => {
    "class" === t ? function(e, t, n) {
      const o = e._vtc;
      o && (t = (t ? [t, ...o] : [...o]).join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
    }(e, o, l) : "style" === t ? function(e, t, n) {
      const o = e.style,
        l = R(n);
      if (n && !l) {
        for (const e in n) Nl(o, e, n[e]);
        if (t && !R(t))
          for (const e in t) null == n[e] && Nl(o, e, "")
      } else {
        const a = o.display;
        l ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o.display = a)
      }
    }(e, n, o) : w(t) ? k(t) || Hl(e, t, 0, o, r) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : function(e, t, n, o) {
      if (o) return "innerHTML" === t || "textContent" === t || !!(t in e && Ql.test(t) && O(n));
      if ("spellcheck" === t || "draggable" === t || "translate" === t) return !1;
      if ("form" === t) return !1;
      if ("list" === t && "INPUT" === e.tagName) return !1;
      if ("type" === t && "TEXTAREA" === e.tagName) return !1;
      if (Ql.test(t) && R(n)) return !1;
      return t in e
    }(e, t, o, l)) ? function(e, t, n, o, l, a, r) {
      if ("innerHTML" === t || "textContent" === t) return o && r(o, l, a), void(e[t] = null == n ? "" : n);
      if ("value" === t && "PROGRESS" !== e.tagName && !e.tagName.includes("-")) {
        e._value = n;
        const o = null == n ? "" : n;
        return e.value === o && "OPTION" !== e.tagName || (e.value = o), void(null == n && e.removeAttribute(t))
      }
      let i = !1;
      if ("" === n || null == n) {
        const o = typeof e[t];
        "boolean" === o ? n = f(n) : null == n && "string" === o ? (n = "", i = !0) : "number" === o && (n = 0, i = !0)
      }
      try {
        e[t] = n
      } catch (s) {}
      i && e.removeAttribute(t)
    }(e, t, o, a, r, i, s) : ("true-value" === t ? e._trueValue = o : "false-value" === t && (e._falseValue = o), function(e, t, n, o, l) {
      if (o && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(Dl, t.slice(6, t.length)) : e.setAttributeNS(Dl, t, n);
      else {
        const o = p(t);
        null == n || o && !f(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
      }
    }(e, t, o, l))
  }
}, Bl);
let fa;

function va() {
  return fa || (fa = Po(pa))
}
let ma, ha = 0;
const ga = new Array(256);
for (let Rm = 0; Rm < 256; Rm++) ga[Rm] = (Rm + 256).toString(16).substring(1);
const ya = (() => {
  const e = "undefined" != typeof crypto ? crypto : "undefined" != typeof window ? window.crypto || window.msCrypto : void 0;
  if (void 0 !== e) {
    if (void 0 !== e.randomBytes) return e.randomBytes;
    if (void 0 !== e.getRandomValues) return t => {
      const n = new Uint8Array(t);
      return e.getRandomValues(n), n
    }
  }
  return e => {
    const t = [];
    for (let n = e; n > 0; n--) t.push(Math.floor(256 * Math.random()));
    return t
  }
})();

function ba() {
  (void 0 === ma || ha + 16 > 4096) && (ha = 0, ma = ya(4096));
  const e = Array.prototype.slice.call(ma, ha, ha += 16);
  return e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, ga[e[0]] + ga[e[1]] + ga[e[2]] + ga[e[3]] + "-" + ga[e[4]] + ga[e[5]] + "-" + ga[e[6]] + ga[e[7]] + "-" + ga[e[8]] + ga[e[9]] + "-" + ga[e[10]] + ga[e[11]] + ga[e[12]] + ga[e[13]] + ga[e[14]] + ga[e[15]]
}
var _a, wa = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
  ka = {
    exports: {}
  },
  xa = "object" == typeof Reflect ? Reflect : null,
  Sa = xa && "function" == typeof xa.apply ? xa.apply : function(e, t, n) {
    return Function.prototype.apply.call(e, t, n)
  };
_a = xa && "function" == typeof xa.ownKeys ? xa.ownKeys : Object.getOwnPropertySymbols ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
} : function(e) {
  return Object.getOwnPropertyNames(e)
};
var Ca = Number.isNaN || function(e) {
  return e != e
};

function Ea() {
  Ea.init.call(this)
}
ka.exports = Ea, ka.exports.once = function(e, t) {
  return new Promise((function(n, o) {
    function l(n) {
      e.removeListener(t, a), o(n)
    }

    function a() {
      "function" == typeof e.removeListener && e.removeListener("error", l), n([].slice.call(arguments))
    }
    za(e, t, a, {
      once: !0
    }), "error" !== t && function(e, t, n) {
      "function" == typeof e.on && za(e, "error", t, n)
    }(e, l, {
      once: !0
    })
  }))
}, Ea.EventEmitter = Ea, Ea.prototype._events = void 0, Ea.prototype._eventsCount = 0, Ea.prototype._maxListeners = void 0;
var Aa = 10;

function La(e) {
  if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
}

function Ta(e) {
  return void 0 === e._maxListeners ? Ea.defaultMaxListeners : e._maxListeners
}

function Oa(e, t, n, o) {
  var l, a, r, i;
  if (La(n), void 0 === (a = e._events) ? (a = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== a.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), a = e._events), r = a[t]), void 0 === r) r = a[t] = n, ++e._eventsCount;
  else if ("function" == typeof r ? r = a[t] = o ? [n, r] : [r, n] : o ? r.unshift(n) : r.push(n), (l = Ta(e)) > 0 && r.length > l && !r.warned) {
    r.warned = !0;
    var s = new Error("Possible EventEmitter memory leak detected. " + r.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    s.name = "MaxListenersExceededWarning", s.emitter = e, s.type = t, s.count = r.length, i = s, console && console.warn && console.warn(i)
  }
  return e
}

function Ra() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
}

function qa(e, t, n) {
  var o = {
      fired: !1,
      wrapFn: void 0,
      target: e,
      type: t,
      listener: n
    },
    l = Ra.bind(o);
  return l.listener = n, o.wrapFn = l, l
}

function Va(e, t, n) {
  var o = e._events;
  if (void 0 === o) return [];
  var l = o[t];
  return void 0 === l ? [] : "function" == typeof l ? n ? [l.listener || l] : [l] : n ? function(e) {
    for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
    return t
  }(l) : Fa(l, l.length)
}

function Ma(e) {
  var t = this._events;
  if (void 0 !== t) {
    var n = t[e];
    if ("function" == typeof n) return 1;
    if (void 0 !== n) return n.length
  }
  return 0
}

function Fa(e, t) {
  for (var n = new Array(t), o = 0; o < t; ++o) n[o] = e[o];
  return n
}

function za(e, t, n, o) {
  if ("function" == typeof e.on) o.once ? e.once(t, n) : e.on(t, n);
  else {
    if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
    e.addEventListener(t, (function l(a) {
      o.once && e.removeEventListener(t, l), n(a)
    }))
  }
}
Object.defineProperty(Ea, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Aa
  },
  set: function(e) {
    if ("number" != typeof e || e < 0 || Ca(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Aa = e
  }
}), Ea.init = function() {
  void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
}, Ea.prototype.setMaxListeners = function(e) {
  if ("number" != typeof e || e < 0 || Ca(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this
}, Ea.prototype.getMaxListeners = function() {
  return Ta(this)
}, Ea.prototype.emit = function(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
  var o = "error" === e,
    l = this._events;
  if (void 0 !== l) o = o && void 0 === l.error;
  else if (!o) return !1;
  if (o) {
    var a;
    if (t.length > 0 && (a = t[0]), a instanceof Error) throw a;
    var r = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw r.context = a, r
  }
  var i = l[e];
  if (void 0 === i) return !1;
  if ("function" == typeof i) Sa(i, this, t);
  else {
    var s = i.length,
      u = Fa(i, s);
    for (n = 0; n < s; ++n) Sa(u[n], this, t)
  }
  return !0
}, Ea.prototype.addListener = function(e, t) {
  return Oa(this, e, t, !1)
}, Ea.prototype.on = Ea.prototype.addListener, Ea.prototype.prependListener = function(e, t) {
  return Oa(this, e, t, !0)
}, Ea.prototype.once = function(e, t) {
  return La(t), this.on(e, qa(this, e, t)), this
}, Ea.prototype.prependOnceListener = function(e, t) {
  return La(t), this.prependListener(e, qa(this, e, t)), this
}, Ea.prototype.removeListener = function(e, t) {
  var n, o, l, a, r;
  if (La(t), void 0 === (o = this._events)) return this;
  if (void 0 === (n = o[e])) return this;
  if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete o[e], o.removeListener && this.emit("removeListener", e, n.listener || t));
  else if ("function" != typeof n) {
    for (l = -1, a = n.length - 1; a >= 0; a--)
      if (n[a] === t || n[a].listener === t) {
        r = n[a].listener, l = a;
        break
      } if (l < 0) return this;
    0 === l ? n.shift() : function(e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop()
    }(n, l), 1 === n.length && (o[e] = n[0]), void 0 !== o.removeListener && this.emit("removeListener", e, r || t)
  }
  return this
}, Ea.prototype.off = Ea.prototype.removeListener, Ea.prototype.removeAllListeners = function(e) {
  var t, n, o;
  if (void 0 === (n = this._events)) return this;
  if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this;
  if (0 === arguments.length) {
    var l, a = Object.keys(n);
    for (o = 0; o < a.length; ++o) "removeListener" !== (l = a[o]) && this.removeAllListeners(l);
    return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
  }
  if ("function" == typeof(t = n[e])) this.removeListener(e, t);
  else if (void 0 !== t)
    for (o = t.length - 1; o >= 0; o--) this.removeListener(e, t[o]);
  return this
}, Ea.prototype.listeners = function(e) {
  return Va(this, e, !0)
}, Ea.prototype.rawListeners = function(e) {
  return Va(this, e, !1)
}, Ea.listenerCount = function(e, t) {
  return "function" == typeof e.listenerCount ? e.listenerCount(t) : Ma.call(e, t)
}, Ea.prototype.listenerCount = Ma, Ea.prototype.eventNames = function() {
  return this._eventsCount > 0 ? _a(this._events) : []
};
const Pa = {
    undefined: () => 0,
    boolean: () => 4,
    number: () => 8,
    string: e => 2 * e.length,
    object: e => e ? Object.keys(e).reduce(((t, n) => Ba(n) + Ba(e[n]) + t), 0) : 0
  },
  Ba = e => Pa[typeof e](e);
class Ia extends ka.exports.EventEmitter {
  constructor(e) {
    super(), this.setMaxListeners(1 / 0), this.wall = e, e.listen((e => {
      Array.isArray(e) ? e.forEach((e => this._emit(e))) : this._emit(e)
    })), this._sendingQueue = [], this._sending = !1, this._maxMessageSize = 33554432
  }
  send(e, t) {
    return this._send([{
      event: e,
      payload: t
    }])
  }
  getEvents() {
    return this._events
  }
  on(e, t) {
    return super.on(e, (e => {
      t({
        ...e,
        respond: t => this.send(e.eventResponseKey, t)
      })
    }))
  }
  _emit(e) {
    "string" == typeof e ? this.emit(e) : this.emit(e.event, e.payload)
  }
  _send(e) {
    return this._sendingQueue.push(e), this._nextSend()
  }
  _nextSend() {
    if (!this._sendingQueue.length || this._sending) return Promise.resolve();
    this._sending = !0;
    const e = this._sendingQueue.shift(),
      t = e[0],
      n = `${t.event}.${ba()}` + ".result";
    return new Promise(((o, l) => {
      let a = [];
      const r = e => {
        if (void 0 !== e && e._chunkSplit) {
          const t = e._chunkSplit;
          a = [...a, ...e.data], t.lastChunk && (this.off(n, r), o(a))
        } else this.off(n, r), o(e)
      };
      this.on(n, r);
      try {
        const t = e.map((e => ({
          ...e,
          payload: {
            data: e.payload,
            eventResponseKey: n
          }
        })));
        this.wall.send(t)
      } catch (i) {
        const e = "Message length exceeded maximum allowed length.";
        if (i.message === e)
          if (Array.isArray(t.payload)) {
            const e = Ba(t);
            if (e > this._maxMessageSize) {
              const n = Math.ceil(e / this._maxMessageSize),
                o = Math.ceil(t.payload.length / n);
              let l = t.payload;
              for (let e = 0; e < n; e++) {
                let a = Math.min(l.length, o);
                this.wall.send([{
                  event: t.event,
                  payload: {
                    _chunkSplit: {
                      count: n,
                      lastChunk: e === n - 1
                    },
                    data: l.splice(0, a)
                  }
                }])
              }
            }
          } else;
      }
      this._sending = !1, setTimeout((() => this._nextSend()), 16)
    }))
  }
}

function Na(e, t, n, o) {
  return Object.defineProperty(e, t, {
    get: n,
    set: o,
    enumerable: !0
  }), e
}
const $a = bt(!1);
let ja;
const Da = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
const Ha = navigator.userAgent || navigator.vendor || window.opera,
  Ua = {
    has: {
      touch: !1,
      webStorage: !1
    },
    within: {
      iframe: !1
    }
  },
  Wa = {
    userAgent: Ha,
    is: function(e) {
      const t = e.toLowerCase(),
        n = function(e) {
          return /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(silk)/.exec(e) || /(android)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || /(playbook)/.exec(e) || /(bb)/.exec(e) || /(blackberry)/.exec(e) || []
        }(t),
        o = function(e, t) {
          const n = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(vivaldi)[\/]([\w.]+)/.exec(e) || /(chrome|crios)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(firefox|fxios)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) || [];
          return {
            browser: n[5] || n[3] || n[1] || "",
            version: n[2] || n[4] || "0",
            versionNumber: n[4] || n[2] || "0",
            platform: t[0] || ""
          }
        }(t, n),
        l = {};
      o.browser && (l[o.browser] = !0, l.version = o.version, l.versionNumber = parseInt(o.versionNumber, 10)), o.platform && (l[o.platform] = !0);
      const a = l.android || l.ios || l.bb || l.blackberry || l.ipad || l.iphone || l.ipod || l.kindle || l.playbook || l.silk || l["windows phone"];
      return !0 === a || t.indexOf("mobile") > -1 ? (l.mobile = !0, l.edga || l.edgios ? (l.edge = !0, o.browser = "edge") : l.crios ? (l.chrome = !0, o.browser = "chrome") : l.fxios && (l.firefox = !0, o.browser = "firefox")) : l.desktop = !0, (l.ipod || l.ipad || l.iphone) && (l.ios = !0), l["windows phone"] && (l.winphone = !0, delete l["windows phone"]), (l.chrome || l.opr || l.safari || l.vivaldi || !0 === l.mobile && !0 !== l.ios && !0 !== a) && (l.webkit = !0), l.edg && (o.browser = "edgechromium", l.edgeChromium = !0), (l.safari && l.blackberry || l.bb) && (o.browser = "blackberry", l.blackberry = !0), l.safari && l.playbook && (o.browser = "playbook", l.playbook = !0), l.opr && (o.browser = "opera", l.opera = !0), l.safari && l.android && (o.browser = "android", l.android = !0), l.safari && l.kindle && (o.browser = "kindle", l.kindle = !0), l.safari && l.silk && (o.browser = "silk", l.silk = !0), l.vivaldi && (o.browser = "vivaldi", l.vivaldi = !0), l.name = o.browser, l.platform = o.platform, t.indexOf("electron") > -1 ? l.electron = !0 : document.location.href.indexOf("-extension://") > -1 ? l.bex = !0 : (void 0 !== window.Capacitor ? (l.capacitor = !0, l.nativeMobile = !0, l.nativeMobileWrapper = "capacitor") : void 0 === window._cordovaNative && void 0 === window.cordova || (l.cordova = !0, l.nativeMobile = !0, l.nativeMobileWrapper = "cordova"), !0 === Da && !0 === l.mac && (!0 === l.desktop && !0 === l.safari || !0 === l.nativeMobile && !0 !== l.android && !0 !== l.ios && !0 !== l.ipad) && function(e) {
        ja = {
          is: {
            ...e
          }
        }, delete e.mac, delete e.desktop;
        const t = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
        Object.assign(e, {
          mobile: !0,
          ios: !0,
          platform: t,
          [t]: !0
        })
      }(l)), l
    }(Ha),
    has: {
      touch: Da
    },
    within: {
      iframe: window.self !== window.top
    }
  },
  Ka = {
    install(e) {
      const {
        $q: t
      } = e;
      !0 === $a.value ? (e.onSSRHydrated.push((() => {
        Object.assign(t.platform, Wa), $a.value = !1, ja = void 0
      })), t.platform = at(this)) : t.platform = this
    }
  };
{
  let e;
  Na(Wa.has, "webStorage", (() => {
    if (void 0 !== e) return e;
    try {
      if (window.localStorage) return e = !0, !0
    } catch (t) {}
    return e = !1, !1
  })), !0 === Wa.is.ios && window.navigator.vendor.toLowerCase().indexOf("apple"), !0 === $a.value ? Object.assign(Ka, Wa, ja, Ua) : Object.assign(Ka, Wa)
}
var Qa = (e, t) => {
  const n = at(e);
  for (const o in e) Na(t, o, (() => n[o]), (e => {
    n[o] = e
  }));
  return t
};
const Ga = {
  hasPassive: !1,
  passiveCapture: !0,
  notPassiveCapture: !0
};
try {
  const e = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(Ga, {
        hasPassive: !0,
        passive: {
          passive: !0
        },
        notPassive: {
          passive: !1
        },
        passiveCapture: {
          passive: !0,
          capture: !0
        },
        notPassiveCapture: {
          passive: !1,
          capture: !0
        }
      })
    }
  });
  window.addEventListener("qtest", null, e), window.removeEventListener("qtest", null, e)
} catch (Om) {}

function Xa() {}

function Ja(e) {
  return e.touches && e.touches[0] ? e = e.touches[0] : e.changedTouches && e.changedTouches[0] ? e = e.changedTouches[0] : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]), {
    top: e.clientY,
    left: e.clientX
  }
}

function Za(e) {
  e.stopPropagation()
}

function Ya(e) {
  !1 !== e.cancelable && e.preventDefault()
}

function er(e) {
  !1 !== e.cancelable && e.preventDefault(), e.stopPropagation()
}

function tr(e, t, n) {
  const o = `__q_${t}_evt`;
  e[o] = void 0 !== e[o] ? e[o].concat(n) : n, n.forEach((t => {
    t[0].addEventListener(t[1], e[t[2]], Ga[t[3]])
  }))
}

function nr(e, t) {
  const n = `__q_${t}_evt`;
  void 0 !== e[n] && (e[n].forEach((t => {
    t[0].removeEventListener(t[1], e[t[2]], Ga[t[3]])
  })), e[n] = void 0)
}

function or(e, t = 250, n) {
  let o = null;

  function l() {
    const l = arguments,
      a = () => {
        o = null, !0 !== n && e.apply(this, l)
      };
    null !== o ? clearTimeout(o) : !0 === n && e.apply(this, l), o = setTimeout(a, t)
  }
  return l.cancel = () => {
    null !== o && clearTimeout(o)
  }, l
}
const lr = ["sm", "md", "lg", "xl"],
  {
    passive: ar
  } = Ga;
var rr = Qa({
  width: 0,
  height: 0,
  name: "xs",
  sizes: {
    sm: 600,
    md: 1024,
    lg: 1440,
    xl: 1920
  },
  lt: {
    sm: !0,
    md: !0,
    lg: !0,
    xl: !0
  },
  gt: {
    xs: !1,
    sm: !1,
    md: !1,
    lg: !1
  },
  xs: !0,
  sm: !1,
  md: !1,
  lg: !1,
  xl: !1
}, {
  setSizes: Xa,
  setDebounce: Xa,
  install({
    $q: e,
    onSSRHydrated: t
  }) {
    if (e.screen = this, !0 === this.__installed) return void(void 0 !== e.config.screen && (!1 === e.config.screen.bodyClasses ? document.body.classList.remove(`screen--${this.name}`) : this.__update(!0)));
    const {
      visualViewport: n
    } = window, o = n || window, l = document.scrollingElement || document.documentElement, a = void 0 === n || !0 === Wa.is.mobile ? () => [Math.max(window.innerWidth, l.clientWidth), Math.max(window.innerHeight, l.clientHeight)] : () => [n.width * n.scale + window.innerWidth - l.clientWidth, n.height * n.scale + window.innerHeight - l.clientHeight], r = void 0 !== e.config.screen && !0 === e.config.screen.bodyClasses;
    this.__update = e => {
      const [t, n] = a();
      if (n !== this.height && (this.height = n), t !== this.width) this.width = t;
      else if (!0 !== e) return;
      let o = this.sizes;
      this.gt.xs = t >= o.sm, this.gt.sm = t >= o.md, this.gt.md = t >= o.lg, this.gt.lg = t >= o.xl, this.lt.sm = t < o.sm, this.lt.md = t < o.md, this.lt.lg = t < o.lg, this.lt.xl = t < o.xl, this.xs = this.lt.sm, this.sm = !0 === this.gt.xs && !0 === this.lt.md, this.md = !0 === this.gt.sm && !0 === this.lt.lg, this.lg = !0 === this.gt.md && !0 === this.lt.xl, this.xl = this.gt.lg, o = (!0 === this.xs ? "xs" : !0 === this.sm && "sm") || !0 === this.md && "md" || !0 === this.lg && "lg" || "xl", o !== this.name && (!0 === r && (document.body.classList.remove(`screen--${this.name}`), document.body.classList.add(`screen--${o}`)), this.name = o)
    };
    let i, s = {},
      u = 16;
    this.setSizes = e => {
      lr.forEach((t => {
        void 0 !== e[t] && (s[t] = e[t])
      }))
    }, this.setDebounce = e => {
      u = e
    };
    const c = () => {
      const e = getComputedStyle(document.body);
      e.getPropertyValue("--q-size-sm") && lr.forEach((t => {
        this.sizes[t] = parseInt(e.getPropertyValue(`--q-size-${t}`), 10)
      })), this.setSizes = e => {
        lr.forEach((t => {
          e[t] && (this.sizes[t] = e[t])
        })), this.__update(!0)
      }, this.setDebounce = e => {
        void 0 !== i && o.removeEventListener("resize", i, ar), i = e > 0 ? or(this.__update, e) : this.__update, o.addEventListener("resize", i, ar)
      }, this.setDebounce(u), Object.keys(s).length > 0 ? (this.setSizes(s), s = void 0) : this.__update(), !0 === r && "xs" === this.name && document.body.classList.add("screen--xs")
    };
    !0 === $a.value ? t.push(c) : c()
  }
});
const ir = Qa({
    isActive: !1,
    mode: !1
  }, {
    __media: void 0,
    set(e) {
      ir.mode = e, "auto" === e ? (void 0 === ir.__media && (ir.__media = window.matchMedia("(prefers-color-scheme: dark)"), ir.__updateMedia = () => {
        ir.set("auto")
      }, ir.__media.addListener(ir.__updateMedia)), e = ir.__media.matches) : void 0 !== ir.__media && (ir.__media.removeListener(ir.__updateMedia), ir.__media = void 0), ir.isActive = !0 === e, document.body.classList.remove("body--" + (!0 === e ? "light" : "dark")), document.body.classList.add("body--" + (!0 === e ? "dark" : "light"))
    },
    toggle() {
      ir.set(!1 === ir.isActive)
    },
    install({
      $q: e,
      onSSRHydrated: t,
      ssrContext: n
    }) {
      const {
        dark: o
      } = e.config;
      if (e.dark = this, !0 === this.__installed && void 0 === o) return;
      this.isActive = !0 === o;
      const l = void 0 !== o && o;
      if (!0 === $a.value) {
        const e = e => {
            this.__fromSSR = e
          },
          n = this.set;
        this.set = e, e(l), t.push((() => {
          this.set = n, this.set(this.__fromSSR)
        }))
      } else this.set(l)
    }
  }),
  sr = () => !0;

function ur(e) {
  return "string" == typeof e && "" !== e && "/" !== e && "#/" !== e
}

function cr(e) {
  return !0 === e.startsWith("#") && (e = e.substring(1)), !1 === e.startsWith("/") && (e = "/" + e), !0 === e.endsWith("/") && (e = e.substring(0, e.length - 1)), "#" + e
}
var dr = {
    __history: [],
    add: Xa,
    remove: Xa,
    install({
      $q: e
    }) {
      if (!0 === this.__installed) return;
      const {
        cordova: t,
        capacitor: n
      } = Wa.is;
      if (!0 !== t && !0 !== n) return;
      const o = e.config[!0 === t ? "cordova" : "capacitor"];
      if (void 0 !== o && !1 === o.backButton) return;
      if (!0 === n && (void 0 === window.Capacitor || void 0 === window.Capacitor.Plugins.App)) return;
      this.add = e => {
        void 0 === e.condition && (e.condition = sr), this.__history.push(e)
      }, this.remove = e => {
        const t = this.__history.indexOf(e);
        t >= 0 && this.__history.splice(t, 1)
      };
      const l = function(e) {
          if (!1 === e.backButtonExit) return () => !1;
          if ("*" === e.backButtonExit) return sr;
          const t = ["#/"];
          return !0 === Array.isArray(e.backButtonExit) && t.push(...e.backButtonExit.filter(ur).map(cr)), () => t.includes(window.location.hash)
        }(Object.assign({
          backButtonExit: !0
        }, o)),
        a = () => {
          if (this.__history.length) {
            const e = this.__history[this.__history.length - 1];
            !0 === e.condition() && (this.__history.pop(), e.handler())
          } else !0 === l() ? navigator.app.exitApp() : window.history.back()
        };
      !0 === t ? document.addEventListener("deviceready", (() => {
        document.addEventListener("backbutton", a, !1)
      })) : window.Capacitor.Plugins.App.addListener("backButton", a)
    }
  },
  pr = {
    isoName: "en-US",
    nativeName: "English (US)",
    label: {
      clear: "Clear",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      set: "Set",
      select: "Select",
      reset: "Reset",
      remove: "Remove",
      update: "Update",
      create: "Create",
      search: "Search",
      filter: "Filter",
      refresh: "Refresh",
      expand: e => e ? `Expand "${e}"` : "Expand",
      collapse: e => e ? `Collapse "${e}"` : "Collapse"
    },
    date: {
      days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      firstDayOfWeek: 0,
      format24h: !1,
      pluralDay: "days"
    },
    table: {
      noData: "No data available",
      noResults: "No matching records found",
      loading: "Loading...",
      selectedRecords: e => 1 === e ? "1 record selected." : (0 === e ? "No" : e) + " records selected.",
      recordsPerPage: "Records per page:",
      allRows: "All",
      pagination: (e, t, n) => e + "-" + t + " of " + n,
      columns: "Columns"
    },
    editor: {
      url: "URL",
      bold: "Bold",
      italic: "Italic",
      strikethrough: "Strikethrough",
      underline: "Underline",
      unorderedList: "Unordered List",
      orderedList: "Ordered List",
      subscript: "Subscript",
      superscript: "Superscript",
      hyperlink: "Hyperlink",
      toggleFullscreen: "Toggle Fullscreen",
      quote: "Quote",
      left: "Left align",
      center: "Center align",
      right: "Right align",
      justify: "Justify align",
      print: "Print",
      outdent: "Decrease indentation",
      indent: "Increase indentation",
      removeFormat: "Remove formatting",
      formatting: "Formatting",
      fontSize: "Font Size",
      align: "Align",
      hr: "Insert Horizontal Rule",
      undo: "Undo",
      redo: "Redo",
      heading1: "Heading 1",
      heading2: "Heading 2",
      heading3: "Heading 3",
      heading4: "Heading 4",
      heading5: "Heading 5",
      heading6: "Heading 6",
      paragraph: "Paragraph",
      code: "Code",
      size1: "Very small",
      size2: "A bit small",
      size3: "Normal",
      size4: "Medium-large",
      size5: "Big",
      size6: "Very big",
      size7: "Maximum",
      defaultFont: "Default Font",
      viewSource: "View Source"
    },
    tree: {
      noNodes: "No nodes available",
      noResults: "No matching nodes found"
    }
  };

function fr() {
  const e = !0 === Array.isArray(navigator.languages) && navigator.languages.length > 0 ? navigator.languages[0] : navigator.language;
  if ("string" == typeof e) return e.split(/[-_]/).map(((e, t) => 0 === t ? e.toLowerCase() : t > 1 || e.length < 4 ? e.toUpperCase() : e[0].toUpperCase() + e.slice(1).toLowerCase())).join("-")
}
const vr = Qa({
  __langPack: {}
}, {
  getLocale: fr,
  set(e = pr, t) {
    const n = {
      ...e,
      rtl: !0 === e.rtl,
      getLocale: fr
    };
    if (n.set = vr.set, void 0 === vr.__langConfig || !0 !== vr.__langConfig.noHtmlAttrs) {
      const e = document.documentElement;
      e.setAttribute("dir", !0 === n.rtl ? "rtl" : "ltr"), e.setAttribute("lang", n.isoName)
    }
    Object.assign(vr.__langPack, n), vr.props = n, vr.isoName = n.isoName, vr.nativeName = n.nativeName
  },
  install({
    $q: e,
    lang: t,
    ssrContext: n
  }) {
    e.lang = vr.__langPack, vr.__langConfig = e.config.lang, !0 === this.__installed ? void 0 !== t && this.set(t) : this.set(t || pr)
  }
});

function mr(e, t, n = document.body) {
  if ("string" != typeof e) throw new TypeError("Expected a string as propName");
  if ("string" != typeof t) throw new TypeError("Expected a string as value");
  if (!(n instanceof Element)) throw new TypeError("Expected a DOM element");
  n.style.setProperty(`--q-${e}`, t)
}
let hr = !1;

function gr(e) {
  hr = !0 === e.isComposing
}

function yr(e) {
  return !0 === hr || e !== Object(e) || !0 === e.isComposing || !0 === e.qKeyEvent
}

function br(e, t) {
  return !0 !== yr(e) && [].concat(t).includes(e.keyCode)
}

function _r(e) {
  return !0 === e.ios ? "ios" : !0 === e.android ? "android" : void 0
}
var wr = {
    install(e) {
      if (!0 !== this.__installed) {
        if (!0 === $a.value) ! function() {
          const {
            is: e
          } = Wa, t = document.body.className, n = new Set(t.replace(/ {2}/g, " ").split(" "));
          if (void 0 !== ja) n.delete("desktop"), n.add("platform-ios"), n.add("mobile");
          else if (!0 !== e.nativeMobile && !0 !== e.electron && !0 !== e.bex)
            if (!0 === e.desktop) n.delete("mobile"), n.delete("platform-ios"), n.delete("platform-android"), n.add("desktop");
            else if (!0 === e.mobile) {
            n.delete("desktop"), n.add("mobile");
            const t = _r(e);
            void 0 !== t ? (n.add(`platform-${t}`), n.delete("platform-" + ("ios" === t ? "android" : "ios"))) : (n.delete("platform-ios"), n.delete("platform-android"))
          }!0 === Wa.has.touch && (n.delete("no-touch"), n.add("touch")), !0 === Wa.within.iframe && n.add("within-iframe");
          const o = Array.from(n).join(" ");
          t !== o && (document.body.className = o)
        }();
        else {
          const {
            $q: t
          } = e;
          void 0 !== t.config.brand && function(e) {
            for (const t in e) mr(t, e[t])
          }(t.config.brand);
          const n = function({
            is: e,
            has: t,
            within: n
          }, o) {
            const l = [!0 === e.desktop ? "desktop" : "mobile", (!1 === t.touch ? "no-" : "") + "touch"];
            if (!0 === e.mobile) {
              const t = _r(e);
              void 0 !== t && l.push("platform-" + t)
            }
            if (!0 === e.nativeMobile) {
              const t = e.nativeMobileWrapper;
              l.push(t), l.push("native-mobile"), !0 !== e.ios || void 0 !== o[t] && !1 === o[t].iosStatusBarPadding || l.push("q-ios-padding")
            } else !0 === e.electron ? l.push("electron") : !0 === e.bex && l.push("bex");
            return !0 === n.iframe && l.push("within-iframe"), l
          }(Wa, t.config);
          document.body.classList.add.apply(document.body.classList, n)
        }!0 === Wa.is.ios && document.body.addEventListener("touchstart", Xa), window.addEventListener("keydown", gr, !0)
      }
    }
  },
  kr = {
    name: "material-icons",
    type: {
      positive: "check_circle",
      negative: "warning",
      info: "info",
      warning: "priority_high"
    },
    arrow: {
      up: "arrow_upward",
      right: "arrow_forward",
      down: "arrow_downward",
      left: "arrow_back",
      dropdown: "arrow_drop_down"
    },
    chevron: {
      left: "chevron_left",
      right: "chevron_right"
    },
    colorPicker: {
      spectrum: "gradient",
      tune: "tune",
      palette: "style"
    },
    pullToRefresh: {
      icon: "refresh"
    },
    carousel: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
      navigationIcon: "lens"
    },
    chip: {
      remove: "cancel",
      selected: "check"
    },
    datetime: {
      arrowLeft: "chevron_left",
      arrowRight: "chevron_right",
      now: "access_time",
      today: "today"
    },
    editor: {
      bold: "format_bold",
      italic: "format_italic",
      strikethrough: "strikethrough_s",
      underline: "format_underlined",
      unorderedList: "format_list_bulleted",
      orderedList: "format_list_numbered",
      subscript: "vertical_align_bottom",
      superscript: "vertical_align_top",
      hyperlink: "link",
      toggleFullscreen: "fullscreen",
      quote: "format_quote",
      left: "format_align_left",
      center: "format_align_center",
      right: "format_align_right",
      justify: "format_align_justify",
      print: "print",
      outdent: "format_indent_decrease",
      indent: "format_indent_increase",
      removeFormat: "format_clear",
      formatting: "text_format",
      fontSize: "format_size",
      align: "format_align_left",
      hr: "remove",
      undo: "undo",
      redo: "redo",
      heading: "format_size",
      code: "code",
      size: "format_size",
      font: "font_download",
      viewSource: "code"
    },
    expansionItem: {
      icon: "keyboard_arrow_down",
      denseIcon: "arrow_drop_down"
    },
    fab: {
      icon: "add",
      activeIcon: "close"
    },
    field: {
      clear: "cancel",
      error: "error"
    },
    pagination: {
      first: "first_page",
      prev: "keyboard_arrow_left",
      next: "keyboard_arrow_right",
      last: "last_page"
    },
    rating: {
      icon: "grade"
    },
    stepper: {
      done: "check",
      active: "edit",
      error: "warning"
    },
    tabs: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down"
    },
    table: {
      arrowUp: "arrow_upward",
      warning: "warning",
      firstPage: "first_page",
      prevPage: "chevron_left",
      nextPage: "chevron_right",
      lastPage: "last_page"
    },
    tree: {
      icon: "play_arrow"
    },
    uploader: {
      done: "done",
      clear: "clear",
      add: "add_box",
      upload: "cloud_upload",
      removeQueue: "clear_all",
      removeUploaded: "done_all"
    }
  };
const xr = Qa({
    iconMapFn: null,
    __icons: {}
  }, {
    set(e, t) {
      const n = {
        ...e,
        rtl: !0 === e.rtl
      };
      n.set = xr.set, Object.assign(xr.__icons, n)
    },
    install({
      $q: e,
      iconSet: t,
      ssrContext: n
    }) {
      void 0 !== e.config.iconMapFn && (this.iconMapFn = e.config.iconMapFn), e.iconSet = this.__icons, Na(e, "iconMapFn", (() => this.iconMapFn), (e => {
        this.iconMapFn = e
      })), !0 === this.__installed ? void 0 !== t && this.set(t) : this.set(t || kr)
    }
  }),
  Sr = () => {},
  Cr = {};
let Er = !1;

function Ar(e, t) {
  if (e === t) return !0;
  if (null !== e && null !== t && "object" == typeof e && "object" == typeof t) {
    if (e.constructor !== t.constructor) return !1;
    let n, o;
    if (e.constructor === Array) {
      if (n = e.length, n !== t.length) return !1;
      for (o = n; 0 != o--;)
        if (!0 !== Ar(e[o], t[o])) return !1;
      return !0
    }
    if (e.constructor === Map) {
      if (e.size !== t.size) return !1;
      let n = e.entries();
      for (o = n.next(); !0 !== o.done;) {
        if (!0 !== t.has(o.value[0])) return !1;
        o = n.next()
      }
      for (n = e.entries(), o = n.next(); !0 !== o.done;) {
        if (!0 !== Ar(o.value[1], t.get(o.value[0]))) return !1;
        o = n.next()
      }
      return !0
    }
    if (e.constructor === Set) {
      if (e.size !== t.size) return !1;
      const n = e.entries();
      for (o = n.next(); !0 !== o.done;) {
        if (!0 !== t.has(o.value[0])) return !1;
        o = n.next()
      }
      return !0
    }
    if (null != e.buffer && e.buffer.constructor === ArrayBuffer) {
      if (n = e.length, n !== t.length) return !1;
      for (o = n; 0 != o--;)
        if (e[o] !== t[o]) return !1;
      return !0
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    const l = Object.keys(e).filter((t => void 0 !== e[t]));
    if (n = l.length, n !== Object.keys(t).filter((e => void 0 !== t[e])).length) return !1;
    for (o = n; 0 != o--;) {
      const n = l[o];
      if (!0 !== Ar(e[n], t[n])) return !1
    }
    return !0
  }
  return e != e && t != t
}

function Lr(e) {
  return null !== e && "object" == typeof e && !0 !== Array.isArray(e)
}
const Tr = [Ka, wr, ir, rr, dr, vr, xr];

function Or(e, t) {
  t.forEach((t => {
    t.install(e), t.__installed = !0
  }))
}
var Rr = {
    version: "2.11.5",
    install: function(e, t = {}) {
      const n = {
        version: "2.11.5"
      };
      var o, l, a;
      !1 === Er ? (void 0 !== t.config && Object.assign(Cr, t.config), n.config = {
        ...Cr
      }, Er = !0) : n.config = t.config || {}, o = e, l = t, a = {
        parentApp: e,
        $q: n,
        lang: t.lang,
        iconSet: t.iconSet,
        onSSRHydrated: []
      }, o.config.globalProperties.$q = a.$q, o.provide("_q_", a.$q), Or(a, Tr), void 0 !== l.components && Object.values(l.components).forEach((e => {
        !0 === Lr(e) && void 0 !== e.name && o.component(e.name, e)
      })), void 0 !== l.directives && Object.values(l.directives).forEach((e => {
        !0 === Lr(e) && void 0 !== e.name && o.directive(e.name, e)
      })), void 0 !== l.plugins && Or(a, Object.values(l.plugins).filter((e => "function" == typeof e.install && !1 === Tr.includes(e)))), !0 === $a.value && (a.$q.onSSRHydrated = () => {
        a.onSSRHydrated.forEach((e => {
          e()
        })), a.$q.onSSRHydrated = () => {}
      })
    },
    lang: vr,
    iconSet: xr
  },
  qr = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [o, l] of t) n[o] = l;
    return n
  };
var Vr = qr({}, [
  ["render", function(e, t) {
    const n = Jn("router-view");
    return Zo(), ll(n)
  }]
]);
/*!
 * pinia v2.0.28
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */
const Mr = Symbol();
var Fr, zr;
(zr = Fr || (Fr = {})).direct = "direct", zr.patchObject = "patch object", zr.patchFunction = "patch function";
var Pr = () => function() {
  const e = ee(!0),
    t = e.run((() => bt({})));
  let n = [],
    o = [];
  const l = ft({
    install(e) {
      l._a = e, e.provide(Mr, l), e.config.globalProperties.$pinia = l, o.forEach((e => n.push(e))), o = []
    },
    use(e) {
      return this._a ? n.push(e) : o.push(e), this
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map,
    state: t
  });
  return l
}();
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */
const Br = "undefined" != typeof window;
const Ir = Object.assign;

function Nr(e, t) {
  const n = {};
  for (const o in t) {
    const l = t[o];
    n[o] = jr(l) ? l.map(e) : e(l)
  }
  return n
}
const $r = () => {},
  jr = Array.isArray,
  Dr = /\/$/;

function Hr(e, t, n = "/") {
  let o, l = {},
    a = "",
    r = "";
  const i = t.indexOf("#");
  let s = t.indexOf("?");
  return i < s && i >= 0 && (s = -1), s > -1 && (o = t.slice(0, s), a = t.slice(s + 1, i > -1 ? i : t.length), l = e(a)), i > -1 && (o = o || t.slice(0, i), r = t.slice(i, t.length)), o = function(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"),
      o = e.split("/");
    let l, a, r = n.length - 1;
    for (l = 0; l < o.length; l++)
      if (a = o[l], "." !== a) {
        if (".." !== a) break;
        r > 1 && r--
      } return n.slice(0, r).join("/") + "/" + o.slice(l - (l === o.length ? 1 : 0)).join("/")
  }(null != o ? o : t, n), {
    fullPath: o + (a && "?") + a + r,
    path: o,
    query: l,
    hash: r
  }
}

function Ur(e, t) {
  return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e
}

function Wr(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}

function Kr(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e)
    if (!Qr(e[n], t[n])) return !1;
  return !0
}

function Qr(e, t) {
  return jr(e) ? Gr(e, t) : jr(t) ? Gr(t, e) : e === t
}

function Gr(e, t) {
  return jr(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t
}
var Xr, Jr, Zr, Yr;

function ei(e) {
  if (!e)
    if (Br) {
      const t = document.querySelector("base");
      e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "")
    } else e = "/";
  return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), e.replace(Dr, "")
}(Jr = Xr || (Xr = {})).pop = "pop", Jr.push = "push", (Yr = Zr || (Zr = {})).back = "back", Yr.forward = "forward", Yr.unknown = "";
const ti = /^[^#]+#/;

function ni(e, t) {
  return e.replace(ti, "#") + t
}
const oi = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});

function li(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      o = "string" == typeof n && n.startsWith("#"),
      l = "string" == typeof n ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!l) return;
    t = function(e, t) {
      const n = document.documentElement.getBoundingClientRect(),
        o = e.getBoundingClientRect();
      return {
        behavior: t.behavior,
        left: o.left - n.left - (t.left || 0),
        top: o.top - n.top - (t.top || 0)
      }
    }(l, e)
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left : window.pageXOffset, null != t.top ? t.top : window.pageYOffset)
}

function ai(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const ri = new Map;

function ii(e, t) {
  const {
    pathname: n,
    search: o,
    hash: l
  } = t, a = e.indexOf("#");
  if (a > -1) {
    let t = l.includes(e.slice(a)) ? e.slice(a).length : 1,
      n = l.slice(t);
    return "/" !== n[0] && (n = "/" + n), Ur(n, "")
  }
  return Ur(n, e) + o + l
}

function si(e, t, n, o = !1, l = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: l ? oi() : null
  }
}

function ui(e) {
  const {
    history: t,
    location: n
  } = window, o = {
    value: ii(e, n)
  }, l = {
    value: t.state
  };

  function a(o, a, r) {
    const i = e.indexOf("#"),
      s = i > -1 ? (n.host && document.querySelector("base") ? e : e.slice(i)) + o : location.protocol + "//" + location.host + e + o;
    try {
      t[r ? "replaceState" : "pushState"](a, "", s), l.value = a
    } catch (u) {
      console.error(u), n[r ? "replace" : "assign"](s)
    }
  }
  return l.value || a(o.value, {
    back: null,
    current: o.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0), {
    location: o,
    state: l,
    push: function(e, n) {
      const r = Ir({}, l.value, t.state, {
        forward: e,
        scroll: oi()
      });
      a(r.current, r, !0), a(e, Ir({}, si(o.value, e, null), {
        position: r.position + 1
      }, n), !1), o.value = e
    },
    replace: function(e, n) {
      a(e, Ir({}, t.state, si(l.value.back, e, l.value.forward, !0), n, {
        position: l.value.position
      }), !0), o.value = e
    }
  }
}

function ci(e) {
  const t = ui(e = ei(e)),
    n = function(e, t, n, o) {
      let l = [],
        a = [],
        r = null;
      const i = ({
        state: a
      }) => {
        const i = ii(e, location),
          s = n.value,
          u = t.value;
        let c = 0;
        if (a) {
          if (n.value = i, t.value = a, r && r === s) return void(r = null);
          c = u ? a.position - u.position : 0
        } else o(i);
        l.forEach((e => {
          e(n.value, s, {
            delta: c,
            type: Xr.pop,
            direction: c ? c > 0 ? Zr.forward : Zr.back : Zr.unknown
          })
        }))
      };

      function s() {
        const {
          history: e
        } = window;
        e.state && e.replaceState(Ir({}, e.state, {
          scroll: oi()
        }), "")
      }
      return window.addEventListener("popstate", i), window.addEventListener("beforeunload", s), {
        pauseListeners: function() {
          r = n.value
        },
        listen: function(e) {
          l.push(e);
          const t = () => {
            const t = l.indexOf(e);
            t > -1 && l.splice(t, 1)
          };
          return a.push(t), t
        },
        destroy: function() {
          for (const e of a) e();
          a = [], window.removeEventListener("popstate", i), window.removeEventListener("beforeunload", s)
        }
      }
    }(e, t.state, t.location, t.replace);
  const o = Ir({
    location: "",
    base: e,
    go: function(e, t = !0) {
      t || n.pauseListeners(), history.go(e)
    },
    createHref: ni.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o
}

function di(e) {
  return (e = location.host ? e || location.pathname + location.search : "").includes("#") || (e += "#"), ci(e)
}

function pi(e) {
  return "string" == typeof e || "symbol" == typeof e
}
const fi = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  },
  vi = Symbol("");
var mi, hi;

function gi(e, t) {
  return Ir(new Error, {
    type: e,
    [vi]: !0
  }, t)
}

function yi(e, t) {
  return e instanceof Error && vi in e && (null == t || !!(e.type & t))
}(hi = mi || (mi = {}))[hi.aborted = 4] = "aborted", hi[hi.cancelled = 8] = "cancelled", hi[hi.duplicated = 16] = "duplicated";
const bi = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
  },
  _i = /[.+*?^${}()[\]/\\]/g;

function wi(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length;) {
    const o = t[n] - e[n];
    if (o) return o;
    n++
  }
  return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0
}

function ki(e, t) {
  let n = 0;
  const o = e.score,
    l = t.score;
  for (; n < o.length && n < l.length;) {
    const e = wi(o[n], l[n]);
    if (e) return e;
    n++
  }
  if (1 === Math.abs(l.length - o.length)) {
    if (xi(o)) return 1;
    if (xi(l)) return -1
  }
  return l.length - o.length
}

function xi(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0
}
const Si = {
    type: 0,
    value: ""
  },
  Ci = /[a-zA-Z0-9_]/;

function Ei(e, t, n) {
  const o = function(e, t) {
      const n = Ir({}, bi, t),
        o = [];
      let l = n.start ? "^" : "";
      const a = [];
      for (const s of e) {
        const e = s.length ? [] : [90];
        n.strict && !s.length && (l += "/");
        for (let t = 0; t < s.length; t++) {
          const o = s[t];
          let r = 40 + (n.sensitive ? .25 : 0);
          if (0 === o.type) t || (l += "/"), l += o.value.replace(_i, "\\$&"), r += 40;
          else if (1 === o.type) {
            const {
              value: e,
              repeatable: n,
              optional: u,
              regexp: c
            } = o;
            a.push({
              name: e,
              repeatable: n,
              optional: u
            });
            const d = c || "[^/]+?";
            if ("[^/]+?" !== d) {
              r += 10;
              try {
                new RegExp(`(${d})`)
              } catch (i) {
                throw new Error(`Invalid custom RegExp for param "${e}" (${d}): ` + i.message)
              }
            }
            let p = n ? `((?:${d})(?:/(?:${d}))*)` : `(${d})`;
            t || (p = u && s.length < 2 ? `(?:/${p})` : "/" + p), u && (p += "?"), l += p, r += 20, u && (r += -8), n && (r += -20), ".*" === d && (r += -50)
          }
          e.push(r)
        }
        o.push(e)
      }
      if (n.strict && n.end) {
        const e = o.length - 1;
        o[e][o[e].length - 1] += .7000000000000001
      }
      n.strict || (l += "/?"), n.end ? l += "$" : n.strict && (l += "(?:/|$)");
      const r = new RegExp(l, n.sensitive ? "" : "i");
      return {
        re: r,
        score: o,
        keys: a,
        parse: function(e) {
          const t = e.match(r),
            n = {};
          if (!t) return null;
          for (let o = 1; o < t.length; o++) {
            const e = t[o] || "",
              l = a[o - 1];
            n[l.name] = e && l.repeatable ? e.split("/") : e
          }
          return n
        },
        stringify: function(t) {
          let n = "",
            o = !1;
          for (const l of e) {
            o && n.endsWith("/") || (n += "/"), o = !1;
            for (const e of l)
              if (0 === e.type) n += e.value;
              else if (1 === e.type) {
              const {
                value: a,
                repeatable: r,
                optional: i
              } = e, s = a in t ? t[a] : "";
              if (jr(s) && !r) throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);
              const u = jr(s) ? s.join("/") : s;
              if (!u) {
                if (!i) throw new Error(`Missing required param "${a}"`);
                l.length < 2 && (n.endsWith("/") ? n = n.slice(0, -1) : o = !0)
              }
              n += u
            }
          }
          return n || "/"
        }
      }
    }(function(e) {
      if (!e) return [
        []
      ];
      if ("/" === e) return [
        [Si]
      ];
      if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

      function t(e) {
        throw new Error(`ERR (${n})/"${u}": ${e}`)
      }
      let n = 0,
        o = n;
      const l = [];
      let a;

      function r() {
        a && l.push(a), a = []
      }
      let i, s = 0,
        u = "",
        c = "";

      function d() {
        u && (0 === n ? a.push({
          type: 0,
          value: u
        }) : 1 === n || 2 === n || 3 === n ? (a.length > 1 && ("*" === i || "+" === i) && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), a.push({
          type: 1,
          value: u,
          regexp: c,
          repeatable: "*" === i || "+" === i,
          optional: "*" === i || "?" === i
        })) : t("Invalid state to consume buffer"), u = "")
      }

      function p() {
        u += i
      }
      for (; s < e.length;)
        if (i = e[s++], "\\" !== i || 2 === n) switch (n) {
          case 0:
            "/" === i ? (u && d(), r()) : ":" === i ? (d(), n = 1) : p();
            break;
          case 4:
            p(), n = o;
            break;
          case 1:
            "(" === i ? n = 2 : Ci.test(i) ? p() : (d(), n = 0, "*" !== i && "?" !== i && "+" !== i && s--);
            break;
          case 2:
            ")" === i ? "\\" == c[c.length - 1] ? c = c.slice(0, -1) + i : n = 3 : c += i;
            break;
          case 3:
            d(), n = 0, "*" !== i && "?" !== i && "+" !== i && s--, c = "";
            break;
          default:
            t("Unknown state")
        } else o = n, n = 4;
      return 2 === n && t(`Unfinished custom RegExp for param "${u}"`), d(), r(), l
    }(e.path), n),
    l = Ir(o, {
      record: e,
      parent: t,
      children: [],
      alias: []
    });
  return t && !l.record.aliasOf == !t.record.aliasOf && t.children.push(l), l
}

function Ai(e, t) {
  const n = [],
    o = new Map;

  function l(e, n, o) {
    const i = !o,
      s = function(e) {
        return {
          path: e.path,
          redirect: e.redirect,
          name: e.name,
          meta: e.meta || {},
          aliasOf: void 0,
          beforeEnter: e.beforeEnter,
          props: Ti(e),
          children: e.children || [],
          instances: {},
          leaveGuards: new Set,
          updateGuards: new Set,
          enterCallbacks: {},
          components: "components" in e ? e.components || null : e.component && {
            default: e.component
          }
        }
      }(e);
    s.aliasOf = o && o.record;
    const u = qi(t, e),
      c = [s];
    if ("alias" in e) {
      const t = "string" == typeof e.alias ? [e.alias] : e.alias;
      for (const e of t) c.push(Ir({}, s, {
        components: o ? o.record.components : s.components,
        path: e,
        aliasOf: o ? o.record : s
      }))
    }
    let d, p;
    for (const t of c) {
      const {
        path: c
      } = t;
      if (n && "/" !== c[0]) {
        const e = n.record.path,
          o = "/" === e[e.length - 1] ? "" : "/";
        t.path = n.record.path + (c && o + c)
      }
      if (d = Ei(t, n, u), o ? o.alias.push(d) : (p = p || d, p !== d && p.alias.push(d), i && e.name && !Oi(d) && a(e.name)), s.children) {
        const e = s.children;
        for (let t = 0; t < e.length; t++) l(e[t], d, o && o.children[t])
      }
      o = o || d, (d.record.components && Object.keys(d.record.components).length || d.record.name || d.record.redirect) && r(d)
    }
    return p ? () => {
      a(p)
    } : $r
  }

  function a(e) {
    if (pi(e)) {
      const t = o.get(e);
      t && (o.delete(e), n.splice(n.indexOf(t), 1), t.children.forEach(a), t.alias.forEach(a))
    } else {
      const t = n.indexOf(e);
      t > -1 && (n.splice(t, 1), e.record.name && o.delete(e.record.name), e.children.forEach(a), e.alias.forEach(a))
    }
  }

  function r(e) {
    let t = 0;
    for (; t < n.length && ki(e, n[t]) >= 0 && (e.record.path !== n[t].record.path || !Vi(e, n[t]));) t++;
    n.splice(t, 0, e), e.record.name && !Oi(e) && o.set(e.record.name, e)
  }
  return t = qi({
    strict: !1,
    end: !0,
    sensitive: !1
  }, t), e.forEach((e => l(e))), {
    addRoute: l,
    resolve: function(e, t) {
      let l, a, r, i = {};
      if ("name" in e && e.name) {
        if (l = o.get(e.name), !l) throw gi(1, {
          location: e
        });
        r = l.record.name, i = Ir(Li(t.params, l.keys.filter((e => !e.optional)).map((e => e.name))), e.params && Li(e.params, l.keys.map((e => e.name)))), a = l.stringify(i)
      } else if ("path" in e) a = e.path, l = n.find((e => e.re.test(a))), l && (i = l.parse(a), r = l.record.name);
      else {
        if (l = t.name ? o.get(t.name) : n.find((e => e.re.test(t.path))), !l) throw gi(1, {
          location: e,
          currentLocation: t
        });
        r = l.record.name, i = Ir({}, t.params, e.params), a = l.stringify(i)
      }
      const s = [];
      let u = l;
      for (; u;) s.unshift(u.record), u = u.parent;
      return {
        name: r,
        path: a,
        params: i,
        matched: s,
        meta: Ri(s)
      }
    },
    removeRoute: a,
    getRoutes: function() {
      return n
    },
    getRecordMatcher: function(e) {
      return o.get(e)
    }
  }
}

function Li(e, t) {
  const n = {};
  for (const o of t) o in e && (n[o] = e[o]);
  return n
}

function Ti(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else
    for (const o in e.components) t[o] = "boolean" == typeof n ? n : n[o];
  return t
}

function Oi(e) {
  for (; e;) {
    if (e.record.aliasOf) return !0;
    e = e.parent
  }
  return !1
}

function Ri(e) {
  return e.reduce(((e, t) => Ir(e, t.meta)), {})
}

function qi(e, t) {
  const n = {};
  for (const o in e) n[o] = o in t ? t[o] : e[o];
  return n
}

function Vi(e, t) {
  return t.children.some((t => t === e || Vi(e, t)))
}
const Mi = /#/g,
  Fi = /&/g,
  zi = /\//g,
  Pi = /=/g,
  Bi = /\?/g,
  Ii = /\+/g,
  Ni = /%5B/g,
  $i = /%5D/g,
  ji = /%5E/g,
  Di = /%60/g,
  Hi = /%7B/g,
  Ui = /%7C/g,
  Wi = /%7D/g,
  Ki = /%20/g;

function Qi(e) {
  return encodeURI("" + e).replace(Ui, "|").replace(Ni, "[").replace($i, "]")
}

function Gi(e) {
  return Qi(e).replace(Ii, "%2B").replace(Ki, "+").replace(Mi, "%23").replace(Fi, "%26").replace(Di, "`").replace(Hi, "{").replace(Wi, "}").replace(ji, "^")
}

function Xi(e) {
  return null == e ? "" : function(e) {
    return Qi(e).replace(Mi, "%23").replace(Bi, "%3F")
  }(e).replace(zi, "%2F")
}

function Ji(e) {
  try {
    return decodeURIComponent("" + e)
  } catch (t) {}
  return "" + e
}

function Zi(e) {
  const t = {};
  if ("" === e || "?" === e) return t;
  const n = ("?" === e[0] ? e.slice(1) : e).split("&");
  for (let o = 0; o < n.length; ++o) {
    const e = n[o].replace(Ii, " "),
      l = e.indexOf("="),
      a = Ji(l < 0 ? e : e.slice(0, l)),
      r = l < 0 ? null : Ji(e.slice(l + 1));
    if (a in t) {
      let e = t[a];
      jr(e) || (e = t[a] = [e]), e.push(r)
    } else t[a] = r
  }
  return t
}

function Yi(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = Gi(n).replace(Pi, "%3D"), null == o) {
      void 0 !== o && (t += (t.length ? "&" : "") + n);
      continue
    }(jr(o) ? o.map((e => e && Gi(e))) : [o && Gi(o)]).forEach((e => {
      void 0 !== e && (t += (t.length ? "&" : "") + n, null != e && (t += "=" + e))
    }))
  }
  return t
}

function es(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    void 0 !== o && (t[n] = jr(o) ? o.map((e => null == e ? null : "" + e)) : null == o ? o : "" + o)
  }
  return t
}
const ts = Symbol(""),
  ns = Symbol(""),
  os = Symbol(""),
  ls = Symbol(""),
  as = Symbol("");

function rs() {
  let e = [];
  return {
    add: function(t) {
      return e.push(t), () => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
      }
    },
    list: () => e,
    reset: function() {
      e = []
    }
  }
}

function is(e, t, n, o, l) {
  const a = o && (o.enterCallbacks[l] = o.enterCallbacks[l] || []);
  return () => new Promise(((r, i) => {
    const s = e => {
        var s;
        !1 === e ? i(gi(4, {
          from: n,
          to: t
        })) : e instanceof Error ? i(e) : "string" == typeof(s = e) || s && "object" == typeof s ? i(gi(2, {
          from: t,
          to: e
        })) : (a && o.enterCallbacks[l] === a && "function" == typeof e && a.push(e), r())
      },
      u = e.call(o && o.instances[l], t, n, s);
    let c = Promise.resolve(u);
    e.length < 3 && (c = c.then(s)), c.catch((e => i(e)))
  }))
}

function ss(e, t, n, o) {
  const l = [];
  for (const r of e)
    for (const e in r.components) {
      let i = r.components[e];
      if ("beforeRouteEnter" === t || r.instances[e])
        if ("object" == typeof(a = i) || "displayName" in a || "props" in a || "__vccOpts" in a) {
          const a = (i.__vccOpts || i)[t];
          a && l.push(is(a, n, o, r, e))
        } else {
          let a = i();
          l.push((() => a.then((l => {
            if (!l) return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${r.path}"`));
            const a = (i = l).__esModule || "Module" === i[Symbol.toStringTag] ? l.default : l;
            var i;
            r.components[e] = a;
            const s = (a.__vccOpts || a)[t];
            return s && is(s, n, o, r, e)()
          }))))
        }
    }
  var a;
  return l
}

function us(e) {
  const t = mn(os),
    n = mn(ls),
    o = Rl((() => t.resolve(kt(e.to)))),
    l = Rl((() => {
      const {
        matched: e
      } = o.value, {
        length: t
      } = e, l = e[t - 1], a = n.matched;
      if (!l || !a.length) return -1;
      const r = a.findIndex(Wr.bind(null, l));
      if (r > -1) return r;
      const i = ds(e[t - 2]);
      return t > 1 && ds(l) === i && a[a.length - 1].path !== i ? a.findIndex(Wr.bind(null, e[t - 2])) : r
    })),
    a = Rl((() => l.value > -1 && function(e, t) {
      for (const n in t) {
        const o = t[n],
          l = e[n];
        if ("string" == typeof o) {
          if (o !== l) return !1
        } else if (!jr(l) || l.length !== o.length || o.some(((e, t) => e !== l[t]))) return !1
      }
      return !0
    }(n.params, o.value.params))),
    r = Rl((() => l.value > -1 && l.value === n.matched.length - 1 && Kr(n.params, o.value.params)));
  return {
    route: o,
    href: Rl((() => o.value.href)),
    isActive: a,
    isExactActive: r,
    navigate: function(n = {}) {
      return function(e) {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
        if (e.defaultPrevented) return;
        if (void 0 !== e.button && 0 !== e.button) return;
        if (e.currentTarget && e.currentTarget.getAttribute) {
          const t = e.currentTarget.getAttribute("target");
          if (/\b_blank\b/i.test(t)) return
        }
        e.preventDefault && e.preventDefault();
        return !0
      }(n) ? t[kt(e.replace) ? "replace" : "push"](kt(e.to)).catch($r) : Promise.resolve()
    }
  }
}
const cs = On({
  name: "RouterLink",
  compatConfig: {
    MODE: 3
  },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: us,
  setup(e, {
    slots: t
  }) {
    const n = at(us(e)),
      {
        options: o
      } = mn(os),
      l = Rl((() => ({
        [ps(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
        [ps(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
      })));
    return () => {
      const o = t.default && t.default(n);
      return e.custom ? o : ql("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: l.value
      }, o)
    }
  }
});

function ds(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const ps = (e, t, n) => null != e ? e : null != t ? t : n;

function fs(e, t) {
  if (!e) return null;
  const n = e(t);
  return 1 === n.length ? n[0] : n
}
const vs = On({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: {
    MODE: 3
  },
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const o = mn(as),
      l = Rl((() => e.route || o.value)),
      a = mn(ns, 0),
      r = Rl((() => {
        let e = kt(a);
        const {
          matched: t
        } = l.value;
        let n;
        for (;
          (n = t[e]) && !n.components;) e++;
        return e
      })),
      i = Rl((() => l.value.matched[r.value]));
    vn(ns, Rl((() => r.value + 1))), vn(ts, i), vn(as, l);
    const s = bt();
    return gn((() => [s.value, i.value, e.name]), (([e, t, n], [o, l, a]) => {
      t && (t.instances[n] = e, l && l !== t && e && e === o && (t.leaveGuards.size || (t.leaveGuards = l.leaveGuards), t.updateGuards.size || (t.updateGuards = l.updateGuards))), !e || !t || l && Wr(t, l) && o || (t.enterCallbacks[n] || []).forEach((t => t(e)))
    }), {
      flush: "post"
    }), () => {
      const o = l.value,
        a = e.name,
        r = i.value,
        u = r && r.components[a];
      if (!u) return fs(n.default, {
        Component: u,
        route: o
      });
      const c = r.props[a],
        d = c ? !0 === c ? o.params : "function" == typeof c ? c(o) : c : null,
        p = ql(u, Ir({}, d, t, {
          onVnodeUnmounted: e => {
            e.component.isUnmounted && (r.instances[a] = null)
          },
          ref: s
        }));
      return fs(n.default, {
        Component: p,
        route: o
      }) || p
    }
  }
});

function ms(e) {
  const t = Ai(e.routes, e),
    n = e.parseQuery || Zi,
    o = e.stringifyQuery || Yi,
    l = e.history,
    a = rs(),
    r = rs(),
    i = rs(),
    s = _t(fi, !0);
  let u = fi;
  Br && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const c = Nr.bind(null, (e => "" + e)),
    d = Nr.bind(null, Xi),
    p = Nr.bind(null, Ji);

  function f(e, a) {
    if (a = Ir({}, a || s.value), "string" == typeof e) {
      const o = Hr(n, e, a.path),
        r = t.resolve({
          path: o.path
        }, a),
        i = l.createHref(o.fullPath);
      return Ir(o, r, {
        params: p(r.params),
        hash: Ji(o.hash),
        redirectedFrom: void 0,
        href: i
      })
    }
    let r;
    if ("path" in e) r = Ir({}, e, {
      path: Hr(n, e.path, a.path).path
    });
    else {
      const t = Ir({}, e.params);
      for (const e in t) null == t[e] && delete t[e];
      r = Ir({}, e, {
        params: d(e.params)
      }), a.params = d(a.params)
    }
    const i = t.resolve(r, a),
      u = e.hash || "";
    i.params = c(p(i.params));
    const f = function(e, t) {
      const n = t.query ? e(t.query) : "";
      return t.path + (n && "?") + n + (t.hash || "")
    }(o, Ir({}, e, {
      hash: (v = u, Qi(v).replace(Hi, "{").replace(Wi, "}").replace(ji, "^")),
      path: i.path
    }));
    var v;
    const m = l.createHref(f);
    return Ir({
      fullPath: f,
      hash: u,
      query: o === Yi ? es(e.query) : e.query || {}
    }, i, {
      redirectedFrom: void 0,
      href: m
    })
  }

  function v(e) {
    return "string" == typeof e ? Hr(n, e, s.value.path) : Ir({}, e)
  }

  function m(e, t) {
    if (u !== e) return gi(8, {
      from: t,
      to: e
    })
  }

  function h(e) {
    return y(e)
  }

  function g(e) {
    const t = e.matched[e.matched.length - 1];
    if (t && t.redirect) {
      const {
        redirect: n
      } = t;
      let o = "function" == typeof n ? n(e) : n;
      return "string" == typeof o && (o = o.includes("?") || o.includes("#") ? o = v(o) : {
        path: o
      }, o.params = {}), Ir({
        query: e.query,
        hash: e.hash,
        params: "path" in o ? {} : e.params
      }, o)
    }
  }

  function y(e, t) {
    const n = u = f(e),
      l = s.value,
      a = e.state,
      r = e.force,
      i = !0 === e.replace,
      c = g(n);
    if (c) return y(Ir(v(c), {
      state: "object" == typeof c ? Ir({}, a, c.state) : a,
      force: r,
      replace: i
    }), t || n);
    const d = n;
    let p;
    return d.redirectedFrom = t, !r && function(e, t, n) {
      const o = t.matched.length - 1,
        l = n.matched.length - 1;
      return o > -1 && o === l && Wr(t.matched[o], n.matched[l]) && Kr(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
    }(o, l, n) && (p = gi(16, {
      to: d,
      from: l
    }), O(l, l, !0, !1)), (p ? Promise.resolve(p) : _(d, l)).catch((e => yi(e) ? yi(e, 2) ? e : T(e) : L(e, d, l))).then((e => {
      if (e) {
        if (yi(e, 2)) return y(Ir({
          replace: i
        }, v(e.to), {
          state: "object" == typeof e.to ? Ir({}, a, e.to.state) : a,
          force: r
        }), t || d)
      } else e = k(d, l, !0, i, a);
      return w(d, l, e), e
    }))
  }

  function b(e, t) {
    const n = m(e, t);
    return n ? Promise.reject(n) : Promise.resolve()
  }

  function _(e, t) {
    let n;
    const [o, l, i] = function(e, t) {
      const n = [],
        o = [],
        l = [],
        a = Math.max(t.matched.length, e.matched.length);
      for (let r = 0; r < a; r++) {
        const a = t.matched[r];
        a && (e.matched.find((e => Wr(e, a))) ? o.push(a) : n.push(a));
        const i = e.matched[r];
        i && (t.matched.find((e => Wr(e, i))) || l.push(i))
      }
      return [n, o, l]
    }(e, t);
    n = ss(o.reverse(), "beforeRouteLeave", e, t);
    for (const a of o) a.leaveGuards.forEach((o => {
      n.push(is(o, e, t))
    }));
    const s = b.bind(null, e, t);
    return n.push(s), hs(n).then((() => {
      n = [];
      for (const o of a.list()) n.push(is(o, e, t));
      return n.push(s), hs(n)
    })).then((() => {
      n = ss(l, "beforeRouteUpdate", e, t);
      for (const o of l) o.updateGuards.forEach((o => {
        n.push(is(o, e, t))
      }));
      return n.push(s), hs(n)
    })).then((() => {
      n = [];
      for (const o of e.matched)
        if (o.beforeEnter && !t.matched.includes(o))
          if (jr(o.beforeEnter))
            for (const l of o.beforeEnter) n.push(is(l, e, t));
          else n.push(is(o.beforeEnter, e, t));
      return n.push(s), hs(n)
    })).then((() => (e.matched.forEach((e => e.enterCallbacks = {})), n = ss(i, "beforeRouteEnter", e, t), n.push(s), hs(n)))).then((() => {
      n = [];
      for (const o of r.list()) n.push(is(o, e, t));
      return n.push(s), hs(n)
    })).catch((e => yi(e, 8) ? e : Promise.reject(e)))
  }

  function w(e, t, n) {
    for (const o of i.list()) o(e, t, n)
  }

  function k(e, t, n, o, a) {
    const r = m(e, t);
    if (r) return r;
    const i = t === fi,
      u = Br ? history.state : {};
    n && (o || i ? l.replace(e.fullPath, Ir({
      scroll: i && u && u.scroll
    }, a)) : l.push(e.fullPath, a)), s.value = e, O(e, t, n, i), T()
  }
  let x;

  function S() {
    x || (x = l.listen(((e, t, n) => {
      if (!M.listening) return;
      const o = f(e),
        a = g(o);
      if (a) return void y(Ir(a, {
        replace: !0
      }), o).catch($r);
      u = o;
      const r = s.value;
      var i, c;
      Br && (i = ai(r.fullPath, n.delta), c = oi(), ri.set(i, c)), _(o, r).catch((e => yi(e, 12) ? e : yi(e, 2) ? (y(e.to, o).then((e => {
        yi(e, 20) && !n.delta && n.type === Xr.pop && l.go(-1, !1)
      })).catch($r), Promise.reject()) : (n.delta && l.go(-n.delta, !1), L(e, o, r)))).then((e => {
        (e = e || k(o, r, !1)) && (n.delta && !yi(e, 8) ? l.go(-n.delta, !1) : n.type === Xr.pop && yi(e, 20) && l.go(-1, !1)), w(o, r, e)
      })).catch($r)
    })))
  }
  let C, E = rs(),
    A = rs();

  function L(e, t, n) {
    T(e);
    const o = A.list();
    return o.length ? o.forEach((o => o(e, t, n))) : console.error(e), Promise.reject(e)
  }

  function T(e) {
    return C || (C = !e, S(), E.list().forEach((([t, n]) => e ? n(e) : t())), E.reset()), e
  }

  function O(t, n, o, l) {
    const {
      scrollBehavior: a
    } = e;
    if (!Br || !a) return Promise.resolve();
    const r = !o && function(e) {
      const t = ri.get(e);
      return ri.delete(e), t
    }(ai(t.fullPath, 0)) || (l || !o) && history.state && history.state.scroll || null;
    return It().then((() => a(t, n, r))).then((e => e && li(e))).catch((e => L(e, t, n)))
  }
  const R = e => l.go(e);
  let q;
  const V = new Set,
    M = {
      currentRoute: s,
      listening: !0,
      addRoute: function(e, n) {
        let o, l;
        return pi(e) ? (o = t.getRecordMatcher(e), l = n) : l = e, t.addRoute(l, o)
      },
      removeRoute: function(e) {
        const n = t.getRecordMatcher(e);
        n && t.removeRoute(n)
      },
      hasRoute: function(e) {
        return !!t.getRecordMatcher(e)
      },
      getRoutes: function() {
        return t.getRoutes().map((e => e.record))
      },
      resolve: f,
      options: e,
      push: h,
      replace: function(e) {
        return h(Ir(v(e), {
          replace: !0
        }))
      },
      go: R,
      back: () => R(-1),
      forward: () => R(1),
      beforeEach: a.add,
      beforeResolve: r.add,
      afterEach: i.add,
      onError: A.add,
      isReady: function() {
        return C && s.value !== fi ? Promise.resolve() : new Promise(((e, t) => {
          E.add([e, t])
        }))
      },
      install(e) {
        e.component("RouterLink", cs), e.component("RouterView", vs), e.config.globalProperties.$router = this, Object.defineProperty(e.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => kt(s)
        }), Br && !q && s.value === fi && (q = !0, h(l.location).catch((e => {})));
        const t = {};
        for (const o in fi) t[o] = Rl((() => s.value[o]));
        e.provide(os, this), e.provide(ls, at(t)), e.provide(as, s);
        const n = e.unmount;
        V.add(e), e.unmount = function() {
          V.delete(e), V.size < 1 && (u = fi, x && x(), x = null, s.value = fi, q = !1, C = !1), n()
        }
      }
    };
  return M
}

function hs(e) {
  return e.reduce(((e, t) => e.then((() => t()))), Promise.resolve())
}
const gs = e => ft(On(e)),
  ys = "undefined" != typeof ResizeObserver,
  bs = !0 === ys ? {} : {
    style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
    url: "about:blank"
  };
var _s = gs({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(e, {
    emit: t
  }) {
    let n, o = null,
      l = {
        width: -1,
        height: -1
      };

    function a(t) {
      !0 === t || 0 === e.debounce || "0" === e.debounce ? r() : null === o && (o = setTimeout(r, e.debounce))
    }

    function r() {
      if (null !== o && (clearTimeout(o), o = null), n) {
        const {
          offsetWidth: e,
          offsetHeight: o
        } = n;
        e === l.width && o === l.height || (l = {
          width: e,
          height: o
        }, t("resize", l))
      }
    }
    const {
      proxy: i
    } = xl();
    if (!0 === ys) {
      let e;
      const t = o => {
        n = i.$el.parentNode, n ? (e = new ResizeObserver(a), e.observe(n), r()) : !0 !== o && It((() => {
          t(!0)
        }))
      };
      return Nn((() => {
        t()
      })), Dn((() => {
        null !== o && clearTimeout(o), void 0 !== e && (void 0 !== e.disconnect ? e.disconnect() : n && e.unobserve(n))
      })), Xa
    } {
      let e = function() {
          null !== o && (clearTimeout(o), o = null), void 0 !== s && (void 0 !== s.removeEventListener && s.removeEventListener("resize", a, Ga.passive), s = void 0)
        },
        t = function() {
          e(), n && n.contentDocument && (s = n.contentDocument.defaultView, s.addEventListener("resize", a, Ga.passive), r())
        };
      const l = function() {
        const e = bt(!$a.value);
        return !1 === e.value && Nn((() => {
          e.value = !0
        })), e
      }();
      let s;
      return Nn((() => {
        It((() => {
          n = i.$el, n && t()
        }))
      })), Dn(e), i.trigger = a, () => {
        if (!0 === l.value) return ql("object", {
          style: bs.style,
          tabindex: -1,
          type: "text/html",
          data: bs.url,
          "aria-hidden": "true",
          onLoad: t
        })
      }
    }
  }
});

function ws(e, t) {
  return void 0 !== e && e() || t
}

function ks(e, t) {
  if (void 0 !== e) {
    const t = e();
    if (null != t) return t.slice()
  }
  return t
}

function xs(e, t) {
  return void 0 !== e ? t.concat(e()) : t
}
var Ss = gs({
    name: "QHeader",
    props: {
      modelValue: {
        type: Boolean,
        default: !0
      },
      reveal: Boolean,
      revealOffset: {
        type: Number,
        default: 250
      },
      bordered: Boolean,
      elevated: Boolean,
      heightHint: {
        type: [String, Number],
        default: 50
      }
    },
    emits: ["reveal", "focusin"],
    setup(e, {
      slots: t,
      emit: n
    }) {
      const {
        proxy: {
          $q: o
        }
      } = xl(), l = mn("_q_l_", Sr);
      if (l === Sr) return console.error("QHeader needs to be child of QLayout"), Sr;
      const a = bt(parseInt(e.heightHint, 10)),
        r = bt(!0),
        i = Rl((() => !0 === e.reveal || l.view.value.indexOf("H") > -1 || o.platform.is.ios && !0 === l.isContainer.value)),
        s = Rl((() => {
          if (!0 !== e.modelValue) return 0;
          if (!0 === i.value) return !0 === r.value ? a.value : 0;
          const t = a.value - l.scroll.value.position;
          return t > 0 ? t : 0
        })),
        u = Rl((() => !0 !== e.modelValue || !0 === i.value && !0 !== r.value)),
        c = Rl((() => !0 === e.modelValue && !0 === u.value && !0 === e.reveal)),
        d = Rl((() => "q-header q-layout__section--marginal " + (!0 === i.value ? "fixed" : "absolute") + "-top" + (!0 === e.bordered ? " q-header--bordered" : "") + (!0 === u.value ? " q-header--hidden" : "") + (!0 !== e.modelValue ? " q-layout--prevent-focus" : ""))),
        p = Rl((() => {
          const e = l.rows.value.top,
            t = {};
          return "l" === e[0] && !0 === l.left.space && (t[!0 === o.lang.rtl ? "right" : "left"] = `${l.left.size}px`), "r" === e[2] && !0 === l.right.space && (t[!0 === o.lang.rtl ? "left" : "right"] = `${l.right.size}px`), t
        }));

      function f(e, t) {
        l.update("header", e, t)
      }

      function v(e, t) {
        e.value !== t && (e.value = t)
      }

      function m({
        height: e
      }) {
        v(a, e), f("size", e)
      }

      function h(e) {
        !0 === c.value && v(r, !0), n("focusin", e)
      }
      gn((() => e.modelValue), (e => {
        f("space", e), v(r, !0), l.animate()
      })), gn(s, (e => {
        f("offset", e)
      })), gn((() => e.reveal), (t => {
        !1 === t && v(r, e.modelValue)
      })), gn(r, (e => {
        l.animate(), n("reveal", e)
      })), gn(l.scroll, (t => {
        !0 === e.reveal && v(r, "up" === t.direction || t.position <= e.revealOffset || t.position - t.inflectionPoint < 100)
      }));
      const g = {};
      return l.instances.header = g, !0 === e.modelValue && f("size", a.value), f("space", e.modelValue), f("offset", s.value), Dn((() => {
        l.instances.header === g && (l.instances.header = void 0, f("size", 0), f("offset", 0), f("space", !1))
      })), () => {
        const n = ks(t.default, []);
        return !0 === e.elevated && n.push(ql("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })), n.push(ql(_s, {
          debounce: 0,
          onResize: m
        })), ql("header", {
          class: d.value,
          style: p.value,
          onFocusin: h
        }, n)
      }
    }
  }),
  Cs = gs({
    name: "QPage",
    props: {
      padding: Boolean,
      styleFn: Function
    },
    setup(e, {
      slots: t
    }) {
      const {
        proxy: {
          $q: n
        }
      } = xl(), o = mn("_q_l_", Sr);
      if (o === Sr) return console.error("QPage needs to be a deep child of QLayout"), Sr;
      if (mn("_q_pc_", Sr) === Sr) return console.error("QPage needs to be child of QPageContainer"), Sr;
      const l = Rl((() => {
          const t = (!0 === o.header.space ? o.header.size : 0) + (!0 === o.footer.space ? o.footer.size : 0);
          if ("function" == typeof e.styleFn) {
            const l = !0 === o.isContainer.value ? o.containerHeight.value : n.screen.height;
            return e.styleFn(t, l)
          }
          return {
            minHeight: !0 === o.isContainer.value ? o.containerHeight.value - t + "px" : 0 === n.screen.height ? 0 !== t ? `calc(100vh - ${t}px)` : "100vh" : n.screen.height - t + "px"
          }
        })),
        a = Rl((() => "q-page" + (!0 === e.padding ? " q-layout-padding" : "")));
      return () => ql("main", {
        class: a.value,
        style: l.value
      }, ws(t.default))
    }
  }),
  Es = gs({
    name: "QPageContainer",
    setup(e, {
      slots: t
    }) {
      const {
        proxy: {
          $q: n
        }
      } = xl(), o = mn("_q_l_", Sr);
      if (o === Sr) return console.error("QPageContainer needs to be child of QLayout"), Sr;
      vn("_q_pc_", !0);
      const l = Rl((() => {
        const e = {};
        return !0 === o.header.space && (e.paddingTop = `${o.header.size}px`), !0 === o.right.space && (e["padding" + (!0 === n.lang.rtl ? "Left" : "Right")] = `${o.right.size}px`), !0 === o.footer.space && (e.paddingBottom = `${o.footer.size}px`), !0 === o.left.space && (e["padding" + (!0 === n.lang.rtl ? "Right" : "Left")] = `${o.left.size}px`), e
      }));
      return () => ql("div", {
        class: "q-page-container",
        style: l.value
      }, ws(t.default))
    }
  });

function As(e, t) {
  const n = e.style;
  for (const o in t) n[o] = t[o]
}

function Ls(e, t) {
  if (null == e || !0 === e.contains(t)) return !0;
  for (let n = e.nextElementSibling; null !== n; n = n.nextElementSibling)
    if (n.contains(t)) return !0;
  return !1
}
const Ts = [null, document, document.body, document.scrollingElement, document.documentElement];

function Os(e, t) {
  let n = function(e) {
    if (null == e) return;
    if ("string" == typeof e) try {
      return document.querySelector(e) || void 0
    } catch (n) {
      return
    }
    const t = kt(e);
    return t ? t.$el || t : void 0
  }(t);
  if (void 0 === n) {
    if (null == e) return window;
    n = e.closest(".scroll,.scroll-y,.overflow-auto")
  }
  return Ts.includes(n) ? window : n
}

function Rs(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop
}

function qs(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft
}
let Vs;

function Ms() {
  if (void 0 !== Vs) return Vs;
  const e = document.createElement("p"),
    t = document.createElement("div");
  As(e, {
    width: "100%",
    height: "200px"
  }), As(t, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  }), t.appendChild(e), document.body.appendChild(t);
  const n = e.offsetWidth;
  t.style.overflow = "scroll";
  let o = e.offsetWidth;
  return n === o && (o = t.clientWidth), t.remove(), Vs = n - o, Vs
}

function Fs(e, t = !0) {
  return !(!e || e.nodeType !== Node.ELEMENT_NODE) && (t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"])))
}
const {
  passive: zs
} = Ga, Ps = ["both", "horizontal", "vertical"];
var Bs = gs({
    name: "QScrollObserver",
    props: {
      axis: {
        type: String,
        validator: e => Ps.includes(e),
        default: "vertical"
      },
      debounce: [String, Number],
      scrollTarget: {
        default: void 0
      }
    },
    emits: ["scroll"],
    setup(e, {
      emit: t
    }) {
      const n = {
        position: {
          top: 0,
          left: 0
        },
        direction: "down",
        directionChanged: !1,
        delta: {
          top: 0,
          left: 0
        },
        inflectionPoint: {
          top: 0,
          left: 0
        }
      };
      let o, l, a = null;

      function r() {
        null !== a && a();
        const l = Math.max(0, Rs(o)),
          r = qs(o),
          i = {
            top: l - n.position.top,
            left: r - n.position.left
          };
        if ("vertical" === e.axis && 0 === i.top || "horizontal" === e.axis && 0 === i.left) return;
        const s = Math.abs(i.top) >= Math.abs(i.left) ? i.top < 0 ? "up" : "down" : i.left < 0 ? "left" : "right";
        n.position = {
          top: l,
          left: r
        }, n.directionChanged = n.direction !== s, n.delta = i, !0 === n.directionChanged && (n.direction = s, n.inflectionPoint = n.position), t("scroll", {
          ...n
        })
      }

      function i() {
        o = Os(l, e.scrollTarget), o.addEventListener("scroll", u, zs), u(!0)
      }

      function s() {
        void 0 !== o && (o.removeEventListener("scroll", u, zs), o = void 0)
      }

      function u(t) {
        if (!0 === t || 0 === e.debounce || "0" === e.debounce) r();
        else if (null === a) {
          const [t, n] = e.debounce ? [setTimeout(r, e.debounce), clearTimeout] : [requestAnimationFrame(r), cancelAnimationFrame];
          a = () => {
            n(t), a = null
          }
        }
      }
      gn((() => e.scrollTarget), (() => {
        s(), i()
      }));
      const {
        proxy: c
      } = xl();
      return gn((() => c.$q.lang.rtl), r), Nn((() => {
        l = c.$el.parentNode, i()
      })), Dn((() => {
        null !== a && a(), s()
      })), Object.assign(c, {
        trigger: u,
        getPosition: () => n
      }), Xa
    }
  }),
  Is = gs({
    name: "QLayout",
    props: {
      container: Boolean,
      view: {
        type: String,
        default: "hhh lpr fff",
        validator: e => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())
      },
      onScroll: Function,
      onScrollHeight: Function,
      onResize: Function
    },
    setup(e, {
      slots: t,
      emit: n
    }) {
      const {
        proxy: {
          $q: o
        }
      } = xl(), l = bt(null), a = bt(o.screen.height), r = bt(!0 === e.container ? 0 : o.screen.width), i = bt({
        position: 0,
        direction: "down",
        inflectionPoint: 0
      }), s = bt(0), u = bt(!0 === $a.value ? 0 : Ms()), c = Rl((() => "q-layout q-layout--" + (!0 === e.container ? "containerized" : "standard"))), d = Rl((() => !1 === e.container ? {
        minHeight: o.screen.height + "px"
      } : null)), p = Rl((() => 0 !== u.value ? {
        [!0 === o.lang.rtl ? "left" : "right"]: `${u.value}px`
      } : null)), f = Rl((() => 0 !== u.value ? {
        [!0 === o.lang.rtl ? "right" : "left"]: 0,
        [!0 === o.lang.rtl ? "left" : "right"]: `-${u.value}px`,
        width: `calc(100% + ${u.value}px)`
      } : null));

      function v(t) {
        if (!0 === e.container || !0 !== document.qScrollPrevented) {
          const o = {
            position: t.position.top,
            direction: t.direction,
            directionChanged: t.directionChanged,
            inflectionPoint: t.inflectionPoint.top,
            delta: t.delta.top
          };
          i.value = o, void 0 !== e.onScroll && n("scroll", o)
        }
      }

      function m(t) {
        const {
          height: o,
          width: l
        } = t;
        let i = !1;
        a.value !== o && (i = !0, a.value = o, void 0 !== e.onScrollHeight && n("scrollHeight", o), g()), r.value !== l && (i = !0, r.value = l), !0 === i && void 0 !== e.onResize && n("resize", t)
      }

      function h({
        height: e
      }) {
        s.value !== e && (s.value = e, g())
      }

      function g() {
        if (!0 === e.container) {
          const e = a.value > s.value ? Ms() : 0;
          u.value !== e && (u.value = e)
        }
      }
      let y = null;
      const b = {
        instances: {},
        view: Rl((() => e.view)),
        isContainer: Rl((() => e.container)),
        rootRef: l,
        height: a,
        containerHeight: s,
        scrollbarWidth: u,
        totalWidth: Rl((() => r.value + u.value)),
        rows: Rl((() => {
          const t = e.view.toLowerCase().split(" ");
          return {
            top: t[0].split(""),
            middle: t[1].split(""),
            bottom: t[2].split("")
          }
        })),
        header: at({
          size: 0,
          offset: 0,
          space: !1
        }),
        right: at({
          size: 300,
          offset: 0,
          space: !1
        }),
        footer: at({
          size: 0,
          offset: 0,
          space: !1
        }),
        left: at({
          size: 300,
          offset: 0,
          space: !1
        }),
        scroll: i,
        animate() {
          null !== y ? clearTimeout(y) : document.body.classList.add("q-body--layout-animate"), y = setTimeout((() => {
            y = null, document.body.classList.remove("q-body--layout-animate")
          }), 155)
        },
        update(e, t, n) {
          b[e][t] = n
        }
      };
      if (vn("_q_l_", b), Ms() > 0) {
        let t = function() {
            a = null, r.classList.remove("hide-scrollbar")
          },
          n = function() {
            if (null === a) {
              if (r.scrollHeight > o.screen.height) return;
              r.classList.add("hide-scrollbar")
            } else clearTimeout(a);
            a = setTimeout(t, 300)
          },
          l = function(e) {
            null !== a && "remove" === e && (clearTimeout(a), t()), window[`${e}EventListener`]("resize", n)
          },
          a = null;
        const r = document.body;
        gn((() => !0 !== e.container ? "add" : "remove"), l), !0 !== e.container && l("add"), Hn((() => {
          l("remove")
        }))
      }
      return () => {
        const n = xs(t.default, [ql(Bs, {
            onScroll: v
          }), ql(_s, {
            onResize: m
          })]),
          o = ql("div", {
            class: c.value,
            style: d.value,
            ref: !0 === e.container ? void 0 : l,
            tabindex: -1
          }, n);
        return !0 === e.container ? ql("div", {
          class: "q-layout-container overflow-hidden",
          ref: l
        }, [ql(_s, {
          onResize: h
        }), ql("div", {
          class: "absolute-full",
          style: p.value
        }, [ql("div", {
          class: "scroll",
          style: f.value
        }, [o])])]) : o
      }
    }
  });
const Ns = ql("div", {
  class: "q-space"
});
var $s = gs({
  name: "QSpace",
  setup: () => () => Ns
});
const js = {
    xs: 18,
    sm: 24,
    md: 32,
    lg: 38,
    xl: 46
  },
  Ds = {
    size: String
  };

function Hs(e, t = js) {
  return Rl((() => void 0 !== e.size ? {
    fontSize: e.size in t ? `${t[e.size]}px` : e.size
  } : null))
}
const Us = "0 0 24 24",
  Ws = e => e,
  Ks = e => `ionicons ${e}`,
  Qs = {
    "mdi-": e => `mdi ${e}`,
    "icon-": Ws,
    "bt-": e => `bt ${e}`,
    "eva-": e => `eva ${e}`,
    "ion-md": Ks,
    "ion-ios": Ks,
    "ion-logo": Ks,
    "iconfont ": Ws,
    "ti-": e => `themify-icon ${e}`,
    "bi-": e => `bootstrap-icons ${e}`
  },
  Gs = {
    o_: "-outlined",
    r_: "-round",
    s_: "-sharp"
  },
  Xs = {
    sym_o_: "-outlined",
    sym_r_: "-rounded",
    sym_s_: "-sharp"
  },
  Js = new RegExp("^(" + Object.keys(Qs).join("|") + ")"),
  Zs = new RegExp("^(" + Object.keys(Gs).join("|") + ")"),
  Ys = new RegExp("^(" + Object.keys(Xs).join("|") + ")"),
  eu = /^[Mm]\s?[-+]?\.?\d/,
  tu = /^img:/,
  nu = /^svguse:/,
  ou = /^ion-/,
  lu = /^(fa-(solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var au = gs({
  name: "QIcon",
  props: {
    ...Ds,
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },
  setup(e, {
    slots: t
  }) {
    const {
      proxy: {
        $q: n
      }
    } = xl(), o = Hs(e), l = Rl((() => "q-icon" + (!0 === e.left ? " on-left" : "") + (!0 === e.right ? " on-right" : "") + (void 0 !== e.color ? ` text-${e.color}` : ""))), a = Rl((() => {
      let t, o = e.name;
      if ("none" === o || !o) return {
        none: !0
      };
      if (null !== n.iconMapFn) {
        const e = n.iconMapFn(o);
        if (void 0 !== e) {
          if (void 0 === e.icon) return {
            cls: e.cls,
            content: void 0 !== e.content ? e.content : " "
          };
          if (o = e.icon, "none" === o || !o) return {
            none: !0
          }
        }
      }
      if (!0 === eu.test(o)) {
        const [e, t = Us] = o.split("|");
        return {
          svg: !0,
          viewBox: t,
          nodes: e.split("&&").map((e => {
            const [t, n, o] = e.split("@@");
            return ql("path", {
              style: n,
              d: t,
              transform: o
            })
          }))
        }
      }
      if (!0 === tu.test(o)) return {
        img: !0,
        src: o.substring(4)
      };
      if (!0 === nu.test(o)) {
        const [e, t = Us] = o.split("|");
        return {
          svguse: !0,
          src: e.substring(7),
          viewBox: t
        }
      }
      let l = " ";
      const a = o.match(Js);
      if (null !== a) t = Qs[a[1]](o);
      else if (!0 === lu.test(o)) t = o;
      else if (!0 === ou.test(o)) t = `ionicons ion-${!0===n.platform.is.ios?"ios":"md"}${o.substring(3)}`;
      else if (!0 === Ys.test(o)) {
        t = "notranslate material-symbols";
        const e = o.match(Ys);
        null !== e && (o = o.substring(6), t += Xs[e[1]]), l = o
      } else {
        t = "notranslate material-icons";
        const e = o.match(Zs);
        null !== e && (o = o.substring(2), t += Gs[e[1]]), l = o
      }
      return {
        cls: t,
        content: l
      }
    }));
    return () => {
      const n = {
        class: l.value,
        style: o.value,
        "aria-hidden": "true",
        role: "presentation"
      };
      return !0 === a.value.none ? ql(e.tag, n, ws(t.default)) : !0 === a.value.img ? ql("span", n, xs(t.default, [ql("img", {
        src: a.value.src
      })])) : !0 === a.value.svg ? ql("span", n, xs(t.default, [ql("svg", {
        viewBox: a.value.viewBox || "0 0 24 24"
      }, a.value.nodes)])) : !0 === a.value.svguse ? ql("span", n, xs(t.default, [ql("svg", {
        viewBox: a.value.viewBox
      }, [ql("use", {
        "xlink:href": a.value.src
      })])])) : (void 0 !== a.value.cls && (n.class += " " + a.value.cls), ql(e.tag, n, xs(t.default, [a.value.content])))
    }
  }
});
const ru = {
  dark: {
    type: Boolean,
    default: null
  }
};

function iu(e, t) {
  return Rl((() => null === e.dark ? t.dark.isActive : e.dark))
}
const su = {
  name: String
};

function uu(e) {
  return Rl((() => e.name || e.for))
}
var cu = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const du = {
    ...ru,
    ...Ds,
    ...su,
    modelValue: {
      required: !0,
      default: null
    },
    val: {},
    trueValue: {
      default: !0
    },
    falseValue: {
      default: !1
    },
    indeterminateValue: {
      default: null
    },
    checkedIcon: String,
    uncheckedIcon: String,
    indeterminateIcon: String,
    toggleOrder: {
      type: String,
      validator: e => "tf" === e || "ft" === e
    },
    toggleIndeterminate: Boolean,
    label: String,
    leftLabel: Boolean,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number]
  },
  pu = ["update:modelValue"];

function fu(e, t) {
  const {
    props: n,
    slots: o,
    emit: l,
    proxy: a
  } = xl(), {
    $q: r
  } = a, i = iu(n, r), s = bt(null), {
    refocusTargetEl: u,
    refocusTarget: c
  } = function(e, t) {
    const n = bt(null);
    return {
      refocusTargetEl: Rl((() => !0 === e.disable ? null : ql("span", {
        ref: n,
        class: "no-outline",
        tabindex: -1
      }))),
      refocusTarget: function(e) {
        const o = t.value;
        void 0 !== e && 0 === e.type.indexOf("key") ? null !== o && document.activeElement !== o && !0 === o.contains(document.activeElement) && o.focus() : null !== n.value && (void 0 === e || null !== o && !0 === o.contains(e.target)) && n.value.focus()
      }
    }
  }(n, s), d = Hs(n, cu), p = Rl((() => void 0 !== n.val && Array.isArray(n.modelValue))), f = Rl((() => {
    const e = pt(n.val);
    return !0 === p.value ? n.modelValue.findIndex((t => pt(t) === e)) : -1
  })), v = Rl((() => !0 === p.value ? f.value > -1 : pt(n.modelValue) === pt(n.trueValue))), m = Rl((() => !0 === p.value ? -1 === f.value : pt(n.modelValue) === pt(n.falseValue))), h = Rl((() => !1 === v.value && !1 === m.value)), g = Rl((() => !0 === n.disable ? -1 : n.tabindex || 0)), y = Rl((() => `q-${e} cursor-pointer no-outline row inline no-wrap items-center` + (!0 === n.disable ? " disabled" : "") + (!0 === i.value ? ` q-${e}--dark` : "") + (!0 === n.dense ? ` q-${e}--dense` : "") + (!0 === n.leftLabel ? " reverse" : ""))), b = Rl((() => {
    const t = !0 === v.value ? "truthy" : !0 === m.value ? "falsy" : "indet",
      o = void 0 === n.color || !0 !== n.keepColor && ("toggle" === e ? !0 !== v.value : !0 === m.value) ? "" : ` text-${n.color}`;
    return `q-${e}__inner relative-position non-selectable q-${e}__inner--${t}${o}`
  })), _ = function(e = {}) {
    return (t, n, o) => {
      t[n](ql("input", {
        class: "hidden" + (o || ""),
        ...e.value
      }))
    }
  }(Rl((() => {
    const e = {
      type: "checkbox"
    };
    return void 0 !== n.name && Object.assign(e, {
      ".checked": v.value,
      "^checked": !0 === v.value ? "checked" : void 0,
      name: n.name,
      value: !0 === p.value ? n.val : n.trueValue
    }), e
  }))), w = Rl((() => {
    const t = {
      tabindex: g.value,
      role: "toggle" === e ? "switch" : "checkbox",
      "aria-label": n.label,
      "aria-checked": !0 === h.value ? "mixed" : !0 === v.value ? "true" : "false"
    };
    return !0 === n.disable && (t["aria-disabled"] = "true"), t
  }));

  function k(e) {
    void 0 !== e && (er(e), c(e)), !0 !== n.disable && l("update:modelValue", function() {
      if (!0 === p.value) {
        if (!0 === v.value) {
          const e = n.modelValue.slice();
          return e.splice(f.value, 1), e
        }
        return n.modelValue.concat([n.val])
      }
      if (!0 === v.value) {
        if ("ft" !== n.toggleOrder || !1 === n.toggleIndeterminate) return n.falseValue
      } else {
        if (!0 !== m.value) return "ft" !== n.toggleOrder ? n.trueValue : n.falseValue;
        if ("ft" === n.toggleOrder || !1 === n.toggleIndeterminate) return n.trueValue
      }
      return n.indeterminateValue
    }(), e)
  }

  function x(e) {
    13 !== e.keyCode && 32 !== e.keyCode || er(e)
  }

  function S(e) {
    13 !== e.keyCode && 32 !== e.keyCode || k(e)
  }
  const C = t(v, h);
  return Object.assign(a, {
    toggle: k
  }), () => {
    const t = C();
    !0 !== n.disable && _(t, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
    const l = [ql("div", {
      class: b.value,
      style: d.value,
      "aria-hidden": "true"
    }, t)];
    null !== u.value && l.push(u.value);
    const a = void 0 !== n.label ? xs(o.default, [n.label]) : ws(o.default);
    return void 0 !== a && l.push(ql("div", {
      class: `q-${e}__label q-anchor--skip`
    }, a)), ql("div", {
      ref: s,
      class: y.value,
      ...w.value,
      onClick: k,
      onKeydown: x,
      onKeyup: S
    }, l)
  }
}
var vu = gs({
    name: "QToggle",
    props: {
      ...du,
      icon: String,
      iconColor: String
    },
    emits: pu,
    setup: e => fu("toggle", (function(t, n) {
      const o = Rl((() => (!0 === t.value ? e.checkedIcon : !0 === n.value ? e.indeterminateIcon : e.uncheckedIcon) || e.icon)),
        l = Rl((() => !0 === t.value ? e.iconColor : null));
      return () => [ql("div", {
        class: "q-toggle__track"
      }), ql("div", {
        class: "q-toggle__thumb absolute flex flex-center no-wrap"
      }, void 0 !== o.value ? [ql(au, {
        name: o.value,
        color: l.value
      })] : void 0)]
    }))
  }),
  mu = gs({
    name: "QToolbar",
    props: {
      inset: Boolean
    },
    setup(e, {
      slots: t
    }) {
      const n = Rl((() => "q-toolbar row no-wrap items-center" + (!0 === e.inset ? " q-toolbar--inset" : "")));
      return () => ql("div", {
        class: n.value,
        role: "toolbar"
      }, ws(t.default))
    }
  });
const hu = chrome.runtime.getURL("assets/config.json");
const gu = {
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
  yu = {
    proxyType: ["socks5", "http", "https", "socks4"],
    mode: ["click", "token"]
  };
async function bu() {
  const e = await async function() {
    const e = await chrome.storage.local.get("defaultConfig");
    if (e.defaultConfig) return e.defaultConfig;
    let t = {};
    const n = await fetch(hu),
      o = await n.json();
    return o && (t = o, chrome.storage.local.set({
      defaultConfig: t
    })), t
  }(), t = Object.keys(e);
  for (let n of t)
    if (("proxyType" !== n || yu[n].includes(e[n])) && (!n.endsWith("Mode") || yu.mode.includes(e[n]))) {
      if ("port" === n) {
        if ("number" != typeof e[n]) continue;
        gu[n] = e[n]
      }
      Reflect.has(gu, n) && typeof gu[n] == typeof e[n] && (gu[n] = e[n])
    } return gu
}
const _u = bu();
let wu = {
  default: _u,
  async get(e) {
    return (await this.getAll())[e]
  },
  async getAll() {
    const e = await bu(),
      t = await chrome.storage.local.get("config");
    return wu.joinConfig(e, t.config)
  },
  async set(e) {
    const t = await wu.getAll(),
      n = wu.joinConfig(t, e);
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
var ku = gs({
    name: "QItemSection",
    props: {
      avatar: Boolean,
      thumbnail: Boolean,
      side: Boolean,
      top: Boolean,
      noWrap: Boolean
    },
    setup(e, {
      slots: t
    }) {
      const n = Rl((() => "q-item__section column q-item__section--" + (!0 === e.avatar || !0 === e.side || !0 === e.thumbnail ? "side" : "main") + (!0 === e.top ? " q-item__section--top justify-start" : " justify-center") + (!0 === e.avatar ? " q-item__section--avatar" : "") + (!0 === e.thumbnail ? " q-item__section--thumbnail" : "") + (!0 === e.noWrap ? " q-item__section--nowrap" : "")));
      return () => ql("div", {
        class: n.value
      }, ws(t.default))
    }
  }),
  xu = gs({
    name: "QItemLabel",
    props: {
      overline: Boolean,
      caption: Boolean,
      header: Boolean,
      lines: [Number, String]
    },
    setup(e, {
      slots: t
    }) {
      const n = Rl((() => parseInt(e.lines, 10))),
        o = Rl((() => "q-item__label" + (!0 === e.overline ? " q-item__label--overline text-overline" : "") + (!0 === e.caption ? " q-item__label--caption text-caption" : "") + (!0 === e.header ? " q-item__label--header" : "") + (1 === n.value ? " ellipsis" : ""))),
        l = Rl((() => void 0 !== e.lines && n.value > 1 ? {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": n.value
        } : null));
      return () => ql("div", {
        style: l.value,
        class: o.value
      }, ws(t.default))
    }
  });

function Su(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent;
  let {
    parent: t
  } = e.$;
  for (; Object(t) === t;) {
    if (Object(t.proxy) === t.proxy) return t.proxy;
    t = t.parent
  }
}

function Cu(e) {
  return void 0 !== e.appContext.config.globalProperties.$router
}

function Eu(e) {
  return !0 === e.isUnmounted || !0 === e.isDeactivated
}

function Au(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}

function Lu(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}

function Tu(e, t) {
  return !0 === Array.isArray(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t
}

function Ou(e, t) {
  return !0 === Array.isArray(e) ? Tu(e, t) : !0 === Array.isArray(t) ? Tu(t, e) : e === t
}
const Ru = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: {
    type: String,
    default: "q-router-link--active"
  },
  exactActiveClass: {
    type: String,
    default: "q-router-link--exact-active"
  },
  href: String,
  target: String,
  disable: Boolean
};

function qu({
  fallbackTag: e,
  useDisableForRouterLinkProps: t = !0
} = {}) {
  const n = xl(),
    {
      props: o,
      proxy: l,
      emit: a
    } = n,
    r = Cu(n),
    i = Rl((() => !0 !== o.disable && void 0 !== o.href)),
    s = Rl(!0 === t ? () => !0 === r && !0 !== o.disable && !0 !== i.value && void 0 !== o.to && null !== o.to && "" !== o.to : () => !0 === r && !0 !== i.value && void 0 !== o.to && null !== o.to && "" !== o.to),
    u = Rl((() => !0 === s.value ? y(o.to) : null)),
    c = Rl((() => null !== u.value)),
    d = Rl((() => !0 === i.value || !0 === c.value)),
    p = Rl((() => "a" === o.type || !0 === d.value ? "a" : o.tag || e || "div")),
    f = Rl((() => !0 === i.value ? {
      href: o.href,
      target: o.target
    } : !0 === c.value ? {
      href: u.value.href,
      target: o.target
    } : {})),
    v = Rl((() => {
      if (!1 === c.value) return -1;
      const {
        matched: e
      } = u.value, {
        length: t
      } = e, n = e[t - 1];
      if (void 0 === n) return -1;
      const o = l.$route.matched;
      if (0 === o.length) return -1;
      const a = o.findIndex(Lu.bind(null, n));
      if (a > -1) return a;
      const r = Au(e[t - 2]);
      return t > 1 && Au(n) === r && o[o.length - 1].path !== r ? o.findIndex(Lu.bind(null, e[t - 2])) : a
    })),
    m = Rl((() => !0 === c.value && -1 !== v.value && function(e, t) {
      for (const n in t) {
        const o = t[n],
          l = e[n];
        if ("string" == typeof o) {
          if (o !== l) return !1
        } else if (!1 === Array.isArray(l) || l.length !== o.length || o.some(((e, t) => e !== l[t]))) return !1
      }
      return !0
    }(l.$route.params, u.value.params))),
    h = Rl((() => !0 === m.value && v.value === l.$route.matched.length - 1 && function(e, t) {
      if (Object.keys(e).length !== Object.keys(t).length) return !1;
      for (const n in e)
        if (!1 === Ou(e[n], t[n])) return !1;
      return !0
    }(l.$route.params, u.value.params))),
    g = Rl((() => !0 === c.value ? !0 === h.value ? ` ${o.exactActiveClass} ${o.activeClass}` : !0 === o.exact ? "" : !0 === m.value ? ` ${o.activeClass}` : "" : ""));

  function y(e) {
    try {
      return l.$router.resolve(e)
    } catch (t) {}
    return null
  }

  function b(e, {
    returnRouterError: t,
    to: n = o.to,
    replace: a = o.replace
  } = {}) {
    if (!0 === o.disable) return e.preventDefault(), Promise.resolve(!1);
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || void 0 !== e.button && 0 !== e.button || "_blank" === o.target) return Promise.resolve(!1);
    e.preventDefault();
    const r = l.$router[!0 === a ? "replace" : "push"](n);
    return !0 === t ? r : r.then((() => {})).catch((() => {}))
  }
  return {
    hasRouterLink: c,
    hasHrefLink: i,
    hasLink: d,
    linkTag: p,
    resolvedLink: u,
    linkIsActive: m,
    linkIsExactActive: h,
    linkClass: g,
    linkAttrs: f,
    getLink: y,
    navigateToRouterLink: b,
    navigateOnClick: function(e) {
      if (!0 === c.value) {
        const t = t => b(e, t);
        a("click", e, t), !0 !== e.defaultPrevented && t()
      } else a("click", e)
    }
  }
}
var Vu = gs({
  name: "QItem",
  props: {
    ...ru,
    ...Ru,
    tag: {
      type: String,
      default: "div"
    },
    active: {
      type: Boolean,
      default: null
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean
  },
  emits: ["click", "keyup"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const {
      proxy: {
        $q: o
      }
    } = xl(), l = iu(e, o), {
      hasLink: a,
      linkAttrs: r,
      linkClass: i,
      linkTag: s,
      navigateOnClick: u
    } = qu(), c = bt(null), d = bt(null), p = Rl((() => !0 === e.clickable || !0 === a.value || "label" === e.tag)), f = Rl((() => !0 !== e.disable && !0 === p.value)), v = Rl((() => "q-item q-item-type row no-wrap" + (!0 === e.dense ? " q-item--dense" : "") + (!0 === l.value ? " q-item--dark" : "") + (!0 === a.value && null === e.active ? i.value : !0 === e.active ? " q-item--active" + (void 0 !== e.activeClass ? ` ${e.activeClass}` : "") : "") + (!0 === e.disable ? " disabled" : "") + (!0 === f.value ? " q-item--clickable q-link cursor-pointer " + (!0 === e.manualFocus ? "q-manual-focusable" : "q-focusable q-hoverable") + (!0 === e.focused ? " q-manual-focusable--focused" : "") : ""))), m = Rl((() => {
      if (void 0 === e.insetLevel) return null;
      return {
        ["padding" + (!0 === o.lang.rtl ? "Right" : "Left")]: 16 + 56 * e.insetLevel + "px"
      }
    }));

    function h(e) {
      !0 === f.value && (null !== d.value && (!0 !== e.qKeyEvent && document.activeElement === c.value ? d.value.focus() : document.activeElement === d.value && c.value.focus()), u(e))
    }

    function g(e) {
      if (!0 === f.value && !0 === br(e, 13)) {
        er(e), e.qKeyEvent = !0;
        const t = new MouseEvent("click", e);
        t.qKeyEvent = !0, c.value.dispatchEvent(t)
      }
      n("keyup", e)
    }
    return () => {
      const n = {
        ref: c,
        class: v.value,
        style: m.value,
        role: "listitem",
        onClick: h,
        onKeyup: g
      };
      return !0 === f.value ? (n.tabindex = e.tabindex || "0", Object.assign(n, r.value)) : !0 === p.value && (n["aria-disabled"] = "true"), ql(s.value, n, function() {
        const e = ks(t.default, []);
        return !0 === f.value && e.unshift(ql("div", {
          class: "q-focus-helper",
          tabindex: -1,
          ref: d
        })), e
      }())
    }
  }
});
const Mu = {
  size: {
    type: [Number, String],
    default: "1em"
  },
  color: String
};

function Fu(e) {
  return {
    cSize: Rl((() => e.size in js ? `${js[e.size]}px` : e.size)),
    classes: Rl((() => "q-spinner" + (e.color ? ` text-${e.color}` : "")))
  }
}
var zu = gs({
  name: "QSpinner",
  props: {
    ...Mu,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(e) {
    const {
      cSize: t,
      classes: n
    } = Fu(e);
    return () => ql("svg", {
      class: n.value + " q-spinner-mat",
      width: t.value,
      height: t.value,
      viewBox: "25 25 50 50"
    }, [ql("circle", {
      class: "path",
      cx: "50",
      cy: "50",
      r: "20",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": e.thickness,
      "stroke-miterlimit": "10"
    })])
  }
});
const Pu = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  Bu = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  Iu = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  Nu = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  $u = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,
  ju = {
    date: e => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),
    time: e => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),
    fulltime: e => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),
    timeOrFulltime: e => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),
    email: e => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),
    hexColor: e => Pu.test(e),
    hexaColor: e => Bu.test(e),
    hexOrHexaColor: e => Iu.test(e),
    rgbColor: e => Nu.test(e),
    rgbaColor: e => $u.test(e),
    rgbOrRgbaColor: e => Nu.test(e) || $u.test(e),
    hexOrRgbColor: e => Pu.test(e) || Nu.test(e),
    hexaOrRgbaColor: e => Bu.test(e) || $u.test(e),
    anyColor: e => Iu.test(e) || Nu.test(e) || $u.test(e)
  },
  Du = [!0, !1, "ondemand"],
  Hu = {
    modelValue: {},
    error: {
      type: Boolean,
      default: null
    },
    errorMessage: String,
    noErrorIcon: Boolean,
    rules: Array,
    reactiveRules: Boolean,
    lazyRules: {
      type: [Boolean, String],
      validator: e => Du.includes(e)
    }
  };

function Uu(e, t) {
  const {
    props: n,
    proxy: o
  } = xl(), l = bt(!1), a = bt(null), r = bt(null);
  ! function({
    validate: e,
    resetValidation: t,
    requiresQForm: n
  }) {
    const o = mn("_q_fo_", !1);
    if (!1 !== o) {
      const {
        props: n,
        proxy: l
      } = xl();
      Object.assign(l, {
        validate: e,
        resetValidation: t
      }), gn((() => n.disable), (e => {
        !0 === e ? ("function" == typeof t && t(), o.unbindComponent(l)) : o.bindComponent(l)
      })), Nn((() => {
        !0 !== n.disable && o.bindComponent(l)
      })), Dn((() => {
        !0 !== n.disable && o.unbindComponent(l)
      }))
    } else !0 === n && console.error("Parent QForm not found on useFormChild()!")
  }({
    validate: v,
    resetValidation: f
  });
  let i, s = 0;
  const u = Rl((() => void 0 !== n.rules && null !== n.rules && n.rules.length > 0)),
    c = Rl((() => !0 !== n.disable && !0 === u.value)),
    d = Rl((() => !0 === n.error || !0 === l.value)),
    p = Rl((() => "string" == typeof n.errorMessage && n.errorMessage.length > 0 ? n.errorMessage : a.value));

  function f() {
    s++, t.value = !1, r.value = null, l.value = !1, a.value = null, h.cancel()
  }

  function v(e = n.modelValue) {
    if (!0 !== c.value) return !0;
    const o = ++s,
      i = !0 !== t.value ? () => {
        r.value = !0
      } : () => {},
      u = (e, n) => {
        !0 === e && i(), l.value = e, a.value = n || null, t.value = !1
      },
      d = [];
    for (let t = 0; t < n.rules.length; t++) {
      const o = n.rules[t];
      let l;
      if ("function" == typeof o ? l = o(e, ju) : "string" == typeof o && void 0 !== ju[o] && (l = ju[o](e)), !1 === l || "string" == typeof l) return u(!0, l), !1;
      !0 !== l && void 0 !== l && d.push(l)
    }
    return 0 === d.length ? (u(!1), !0) : (t.value = !0, Promise.all(d).then((e => {
      if (void 0 === e || !1 === Array.isArray(e) || 0 === e.length) return o === s && u(!1), !0;
      const t = e.find((e => !1 === e || "string" == typeof e));
      return o === s && u(void 0 !== t, t), void 0 === t
    }), (e => (o === s && (console.error(e), u(!0)), !1))))
  }

  function m(e) {
    !0 === c.value && "ondemand" !== n.lazyRules && (!0 === r.value || !0 !== n.lazyRules && !0 !== e) && h()
  }
  gn((() => n.modelValue), (() => {
    m()
  })), gn((() => n.reactiveRules), (e => {
    !0 === e ? void 0 === i && (i = gn((() => n.rules), (() => {
      m(!0)
    }))) : void 0 !== i && (i(), i = void 0)
  }), {
    immediate: !0
  }), gn(e, (e => {
    !0 === e ? null === r.value && (r.value = !1) : !1 === r.value && (r.value = !0, !0 === c.value && "ondemand" !== n.lazyRules && !1 === t.value && h())
  }));
  const h = or(v, 0);
  return Dn((() => {
    void 0 !== i && i(), h.cancel()
  })), Object.assign(o, {
    resetValidation: f,
    validate: v
  }), Na(o, "hasError", (() => d.value)), {
    isDirtyModel: r,
    hasRules: u,
    hasError: d,
    errorMessage: p,
    validate: v,
    resetValidation: f
  }
}
const Wu = /^on[A-Z]/;

function Ku(e, t) {
  const n = {
    listeners: bt({}),
    attributes: bt({})
  };

  function o() {
    const o = {},
      l = {};
    for (const t in e) "class" !== t && "style" !== t && !1 === Wu.test(t) && (o[t] = e[t]);
    for (const e in t.props) !0 === Wu.test(e) && (l[e] = t.props[e]);
    n.attributes.value = o, n.listeners.value = l
  }
  return $n(o), o(), n
}
let Qu = [],
  Gu = [];

function Xu(e) {
  Gu = Gu.filter((t => t !== e))
}

function Ju(e) {
  Xu(e), 0 === Gu.length && Qu.length > 0 && (Qu[Qu.length - 1](), Qu = [])
}

function Zu(e) {
  0 === Gu.length ? e() : Qu.push(e)
}

function Yu(e) {
  return void 0 === e ? `f_${ba()}` : e
}

function ec(e) {
  return null != e && ("" + e).length > 0
}
const tc = {
    ...ru,
    ...Hu,
    label: String,
    stackLabel: Boolean,
    hint: String,
    hideHint: Boolean,
    prefix: String,
    suffix: String,
    labelColor: String,
    color: String,
    bgColor: String,
    filled: Boolean,
    outlined: Boolean,
    borderless: Boolean,
    standout: [Boolean, String],
    square: Boolean,
    loading: Boolean,
    labelSlot: Boolean,
    bottomSlots: Boolean,
    hideBottomSpace: Boolean,
    rounded: Boolean,
    dense: Boolean,
    itemAligned: Boolean,
    counter: Boolean,
    clearable: Boolean,
    clearIcon: String,
    disable: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    for: String,
    maxlength: [Number, String]
  },
  nc = ["update:modelValue", "clear", "focus", "blur", "popupShow", "popupHide"];

function oc() {
  const {
    props: e,
    attrs: t,
    proxy: n,
    vnode: o
  } = xl();
  return {
    isDark: iu(e, n.$q),
    editable: Rl((() => !0 !== e.disable && !0 !== e.readonly)),
    innerLoading: bt(!1),
    focused: bt(!1),
    hasPopupOpen: !1,
    splitAttrs: Ku(t, o),
    targetUid: bt(Yu(e.for)),
    rootRef: bt(null),
    targetRef: bt(null),
    controlRef: bt(null)
  }
}

function lc(e) {
  const {
    props: t,
    emit: n,
    slots: o,
    attrs: l,
    proxy: a
  } = xl(), {
    $q: r
  } = a;
  let i = null;
  void 0 === e.hasValue && (e.hasValue = Rl((() => ec(t.modelValue)))), void 0 === e.emitValue && (e.emitValue = e => {
    n("update:modelValue", e)
  }), void 0 === e.controlEvents && (e.controlEvents = {
    onFocusin: S,
    onFocusout: C
  }), Object.assign(e, {
    clearValue: E,
    onControlFocusin: S,
    onControlFocusout: C,
    focus: x
  }), void 0 === e.computedCounter && (e.computedCounter = Rl((() => {
    if (!1 !== t.counter) {
      const e = "string" == typeof t.modelValue || "number" == typeof t.modelValue ? ("" + t.modelValue).length : !0 === Array.isArray(t.modelValue) ? t.modelValue.length : 0,
        n = void 0 !== t.maxlength ? t.maxlength : t.maxValues;
      return e + (void 0 !== n ? " / " + n : "")
    }
  })));
  const {
    isDirtyModel: s,
    hasRules: u,
    hasError: c,
    errorMessage: d,
    resetValidation: p
  } = Uu(e.focused, e.innerLoading), f = void 0 !== e.floatingLabel ? Rl((() => !0 === t.stackLabel || !0 === e.focused.value || !0 === e.floatingLabel.value)) : Rl((() => !0 === t.stackLabel || !0 === e.focused.value || !0 === e.hasValue.value)), v = Rl((() => !0 === t.bottomSlots || void 0 !== t.hint || !0 === u.value || !0 === t.counter || null !== t.error)), m = Rl((() => !0 === t.filled ? "filled" : !0 === t.outlined ? "outlined" : !0 === t.borderless ? "borderless" : t.standout ? "standout" : "standard")), h = Rl((() => `q-field row no-wrap items-start q-field--${m.value}` + (void 0 !== e.fieldClass ? ` ${e.fieldClass.value}` : "") + (!0 === t.rounded ? " q-field--rounded" : "") + (!0 === t.square ? " q-field--square" : "") + (!0 === f.value ? " q-field--float" : "") + (!0 === y.value ? " q-field--labeled" : "") + (!0 === t.dense ? " q-field--dense" : "") + (!0 === t.itemAligned ? " q-field--item-aligned q-item-type" : "") + (!0 === e.isDark.value ? " q-field--dark" : "") + (void 0 === e.getControl ? " q-field--auto-height" : "") + (!0 === e.focused.value ? " q-field--focused" : "") + (!0 === c.value ? " q-field--error" : "") + (!0 === c.value || !0 === e.focused.value ? " q-field--highlighted" : "") + (!0 !== t.hideBottomSpace && !0 === v.value ? " q-field--with-bottom" : "") + (!0 === t.disable ? " q-field--disabled" : !0 === t.readonly ? " q-field--readonly" : ""))), g = Rl((() => "q-field__control relative-position row no-wrap" + (void 0 !== t.bgColor ? ` bg-${t.bgColor}` : "") + (!0 === c.value ? " text-negative" : "string" == typeof t.standout && t.standout.length > 0 && !0 === e.focused.value ? ` ${t.standout}` : void 0 !== t.color ? ` text-${t.color}` : ""))), y = Rl((() => !0 === t.labelSlot || void 0 !== t.label)), b = Rl((() => "q-field__label no-pointer-events absolute ellipsis" + (void 0 !== t.labelColor && !0 !== c.value ? ` text-${t.labelColor}` : ""))), _ = Rl((() => ({
    id: e.targetUid.value,
    editable: e.editable.value,
    focused: e.focused.value,
    floatingLabel: f.value,
    modelValue: t.modelValue,
    emitValue: e.emitValue
  }))), w = Rl((() => {
    const n = {
      for: e.targetUid.value
    };
    return !0 === t.disable ? n["aria-disabled"] = "true" : !0 === t.readonly && (n["aria-readonly"] = "true"), n
  }));

  function k() {
    const t = document.activeElement;
    let n = void 0 !== e.targetRef && e.targetRef.value;
    !n || null !== t && t.id === e.targetUid.value || (!0 === n.hasAttribute("tabindex") || (n = n.querySelector("[tabindex]")), n && n !== t && n.focus({
      preventScroll: !0
    }))
  }

  function x() {
    Zu(k)
  }

  function S(t) {
    null !== i && (clearTimeout(i), i = null), !0 === e.editable.value && !1 === e.focused.value && (e.focused.value = !0, n("focus", t))
  }

  function C(t, o) {
    null !== i && clearTimeout(i), i = setTimeout((() => {
      i = null, (!0 !== document.hasFocus() || !0 !== e.hasPopupOpen && void 0 !== e.controlRef && null !== e.controlRef.value && !1 === e.controlRef.value.contains(document.activeElement)) && (!0 === e.focused.value && (e.focused.value = !1, n("blur", t)), void 0 !== o && o())
    }))
  }

  function E(o) {
    if (er(o), !0 !== r.platform.is.mobile) {
      (void 0 !== e.targetRef && e.targetRef.value || e.rootRef.value).focus()
    } else !0 === e.rootRef.value.contains(document.activeElement) && document.activeElement.blur();
    "file" === t.type && (e.inputRef.value.value = null), n("update:modelValue", null), n("clear", t.modelValue), It((() => {
      p(), !0 !== r.platform.is.mobile && (s.value = !1)
    }))
  }

  function A() {
    const n = [];
    return void 0 !== o.prepend && n.push(ql("div", {
      class: "q-field__prepend q-field__marginal row no-wrap items-center",
      key: "prepend",
      onClick: Ya
    }, o.prepend())), n.push(ql("div", {
      class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
    }, function() {
      const n = [];
      void 0 !== t.prefix && null !== t.prefix && n.push(ql("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, t.prefix)), void 0 !== e.getShadowControl && !0 === e.hasShadow.value && n.push(e.getShadowControl());
      void 0 !== e.getControl ? n.push(e.getControl()) : void 0 !== o.rawControl ? n.push(o.rawControl()) : void 0 !== o.control && n.push(ql("div", {
        ref: e.targetRef,
        class: "q-field__native row",
        tabindex: -1,
        ...e.splitAttrs.attributes.value,
        "data-autofocus": !0 === t.autofocus || void 0
      }, o.control(_.value)));
      return !0 === y.value && n.push(ql("div", {
        class: b.value
      }, ws(o.label, t.label))), void 0 !== t.suffix && null !== t.suffix && n.push(ql("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, t.suffix)), n.concat(ws(o.default))
    }())), !0 === c.value && !1 === t.noErrorIcon && n.push(T("error", [ql(au, {
      name: r.iconSet.field.error,
      color: "negative"
    })])), !0 === t.loading || !0 === e.innerLoading.value ? n.push(T("inner-loading-append", void 0 !== o.loading ? o.loading() : [ql(zu, {
      color: t.color
    })])) : !0 === t.clearable && !0 === e.hasValue.value && !0 === e.editable.value && n.push(T("inner-clearable-append", [ql(au, {
      class: "q-field__focusable-action",
      tag: "button",
      name: t.clearIcon || r.iconSet.field.clear,
      tabindex: 0,
      type: "button",
      "aria-hidden": null,
      role: null,
      onClick: E
    })])), void 0 !== o.append && n.push(ql("div", {
      class: "q-field__append q-field__marginal row no-wrap items-center",
      key: "append",
      onClick: Ya
    }, o.append())), void 0 !== e.getInnerAppend && n.push(T("inner-append", e.getInnerAppend())), void 0 !== e.getControlChild && n.push(e.getControlChild()), n
  }

  function L() {
    let n, l;
    !0 === c.value ? null !== d.value ? (n = [ql("div", {
      role: "alert"
    }, d.value)], l = `q--slot-error-${d.value}`) : (n = ws(o.error), l = "q--slot-error") : !0 === t.hideHint && !0 !== e.focused.value || (void 0 !== t.hint ? (n = [ql("div", t.hint)], l = `q--slot-hint-${t.hint}`) : (n = ws(o.hint), l = "q--slot-hint"));
    const a = !0 === t.counter || void 0 !== o.counter;
    if (!0 === t.hideBottomSpace && !1 === a && void 0 === n) return;
    const r = ql("div", {
      key: l,
      class: "q-field__messages col"
    }, n);
    return ql("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (!0 !== t.hideBottomSpace ? "animated" : "stale"),
      onClick: Ya
    }, [!0 === t.hideBottomSpace ? r : ql(Xl, {
      name: "q-transition--field-message"
    }, (() => r)), !0 === a ? ql("div", {
      class: "q-field__counter"
    }, void 0 !== o.counter ? o.counter() : e.computedCounter.value) : null])
  }

  function T(e, t) {
    return null === t ? null : ql("div", {
      key: e,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, t)
  }
  gn((() => t.for), (t => {
    e.targetUid.value = Yu(t)
  }));
  let O = !1;
  return Mn((() => {
      O = !0
    })), Vn((() => {
      !0 === O && !0 === t.autofocus && a.focus()
    })), Nn((() => {
      !0 === $a.value && void 0 === t.for && (e.targetUid.value = Yu()), !0 === t.autofocus && a.focus()
    })), Dn((() => {
      null !== i && clearTimeout(i)
    })), Object.assign(a, {
      focus: x,
      blur: function() {
        var t;
        t = k, Qu = Qu.filter((e => e !== t));
        const n = document.activeElement;
        null !== n && e.rootRef.value.contains(n) && n.blur()
      }
    }),
    function() {
      const n = void 0 === e.getControl && void 0 === o.control ? {
        ...e.splitAttrs.attributes.value,
        "data-autofocus": !0 === t.autofocus || void 0,
        ...w.value
      } : w.value;
      return ql("label", {
        ref: e.rootRef,
        class: [h.value, l.class],
        style: l.style,
        ...n
      }, [void 0 !== o.before ? ql("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: Ya
      }, o.before()) : null, ql("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [ql("div", {
        ref: e.controlRef,
        class: g.value,
        tabindex: -1,
        ...e.controlEvents
      }, A()), !0 === v.value ? L() : null]), void 0 !== o.after ? ql("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: Ya
      }, o.after()) : null])
    }
}
var ac = gs({
  name: "QField",
  inheritAttrs: !1,
  props: tc,
  emits: nc,
  setup: () => lc(oc())
});

function rc(e, t = 250) {
  let n, o = !1;
  return function() {
    return !1 === o && (o = !0, setTimeout((() => {
      o = !1
    }), t), n = e.apply(this, arguments)), n
  }
}

function ic(e, t, n, o) {
  !0 === n.modifiers.stop && Za(e);
  const l = n.modifiers.color;
  let a = n.modifiers.center;
  a = !0 === a || !0 === o;
  const r = document.createElement("span"),
    i = document.createElement("span"),
    s = Ja(e),
    {
      left: u,
      top: c,
      width: d,
      height: p
    } = t.getBoundingClientRect(),
    f = Math.sqrt(d * d + p * p),
    v = f / 2,
    m = (d - f) / 2 + "px",
    h = a ? m : s.left - u - v + "px",
    g = (p - f) / 2 + "px",
    y = a ? g : s.top - c - v + "px";
  i.className = "q-ripple__inner", As(i, {
    height: `${f}px`,
    width: `${f}px`,
    transform: `translate3d(${h},${y},0) scale3d(.2,.2,1)`,
    opacity: 0
  }), r.className = "q-ripple" + (l ? " text-" + l : ""), r.setAttribute("dir", "ltr"), r.appendChild(i), t.appendChild(r);
  const b = () => {
    r.remove(), clearTimeout(_)
  };
  n.abort.push(b);
  let _ = setTimeout((() => {
    i.classList.add("q-ripple__inner--enter"), i.style.transform = `translate3d(${m},${g},0) scale3d(1,1,1)`, i.style.opacity = .2, _ = setTimeout((() => {
      i.classList.remove("q-ripple__inner--enter"), i.classList.add("q-ripple__inner--leave"), i.style.opacity = 0, _ = setTimeout((() => {
        r.remove(), n.abort.splice(n.abort.indexOf(b), 1)
      }), 275)
    }), 250)
  }), 50)
}

function sc(e, {
  modifiers: t,
  value: n,
  arg: o
}) {
  const l = Object.assign({}, e.cfg.ripple, t, n);
  e.modifiers = {
    early: !0 === l.early,
    stop: !0 === l.stop,
    center: !0 === l.center,
    color: l.color || o,
    keyCodes: [].concat(l.keyCodes || 13)
  }
}
var uc = ft({
  name: "ripple",
  beforeMount(e, t) {
    const n = t.instance.$.appContext.config.globalProperties.$q.config || {};
    if (!1 === n.ripple) return;
    const o = {
      cfg: n,
      enabled: !1 !== t.value,
      modifiers: {},
      abort: [],
      start(t) {
        !0 === o.enabled && !0 !== t.qSkipRipple && t.type === (!0 === o.modifiers.early ? "pointerdown" : "click") && ic(t, e, o, !0 === t.qKeyEvent)
      },
      keystart: rc((t => {
        !0 === o.enabled && !0 !== t.qSkipRipple && !0 === br(t, o.modifiers.keyCodes) && t.type === "key" + (!0 === o.modifiers.early ? "down" : "up") && ic(t, e, o, !0)
      }), 300)
    };
    sc(o, t), e.__qripple = o, tr(o, "main", [
      [e, "pointerdown", "start", "passive"],
      [e, "click", "start", "passive"],
      [e, "keydown", "keystart", "passive"],
      [e, "keyup", "keystart", "passive"]
    ])
  },
  updated(e, t) {
    if (t.oldValue !== t.value) {
      const n = e.__qripple;
      void 0 !== n && (n.enabled = !1 !== t.value, !0 === n.enabled && Object(t.value) === t.value && sc(n, t))
    }
  },
  beforeUnmount(e) {
    const t = e.__qripple;
    void 0 !== t && (t.abort.forEach((e => {
      e()
    })), nr(t, "main"), delete e._qripple)
  }
});
const cc = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var dc = gs({
  name: "QChip",
  props: {
    ...ru,
    ...Ds,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: !0
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: !0
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const {
      proxy: {
        $q: o
      }
    } = xl(), l = iu(e, o), a = Hs(e, cc), r = Rl((() => !0 === e.selected || void 0 !== e.icon)), i = Rl((() => !0 === e.selected ? e.iconSelected || o.iconSet.chip.selected : e.icon)), s = Rl((() => e.iconRemove || o.iconSet.chip.remove)), u = Rl((() => !1 === e.disable && (!0 === e.clickable || null !== e.selected))), c = Rl((() => {
      const t = !0 === e.outline && e.color || e.textColor;
      return "q-chip row inline no-wrap items-center" + (!1 === e.outline && void 0 !== e.color ? ` bg-${e.color}` : "") + (t ? ` text-${t} q-chip--colored` : "") + (!0 === e.disable ? " disabled" : "") + (!0 === e.dense ? " q-chip--dense" : "") + (!0 === e.outline ? " q-chip--outline" : "") + (!0 === e.selected ? " q-chip--selected" : "") + (!0 === u.value ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (!0 === e.square ? " q-chip--square" : "") + (!0 === l.value ? " q-chip--dark q-dark" : "")
    })), d = Rl((() => {
      const t = !0 === e.disable ? {
        tabindex: -1,
        "aria-disabled": "true"
      } : {
        tabindex: e.tabindex || 0
      };
      return {
        chip: t,
        remove: {
          ...t,
          role: "button",
          "aria-hidden": "false",
          "aria-label": e.removeAriaLabel || o.lang.label.remove
        }
      }
    }));

    function p(e) {
      13 === e.keyCode && f(e)
    }

    function f(t) {
      e.disable || (n("update:selected", !e.selected), n("click", t))
    }

    function v(t) {
      void 0 !== t.keyCode && 13 !== t.keyCode || (er(t), !1 === e.disable && (n("update:modelValue", !1), n("remove")))
    }
    return () => {
      if (!1 === e.modelValue) return;
      const n = {
        class: c.value,
        style: a.value
      };
      return !0 === u.value && Object.assign(n, d.value.chip, {
          onClick: f,
          onKeyup: p
        }),
        function(e, t, n, o, l, a) {
          t.key = o + l;
          const r = ql(e, t, n);
          return !0 === l ? Gn(r, a()) : r
        }("div", n, function() {
          const n = [];
          !0 === u.value && n.push(ql("div", {
            class: "q-focus-helper"
          })), !0 === r.value && n.push(ql(au, {
            class: "q-chip__icon q-chip__icon--left",
            name: i.value
          }));
          const o = void 0 !== e.label ? [ql("div", {
            class: "ellipsis"
          }, [e.label])] : void 0;
          var l, a;
          return n.push(ql("div", {
            class: "q-chip__content col row no-wrap items-center q-anchor--skip"
          }, (l = t.default, a = o, void 0 === l ? a : void 0 !== a ? a.concat(l()) : l()))), e.iconRight && n.push(ql(au, {
            class: "q-chip__icon q-chip__icon--right",
            name: e.iconRight
          })), !0 === e.removable && n.push(ql(au, {
            class: "q-chip__icon q-chip__icon--remove cursor-pointer",
            name: s.value,
            ...d.value.remove,
            onClick: v,
            onKeyup: v
          })), n
        }(), "ripple", !1 !== e.ripple && !0 !== e.disable, (() => [
          [uc, e.ripple]
        ]))
    }
  }
});
const pc = {
  target: {
    default: !0
  },
  noParentEvent: Boolean,
  contextMenu: Boolean
};

function fc({
  showing: e,
  avoidEmit: t,
  configureAnchorEl: n
}) {
  const {
    props: o,
    proxy: l,
    emit: a
  } = xl(), r = bt(null);
  let i = null;

  function s(e) {
    return null !== r.value && (void 0 === e || void 0 === e.touches || e.touches.length <= 1)
  }
  const u = {};

  function c() {
    nr(u, "anchor")
  }

  function d() {
    if (!1 === o.target || "" === o.target || null === l.$el.parentNode) r.value = null;
    else if (!0 === o.target) ! function(e) {
      for (r.value = e; r.value.classList.contains("q-anchor--skip");) r.value = r.value.parentNode;
      n()
    }(l.$el.parentNode);
    else {
      let t = o.target;
      if ("string" == typeof o.target) try {
        t = document.querySelector(o.target)
      } catch (e) {
        t = void 0
      }
      null != t ? (r.value = t.$el || t, n()) : (r.value = null, console.error(`Anchor: target "${o.target}" not found`))
    }
  }
  return void 0 === n && (Object.assign(u, {
    hide(e) {
      l.hide(e)
    },
    toggle(e) {
      l.toggle(e), e.qAnchorHandled = !0
    },
    toggleKey(e) {
      !0 === br(e, 13) && u.toggle(e)
    },
    contextClick(e) {
      l.hide(e), Ya(e), It((() => {
        l.show(e), e.qAnchorHandled = !0
      }))
    },
    prevent: Ya,
    mobileTouch(e) {
      if (u.mobileCleanup(e), !0 !== s(e)) return;
      l.hide(e), r.value.classList.add("non-selectable");
      const t = e.target;
      tr(u, "anchor", [
        [t, "touchmove", "mobileCleanup", "passive"],
        [t, "touchend", "mobileCleanup", "passive"],
        [t, "touchcancel", "mobileCleanup", "passive"],
        [r.value, "contextmenu", "prevent", "notPassive"]
      ]), i = setTimeout((() => {
        i = null, l.show(e), e.qAnchorHandled = !0
      }), 300)
    },
    mobileCleanup(t) {
      r.value.classList.remove("non-selectable"), null !== i && (clearTimeout(i), i = null), !0 === e.value && void 0 !== t && function() {
        if (void 0 !== window.getSelection) {
          const e = window.getSelection();
          void 0 !== e.empty ? e.empty() : void 0 !== e.removeAllRanges && (e.removeAllRanges(), !0 !== Ka.is.mobile && e.addRange(document.createRange()))
        } else void 0 !== document.selection && document.selection.empty()
      }()
    }
  }), n = function(e = o.contextMenu) {
    if (!0 === o.noParentEvent || null === r.value) return;
    let t;
    t = !0 === e ? !0 === l.$q.platform.is.mobile ? [
      [r.value, "touchstart", "mobileTouch", "passive"]
    ] : [
      [r.value, "mousedown", "hide", "passive"],
      [r.value, "contextmenu", "contextClick", "notPassive"]
    ] : [
      [r.value, "click", "toggle", "passive"],
      [r.value, "keyup", "toggleKey", "passive"]
    ], tr(u, "anchor", t)
  }), gn((() => o.contextMenu), (e => {
    null !== r.value && (c(), n(e))
  })), gn((() => o.target), (() => {
    null !== r.value && c(), d()
  })), gn((() => o.noParentEvent), (e => {
    null !== r.value && (!0 === e ? c() : n())
  })), Nn((() => {
    d(), !0 !== t && !0 === o.modelValue && null === r.value && a("update:modelValue", !1)
  })), Dn((() => {
    null !== i && clearTimeout(i), c()
  })), {
    anchorEl: r,
    canShow: s,
    anchorEvents: u
  }
}
const vc = {
    modelValue: {
      type: Boolean,
      default: null
    },
    "onUpdate:modelValue": [Function, Array]
  },
  mc = ["beforeShow", "show", "beforeHide", "hide"];

function hc({
  showing: e,
  canShow: t,
  hideOnRouteChange: n,
  handleShow: o,
  handleHide: l,
  processOnMount: a
}) {
  const r = xl(),
    {
      props: i,
      emit: s,
      proxy: u
    } = r;
  let c;

  function d(e) {
    if (!0 === i.disable || void 0 !== e && !0 === e.qAnchorHandled || void 0 !== t && !0 !== t(e)) return;
    const n = void 0 !== i["onUpdate:modelValue"];
    !0 === n && (s("update:modelValue", !0), c = e, It((() => {
      c === e && (c = void 0)
    }))), null !== i.modelValue && !1 !== n || p(e)
  }

  function p(t) {
    !0 !== e.value && (e.value = !0, s("beforeShow", t), void 0 !== o ? o(t) : s("show", t))
  }

  function f(e) {
    if (!0 === i.disable) return;
    const t = void 0 !== i["onUpdate:modelValue"];
    !0 === t && (s("update:modelValue", !1), c = e, It((() => {
      c === e && (c = void 0)
    }))), null !== i.modelValue && !1 !== t || v(e)
  }

  function v(t) {
    !1 !== e.value && (e.value = !1, s("beforeHide", t), void 0 !== l ? l(t) : s("hide", t))
  }

  function m(t) {
    if (!0 === i.disable && !0 === t) void 0 !== i["onUpdate:modelValue"] && s("update:modelValue", !1);
    else if (!0 === t !== e.value) {
      (!0 === t ? p : v)(c)
    }
  }
  gn((() => i.modelValue), m), void 0 !== n && !0 === Cu(r) && gn((() => u.$route.fullPath), (() => {
    !0 === n.value && !0 === e.value && f()
  })), !0 === a && Nn((() => {
    m(i.modelValue)
  }));
  const h = {
    show: d,
    hide: f,
    toggle: function(t) {
      !0 === e.value ? f(t) : d(t)
    }
  };
  return Object.assign(u, h), h
}
let gc = 1,
  yc = document.body;
const bc = [];

function _c(e, t, n, o) {
  const l = bt(!1),
    a = bt(!1);
  let r = null;
  const i = {},
    s = "dialog" === o && function(e) {
      for (e = e.parent; null != e;) {
        if ("QGlobalDialog" === e.type.name) return !0;
        if ("QDialog" === e.type.name || "QMenu" === e.type.name) return !1;
        e = e.parent
      }
      return !1
    }(e);

  function u(t) {
    if (a.value = !1, !0 !== t) return;
    Ju(i), l.value = !1;
    const n = bc.indexOf(e.proxy); - 1 !== n && bc.splice(n, 1), null !== r && (r.remove(), r = null)
  }
  return Hn((() => {
    u(!0)
  })), e.proxy.__qPortal = !0, Na(e.proxy, "contentEl", (() => t.value)), {
    showPortal: function(t) {
      if (!0 === t) return Ju(i), void(a.value = !0);
      var n;
      a.value = !1, !1 === l.value && (!1 === s && null === r && (r = function(e, t) {
        const n = document.createElement("div");
        if (n.id = void 0 !== t ? `q-portal--${t}--${gc++}` : e, void 0 !== Cr.globalNodes) {
          const e = Cr.globalNodes.class;
          void 0 !== e && (n.className = e)
        }
        return yc.appendChild(n), n
      }(!1, o)), l.value = !0, bc.push(e.proxy), Xu(n = i), Gu.push(n))
    },
    hidePortal: u,
    portalIsActive: l,
    portalIsAccessible: a,
    renderPortal: () => !0 === s ? n() : !0 === l.value ? [ql(Ho, {
      to: r
    }, n())] : void 0
  }
}
const wc = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};

function kc(e, t = (() => {}), n = (() => {})) {
  return {
    transitionProps: Rl((() => {
      const o = `q-transition--${e.transitionShow||t()}`,
        l = `q-transition--${e.transitionHide||n()}`;
      return {
        appear: !0,
        enterFromClass: `${o}-enter-from`,
        enterActiveClass: `${o}-enter-active`,
        enterToClass: `${o}-enter-to`,
        leaveFromClass: `${l}-leave-from`,
        leaveActiveClass: `${l}-leave-active`,
        leaveToClass: `${l}-leave-to`
      }
    })),
    transitionStyle: Rl((() => `--q-transition-duration: ${e.transitionDuration}ms`))
  }
}

function xc() {
  let e;
  const t = xl();

  function n() {
    e = void 0
  }
  return Mn(n), Dn(n), {
    removeTick: n,
    registerTick(n) {
      e = n, It((() => {
        e === n && (!1 === Eu(t) && e(), e = void 0)
      }))
    }
  }
}

function Sc() {
  let e = null;
  const t = xl();

  function n() {
    null !== e && (clearTimeout(e), e = null)
  }
  return Mn(n), Dn(n), {
    removeTimeout: n,
    registerTimeout(o, l) {
      n(), !1 === Eu(t) && (e = setTimeout(o, l))
    }
  }
}
const Cc = [];
let Ec;

function Ac(e) {
  Ec = 27 === e.keyCode
}

function Lc() {
  !0 === Ec && (Ec = !1)
}

function Tc(e) {
  !0 === Ec && (Ec = !1, !0 === br(e, 27) && Cc[Cc.length - 1](e))
}

function Oc(e) {
  window[e]("keydown", Ac), window[e]("blur", Lc), window[e]("keyup", Tc), Ec = !1
}

function Rc(e) {
  !0 === Wa.is.desktop && (Cc.push(e), 1 === Cc.length && Oc("addEventListener"))
}

function qc(e) {
  const t = Cc.indexOf(e);
  t > -1 && (Cc.splice(t, 1), 0 === Cc.length && Oc("removeEventListener"))
}
const Vc = [];

function Mc(e) {
  Vc[Vc.length - 1](e)
}

function Fc(e) {
  !0 === Wa.is.desktop && (Vc.push(e), 1 === Vc.length && document.body.addEventListener("focusin", Mc))
}

function zc(e) {
  const t = Vc.indexOf(e);
  t > -1 && (Vc.splice(t, 1), 0 === Vc.length && document.body.removeEventListener("focusin", Mc))
}
const {
  notPassiveCapture: Pc
} = Ga, Bc = [];

function Ic(e) {
  const t = e.target;
  if (void 0 === t || 8 === t.nodeType || !0 === t.classList.contains("no-pointer-events")) return;
  let n = bc.length - 1;
  for (; n >= 0;) {
    const e = bc[n].$;
    if ("QDialog" !== e.type.name) break;
    if (!0 !== e.props.seamless) return;
    n--
  }
  for (let o = Bc.length - 1; o >= 0; o--) {
    const n = Bc[o];
    if (null !== n.anchorEl.value && !1 !== n.anchorEl.value.contains(t) || t !== document.body && (null === n.innerRef.value || !1 !== n.innerRef.value.contains(t))) return;
    e.qClickOutside = !0, n.onClickOutside(e)
  }
}

function Nc(e) {
  const t = Bc.findIndex((t => t === e));
  t > -1 && (Bc.splice(t, 1), 0 === Bc.length && (document.removeEventListener("mousedown", Ic, Pc), document.removeEventListener("touchstart", Ic, Pc)))
}
let $c, jc;

function Dc(e) {
  const t = e.split(" ");
  return 2 === t.length && (!0 !== ["top", "center", "bottom"].includes(t[0]) ? (console.error("Anchor/Self position must start with one of top/center/bottom"), !1) : !0 === ["left", "middle", "right", "start", "end"].includes(t[1]) || (console.error("Anchor/Self position must end with one of left/middle/right/start/end"), !1))
}
const Hc = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};

function Uc(e, t) {
  const n = e.split(" ");
  return {
    vertical: n[0],
    horizontal: Hc[`${n[1]}#${!0===t?"rtl":"ltr"}`]
  }
}

function Wc(e, t, n) {
  return {
    top: e[n.anchorOrigin.vertical] - t[n.selfOrigin.vertical],
    left: e[n.anchorOrigin.horizontal] - t[n.selfOrigin.horizontal]
  }
}

function Kc(e, t, n, o, l) {
  const a = n.bottom,
    r = n.right,
    i = Ms(),
    s = window.innerHeight - i,
    u = document.body.clientWidth;
  if (e.top < 0 || e.top + a > s)
    if ("center" === l.vertical) e.top = t[o.vertical] > s / 2 ? Math.max(0, s - a) : 0, e.maxHeight = Math.min(a, s);
    else if (t[o.vertical] > s / 2) {
    const n = Math.min(s, "center" === o.vertical ? t.center : o.vertical === l.vertical ? t.bottom : t.top);
    e.maxHeight = Math.min(a, n), e.top = Math.max(0, n - a)
  } else e.top = Math.max(0, "center" === o.vertical ? t.center : o.vertical === l.vertical ? t.top : t.bottom), e.maxHeight = Math.min(a, s - e.top);
  if (e.left < 0 || e.left + r > u)
    if (e.maxWidth = Math.min(r, u), "middle" === l.horizontal) e.left = t[o.horizontal] > u / 2 ? Math.max(0, u - r) : 0;
    else if (t[o.horizontal] > u / 2) {
    const n = Math.min(u, "middle" === o.horizontal ? t.middle : o.horizontal === l.horizontal ? t.right : t.left);
    e.maxWidth = Math.min(r, n), e.left = Math.max(0, n - e.maxWidth)
  } else e.left = Math.max(0, "middle" === o.horizontal ? t.middle : o.horizontal === l.horizontal ? t.left : t.right), e.maxWidth = Math.min(r, u - e.left)
} ["left", "middle", "right"].forEach((e => {
  Hc[`${e}#ltr`] = e, Hc[`${e}#rtl`] = e
}));
var Qc = gs({
  name: "QMenu",
  inheritAttrs: !1,
  props: {
    ...pc,
    ...vc,
    ...ru,
    ...wc,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: Dc
    },
    self: {
      type: String,
      validator: Dc
    },
    offset: {
      type: Array,
      validator: function(e) {
        return !e || 2 === e.length && ("number" == typeof e[0] && "number" == typeof e[1])
      }
    },
    scrollTarget: {
      default: void 0
    },
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [...mc, "click", "escapeKey"],
  setup(e, {
    slots: t,
    emit: n,
    attrs: o
  }) {
    let l, a, r, i = null;
    const s = xl(),
      {
        proxy: u
      } = s,
      {
        $q: c
      } = u,
      d = bt(null),
      p = bt(!1),
      f = Rl((() => !0 !== e.persistent && !0 !== e.noRouteDismiss)),
      v = iu(e, c),
      {
        registerTick: m,
        removeTick: h
      } = xc(),
      {
        registerTimeout: g
      } = Sc(),
      {
        transitionProps: y,
        transitionStyle: b
      } = kc(e),
      {
        localScrollTarget: _,
        changeScrollEvent: w,
        unconfigureScrollTarget: k
      } = function(e, t) {
        const n = bt(null);
        let o;

        function l(e, t) {
          const n = (void 0 !== t ? "add" : "remove") + "EventListener",
            l = void 0 !== t ? t : o;
          e !== window && e[n]("scroll", l, Ga.passive), window[n]("scroll", l, Ga.passive), o = t
        }

        function a() {
          null !== n.value && (l(n.value), n.value = null)
        }
        const r = gn((() => e.noParentEvent), (() => {
          null !== n.value && (a(), t())
        }));
        return Dn(r), {
          localScrollTarget: n,
          unconfigureScrollTarget: a,
          changeScrollEvent: l
        }
      }(e, P),
      {
        anchorEl: x,
        canShow: S
      } = fc({
        showing: p
      }),
      {
        hide: C
      } = hc({
        showing: p,
        canShow: S,
        handleShow: function(t) {
          if (i = !1 === e.noRefocus ? document.activeElement : null, Fc(I), E(), P(), l = void 0, void 0 !== t && (e.touchPosition || e.contextMenu)) {
            const e = Ja(t);
            if (void 0 !== e.left) {
              const {
                top: t,
                left: n
              } = x.value.getBoundingClientRect();
              l = {
                left: e.left - n,
                top: e.top - t
              }
            }
          }
          void 0 === a && (a = gn((() => c.screen.width + "|" + c.screen.height + "|" + e.self + "|" + e.anchor + "|" + c.lang.rtl), $));
          !0 !== e.noFocus && document.activeElement.blur();
          m((() => {
            $(), !0 !== e.noFocus && F()
          })), g((() => {
            !0 === c.platform.is.ios && (r = e.autoClose, d.value.click()), $(), E(!0), n("show", t)
          }), e.transitionDuration)
        },
        handleHide: function(t) {
          h(), A(), z(!0), null === i || void 0 !== t && !0 === t.qClickOutside || (((t && 0 === t.type.indexOf("key") ? i.closest('[tabindex]:not([tabindex^="-"])') : void 0) || i).focus(), i = null);
          g((() => {
            A(!0), n("hide", t)
          }), e.transitionDuration)
        },
        hideOnRouteChange: f,
        processOnMount: !0
      }),
      {
        showPortal: E,
        hidePortal: A,
        renderPortal: L
      } = _c(s, d, (function() {
        return ql(Xl, y.value, (() => !0 === p.value ? ql("div", {
          role: "menu",
          ...o,
          ref: d,
          tabindex: -1,
          class: ["q-menu q-position-engine scroll" + q.value, o.class],
          style: [o.style, b.value],
          ...V.value
        }, ws(t.default)) : null))
      }), "menu"),
      T = {
        anchorEl: x,
        innerRef: d,
        onClickOutside(t) {
          if (!0 !== e.persistent && !0 === p.value) return C(t), ("touchstart" === t.type || t.target.classList.contains("q-dialog__backdrop")) && er(t), !0
        }
      },
      O = Rl((() => Uc(e.anchor || (!0 === e.cover ? "center middle" : "bottom start"), c.lang.rtl))),
      R = Rl((() => !0 === e.cover ? O.value : Uc(e.self || "top start", c.lang.rtl))),
      q = Rl((() => (!0 === e.square ? " q-menu--square" : "") + (!0 === v.value ? " q-menu--dark q-dark" : ""))),
      V = Rl((() => !0 === e.autoClose ? {
        onClick: B
      } : {})),
      M = Rl((() => !0 === p.value && !0 !== e.persistent));

    function F() {
      Zu((() => {
        let e = d.value;
        e && !0 !== e.contains(document.activeElement) && (e = e.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || e.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || e.querySelector("[autofocus], [data-autofocus]") || e, e.focus({
          preventScroll: !0
        }))
      }))
    }

    function z(e) {
      l = void 0, void 0 !== a && (a(), a = void 0), !0 !== e && !0 !== p.value || (zc(I), k(), Nc(T), qc(N)), !0 !== e && (i = null)
    }

    function P() {
      null === x.value && void 0 === e.scrollTarget || (_.value = Os(x.value, e.scrollTarget), w(_.value, $))
    }

    function B(e) {
      !0 !== r ? (! function(e, t) {
        do {
          if ("QMenu" === e.$options.name) {
            if (e.hide(t), !0 === e.$props.separateClosePopup) return Su(e)
          } else if (!0 === e.__qPortal) {
            const n = Su(e);
            return void 0 !== n && "QPopupProxy" === n.$options.name ? (e.hide(t), n) : e
          }
          e = Su(e)
        } while (null != e)
      }(u, e), n("click", e)) : r = !1
    }

    function I(t) {
      !0 === M.value && !0 !== e.noFocus && !0 !== Ls(d.value, t.target) && F()
    }

    function N(e) {
      n("escapeKey"), C(e)
    }

    function $() {
      const t = d.value;
      null !== t && null !== x.value && function(e) {
        if (!0 === Wa.is.ios && void 0 !== window.visualViewport) {
          const e = document.body.style,
            {
              offsetLeft: t,
              offsetTop: n
            } = window.visualViewport;
          t !== $c && (e.setProperty("--q-pe-left", t + "px"), $c = t), n !== jc && (e.setProperty("--q-pe-top", n + "px"), jc = n)
        }
        const {
          scrollLeft: t,
          scrollTop: n
        } = e.el, o = void 0 === e.absoluteOffset ? function(e, t) {
          let {
            top: n,
            left: o,
            right: l,
            bottom: a,
            width: r,
            height: i
          } = e.getBoundingClientRect();
          return void 0 !== t && (n -= t[1], o -= t[0], a += t[1], l += t[0], r += t[0], i += t[1]), {
            top: n,
            bottom: a,
            height: i,
            left: o,
            right: l,
            width: r,
            middle: o + (l - o) / 2,
            center: n + (a - n) / 2
          }
        }(e.anchorEl, !0 === e.cover ? [0, 0] : e.offset) : function(e, t, n) {
          let {
            top: o,
            left: l
          } = e.getBoundingClientRect();
          return o += t.top, l += t.left, void 0 !== n && (o += n[1], l += n[0]), {
            top: o,
            bottom: o + 1,
            height: 1,
            left: l,
            right: l + 1,
            width: 1,
            middle: l,
            center: o
          }
        }(e.anchorEl, e.absoluteOffset, e.offset);
        let l = {
          maxHeight: e.maxHeight,
          maxWidth: e.maxWidth,
          visibility: "visible"
        };
        !0 !== e.fit && !0 !== e.cover || (l.minWidth = o.width + "px", !0 === e.cover && (l.minHeight = o.height + "px")), Object.assign(e.el.style, l);
        const a = {
          top: 0,
          center: (r = e.el).offsetHeight / 2,
          bottom: r.offsetHeight,
          left: 0,
          middle: r.offsetWidth / 2,
          right: r.offsetWidth
        };
        var r;
        let i = Wc(o, a, e);
        if (void 0 === e.absoluteOffset || void 0 === e.offset) Kc(i, o, a, e.anchorOrigin, e.selfOrigin);
        else {
          const {
            top: t,
            left: n
          } = i;
          Kc(i, o, a, e.anchorOrigin, e.selfOrigin);
          let l = !1;
          if (i.top !== t) {
            l = !0;
            const t = 2 * e.offset[1];
            o.center = o.top -= t, o.bottom -= t + 2
          }
          if (i.left !== n) {
            l = !0;
            const t = 2 * e.offset[0];
            o.middle = o.left -= t, o.right -= t + 2
          }!0 === l && (i = Wc(o, a, e), Kc(i, o, a, e.anchorOrigin, e.selfOrigin))
        }
        l = {
          top: i.top + "px",
          left: i.left + "px"
        }, void 0 !== i.maxHeight && (l.maxHeight = i.maxHeight + "px", o.height > i.maxHeight && (l.minHeight = l.maxHeight)), void 0 !== i.maxWidth && (l.maxWidth = i.maxWidth + "px", o.width > i.maxWidth && (l.minWidth = l.maxWidth)), Object.assign(e.el.style, l), e.el.scrollTop !== n && (e.el.scrollTop = n), e.el.scrollLeft !== t && (e.el.scrollLeft = t)
      }({
        el: t,
        offset: e.offset,
        anchorEl: x.value,
        anchorOrigin: O.value,
        selfOrigin: R.value,
        absoluteOffset: l,
        fit: e.fit,
        cover: e.cover,
        maxHeight: e.maxHeight,
        maxWidth: e.maxWidth
      })
    }
    return gn(M, (e => {
      !0 === e ? (Rc(N), function(e) {
        Bc.push(e), 1 === Bc.length && (document.addEventListener("mousedown", Ic, Pc), document.addEventListener("touchstart", Ic, Pc))
      }(T)) : (qc(N), Nc(T))
    })), Dn(z), Object.assign(u, {
      focus: F,
      updatePosition: $
    }), L
  }
});
let Gc, Xc, Jc, Zc, Yc, ed, td = 0,
  nd = !1,
  od = null;

function ld(e) {
  (function(e) {
    if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) return !0;
    const t = function(e) {
        if (e.path) return e.path;
        if (e.composedPath) return e.composedPath();
        const t = [];
        let n = e.target;
        for (; n;) {
          if (t.push(n), "HTML" === n.tagName) return t.push(document), t.push(window), t;
          n = n.parentElement
        }
      }(e),
      n = e.shiftKey && !e.deltaX,
      o = !n && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
      l = n || o ? e.deltaY : e.deltaX;
    for (let a = 0; a < t.length; a++) {
      const e = t[a];
      if (Fs(e, o)) return o ? l < 0 && 0 === e.scrollTop || l > 0 && e.scrollTop + e.clientHeight === e.scrollHeight : l < 0 && 0 === e.scrollLeft || l > 0 && e.scrollLeft + e.clientWidth === e.scrollWidth
    }
    return !0
  })(e) && er(e)
}

function ad(e) {
  e.target === document && (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop)
}

function rd(e) {
  !0 !== nd && (nd = !0, requestAnimationFrame((() => {
    nd = !1;
    const {
      height: t
    } = e.target, {
      clientHeight: n,
      scrollTop: o
    } = document.scrollingElement;
    void 0 !== Jc && t === window.innerHeight || (Jc = n - t, document.scrollingElement.scrollTop = o), o > Jc && (document.scrollingElement.scrollTop -= Math.ceil((o - Jc) / 8))
  })))
}

function id(e) {
  const t = document.body,
    n = void 0 !== window.visualViewport;
  if ("add" === e) {
    const {
      overflowY: e,
      overflowX: o
    } = window.getComputedStyle(t);
    Gc = qs(window), Xc = Rs(window), Zc = t.style.left, Yc = t.style.top, ed = window.location.href, t.style.left = `-${Gc}px`, t.style.top = `-${Xc}px`, "hidden" !== o && ("scroll" === o || t.scrollWidth > window.innerWidth) && t.classList.add("q-body--force-scrollbar-x"), "hidden" !== e && ("scroll" === e || t.scrollHeight > window.innerHeight) && t.classList.add("q-body--force-scrollbar-y"), t.classList.add("q-body--prevent-scroll"), document.qScrollPrevented = !0, !0 === Wa.is.ios && (!0 === n ? (window.scrollTo(0, 0), window.visualViewport.addEventListener("resize", rd, Ga.passiveCapture), window.visualViewport.addEventListener("scroll", rd, Ga.passiveCapture), window.scrollTo(0, 0)) : window.addEventListener("scroll", ad, Ga.passiveCapture))
  }!0 === Wa.is.desktop && !0 === Wa.is.mac && window[`${e}EventListener`]("wheel", ld, Ga.notPassive), "remove" === e && (!0 === Wa.is.ios && (!0 === n ? (window.visualViewport.removeEventListener("resize", rd, Ga.passiveCapture), window.visualViewport.removeEventListener("scroll", rd, Ga.passiveCapture)) : window.removeEventListener("scroll", ad, Ga.passiveCapture)), t.classList.remove("q-body--prevent-scroll"), t.classList.remove("q-body--force-scrollbar-x"), t.classList.remove("q-body--force-scrollbar-y"), document.qScrollPrevented = !1, t.style.left = Zc, t.style.top = Yc, window.location.href === ed && window.scrollTo(Gc, Xc), Jc = void 0)
}

function sd() {
  let e;
  return {
    preventBodyScroll(t) {
      t === e || void 0 === e && !0 !== t || (e = t, function(e) {
        let t = "add";
        if (!0 === e) {
          if (td++, null !== od) return clearTimeout(od), void(od = null);
          if (td > 1) return
        } else {
          if (0 === td) return;
          if (td--, td > 0) return;
          if (t = "remove", !0 === Wa.is.ios && !0 === Wa.is.nativeMobile) return null !== od && clearTimeout(od), void(od = setTimeout((() => {
            id(t), od = null
          }), 100))
        }
        id(t)
      }(t))
    }
  }
}
let ud = 0;
const cd = {
    standard: "fixed-full flex-center",
    top: "fixed-top justify-center",
    bottom: "fixed-bottom justify-center",
    right: "fixed-right items-center",
    left: "fixed-left items-center"
  },
  dd = {
    standard: ["scale", "scale"],
    top: ["slide-down", "slide-up"],
    bottom: ["slide-up", "slide-down"],
    right: ["slide-left", "slide-right"],
    left: ["slide-right", "slide-left"]
  };
var pd = gs({
  name: "QDialog",
  inheritAttrs: !1,
  props: {
    ...vc,
    ...wc,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: e => "standard" === e || ["top", "bottom", "left", "right"].includes(e)
    }
  },
  emits: [...mc, "shake", "click", "escapeKey"],
  setup(e, {
    slots: t,
    emit: n,
    attrs: o
  }) {
    const l = xl(),
      {
        proxy: {
          $q: a
        }
      } = l,
      r = bt(null),
      i = bt(!1),
      s = bt(!1);
    let u, c, d = null,
      p = null;
    const f = Rl((() => !0 !== e.persistent && !0 !== e.noRouteDismiss && !0 !== e.seamless)),
      {
        preventBodyScroll: v
      } = sd(),
      {
        registerTimeout: m
      } = Sc(),
      {
        registerTick: h,
        removeTick: g
      } = xc(),
      {
        transitionProps: y,
        transitionStyle: b
      } = kc(e, (() => dd[e.position][0]), (() => dd[e.position][1])),
      {
        showPortal: _,
        hidePortal: w,
        portalIsAccessible: k,
        renderPortal: x
      } = _c(l, r, (function() {
        return ql("div", {
          role: "dialog",
          "aria-modal": !0 === L.value ? "true" : "false",
          ...o,
          class: O.value
        }, [ql(Xl, {
          name: "q-transition--fade",
          appear: !0
        }, (() => !0 === L.value ? ql("div", {
          class: "q-dialog__backdrop fixed-full",
          style: b.value,
          "aria-hidden": "true",
          tabindex: -1,
          [I]: P
        }) : null)), ql(Xl, y.value, (() => !0 === i.value ? ql("div", {
          ref: r,
          class: A.value,
          style: b.value,
          tabindex: -1,
          ...T.value
        }, ws(t.default)) : null))])
      }), "dialog"),
      {
        hide: S
      } = hc({
        showing: i,
        hideOnRouteChange: f,
        handleShow: function(t) {
          C(), p = !1 === e.noRefocus && null !== document.activeElement ? document.activeElement : null, F(e.maximized), _(), s.value = !0, !0 !== e.noFocus ? (null !== document.activeElement && document.activeElement.blur(), h(R)) : g();
          m((() => {
            if (!0 === l.proxy.$q.platform.is.ios) {
              if (!0 !== e.seamless && document.activeElement) {
                const {
                  top: e,
                  bottom: t
                } = document.activeElement.getBoundingClientRect(), {
                  innerHeight: n
                } = window, o = void 0 !== window.visualViewport ? window.visualViewport.height : n;
                e > 0 && t > o / 2 && (document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - o, t >= n ? 1 / 0 : Math.ceil(document.scrollingElement.scrollTop + t - o / 2))), document.activeElement.scrollIntoView()
              }
              c = !0, r.value.click(), c = !1
            }
            _(!0), s.value = !1, n("show", t)
          }), e.transitionDuration)
        },
        handleHide: function(t) {
          g(), E(), M(!0), s.value = !0, w(), null !== p && (((t && 0 === t.type.indexOf("key") ? p.closest('[tabindex]:not([tabindex^="-"])') : void 0) || p).focus(), p = null);
          m((() => {
            w(!0), s.value = !1, n("hide", t)
          }), e.transitionDuration)
        },
        processOnMount: !0
      }),
      {
        addToHistory: C,
        removeFromHistory: E
      } = function(e, t, n) {
        let o;

        function l() {
          void 0 !== o && (dr.remove(o), o = void 0)
        }
        return Dn((() => {
          !0 === e.value && l()
        })), {
          removeFromHistory: l,
          addToHistory() {
            o = {
              condition: () => !0 === n.value,
              handler: t
            }, dr.add(o)
          }
        }
      }(i, S, f),
      A = Rl((() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${!0===e.maximized?"maximized":"minimized"} q-dialog__inner--${e.position} ${cd[e.position]}` + (!0 === s.value ? " q-dialog__inner--animating" : "") + (!0 === e.fullWidth ? " q-dialog__inner--fullwidth" : "") + (!0 === e.fullHeight ? " q-dialog__inner--fullheight" : "") + (!0 === e.square ? " q-dialog__inner--square" : ""))),
      L = Rl((() => !0 === i.value && !0 !== e.seamless)),
      T = Rl((() => !0 === e.autoClose ? {
        onClick: z
      } : {})),
      O = Rl((() => ["q-dialog fullscreen no-pointer-events q-dialog--" + (!0 === L.value ? "modal" : "seamless"), o.class]));

    function R(e) {
      Zu((() => {
        let t = r.value;
        null !== t && !0 !== t.contains(document.activeElement) && (t = ("" !== e ? t.querySelector(e) : null) || t.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || t.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || t.querySelector("[autofocus], [data-autofocus]") || t, t.focus({
          preventScroll: !0
        }))
      }))
    }

    function q(e) {
      e && "function" == typeof e.focus ? e.focus({
        preventScroll: !0
      }) : R(), n("shake");
      const t = r.value;
      null !== t && (t.classList.remove("q-animate--scale"), t.classList.add("q-animate--scale"), null !== d && clearTimeout(d), d = setTimeout((() => {
        d = null, null !== r.value && (t.classList.remove("q-animate--scale"), R())
      }), 170))
    }

    function V() {
      !0 !== e.seamless && (!0 === e.persistent || !0 === e.noEscDismiss ? !0 !== e.maximized && !0 !== e.noShake && q() : (n("escapeKey"), S()))
    }

    function M(t) {
      null !== d && (clearTimeout(d), d = null), !0 !== t && !0 !== i.value || (F(!1), !0 !== e.seamless && (v(!1), zc(B), qc(V))), !0 !== t && (p = null)
    }

    function F(e) {
      !0 === e ? !0 !== u && (ud < 1 && document.body.classList.add("q-body--dialog"), ud++, u = !0) : !0 === u && (ud < 2 && document.body.classList.remove("q-body--dialog"), ud--, u = !1)
    }

    function z(e) {
      !0 !== c && (S(e), n("click", e))
    }

    function P(t) {
      !0 !== e.persistent && !0 !== e.noBackdropDismiss ? S(t) : !0 !== e.noShake && q(t.relatedTarget)
    }

    function B(t) {
      !0 !== e.allowFocusOutside && !0 === k.value && !0 !== Ls(r.value, t.target) && R('[tabindex]:not([tabindex="-1"])')
    }
    gn((() => e.maximized), (e => {
      !0 === i.value && F(e)
    })), gn(L, (e => {
      v(e), !0 === e ? (Fc(B), Rc(V)) : (zc(B), qc(V))
    })), Object.assign(l.proxy, {
      focus: R,
      shake: q,
      __updateRefocusTarget(e) {
        p = e || null
      }
    }), Dn(M);
    const I = !0 === a.platform.is.ios || a.platform.is.safari ? "onClick" : "onFocusin";
    return x
  }
});
let fd = !1;
{
  const e = document.createElement("div");
  e.setAttribute("dir", "rtl"), Object.assign(e.style, {
    width: "1px",
    height: "1px",
    overflow: "auto"
  });
  const t = document.createElement("div");
  Object.assign(t.style, {
    width: "1000px",
    height: "1px"
  }), document.body.appendChild(e), e.appendChild(t), e.scrollLeft = -1e3, fd = e.scrollLeft >= 0, e.remove()
}
const vd = ["start", "center", "end", "start-force", "center-force", "end-force"],
  md = Array.prototype.filter,
  hd = void 0 === window.getComputedStyle(document.body).overflowAnchor ? Xa : function(e, t) {
    null !== e && (void 0 !== e._qOverflowAnimationFrame && cancelAnimationFrame(e._qOverflowAnimationFrame), e._qOverflowAnimationFrame = requestAnimationFrame((() => {
      if (null === e) return;
      e._qOverflowAnimationFrame = void 0;
      const n = e.children || [];
      md.call(n, (e => e.dataset && void 0 !== e.dataset.qVsAnchor)).forEach((e => {
        delete e.dataset.qVsAnchor
      }));
      const o = n[t];
      o && o.dataset && (o.dataset.qVsAnchor = "")
    })))
  };

function gd(e, t) {
  return e + t
}

function yd(e, t, n, o, l, a, r, i) {
  const s = e === window ? document.scrollingElement || document.documentElement : e,
    u = !0 === l ? "offsetWidth" : "offsetHeight",
    c = {
      scrollStart: 0,
      scrollViewSize: -r - i,
      scrollMaxSize: 0,
      offsetStart: -r,
      offsetEnd: -i
    };
  if (!0 === l ? (e === window ? (c.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, c.scrollViewSize += document.documentElement.clientWidth) : (c.scrollStart = s.scrollLeft, c.scrollViewSize += s.clientWidth), c.scrollMaxSize = s.scrollWidth, !0 === a && (c.scrollStart = (!0 === fd ? c.scrollMaxSize - c.scrollViewSize : 0) - c.scrollStart)) : (e === window ? (c.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0, c.scrollViewSize += document.documentElement.clientHeight) : (c.scrollStart = s.scrollTop, c.scrollViewSize += s.clientHeight), c.scrollMaxSize = s.scrollHeight), null !== n)
    for (let d = n.previousElementSibling; null !== d; d = d.previousElementSibling) !1 === d.classList.contains("q-virtual-scroll--skip") && (c.offsetStart += d[u]);
  if (null !== o)
    for (let d = o.nextElementSibling; null !== d; d = d.nextElementSibling) !1 === d.classList.contains("q-virtual-scroll--skip") && (c.offsetEnd += d[u]);
  if (t !== e) {
    const n = s.getBoundingClientRect(),
      o = t.getBoundingClientRect();
    !0 === l ? (c.offsetStart += o.left - n.left, c.offsetEnd -= o.width) : (c.offsetStart += o.top - n.top, c.offsetEnd -= o.height), e !== window && (c.offsetStart += c.scrollStart), c.offsetEnd += c.scrollMaxSize - c.offsetStart
  }
  return c
}

function bd(e, t, n, o) {
  "end" === t && (t = (e === window ? document.body : e)[!0 === n ? "scrollWidth" : "scrollHeight"]), e === window ? !0 === n ? (!0 === o && (t = (!0 === fd ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - t), window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0)) : window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t) : !0 === n ? (!0 === o && (t = (!0 === fd ? e.scrollWidth - e.offsetWidth : 0) - t), e.scrollLeft = t) : e.scrollTop = t
}

function _d(e, t, n, o) {
  if (n >= o) return 0;
  const l = t.length,
    a = Math.floor(n / 1e3),
    r = Math.floor((o - 1) / 1e3) + 1;
  let i = e.slice(a, r).reduce(gd, 0);
  return n % 1e3 != 0 && (i -= t.slice(1e3 * a, n).reduce(gd, 0)), o % 1e3 != 0 && o !== l && (i -= t.slice(o, 1e3 * r).reduce(gd, 0)), i
}
const wd = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...{
    virtualScrollSliceSize: {
      type: [Number, String],
      default: null
    },
    virtualScrollSliceRatioBefore: {
      type: [Number, String],
      default: 1
    },
    virtualScrollSliceRatioAfter: {
      type: [Number, String],
      default: 1
    },
    virtualScrollItemSize: {
      type: [Number, String],
      default: 24
    },
    virtualScrollStickySizeStart: {
      type: [Number, String],
      default: 0
    },
    virtualScrollStickySizeEnd: {
      type: [Number, String],
      default: 0
    },
    tableColspan: [Number, String]
  }
};
const kd = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,
  xd = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,
  Sd = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,
  Cd = /[a-z0-9_ -]$/i;

function Ed(e) {
  return function(t) {
    if ("compositionend" === t.type || "change" === t.type) {
      if (!0 !== t.target.qComposing) return;
      t.target.qComposing = !1, e(t)
    } else if ("compositionupdate" === t.type && !0 !== t.target.qComposing && "string" == typeof t.data) {
      !0 === (!0 === Wa.is.firefox ? !1 === Cd.test(t.data) : !0 === kd.test(t.data) || !0 === xd.test(t.data) || !0 === Sd.test(t.data)) && (t.target.qComposing = !0)
    }
  }
}

function Ad(e, t, n) {
  if (n <= t) return t;
  const o = n - t + 1;
  let l = t + (e - t) % o;
  return l < t && (l = o + l), 0 === l ? 0 : l
}
const Ld = e => ["add", "add-unique", "toggle"].includes(e),
  Td = Object.keys(tc);
var Od = gs({
  name: "QSelect",
  inheritAttrs: !1,
  props: {
    ...wd,
    ...su,
    ...tc,
    modelValue: {
      required: !0
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: Ld
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: String,
    transitionHide: String,
    transitionDuration: [String, Number],
    behavior: {
      type: String,
      validator: e => ["default", "menu", "dialog"].includes(e),
      default: "default"
    },
    virtualScrollItemSize: {
      type: [Number, String],
      default: void 0
    },
    onNewValue: Function,
    onFilter: Function
  },
  emits: [...nc, "add", "remove", "inputValue", "newValue", "keyup", "keypress", "keydown", "filterAbort"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const {
      proxy: o
    } = xl(), {
      $q: l
    } = o, a = bt(!1), r = bt(!1), i = bt(-1), s = bt(""), u = bt(!1), c = bt(!1);
    let d, p, f, v, m, h, g, y = null,
      b = null;
    const _ = bt(null),
      w = bt(null),
      k = bt(null),
      x = bt(null),
      S = bt(null),
      C = uu(e),
      E = Ed(xe),
      A = Rl((() => Array.isArray(e.options) ? e.options.length : 0)),
      L = Rl((() => void 0 === e.virtualScrollItemSize ? !0 === e.optionsDense ? 24 : 48 : e.virtualScrollItemSize)),
      {
        virtualScrollSliceRange: T,
        virtualScrollSliceSizeComputed: O,
        localResetVirtualScroll: R,
        padVirtualScroll: q,
        onVirtualScrollEvt: V,
        scrollTo: M,
        setVirtualScrollSize: F
      } = function({
        virtualScrollLength: e,
        getVirtualScrollTarget: t,
        getVirtualScrollEl: n,
        virtualScrollItemSizeComputed: o
      }) {
        const l = xl(),
          {
            props: a,
            emit: r,
            proxy: i
          } = l,
          {
            $q: s
          } = i;
        let u, c, d, p, f = [];
        const v = bt(0),
          m = bt(0),
          h = bt({}),
          g = bt(null),
          y = bt(null),
          b = bt(null),
          _ = bt({
            from: 0,
            to: 0
          }),
          w = Rl((() => void 0 !== a.tableColspan ? a.tableColspan : 100));
        void 0 === o && (o = Rl((() => a.virtualScrollItemSize)));
        const k = Rl((() => o.value + ";" + a.virtualScrollHorizontal));

        function x() {
          T(c, !0)
        }

        function S(e) {
          T(void 0 === e ? c : e)
        }

        function C(o, l) {
          const r = t();
          if (null == r || 8 === r.nodeType) return;
          const i = yd(r, n(), g.value, y.value, a.virtualScrollHorizontal, s.lang.rtl, a.virtualScrollStickySizeStart, a.virtualScrollStickySizeEnd);
          d !== i.scrollViewSize && O(i.scrollViewSize), E(r, i, Math.min(e.value - 1, Math.max(0, parseInt(o, 10) || 0)), 0, vd.indexOf(l) > -1 ? l : c > -1 && o > c ? "end" : "start")
        }

        function E(t, n, o, l, r) {
          const i = "string" == typeof r && r.indexOf("-force") > -1,
            c = !0 === i ? r.replace("-force", "") : r,
            d = void 0 !== c ? c : "start";
          let g = Math.max(0, o - h.value[d]),
            y = g + h.value.total;
          y > e.value && (y = e.value, g = Math.max(0, y - h.value.total)), u = n.scrollStart;
          const w = g !== _.value.from || y !== _.value.to;
          if (!1 === w && void 0 === c) return void R(o);
          const {
            activeElement: k
          } = document, x = b.value;
          !0 === w && null !== x && x !== k && !0 === x.contains(k) && (x.addEventListener("focusout", L), setTimeout((() => {
            null !== x && x.removeEventListener("focusout", L)
          }))), hd(x, o - g);
          const S = void 0 !== c ? p.slice(g, o).reduce(gd, 0) : 0;
          if (!0 === w) {
            const t = y >= _.value.from && g <= _.value.to ? _.value.to : y;
            _.value = {
              from: g,
              to: t
            }, v.value = _d(f, p, 0, g), m.value = _d(f, p, y, e.value), requestAnimationFrame((() => {
              _.value.to !== y && u === n.scrollStart && (_.value = {
                from: _.value.from,
                to: y
              }, m.value = _d(f, p, y, e.value))
            }))
          }
          requestAnimationFrame((() => {
            if (u !== n.scrollStart) return;
            !0 === w && A(g);
            const e = p.slice(g, o).reduce(gd, 0),
              r = e + n.offsetStart + v.value,
              d = r + p[o];
            let f = r + l;
            if (void 0 !== c) {
              const t = e - S,
                l = n.scrollStart + t;
              f = !0 !== i && l < r && d < l + n.scrollViewSize ? l : "end" === c ? d - n.scrollViewSize : r - ("start" === c ? 0 : Math.round((n.scrollViewSize - p[o]) / 2))
            }
            u = f, bd(t, f, a.virtualScrollHorizontal, s.lang.rtl), R(o)
          }))
        }

        function A(e) {
          const t = b.value;
          if (t) {
            const n = md.call(t.children, (e => e.classList && !1 === e.classList.contains("q-virtual-scroll--skip"))),
              o = n.length,
              l = !0 === a.virtualScrollHorizontal ? e => e.getBoundingClientRect().width : e => e.offsetHeight;
            let r, i, s = e;
            for (let e = 0; e < o;) {
              for (r = l(n[e]), e++; e < o && !0 === n[e].classList.contains("q-virtual-scroll--with-prev");) r += l(n[e]), e++;
              i = r - p[s], 0 !== i && (p[s] += i, f[Math.floor(s / 1e3)] += i), s++
            }
          }
        }

        function L() {
          null !== b.value && void 0 !== b.value && b.value.focus()
        }

        function T(t, n) {
          const l = 1 * o.value;
          !0 !== n && !1 !== Array.isArray(p) || (p = []);
          const a = p.length;
          p.length = e.value;
          for (let o = e.value - 1; o >= a; o--) p[o] = l;
          const r = Math.floor((e.value - 1) / 1e3);
          f = [];
          for (let o = 0; o <= r; o++) {
            let t = 0;
            const n = Math.min(1e3 * (o + 1), e.value);
            for (let e = 1e3 * o; e < n; e++) t += p[e];
            f.push(t)
          }
          c = -1, u = void 0, v.value = _d(f, p, 0, _.value.from), m.value = _d(f, p, _.value.to, e.value), t >= 0 ? (A(_.value.from), It((() => {
            C(t)
          }))) : q()
        }

        function O(e) {
          if (void 0 === e && "undefined" != typeof window) {
            const o = t();
            null != o && 8 !== o.nodeType && (e = yd(o, n(), g.value, y.value, a.virtualScrollHorizontal, s.lang.rtl, a.virtualScrollStickySizeStart, a.virtualScrollStickySizeEnd).scrollViewSize)
          }
          d = e;
          const l = parseFloat(a.virtualScrollSliceRatioBefore) || 0,
            r = 1 + l + (parseFloat(a.virtualScrollSliceRatioAfter) || 0),
            i = void 0 === e || e <= 0 ? 1 : Math.ceil(e / o.value),
            u = Math.max(1, i, Math.ceil((a.virtualScrollSliceSize > 0 ? a.virtualScrollSliceSize : 10) / r));
          h.value = {
            total: Math.ceil(u * r),
            start: Math.ceil(u * l),
            center: Math.ceil(u * (.5 + l)),
            end: Math.ceil(u * (1 + l)),
            view: i
          }
        }

        function R(e) {
          c !== e && (void 0 !== a.onVirtualScroll && r("virtualScroll", {
            index: e,
            from: _.value.from,
            to: _.value.to - 1,
            direction: e < c ? "decrease" : "increase",
            ref: i
          }), c = e)
        }
        gn(Rl((() => k.value + ";" + a.virtualScrollSliceRatioBefore + ";" + a.virtualScrollSliceRatioAfter)), (() => {
          O()
        })), gn(k, x), O();
        const q = or((function() {
          const o = t();
          if (null == o || 8 === o.nodeType) return;
          const l = yd(o, n(), g.value, y.value, a.virtualScrollHorizontal, s.lang.rtl, a.virtualScrollStickySizeStart, a.virtualScrollStickySizeEnd),
            r = e.value - 1,
            i = l.scrollMaxSize - l.offsetStart - l.offsetEnd - m.value;
          if (u === l.scrollStart) return;
          if (l.scrollMaxSize <= 0) return void E(o, l, 0, 0);
          d !== l.scrollViewSize && O(l.scrollViewSize), A(_.value.from);
          const c = Math.floor(l.scrollMaxSize - Math.max(l.scrollViewSize, l.offsetEnd) - Math.min(p[r], l.scrollViewSize / 2));
          if (c > 0 && Math.ceil(l.scrollStart) >= c) return void E(o, l, r, l.scrollMaxSize - l.offsetEnd - f.reduce(gd, 0));
          let h = 0,
            b = l.scrollStart - l.offsetStart,
            w = b;
          if (b <= i && b + l.scrollViewSize >= v.value) b -= v.value, h = _.value.from, w = b;
          else
            for (let e = 0; b >= f[e] && h < r; e++) b -= f[e], h += 1e3;
          for (; b > 0 && h < r;) b -= p[h], b > -l.scrollViewSize ? (h++, w = b) : w = p[h] + b;
          E(o, l, h, w)
        }), !0 === s.platform.is.ios ? 120 : 35);
        In((() => {
          O()
        }));
        let V = !1;
        return Mn((() => {
          V = !0
        })), Vn((() => {
          if (!0 !== V) return;
          const e = t();
          void 0 !== u && null != e && 8 !== e.nodeType ? bd(e, u, a.virtualScrollHorizontal, s.lang.rtl) : C(c)
        })), Dn((() => {
          q.cancel()
        })), Object.assign(i, {
          scrollTo: C,
          reset: x,
          refresh: S
        }), {
          virtualScrollSliceRange: _,
          virtualScrollSliceSizeComputed: h,
          setVirtualScrollSize: O,
          onVirtualScrollEvt: q,
          localResetVirtualScroll: T,
          padVirtualScroll: function(e, t) {
            const n = !0 === a.virtualScrollHorizontal ? "width" : "height",
              l = {
                ["--q-virtual-scroll-item-" + n]: o.value + "px"
              };
            return ["tbody" === e ? ql(e, {
              class: "q-virtual-scroll__padding",
              key: "before",
              ref: g
            }, [ql("tr", [ql("td", {
              style: {
                [n]: `${v.value}px`,
                ...l
              },
              colspan: w.value
            })])]) : ql(e, {
              class: "q-virtual-scroll__padding",
              key: "before",
              ref: g,
              style: {
                [n]: `${v.value}px`,
                ...l
              }
            }), ql(e, {
              class: "q-virtual-scroll__content",
              key: "content",
              ref: b,
              tabindex: -1
            }, t.flat()), "tbody" === e ? ql(e, {
              class: "q-virtual-scroll__padding",
              key: "after",
              ref: y
            }, [ql("tr", [ql("td", {
              style: {
                [n]: `${m.value}px`,
                ...l
              },
              colspan: w.value
            })])]) : ql(e, {
              class: "q-virtual-scroll__padding",
              key: "after",
              ref: y,
              style: {
                [n]: `${m.value}px`,
                ...l
              }
            })]
          },
          scrollTo: C,
          reset: x,
          refresh: S
        }
      }({
        virtualScrollLength: A,
        getVirtualScrollTarget: function() {
          return we()
        },
        getVirtualScrollEl: we,
        virtualScrollItemSizeComputed: L
      }),
      z = oc(),
      P = Rl((() => {
        const t = !0 === e.mapOptions && !0 !== e.multiple,
          n = void 0 === e.modelValue || null === e.modelValue && !0 !== t ? [] : !0 === e.multiple && Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue];
        if (!0 === e.mapOptions && !0 === Array.isArray(e.options)) {
          const o = !0 === e.mapOptions && void 0 !== d ? d : [],
            l = n.map((t => function(t, n) {
              const o = e => Ar(ne.value(e), t);
              return e.options.find(o) || n.find(o) || t
            }(t, o)));
          return null === e.modelValue && !0 === t ? l.filter((e => null !== e)) : l
        }
        return n
      })),
      B = Rl((() => {
        const t = {};
        return Td.forEach((n => {
          const o = e[n];
          void 0 !== o && (t[n] = o)
        })), t
      })),
      I = Rl((() => null === e.optionsDark ? z.isDark.value : e.optionsDark)),
      N = Rl((() => ec(P.value))),
      $ = Rl((() => {
        let t = "q-field__input q-placeholder col";
        return !0 === e.hideSelected || 0 === P.value.length ? [t, e.inputClass] : (t += " q-field__input--padding", void 0 === e.inputClass ? t : [t, e.inputClass])
      })),
      j = Rl((() => (!0 === e.virtualScrollHorizontal ? "q-virtual-scroll--horizontal" : "") + (e.popupContentClass ? " " + e.popupContentClass : ""))),
      D = Rl((() => 0 === A.value)),
      H = Rl((() => P.value.map((e => oe.value(e))).join(", "))),
      U = Rl((() => void 0 !== e.displayValue ? e.displayValue : H.value)),
      W = Rl((() => !0 === e.optionsHtml ? () => !0 : e => null != e && !0 === e.html)),
      K = Rl((() => !0 === e.displayValueHtml || void 0 === e.displayValue && (!0 === e.optionsHtml || P.value.some(W.value)))),
      Q = Rl((() => !0 === z.focused.value ? e.tabindex : -1)),
      G = Rl((() => {
        const t = {
          tabindex: e.tabindex,
          role: "combobox",
          "aria-label": e.label,
          "aria-readonly": !0 === e.readonly ? "true" : "false",
          "aria-autocomplete": !0 === e.useInput ? "list" : "none",
          "aria-expanded": !0 === a.value ? "true" : "false",
          "aria-controls": `${z.targetUid.value}_lb`
        };
        return i.value >= 0 && (t["aria-activedescendant"] = `${z.targetUid.value}_${i.value}`), t
      })),
      X = Rl((() => ({
        id: `${z.targetUid.value}_lb`,
        role: "listbox",
        "aria-multiselectable": !0 === e.multiple ? "true" : "false"
      }))),
      J = Rl((() => P.value.map(((e, t) => ({
        index: t,
        opt: e,
        html: W.value(e),
        selected: !0,
        removeAtIndex: ue,
        toggleOption: de,
        tabindex: Q.value
      }))))),
      Z = Rl((() => {
        if (0 === A.value) return [];
        const {
          from: t,
          to: n
        } = T.value;
        return e.options.slice(t, n).map(((n, o) => {
          const r = !0 === le.value(n),
            s = t + o,
            u = {
              clickable: !0,
              active: !1,
              activeClass: te.value,
              manualFocus: !0,
              focused: !1,
              disable: r,
              tabindex: -1,
              dense: e.optionsDense,
              dark: I.value,
              role: "option",
              id: `${z.targetUid.value}_${s}`,
              onClick: () => {
                de(n)
              }
            };
          return !0 !== r && (!0 === me(n) && (u.active = !0), i.value === s && (u.focused = !0), u["aria-selected"] = !0 === u.active ? "true" : "false", !0 === l.platform.is.desktop && (u.onMousemove = () => {
            !0 === a.value && pe(s)
          })), {
            index: s,
            opt: n,
            html: W.value(n),
            label: oe.value(n),
            selected: u.active,
            focused: u.focused,
            toggleOption: de,
            setOptionIndex: pe,
            itemProps: u
          }
        }))
      })),
      Y = Rl((() => void 0 !== e.dropdownIcon ? e.dropdownIcon : l.iconSet.arrow.dropdown)),
      ee = Rl((() => !1 === e.optionsCover && !0 !== e.outlined && !0 !== e.standout && !0 !== e.borderless && !0 !== e.rounded)),
      te = Rl((() => void 0 !== e.optionsSelectedClass ? e.optionsSelectedClass : void 0 !== e.color ? `text-${e.color}` : "")),
      ne = Rl((() => ve(e.optionValue, "value"))),
      oe = Rl((() => ve(e.optionLabel, "label"))),
      le = Rl((() => ve(e.optionDisable, "disable"))),
      ae = Rl((() => P.value.map((e => ne.value(e))))),
      re = Rl((() => {
        const e = {
          onInput: xe,
          onChange: E,
          onKeydown: _e,
          onKeyup: ye,
          onKeypress: be,
          onFocus: he,
          onClick(e) {
            !0 === p && Za(e)
          }
        };
        return e.onCompositionstart = e.onCompositionupdate = e.onCompositionend = E, e
      }));

    function ie(t) {
      return !0 === e.emitValue ? ne.value(t) : t
    }

    function se(t) {
      if (t > -1 && t < P.value.length)
        if (!0 === e.multiple) {
          const o = e.modelValue.slice();
          n("remove", {
            index: t,
            value: o.splice(t, 1)[0]
          }), n("update:modelValue", o)
        } else n("update:modelValue", null)
    }

    function ue(e) {
      se(e), z.focus()
    }

    function ce(t, o) {
      const l = ie(t);
      if (!0 !== e.multiple) return !0 === e.fillInput && Ce(oe.value(t), !0, !0), void n("update:modelValue", l);
      if (0 === P.value.length) return n("add", {
        index: 0,
        value: l
      }), void n("update:modelValue", !0 === e.multiple ? [l] : l);
      if (!0 === o && !0 === me(t)) return;
      if (void 0 !== e.maxValues && e.modelValue.length >= e.maxValues) return;
      const a = e.modelValue.slice();
      n("add", {
        index: a.length,
        value: l
      }), a.push(l), n("update:modelValue", a)
    }

    function de(t, o) {
      if (!0 !== z.editable.value || void 0 === t || !0 === le.value(t)) return;
      const l = ne.value(t);
      if (!0 !== e.multiple) return !0 !== o && (Ce(!0 === e.fillInput ? oe.value(t) : "", !0, !0), ze()), null !== w.value && w.value.focus(), void(0 !== P.value.length && !0 === Ar(ne.value(P.value[0]), l) || n("update:modelValue", !0 === e.emitValue ? l : t));
      if ((!0 !== p || !0 === u.value) && z.focus(), he(), 0 === P.value.length) {
        const o = !0 === e.emitValue ? l : t;
        return n("add", {
          index: 0,
          value: o
        }), void n("update:modelValue", !0 === e.multiple ? [o] : o)
      }
      const a = e.modelValue.slice(),
        r = ae.value.findIndex((e => Ar(e, l)));
      if (r > -1) n("remove", {
        index: r,
        value: a.splice(r, 1)[0]
      });
      else {
        if (void 0 !== e.maxValues && a.length >= e.maxValues) return;
        const o = !0 === e.emitValue ? l : t;
        n("add", {
          index: a.length,
          value: o
        }), a.push(o)
      }
      n("update:modelValue", a)
    }

    function pe(e) {
      if (!0 !== l.platform.is.desktop) return;
      const t = e > -1 && e < A.value ? e : -1;
      i.value !== t && (i.value = t)
    }

    function fe(t = 1, n) {
      if (!0 === a.value) {
        let o = i.value;
        do {
          o = Ad(o + t, -1, A.value - 1)
        } while (-1 !== o && o !== i.value && !0 === le.value(e.options[o]));
        i.value !== o && (pe(o), M(o), !0 !== n && !0 === e.useInput && !0 === e.fillInput && Se(o >= 0 ? oe.value(e.options[o]) : v))
      }
    }

    function ve(e, t) {
      const n = void 0 !== e ? e : t;
      return "function" == typeof n ? n : e => null !== e && "object" == typeof e && n in e ? e[n] : e
    }

    function me(e) {
      const t = ne.value(e);
      return void 0 !== ae.value.find((e => Ar(e, t)))
    }

    function he(t) {
      !0 === e.useInput && null !== w.value && (void 0 === t || w.value === t.target && t.target.value === H.value) && w.value.select()
    }

    function ge(e) {
      !0 === br(e, 27) && !0 === a.value && (Za(e), ze(), Pe()), n("keyup", e)
    }

    function ye(t) {
      const {
        value: n
      } = t.target;
      if (void 0 === t.keyCode)
        if (t.target.value = "", null !== y && (clearTimeout(y), y = null), Pe(), "string" == typeof n && n.length > 0) {
          const t = n.toLocaleLowerCase(),
            o = n => {
              const o = e.options.find((e => n.value(e).toLocaleLowerCase() === t));
              return void 0 !== o && (-1 === P.value.indexOf(o) ? de(o) : ze(), !0)
            },
            l = e => {
              !0 !== o(ne) && !0 !== o(oe) && !0 !== e && Ee(n, !0, (() => l(!0)))
            };
          l()
        } else z.clearValue(t);
      else ge(t)
    }

    function be(e) {
      n("keypress", e)
    }

    function _e(t) {
      if (n("keydown", t), !0 === yr(t)) return;
      const o = s.value.length > 0 && (void 0 !== e.newValueMode || void 0 !== e.onNewValue),
        l = !0 !== t.shiftKey && !0 !== e.multiple && (i.value > -1 || !0 === o);
      if (27 === t.keyCode) return void Ya(t);
      if (9 === t.keyCode && !1 === l) return void Me();
      if (void 0 === t.target || t.target.id !== z.targetUid.value) return;
      if (40 === t.keyCode && !0 !== z.innerLoading.value && !1 === a.value) return er(t), void Fe();
      if (8 === t.keyCode && !0 !== e.hideSelected && 0 === s.value.length) return void(!0 === e.multiple && !0 === Array.isArray(e.modelValue) ? se(e.modelValue.length - 1) : !0 !== e.multiple && null !== e.modelValue && n("update:modelValue", null));
      35 !== t.keyCode && 36 !== t.keyCode || "string" == typeof s.value && 0 !== s.value.length || (er(t), i.value = -1, fe(36 === t.keyCode ? 1 : -1, e.multiple)), 33 !== t.keyCode && 34 !== t.keyCode || void 0 === O.value || (er(t), i.value = Math.max(-1, Math.min(A.value, i.value + (33 === t.keyCode ? -1 : 1) * O.value.view)), fe(33 === t.keyCode ? 1 : -1, e.multiple)), 38 !== t.keyCode && 40 !== t.keyCode || (er(t), fe(38 === t.keyCode ? -1 : 1, e.multiple));
      const r = A.value;
      if ((void 0 === h || g < Date.now()) && (h = ""), r > 0 && !0 !== e.useInput && void 0 !== t.key && 1 === t.key.length && !1 === t.altKey && !1 === t.ctrlKey && !1 === t.metaKey && (32 !== t.keyCode || h.length > 0)) {
        !0 !== a.value && Fe(t);
        const n = t.key.toLocaleLowerCase(),
          o = 1 === h.length && h[0] === n;
        g = Date.now() + 1500, !1 === o && (er(t), h += n);
        const l = new RegExp("^" + h.split("").map((e => ".*+?^${}()|[]\\".indexOf(e) > -1 ? "\\" + e : e)).join(".*"), "i");
        let s = i.value;
        if (!0 === o || s < 0 || !0 !== l.test(oe.value(e.options[s])))
          do {
            s = Ad(s + 1, -1, r - 1)
          } while (s !== i.value && (!0 === le.value(e.options[s]) || !0 !== l.test(oe.value(e.options[s]))));
        i.value !== s && It((() => {
          pe(s), M(s), s >= 0 && !0 === e.useInput && !0 === e.fillInput && Se(oe.value(e.options[s]))
        }))
      } else if (13 === t.keyCode || 32 === t.keyCode && !0 !== e.useInput && "" === h || 9 === t.keyCode && !1 !== l)
        if (9 !== t.keyCode && er(t), i.value > -1 && i.value < r) de(e.options[i.value]);
        else {
          if (!0 === o) {
            const t = (t, n) => {
              if (n) {
                if (!0 !== Ld(n)) return
              } else n = e.newValueMode;
              if (null == t) return;
              Ce("", !0 !== e.multiple, !0);
              ("toggle" === n ? de : ce)(t, "add-unique" === n), !0 !== e.multiple && (null !== w.value && w.value.focus(), ze())
            };
            if (void 0 !== e.onNewValue ? n("newValue", s.value, t) : t(s.value), !0 !== e.multiple) return
          }!0 === a.value ? Me() : !0 !== z.innerLoading.value && Fe()
        }
    }

    function we() {
      return !0 === p ? S.value : null !== k.value && null !== k.value.contentEl ? k.value.contentEl : void 0
    }

    function ke() {
      if (!0 === D.value) return void 0 !== t["no-option"] ? t["no-option"]({
        inputValue: s.value
      }) : void 0;
      const e = void 0 !== t.option ? t.option : e => ql(Vu, {
        key: e.index,
        ...e.itemProps
      }, (() => ql(ku, (() => ql(xu, (() => ql("span", {
        [!0 === e.html ? "innerHTML" : "textContent"]: e.label
      })))))));
      let n = q("div", Z.value.map(e));
      return void 0 !== t["before-options"] && (n = t["before-options"]().concat(n)), xs(t["after-options"], n)
    }

    function xe(t) {
      null !== y && (clearTimeout(y), y = null), t && t.target && !0 === t.target.qComposing || (Se(t.target.value || ""), f = !0, v = s.value, !0 === z.focused.value || !0 === p && !0 !== u.value || z.focus(), void 0 !== e.onFilter && (y = setTimeout((() => {
        y = null, Ee(s.value)
      }), e.inputDebounce)))
    }

    function Se(e) {
      s.value !== e && (s.value = e, n("inputValue", e))
    }

    function Ce(t, n, o) {
      f = !0 !== o, !0 === e.useInput && (Se(t), !0 !== n && !0 === o || (v = t), !0 !== n && Ee(t))
    }

    function Ee(t, l, r) {
      if (void 0 === e.onFilter || !0 !== l && !0 !== z.focused.value) return;
      !0 === z.innerLoading.value ? n("filterAbort") : (z.innerLoading.value = !0, c.value = !0), "" !== t && !0 !== e.multiple && P.value.length > 0 && !0 !== f && t === oe.value(P.value[0]) && (t = "");
      const i = setTimeout((() => {
        !0 === a.value && (a.value = !1)
      }), 10);
      null !== b && clearTimeout(b), b = i, n("filter", t, ((e, t) => {
        !0 !== l && !0 !== z.focused.value || b !== i || (clearTimeout(b), "function" == typeof e && e(), c.value = !1, It((() => {
          z.innerLoading.value = !1, !0 === z.editable.value && (!0 === l ? !0 === a.value && ze() : !0 === a.value ? Be(!0) : a.value = !0), "function" == typeof t && It((() => {
            t(o)
          })), "function" == typeof r && It((() => {
            r(o)
          }))
        })))
      }), (() => {
        !0 === z.focused.value && b === i && (clearTimeout(b), z.innerLoading.value = !1, c.value = !1), !0 === a.value && (a.value = !1)
      }))
    }

    function Ae(e) {
      $e(e), Me()
    }

    function Le() {
      F()
    }

    function Te(e) {
      Za(e), null !== w.value && w.value.focus(), u.value = !0, window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0)
    }

    function Oe(e) {
      Za(e), It((() => {
        u.value = !1
      }))
    }

    function Re(e) {
      $e(e), null !== x.value && x.value.__updateRefocusTarget(z.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")), z.focused.value = !1
    }

    function qe(e) {
      ze(), !1 === z.focused.value && n("blur", e), Pe()
    }

    function Ve() {
      const e = document.activeElement;
      null !== e && e.id === z.targetUid.value || null === w.value || w.value === e || w.value.focus(), F()
    }

    function Me() {
      !0 !== r.value && (i.value = -1, !0 === a.value && (a.value = !1), !1 === z.focused.value && (null !== b && (clearTimeout(b), b = null), !0 === z.innerLoading.value && (n("filterAbort"), z.innerLoading.value = !1, c.value = !1)))
    }

    function Fe(n) {
      !0 === z.editable.value && (!0 === p ? (z.onControlFocusin(n), r.value = !0, It((() => {
        z.focus()
      }))) : z.focus(), void 0 !== e.onFilter ? Ee(s.value) : !0 === D.value && void 0 === t["no-option"] || (a.value = !0))
    }

    function ze() {
      r.value = !1, Me()
    }

    function Pe() {
      !0 === e.useInput && Ce(!0 !== e.multiple && !0 === e.fillInput && P.value.length > 0 && oe.value(P.value[0]) || "", !0, !0)
    }

    function Be(t) {
      let n = -1;
      if (!0 === t) {
        if (P.value.length > 0) {
          const t = ne.value(P.value[0]);
          n = e.options.findIndex((e => Ar(ne.value(e), t)))
        }
        R(n)
      }
      pe(n)
    }

    function Ie() {
      !1 === r.value && null !== k.value && k.value.updatePosition()
    }

    function Ne(e) {
      void 0 !== e && Za(e), n("popupShow", e), z.hasPopupOpen = !0, z.onControlFocusin(e)
    }

    function $e(e) {
      void 0 !== e && Za(e), n("popupHide", e), z.hasPopupOpen = !1, z.onControlFocusout(e)
    }

    function je() {
      p = (!0 === l.platform.is.mobile || "dialog" === e.behavior) && ("menu" !== e.behavior && (!0 !== e.useInput || (void 0 !== t["no-option"] || void 0 !== e.onFilter || !1 === D.value))), m = !0 === l.platform.is.ios && !0 === p && !0 === e.useInput ? "fade" : e.transitionShow
    }
    return gn(P, (t => {
      d = t, !0 === e.useInput && !0 === e.fillInput && !0 !== e.multiple && !0 !== z.innerLoading.value && (!0 !== r.value && !0 !== a.value || !0 !== N.value) && (!0 !== f && Pe(), !0 !== r.value && !0 !== a.value || Ee(""))
    }), {
      immediate: !0
    }), gn((() => e.fillInput), Pe), gn(a, Be), gn(A, (function(e, t) {
      !0 === a.value && !1 === z.innerLoading.value && (R(-1, !0), It((() => {
        !0 === a.value && !1 === z.innerLoading.value && (e > t ? R() : Be(!0))
      })))
    })), $n(je), jn(Ie), je(), Dn((() => {
      null !== y && clearTimeout(y)
    })), Object.assign(o, {
      showPopup: Fe,
      hidePopup: ze,
      removeAtIndex: se,
      add: ce,
      toggleOption: de,
      getOptionIndex: () => i.value,
      setOptionIndex: pe,
      moveOptionSelection: fe,
      filter: Ee,
      updateMenuPosition: Ie,
      updateInputValue: Ce,
      isOptionSelected: me,
      getEmittingOptionValue: ie,
      isOptionDisabled: (...e) => !0 === le.value.apply(null, e),
      getOptionValue: (...e) => ne.value.apply(null, e),
      getOptionLabel: (...e) => oe.value.apply(null, e)
    }), Object.assign(z, {
      innerValue: P,
      fieldClass: Rl((() => `q-select q-field--auto-height q-select--with${!0!==e.useInput?"out":""}-input q-select--with${!0!==e.useChips?"out":""}-chips q-select--${!0===e.multiple?"multiple":"single"}`)),
      inputRef: _,
      targetRef: w,
      hasValue: N,
      showPopup: Fe,
      floatingLabel: Rl((() => !0 !== e.hideSelected && !0 === N.value || "number" == typeof s.value || s.value.length > 0 || ec(e.displayValue))),
      getControlChild: () => {
        if (!1 !== z.editable.value && (!0 === r.value || !0 !== D.value || void 0 !== t["no-option"])) return !0 === p ? function() {
          const n = [ql(ac, {
            class: `col-auto ${z.fieldClass.value}`,
            ...B.value,
            for: z.targetUid.value,
            dark: I.value,
            square: !0,
            loading: c.value,
            itemAligned: !1,
            filled: !0,
            stackLabel: s.value.length > 0,
            ...z.splitAttrs.listeners.value,
            onFocus: Te,
            onBlur: Oe
          }, {
            ...t,
            rawControl: () => z.getControl(!0),
            before: void 0,
            after: void 0
          })];
          return !0 === a.value && n.push(ql("div", {
            ref: S,
            class: j.value + " scroll",
            style: e.popupContentStyle,
            ...X.value,
            onClick: Ya,
            onScrollPassive: V
          }, ke())), ql(pd, {
            ref: x,
            modelValue: r.value,
            position: !0 === e.useInput ? "top" : void 0,
            transitionShow: m,
            transitionHide: e.transitionHide,
            transitionDuration: e.transitionDuration,
            onBeforeShow: Ne,
            onBeforeHide: Re,
            onHide: qe,
            onShow: Ve
          }, (() => ql("div", {
            class: "q-select__dialog" + (!0 === I.value ? " q-select__dialog--dark q-dark" : "") + (!0 === u.value ? " q-select__dialog--focused" : "")
          }, n)))
        }() : ql(Qc, {
          ref: k,
          class: j.value,
          style: e.popupContentStyle,
          modelValue: a.value,
          fit: !0 !== e.menuShrink,
          cover: !0 === e.optionsCover && !0 !== D.value && !0 !== e.useInput,
          anchor: e.menuAnchor,
          self: e.menuSelf,
          offset: e.menuOffset,
          dark: I.value,
          noParentEvent: !0,
          noRefocus: !0,
          noFocus: !0,
          square: ee.value,
          transitionShow: e.transitionShow,
          transitionHide: e.transitionHide,
          transitionDuration: e.transitionDuration,
          separateClosePopup: !0,
          ...X.value,
          onScrollPassive: V,
          onBeforeShow: Ne,
          onBeforeHide: Ae,
          onShow: Le
        }, ke);
        !0 === z.hasPopupOpen && (z.hasPopupOpen = !1)
      },
      controlEvents: {
        onFocusin(e) {
          z.onControlFocusin(e)
        },
        onFocusout(e) {
          z.onControlFocusout(e, (() => {
            Pe(), Me()
          }))
        },
        onClick(e) {
          if (Ya(e), !0 !== p && !0 === a.value) return Me(), void(null !== w.value && w.value.focus());
          Fe(e)
        }
      },
      getControl: n => {
        const o = !0 === e.hideSelected ? [] : void 0 !== t["selected-item"] ? J.value.map((e => t["selected-item"](e))).slice() : void 0 !== t.selected ? [].concat(t.selected()) : !0 === e.useChips ? J.value.map(((t, n) => ql(dc, {
            key: "option-" + n,
            removable: !0 === z.editable.value && !0 !== le.value(t.opt),
            dense: !0,
            textColor: e.color,
            tabindex: Q.value,
            onRemove() {
              t.removeAtIndex(n)
            }
          }, (() => ql("span", {
            class: "ellipsis",
            [!0 === t.html ? "innerHTML" : "textContent"]: oe.value(t.opt)
          }))))) : [ql("span", {
            [!0 === K.value ? "innerHTML" : "textContent"]: U.value
          })],
          l = !0 === n || !0 !== r.value || !0 !== p;
        if (!0 === e.useInput) o.push(function(t, n) {
          const o = !0 === n ? {
              ...G.value,
              ...z.splitAttrs.attributes.value
            } : void 0,
            l = {
              ref: !0 === n ? w : void 0,
              key: "i_t",
              class: $.value,
              style: e.inputStyle,
              value: void 0 !== s.value ? s.value : "",
              type: "search",
              ...o,
              id: !0 === n ? z.targetUid.value : void 0,
              maxlength: e.maxlength,
              autocomplete: e.autocomplete,
              "data-autofocus": !0 === t || !0 === e.autofocus || void 0,
              disabled: !0 === e.disable,
              readonly: !0 === e.readonly,
              ...re.value
            };
          return !0 !== t && !0 === p && (!0 === Array.isArray(l.class) ? l.class = [...l.class, "no-pointer-events"] : l.class += " no-pointer-events"), ql("input", l)
        }(n, l));
        else if (!0 === z.editable.value) {
          const t = !0 === l ? G.value : void 0;
          o.push(ql("input", {
            ref: !0 === l ? w : void 0,
            key: "d_t",
            class: "q-select__focus-target",
            id: !0 === l ? z.targetUid.value : void 0,
            value: U.value,
            readonly: !0,
            "data-autofocus": !0 === n || !0 === e.autofocus || void 0,
            ...t,
            onKeydown: _e,
            onKeyup: ge,
            onKeypress: be
          })), !0 === l && "string" == typeof e.autocomplete && e.autocomplete.length > 0 && o.push(ql("input", {
            class: "q-select__autocomplete-input",
            autocomplete: e.autocomplete,
            tabindex: -1,
            onKeyup: ye
          }))
        }
        if (void 0 !== C.value && !0 !== e.disable && ae.value.length > 0) {
          const t = ae.value.map((e => ql("option", {
            value: e,
            selected: !0
          })));
          o.push(ql("select", {
            class: "hidden",
            name: C.value,
            multiple: e.multiple
          }, t))
        }
        return ql("div", {
          class: "q-field__native row items-center",
          ...!0 === e.useInput || !0 !== l ? void 0 : z.splitAttrs.attributes.value
        }, o)
      },
      getInnerAppend: () => !0 !== e.loading && !0 !== c.value && !0 !== e.hideDropdownIcon ? [ql(au, {
        class: "q-select__dropdown-icon" + (!0 === a.value ? " rotate-180" : ""),
        name: Y.value
      })] : null
    }), lc(z)
  }
});
/*!
 * shared v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
const Rd = "undefined" != typeof window,
  qd = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
  Vd = e => qd ? Symbol(e) : e,
  Md = e => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"),
  Fd = e => "number" == typeof e && isFinite(e),
  zd = e => "[object RegExp]" === Gd(e),
  Pd = e => Xd(e) && 0 === Object.keys(e).length;

function Bd(e, t) {
  "undefined" != typeof console && (console.warn("[intlify] " + e), t && console.warn(t.stack))
}
const Id = Object.assign;

function Nd(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}
const $d = Object.prototype.hasOwnProperty;

function jd(e, t) {
  return $d.call(e, t)
}
const Dd = Array.isArray,
  Hd = e => "function" == typeof e,
  Ud = e => "string" == typeof e,
  Wd = e => "boolean" == typeof e,
  Kd = e => null !== e && "object" == typeof e,
  Qd = Object.prototype.toString,
  Gd = e => Qd.call(e),
  Xd = e => "[object Object]" === Gd(e),
  Jd = 15;

function Zd(e, t, n = {}) {
  const {
    domain: o,
    messages: l,
    args: a
  } = n, r = new SyntaxError(String(e));
  return r.code = e, t && (r.location = t), r.domain = o, r
}
/*!
 * devtools-if v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
const Yd = [];
/*!
 * core-base v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
Yd[0] = {
  w: [0],
  i: [3, 0],
  "[": [4],
  o: [7]
}, Yd[1] = {
  w: [1],
  ".": [2],
  "[": [4],
  o: [7]
}, Yd[2] = {
  w: [2],
  i: [3, 0],
  0: [3, 0]
}, Yd[3] = {
  i: [3, 0],
  0: [3, 0],
  w: [1, 1],
  ".": [2, 1],
  "[": [4, 1],
  o: [7, 1]
}, Yd[4] = {
  "'": [5, 0],
  '"': [6, 0],
  "[": [4, 2],
  "]": [1, 3],
  o: 8,
  l: [4, 0]
}, Yd[5] = {
  "'": [4, 0],
  o: 8,
  l: [5, 0]
}, Yd[6] = {
  '"': [4, 0],
  o: 8,
  l: [6, 0]
};
const ep = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

function tp(e) {
  if (null == e) return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w"
  }
  return "i"
}

function np(e) {
  const t = e.trim();
  return ("0" !== e.charAt(0) || !isNaN(parseInt(e))) && (n = t, ep.test(n) ? function(e) {
    const t = e.charCodeAt(0);
    return t !== e.charCodeAt(e.length - 1) || 34 !== t && 39 !== t ? e : e.slice(1, -1)
  }(t) : "*" + t);
  var n
}
const op = new Map;

function lp(e, t) {
  return Kd(e) ? e[t] : null
}
const ap = e => e,
  rp = e => "",
  ip = e => 0 === e.length ? "" : e.join(""),
  sp = e => null == e ? "" : Dd(e) || Xd(e) && e.toString === Qd ? JSON.stringify(e, null, 2) : String(e);

function up(e, t) {
  return e = Math.abs(e), 2 === t ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
}

function cp(e = {}) {
  const t = e.locale,
    n = function(e) {
      const t = Fd(e.pluralIndex) ? e.pluralIndex : -1;
      return e.named && (Fd(e.named.count) || Fd(e.named.n)) ? Fd(e.named.count) ? e.named.count : Fd(e.named.n) ? e.named.n : t : t
    }(e),
    o = Kd(e.pluralRules) && Ud(t) && Hd(e.pluralRules[t]) ? e.pluralRules[t] : up,
    l = Kd(e.pluralRules) && Ud(t) && Hd(e.pluralRules[t]) ? up : void 0,
    a = e.list || [],
    r = e.named || {};
  Fd(e.pluralIndex) && function(e, t) {
    t.count || (t.count = e), t.n || (t.n = e)
  }(n, r);

  function i(t) {
    const n = Hd(e.messages) ? e.messages(t) : !!Kd(e.messages) && e.messages[t];
    return n || (e.parent ? e.parent.message(t) : rp)
  }
  const s = Xd(e.processor) && Hd(e.processor.normalize) ? e.processor.normalize : ip,
    u = Xd(e.processor) && Hd(e.processor.interpolate) ? e.processor.interpolate : sp,
    c = {
      list: e => a[e],
      named: e => r[e],
      plural: e => e[o(n, e.length, l)],
      linked: (t, ...n) => {
        const [o, l] = n;
        let a = "text",
          r = "";
        1 === n.length ? Kd(o) ? (r = o.modifier || r, a = o.type || a) : Ud(o) && (r = o || r) : 2 === n.length && (Ud(o) && (r = o || r), Ud(l) && (a = l || a));
        let s = i(t)(c);
        return "vnode" === a && Dd(s) && r && (s = s[0]), r ? (u = r, e.modifiers ? e.modifiers[u] : ap)(s, a) : s;
        var u
      },
      message: i,
      type: Xd(e.processor) && Ud(e.processor.type) ? e.processor.type : "text",
      interpolate: u,
      normalize: s
    };
  return c
}

function dp(e, t, n) {
  return [...new Set([n, ...Dd(t) ? t : Kd(t) ? Object.keys(t) : Ud(t) ? [t] : [n]])]
}

function pp(e, t, n) {
  const o = Ud(n) ? n : hp,
    l = e;
  l.__localeChainCache || (l.__localeChainCache = new Map);
  let a = l.__localeChainCache.get(o);
  if (!a) {
    a = [];
    let e = [n];
    for (; Dd(e);) e = fp(a, e, t);
    const r = Dd(t) || !Xd(t) ? t : t.default ? t.default : null;
    e = Ud(r) ? [r] : r, Dd(e) && fp(a, e, !1), l.__localeChainCache.set(o, a)
  }
  return a
}

function fp(e, t, n) {
  let o = !0;
  for (let l = 0; l < t.length && Wd(o); l++) {
    const a = t[l];
    Ud(a) && (o = vp(e, t[l], n))
  }
  return o
}

function vp(e, t, n) {
  let o;
  const l = t.split("-");
  do {
    o = mp(e, l.join("-"), n), l.splice(-1, 1)
  } while (l.length && !0 === o);
  return o
}

function mp(e, t, n) {
  let o = !1;
  if (!e.includes(t) && (o = !0, t)) {
    o = "!" !== t[t.length - 1];
    const l = t.replace(/!/g, "");
    e.push(l), (Dd(n) || Xd(n)) && n[l] && (o = n[l])
  }
  return o
}
const hp = "en-US",
  gp = e => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
let yp, bp;
let _p = 0;

function wp(e = {}) {
  const t = Ud(e.version) ? e.version : "9.2.2",
    n = Ud(e.locale) ? e.locale : hp,
    o = Dd(e.fallbackLocale) || Xd(e.fallbackLocale) || Ud(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : n,
    l = Xd(e.messages) ? e.messages : {
      [n]: {}
    },
    a = Xd(e.datetimeFormats) ? e.datetimeFormats : {
      [n]: {}
    },
    r = Xd(e.numberFormats) ? e.numberFormats : {
      [n]: {}
    },
    i = Id({}, e.modifiers || {}, {
      upper: (e, t) => "text" === t && Ud(e) ? e.toUpperCase() : "vnode" === t && Kd(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
      lower: (e, t) => "text" === t && Ud(e) ? e.toLowerCase() : "vnode" === t && Kd(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
      capitalize: (e, t) => "text" === t && Ud(e) ? gp(e) : "vnode" === t && Kd(e) && "__v_isVNode" in e ? gp(e.children) : e
    }),
    s = e.pluralRules || {},
    u = Hd(e.missing) ? e.missing : null,
    c = !Wd(e.missingWarn) && !zd(e.missingWarn) || e.missingWarn,
    d = !Wd(e.fallbackWarn) && !zd(e.fallbackWarn) || e.fallbackWarn,
    p = !!e.fallbackFormat,
    f = !!e.unresolving,
    v = Hd(e.postTranslation) ? e.postTranslation : null,
    m = Xd(e.processor) ? e.processor : null,
    h = !Wd(e.warnHtmlMessage) || e.warnHtmlMessage,
    g = !!e.escapeParameter,
    y = Hd(e.messageCompiler) ? e.messageCompiler : undefined,
    b = Hd(e.messageResolver) ? e.messageResolver : yp || lp,
    _ = Hd(e.localeFallbacker) ? e.localeFallbacker : bp || dp,
    w = Kd(e.fallbackContext) ? e.fallbackContext : void 0,
    k = Hd(e.onWarn) ? e.onWarn : Bd,
    x = e,
    S = Kd(x.__datetimeFormatters) ? x.__datetimeFormatters : new Map,
    C = Kd(x.__numberFormatters) ? x.__numberFormatters : new Map,
    E = Kd(x.__meta) ? x.__meta : {};
  _p++;
  const A = {
    version: t,
    cid: _p,
    locale: n,
    fallbackLocale: o,
    messages: l,
    modifiers: i,
    pluralRules: s,
    missing: u,
    missingWarn: c,
    fallbackWarn: d,
    fallbackFormat: p,
    unresolving: f,
    postTranslation: v,
    processor: m,
    warnHtmlMessage: h,
    escapeParameter: g,
    messageCompiler: y,
    messageResolver: b,
    localeFallbacker: _,
    fallbackContext: w,
    onWarn: k,
    __meta: E
  };
  return A.datetimeFormats = a, A.numberFormats = r, A.__datetimeFormatters = S, A.__numberFormatters = C, A
}

function kp(e, t, n, o, l) {
  const {
    missing: a,
    onWarn: r
  } = e;
  if (null !== a) {
    const o = a(e, n, t, l);
    return Ud(o) ? o : t
  }
  return t
}

function xp(e, t, n) {
  e.__localeChainCache = new Map, e.localeFallbacker(e, n, t)
}
let Sp = Jd;
const Cp = () => ++Sp,
  Ep = {
    INVALID_ARGUMENT: Sp,
    INVALID_DATE_ARGUMENT: Cp(),
    INVALID_ISO_DATE_ARGUMENT: Cp(),
    __EXTEND_POINT__: Cp()
  };

function Ap(e) {
  return Zd(e, null, void 0)
}
const Lp = () => "",
  Tp = e => Hd(e);

function Op(e, ...t) {
  const {
    fallbackFormat: n,
    postTranslation: o,
    unresolving: l,
    messageCompiler: a,
    fallbackLocale: r,
    messages: i
  } = e, [s, u] = Vp(...t), c = Wd(u.missingWarn) ? u.missingWarn : e.missingWarn, d = Wd(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, p = Wd(u.escapeParameter) ? u.escapeParameter : e.escapeParameter, f = !!u.resolvedMessage, v = Ud(u.default) || Wd(u.default) ? Wd(u.default) ? a ? s : () => s : u.default : n ? a ? s : () => s : "", m = n || "" !== v, h = Ud(u.locale) ? u.locale : e.locale;
  p && function(e) {
    Dd(e.list) ? e.list = e.list.map((e => Ud(e) ? Nd(e) : e)) : Kd(e.named) && Object.keys(e.named).forEach((t => {
      Ud(e.named[t]) && (e.named[t] = Nd(e.named[t]))
    }))
  }(u);
  let [g, y, b] = f ? [s, h, i[h] || {}] : Rp(e, s, h, r, d, c), _ = g, w = s;
  if (f || Ud(_) || Tp(_) || m && (_ = v, w = _), !(f || (Ud(_) || Tp(_)) && Ud(y))) return l ? -1 : s;
  let k = !1;
  const x = Tp(_) ? _ : qp(e, s, y, _, w, (() => {
    k = !0
  }));
  if (k) return _;
  const S = function(e, t, n, o) {
      const {
        modifiers: l,
        pluralRules: a,
        messageResolver: r,
        fallbackLocale: i,
        fallbackWarn: s,
        missingWarn: u,
        fallbackContext: c
      } = e, d = o => {
        let l = r(n, o);
        if (null == l && c) {
          const [, , e] = Rp(c, o, t, i, s, u);
          l = r(e, o)
        }
        if (Ud(l)) {
          let n = !1;
          const a = qp(e, o, t, l, o, (() => {
            n = !0
          }));
          return n ? Lp : a
        }
        return Tp(l) ? l : Lp
      }, p = {
        locale: t,
        modifiers: l,
        pluralRules: a,
        messages: d
      };
      e.processor && (p.processor = e.processor);
      o.list && (p.list = o.list);
      o.named && (p.named = o.named);
      Fd(o.plural) && (p.pluralIndex = o.plural);
      return p
    }(e, y, b, u),
    C = function(e, t, n) {
      return t(n)
    }(0, x, cp(S));
  return o ? o(C, s) : C
}

function Rp(e, t, n, o, l, a) {
  const {
    messages: r,
    onWarn: i,
    messageResolver: s,
    localeFallbacker: u
  } = e, c = u(e, o, n);
  let d, p = {},
    f = null;
  for (let v = 0; v < c.length && (d = c[v], p = r[d] || {}, null === (f = s(p, t)) && (f = p[t]), !Ud(f) && !Hd(f)); v++) {
    const n = kp(e, t, d, 0, "translate");
    n !== t && (f = n)
  }
  return [f, d, p]
}

function qp(e, t, n, o, l, a) {
  const {
    messageCompiler: r,
    warnHtmlMessage: i
  } = e;
  if (Tp(o)) {
    const e = o;
    return e.locale = e.locale || n, e.key = e.key || t, e
  }
  if (null == r) {
    const e = () => o;
    return e.locale = n, e.key = t, e
  }
  const s = r(o, function(e, t, n, o, l, a) {
    return {
      warnHtmlMessage: l,
      onError: e => {
        throw a && a(e), e
      },
      onCacheKey: e => ((e, t, n) => Md({
        l: e,
        k: t,
        s: n
      }))(t, n, e)
    }
  }(0, n, l, 0, i, a));
  return s.locale = n, s.key = t, s.source = o, s
}

function Vp(...e) {
  const [t, n, o] = e, l = {};
  if (!Ud(t) && !Fd(t) && !Tp(t)) throw Ap(Ep.INVALID_ARGUMENT);
  const a = Fd(t) ? String(t) : (Tp(t), t);
  return Fd(n) ? l.plural = n : Ud(n) ? l.default = n : Xd(n) && !Pd(n) ? l.named = n : Dd(n) && (l.list = n), Fd(o) ? l.plural = o : Ud(o) ? l.default = o : Xd(o) && Id(l, o), [a, l]
}

function Mp(e, ...t) {
  const {
    datetimeFormats: n,
    unresolving: o,
    fallbackLocale: l,
    onWarn: a,
    localeFallbacker: r
  } = e, {
    __datetimeFormatters: i
  } = e, [s, u, c, d] = zp(...t);
  Wd(c.missingWarn) ? c.missingWarn : e.missingWarn;
  Wd(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const p = !!c.part,
    f = Ud(c.locale) ? c.locale : e.locale,
    v = r(e, l, f);
  if (!Ud(s) || "" === s) return new Intl.DateTimeFormat(f, d).format(u);
  let m, h = {},
    g = null;
  for (let _ = 0; _ < v.length && (m = v[_], h = n[m] || {}, g = h[s], !Xd(g)); _++) kp(e, s, m, 0, "datetime format");
  if (!Xd(g) || !Ud(m)) return o ? -1 : s;
  let y = `${m}__${s}`;
  Pd(d) || (y = `${y}__${JSON.stringify(d)}`);
  let b = i.get(y);
  return b || (b = new Intl.DateTimeFormat(m, Id({}, g, d)), i.set(y, b)), p ? b.formatToParts(u) : b.format(u)
}
const Fp = ["localeMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "formatMatcher", "hour12", "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod", "numberingSystem", "hourCycle", "fractionalSecondDigits"];

function zp(...e) {
  const [t, n, o, l] = e, a = {};
  let r, i = {};
  if (Ud(t)) {
    const e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!e) throw Ap(Ep.INVALID_ISO_DATE_ARGUMENT);
    const n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
    r = new Date(n);
    try {
      r.toISOString()
    } catch (Om) {
      throw Ap(Ep.INVALID_ISO_DATE_ARGUMENT)
    }
  } else if ("[object Date]" === Gd(t)) {
    if (isNaN(t.getTime())) throw Ap(Ep.INVALID_DATE_ARGUMENT);
    r = t
  } else {
    if (!Fd(t)) throw Ap(Ep.INVALID_ARGUMENT);
    r = t
  }
  return Ud(n) ? a.key = n : Xd(n) && Object.keys(n).forEach((e => {
    Fp.includes(e) ? i[e] = n[e] : a[e] = n[e]
  })), Ud(o) ? a.locale = o : Xd(o) && (i = o), Xd(l) && (i = l), [a.key || "", r, a, i]
}

function Pp(e, t, n) {
  const o = e;
  for (const l in n) {
    const e = `${t}__${l}`;
    o.__datetimeFormatters.has(e) && o.__datetimeFormatters.delete(e)
  }
}

function Bp(e, ...t) {
  const {
    numberFormats: n,
    unresolving: o,
    fallbackLocale: l,
    onWarn: a,
    localeFallbacker: r
  } = e, {
    __numberFormatters: i
  } = e, [s, u, c, d] = Np(...t);
  Wd(c.missingWarn) ? c.missingWarn : e.missingWarn;
  Wd(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const p = !!c.part,
    f = Ud(c.locale) ? c.locale : e.locale,
    v = r(e, l, f);
  if (!Ud(s) || "" === s) return new Intl.NumberFormat(f, d).format(u);
  let m, h = {},
    g = null;
  for (let _ = 0; _ < v.length && (m = v[_], h = n[m] || {}, g = h[s], !Xd(g)); _++) kp(e, s, m, 0, "number format");
  if (!Xd(g) || !Ud(m)) return o ? -1 : s;
  let y = `${m}__${s}`;
  Pd(d) || (y = `${y}__${JSON.stringify(d)}`);
  let b = i.get(y);
  return b || (b = new Intl.NumberFormat(m, Id({}, g, d)), i.set(y, b)), p ? b.formatToParts(u) : b.format(u)
}
const Ip = ["localeMatcher", "style", "currency", "currencyDisplay", "currencySign", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "notation", "signDisplay", "unit", "unitDisplay", "roundingMode", "roundingPriority", "roundingIncrement", "trailingZeroDisplay"];

function Np(...e) {
  const [t, n, o, l] = e, a = {};
  let r = {};
  if (!Fd(t)) throw Ap(Ep.INVALID_ARGUMENT);
  const i = t;
  return Ud(n) ? a.key = n : Xd(n) && Object.keys(n).forEach((e => {
    Ip.includes(e) ? r[e] = n[e] : a[e] = n[e]
  })), Ud(o) ? a.locale = o : Xd(o) && (r = o), Xd(l) && (r = l), [a.key || "", i, a, r]
}

function $p(e, t, n) {
  const o = e;
  for (const l in n) {
    const e = `${t}__${l}`;
    o.__numberFormatters.has(e) && o.__numberFormatters.delete(e)
  }
}
/*!
 * vue-i18n v9.2.2
 * (c) 2022 kazuya kawaguchi
 * Released under the MIT License.
 */
let jp = Jd;
const Dp = () => ++jp,
  Hp = {
    UNEXPECTED_RETURN_TYPE: jp,
    INVALID_ARGUMENT: Dp(),
    MUST_BE_CALL_SETUP_TOP: Dp(),
    NOT_INSLALLED: Dp(),
    NOT_AVAILABLE_IN_LEGACY_MODE: Dp(),
    REQUIRED_VALUE: Dp(),
    INVALID_VALUE: Dp(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Dp(),
    NOT_INSLALLED_WITH_PROVIDE: Dp(),
    UNEXPECTED_ERROR: Dp(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: Dp(),
    BRIDGE_SUPPORT_VUE_2_ONLY: Dp(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Dp(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Dp(),
    __EXTEND_POINT__: Dp()
  };

function Up(e, ...t) {
  return Zd(e, null, void 0)
}
const Wp = Vd("__transrateVNode"),
  Kp = Vd("__datetimeParts"),
  Qp = Vd("__numberParts"),
  Gp = Vd("__setPluralRules");
Vd("__intlifyMeta");
const Xp = Vd("__injectWithOption");

function Jp(e) {
  if (!Kd(e)) return e;
  for (const t in e)
    if (jd(e, t))
      if (t.includes(".")) {
        const n = t.split("."),
          o = n.length - 1;
        let l = e;
        for (let e = 0; e < o; e++) n[e] in l || (l[n[e]] = {}), l = l[n[e]];
        l[n[o]] = e[t], delete e[t], Kd(l[n[o]]) && Jp(l[n[o]])
      } else Kd(e[t]) && Jp(e[t]);
  return e
}

function Zp(e, t) {
  const {
    messages: n,
    __i18n: o,
    messageResolver: l,
    flatJson: a
  } = t, r = Xd(n) ? n : Dd(o) ? {} : {
    [e]: {}
  };
  if (Dd(o) && o.forEach((e => {
      if ("locale" in e && "resource" in e) {
        const {
          locale: t,
          resource: n
        } = e;
        t ? (r[t] = r[t] || {}, ef(n, r[t])) : ef(n, r)
      } else Ud(e) && ef(JSON.parse(e), r)
    })), null == l && a)
    for (const i in r) jd(r, i) && Jp(r[i]);
  return r
}
const Yp = e => !Kd(e) || Dd(e);

function ef(e, t) {
  if (Yp(e) || Yp(t)) throw Up(Hp.INVALID_VALUE);
  for (const n in e) jd(e, n) && (Yp(e[n]) || Yp(t[n]) ? t[n] = e[n] : ef(e[n], t[n]))
}

function tf(e) {
  return dl(Ko, null, e, 0)
}
let nf = 0;

function of(e) {
  return (t, n, o, l) => e(n, o, xl() || void 0, l)
}

function lf(e = {}, t) {
  const {
    __root: n
  } = e, o = void 0 === n;
  let l = !Wd(e.inheritLocale) || e.inheritLocale;
  const a = bt(n && l ? n.locale.value : Ud(e.locale) ? e.locale : hp),
    r = bt(n && l ? n.fallbackLocale.value : Ud(e.fallbackLocale) || Dd(e.fallbackLocale) || Xd(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : a.value),
    i = bt(Zp(a.value, e)),
    s = bt(Xd(e.datetimeFormats) ? e.datetimeFormats : {
      [a.value]: {}
    }),
    u = bt(Xd(e.numberFormats) ? e.numberFormats : {
      [a.value]: {}
    });
  let c = n ? n.missingWarn : !Wd(e.missingWarn) && !zd(e.missingWarn) || e.missingWarn,
    d = n ? n.fallbackWarn : !Wd(e.fallbackWarn) && !zd(e.fallbackWarn) || e.fallbackWarn,
    p = n ? n.fallbackRoot : !Wd(e.fallbackRoot) || e.fallbackRoot,
    f = !!e.fallbackFormat,
    v = Hd(e.missing) ? e.missing : null,
    m = Hd(e.missing) ? of(e.missing) : null,
    h = Hd(e.postTranslation) ? e.postTranslation : null,
    g = n ? n.warnHtmlMessage : !Wd(e.warnHtmlMessage) || e.warnHtmlMessage,
    y = !!e.escapeParameter;
  const b = n ? n.modifiers : Xd(e.modifiers) ? e.modifiers : {};
  let _, w = e.pluralRules || n && n.pluralRules;
  _ = (() => {
    const t = {
      version: "9.2.2",
      locale: a.value,
      fallbackLocale: r.value,
      messages: i.value,
      modifiers: b,
      pluralRules: w,
      missing: null === m ? void 0 : m,
      missingWarn: c,
      fallbackWarn: d,
      fallbackFormat: f,
      unresolving: !0,
      postTranslation: null === h ? void 0 : h,
      warnHtmlMessage: g,
      escapeParameter: y,
      messageResolver: e.messageResolver,
      __meta: {
        framework: "vue"
      }
    };
    t.datetimeFormats = s.value, t.numberFormats = u.value, t.__datetimeFormatters = Xd(_) ? _.__datetimeFormatters : void 0, t.__numberFormatters = Xd(_) ? _.__numberFormatters : void 0;
    return wp(t)
  })(), xp(_, a.value, r.value);
  const k = Rl({
      get: () => a.value,
      set: e => {
        a.value = e, _.locale = a.value
      }
    }),
    x = Rl({
      get: () => r.value,
      set: e => {
        r.value = e, _.fallbackLocale = r.value, xp(_, a.value, e)
      }
    }),
    S = Rl((() => i.value)),
    C = Rl((() => s.value)),
    E = Rl((() => u.value));
  const A = (e, t, o, l, c, d) => {
    let f;
    if (a.value, r.value, i.value, s.value, u.value, f = e(_), Fd(f) && -1 === f) {
      const [e, o] = t();
      return n && p ? l(n) : c(e)
    }
    if (d(f)) return f;
    throw Up(Hp.UNEXPECTED_RETURN_TYPE)
  };

  function L(...e) {
    return A((t => Reflect.apply(Op, null, [t, ...e])), (() => Vp(...e)), 0, (t => Reflect.apply(t.t, t, [...e])), (e => e), (e => Ud(e)))
  }
  const T = {
    normalize: function(e) {
      return e.map((e => Ud(e) || Fd(e) || Wd(e) ? tf(String(e)) : e))
    },
    interpolate: e => e,
    type: "vnode"
  };

  function O(e) {
    return i.value[e] || {}
  }
  nf++, n && Rd && (gn(n.locale, (e => {
    l && (a.value = e, _.locale = e, xp(_, a.value, r.value))
  })), gn(n.fallbackLocale, (e => {
    l && (r.value = e, _.fallbackLocale = e, xp(_, a.value, r.value))
  })));
  const R = {
    id: nf,
    locale: k,
    fallbackLocale: x,
    get inheritLocale() {
      return l
    },
    set inheritLocale(e) {
      l = e, e && n && (a.value = n.locale.value, r.value = n.fallbackLocale.value, xp(_, a.value, r.value))
    },
    get availableLocales() {
      return Object.keys(i.value).sort()
    },
    messages: S,
    get modifiers() {
      return b
    },
    get pluralRules() {
      return w || {}
    },
    get isGlobal() {
      return o
    },
    get missingWarn() {
      return c
    },
    set missingWarn(e) {
      c = e, _.missingWarn = c
    },
    get fallbackWarn() {
      return d
    },
    set fallbackWarn(e) {
      d = e, _.fallbackWarn = d
    },
    get fallbackRoot() {
      return p
    },
    set fallbackRoot(e) {
      p = e
    },
    get fallbackFormat() {
      return f
    },
    set fallbackFormat(e) {
      f = e, _.fallbackFormat = f
    },
    get warnHtmlMessage() {
      return g
    },
    set warnHtmlMessage(e) {
      g = e, _.warnHtmlMessage = e
    },
    get escapeParameter() {
      return y
    },
    set escapeParameter(e) {
      y = e, _.escapeParameter = e
    },
    t: L,
    getLocaleMessage: O,
    setLocaleMessage: function(e, t) {
      i.value[e] = t, _.messages = i.value
    },
    mergeLocaleMessage: function(e, t) {
      i.value[e] = i.value[e] || {}, ef(t, i.value[e]), _.messages = i.value
    },
    getPostTranslationHandler: function() {
      return Hd(h) ? h : null
    },
    setPostTranslationHandler: function(e) {
      h = e, _.postTranslation = e
    },
    getMissingHandler: function() {
      return v
    },
    setMissingHandler: function(e) {
      null !== e && (m = of(e)), v = e, _.missing = m
    },
    [Gp]: function(e) {
      w = e, _.pluralRules = w
    }
  };
  return R.datetimeFormats = C, R.numberFormats = E, R.rt = function(...e) {
    const [t, n, o] = e;
    if (o && !Kd(o)) throw Up(Hp.INVALID_ARGUMENT);
    return L(t, n, Id({
      resolvedMessage: !0
    }, o || {}))
  }, R.te = function(e, t) {
    const n = O(Ud(t) ? t : a.value);
    return null !== _.messageResolver(n, e)
  }, R.tm = function(e) {
    const t = function(e) {
      let t = null;
      const n = pp(_, r.value, a.value);
      for (let o = 0; o < n.length; o++) {
        const l = i.value[n[o]] || {},
          a = _.messageResolver(l, e);
        if (null != a) {
          t = a;
          break
        }
      }
      return t
    }(e);
    return null != t ? t : n && n.tm(e) || {}
  }, R.d = function(...e) {
    return A((t => Reflect.apply(Mp, null, [t, ...e])), (() => zp(...e)), 0, (t => Reflect.apply(t.d, t, [...e])), (() => ""), (e => Ud(e)))
  }, R.n = function(...e) {
    return A((t => Reflect.apply(Bp, null, [t, ...e])), (() => Np(...e)), 0, (t => Reflect.apply(t.n, t, [...e])), (() => ""), (e => Ud(e)))
  }, R.getDateTimeFormat = function(e) {
    return s.value[e] || {}
  }, R.setDateTimeFormat = function(e, t) {
    s.value[e] = t, _.datetimeFormats = s.value, Pp(_, e, t)
  }, R.mergeDateTimeFormat = function(e, t) {
    s.value[e] = Id(s.value[e] || {}, t), _.datetimeFormats = s.value, Pp(_, e, t)
  }, R.getNumberFormat = function(e) {
    return u.value[e] || {}
  }, R.setNumberFormat = function(e, t) {
    u.value[e] = t, _.numberFormats = u.value, $p(_, e, t)
  }, R.mergeNumberFormat = function(e, t) {
    u.value[e] = Id(u.value[e] || {}, t), _.numberFormats = u.value, $p(_, e, t)
  }, R[Xp] = e.__injectWithOption, R[Wp] = function(...e) {
    return A((t => {
      let n;
      const o = t;
      try {
        o.processor = T, n = Reflect.apply(Op, null, [o, ...e])
      } finally {
        o.processor = null
      }
      return n
    }), (() => Vp(...e)), 0, (t => t[Wp](...e)), (e => [tf(e)]), (e => Dd(e)))
  }, R[Kp] = function(...e) {
    return A((t => Reflect.apply(Mp, null, [t, ...e])), (() => zp(...e)), 0, (t => t[Kp](...e)), (() => []), (e => Ud(e) || Dd(e)))
  }, R[Qp] = function(...e) {
    return A((t => Reflect.apply(Bp, null, [t, ...e])), (() => Np(...e)), 0, (t => t[Qp](...e)), (() => []), (e => Ud(e) || Dd(e)))
  }, R
}
const af = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: e => "parent" === e || "global" === e,
    default: "parent"
  },
  i18n: {
    type: Object
  }
};

function rf(e) {
  return Wo
}
const sf = {
  name: "i18n-t",
  props: Id({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      validator: e => Fd(e) || !isNaN(e)
    }
  }, af),
  setup(e, t) {
    const {
      slots: n,
      attrs: o
    } = t, l = e.i18n || gf({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const a = Object.keys(n).filter((e => "_" !== e)),
        r = {};
      e.locale && (r.locale = e.locale), void 0 !== e.plural && (r.plural = Ud(e.plural) ? +e.plural : e.plural);
      const i = function({
          slots: e
        }, t) {
          if (1 === t.length && "default" === t[0]) return (e.default ? e.default() : []).reduce(((e, t) => [...e, ...Dd(t.children) ? t.children : [t]]), []);
          return t.reduce(((t, n) => {
            const o = e[n];
            return o && (t[n] = o()), t
          }), {})
        }(t, a),
        s = l[Wp](e.keypath, i, r),
        u = Id({}, o);
      return ql(Ud(e.tag) || Kd(e.tag) ? e.tag : rf(), u, s)
    }
  }
};

function uf(e, t, n, o) {
  const {
    slots: l,
    attrs: a
  } = t;
  return () => {
    const t = {
      part: !0
    };
    let r = {};
    e.locale && (t.locale = e.locale), Ud(e.format) ? t.key = e.format : Kd(e.format) && (Ud(e.format.key) && (t.key = e.format.key), r = Object.keys(e.format).reduce(((t, o) => n.includes(o) ? Id({}, t, {
      [o]: e.format[o]
    }) : t), {}));
    const i = o(e.value, t, r);
    let s = [t.key];
    Dd(i) ? s = i.map(((e, t) => {
      const n = l[e.type],
        o = n ? n({
          [e.type]: e.value,
          index: t,
          parts: i
        }) : [e.value];
      var a;
      return Dd(a = o) && !Ud(a[0]) && (o[0].key = `${e.type}-${t}`), o
    })) : Ud(i) && (s = [i]);
    const u = Id({}, a);
    return ql(Ud(e.tag) || Kd(e.tag) ? e.tag : rf(), u, s)
  }
}
const cf = {
    name: "i18n-n",
    props: Id({
      value: {
        type: Number,
        required: !0
      },
      format: {
        type: [String, Object]
      }
    }, af),
    setup(e, t) {
      const n = e.i18n || gf({
        useScope: "parent",
        __useComponent: !0
      });
      return uf(e, t, Ip, ((...e) => n[Qp](...e)))
    }
  },
  df = {
    name: "i18n-d",
    props: Id({
      value: {
        type: [Number, Date],
        required: !0
      },
      format: {
        type: [String, Object]
      }
    }, af),
    setup(e, t) {
      const n = e.i18n || gf({
        useScope: "parent",
        __useComponent: !0
      });
      return uf(e, t, Fp, ((...e) => n[Kp](...e)))
    }
  };

function pf(e) {
  if (Ud(e)) return {
    path: e
  };
  if (Xd(e)) {
    if (!("path" in e)) throw Up(Hp.REQUIRED_VALUE);
    return e
  }
  throw Up(Hp.INVALID_VALUE)
}

function ff(e) {
  const {
    path: t,
    locale: n,
    args: o,
    choice: l,
    plural: a
  } = e, r = {}, i = o || {};
  return Ud(n) && (r.locale = n), Fd(l) && (r.plural = l), Fd(a) && (r.plural = a), [t, i, r]
}

function vf(e, t, ...n) {
  const o = Xd(n[0]) ? n[0] : {},
    l = !!o.useI18nComponentName;
  (!Wd(o.globalInstall) || o.globalInstall) && (e.component(l ? "i18n" : sf.name, sf), e.component(cf.name, cf), e.component(df.name, df)), e.directive("t", function(e) {
    const t = t => {
      const {
        instance: n,
        modifiers: o,
        value: l
      } = t;
      if (!n || !n.$) throw Up(Hp.UNEXPECTED_ERROR);
      const a = function(e, t) {
          const n = e;
          if ("composition" === e.mode) return n.__getInstance(t) || e.global;
          {
            const o = n.__getInstance(t);
            return null != o ? o.__composer : e.global.__composer
          }
        }(e, n.$),
        r = pf(l);
      return [Reflect.apply(a.t, a, [...ff(r)]), a]
    };
    return {
      created: (n, o) => {
        const [l, a] = t(o);
        Rd && e.global === a && (n.__i18nWatcher = gn(a.locale, (() => {
          o.instance && o.instance.$forceUpdate()
        }))), n.__composer = a, n.textContent = l
      },
      unmounted: e => {
        Rd && e.__i18nWatcher && (e.__i18nWatcher(), e.__i18nWatcher = void 0, delete e.__i18nWatcher), e.__composer && (e.__composer = void 0, delete e.__composer)
      },
      beforeUpdate: (e, {
        value: t
      }) => {
        if (e.__composer) {
          const n = e.__composer,
            o = pf(t);
          e.textContent = Reflect.apply(n.t, n, [...ff(o)])
        }
      },
      getSSRProps: e => {
        const [n] = t(e);
        return {
          textContent: n
        }
      }
    }
  }(t))
}
const mf = Vd("global-vue-i18n");

function hf(e = {}, t) {
  const n = !Wd(e.globalInjection) || e.globalInjection,
    o = new Map,
    [l, a] = function(e, t, n) {
      const o = ee();
      {
        const t = o.run((() => lf(e)));
        if (null == t) throw Up(Hp.UNEXPECTED_ERROR);
        return [o, t]
      }
    }(e),
    r = Vd("");
  {
    const e = {
      get mode() {
        return "composition"
      },
      get allowComposition() {
        return true
      },
      async install(t, ...o) {
        t.__VUE_I18N_SYMBOL__ = r, t.provide(t.__VUE_I18N_SYMBOL__, e), n && function(e, t) {
          const n = Object.create(null);
          yf.forEach((e => {
            const o = Object.getOwnPropertyDescriptor(t, e);
            if (!o) throw Up(Hp.UNEXPECTED_ERROR);
            const l = yt(o.value) ? {
              get: () => o.value.value,
              set(e) {
                o.value.value = e
              }
            } : {
              get: () => o.get && o.get()
            };
            Object.defineProperty(n, e, l)
          })), e.config.globalProperties.$i18n = n, bf.forEach((n => {
            const o = Object.getOwnPropertyDescriptor(t, n);
            if (!o || !o.value) throw Up(Hp.UNEXPECTED_ERROR);
            Object.defineProperty(e.config.globalProperties, `$${n}`, o)
          }))
        }(t, e.global), vf(t, e, ...o);
        const l = t.unmount;
        t.unmount = () => {
          e.dispose(), l()
        }
      },
      get global() {
        return a
      },
      dispose() {
        l.stop()
      },
      __instances: o,
      __getInstance: function(e) {
        return o.get(e) || null
      },
      __setInstance: function(e, t) {
        o.set(e, t)
      },
      __deleteInstance: function(e) {
        o.delete(e)
      }
    };
    return e
  }
}

function gf(e = {}) {
  const t = xl();
  if (null == t) throw Up(Hp.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && null != t.appContext.app && !t.appContext.app.__VUE_I18N_SYMBOL__) throw Up(Hp.NOT_INSLALLED);
  const n = function(e) {
      {
        const t = mn(e.isCE ? mf : e.appContext.app.__VUE_I18N_SYMBOL__);
        if (!t) throw Up(e.isCE ? Hp.NOT_INSLALLED_WITH_PROVIDE : Hp.UNEXPECTED_ERROR);
        return t
      }
    }(t),
    o = function(e) {
      return "composition" === e.mode ? e.global : e.global.__composer
    }(n),
    l = function(e) {
      return e.type
    }(t),
    a = function(e, t) {
      return Pd(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local"
    }(e, l);
  if ("global" === a) return function(e, t, n) {
    let o = Kd(t.messages) ? t.messages : {};
    "__i18nGlobal" in n && (o = Zp(e.locale.value, {
      messages: o,
      __i18n: n.__i18nGlobal
    }));
    const l = Object.keys(o);
    if (l.length && l.forEach((t => {
        e.mergeLocaleMessage(t, o[t])
      })), Kd(t.datetimeFormats)) {
      const n = Object.keys(t.datetimeFormats);
      n.length && n.forEach((n => {
        e.mergeDateTimeFormat(n, t.datetimeFormats[n])
      }))
    }
    if (Kd(t.numberFormats)) {
      const n = Object.keys(t.numberFormats);
      n.length && n.forEach((n => {
        e.mergeNumberFormat(n, t.numberFormats[n])
      }))
    }
  }(o, e, l), o;
  if ("parent" === a) {
    let l = function(e, t, n = !1) {
      let o = null;
      const l = t.root;
      let a = t.parent;
      for (; null != a;) {
        const t = e;
        if ("composition" === e.mode && (o = t.__getInstance(a)), null != o) break;
        if (l === a) break;
        a = a.parent
      }
      return o
    }(n, t, e.__useComponent);
    return null == l && (l = o), l
  }
  const r = n;
  let i = r.__getInstance(t);
  if (null == i) {
    const n = Id({}, e);
    "__i18n" in l && (n.__i18n = l.__i18n), o && (n.__root = o), i = lf(n),
      function(e, t, n) {
        Nn((() => {}), t), Hn((() => {
          e.__deleteInstance(t)
        }), t)
      }(r, t), r.__setInstance(t, i)
  }
  return i
}
const yf = ["locale", "fallbackLocale", "availableLocales"],
  bf = ["t", "rt", "d", "n", "tm"];
yp = function(e, t) {
  if (!Kd(e)) return null;
  let n = op.get(t);
  if (n || (n = function(e) {
      const t = [];
      let n, o, l, a, r, i, s, u = -1,
        c = 0,
        d = 0;
      const p = [];

      function f() {
        const t = e[u + 1];
        if (5 === c && "'" === t || 6 === c && '"' === t) return u++, l = "\\" + t, p[0](), !0
      }
      for (p[0] = () => {
          void 0 === o ? o = l : o += l
        }, p[1] = () => {
          void 0 !== o && (t.push(o), o = void 0)
        }, p[2] = () => {
          p[0](), d++
        }, p[3] = () => {
          if (d > 0) d--, c = 4, p[0]();
          else {
            if (d = 0, void 0 === o) return !1;
            if (o = np(o), !1 === o) return !1;
            p[1]()
          }
        }; null !== c;)
        if (u++, n = e[u], "\\" !== n || !f()) {
          if (a = tp(n), s = Yd[c], r = s[a] || s.l || 8, 8 === r) return;
          if (c = r[0], void 0 !== r[1] && (i = p[r[1]], i && (l = n, !1 === i()))) return;
          if (7 === c) return t
        }
    }(t), n && op.set(t, n)), !n) return null;
  const o = n.length;
  let l = e,
    a = 0;
  for (; a < o;) {
    const e = l[n[a]];
    if (void 0 === e) return null;
    l = e, a++
  }
  return l
}, bp = pp;
var _f = {
  "en-US": {
    balance: e => {
      const {
        normalize: t
      } = e;
      return t(["Balance"])
    },
    apiKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Api Key"])
    },
    getKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Get a key"])
    },
    inputKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Please input your API key"])
    },
    addFounds: e => {
      const {
        normalize: t
      } = e;
      return t(["Add Funds"])
    },
    enabled: e => {
      const {
        normalize: t
      } = e;
      return t(["Enabled / Solve automatically"])
    },
    setting: e => {
      const {
        normalize: t
      } = e;
      return t(["Settings"])
    },
    proxy: e => {
      const {
        normalize: t
      } = e;
      return t(["Proxy"])
    },
    proxyType: e => {
      const {
        normalize: t
      } = e;
      return t(["Proxy Type"])
    },
    port: e => {
      const {
        normalize: t
      } = e;
      return t(["Port"])
    },
    login: e => {
      const {
        normalize: t
      } = e;
      return t(["Login"])
    },
    password: e => {
      const {
        normalize: t
      } = e;
      return t(["Password"])
    },
    loginName: e => {
      const {
        normalize: t
      } = e;
      return t(["Password Name"])
    },
    blackControl: e => {
      const {
        normalize: t
      } = e;
      return t(["Blacklist control"])
    },
    blackTip: e => {
      const {
        normalize: t
      } = e;
      return t(["Captcha solving on added websites will be disabled"])
    },
    add: e => {
      const {
        normalize: t
      } = e;
      return t(["Add"])
    },
    guide: e => {
      const {
        normalize: t
      } = e;
      return t(["Guide"])
    },
    close: e => {
      const {
        normalize: t
      } = e;
      return t(["Close"])
    },
    delay: e => {
      const {
        normalize: t
      } = e;
      return t(["Delay between start solve captcha(ms):"])
    },
    repeat: e => {
      const {
        normalize: t
      } = e;
      return t(["Repeat captcha solving in case of an error:"])
    },
    copySuccess: e => {
      const {
        normalize: t
      } = e;
      return t(["Copy Succeed!"])
    },
    manualSolving: e => {
      const {
        normalize: t
      } = e;
      return t(["Manual Solving"])
    },
    solvedCallback: e => {
      const {
        normalize: t
      } = e;
      return t(["Solved Callback"])
    },
    solvedCallbackPlaceholder: e => {
      const {
        normalize: t
      } = e;
      return t(["Solved success callback"])
    }
  },
  "zh-CN": {
    balance: e => {
      const {
        normalize: t
      } = e;
      return t(["余额"])
    },
    apiKey: e => {
      const {
        normalize: t
      } = e;
      return t(["API密钥"])
    },
    getKey: e => {
      const {
        normalize: t
      } = e;
      return t(["获取Key"])
    },
    inputKey: e => {
      const {
        normalize: t
      } = e;
      return t(["请输入您的API密钥"])
    },
    addFounds: e => {
      const {
        normalize: t
      } = e;
      return t(["添加资金"])
    },
    enabled: e => {
      const {
        normalize: t
      } = e;
      return t(["启用 / 自动解决"])
    },
    setting: e => {
      const {
        normalize: t
      } = e;
      return t(["设置"])
    },
    proxy: e => {
      const {
        normalize: t
      } = e;
      return t(["代理"])
    },
    proxyType: e => {
      const {
        normalize: t
      } = e;
      return t(["代理类型"])
    },
    port: e => {
      const {
        normalize: t
      } = e;
      return t(["端口"])
    },
    login: e => {
      const {
        normalize: t
      } = e;
      return t(["账号"])
    },
    password: e => {
      const {
        normalize: t
      } = e;
      return t(["密码"])
    },
    loginName: e => {
      const {
        normalize: t
      } = e;
      return t(["账号名称"])
    },
    blackControl: e => {
      const {
        normalize: t
      } = e;
      return t(["黑名单控制"])
    },
    blackTip: e => {
      const {
        normalize: t
      } = e;
      return t(["CapSolver将在添加的网站中被禁用"])
    },
    add: e => {
      const {
        normalize: t
      } = e;
      return t(["添加"])
    },
    guide: e => {
      const {
        normalize: t
      } = e;
      return t(["指南"])
    },
    close: e => {
      const {
        normalize: t
      } = e;
      return t(["关闭"])
    },
    delay: e => {
      const {
        normalize: t
      } = e;
      return t(["开始解决验证码的延迟时间（ms）："])
    },
    repeat: e => {
      const {
        normalize: t
      } = e;
      return t(["验证失败重试次数："])
    },
    copySuccess: e => {
      const {
        normalize: t
      } = e;
      return t(["复制成功！"])
    },
    manualSolving: e => {
      const {
        normalize: t
      } = e;
      return t(["手动触发"])
    },
    solvedCallback: e => {
      const {
        normalize: t
      } = e;
      return t(["回调名称"])
    },
    solvedCallbackPlaceholder: e => {
      const {
        normalize: t
      } = e;
      return t(["成功回调函数名"])
    }
  },
  es: {
    balance: e => {
      const {
        normalize: t
      } = e;
      return t(["Saldo"])
    },
    apiKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Clave API"])
    },
    getKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Obtener una clave"])
    },
    inputKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Por favor ingrese su clave API"])
    },
    addFounds: e => {
      const {
        normalize: t
      } = e;
      return t(["Agregar fondos"])
    },
    enabled: e => {
      const {
        normalize: t
      } = e;
      return t(["Habilitado / Resolver automáticamente"])
    },
    setting: e => {
      const {
        normalize: t
      } = e;
      return t(["Configuración"])
    },
    proxy: e => {
      const {
        normalize: t
      } = e;
      return t(["Proxy"])
    },
    proxyType: e => {
      const {
        normalize: t
      } = e;
      return t(["Tipo de proxy"])
    },
    port: e => {
      const {
        normalize: t
      } = e;
      return t(["Puerto"])
    },
    login: e => {
      const {
        normalize: t
      } = e;
      return t(["Iniciar sesión"])
    },
    password: e => {
      const {
        normalize: t
      } = e;
      return t(["Contraseña"])
    },
    loginName: e => {
      const {
        normalize: t
      } = e;
      return t(["Nombre de usuario"])
    },
    blackControl: e => {
      const {
        normalize: t
      } = e;
      return t(["Control de lista negra"])
    },
    blackTip: e => {
      const {
        normalize: t
      } = e;
      return t(["Se desactivará la resolución de captchas en los sitios web agregados"])
    },
    add: e => {
      const {
        normalize: t
      } = e;
      return t(["Agregar"])
    },
    guide: e => {
      const {
        normalize: t
      } = e;
      return t(["Guía"])
    },
    close: e => {
      const {
        normalize: t
      } = e;
      return t(["Cerrar"])
    },
    delay: e => {
      const {
        normalize: t
      } = e;
      return t(["Retraso entre el inicio de la resolución del captcha(ms):"])
    },
    repeat: e => {
      const {
        normalize: t
      } = e;
      return t(["Repetir la resolución del captcha en caso de un error:"])
    },
    copySuccess: e => {
      const {
        normalize: t
      } = e;
      return t(["Replicar el éxito!"])
    },
    manualSolving: e => {
      const {
        normalize: t
      } = e;
      return t(["Solución manual"])
    },
    solvedCallback: e => {
      const {
        normalize: t
      } = e;
      return t(["Llamar de vuelta"])
    },
    solvedCallbackPlaceholder: e => {
      const {
        normalize: t
      } = e;
      return t(["Llamar de vuelta"])
    }
  },
  ru: {
    balance: e => {
      const {
        normalize: t
      } = e;
      return t(["Баланс"])
    },
    apiKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Ключ API"])
    },
    getKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Получить ключ"])
    },
    inputKey: e => {
      const {
        normalize: t
      } = e;
      return t(["Пожалуйста"])
    },
    addFounds: e => {
      const {
        normalize: t
      } = e;
      return t(["Добавить средства"])
    },
    enabled: e => {
      const {
        normalize: t
      } = e;
      return t(["Включено / Автоматически решать"])
    },
    setting: e => {
      const {
        normalize: t
      } = e;
      return t(["Настройки"])
    },
    proxy: e => {
      const {
        normalize: t
      } = e;
      return t(["Прокси"])
    },
    proxyType: e => {
      const {
        normalize: t
      } = e;
      return t(["Тип прокси"])
    },
    port: e => {
      const {
        normalize: t
      } = e;
      return t(["Порт"])
    },
    login: e => {
      const {
        normalize: t
      } = e;
      return t(["Войти"])
    },
    password: e => {
      const {
        normalize: t
      } = e;
      return t(["Пароль"])
    },
    loginName: e => {
      const {
        normalize: t
      } = e;
      return t(["Имя пользователя"])
    },
    blackControl: e => {
      const {
        normalize: t
      } = e;
      return t(["Управление черным списком"])
    },
    blackTip: e => {
      const {
        normalize: t
      } = e;
      return t(["Решение капчи на добавленных сайтах будет отключено"])
    },
    add: e => {
      const {
        normalize: t
      } = e;
      return t(["Добавить"])
    },
    guide: e => {
      const {
        normalize: t
      } = e;
      return t(["Руководство"])
    },
    close: e => {
      const {
        normalize: t
      } = e;
      return t(["Закрыть"])
    },
    delay: e => {
      const {
        normalize: t
      } = e;
      return t(["Задержка между началом решения капчи (мс):"])
    },
    repeat: e => {
      const {
        normalize: t
      } = e;
      return t(["Repetir la resolución del captcha en caso de un error:"])
    },
    copySuccess: e => {
      const {
        normalize: t
      } = e;
      return t(["Копировать успешно!"])
    },
    manualSolving: e => {
      const {
        normalize: t
      } = e;
      return t(["Вручную"])
    },
    solvedCallback: e => {
      const {
        normalize: t
      } = e;
      return t(["Перезвонить"])
    },
    solvedCallbackPlaceholder: e => {
      const {
        normalize: t
      } = e;
      return t(["Перезвонить"])
    }
  }
};
const wf = [{
  value: "en-US",
  label: "English",
  flag: "us"
}, {
  value: "zh-CN",
  label: "简体中文",
  flag: "cn"
}, {
  value: "es",
  label: "España",
  flag: "es"
}, {
  value: "ru",
  label: "Россия",
  flag: "ru"
}];
let kf;

function xf(e) {
  wf.some((t => t.value === e)) && chrome.storage.local.set({
    i18n: {
      locale: e
    }
  })
}
var Sf = async ({
  app: e
}) => {
  var t, n;
  const o = await chrome.storage.local.get("i18n"),
    l = (a = null == (t = null == o ? void 0 : o.i18n) ? void 0 : t.locale, kf = hf({
      locale: null != a ? a : "en-US",
      legacy: !1,
      messages: {
        "en-US": _f["en-US"],
        "zh-CN": _f["zh-CN"],
        es: _f.es,
        ru: _f.ru
      }
    }), kf);
  var a;
  document.documentElement.setAttribute("lang", null == (n = null == o ? void 0 : o.i18n) ? void 0 : n.locale), e.use(l)
}, Cf = Object.freeze(Object.defineProperty({
  __proto__: null,
  cacheLang: xf,
  default: Sf
}, Symbol.toStringTag, {
  value: "Module"
}));
const Ef = ["src"],
  Af = ["src"];
var Lf = qr(On({
  __name: "I18nTrigger",
  setup(e) {
    const {
      locale: t
    } = gf(), n = bt("en-US"), o = [{
      value: "en-US",
      label: "English",
      icon: "assets/en-US.553867d3.svg"
    }, {
      value: "zh-CN",
      label: "简体中文",
      icon: "assets/zh-CN.c1f22841.svg"
    }, {
      value: "es",
      label: "España",
      icon: "assets/es.6fe80291.svg"
    }, {
      value: "ru",
      label: "Россия",
      icon: "assets/ru.6c62f886.svg"
    }];

    function l() {
      t.value = n.value, xf(n.value)
    }
    const a = Rl((() => o.find((e => e.value === n.value)).icon));
    return Nn((async () => {
      var e;
      const t = await chrome.storage.local.get("i18n");
      n.value = (null == (e = null == t ? void 0 : t.i18n) ? void 0 : e.locale) || "en-US"
    })), (e, t) => (Zo(), ll(Od, {
      outlined: "",
      modelValue: n.value,
      "onUpdate:modelValue": [t[0] || (t[0] = e => n.value = e), l],
      options: o,
      "option-value": "value",
      "emit-value": "",
      "map-options": ""
    }, {
      prepend: nn((() => [cl("img", {
        src: kt(a),
        alt: ""
      }, null, 8, Ef)])),
      option: nn((e => [dl(Vu, yl({
        class: "cap-option"
      }, e.itemProps), {
        default: nn((() => [dl(ku, null, {
          default: nn((() => [cl("img", {
            src: e.opt.icon,
            alt: ""
          }, null, 8, Af)])),
          _: 2
        }, 1024), dl(ku, null, {
          default: nn((() => [dl(xu, null, {
            default: nn((() => [fl(v(e.opt.label), 1)])),
            _: 2
          }, 1024)])),
          _: 2
        }, 1024)])),
        _: 2
      }, 1040)])),
      _: 1
    }, 8, ["modelValue"]))
  }
}), [
  ["__scopeId", "data-v-9303f99a"]
]);
const Tf = {
    class: "header-box"
  },
  Of = ["src"];
var Rf = qr(On({
  __name: "Header",
  setup(e) {
    const t = bt({});
    async function n() {
      await wu.set(pt(t.value))
    }
    return Nn((async () => {
      const e = await wu.getAll();
      t.value = e
    })), (e, o) => (Zo(), ol("div", Tf, [dl(mu, {
      class: "toolbar"
    }, {
      default: nn((() => [cl("img", {
        src: kt("assets/logo-text.e47c19eb.svg"),
        alt: ""
      }, null, 8, Of), dl($s), dl(Lf), dl(vu, {
        modelValue: t.value.useCapsolver,
        "onUpdate:modelValue": [o[0] || (o[0] = e => t.value.useCapsolver = e), n],
        size: "36px"
      }, null, 8, ["modelValue"])])),
      _: 1
    })]))
  }
}), [
  ["__scopeId", "data-v-0b05d9d3"]
]);
var qf = qr(On({
  __name: "PopupLayout",
  setup: e => (e, t) => {
    const n = Jn("router-view");
    return Zo(), ll(Is, {
      view: "hhh Lpr fff",
      class: "popup-layout"
    }, {
      default: nn((() => [dl(Ss, {
        class: "bg-white"
      }, {
        default: nn((() => [dl(Rf)])),
        _: 1
      }), dl(Es, null, {
        default: nn((() => [dl(Cs, null, {
          default: nn((() => [dl(n)])),
          _: 1
        })])),
        _: 1
      })])),
      _: 1
    })
  }
}), [
  ["__scopeId", "data-v-77b8ca20"]
]);
const Vf = {
    date: "####/##/##",
    datetime: "####/##/## ##:##",
    time: "##:##",
    fulltime: "##:##:##",
    phone: "(###) ### - ####",
    card: "#### #### #### ####"
  },
  Mf = {
    "#": {
      pattern: "[\\d]",
      negate: "[^\\d]"
    },
    S: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]"
    },
    N: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]"
    },
    A: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]",
      transform: e => e.toLocaleUpperCase()
    },
    a: {
      pattern: "[a-zA-Z]",
      negate: "[^a-zA-Z]",
      transform: e => e.toLocaleLowerCase()
    },
    X: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]",
      transform: e => e.toLocaleUpperCase()
    },
    x: {
      pattern: "[0-9a-zA-Z]",
      negate: "[^0-9a-zA-Z]",
      transform: e => e.toLocaleLowerCase()
    }
  },
  Ff = Object.keys(Mf);
Ff.forEach((e => {
  Mf[e].regex = new RegExp(Mf[e].pattern)
}));
const zf = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + Ff.join("") + "])|(.)", "g"),
  Pf = /[.*+?^${}()|[\]\\]/g,
  Bf = String.fromCharCode(1),
  If = {
    mask: String,
    reverseFillMask: Boolean,
    fillMask: [Boolean, String],
    unmaskedValue: Boolean
  };

function Nf(e, t, n, o) {
  let l, a, r, i;
  const s = bt(null),
    u = bt(function() {
      if (d(), !0 === s.value) {
        const t = v(m(e.modelValue));
        return !1 !== e.fillMask ? h(t) : t
      }
      return e.modelValue
    }());

  function c(e) {
    if (e < l.length) return l.slice(-e);
    let t = "",
      n = l;
    const o = n.indexOf(Bf);
    if (o > -1) {
      for (let o = e - n.length; o > 0; o--) t += Bf;
      n = n.slice(0, o) + t + n.slice(o)
    }
    return n
  }

  function d() {
    if (s.value = void 0 !== e.mask && e.mask.length > 0 && (!0 === e.autogrow || ["textarea", "text", "search", "url", "tel", "password"].includes(e.type)), !1 === s.value) return i = void 0, l = "", void(a = "");
    const t = void 0 === Vf[e.mask] ? e.mask : Vf[e.mask],
      n = "string" == typeof e.fillMask && e.fillMask.length > 0 ? e.fillMask.slice(0, 1) : "_",
      o = n.replace(Pf, "\\$&"),
      u = [],
      c = [],
      d = [];
    let p = !0 === e.reverseFillMask,
      f = "",
      v = "";
    t.replace(zf, ((e, t, n, o, l) => {
      if (void 0 !== o) {
        const e = Mf[o];
        d.push(e), v = e.negate, !0 === p && (c.push("(?:" + v + "+)?(" + e.pattern + "+)?(?:" + v + "+)?(" + e.pattern + "+)?"), p = !1), c.push("(?:" + v + "+)?(" + e.pattern + ")?")
      } else if (void 0 !== n) f = "\\" + ("\\" === n ? "" : n), d.push(n), u.push("([^" + f + "]+)?" + f + "?");
      else {
        const e = void 0 !== t ? t : l;
        f = "\\" === e ? "\\\\\\\\" : e.replace(Pf, "\\\\$&"), d.push(e), u.push("([^" + f + "]+)?" + f + "?")
      }
    }));
    const m = new RegExp("^" + u.join("") + "(" + ("" === f ? "." : "[^" + f + "]") + "+)?" + ("" === f ? "" : "[" + f + "]*") + "$"),
      h = c.length - 1,
      g = c.map(((t, n) => 0 === n && !0 === e.reverseFillMask ? new RegExp("^" + o + "*" + t) : n === h ? new RegExp("^" + t + "(" + ("" === v ? "." : v) + "+)?" + (!0 === e.reverseFillMask ? "$" : o + "*")) : new RegExp("^" + t)));
    r = d, i = t => {
      const n = m.exec(!0 === e.reverseFillMask ? t : t.slice(0, d.length));
      null !== n && (t = n.slice(1).join(""));
      const o = [],
        l = g.length;
      for (let e = 0, a = t; e < l; e++) {
        const t = g[e].exec(a);
        if (null === t) break;
        a = a.slice(t.shift().length), o.push(...t)
      }
      return o.length > 0 ? o.join("") : t
    }, l = d.map((e => "string" == typeof e ? e : Bf)).join(""), a = l.split(Bf).join(n)
  }

  function p(t, r, i) {
    const s = o.value,
      c = s.selectionEnd,
      p = s.value.length - c,
      g = m(t);
    !0 === r && d();
    const y = v(g),
      b = !1 !== e.fillMask ? h(y) : y,
      _ = u.value !== b;
    s.value !== b && (s.value = b), !0 === _ && (u.value = b), document.activeElement === s && It((() => {
      if (b !== a)
        if ("insertFromPaste" !== i || !0 === e.reverseFillMask)
          if (["deleteContentBackward", "deleteContentForward"].indexOf(i) > -1) {
            const t = !0 === e.reverseFillMask ? 0 === c ? b.length > y.length ? 1 : 0 : Math.max(0, b.length - (b === a ? 0 : Math.min(y.length, p) + 1)) + 1 : c;
            s.setSelectionRange(t, t, "forward")
          } else if (!0 === e.reverseFillMask)
        if (!0 === _) {
          const e = Math.max(0, b.length - (b === a ? 0 : Math.min(y.length, p + 1)));
          1 === e && 1 === c ? s.setSelectionRange(e, e, "forward") : f.rightReverse(s, e, e)
        } else {
          const e = b.length - p;
          s.setSelectionRange(e, e, "backward")
        }
      else if (!0 === _) {
        const e = Math.max(0, l.indexOf(Bf), Math.min(y.length, c) - 1);
        f.right(s, e, e)
      } else {
        const e = c - 1;
        f.right(s, e, e)
      } else {
        const e = c - 1;
        f.right(s, e, e)
      } else {
        const t = !0 === e.reverseFillMask ? a.length : 0;
        s.setSelectionRange(t, t, "forward")
      }
    }));
    const w = !0 === e.unmaskedValue ? m(b) : b;
    String(e.modelValue) !== w && n(w, !0)
  }
  gn((() => e.type + e.autogrow), d), gn((() => e.mask), (n => {
    if (void 0 !== n) p(u.value, !0);
    else {
      const n = m(u.value);
      d(), e.modelValue !== n && t("update:modelValue", n)
    }
  })), gn((() => e.fillMask + e.reverseFillMask), (() => {
    !0 === s.value && p(u.value, !0)
  })), gn((() => e.unmaskedValue), (() => {
    !0 === s.value && p(u.value)
  }));
  const f = {
    left(e, t, n, o) {
      const a = -1 === l.slice(t - 1).indexOf(Bf);
      let r = Math.max(0, t - 1);
      for (; r >= 0; r--)
        if (l[r] === Bf) {
          t = r, !0 === a && t++;
          break
        } if (r < 0 && void 0 !== l[t] && l[t] !== Bf) return f.right(e, 0, 0);
      t >= 0 && e.setSelectionRange(t, !0 === o ? n : t, "backward")
    },
    right(e, t, n, o) {
      const a = e.value.length;
      let r = Math.min(a, n + 1);
      for (; r <= a; r++) {
        if (l[r] === Bf) {
          n = r;
          break
        }
        l[r - 1] === Bf && (n = r)
      }
      if (r > a && void 0 !== l[n - 1] && l[n - 1] !== Bf) return f.left(e, a, a);
      e.setSelectionRange(o ? t : n, n, "forward")
    },
    leftReverse(e, t, n, o) {
      const l = c(e.value.length);
      let a = Math.max(0, t - 1);
      for (; a >= 0; a--) {
        if (l[a - 1] === Bf) {
          t = a;
          break
        }
        if (l[a] === Bf && (t = a, 0 === a)) break
      }
      if (a < 0 && void 0 !== l[t] && l[t] !== Bf) return f.rightReverse(e, 0, 0);
      t >= 0 && e.setSelectionRange(t, !0 === o ? n : t, "backward")
    },
    rightReverse(e, t, n, o) {
      const l = e.value.length,
        a = c(l),
        r = -1 === a.slice(0, n + 1).indexOf(Bf);
      let i = Math.min(l, n + 1);
      for (; i <= l; i++)
        if (a[i - 1] === Bf) {
          (n = i) > 0 && !0 === r && n--;
          break
        } if (i > l && void 0 !== a[n - 1] && a[n - 1] !== Bf) return f.leftReverse(e, l, l);
      e.setSelectionRange(!0 === o ? t : n, n, "forward")
    }
  };

  function v(t) {
    if (null == t || "" === t) return "";
    if (!0 === e.reverseFillMask) return function(e) {
      const t = r,
        n = l.indexOf(Bf);
      let o = e.length - 1,
        a = "";
      for (let l = t.length - 1; l >= 0 && o > -1; l--) {
        const r = t[l];
        let i = e[o];
        if ("string" == typeof r) a = r + a, i === r && o--;
        else {
          if (void 0 === i || !r.regex.test(i)) return a;
          do {
            a = (void 0 !== r.transform ? r.transform(i) : i) + a, o--, i = e[o]
          } while (n === l && void 0 !== i && r.regex.test(i))
        }
      }
      return a
    }(t);
    const n = r;
    let o = 0,
      a = "";
    for (let e = 0; e < n.length; e++) {
      const l = t[o],
        r = n[e];
      if ("string" == typeof r) a += r, l === r && o++;
      else {
        if (void 0 === l || !r.regex.test(l)) return a;
        a += void 0 !== r.transform ? r.transform(l) : l, o++
      }
    }
    return a
  }

  function m(e) {
    return "string" != typeof e || void 0 === i ? "number" == typeof e ? i("" + e) : e : i(e)
  }

  function h(t) {
    return a.length - t.length <= 0 ? t : !0 === e.reverseFillMask && t.length > 0 ? a.slice(0, -t.length) + t : t + a.slice(t.length)
  }
  return {
    innerValue: u,
    hasMask: s,
    moveCursorForPaste: function(e, t, n) {
      const o = v(m(e.value));
      t = Math.max(0, l.indexOf(Bf), Math.min(o.length, t)), e.setSelectionRange(t, n, "forward")
    },
    updateMaskValue: p,
    onMaskedKeydown: function(n) {
      if (t("keydown", n), !0 === yr(n)) return;
      const l = o.value,
        a = l.selectionStart,
        r = l.selectionEnd;
      if (37 === n.keyCode || 39 === n.keyCode) {
        const t = f[(39 === n.keyCode ? "right" : "left") + (!0 === e.reverseFillMask ? "Reverse" : "")];
        n.preventDefault(), t(l, a, r, n.shiftKey)
      } else 8 === n.keyCode && !0 !== e.reverseFillMask && a === r ? f.left(l, a, r, !0) : 46 === n.keyCode && !0 === e.reverseFillMask && a === r && f.rightReverse(l, a, r, !0)
    }
  }
}
var $f = gs({
  name: "QInput",
  inheritAttrs: !1,
  props: {
    ...tc,
    ...If,
    ...su,
    modelValue: {
      required: !1
    },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [...nc, "paste", "change", "keydown", "animationend"],
  setup(e, {
    emit: t,
    attrs: n
  }) {
    const {
      proxy: o
    } = xl(), {
      $q: l
    } = o, a = {};
    let r, i, s, u = NaN,
      c = null;
    const d = bt(null),
      p = uu(e),
      {
        innerValue: f,
        hasMask: v,
        moveCursorForPaste: m,
        updateMaskValue: h,
        onMaskedKeydown: g
      } = Nf(e, t, T, d),
      y = function(e, t) {
        function n() {
          const t = e.modelValue;
          try {
            const e = "DataTransfer" in window ? new DataTransfer : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
            return Object(t) === t && ("length" in t ? Array.from(t) : [t]).forEach((t => {
              e.items.add(t)
            })), {
              files: e.files
            }
          } catch (Om) {
            return {
              files: void 0
            }
          }
        }
        return Rl(!0 === t ? () => {
          if ("file" === e.type) return n()
        } : n)
      }(e, !0),
      b = Rl((() => ec(f.value))),
      _ = Ed(A),
      w = oc(),
      k = Rl((() => "textarea" === e.type || !0 === e.autogrow)),
      x = Rl((() => !0 === k.value || ["text", "search", "url", "tel", "password"].includes(e.type))),
      S = Rl((() => {
        const t = {
          ...w.splitAttrs.listeners.value,
          onInput: A,
          onPaste: E,
          onChange: R,
          onBlur: q,
          onFocus: Za
        };
        return t.onCompositionstart = t.onCompositionupdate = t.onCompositionend = _, !0 === v.value && (t.onKeydown = g), !0 === e.autogrow && (t.onAnimationend = L), t
      })),
      C = Rl((() => {
        const t = {
          tabindex: 0,
          "data-autofocus": !0 === e.autofocus || void 0,
          rows: "textarea" === e.type ? 6 : void 0,
          "aria-label": e.label,
          name: p.value,
          ...w.splitAttrs.attributes.value,
          id: w.targetUid.value,
          maxlength: e.maxlength,
          disabled: !0 === e.disable,
          readonly: !0 === e.readonly
        };
        return !1 === k.value && (t.type = e.type), !0 === e.autogrow && (t.rows = 1), t
      }));

    function E(n) {
      if (!0 === v.value && !0 !== e.reverseFillMask) {
        const e = n.target;
        m(e, e.selectionStart, e.selectionEnd)
      }
      t("paste", n)
    }

    function A(n) {
      if (!n || !n.target) return;
      if ("file" === e.type) return void t("update:modelValue", n.target.files);
      const o = n.target.value;
      if (!0 !== n.target.qComposing) {
        if (!0 === v.value) h(o, !1, n.inputType);
        else if (T(o), !0 === x.value && n.target === document.activeElement) {
          const {
            selectionStart: e,
            selectionEnd: t
          } = n.target;
          void 0 !== e && void 0 !== t && It((() => {
            n.target === document.activeElement && 0 === o.indexOf(n.target.value) && n.target.setSelectionRange(e, t)
          }))
        }!0 === e.autogrow && O()
      } else a.value = o
    }

    function L(e) {
      t("animationend", e), O()
    }

    function T(n, o) {
      s = () => {
        c = null, "number" !== e.type && !0 === a.hasOwnProperty("value") && delete a.value, e.modelValue !== n && u !== n && (u = n, !0 === o && (i = !0), t("update:modelValue", n), It((() => {
          u === n && (u = NaN)
        }))), s = void 0
      }, "number" === e.type && (r = !0, a.value = n), void 0 !== e.debounce ? (null !== c && clearTimeout(c), a.value = n, c = setTimeout(s, e.debounce)) : s()
    }

    function O() {
      requestAnimationFrame((() => {
        const e = d.value;
        if (null !== e) {
          const t = e.parentNode.style,
            {
              overflow: n
            } = e.style;
          !0 !== l.platform.is.firefox && (e.style.overflow = "hidden"), t.marginBottom = e.scrollHeight - 1 + "px", e.style.height = "1px", e.style.height = e.scrollHeight + "px", e.style.overflow = n, t.marginBottom = ""
        }
      }))
    }

    function R(e) {
      _(e), null !== c && (clearTimeout(c), c = null), void 0 !== s && s(), t("change", e.target.value)
    }

    function q(t) {
      void 0 !== t && Za(t), null !== c && (clearTimeout(c), c = null), void 0 !== s && s(), r = !1, i = !1, delete a.value, "file" !== e.type && setTimeout((() => {
        null !== d.value && (d.value.value = void 0 !== f.value ? f.value : "")
      }))
    }

    function V() {
      return !0 === a.hasOwnProperty("value") ? a.value : void 0 !== f.value ? f.value : ""
    }
    gn((() => e.type), (() => {
      d.value && (d.value.value = e.modelValue)
    })), gn((() => e.modelValue), (t => {
      if (!0 === v.value) {
        if (!0 === i && (i = !1, String(t) === u)) return;
        h(t)
      } else f.value !== t && (f.value = t, "number" === e.type && !0 === a.hasOwnProperty("value") && (!0 === r ? r = !1 : delete a.value));
      !0 === e.autogrow && It(O)
    })), gn((() => e.autogrow), (e => {
      !0 === e ? It(O) : null !== d.value && n.rows > 0 && (d.value.style.height = "auto")
    })), gn((() => e.dense), (() => {
      !0 === e.autogrow && It(O)
    })), Dn((() => {
      q()
    })), Nn((() => {
      !0 === e.autogrow && O()
    })), Object.assign(w, {
      innerValue: f,
      fieldClass: Rl((() => "q-" + (!0 === k.value ? "textarea" : "input") + (!0 === e.autogrow ? " q-textarea--autogrow" : ""))),
      hasShadow: Rl((() => "file" !== e.type && "string" == typeof e.shadowText && e.shadowText.length > 0)),
      inputRef: d,
      emitValue: T,
      hasValue: b,
      floatingLabel: Rl((() => !0 === b.value || ec(e.displayValue))),
      getControl: () => ql(!0 === k.value ? "textarea" : "input", {
        ref: d,
        class: ["q-field__native q-placeholder", e.inputClass],
        style: e.inputStyle,
        ...C.value,
        ...S.value,
        ..."file" !== e.type ? {
          value: V()
        } : y.value
      }),
      getShadowControl: () => ql("div", {
        class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (!0 === k.value ? "" : " text-no-wrap")
      }, [ql("span", {
        class: "invisible"
      }, V()), ql("span", e.shadowText)])
    });
    const M = lc(w);
    return Object.assign(o, {
      focus: function() {
        Zu((() => {
          const e = document.activeElement;
          null === d.value || d.value === e || null !== e && e.id === w.targetUid.value || d.value.focus({
            preventScroll: !0
          })
        }))
      },
      select: function() {
        null !== d.value && d.value.select()
      },
      getNativeElement: () => d.value
    }), Na(o, "nativeEl", (() => d.value)), M
  }
});
const jf = [ql("g", {
  "stroke-width": "4",
  "stroke-linecap": "round"
}, [ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(180)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(210)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: "0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(240)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(270)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(300)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(330)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(0)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(30)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(60)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(90)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(120)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: ".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85",
  repeatCount: "indefinite"
})]), ql("line", {
  y1: "17",
  y2: "29",
  transform: "translate(32,32) rotate(150)"
}, [ql("animate", {
  attributeName: "stroke-opacity",
  dur: "750ms",
  values: "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1",
  repeatCount: "indefinite"
})])])];
var Df = gs({
  name: "QSpinnerIos",
  props: Mu,
  setup(e) {
    const {
      cSize: t,
      classes: n
    } = Fu(e);
    return () => ql("svg", {
      class: n.value,
      width: t.value,
      height: t.value,
      stroke: "currentColor",
      fill: "currentColor",
      viewBox: "0 0 64 64"
    }, jf)
  }
});
const Hf = {
    left: "start",
    center: "center",
    right: "end",
    between: "between",
    around: "around",
    evenly: "evenly",
    stretch: "stretch"
  },
  Uf = Object.keys(Hf),
  Wf = {
    type: String,
    validator: e => Uf.includes(e)
  };
const Kf = {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  Qf = {
    xs: 8,
    sm: 10,
    md: 14,
    lg: 20,
    xl: 24
  },
  Gf = ["button", "submit", "reset"],
  Xf = /[^\s]\/[^\s]/,
  Jf = {
    ...Ds,
    ...Ru,
    type: {
      type: String,
      default: "button"
    },
    label: [Number, String],
    icon: String,
    iconRight: String,
    ...["flat", "outline", "push", "unelevated"].reduce(((e, t) => (e[t] = Boolean) && e), {}),
    square: Boolean,
    round: Boolean,
    rounded: Boolean,
    glossy: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    padding: String,
    color: String,
    textColor: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    tabindex: [Number, String],
    ripple: {
      type: [Boolean, Object],
      default: !0
    },
    align: {
      ...Wf,
      default: "center"
    },
    stack: Boolean,
    stretch: Boolean,
    loading: {
      type: Boolean,
      default: null
    },
    disable: Boolean
  };

function Zf(e) {
  const t = Hs(e, Qf),
    n = function(e) {
      return Rl((() => {
        const t = void 0 === e.align ? !0 === e.vertical ? "stretch" : "left" : e.align;
        return `${!0===e.vertical?"items":"justify"}-${Hf[t]}`
      }))
    }(e),
    {
      hasRouterLink: o,
      hasLink: l,
      linkTag: a,
      linkAttrs: r,
      navigateOnClick: i
    } = qu({
      fallbackTag: "button"
    }),
    s = Rl((() => {
      const n = !1 === e.fab && !1 === e.fabMini ? t.value : {};
      return void 0 !== e.padding ? Object.assign({}, n, {
        padding: e.padding.split(/\s+/).map((e => e in Kf ? Kf[e] + "px" : e)).join(" "),
        minWidth: "0",
        minHeight: "0"
      }) : n
    })),
    u = Rl((() => !0 === e.rounded || !0 === e.fab || !0 === e.fabMini)),
    c = Rl((() => !0 !== e.disable && !0 !== e.loading)),
    d = Rl((() => !0 === c.value ? e.tabindex || 0 : -1)),
    p = Rl((() => ((e, t) => !0 === e.flat ? "flat" : !0 === e.outline ? "outline" : !0 === e.push ? "push" : !0 === e.unelevated ? "unelevated" : t)(e, "standard"))),
    f = Rl((() => {
      const t = {
        tabindex: d.value
      };
      return !0 === l.value ? Object.assign(t, r.value) : !0 === Gf.includes(e.type) && (t.type = e.type), "a" === a.value ? (!0 === e.disable ? t["aria-disabled"] = "true" : void 0 === t.href && (t.role = "button"), !0 !== o.value && !0 === Xf.test(e.type) && (t.type = e.type)) : !0 === e.disable && (t.disabled = "", t["aria-disabled"] = "true"), !0 === e.loading && void 0 !== e.percentage && Object.assign(t, {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": e.percentage
      }), t
    }));
  return {
    classes: Rl((() => {
      let t;
      void 0 !== e.color ? t = !0 === e.flat || !0 === e.outline ? `text-${e.textColor||e.color}` : `bg-${e.color} text-${e.textColor||"white"}` : e.textColor && (t = `text-${e.textColor}`);
      const n = !0 === e.round ? "round" : "rectangle" + (!0 === u.value ? " q-btn--rounded" : !0 === e.square ? " q-btn--square" : "");
      return `q-btn--${p.value} q-btn--${n}` + (void 0 !== t ? " " + t : "") + (!0 === c.value ? " q-btn--actionable q-focusable q-hoverable" : !0 === e.disable ? " disabled" : "") + (!0 === e.fab ? " q-btn--fab" : !0 === e.fabMini ? " q-btn--fab-mini" : "") + (!0 === e.noCaps ? " q-btn--no-uppercase" : "") + (!0 === e.dense ? " q-btn--dense" : "") + (!0 === e.stretch ? " no-border-radius self-stretch" : "") + (!0 === e.glossy ? " glossy" : "") + (e.square ? " q-btn--square" : "")
    })),
    style: s,
    innerClasses: Rl((() => n.value + (!0 === e.stack ? " column" : " row") + (!0 === e.noWrap ? " no-wrap text-no-wrap" : "") + (!0 === e.loading ? " q-btn__content--hidden" : ""))),
    attributes: f,
    hasLink: l,
    linkTag: a,
    navigateOnClick: i,
    isActionable: c
  }
}
const {
  passiveCapture: Yf
} = Ga;
let ev = null,
  tv = null,
  nv = null;
var ov, lv = gs({
    name: "QBtn",
    props: {
      ...Jf,
      percentage: Number,
      darkPercentage: Boolean,
      onTouchstart: [Function, Array]
    },
    emits: ["click", "keydown", "mousedown", "keyup"],
    setup(e, {
      slots: t,
      emit: n
    }) {
      const {
        proxy: o
      } = xl(), {
        classes: l,
        style: a,
        innerClasses: r,
        attributes: i,
        hasLink: s,
        linkTag: u,
        navigateOnClick: c,
        isActionable: d
      } = Zf(e), p = bt(null), f = bt(null);
      let v, m = null,
        h = null;
      const g = Rl((() => void 0 !== e.label && null !== e.label && "" !== e.label)),
        y = Rl((() => !0 !== e.disable && !1 !== e.ripple && {
          keyCodes: !0 === s.value ? [13, 32] : [13],
          ...!0 === e.ripple ? {} : e.ripple
        })),
        b = Rl((() => ({
          center: e.round
        }))),
        _ = Rl((() => {
          const t = Math.max(0, Math.min(100, e.percentage));
          return t > 0 ? {
            transition: "transform 0.6s",
            transform: `translateX(${t-100}%)`
          } : {}
        })),
        w = Rl((() => {
          if (!0 === e.loading) return {
            onMousedown: T,
            onTouchstart: T,
            onClick: T,
            onKeydown: T,
            onKeyup: T
          };
          if (!0 === d.value) {
            const t = {
              onClick: x,
              onKeydown: S,
              onMousedown: E
            };
            if (!0 === o.$q.platform.has.touch) {
              t[`onTouchstart${void 0!==e.onTouchstart?"":"Passive"}`] = C
            }
            return t
          }
          return {
            onClick: er
          }
        })),
        k = Rl((() => ({
          ref: p,
          class: "q-btn q-btn-item non-selectable no-outline " + l.value,
          style: a.value,
          ...i.value,
          ...w.value
        })));

      function x(t) {
        if (null !== p.value) {
          if (void 0 !== t) {
            if (!0 === t.defaultPrevented) return;
            const n = document.activeElement;
            if ("submit" === e.type && n !== document.body && !1 === p.value.contains(n) && !1 === n.contains(p.value)) {
              p.value.focus();
              const e = () => {
                document.removeEventListener("keydown", er, !0), document.removeEventListener("keyup", e, Yf), null !== p.value && p.value.removeEventListener("blur", e, Yf)
              };
              document.addEventListener("keydown", er, !0), document.addEventListener("keyup", e, Yf), p.value.addEventListener("blur", e, Yf)
            }
          }
          c(t)
        }
      }

      function S(e) {
        null !== p.value && (n("keydown", e), !0 === br(e, [13, 32]) && tv !== p.value && (null !== tv && L(), !0 !== e.defaultPrevented && (p.value.focus(), tv = p.value, p.value.classList.add("q-btn--active"), document.addEventListener("keyup", A, !0), p.value.addEventListener("blur", A, Yf)), er(e)))
      }

      function C(e) {
        null !== p.value && (n("touchstart", e), !0 !== e.defaultPrevented && (ev !== p.value && (null !== ev && L(), ev = p.value, m = e.target, m.addEventListener("touchcancel", A, Yf), m.addEventListener("touchend", A, Yf)), v = !0, null !== h && clearTimeout(h), h = setTimeout((() => {
          h = null, v = !1
        }), 200)))
      }

      function E(e) {
        null !== p.value && (e.qSkipRipple = !0 === v, n("mousedown", e), !0 !== e.defaultPrevented && nv !== p.value && (null !== nv && L(), nv = p.value, p.value.classList.add("q-btn--active"), document.addEventListener("mouseup", A, Yf)))
      }

      function A(e) {
        if (null !== p.value && (void 0 === e || "blur" !== e.type || document.activeElement !== p.value)) {
          if (void 0 !== e && "keyup" === e.type) {
            if (tv === p.value && !0 === br(e, [13, 32])) {
              const t = new MouseEvent("click", e);
              t.qKeyEvent = !0, !0 === e.defaultPrevented && Ya(t), !0 === e.cancelBubble && Za(t), p.value.dispatchEvent(t), er(e), e.qKeyEvent = !0
            }
            n("keyup", e)
          }
          L()
        }
      }

      function L(e) {
        const t = f.value;
        !0 === e || ev !== p.value && nv !== p.value || null === t || t === document.activeElement || (t.setAttribute("tabindex", -1), t.focus()), ev === p.value && (null !== m && (m.removeEventListener("touchcancel", A, Yf), m.removeEventListener("touchend", A, Yf)), ev = m = null), nv === p.value && (document.removeEventListener("mouseup", A, Yf), nv = null), tv === p.value && (document.removeEventListener("keyup", A, !0), null !== p.value && p.value.removeEventListener("blur", A, Yf), tv = null), null !== p.value && p.value.classList.remove("q-btn--active")
      }

      function T(e) {
        er(e), e.qSkipRipple = !0
      }
      return Dn((() => {
        L(!0)
      })), Object.assign(o, {
        click: x
      }), () => {
        let n = [];
        void 0 !== e.icon && n.push(ql(au, {
          name: e.icon,
          left: !1 === e.stack && !0 === g.value,
          role: "img",
          "aria-hidden": "true"
        })), !0 === g.value && n.push(ql("span", {
          class: "block"
        }, [e.label])), n = xs(t.default, n), void 0 !== e.iconRight && !1 === e.round && n.push(ql(au, {
          name: e.iconRight,
          right: !1 === e.stack && !0 === g.value,
          role: "img",
          "aria-hidden": "true"
        }));
        const o = [ql("span", {
          class: "q-focus-helper",
          ref: f
        })];
        return !0 === e.loading && void 0 !== e.percentage && o.push(ql("span", {
          class: "q-btn__progress absolute-full overflow-hidden" + (!0 === e.darkPercentage ? " q-btn__progress--dark" : "")
        }, [ql("span", {
          class: "q-btn__progress-indicator fit block",
          style: _.value
        })])), o.push(ql("span", {
          class: "q-btn__content text-center col items-center q-anchor--skip " + r.value
        }, n)), null !== e.loading && o.push(ql(Xl, {
          name: "q-transition--fade"
        }, (() => !0 === e.loading ? [ql("span", {
          key: "loading",
          class: "absolute-full flex flex-center"
        }, void 0 !== t.loading ? t.loading() : [ql(zu)])] : null))), Gn(ql(u.value, k.value, o), [
          [uc, y.value, void 0, b.value]
        ])
      }
    }
  }),
  av = gs({
    name: "QList",
    props: {
      ...ru,
      bordered: Boolean,
      dense: Boolean,
      separator: Boolean,
      padding: Boolean,
      tag: {
        type: String,
        default: "div"
      }
    },
    setup(e, {
      slots: t
    }) {
      const n = xl(),
        o = iu(e, n.proxy.$q),
        l = Rl((() => "q-list" + (!0 === e.bordered ? " q-list--bordered" : "") + (!0 === e.dense ? " q-list--dense" : "") + (!0 === e.separator ? " q-list--separator" : "") + (!0 === o.value ? " q-list--dark" : "") + (!0 === e.padding ? " q-list--padding" : "")));
      return () => ql(e.tag, {
        class: l.value
      }, ws(t.default))
    }
  }),
  rv = {
    exports: {}
  };
/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
ov = rv,
  function(e) {
    var t, n = {
        VERSION: "1.6.1"
      },
      o = {},
      l = function(e, t) {
        return function() {
          return t.apply(e, arguments)
        }
      },
      a = function() {
        var e, t, n = arguments,
          o = n[0];
        for (t = 1; t < n.length; t++)
          for (e in n[t]) !(e in o) && n[t].hasOwnProperty(e) && (o[e] = n[t][e]);
        return o
      },
      r = function(e, t) {
        return {
          value: e,
          name: t
        }
      };
    n.TRACE = r(1, "TRACE"), n.DEBUG = r(2, "DEBUG"), n.INFO = r(3, "INFO"), n.TIME = r(4, "TIME"), n.WARN = r(5, "WARN"), n.ERROR = r(8, "ERROR"), n.OFF = r(99, "OFF");
    var i = function(e) {
      this.context = e, this.setLevel(e.filterLevel), this.log = this.info
    };
    i.prototype = {
      setLevel: function(e) {
        e && "value" in e && (this.context.filterLevel = e)
      },
      getLevel: function() {
        return this.context.filterLevel
      },
      enabledFor: function(e) {
        var t = this.context.filterLevel;
        return e.value >= t.value
      },
      trace: function() {
        this.invoke(n.TRACE, arguments)
      },
      debug: function() {
        this.invoke(n.DEBUG, arguments)
      },
      info: function() {
        this.invoke(n.INFO, arguments)
      },
      warn: function() {
        this.invoke(n.WARN, arguments)
      },
      error: function() {
        this.invoke(n.ERROR, arguments)
      },
      time: function(e) {
        "string" == typeof e && e.length > 0 && this.invoke(n.TIME, [e, "start"])
      },
      timeEnd: function(e) {
        "string" == typeof e && e.length > 0 && this.invoke(n.TIME, [e, "end"])
      },
      invoke: function(e, n) {
        t && this.enabledFor(e) && t(n, a({
          level: e
        }, this.context))
      }
    };
    var s, u = new i({
      filterLevel: n.OFF
    });
    (s = n).enabledFor = l(u, u.enabledFor), s.trace = l(u, u.trace), s.debug = l(u, u.debug), s.time = l(u, u.time), s.timeEnd = l(u, u.timeEnd), s.info = l(u, u.info), s.warn = l(u, u.warn), s.error = l(u, u.error), s.log = s.info, n.setHandler = function(e) {
      t = e
    }, n.setLevel = function(e) {
      for (var t in u.setLevel(e), o) o.hasOwnProperty(t) && o[t].setLevel(e)
    }, n.getLevel = function() {
      return u.getLevel()
    }, n.get = function(e) {
      return o[e] || (o[e] = new i(a({
        name: e
      }, u.context)))
    }, n.createDefaultHandler = function(e) {
      (e = e || {}).formatter = e.formatter || function(e, t) {
        t.name && e.unshift("[" + t.name + "]")
      };
      var t = {},
        o = function(e, t) {
          Function.prototype.apply.call(e, console, t)
        };
      return "undefined" == typeof console ? function() {} : function(l, a) {
        l = Array.prototype.slice.call(l);
        var r, i = console.log;
        a.level === n.TIME ? (r = (a.name ? "[" + a.name + "] " : "") + l[0], "start" === l[1] ? console.time ? console.time(r) : t[r] = (new Date).getTime() : console.timeEnd ? console.timeEnd(r) : o(i, [r + ": " + ((new Date).getTime() - t[r]) + "ms"])) : (a.level === n.WARN && console.warn ? i = console.warn : a.level === n.ERROR && console.error ? i = console.error : a.level === n.INFO && console.info ? i = console.info : a.level === n.DEBUG && console.debug ? i = console.debug : a.level === n.TRACE && console.trace && (i = console.trace), e.formatter(l, a), o(i, l))
      }
    }, n.useDefaults = function(e) {
      n.setLevel(e && e.defaultLevel || n.DEBUG), n.setHandler(n.createDefaultHandler(e))
    }, n.setDefaults = n.useDefaults, ov.exports ? ov.exports = n : (n._prevLogger = e.Logger, n.noConflict = function() {
      return e.Logger = n._prevLogger, n
    }, e.Logger = n)
  }(wa);
var iv = rv.exports;
const sv = {
  telegram: "https://t.me/+2S60dFyiS4VmNzc1",
  discord: "https://discord.gg/wQKktx9gar",
  dashboard: "https://dashboard.captchaai.io",
  addFunds: "https://dashboard.capsolver.com/overview/add-funds",
  policy: "",
  getKey: "https://dashboard.capsolver.com/dashboard/overview",
  guide: "http://www.capsolver.com/",
  instructions: "https://docs.capsolver.com/guide/extension/instructions.html"
};
class uv {
  constructor(e) {
    t(this, "baseURL"), this.baseURL = e
  }
  async post(e, t, n) {
    const o = await fetch(this.getURL(e), {
      method: "POST",
      body: JSON.stringify(t),
      headers: {
        "Content-Type": "application/json"
      },
      ...n
    });
    return {
      status: o.status,
      statusText: o.statusText,
      data: await o.json(),
      headers: o.headers
    }
  }
  getURL(e) {
    return this.baseURL + e
  }
}
class cv {
  constructor(e) {
    t(this, "options", {
      apiKey: "",
      service: "https://api.capsolver.com",
      defaultTimeout: 120,
      pollingInterval: 5,
      recaptchaTimeout: 600
    }), t(this, "http");
    for (let t in this.options) this.options[t] = void 0 === e[t] ? this.options[t] : e[t];
    this.http = new uv(this.options.service)
  }
  static async API(e) {
    const t = await wu.getAll();
    if (!(null == e ? void 0 : e.apiKey) && !(null == t ? void 0 : t.apiKey)) throw new Error("Capsover: No API Kye set up yet!");
    return new cv({
      apiKey: t.apiKey,
      ...e
    })
  }
  async getProxyParams(e) {
    const t = await wu.getAll();
    return {
      proxyType: t.proxyType,
      proxyAddress: t.hostOrIp,
      proxyPort: t.port,
      proxyLogin: t.proxyLogin,
      proxyPassword: t.proxyPassword,
      type: e.type.replace("ProxyLess", "")
    }
  }
  async getBalance() {
    var e, t, n;
    const o = await this.http.post("/getBalance", {
      clientKey: this.options.apiKey
    });
    if (200 !== o.status || (null == (e = o.data) ? void 0 : e.errorCode) || (null == (t = o.data) ? void 0 : t.errorId)) throw new Error((null == (n = o.data) ? void 0 : n.errorDescription) || "createTask fail！");
    return o.data
  }
  async createTaskResult(e, t) {
    t || (t = {
      timeout: this.options.defaultTimeout,
      pollingInterval: this.options.pollingInterval
    });
    const n = await wu.getAll();
    if (n.appId && (e.appId = n.appId), n.useProxy) {
      const t = await this.getProxyParams(e.task);
      Object.assign(e.task, t)
    }
    const o = await this.createTask(e),
      {
        taskId: l
      } = o;
    let a = this.getTime(),
      r = void 0 === t.timeout ? this.options.defaultTimeout : t.timeout,
      i = void 0 === t.pollingInterval ? this.options.pollingInterval : t.pollingInterval;
    for (; !(this.getTime() - a > r);) {
      await new Promise((e => setTimeout(e, 1e3 * i)));
      const e = await this.getTaskSolution({
        taskId: l
      });
      if ("ready" === e.status) return e
    }
    throw new Error("Timeout " + r + " seconds reached")
  }
  async createTask(e) {
    var t, n, o;
    const l = await this.http.post("/createTask", {
      clientKey: this.options.apiKey,
      ...e
    });
    if (200 !== l.status || (null == (t = l.data) ? void 0 : t.errorCode) || (null == (n = l.data) ? void 0 : n.errorId)) throw new Error((null == (o = l.data) ? void 0 : o.errorDescription) || "createTask fail！");
    if (!l.data.taskId) throw new Error("taskIs is empty!");
    return l.data
  }
  async getTaskSolution({
    taskId: e
  }) {
    var t, n, o;
    const l = await this.http.post("/getTaskResult", {
      clientKey: this.options.apiKey,
      taskId: e
    });
    if (200 !== l.status || (null == (t = l.data) ? void 0 : t.errorCode) || (null == (n = l.data) ? void 0 : n.errorId)) throw new Error((null == (o = l.data) ? void 0 : o.errorDescription) || "getTaskResult fail！");
    return l.data
  }
  async createRecognitionTask(e) {
    var t, n, o;
    const l = await wu.getAll();
    l.appId && (e.appId = l.appId);
    const a = await this.http.post("/createTask", {
      clientKey: this.options.apiKey,
      ...e
    });
    if (200 !== a.status || (null == (t = a.data) ? void 0 : t.errorCode) || 0 !== (null == (n = a.data) ? void 0 : n.errorId)) throw new Error((null == (o = a.data) ? void 0 : o.errorDescription) || "createTask fail！");
    if (!a.data.taskId) throw new Error("taskIs is empty!");
    return a.data
  }
  getTime() {
    return parseInt(String(Date.now() / 1e3))
  }
}
const dv = [{
  label: "ReCaptcha v2",
  key: "reCaptcha",
  enabledName: "enabledForRecaptcha",
  disabled: !1
}, {
  label: "ReCaptcha v3",
  key: "reCaptcha3",
  enabledName: "enabledForRecaptchaV3",
  disabled: !1,
  captchaMode: "onlyToken"
}, {
  label: "HCaptcha",
  key: "hCaptcha",
  enabledName: "enabledForHCaptcha",
  disabled: !1
}, {
  label: "FunCaptcha",
  key: "funCaptcha",
  enabledName: "enabledForFunCaptcha",
  disabled: !1,
  captchaMode: "onlyClick",
  isBeta: !0
}, {
  label: "Text Captcha",
  key: "textCaptcha",
  enabledName: "enabledForImageToText",
  disabled: !1,
  captchaMode: "onlyClick"
}, {
  label: "Cloudflare",
  key: "cloudflare",
  enabledName: "enabledForCloudflare",
  disabled: !1,
  captchaMode: "onlyClick"
}, {
  label: "GeeTest",
  key: "geetest",
  enabledName: "enabledForGeetestV4",
  disabled: !0,
  isCollapse: !1,
  captchaMode: "comingSoon"
}, {
  label: "Datadome",
  key: "datadome",
  enabledName: "enabledForDataDome",
  disabled: !0,
  isCollapse: !1,
  captchaMode: "comingSoon"
}];
const pv = (e => (en("data-v-d6001888"), e = e(), tn(), e))((() => cl("img", {
  src: "assets/success.42815aad.svg",
  alt: ""
}, null, -1)));
var fv = qr(On({
  __name: "Message",
  props: {
    type: null,
    message: null,
    duration: null
  },
  setup(e, {
    expose: t
  }) {
    const n = e,
      o = bt(!0);
    return t({
      close: function(e, t) {
        let l = setTimeout((() => {
          o.value = !1;
          let n = setTimeout((() => {
            e.removeChild(t), clearTimeout(l), clearTimeout(n), l = null, n = null
          }), 500)
        }), n.duration)
      }
    }), (t, n) => (Zo(), ol("div", {
      class: d(["capsolver-message", {
        "capsolver-message--close": !o.value
      }])
    }, [pv, cl("span", null, v(e.message), 1)], 2))
  }
}), [
  ["__scopeId", "data-v-d6001888"]
]);

function vv(e, t) {
  const n = ql(fv, e);
  return ((...e) => {
    va().render(...e)
  })(n, t), n
}

function mv(e) {
  const t = document.body,
    n = function() {
      const e = document.createElement("div");
      return e.classList.add("capsolver-message-container"), e
    }(),
    o = {
      vNode: vv(e, n),
      container: n
    };
  t.appendChild(n), o.vNode.component.exposed.close(t, n)
}
const hv = {
    class: "link"
  },
  gv = ["href", "target", "onClick"];
var yv = qr(On({
  __name: "Link",
  props: {
    href: null,
    target: {
      default: "_blank"
    },
    refresh: {
      type: Boolean
    }
  },
  setup(e) {
    const t = e,
      n = Rl((() => {
        var e, n;
        return (null == (e = t.href) ? void 0 : e.toLowerCase().includes("http://")) || (null == (n = t.href) ? void 0 : n.toLowerCase().includes("https://"))
      })),
      o = mn(os);

    function l(e) {
      t.refresh && (e.preventDefault(), o.go(0))
    }
    return (t, o) => {
      const a = Jn("router-link");
      return Zo(), ol("div", hv, [e.href ? (Zo(), ol(Wo, {
        key: 0
      }, [kt(n) || e.refresh ? (Zo(), ol("a", {
        key: 0,
        class: "row items-center",
        href: e.href,
        target: e.target,
        onClick: (r = l, i = ["stop"], (e, ...t) => {
          for (let n = 0; n < i.length; n++) {
            const t = ua[i[n]];
            if (t && t(e, i)) return
          }
          return r(e, ...t)
        })
      }, [to(t.$slots, "default", {}, void 0, !0)], 8, gv)) : (Zo(), ll(a, {
        key: 1,
        to: e.href
      }, {
        default: nn((() => [to(t.$slots, "default", {}, void 0, !0)])),
        _: 3
      }, 8, ["to"]))], 64)) : to(t.$slots, "default", {
        key: 1
      }, void 0, !0)]);
      var r, i
    }
  }
}), [
  ["__scopeId", "data-v-a62aa848"]
]);
const bv = {
    class: "cap-collapse"
  },
  _v = On({
    __name: "CapsolverCollapse",
    props: {
      collapse: {
        type: Boolean
      }
    },
    setup: e => (t, n) => Gn((Zo(), ol("div", bv, [to(t.$slots, "default")], 512)), [
      [ca, e.collapse]
    ])
  }),
  wv = ql("div", {
    key: "svg",
    class: "q-checkbox__bg absolute"
  }, [ql("svg", {
    class: "q-checkbox__svg fit absolute-full",
    viewBox: "0 0 24 24"
  }, [ql("path", {
    class: "q-checkbox__truthy",
    fill: "none",
    d: "M1.73,12.91 8.1,19.28 22.79,4.59"
  }), ql("path", {
    class: "q-checkbox__indet",
    d: "M4,14H20V10H4"
  })])]);
var kv = gs({
  name: "QCheckbox",
  props: du,
  emits: pu,
  setup: e => fu("checkbox", (function(t, n) {
    const o = Rl((() => (!0 === t.value ? e.checkedIcon : !0 === n.value ? e.indeterminateIcon : e.uncheckedIcon) || null));
    return () => null !== o.value ? [ql("div", {
      key: "icon",
      class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
    }, [ql(au, {
      class: "q-checkbox__icon",
      name: o.value
    })])] : [wv]
  }))
});
const xv = e => (en("data-v-0efae70a"), e = e(), tn(), e),
  Sv = {
    class: "cap-radio"
  },
  Cv = [xv((() => cl("span", null, "Token", -1)))],
  Ev = [xv((() => cl("span", null, "Click", -1)))];
var Av = qr(On({
  __name: "CapsolverRadio",
  props: {
    mode: null
  },
  emits: ["update:mode", "modeChange"],
  setup(e, {
    emit: t
  }) {
    function n(e) {
      t("update:mode", e), t("modeChange")
    }
    return (t, o) => (Zo(), ol("div", Sv, [cl("div", {
      class: d(["cap-radio--item", {
        active: "token" === e.mode
      }]),
      onClick: o[0] || (o[0] = e => n("token"))
    }, Cv, 2), cl("div", {
      class: d(["cap-radio--item", {
        active: "click" === e.mode
      }]),
      onClick: o[1] || (o[1] = e => n("click"))
    }, Ev, 2)]))
  }
}), [
  ["__scopeId", "data-v-0efae70a"]
]);
const Lv = ["src"];
var Tv = qr(On({
    __name: "CapsolverArrow",
    props: {
      up: {
        type: Boolean
      }
    },
    emits: ["update:up"],
    setup(e, {
      emit: t
    }) {
      const n = e;

      function o() {
        t("update:up", !n.up)
      }
      return (t, n) => (Zo(), ol("div", {
        class: d(["captcha-arrow", {
          "captcha-arrow--up": e.up
        }]),
        onClick: o
      }, [cl("img", {
        src: kt("assets/arrow.1ab57550.svg"),
        alt: ""
      }, null, 8, Lv)], 2))
    }
  }), [
    ["__scopeId", "data-v-3ffd6706"]
  ]),
  Ov = "assets/reCaptcha.63436d93.svg";
const Rv = {
    class: "captcha-checkbox"
  },
  qv = ["src"],
  Vv = {
    class: "captcha-name"
  },
  Mv = {
    key: 0,
    class: "captcha-beta"
  },
  Fv = {
    class: "row items-center justify-end"
  },
  zv = {
    key: 0,
    class: "only-click"
  },
  Pv = {
    key: 1,
    class: "row items-center"
  },
  Bv = {
    key: 1,
    class: "w-placeholder"
  },
  Iv = {
    key: 0,
    class: "captcha-collapse-item"
  },
  Nv = {
    key: 1,
    class: "captcha-collapse-item"
  };
var $v = qr(On({
  __name: "CaptchaItem",
  props: {
    captcha: null,
    captchaName: null,
    enabledForCaptcha: null,
    label: null,
    disabled: {
      type: Boolean,
      default: !1
    },
    repeatTimes: {
      type: Boolean,
      default: !0
    },
    delayTime: {
      type: Boolean,
      default: !0
    },
    isCollapse: {
      type: Boolean,
      default: !0
    },
    onlyClick: {
      type: Boolean,
      default: !1
    },
    onlyToken: {
      type: Boolean,
      default: !1
    },
    comingSoon: {
      type: Boolean,
      default: !1
    },
    captchaMode: {
      default: "radio"
    },
    isBeta: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:captcha", "captchaChange"],
  setup(e, {
    emit: t
  }) {
    const n = e,
      {
        t: o
      } = gf(),
      l = at({
        geetest: "assets/geetest.5dfc422c.svg",
        reCaptcha: Ov,
        hCaptcha: "assets/hCaptcha.0406a4eb.svg",
        funCaptcha: "assets/funCaptcha.4f6d4ba4.svg",
        textCaptcha: "assets/textToImage.8dbe0bf9.svg",
        reCaptcha3: Ov,
        cloudflare: "assets/cloudflare.a164bb78.svg",
        datadome: "assets/dataDome.047813e4.svg",
        aws: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAjCAYAAADFYhl7AAAACXBIWXMAACxLAAAsSwGlPZapAAAAB3RJTUUH5AQWEywOARoGNwAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAICElEQVRYhd2Za7CVZRXHf2uffTicg3IRUAc9paYoBqipmKNhF0an0WTGy6ipZQIy9oHqg1rUjH5pukyT1aTBQchMtEYtKy8pJhZleUFNxEi8cFVRQe5wOGf//33Yzz48vOx9uIzK2Jp5Zq93rf+znrXe57bWu8M2jcj2IcBwYEgSCVgGLIyIzQV4CWhN/KaGRqt294uICrBlb3G2jwSOycZcBSyOiDcaGSu2AZK+IekJSZ2uQ5Jel3RD3k/SFElvpDa7jl0ktUn6q6Q3Ja2QdE0D3BBJ8xNupaRjMt1YSX9r4Ndm23MljS3arBfo9+oZaWD4pqzfBQXdEXUCOLWAWdgg0IsyzGrbA5P8bEnbdsOvp4s2y3Vm+JCIwPazwJyIeMr2CqAZOA6YEBHHA0TEV23fHhH/BB6xvToiBidTpwCvFsyPKTwfDrQDywvysRl/P7DW9gHALRHRnPycA8wAFgMV4OBk/2Jg4y6XrqQxkj5b700n/f6SFmVv78ZM97tM/os6/X9bZwLGFzAh6bnMzoV1ZvkF29HAx7KkIUV5qRh4RDwZEY/u9Ea26zcAszPRiIy/L+NPLXRttn1iernzbL+d+B1wtg+v2bS9DpibVO0ZbAnQ6BTtjoh3isKdAt1NypfkoBoTEX+xvTU9HmP7YzWd7aOoLlWAjohYmPhPFmyfGhF9Ej8vc3pZhvmU7bP2xOFdBdrP9nDbJ9s+1vawJN9WA0REbmMpMD/JW9hxVsdERMl2N/Cw7eeTfJTtQRnuMxn/p4yfY3tVst0feMD2ncD4Qv/61GCdHy1phqTXJFWyvbFO0jOS5meyJwt7eGqmm57JZyTZf9PzZRnu0wnXJOnFJNsq6bCCX+MldRU3ebru7nT15K+7d+sdNmdJWlM01ojqBHpipns+kz+XZL9OzyMkdSfZN+vI5jWYhDNsz+3Fn8clje41UEnD8iAlvSDpK5JOkHSspJMlXSTp7kaBujori5KuM9kcImlLkk1OuGZJi5PsD2n8KzOfr2sQaK19QtK3U2DdhWBXSDqwt0C/lYGXF8EZ7txeAkXSzzP9uSlTqT2fkOHuSLJlSfbL9FyRNGoXgebjjUrXWR7s1BxTPIxOyviHIuKtBlv70Hyb19Hn18xpqWF7eUQsynR/T7/DXD3wRqfnhRHxQu+ny3aKiAURcbXtWZl4h9O8GGjfjO/uxfYFGd9UR/8P27WXdCbwhcTPZ8cE/fHkaBNwNduvnwdpfE/2Rs9kvHJFMdClGT8OGJArbfexfWNE5FfAEbYPzHERsSEiHkv88VTTQUiBZbTIdi39+2JE1K6J+wo4bJ9t+1KgX1GX9IOAL2Wip4uAfK2PK6zzZ1MlM0HS91PqZUlr8uS6WMmk9mUXSNLpdfbXPQXMEtstdXB/TvrXJN0m6VpJV0qaKOkHkl7JzLwr6dC8f72N3VF0sODI8+kEnpXJZtaxc2ih30bbA+rgringZtV5adi+vje/CkGeWezf6BS7RtJL2Z3WJek/tq+XtF/CHSTpAVevgeYGdr4j6cHU6taetj8q6e6Eudf2cQ1wZUmXSbpX1Rq1J5FJPi5Pk3R0vf5hN9zzLcBhttuADRGxhN4PqA+SBrhaTg61HcBqYEkqOOpSb4H+X9HeVi8fOtrpC8OHlTwjDqNEe1Q4yNBEE29jlsZEvwIQfpQmXmYkk/zvfezrHpN/HMNiIJMszgszmlaq6YuALrDZyjYeigO4MHQbbWzhFfryEp1cG5P8xD72f7fI0+LztPKb6EN/b6CCWUuwBdMSTQylTDW36gY3MbQUl3sz5hzE8BjAvzwjbndHnLSrgfY5lVlBHy7xakYhPhJBe1zldpo42hVOcRcvUgaLd6ObbT2nrn8aB9KP2XEQ43gHLO7BTIuJfmQfh7R71BGtbmJgTPAbAJ4eHTGESX6HBTHZo3tO3fia34qlnOlVfJcSxEDOjzJzuCWe8syYQke0Nx5l35FnxvGeET90My9TYbmnRe1zz5GUgOAJaHCP+pYYRxM/iVY+TiXJtrAeMxf4I/BoTPKSDyKQeuTpMZIyZ2HGY06LwZToAq9jOluZQhv9qPBa9GeA13N2TPYDDRMG/yz2jzamOvh6tNKXTqqfsAO8kU1US67HaGJelFnAFdUPV+8LdUS7gxMocQbmDMxx0UaZElACb2IxXVwXk/37hL+AQdzlNSymk5Exxdt2mRn55hhFM1OjxMW0sr2a7EP1KN8G7mI1YjElFiAWAYuixEr35fWosJ4r3LnLYG6NFjYx0GWGUaIdcyzBCMQoShwZLexPGejaPr63sBpxc4gfcZXX9/g8Pe6JgznPb3FpTPIdsAcpoKfHGJqZgjk/WunLtmzQJqqpR60ErwBbwcEazHrMGoJ1mE6CTQEVmxJBP0xfqnXvYIL+EQyiJbPVnZrTyy2Dt/Im5ldR4Sau8o5/Z3REO20s8ybuj8k+pybe41zXM2M4cDnioujDUTSngLvYXtNHaqXst5TJe4ylptRyvtavtnI2g0s8Dsymk7vi6uqX/p2oI65zmUuim7H5LO99Un9rtCBON5yL+BwwIlpT7lzJWs18o2FqgZdSQLVWAW9lI/AcwcMB9zPRzzSw0kOeEYfEStZwg3f4T/U9ql4iPItRmDGIMZiRBO2Ig6OZcs+yjkI3VQOiG9zNJkqsxLxK8CzBUwTzY4KX7TTc3nj4vpVpt0aLKxxAMJQKgxEDKRWKCLGFEmtpYRVreTemeKc/h94r+h92FS22aQ3okwAAAABJRU5ErkJggg=="
      }),
      a = bt(),
      r = bt(!1);
    var i;
    yn((() => {
      a.value = n.captcha
    }), null, i);
    const s = Rl((() => {
      let e = "";
      switch (n.captchaMode) {
        case "radio":
        default:
          e = "";
          break;
        case "onlyClick":
          e = "Only Click";
          break;
        case "onlyToken":
          e = "Only Token";
          break;
        case "comingSoon":
          e = "Coming Soon"
      }
      return e
    }));

    function u() {
      t("update:captcha", a.value), t("captchaChange")
    }

    function c(e) {
      a.value[e] = Math.floor(a.value[e]), Number(a.value[e]) < 0 && (a.value[e] = 0), u(), t("captchaChange")
    }
    return (t, n) => (Zo(), ol("div", {
      class: d(["captcha-container", {
        "captcha-coming-soon": "comingSoon" === e.captchaMode
      }])
    }, [dl(Vu, null, {
      default: nn((() => [cl("div", Rv, [dl(kv, {
        modelValue: a.value[e.enabledForCaptcha],
        "onUpdate:modelValue": [n[0] || (n[0] = t => a.value[e.enabledForCaptcha] = t), u],
        disable: e.disabled
      }, null, 8, ["modelValue", "disable"])]), dl(ku, null, {
        default: nn((() => [dl(xu, {
          class: "captcha-label-item"
        }, {
          default: nn((() => [cl("img", {
            class: "captcha-logo",
            src: l[e.captchaName],
            alt: ""
          }, null, 8, qv), cl("span", Vv, v(e.label), 1), e.isBeta ? (Zo(), ol("span", Mv, "Beta")) : vl("", !0)])),
          _: 1
        })])),
        _: 1
      }), cl("div", Fv, [
        ["onlyClick", "onlyToken", "comingSoon"].includes(e.captchaMode) ? (Zo(), ol("div", zv, [cl("span", null, v(kt(s)), 1)])) : (Zo(), ol("div", Pv, [dl(Av, {
          mode: a.value[`${e.captchaName}Mode`],
          "onUpdate:mode": n[1] || (n[1] = t => a.value[`${e.captchaName}Mode`] = t),
          onModeChange: u
        }, null, 8, ["mode"]), e.isCollapse ? (Zo(), ll(Tv, {
          key: 0,
          up: r.value,
          "onUpdate:up": n[2] || (n[2] = e => r.value = e)
        }, null, 8, ["up"])) : (Zo(), ol("div", Bv))]))
      ])])),
      _: 1
    }), e.isCollapse ? (Zo(), ll(_v, {
      key: 0,
      collapse: r.value
    }, {
      default: nn((() => [e.delayTime ? (Zo(), ol("div", Iv, [cl("span", null, v(kt(o)("delay")), 1), dl($f, {
        modelValue: a.value[`${e.captchaName}DelayTime`],
        "onUpdate:modelValue": n[3] || (n[3] = t => a.value[`${e.captchaName}DelayTime`] = t),
        outlined: "",
        type: "number",
        onBlur: n[4] || (n[4] = () => {
          c(`${e.captchaName}DelayTime`)
        })
      }, null, 8, ["modelValue"])])) : vl("", !0), e.repeatTimes ? (Zo(), ol("div", Nv, [cl("span", null, v(kt(o)("repeat")), 1), dl($f, {
        modelValue: a.value[`${e.captchaName}RepeatTimes`],
        "onUpdate:modelValue": n[5] || (n[5] = t => a.value[`${e.captchaName}RepeatTimes`] = t),
        outlined: "",
        type: "number",
        onBlur: n[6] || (n[6] = () => {
          c(`${e.captchaName}RepeatTimes`)
        })
      }, null, 8, ["modelValue"])])) : vl("", !0), to(t.$slots, "collapse", {}, void 0, !0)])),
      _: 3
    }, 8, ["collapse"])) : vl("", !0)], 2))
  }
}), [
  ["__scopeId", "data-v-2ce0b987"]
]);
const jv = e => (en("data-v-3f0ec77c"), e = e(), tn(), e),
  Dv = {
    class: "mt12 capsolver-card"
  },
  Hv = {
    class: "api-title"
  },
  Uv = jv((() => cl("div", {
    class: "text-title"
  }, [cl("img", {
    src: "assets/key.201fc3f4.svg",
    alt: ""
  }), cl("span", null, "API Key")], -1))),
  Wv = {
    class: "text-primary"
  },
  Kv = {
    class: "row items-center mt16"
  },
  Qv = {
    class: "text-title"
  },
  Gv = jv((() => cl("img", {
    src: "assets/balance.ec909fe5.svg",
    alt: ""
  }, null, -1))),
  Xv = {
    key: 1,
    class: "text-balance ml12"
  },
  Jv = {
    class: "mt12 capsolver-card"
  },
  Zv = {
    class: "text-title"
  },
  Yv = jv((() => cl("img", {
    src: "assets/lock.8b188c3a.svg",
    alt: ""
  }, null, -1))),
  em = {
    class: "mt12 captcha-settings capsolver-card"
  },
  tm = {
    class: "text-title"
  },
  nm = jv((() => cl("img", {
    src: "assets/settings.8bf367a7.svg",
    alt: ""
  }, null, -1))),
  om = {
    class: "setting-item"
  },
  lm = {
    class: "setting-item"
  },
  am = {
    class: "captcha-collapse-item"
  },
  rm = {
    class: "captcha-proxy-type"
  },
  im = {
    class: "captcha-proxy-host"
  },
  sm = jv((() => cl("span", null, "IP/Host", -1))),
  um = {
    class: "captcha-proxy-port"
  },
  cm = {
    class: "captcha-collapse-item"
  },
  dm = {
    class: "captcha-proxy-login"
  },
  pm = {
    class: "captcha-proxy-password"
  },
  fm = {
    class: "setting-item"
  },
  vm = {
    class: "captcha-collapse-item"
  },
  mm = {
    style: {
      color: "#999"
    }
  },
  hm = {
    class: "captcha-black-list mb16"
  },
  gm = {
    class: "captcha-black-url"
  },
  ym = ["onClick"],
  bm = [jv((() => cl("img", {
    src: "assets/Union.e4f5e32d.svg",
    alt: ""
  }, null, -1)))],
  _m = {
    class: "setting-item callback-fn"
  },
  wm = jv((() => cl("img", {
    src: "assets/question.6085c9ed.svg",
    alt: ""
  }, null, -1))),
  km = {
    class: "mt12 captcha-footer"
  },
  xm = {
    class: "captcha-support"
  },
  Sm = jv((() => cl("img", {
    src: "assets/tips.e99d9ebe.svg",
    alt: ""
  }, null, -1))),
  Cm = {
    class: "guide"
  };
var Em = qr(On({
  __name: "Config",
  async setup(e) {
    let t, n;
    const {
      t: o,
      locale: l
    } = gf(), a = ([t, n] = function(e) {
      const t = xl();
      let n = e();
      return Cl(), M(n) && (n = n.catch((e => {
        throw Sl(t), e
      }))), [n, () => Sl(t)]
    }((() => wu.getAll())), t = await t, n(), t), r = bt(a), {
      captchaList: i
    } = {
      captchaList: dv
    };
    async function s() {
      await wu.set(pt(r.value))
    }
    const u = bt((null == a ? void 0 : a.apiKey) || ""),
      c = bt(!1),
      p = bt(""),
      f = bt({
        balance: 0,
        packages: []
      });
    async function m() {
      if (r.value.apiKey !== u.value) {
        if (r.value.apiKey = u.value, c.value = !0, await s(), !r.value.apiKey) return f.value = {
          balance: 0,
          packages: []
        }, r.value = _u, void(c.value = !1);
        await h(), c.value = !1
      }
    }
    async function h() {
      c.value = !0;
      try {
        const e = await cv.API();
        f.value = await e.getBalance(), iv.info("balance: ", f.value)
      } catch (Om) {
        iv.error(Om)
      } finally {
        c.value = !1
      }
    }
    async function g() {
      p.value && (r.value.blackUrlList.unshift(p.value), await s(), p.value = "")
    }

    function y() {
      window.close()
    }

    function b() {
      0 !== u.value.length && (navigator.clipboard.writeText(u.value), mv({
        type: "success",
        message: o("copySuccess"),
        duration: 2e3
      }))
    }
    return Nn((() => {
      h()
    })), (e, t) => {
      var n;
      return Zo(), ol(Wo, null, [cl("div", Dv, [cl("div", Hv, [Uv, dl(yv, {
        href: kt(sv).getKey
      }, {
        default: nn((() => [cl("span", Wv, v(kt(o)("getKey")), 1)])),
        _: 1
      }, 8, ["href"])]), dl($f, {
        modelValue: u.value,
        "onUpdate:modelValue": t[0] || (t[0] = e => u.value = e),
        outlined: "",
        class: "mt8 api-key",
        placeholder: kt(o)("inputKey"),
        onBlur: t[1] || (t[1] = () => {
          m()
        })
      }, {
        append: nn((() => [cl("img", {
          src: "assets/copy.b3d46815.svg",
          class: d(["copy-key", {
            "copy-key--drop": 0 === u.value.length
          }]),
          onClick: b,
          alt: ""
        }, null, 2)])),
        _: 1
      }, 8, ["modelValue", "placeholder"]), cl("div", Kv, [cl("div", Qv, [Gv, cl("span", null, v(kt(o)("balance")) + ":", 1), c.value ? (Zo(), ll(Df, {
        key: 0,
        color: "primary",
        class: "ml12"
      })) : (Zo(), ol("span", Xv, "$" + v(((null == (n = f.value) ? void 0 : n.balance) || 0).toFixed(4)), 1))]), dl($s), dl(yv, {
        href: kt(sv).addFunds
      }, {
        default: nn((() => [dl(lv, {
          class: "btn-primary",
          "no-caps": "",
          unelevated: ""
        }, {
          default: nn((() => [fl("+ " + v(kt(o)("addFounds")), 1)])),
          _: 1
        })])),
        _: 1
      }, 8, ["href"])])]), cl("div", Jv, [cl("div", Zv, [Yv, cl("span", null, v(kt(o)("enabled")), 1)]), dl(av, {
        dense: "",
        class: "m-list"
      }, {
        default: nn((() => [(Zo(!0), ol(Wo, null, eo(kt(i), (e => (Zo(), ll($v, {
          key: e.key,
          captcha: r.value,
          "onUpdate:captcha": t[2] || (t[2] = e => r.value = e),
          label: e.label,
          "captcha-name": e.key,
          "enabled-for-captcha": e.enabledName,
          disabled: e.disabled,
          "is-collapse": e.isCollapse,
          "is-beta": e.isBeta,
          "captcha-mode": e.captchaMode,
          onCaptchaChange: s
        }, null, 8, ["captcha", "label", "captcha-name", "enabled-for-captcha", "disabled", "is-collapse", "is-beta", "captcha-mode"])))), 128))])),
        _: 1
      })]), cl("div", em, [cl("div", tm, [nm, cl("span", null, v(kt(o)("setting")), 1)]), dl(av, {
        dense: "",
        class: "m-list"
      }, {
        default: nn((() => [cl("div", om, [dl(Vu, null, {
          default: nn((() => [dl(ku, null, {
            default: nn((() => [dl(xu, null, {
              default: nn((() => [fl(v(kt(o)("manualSolving")), 1)])),
              _: 1
            })])),
            _: 1
          }), dl(ku, {
            side: ""
          }, {
            default: nn((() => [dl(vu, {
              modelValue: r.value.manualSolving,
              "onUpdate:modelValue": [t[3] || (t[3] = e => r.value.manualSolving = e), s]
            }, null, 8, ["modelValue"])])),
            _: 1
          })])),
          _: 1
        })]), cl("div", lm, [dl(Vu, null, {
          default: nn((() => [dl(ku, null, {
            default: nn((() => [dl(xu, null, {
              default: nn((() => [fl(v(kt(o)("proxy")), 1)])),
              _: 1
            })])),
            _: 1
          }), dl(ku, {
            side: ""
          }, {
            default: nn((() => [dl(vu, {
              modelValue: r.value.useProxy,
              "onUpdate:modelValue": [t[4] || (t[4] = e => r.value.useProxy = e), s]
            }, null, 8, ["modelValue"])])),
            _: 1
          })])),
          _: 1
        }), dl(_v, {
          collapse: r.value.useProxy
        }, {
          default: nn((() => [cl("div", am, [cl("div", rm, [cl("span", null, v(kt(o)("proxyType")), 1), dl(Od, {
            outlined: "",
            modelValue: r.value.proxyType,
            "onUpdate:modelValue": [t[5] || (t[5] = e => r.value.proxyType = e), s],
            options: ["http", "https", "socks4", "socks5"]
          }, null, 8, ["modelValue"])]), cl("div", im, [sm, dl($f, {
            modelValue: r.value.hostOrIp,
            "onUpdate:modelValue": t[6] || (t[6] = e => r.value.hostOrIp = e),
            outlined: "",
            placeholder: "Ip/Host",
            onBlur: t[7] || (t[7] = () => {
              s()
            })
          }, null, 8, ["modelValue"])]), cl("div", um, [cl("span", null, v(kt(o)("port")), 1), dl($f, {
            modelValue: r.value.port,
            "onUpdate:modelValue": t[8] || (t[8] = e => r.value.port = e),
            outlined: "",
            type: "number",
            placeholder: kt(o)("port"),
            onBlur: t[9] || (t[9] = () => {
              !async function(e) {
                r.value[e] = Math.floor(r.value[e]), Number(r.value[e]) < 0 && (r.value[e] = "port" === e ? "" : 0), await s()
              }("port")
            })
          }, null, 8, ["modelValue", "placeholder"])])]), cl("div", cm, [cl("div", dm, [cl("span", null, v(kt(o)("login")), 1), dl($f, {
            modelValue: r.value.proxyLogin,
            "onUpdate:modelValue": t[10] || (t[10] = e => r.value.proxyLogin = e),
            outlined: "",
            placeholder: kt(o)("loginName"),
            onBlur: t[11] || (t[11] = () => {
              s()
            })
          }, null, 8, ["modelValue", "placeholder"])]), cl("div", pm, [cl("span", null, v(kt(o)("password")), 1), dl($f, {
            modelValue: r.value.proxyPassword,
            "onUpdate:modelValue": t[12] || (t[12] = e => r.value.proxyPassword = e),
            outlined: "",
            placeholder: kt(o)("password"),
            onBlur: t[13] || (t[13] = () => {
              s()
            })
          }, null, 8, ["modelValue", "placeholder"])])])])),
          _: 1
        }, 8, ["collapse"])]), cl("div", fm, [dl(Vu, null, {
          default: nn((() => [dl(ku, null, {
            default: nn((() => [dl(xu, null, {
              default: nn((() => [fl(v(kt(o)("blackControl")), 1)])),
              _: 1
            })])),
            _: 1
          }), dl(ku, {
            side: ""
          }, {
            default: nn((() => [dl(vu, {
              modelValue: r.value.enabledForBlacklistControl,
              "onUpdate:modelValue": [t[14] || (t[14] = e => r.value.enabledForBlacklistControl = e), s]
            }, null, 8, ["modelValue"])])),
            _: 1
          })])),
          _: 1
        }), dl(_v, {
          collapse: r.value.enabledForBlacklistControl
        }, {
          default: nn((() => [cl("div", vm, [cl("span", mm, v(kt(o)("blackTip")), 1)]), cl("div", {
            class: d(["captcha-collapse-item captcha-black", `captcha-black--${kt(l)}`])
          }, [dl($f, {
            modelValue: p.value,
            "onUpdate:modelValue": t[15] || (t[15] = e => p.value = e),
            outlined: "",
            placeholder: "https://*.example.com"
          }, null, 8, ["modelValue"]), dl(lv, {
            class: "btn-primary",
            "no-caps": "",
            unelevated: "",
            onClick: g
          }, {
            default: nn((() => [fl(v(kt(o)("add")), 1)])),
            _: 1
          })], 2), cl("div", hm, [(Zo(!0), ol(Wo, null, eo(r.value.blackUrlList, ((e, t) => (Zo(), ol("div", {
            class: "captcha-black-urls",
            key: e + Date.now()
          }, [cl("div", gm, v(e), 1), cl("div", {
            class: "delete",
            onClick: e => async function(e) {
              r.value.blackUrlList.splice(e, 1), await s()
            }(t)
          }, bm, 8, ym)])))), 128))])])),
          _: 1
        }, 8, ["collapse"])]), cl("div", _m, [dl(Vu, null, {
          default: nn((() => [dl(ku, null, {
            default: nn((() => [dl(xu, null, {
              default: nn((() => [fl(v(kt(o)("solvedCallback")), 1)])),
              _: 1
            }), dl(yv, {
              href: kt(sv).instructions
            }, {
              default: nn((() => [wm])),
              _: 1
            }, 8, ["href"])])),
            _: 1
          }), dl(ku, {
            side: ""
          }, {
            default: nn((() => [dl($f, {
              modelValue: r.value.solvedCallback,
              "onUpdate:modelValue": t[16] || (t[16] = e => r.value.solvedCallback = e),
              outlined: "",
              placeholder: kt(o)("solvedCallbackPlaceholder"),
              onBlur: t[17] || (t[17] = () => {
                s()
              })
            }, null, 8, ["modelValue", "placeholder"])])),
            _: 1
          })])),
          _: 1
        })])])),
        _: 1
      })]), cl("div", km, [cl("div", xm, [Sm, dl(yv, {
        href: kt(sv).getKey
      }, {
        default: nn((() => [cl("span", Cm, v(kt(o)("guide")), 1)])),
        _: 1
      }, 8, ["href"])]), cl("div", null, [dl(lv, {
        class: "btn-primary",
        "no-caps": "",
        unelevated: "",
        style: {
          "background-color": "#fff",
          border: "none"
        },
        onClick: y
      }, {
        default: nn((() => [cl("span", null, v(kt(o)("close")), 1)])),
        _: 1
      })])])], 64)
    }
  }
}), [
  ["__scopeId", "data-v-3f0ec77c"]
]);
const Am = [{
  path: "/:catchAll(.*)*",
  component: () => l((() => import("./ErrorNotFound.76bd64c4.js")), [])
}, {
  path: "/popup",
  component: qf,
  redirect: {
    name: "popup"
  },
  children: [{
    path: "",
    name: "popup",
    component: On({
      __name: "index",
      setup: e => (Qn((e => {
        console.error("configError: ", e)
      })), (e, t) => (Zo(), ll(un, null, {
        fallback: nn((() => [fl(" Loading... ")])),
        default: nn((() => [dl(Em)])),
        _: 1
      })))
    })
  }]
}];
var Lm = function() {
  return ms({
    scrollBehavior: () => ({
      left: 0,
      top: 0
    }),
    routes: Am,
    history: di("")
  })
};
async function Tm({
  app: e,
  router: t,
  store: n
}, o) {
  let l = !1;
  const a = e => {
      if (l = !0, "string" == typeof e && /^https?:\/\//.test(e)) return void(window.location.href = e);
      const n = (e => {
        try {
          return t.resolve(e).href
        } catch (n) {}
        return Object(e) === e ? null : e
      })(e);
      null !== n && (window.location.href = n, window.location.reload())
    },
    r = window.location.href.replace(window.location.origin, "");
  for (let s = 0; !1 === l && s < o.length; s++) try {
    await o[s]({
      app: e,
      router: t,
      store: n,
      ssrContext: null,
      redirect: a,
      urlPath: r,
      publicPath: ""
    })
  } catch (i) {
    return i && i.url ? void a(i.url) : void console.error("[Quasar] boot error:", i)
  }!0 !== l && (e.use(t), chrome.runtime.id && setTimeout((() => {
    ! function() {
      const t = (e, t) => {
          const n = chrome.runtime.connect({
            name: "app:" + e
          });
          let o = !1;
          n.onDisconnect.addListener((() => {
            o = !0
          })), t(new Ia({
            listen(e) {
              n.onMessage.addListener(e)
            },
            send(e) {
              o || n.postMessage(e)
            }
          }))
        },
        n = e => {
          const n = chrome.devtools ? chrome.devtools.inspectedWindow.tabId : ba();
          t(n, e)
        };
      var o;
      o = t => {
        window.QBexBridge = t, e.config.globalProperties.$q.bex = window.QBexBridge, e.mount("#q-app")
      }, chrome.tabs && !chrome.devtools ? chrome.tabs.getCurrent((e => {
        e && e.id ? t(e.id, o) : n(o)
      })) : n(o)
    }()
  }), 300))
}(async function(e, t) {
  const n = e(Vr);
  n.use(Rr, t);
  const o = "function" == typeof Pr ? await Pr({}) : Pr;
  n.use(o);
  const l = ft("function" == typeof Lm ? await Lm({
    store: o
  }) : Lm);
  return o.use((({
    store: e
  }) => {
    e.router = l
  })), {
    app: n,
    store: o,
    router: l
  }
})(((...e) => {
  const t = va().createApp(...e),
    {
      mount: n
    } = t;
  return t.mount = e => {
    const o = function(e) {
      if (R(e)) {
        return document.querySelector(e)
      }
      return e
    }(e);
    if (!o) return;
    const l = t._component;
    O(l) || l.render || l.template || (l.template = o.innerHTML), o.innerHTML = "";
    const a = n(o, !1, o instanceof SVGElement);
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), a
  }, t
}), {
  config: {
    dark: !1
  }
}).then((e => {
  const [t, n] = void 0 !== Promise.allSettled ? ["allSettled", e => e.map((e => {
    if ("rejected" !== e.status) return e.value.default;
    console.error("[Quasar] boot error:", e.reason)
  }))] : ["all", e => e.map((e => e.default))];
  return Promise[t]([l((() => Promise.resolve().then((function() {
    return Cf
  }))), void 0)]).then((t => {
    const o = n(t).filter((e => "function" == typeof e));
    Tm(e, o)
  }))
}));
export {
  lv as Q, qr as _, cl as a, dl as b, ol as c, Zo as o
};