/* eslint-disable prettier/prettier */
export const GameStorage =  {
    grid_items: [],
    words_list: ['anime', 'pomme', 'kayak', 'afpar', 'heure',],
    validated_words: [],

    selected_word: 'anime',
    current_word: '',
    index: 0,

    items_number: 30,
    width: 500,
    wordSize: 5
}

export const GameMutations = {
    // SET CURRENT WORD
    setCurrentWord: function(state, word){
        state.game_state.current_word = word
    },

    // SET THE SELECTED WORD FROM RANDOM CHOOSE IN THE WORDSLIST
    setSelectedWord: function(state, index){
        state.game_state.selected_word = state.game_state.words_list[index]
    },

    // PUSH NEW WORD INTO VALIDATED WORDS
    pushValidatedWord: function(state, word){
        state.game_state.validated_words.push(word)
    },
    
    // SET INTO GRID ITEMS THE DOM ELEMENTS CASE FROM THE GRID
    setGridItems: function(state, items){
        state.game_state.grid_items = items
    },

    // TO DEFINE THE POSITION IN THE ARRAY OF GRID ITEMS
    setIndex: function(state, index){
        state.game_state.index = index
    },

    // APPEND LETTER INTO THE CURRENT WORD
    appendToCurrentWord: function(state, data){
        data.item.textContent = data.value
        state.game_state.current_word += data.value
    },

    // DELETE THE LAST LETTER FROM CURRENT WORD
    removeToCurrentWord: function(state, value){
        state.game_state.current_word = state.game_state.current_word.substring(0, state.game_state.current_word.length - 1);
    }
}

export const GameActions = {
    getCursorIndexInGrid: function({commit, state}){
        let next = true
        state.game_state.grid_items.forEach((item, _index) => {
            if(next){
                if(item.textContent.length == 0){
                    commit('setIndex', _index)
                    next = false
                }
            }
        })
    },

    removeLastChar: function({commit, state}){
        let _index = 0;

        state.game_state.grid_items.forEach((item) => {
            // Select the last index of element where have content
            if(item.textContent.length > 0){
                _index = _index + 1
            }
                
        })

        // Si un ou pluseieurs mot sont valider cet variable va permettre de définir à partir de quel index dans le tableau il ne faux pas effectuer l'action effacer
        let dontRemoveUnderIndex = 0

        // Now we must check if one word was ever registered
        // Here we have an grid 5x6 so 30 items
        // Get the len of validated_words and multiply it to 5 to set the index on new
        if(state.game_state.validated_words.length > 0)
            dontRemoveUnderIndex = state.game_state.validated_words.length * 5
        
        _index = _index - 1
        if(_index  >= dontRemoveUnderIndex){
            commit('appendToCurrentWord', {value: '', item: state.game_state.grid_items[_index]})
            commit('removeToCurrentWord', {})
        }
    },

    CheckcWord: function({commit, state}, verifyWord){ 
        if(state.game_state.current_word.length < 5){
            alert('Veuillez completer la premiere ligne');
            return false;
        }
        if(!state.game_state.words_list.includes(state.game_state.current_word)){
            alert('Le mot n\'est pas dans la liste !')
            return false
        } 

        if(state.game_state.current_word != state.game_state.selected_word){
            verifyWord()
            alert('Le mot entrer new correspond pa, echec !')
            commit('pushValidatedWord', state.game_state.current_word)
            commit('setCurrentWord', '')
            
            return false
        }else{
            verifyWord()
            var textWrapper = document.querySelector('.ml12');
            textWrapper.style.display = 'block'
            textWrapper.textContent   = 'Bravo vous avez trouvez le bon mot !'
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

            _anime()
        }

        
    },

    changeBackgroundColor: function({commit,state}, data){
        data.item.style.backgroundColor = data.color
        data.item.classList.add('bg-anime')
    }
}

function _anime(){

    anime.timeline({loop: false})
    .add({
      targets: '.ml12 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i
    }).add({
      targets: '.ml12 .letter',
      translateX: [0,-30],
      opacity: [1,0],
      easing: "easeInExpo",
      duration: 1100,
      delay: (el, i) => 100 + 30 * i
    });
}