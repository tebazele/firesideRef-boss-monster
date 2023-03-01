let money = 0;

const hero = {
    name: "Pikachu",
    damage: 5,
    health: 500,
    gold: 0,
    image: "pikachu.png"
}

const boss = {
    name: 'Big Boss',
    health: 1000,
    maxHealth: 1000,
    damage: 5,
    level: 1,
    image: "images/"
}

function drawHero() {
    let heroTemplate = '';
    heroTemplate += `<img src="images/${hero.image}" alt="hero pikachu" class="character-image">`

    document.getElementById('hero-container').innerHTML = heroTemplate;
}

function drawHeroStats() {
    let moneyElem = document.getElementById('money-elem');
    let heroHealthElem = document.getElementById('heroHealth-elem');
    let heroDamageElem = document.getElementById('heroDamage-elem');

    // @ts-ignore
    moneyElem.innerText = money;
    heroHealthElem.innerText = hero.health.toString();
    heroDamageElem.innerText = hero.damage.toString();

    if (hero.health <= 0) {
        stopInterval()
        setTimeout(() => {
            window.alert('Your pokemon fainted!')
        }, 200);
        document.getElementById('hero-container').classList.add('faint');
    }
}

function stopInterval() {
    clearInterval(bossInterval);

}

function drawBossStats() {
    let bossStatsTemplate = '';
    bossStatsTemplate += `<h2 class="m-0">${boss.name}</h2>
            <h2>${boss.health}</h2>
            
            <div class="progress" role="progressbar" aria-label="Danger striped progress bar" aria-valuenow="${boss.health / boss.maxHealth * 100}"
                aria-valuemin="0" aria-valuemax="${boss.maxHealth}">
                <div class="progress-bar progress-bar-striped bg-danger" style="width: ${boss.health / boss.maxHealth * 100}%"></div>
            </div>`

    document.getElementById('bossStats-container').innerHTML = bossStatsTemplate;

    if (boss.health <= 0) {
        stopInterval()
        setTimeout(() => {
            window.alert('You won!')
        }, 200);
    }
}



// SECTION game logic

function hitBoss() {
    if (boss.health > 0) {
        boss.health -= 5;
        money += 4;
        drawBossStats();
        drawHeroStats();
    }

}

// SECTION boss damage interval
let bossInterval = setInterval(() => {
    console.log('boss interval set')
    hero.health -= 50;
    drawHeroStats()

}, 3000)


// SECTION call draw functions on page load
drawHero()
drawHeroStats()
drawBossStats()

