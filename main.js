let money = 0;

const hero = {
    name: "Pikachu",
    damage: 5,
    health: 500,
    image: "pikachu.png"
}

const boss = {
    name: 'Big Boss',
    health: 1000,
    maxHealth: 1000,
    damage: 5,
    level: 1,
    image: "dragon.png"
}

// const mew = {
//     name: 'Mew',
//     image: 'mew.png',
//     price: 100,
//     damage: 10,
//     level: 1
// }

const companions = [
    {
        name: "Mew",
        image: "mew.png",
        price: 100,
        damage: 10,
        level: 1
    },
    {
        name: "Squirtle",
        image: "squirtle.png",
        price: 150,
        damage: 15,
        level: 1
    },
    {
        name: "Evee",
        image: "evee.png",
        price: 300,
        damage: 20,
        level: 1
    }
]

function drawHero() {
    let heroTemplate = `<img src="images/${hero.image}" alt="hero pikachu" class="character-image">`

    document.getElementById('hero-container').innerHTML = heroTemplate;
}

function drawHeroStats() {
    let moneyElem = document.getElementById('money-elem');
    let heroHealthElem = document.getElementById('heroHealth-elem');
    let heroDamageElem = document.getElementById('heroDamage-elem');

    // @ts-ignore
    moneyElem.innerText = money;
    // @ts-ignore
    heroHealthElem.innerText = hero.health.toString();
    // @ts-ignore
    heroDamageElem.innerText = hero.damage.toString();

    if (hero.health <= 0) {
        stopInterval()
        setTimeout(() => {
            window.alert('Your pokemon fainted!')
        }, 200);
        document.getElementById('hero-container').classList.add('faint');
    }
}

function drawBossStats() {
    let bossStatsTemplate = '';
    // NOTE reference for progress bar
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
// NOTE write resuable code!
// function addMew() {
//     if (money >= 100) {
//         money -= 100;
//         drawHeroStats();
//         // NOTE don't do this -- not ideal
//         // let mewInterval = setInterval(() => {
//         //     boss.health -= mew.damage
//         //     console.log('mew interval set. Damage:', mew.damage);
//         //     drawBossStats()
//         // }, 2000)
//     }
// }
// NOTE takes in a name 
function addCompanion(name) {
    console.log(name)
    let currentCompanion = companions.find(companion => companion.damage == name);
    if (money >= currentCompanion.price) {
        currentCompanion.level++
        money -= currentCompanion.price;
        drawHeroStats();
    }
}

// NOTE takes in multiple arguments (probably not necessary, but possible)
// function addCompanion(name, damage, price, level) {
//     console.log(name, damage, price, level)
//     let currentCompanion = companions.find(companion => companion.damage == name);
//     if (money >= price) {
//         currentCompanion.level++
//         money -= price;
//         drawHeroStats();
//     }
// }

// SECTION boss damage interval
let bossInterval = setInterval(() => {
    console.log('boss interval set')
    hero.health -= 50;
    drawHeroStats()

}, 3000)

let companionsInterval = setInterval(() => {
    let totalDamage = 0;
    companions.forEach(c => {
        totalDamage += c.damage * c.level
    })
    console.log('companion interval set. Damage: ', totalDamage);
    boss.health -= totalDamage;
    drawBossStats()

}, 2000)

function stopInterval() {
    clearInterval(bossInterval);
    clearInterval(companionsInterval);
}


// SECTION call draw functions on page load
drawHero()
drawHeroStats()
drawBossStats()


