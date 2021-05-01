/// <reference types="socket.io-client" />
export declare function useGameActions(): {
    login: (data: {
        username: string;
    }) => SocketIOClient.Socket | undefined;
};
