import { store } from './index';
import { connectSuccess } from './actions/socketActions';


export const initSubscriber = (socket) => {
    socket.on('connect', () => {
        store.dispatch(connectSuccess());
    });

    socket.on('subscribe', function(subscription){
        switch (subscription.type) {
            //Dispatch actions based on subscription type

            case 'USER_STORED':
                console.log(subscription.message);
        }
    })
}