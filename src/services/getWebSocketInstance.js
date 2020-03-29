export const waitForSocketConnection = (socket, callback) => {
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                if (callback != null) {
                    callback();
                }
            }
            else {
                waitForSocketConnection(socket, callback);
            }
        }, 5); // wait 5 milisecond for the connection...
}


class SocketClient {
    createInstance(name, token) {
        return new WebSocket(`ws://192.168.0.38:8000/new/${name}/${token}`);
    }
    getInstance(name, token) {
        if (!this.socket) {
            this.socket = this.createInstance(name, token);
        }
        return this.socket;
    }
    deleteInstance() {
        this.socket = null;
    }
}

const socket = new SocketClient();
export default socket;
