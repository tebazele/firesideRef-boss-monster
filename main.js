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

const companions = [
    {
        name: "Mew",
        image: "mew.png",
        price: 100,
        damage: 5,
        quantity: 0
    },
    {
        name: "Squirtle",
        image: "squirtle.png",
        price: 150,
        damage: 10,
        quantity: 0
    },
    {
        name: "Evee",
        image: "evee.png",
        price: 300,
        damage: 15,
        quantity: 0
    }
]

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
        clearInterval(bossInterval);
        // clearInterval(mewInterval)
        // setTimeout(() => {
        //     window.alert('Your pokemon fainted!')
        // }, 200);
        document.getElementById('hero-container').classList.add('faint');
    }




}



function drawBossStats() {
    let bossStatsTemplate = '';
    bossStatsTemplate += `<h2 class="m-0">${boss.name}</h2>
            <h2>${boss.health}</h2>
            
            <div class="progress" role="progressbar" aria-label="Danger striped progress bar" aria-valuenow="${Math.round(boss.health / boss.maxHealth * 100)}"
                aria-valuemin="0" aria-valuemax="${boss.maxHealth}">
                <div class="progress-bar progress-bar-striped bg-danger" style="width: ${Math.round(boss.health / boss.maxHealth * 100)}%"></div>
            </div>`

    document.getElementById('bossStats-container').innerHTML = bossStatsTemplate;
}



function drawCompanions() {
    let companionTemplate = '';

    companions.forEach(companion => {
        companionTemplate += `<div class="py-4">
                    <div class="d-flex align-items-center">
                        <img src="images/${companion.image}" alt="mew companion" class="companion-icon pe-3">
                        <button class="btn btn-light">Add Mew</button>
                    </div>
                    <div class="p-1 mt-1">
                        <span>🪙 ${companion.price}</span>
                        <br>
                        <span>+${companion.damage} damage</span>

                    </div>
                </div>`
    })
    document.getElementById('companions-container').innerHTML = companionTemplate;
}



// SECTION game logic

function hitBoss() {
    boss.health -= 5;
    money += 5;
    drawBossStats();
    drawHeroStats();
}

function addMew() {
    if (money >= 100) {
        let mew = companions.find(c => c.name == "Mew");
        mew.quantity++
        money -= 100;
        let mewInterval = setInterval(() => {

            boss.health -= mew.quantity * mew.damage
            console.log('mew interval set. Damage:', mew.quantity * mew.damage)
            drawBossStats()
        }, 2000)

        if (hero.health <= 0) {
            clearInterval(mewInterval)
        }
        drawHeroStats();
    }
}


// SECTION boss damage interval
let bossInterval = setInterval(() => {
    console.log('boss interval set')
    hero.health -= 50;
    drawHeroStats()

}, 2000)

// SECTION companions damage interval

// let companionsInterval = setInterval(() => {

//     let totalDamage = 0
//     companions.forEach(c => {
//         totalDamage += c.damage * c.quantity
//     })
//     console.log('companion interval set', totalDamage)
//     boss.health -= totalDamage;
// }, 2000)

// SECTION call draw functions on page load
drawHero()
drawHeroStats()
drawBossStats()
// drawCompanions()
