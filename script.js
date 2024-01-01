const playButton = document.querySelector('.play');
const saveButton = document.querySelector('.save');
const resetButton = document.querySelector('.reset');
const minute = document.querySelector('.text-minute')
const second = document.querySelector('.text-second');
const msSecond = document.querySelector('.text-ms');
const saves = document.querySelector('.saves');

let saveItem = 0
let isReset = false
let isPlay = false;
let timerId = undefined

const toggleButton = () => {
    saveButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}

function play() {

    localStorage.getItem('watch') 
    console.log(localStorage)

    localStorage.setItem('watch', JSON.stringify(` ${minute.value} ${second.value} ${msSecond.value}`))
    console.log(minute.value, second.value, msSecond.value)


   
    

    this.timerId = setTimeout(function time() {
        
        msSecond.value++
        if (msSecond.value.length < 2) {
            msSecond.value = '0' + msSecond.value
        }
        if (msSecond.value == 100) {
            msSecond.value = '00'
            second.value++
            if (second.value.length < 2) {
                second.value = '0' + second.value
            }
            if (second.value == 60) {
                second.value = '00'
                minute.value++
            }
            if (minute.value.length < 2) {
                minute.value = '0' + minute.value
            }
            if (minute.value == 60) {
                setTimeout(function() {
                    clearInterval(this.timerId)
                },0)
                
            }
        }
        this.timerId = setTimeout(time, 10)
    },10) 
    toggleButton()
}

const save = () => {
    const li = document.createElement('li');
    const number = document.createElement('span')
    const timeStamp = document.createElement('span');
    li.setAttribute('class', 'save-item');
    number.setAttribute('class', 'number')
    timeStamp.setAttribute('class', 'time-stamp')

    number.innerText = `${++saveItem} .`
    timeStamp.innerHTML = `${minute.value} : ${second.value} : ${msSecond.value}`

    li.append(number, timeStamp);
    saves.append(li)
}

function reset(){
    

    playButton.innerText = 'play'
    setTimeout(function() {
        clearInterval(this.timerId)
    },0)
    
    isReset = true
    saveButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    second.value = '00';
    msSecond.value = '00';
    minute.value = '00';
}
function checkStatus () {
    if(playButton.innerText == 'play') {
        play()
        playButton.innerText = 'pause'
    }
    else if(playButton.innerText == 'pause') {
        playButton.innerText = 'run'
        setTimeout(function() {
            clearInterval(this.timerId)
        },0)
    }
    else if (playButton.innerText == 'run') {
        playButton.innerText = 'pause'
        play()
    }
}

playButton.addEventListener('click', checkStatus);
resetButton.addEventListener('click', reset);
saveButton.addEventListener('click', save)

