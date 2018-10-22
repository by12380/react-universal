/* Subscriber exposes initialized socket.io instance to
external modules by dynamically importing it from 'app.js'
by calling 'Subscriber.io' */

const Subscriber = (function () {
    io = () => {
        const { io } = require('../app');
        return io;
    }

    return { get io() { return io() } };
})();

module.exports = Subscriber;