/*! For license information please see main.90ec5ab74750c0c08da6.pack.js.LICENSE.txt */
(() => {
  'use strict';
  var r,
    e = {
      627: (r, e, t) => {
        var o = t(363),
          n = Symbol.for('react.element'),
          p = (Symbol.for('react.fragment'), Object.prototype.hasOwnProperty),
          s = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
          f = { key: !0, ref: !0, __self: !0, __source: !0 };
        e.jsx = function (r, e, t) {
          var o,
            a = {},
            c = null,
            l = null;
          for (o in (void 0 !== t && (c = '' + t),
          void 0 !== e.key && (c = '' + e.key),
          void 0 !== e.ref && (l = e.ref),
          e))
            p.call(e, o) && !f.hasOwnProperty(o) && (a[o] = e[o]);
          if (r && r.defaultProps) for (o in (e = r.defaultProps)) void 0 === a[o] && (a[o] = e[o]);
          return { $$typeof: n, type: r, key: c, ref: l, props: a, _owner: s.current };
        };
      },
      123: (r, e, t) => {
        r.exports = t(627);
      },
      363: (r) => {
        r.exports = React;
      },
    },
    t = {};
  (r = (function r(o) {
    var n = t[o];
    if (void 0 !== n) return n.exports;
    var p = (t[o] = { exports: {} });
    return e[o](p, p.exports, r), p.exports;
  })(123)),
    ReactDOM.render(
      (0, r.jsx)(function () {
        return (0, r.jsx)('div', { style: { color: 'red', border: '1px' }, children: '主页测试数据' });
      }, {}),
      document.getElementById('app')
    );
})();
//# sourceMappingURL=main.90ec5ab74750c0c08da6.pack.js.map
