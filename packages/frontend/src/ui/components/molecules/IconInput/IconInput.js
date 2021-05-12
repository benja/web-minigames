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
import { Icon, Input } from '../../atoms';
export function IconInput(props) {
    return (_jsxs(Container, __assign({ onSubmit: function (e) {
            e.preventDefault();
            props.onSubmit();
        } }, { children: [_jsx(Input, { text: props.text, onChange: props.onChange ? props.onChange : function () { } }, void 0),
            _jsx(IconContainer, __assign({ onClick: props.onClick }, { children: _jsx(Icon, { icon: props.icon, tooltip: props.iconTooltip }, void 0) }), void 0)] }), void 0));
}
var Container = styled.form(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n\n  > input {\n    border-width: 1px 0 1px 1px;\n    border-radius: 5px 0 0 5px;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n\n  > input {\n    border-width: 1px 0 1px 1px;\n    border-radius: 5px 0 0 5px;\n  }\n"])));
var IconContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 10px 15px;\n  border: 1px solid lightgray;\n  border-width: 1px 1px 1px 0;\n\n  border-radius: 0 5px 5px 0;\n"], ["\n  padding: 10px 15px;\n  border: 1px solid lightgray;\n  border-width: 1px 1px 1px 0;\n\n  border-radius: 0 5px 5px 0;\n"])));
var templateObject_1, templateObject_2;
