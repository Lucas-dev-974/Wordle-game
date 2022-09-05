import { createStore } from "vuex";
import {GameStorage, GameMutations, GameActions} from './game-state.js'

const store = createStore({
    state(){
        return {
            game_state: {...GameStorage}

        }
    },

    mutations: {
        ...GameMutations,

    },

    actions: {
        ...GameActions,
    }
})

export default store