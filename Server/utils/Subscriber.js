const Subscriber = (function () {
    io = () => {
        const { io } = require('../app');
        return io;
    }
    return { get io() { return io() } };
})();

module.exports = Subscriber;