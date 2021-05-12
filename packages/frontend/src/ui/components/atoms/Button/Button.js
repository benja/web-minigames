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
import styled from 'styled-components';
export function Button(props) {
    return (_jsx(StyledButton, __assign({ onClick: props.onClick, type: props.type }, { children: props.text }), void 0));
}
var StyledButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 1px solid ", ";\n  background: ", ";\n  color: ", ";\n\n  width: 100%;\n\n  padding: 10px 15px;\n  border-radius: 10px;\n\n  &:focus {\n    outline: none;\n  }\n\n  &:hover {\n    cursor: pointer;\n  }\n"], ["\n  border: 1px solid ", ";\n  background: ", ";\n  color: ", ";\n\n  width: 100%;\n\n  padding: 10px 15px;\n  border-radius: 10px;\n\n  &:focus {\n    outline: none;\n  }\n\n  &:hover {\n    cursor: pointer;\n  }\n"])), function (props) { return props.theme.textPrimary; }, function (props) { return props.theme.backgroundSecondary; }, function (props) { return props.theme.textPrimary; });
var templateObject_1;
