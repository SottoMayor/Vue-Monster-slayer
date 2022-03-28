const randomValues = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
}

Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            rounds: 0,
            whoWon: '',
            logs: []
        }
    },
    methods: {
        attackMonster() {
            const damageMonster = randomValues(5, 12);

            let message;
            message = `The player attacks the player with ${damageMonster} of damage!`
            this.logs.push(message);

            if(damageMonster > this.monsterHealth){
                this.monsterHealth = 0;
            }else{
                this.monsterHealth -= damageMonster;
            }

            this.attackPlayer();
        },
        attackPlayer() {
            const damagePlayer = randomValues(8, 15);

            let message;
            message = `The monster attacks the player with ${damagePlayer} of damage!`
            this.logs.push(message);

            if(damagePlayer > this.playerHealth){
                this.playerHealth = 0;
            }else{
                this.playerHealth -= damagePlayer;
            }
        },
        specialAttackMonster() {
            if(this.rounds % 4 !== 0) return console.log('Not Allowed!');

            const damageMonster = randomValues(10, 20);

            let message;
            message = 'Special attack! ' + damageMonster + ' less monster health.'
            this.logs.push(message);

            if(damageMonster > this.monsterHealth){
                message = 'The monster is dead!'
                this.logs.push(message);

                this.monsterHealth = 0;
            }else{
                this.monsterHealth -= damageMonster;
            }

            this.attackPlayer();

        },
        healPlayer() {
            const healValue = randomValues(8, 20);

            const message = `The player healed ${healValue} units of life.`
            this.logs.push(message);

            if(healValue + this.playerHealth > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue; 
            }

            this.attackPlayer()
        },
        restartGame() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.rounds = 0
            this.whoWon = '',
            this.logs = []
        },
        surrender() {
            const message = 'The player surrendered!'
            this.logs.push(message);

            this.whoWon = 'monster'
            this.playerHealth = 0
        }
    },
    computed: {
        damagePlayerStyle(){
            this.rounds++;
            console.log(this.rounds);
            return { width: this.playerHealth.toString() + '%' }
        },
        damageMonsterStyle(){
            return { width: this.monsterHealth.toString() + '%' }
        },
        buttonDisabledCondition(){
            return this.rounds % 4 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                message = 'Draw!'
                this.logs.push(message);

                this.whoWon = 'draw';
                return console.log('Draw!')
            }else if(value <= 0){
                message = 'The monster won!'
                this.logs.push(message);

                this.whoWon = 'monster';
                return console.log('The player lost!')
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                message = 'Draw!'
                this.logs.push(message);

                this.whoWon = 'draw';
                return console.log('Draw!')
            }else if(value <= 0){
                message = 'The player won!'
                this.logs.push(message);

                this.whoWon = 'player';
                return console.log('The monster lost!')
            }
        },
    }
}).mount('#game');