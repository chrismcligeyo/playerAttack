new Vue({
    el: '#app',

    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false, // track if game is running or not. Initially we dont have a running game, see if we should start a new game button or display attack buttons
        turns: []
    },

    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []; // clears li items

        },

        attack: function () {
            /* //code was like this previously, refactored it using calculateDamage function
            let max = 10; //max damage
            let min =3;
            let damage = Math.max(Math.floor(Math.random() * max) + 1, min);//means get the highest value(max) of random numbers between 10 and 3
            this.monsterHealth -= damage; */
            let damage = this.calculateDamage(3,10);
            //refactored
            this.monsterHealth -= damage;
            // let damage = this.calculateDamage(3, 10);
            // this.monsterHealth -= damage;

             this.turns.unshift({
               isPlayer: true,
               text: "Player hit Monster for " + damage
            });


            //after dealing damage to the monster check if we won
            if (this.checkIfWon()){
                return; //so as not to execute code anymore. code in

            }

            this.monsterAttacks();

            /*  //after dealing damage to the monster check if we won //has been refactored above with chckIfWon function
            if(this.monsterHealth <= 0) { // means if you beat the monster
                alert('You won');
                this.gameIsRunning = false; //game is reset to start game
                return; //this prevents code below from being executed while above is done. we dont want the monster to continue damaging us because we won Nd the game is over. so return stops the code from running at that point
            }*/

           /* //how code looked before being refactored
            max = 12;
            min = 5;
            damage = Math.max(Math.floor(Math.random() * max) + 1, min);//means get the highest value(max) of random numbers between 10 and  3
            this.playerHealth -= damage;
            */

           // this.playerHealth -= this.calculateDamage(5,12);
           //
           // this.checkIfWon();

           /* //has been refactored above
            if(this.playerHealth <= 0) { // means if you beat the monster
                alert('You lost');
                this.gameIsRunning = false;
                // dont need a return here, because no code after if
            } */
        },
        specialAttack: function () {
            let damage = this.calculateDamage(10,20);

            this.monsterHealth -= damage;
            // let damage = this.calculateDamage(3, 10);
            // this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hit Monster for " + damage
            });

            //after dealing damage to the monster check if we won
            if (this.checkIfWon()){
                return; //so as not to execute code anymore. code in

            }
            this.monsterAttacks();
            // this.playerHealth -= this.calculateDamage(5,12);
            //
            // this.checkIfWon(); //the two :: this.playerHealth -= this.calculateDamage(5,12);
            //             //
            //             // this.checkIfWon refACTORED TO THIS.MONSTER ATTACKS



        },
        heal: function () {
            // // to heal increase playerhealth by ten
            // this.playerHealth += 10;
            //when you heal, you can heal passed 100% to avoid, do below
            if(this.playerHealth <= 90){
                this.playerHealth +=10;

            } else {
                this.playerHealth =100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Player heals for 10"
            });

            this.monsterAttacks();

        },

        giveUp: function () {
            this.gameIsRunning = false;

        },

        monsterAttacks: function(){
            let damage = this.calculateDamage(5,12);
          this.playerHealth -= damage;
            this.checkIfWon();
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits player for " + damage
            });
        },

        calculateDamage: function(min, max) {
            return  Math.max(Math.floor(Math.random() * max) + 1, min);//means get the highest value(max) of random numbers between 10 and 3
        },

        checkIfWon: function() {

            if (this.monsterHealth <= 0) { // means if you beat the monster
                if (confirm('You won! Start New Game')) { //when user click okay run function below
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You Lost! Start New Game?")) {
                    this.startGame();

                } else {
                    this.gameIsRunning = false; // same game is running to false
                }

                return true;
            }

            return false;
            // alert('You won');
            // this.gameIsRunning = false; //game is reset to start game
        }


        }






});