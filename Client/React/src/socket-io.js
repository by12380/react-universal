import { store } from './';

export const configSocketIO = (socket, options) => {
    socket.on('connect', () => {
        socket.emit('room', options.user_id);
    })
  
    socket.on('sync', function(subscription) {
        switch (subscription.type) {
            //Dispatch redux action here by case
        }
    });
}