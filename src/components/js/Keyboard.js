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
        
        addEventListener: function(){
            let buttons = document.querySelectorAll('button')

            buttons.forEach(button => {
                // console.log(button);
                button.addEventListener('click', (event) => {
                    if(this.gameState().current_word.length < 5){
                        console.log(event);
                        if(event.target.id == 'delete-btn'){
                            this.$store.dispatch('removeLastChar', '')
                        }else if(event.target.id == 'enter-btn'){

                        }else{
                            this.$store.dispatch('getCursorIndexInGrid', '');
                            this.$store.commit('appendToCurrentWord', {item: this.gameState().grid_items[this.gameState().index], value: button.textContent})  
                        }
                      
                    }

                })
                
            })   
        }
    }
}