(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3296:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Inter_9c9965', '__Inter_Fallback_9c9965'","fontStyle":"normal"},
	"className": "__className_9c9965",
	"variable": "__variable_9c9965"
};


/***/ }),

/***/ 7608:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__sfPro_e3af5c', '__sfPro_Fallback_e3af5c'"},
	"className": "__className_e3af5c",
	"variable": "__variable_e3af5c"
};


/***/ }),

/***/ 5366:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MyApp)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/@next/font/local/target.css?{"path":"pages/_app.tsx","import":"","arguments":[{"src":"../styles/SF-Pro-Display-Medium.otf","variable":"--font-sf"}],"variableName":"sfPro"}
var SF_Pro_Display_Medium_otf_variable_font_sf_variableName_sfPro_ = __webpack_require__(7608);
var SF_Pro_Display_Medium_otf_variable_font_sf_variableName_sfPro_default = /*#__PURE__*/__webpack_require__.n(SF_Pro_Display_Medium_otf_variable_font_sf_variableName_sfPro_);
// EXTERNAL MODULE: ./node_modules/@next/font/google/target.css?{"path":"pages/_app.tsx","import":"Inter","arguments":[{"variable":"--font-inter","subsets":["latin"]}],"variableName":"inter"}
var _app_tsx_import_Inter_arguments_variable_font_inter_subsets_latin_variableName_inter_ = __webpack_require__(3296);
var _app_tsx_import_Inter_arguments_variable_font_inter_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(_app_tsx_import_Inter_arguments_variable_font_inter_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(6764);
// EXTERNAL MODULE: external "react-wrap-balancer"
var external_react_wrap_balancer_ = __webpack_require__(5420);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: external "@onflow/fcl"
var fcl_ = __webpack_require__(5820);
;// CONCATENATED MODULE: ./flow/config.ts
// @ts-expect-error: no typings

(0,fcl_.config)({
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
    "0xMetronome": "0xf72c6cd48b64d09b",
    "0xFungibleToken": "0x9a0766d93b6608b7",
    "0xFlowToken": "0x7e60df042a9c0868",
    "0xUsdcToken": "0xa983fecbed621163"
});

;// CONCATENATED MODULE: ./pages/_app.tsx







function MyApp({ Component , pageProps: { ...pageProps }  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_wrap_balancer_.Provider, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: external_classnames_default()((SF_Pro_Display_Medium_otf_variable_font_sf_variableName_sfPro_default()).variable, (_app_tsx_import_Inter_arguments_variable_font_inter_subsets_latin_variableName_inter_default()).variable),
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
}


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 5820:
/***/ ((module) => {

"use strict";
module.exports = require("@onflow/fcl");

/***/ }),

/***/ 9003:
/***/ ((module) => {

"use strict";
module.exports = require("classnames");

/***/ }),

/***/ 5420:
/***/ ((module) => {

"use strict";
module.exports = require("react-wrap-balancer");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5366));
module.exports = __webpack_exports__;

})();