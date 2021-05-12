var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
export function Image(props) {
    return (_jsx(StyledImage, __assign({}, props, { onError: function (e) {
            // @ts-ignore
            e.target.onError = null;
            // @ts-ignore
            e.target.src = "";
        } }), void 0));
}
var StyledImage = styled.img(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  width: 100%;\n  user-select: none;\n"], ["\n  height: 100%;\n  width: 100%;\n  user-select: none;\n"])));
var templateObject_1;
