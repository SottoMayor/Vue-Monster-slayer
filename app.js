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
            this.monsterHealth -= damageMonster;
            this.attackPlayer();
        },
        attackPlayer() {
            const damagePlayer = randomValues(8, 15);
            this.playerHealth -= damagePlayer;
        }
    }
}).mount('#game');