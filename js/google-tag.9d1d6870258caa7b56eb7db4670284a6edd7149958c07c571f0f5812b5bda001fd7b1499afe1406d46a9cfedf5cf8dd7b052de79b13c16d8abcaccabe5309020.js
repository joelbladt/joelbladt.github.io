(() => {
  // ns-params:@params
  var params_default = { googleAds: null, measurementId: "GTM-N5WS5ZVS" };

  // <stdin>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", /* @__PURE__ */ new Date());
  gtag("config", params_default.measurementId);
  if (typeof params_default.googleAds !== "undefined") {
    gtag("config", params_default.googleAds);
  }
})();
