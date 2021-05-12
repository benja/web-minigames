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
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import { Text } from '../../atoms';
export function MessageBox(props) {
    var ref = useRef();
    useEffect(function () {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [props.messages]);
    return (_jsx(Container, __assign({ ref: ref }, { children: props.messages.map(function (m, index) { return (_jsxs(MessageContainer, { children: [_jsx(Avatar, { name: m.username.split(/(?=[A-Z])/).join(' '), size: "25", round: "5px" }, void 0),
                _jsxs(Text, __assign({ header: true, style: { marginLeft: 5 } }, { children: [m.username, ":"] }), void 0),
                _jsx(Text, __assign({ style: { marginLeft: 5 } }, { children: m.message }), void 0)] }, "message-" + m + "-" + index)); }) }), void 0));
}
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 1px solid ", ";\n  border-radius: 5px;\n  height: 250px;\n  flex-grow: 1;\n  margin-top: 10px;\n  padding: 0.5rem;\n  overflow-y: scroll;\n"], ["\n  border: 1px solid ", ";\n  border-radius: 5px;\n  height: 250px;\n  flex-grow: 1;\n  margin-top: 10px;\n  padding: 0.5rem;\n  overflow-y: scroll;\n"])), function (props) { return props.theme.textPrimary; });
var MessageContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 10px;\n"], ["\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 10px;\n"])));
var templateObject_1, templateObject_2;
