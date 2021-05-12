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
export function Text(props) {
    if (props.header) {
        return _jsx(StyledBold, __assign({}, props, { children: props.children }), void 0);
    }
    else {
        return _jsx(StyledText, __assign({}, props, { children: props.children }), void 0);
    }
}
var StyledText = styled.p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n\n  font-size: ", "px;\n  color: ", ";\n"], ["\n  margin: 0;\n  padding: 0;\n\n  font-size: ", "px;\n  color: ", ";\n"])), function (props) { var _a; return (_a = props.fontSize) !== null && _a !== void 0 ? _a : 16; }, function (props) { return props.theme.textPrimary; });
var StyledBold = styled.b(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n\n  font-size: ", "px;\n  color: ", ";\n"], ["\n  margin: 0;\n  padding: 0;\n\n  font-size: ", "px;\n  color: ", ";\n"])), function (props) { var _a; return (_a = props.fontSize) !== null && _a !== void 0 ? _a : 16; }, function (props) { return props.theme.textPrimary; });
var templateObject_1, templateObject_2;
