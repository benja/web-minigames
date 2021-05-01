"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGameActions = void 0;
const react_1 = require("react");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
function useGameActions() {
    const socketRef = react_1.useRef(null);
    react_1.useEffect(() => {
        socketRef.current = socket_io_client_1.default('http://localhost:8080');
        return () => {
            socketRef.current?.disconnect();
        };
    }, [socketRef]);
    return {
        login: (data) => socketRef.current?.emit('login', data),
    };
}
exports.useGameActions = useGameActions;
