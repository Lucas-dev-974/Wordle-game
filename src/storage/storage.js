import { createStore } from "vuex";
import { GameStorage, GameMutations, GameActions } from "./game-state.js";
  
const store = createStore({
    state(){
        return {
            game_state: {...GameStorage},
            notif: {
                on: false,
                message: '',
                color: null
            }
        }
    },

    mutations: {
        ...GameMutations,

        notif: function(state, notif_infos){
            state.notif.on = notif_infos.on
            state.notif.message = notif_infos.message
            state.notif.color   = notif_infos.color

            setInterval(() => {
                state.notif.on = false
            }, 5000)
        }
    },

    actions: {
        ...GameActions,
    }
})

export default store