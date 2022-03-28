const randomValues = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
}

Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            rounds: 0,
            whoWon: ''
        }
    },
    methods: {
        attackMonster() {
            const damageMonster = randomValues(5, 12);
            if(damageMonster > this.monsterHealth){
                this.monsterHealth = 0;
            }else{
                this.monsterHealth -= damageMonster;
            }

            this.attackPlayer();
        },
        attackPlayer() {
            const damagePlayer = randomValues(8, 15);
            if(damagePlayer > this.playerHealth){
                this.playerHealth = 0;
            }else{
                this.playerHealth -= damagePlayer;
            }
        },
        specialAttackMonster() {
            if(this.rounds % 4 !== 0) return console.log('Not Allowed!');

            const damageMonster = randomValues(10, 20);
            if(damageMonster > this.monsterHealth){
                this.monsterHealth = 0;
            }else{
                this.monsterHealth -= damageMonster;
            }

            this.attackPlayer();

        },
        healPlayer() {
            const healValue = randomValues(8, 20);
            if(healValue + this.playerHealth > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue; 
            }

            this.attackPlayer()
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
                this.whoWon = 'draw';
                return console.log('Draw!')
            }else if(value <= 0){
                this.whoWon = 'monster';
                return console.log('The player lost!')
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.whoWon = 'draw';
                return console.log('Draw!')
            }else if(value <= 0){
                this.whoWon = 'player';
                return console.log('The monster lost!')
            }
        },
    }
}).mount('#game');