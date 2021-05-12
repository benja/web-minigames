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
export function Avatar(props) {
    return (_jsx(Wrapper, __assign({ active: props.active }, { children: _jsx(StyledAvatar, { src: props.image }, void 0) }), void 0));
}
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  \n  background: red;\n\n  border-radius: 50%;\n\n  transition: transform 0.2s ease-in-out;\n  &:hover {\n    cursor: pointer;\n  }\n  &:active {\n    transform: scale(0.95);\n  }\n"], ["\n  display: flex;\n  \n  background: red;\n\n  border-radius: 50%;\n\n  transition: transform 0.2s ease-in-out;\n  &:hover {\n    cursor: pointer;\n  }\n  &:active {\n    transform: scale(0.95);\n  }\n"])));
var StyledAvatar = styled.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 35px;\n  height: 35px;\n  \n  border-radius: 50%;\n  \n  user-select: none;\n"], ["\n  width: 35px;\n  height: 35px;\n  \n  border-radius: 50%;\n  \n  user-select: none;\n"])));
var templateObject_1, templateObject_2;
