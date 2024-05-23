(function(w, d) {
    zaraz.debug = (eS = "") => {
        document.cookie = `zarazDebug=${eS}; path=/`;
        location.reload()
    };
    window.zaraz._al = function(eh, ei, ej) {
        w.zaraz.listeners.push({
            item: eh,
            type: ei,
            callback: ej
        });
        eh.addEventListener(ei, ej)
    };
    zaraz.preview = (ek = "") => {
        document.cookie = `zarazPreview=${ek}; path=/`;
        location.reload()
    };
    zaraz.i = function(eJ) {
        const eK = d.createElement("div");
        eK.innerHTML = unescape(eJ);
        const eL = eK.querySelectorAll("script");
        for (let eM = 0; eM < eL.length; eM++) {
            const eN = d.createElement("script");
            eL[eM].innerHTML && (eN.innerHTML = eL[eM].innerHTML);
            for (const eO of eL[eM].attributes) eN.setAttribute(eO.name, eO.value);
            d.head.appendChild(eN);
            eL[eM].remove()
        }
        d.body.appendChild(eK)
    };
    zaraz.f = async function(eP, eQ) {
        const eR = {
            credentials: "include",
            keepalive: !0,
            mode: "no-cors"
        };
        if (eQ) {
            eR.method = "POST";
            eR.body = new URLSearchParams(eQ);
            eR.headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        return await fetch(eP, eR)
    };
    ! function(eT, eU, eV, eW, eX, eY) {
        function eZ(fa, fb) {
            eY ? eW(fa, fb || 32) : eX.push(fa, fb)
        }

        function e_(fc, fd, fe, ff) {
            return fd && eU.getElementById(fd) || (ff = eU.createElement(fc || "SCRIPT"), fd && (ff.id = fd), fe && (ff.onload = fe), eU.head.appendChild(ff)), ff || {}
        }
        eY = /p/.test(eU.readyState), eT.addEventListener("on" + eV in eT ? eV : "load", (function() {
            for (eY = 1; eX[0];) eZ(eX.shift(), eX.shift())
        })), eZ._ = e_, eT.defer = eZ, eT.deferscript = function(fg, fh, fi, fj) {
            eZ((function() {
                e_("", fh, fj).src = fg
            }), fi)
        }
    }(this, d, "pageshow", setTimeout, []);
    defer((function() {
        for (; zaraz.deferred.length;) zaraz.deferred.pop()();
        Object.defineProperty(zaraz.deferred, "push", {
            configurable: !0,
            enumerable: !1,
            writable: !0,
            value: function(...fk) {
                let fl = Array.prototype.push.apply(this, fk);
                for (; zaraz.deferred.length;) zaraz.deferred.pop()();
                return fl
            }
        })
    }), 5500);
    addEventListener("visibilitychange", (function() {
        for (; zaraz.deferred.length;) zaraz.deferred.pop()()
    }));
    window.zaraz._p = async a => new Promise((b => {
        if (a) {
            a.e && a.e.forEach((c => {
                try {
                    new Function(c)()
                } catch (d) {
                    console.error(`Error executing script: ${c}\n`, d)
                }
            }));
            Promise.allSettled((a.f || []).map((e => fetch(e[0], e[1]))))
        }
        b()
    }));
    zaraz.pageVariables = {};
    zaraz.track = async function(eo, ep, eq) {
        return new Promise(((er, es) => {
            const et = {
                name: eo,
                data: {}
            };
            for (const eu of [localStorage, sessionStorage]) Object.keys(eu || {}).filter((ew => ew.startsWith("_zaraz_"))).forEach((ev => {
                try {
                    et.data[ev.slice(7)] = JSON.parse(eu.getItem(ev))
                } catch {
                    et.data[ev.slice(7)] = eu.getItem(ev)
                }
            }));
            Object.keys(zaraz.pageVariables).forEach((ex => et.data[ex] = JSON.parse(zaraz.pageVariables[ex])));
            //
            et.data = { ...et.data,
                ...ep
            };
            et.zarazData = zarazData;
            fetch("/cdn-cgi/zaraz/t", {
                credentials: "include",
                keepalive: !0,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(et)
            }).catch((() => {
                console.warn("Large event payload sent to Cloudflare Zaraz, cannot assure deliverability.");
                return fetch("/cdn-cgi/zaraz/t", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(et)
                })
            })).then((function(ez) {
                zarazData._let = (new Date).getTime();
                ez.ok || es();
                return 204 !== ez.status && ez.json()
            })).then((async ey => {
                await zaraz._p(ey);
                "function" == typeof eq && eq()
            })).finally((() => er()))
        }))
    };
    zaraz.set = function(eA, eB, eC) {
        try {
            eB = JSON.stringify(eB)
        } catch (eD) {
            return
        }
        prefixedKey = "_zaraz_" + eA;
        sessionStorage.removeItem(prefixedKey);
        localStorage.removeItem(prefixedKey);
        delete zaraz.pageVariables[eA];
        if (void 0 !== eB) {
            eC && "session" == eC.scope ? sessionStorage.setItem(prefixedKey, eB) : eC && "page" == eC.scope ? zaraz.pageVariables[eA] = eB : localStorage.setItem(prefixedKey, eB);
            zaraz.__watchVar = {
                key: eA,
                value: eB
            }
        }
    };
    for (const {
            m: eE,
            a: eF
        } of zarazData.q.filter((({
            m: eG
        }) => ["debug", "set"].includes(eG)))) zaraz[eE](...eF);
    for (const {
            m: eH,
            a: eI
        } of zaraz.q) zaraz[eH](...eI);
    delete zaraz.q;
    delete zarazData.q;
    zaraz.fulfilTrigger = function(dH, dI, dJ, dK) {
        zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
        zaraz.__zarazTriggerMap[dH] || (zaraz.__zarazTriggerMap[dH] = "");
        zaraz.__zarazTriggerMap[dH] += "*" + dI + "*";
        zaraz.track("__zarazEmpty", { ...dJ,
            __zarazClientTriggers: zaraz.__zarazTriggerMap[dH]
        }, dK)
    };
    window.dataLayer = w.dataLayer || [];
    zaraz._processDataLayer = fp => {
        for (const fq of Object.entries(fp)) zaraz.set(fq[0], fq[1], {
            scope: "page"
        });
        if (fp.event) {
            if (zarazData.dataLayerIgnore && zarazData.dataLayerIgnore.includes(fp.event)) return;
            let fr = {};
            for (let fs of dataLayer.slice(0, dataLayer.indexOf(fp) + 1)) fr = { ...fr,
                ...fs
            };
            delete fr.event;
            fp.event.startsWith("gtm.") || zaraz.track(fp.event, fr)
        }
    };
    const fo = w.dataLayer.push;
    Object.defineProperty(w.dataLayer, "push", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: function(...ft) {
            let fu = fo.apply(this, ft);
            zaraz._processDataLayer(ft[0]);
            return fu
        }
    });
    dataLayer.forEach((fv => zaraz._processDataLayer(fv)));
    zaraz._cts = () => {
        zaraz._timeouts && zaraz._timeouts.forEach((fw => clearTimeout(fw)));
        zaraz._timeouts = []
    };
    zaraz._rl = function() {
        w.zaraz.listeners && w.zaraz.listeners.forEach((fx => fx.item.removeEventListener(fx.type, fx.callback)));
        window.zaraz.listeners = []
    };
    history.pushState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.pushState.apply(history, arguments);
            setTimeout((() => {
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.track("__zarazSPA")
            }), 100)
        }
    };
    history.replaceState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.replaceState.apply(history, arguments);
            setTimeout((() => {
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.track("__zarazSPA")
            }), 100)
        }
    };
    zaraz._p({
        "e": ["(function(w,d){w.zarazData.executed.push(\"Pageview\");})(window,document)"]
    })
})(window, document);