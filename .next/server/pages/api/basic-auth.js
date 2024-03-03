"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/basic-auth";
exports.ids = ["pages/api/basic-auth"];
exports.modules = {

/***/ "(api)/./src/pages/api/basic-auth.ts":
/*!*************************************!*\
  !*** ./src/pages/api/basic-auth.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nfunction handler(_, res) {\n    res.setHeader(\"WWW-authenticate\", 'Basic realm=\"Secure Area\"');\n    res.statusCode = 401;\n    res.end(`Auth Required.`);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2Jhc2ljLWF1dGgudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUVlLFNBQVNBLFFBQVFDLENBQWlCLEVBQUVDLEdBQW9CO0lBQ3JFQSxJQUFJQyxTQUFTLENBQUMsb0JBQW9CO0lBQ2xDRCxJQUFJRSxVQUFVLEdBQUc7SUFDakJGLElBQUlHLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQztBQUMxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2twaS1tYXN0ZXIvLi9zcmMvcGFnZXMvYXBpL2Jhc2ljLWF1dGgudHM/MTRjNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlcihfOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpIHtcclxuICByZXMuc2V0SGVhZGVyKCdXV1ctYXV0aGVudGljYXRlJywgJ0Jhc2ljIHJlYWxtPVwiU2VjdXJlIEFyZWFcIicpXHJcbiAgcmVzLnN0YXR1c0NvZGUgPSA0MDFcclxuICByZXMuZW5kKGBBdXRoIFJlcXVpcmVkLmApXHJcbn1cclxuIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJfIiwicmVzIiwic2V0SGVhZGVyIiwic3RhdHVzQ29kZSIsImVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/basic-auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/basic-auth.ts"));
module.exports = __webpack_exports__;

})();