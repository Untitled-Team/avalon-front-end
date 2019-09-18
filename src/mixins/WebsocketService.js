export default {
    methods: {
        sendObj: function (socket, message) {
            socket.sendObj(message)
        }
    }
};