const randomValues = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
}

Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
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
        }
    },
    computed: {
        damagePlayerStyle(){
            return { width: this.playerHealth.toString() + '%' }
        },
        damageMonsterStyle(){
            return { width: this.monsterHealth.toString() + '%' }
        }
    }
}).mount('#game');