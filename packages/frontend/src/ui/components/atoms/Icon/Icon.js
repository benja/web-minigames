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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { useTheme } from 'styled-components';
import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
export function Icon(props) {
    var theme = useTheme();
    useEffect(function () {
        ReactTooltip.rebuild();
    });
    return (_jsx(StyledIcon, __assign({ "data-tip": props.tooltip, "data-for": 'wmg' }, { children: _jsx(FontAwesomeIcon, __assign({}, props, { color: theme.textPrimary }), void 0) }), void 0));
}
var StyledIcon = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  transition: 0.2s ease-in-out;\n\n  &:active {\n    transform: scale(1.2);\n  }\n\n  &:hover {\n    cursor: pointer;\n  }\n"], ["\n  transition: 0.2s ease-in-out;\n\n  &:active {\n    transform: scale(1.2);\n  }\n\n  &:hover {\n    cursor: pointer;\n  }\n"])));
var templateObject_1;
