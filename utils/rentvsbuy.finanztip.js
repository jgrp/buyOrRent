(this["webpackJsonpasset-service"] = this["webpackJsonpasset-service"] || []).push([[36],
  {
    1530: function (e, t, n) {
      "use strict";
      n.r(t), n.d(t, "default", function () {
        return m
      });
      var
        r, l = n(416), d = n(0);
      const c = .02, h = .26375;

      function s(e) {
        let t = arguments.length > 1 && void
          0 !== arguments[1] ? arguments[1] : 0;
        return new Array(e).fill(t)
      }

      function o(e) {
        return
        Math.pow(1 + e, 1 / 12) - 1
      }

      function i(e, t, n) {
        const a = function (e, t, n) {
          if (0 === n) return
          e;
          if (0 === t) return e / (12 * n);
          const s = o(t);
          return e * s / (1 - Math.pow(1 + s, -12 * n))
        }
        (e, t, n), i = s(12 * n + 1);
        i[0] = e;
        const r = o(t);
        for (let e = 1; e < i.length; e++) i[e] = i[e - 1] * (1 + r) -
          a;
        return {annuity: a, series: i}
      }

      function a(e, t, n) {
        const o = s(12 * n);
        o[0] = e;
        for (let
               e = 1; e < o.length; e++) o[e] = o[e - 1] * (1 + (e % 12 === 0 ? t : 0));
        return o
      }

      function u(e) {
        let {
          initialCapital: p, realEstatePrice: t, purchasingCost: d, increaseValuePerYear: E, fullDurat
          ionYears: n, financingInterest1: C, financingInterest2: x, firstDurationYears: w, monthlyRent: j, i
          ncreaseRentPerYear: g, yearlyMaintenance: v, investmentYield: b
        } = e;
        const l = Math.min(p, t *
          (1 + d)), y = function (e, t, n) {
          const i = s(12 * n + 1), a = o(t);
          i[0] = e;
          for (let
                 e = 1; e < i.length; e++) i[e] = i[e - 1] * (1 + a);
          return i
        }(t, E, n), _ = function (e, t, n) {
          return
          Math.max(e * (1 + n) - t, 0)
        }(t, l, d), r = function (e, t, n, o, a) {
          const c = n -
            a, l = i(e, t, n), r = l.series, d = i(r[r.length - 12 * c - 1], o, c), u = d.series;
          if (r[12 * a] !== u[0]) throw
          new Error("Head and tail mismatch");
          return {
            annuities:
              [...s(12 * a, l.annuity), ...s(12 * c, d.annuity)], series: [...r.slice(0, 12 * a + 1), ...u.slice(1)]
          }
        }
        (_, C, n, x, w), O = y.map((e, t) => e -
          r.series[t]), f = a(j, g, n), m = a(t * v / 12, c, n), u = r.annuities.map((e, t) => e + m[t] -
          f[t]), k = function (e, t, n) {
          const i = s(t.length + 1), a = o(n * (1 - h));
          i[0] = e;
          for (let
                 e = 0; e < t.length; e++) i[e + 1] = (i[e] + t[e]) * (1 + a);
          return i
        }
        (l, u, b);
        return {
          realEstateCredit: r, rents: f, maintenance: m, savings: u, homeOwnerEquity: O, rente
          rEquity: k
        }
      }

      r = n(31);

      function m() {
        const e = Object(d.useCallback)(e => u(e), []);
        return
        Object(r.jsx)(l.RentBuyMvp, {onCalculate: e})
      }
    }
  }])