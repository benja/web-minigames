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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { Text } from '../../atoms';
export function Card(props) {
    return (_jsxs(StyledCard, __assign({ onClick: props.onClick }, { children: [_jsxs(CardHeaderContent, { children: [props.header && _jsx(Text, __assign({ header: true }, { children: props.header }), void 0),
                    props.subHeader && _jsx(Text, { children: props.subHeader }, void 0)] }, void 0),
            _jsx(CardContent, { children: props.children }, void 0)] }), void 0));
}
var CardContent = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 5px 0;\n"], ["\n  padding: 5px 0;\n"])));
var CardHeaderContent = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n\n  width: 100%;\n  height: fit-content;\n"], ["\n  display: flex;\n  flex-direction: column;\n\n  width: 100%;\n  height: fit-content;\n"])));
var StyledCard = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 15px;\n\n  position: relative;\n  border-radius: 10px;\n\n  background: ", ";\n\n  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.19);\n\n  height: 100%;\n  width: 100%;\n\n  margin: 10px 0;\n\n  display: flex;\n  flex-direction: column;\n\n  user-select: none;\n\n  transition: 0.1s ease-in-out;\n  &:active {\n    transform: ", ";\n  }\n  &:hover {\n    cursor: ", ";\n  }\n"], ["\n  padding: 15px;\n\n  position: relative;\n  border-radius: 10px;\n\n  background: ", ";\n\n  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.19);\n\n  height: 100%;\n  width: 100%;\n\n  margin: 10px 0;\n\n  display: flex;\n  flex-direction: column;\n\n  user-select: none;\n\n  transition: 0.1s ease-in-out;\n  &:active {\n    transform: ", ";\n  }\n  &:hover {\n    cursor: ", ";\n  }\n"])), function (props) { return props.theme.backgroundSecondary; }, function (props) { return props.onClick && 'scale(0.98)'; }, function (props) { return props.onClick && 'pointer'; });
var templateObject_1, templateObject_2, templateObject_3;
