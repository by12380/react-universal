const initialState = {
    connectSuccess: false,
    joinRoomSuccess: false
}

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        
    case 'CONNECT_SUCCESS':
        return {
            ...state,
            connectSuccess: true,
        }

    case 'JOIN_ROOM_SUCCESS':
        return {
            ...state,
            joinRoomSuccess: true
        }
    
    default:
        return state;

    }
}

export default socketReducer;