/* eslint-disable prettier/prettier */
import Notif from '../Notif.vue'

export default{
    components: {
        Notif,
    },
    
    mounted(){
        
        this.GenerateGrid('grid-5x6')
        this.EventListenersSetup()
        this.SelectWordInWordsList(1, this.gameState().grid_items.length)
    },

    methods: {
        gameState: function(){
            return { ...this.$store.state.game_state}
        },

        SelectWordInWordsList: function(minimum){
            let index = Math.floor(Math.random() * (this.gameState().words_list.length + (minimum - 1))) + minimum;
            
            this.$store.commit('setSelectedWord', index)

        },

        GenerateGrid: function(containerid){
            let container = document.getElementById(containerid)

            for(let iterations = 1; iterations <= this.gameState().items_number; iterations++){
                let item = document.createElement('div')
                item.classList.add('cell')
                container.appendChild(item)
            }
        },

        EventListenersSetup: function(){
            document.addEventListener('DOMContentLoaded', () => {
                // Get items of the grid from document and set it to the store game_state
                this.$store.commit('setGridItems', document.querySelectorAll('.cell'))
            });
    
            document.addEventListener('keyup', (key_event) => {
                if(key_event.code == 'Backspace') 
                    this.removeLastChar();
            });
            
            document.addEventListener('keypress', (key_event) => {
                this.getCursorIndexInGrid(); 
                
                
                if(key_event.code == 'Enter') 
                    this.CheckcWord();
                
                if((key_event.code.includes('Key') || key_event.code == 'Semicolon')  && this.gameState().current_word.length < this.gameState().wordSize) 
                    this.setItemValue(this.gameState().grid_items[this.gameState().index], key_event.key);
            });
        },

        getCursorIndexInGrid: function(){
            this.$store.dispatch('getCursorIndexInGrid', '');
        },

        CheckcWord: function(){
            this.$store.dispatch('CheckcWord', this.verifyWord)
        },

        setItemValue: function(item, value){
            this.$store.commit('appendToCurrentWord', {value: value, item: item})
        },

        removeLastChar: function(){
            this.$store.dispatch('removeLastChar')
        },
        
        verifyWord: function(){
            // Get  current_word:c_word and selected_word:s_word
            let c_word = this.gameState().current_word.split('');
            let s_word = this.gameState().selected_word.split('')
            
            let buffer_index = this.gameState().index - 5   

            c_word.forEach((letter, index) => {  
                if(c_word[index] == s_word[index]){
                    this.$store.dispatch('changeBackgroundColor', {item: this.gameState().grid_items[buffer_index + index], color: 'green'})
                    c_word[index] = '*'
                    s_word[index] = '*'
                }else if(s_word.includes(c_word[index]) && this.gameState().current_word.indexOf(letter) < index){
                    this.$store.dispatch('changeBackgroundColor', {item: this.gameState().grid_items[buffer_index + index], color: 'orange'})
                }
            });
        }
    }
}