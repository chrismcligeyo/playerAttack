new Vue({
    el: '#app',

    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false // track if game is running or not. Initially we dont have a running game, see if we should start a new game button or display attack buttons
    }

});