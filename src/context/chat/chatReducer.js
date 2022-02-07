import { types } from "../../types/types"

export const chatReducer = (state, action) => {
    switch (action.type) {

        case types.loadUsers:
            return {
                ...state,
                allPeople: action.payload
            }

        case types.loadMessages:
            if (action.payload.uid === state.activeChat) return state

            return {
                ...state,
                activeChat: action.payload.uid,
                messages: action.payload.messages
            }
        case types.saveMessage:
            if(action.payload.from === state.activeChat || action.payload.to === state.activeChat){
                return {
                    ...state,
                    messages: [...state.messages, action.payload]
                }
            }
            return state
        case types.logout:
            return {
                uid: "",
                activeChat: null,
                allPeople: [],
                messages: [],
              }
        default:
            return state
    }
}