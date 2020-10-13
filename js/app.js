new Vue({
    el: "#app",
    data: {
        firstPlayer: 0,
        monsterPlayer: 0,
        gameIsRunning: false,
        messages: []
    },
    methods: {
        gameStart: function () {
            this.firstPlayer = 100;
            this.monsterPlayer = 100;
            this.gameIsRunning = true;
            this.messages = [];
        },
        attack: function () {
            let damage = this.calcAttack(3, 10);
            this.messages.unshift({
                isPlayer: true,
                text: `You Start Power with ${damage} bullets !`
            });
            this.monsterPlayer -= damage;
            this.checkGame();

            this.monsterAttack();

        },
        specialAttack: function () {
            let damage = this.calcAttack(5, 18);
            this.messages.unshift({
                isPlayer: true,
                text: `You Start Power with ${damage} bullets !`
            });
            this.monsterPlayer -= damage;
            this.checkGame();

            this.monsterAttack();
            console.log(this.messages);
        },
        heal: function () {
            
            this.messages.unshift({
                isPlayer: true,
                text: `Accept Your HEALTH 10 !`
            });
            if(this.firstPlayer <= 90){
                this.firstPlayer +=10;
            }else{
                this.firstPlayer = 100;
            }

            this.firstPlayer -= this.calcAttack(2,15);
        },
        giveUp: function () {
            this.firstPlayer = 0;
            this.monsterPlayer = 0;
            this.gameIsRunning = false;
            this.messages = [];
        },
        calcAttack: function (min, max) {
            return Math.floor(Math.max((Math.random() * max) + 1, min));
        },
        monsterAttack: function () {
            let damage = this.calcAttack(4, 19);
            this.messages.unshift({
                isPlayer: false,
                text: `Monster Start Power with ${damage} bullets !`
            });
            this.firstPlayer -= damage;

        },
        checkGame: function () {
            if (this.monsterPlayer <= 0) {
                if (confirm('YOU WIN | START AGAIN ? ')) {
                    this.giveUp();
                }
                return false;
            } else if (this.firstPlayer <= 0) {
                if (confirm('YOU LOSE | START AGAIN ? ')) {
                    this.giveUp();
                }
                return false;
            }
        }
    },
});