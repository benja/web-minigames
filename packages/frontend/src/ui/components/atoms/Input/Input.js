var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
export function Input(props) {
    return (_jsx(StyledInput, { type: props.type || 'text', onChange: function (e) { return props.onChange(e.target.value); }, value: props.text, placeholder: props.placeholder }, void 0));
}
var StyledInput = styled.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  font-size: 14px;\n\n  padding: 10px 15px;\n  outline: none;\n  color: ", ";\n\n  border: 1px solid ", ";\n  background: ", ";\n"], ["\n  width: 100%;\n  font-size: 14px;\n\n  padding: 10px 15px;\n  outline: none;\n  color: ", ";\n\n  border: 1px solid ", ";\n  background: ", ";\n"])), function (props) { return props.theme.textPrimary; }, function (props) { return props.theme.textPrimary; }, function (props) { return props.theme.backgroundSecondary; });
var templateObject_1;
