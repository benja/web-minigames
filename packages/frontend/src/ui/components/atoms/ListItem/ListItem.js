var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
export function ListItem(props) {
    return (_jsx(Container, { children: props.children }, void 0));
}
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  \n  width: 100%;\n"], ["\n  display: flex;\n  flex-direction: row;\n  \n  width: 100%;\n"])));
var templateObject_1;
