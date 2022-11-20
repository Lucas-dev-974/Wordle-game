/* eslint-disable prettier/prettier */
export default{
    mounted(){
        document.addEventListener('DOMContentLoaded', () => {
            this.addEventListener()
        })
        
    },

    methods: {
        gameState: function(){
            return {
                ...this.$store.state.game_state
            }
        },
        
        // Ajoute un event click sur chanque key du clavier
        addEventListener: function(){
            let buttons = document.querySelectorAll('button')

            buttons.forEach(button => {
                
                button.addEventListener('click', (event) => {

                    // Si le boutton delete alors call action from storage
                    if(event.target.id == 'delete-btn'){
                        this.$store.dispatch('removeLastChar', '')
                    }if(event.target.id == 'enter-btn'){ // Si boutton entrer
                        this.$store.dispatch('CheckcWord', this.verifyWord)
                    }

                    // Ici on vérifie que le mot à taper fait mwin de 5 lettres pour ne pas écrire sur la ligne suivante
                    // Ensuite si c'est une lettre du clavien alors on ajoute une lettre la case et au mot à entrer
                    if(this.gameState().current_word.length < 5){
                        if(event.target.className.includes('keyboard-key')){
                            this.$store.dispatch('getCursorIndexInGrid', '');
                            this.$store.commit('appendToCurrentWord', {item: this.gameState().grid_items[this.gameState().index], value: button.textContent})  
                        }
                      
                    }

                })
                
            })   
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