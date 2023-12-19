import { LifeControl } from '../../classes/LifeControl.js'
import { Enemies } from '../../classes/Enemies.js'
import { BackgroundAnimation } from '../../classes/BackgroundAnimation.js'


var bottom
var isJumping 
let vel
let direction_x
let position_x 
let position_y
var life_percentage
var array_health_bottles

var interval_game_loop;
var current_level = 1
var level_duration
var position_pointer

var enemy_speed
var cure_bottle_speed

var interval_mountain
var interval_cloud
var interval_Enemies

var life_bar = document.querySelector('.life-bar')
var life_bar_color = document.querySelector('.life-bar-color')
var map_container = document.querySelector('.map-position-container')
var map_position_pointer = document.querySelector('.map-position-pointer')
const obj = document.querySelector('.character')
const container = document.querySelector('.game-container')

const next_level_screen = document.querySelector('.next-level')
const btn_next_level = document.querySelector('.next-level-btn')
const btn_novoJogo = document.querySelector('#start')
const btn_sobre = document.querySelector('#sobre')
const sobre_screen = document.querySelector('.sobre-screen')
const btn_voltar = document.querySelector('.sobre-screen-h1-2')

const btn_tutorial = document.querySelector('.buttons-tutorial')

const menu = document.querySelector('.menu-screen')

const map_pointer = document.querySelector('.map-position-pointer')
const btn_new_game = document.querySelector('#btn-new-game')
const game_over_screen = document.querySelector('.game-over')
var container_uhd = document.querySelector('.life-map-container')

document.addEventListener('keydown', teclaDw)
document.addEventListener('keyup', teclaUp)


//================== SOUNDS ======================================
const jump_sound = new Howl({
    src: ['./assets/sounds/jump.mp3'],
    volume: 0.1
});
const soundtrack_sound = new Howl({
    src: ['./assets/sounds/soundtrack.mp3'],
    loop: true,
    volume: 0.3
});



//================== EVENT LISTENERS ========================================
btn_novoJogo.addEventListener('click', () => {

    container_uhd.style.display = 'flex'
    start_game()

})
btn_sobre.addEventListener('click', () => {
    sobre_screen.style.display = 'block'
})
btn_voltar.addEventListener('click', () => {
    sobre_screen.style.display = 'none'
})
btn_new_game.addEventListener('click', () => window.location.reload())

btn_next_level.addEventListener('click', () => {

    if (current_level === 1 ) {

        current_level++
    
        Enemies.delete_all_enemies(current_level)
        BackgroundAnimation.delete_all_clouds()
        BackgroundAnimation.delete_all_mountains()
        BackgroundAnimation.hide_flag()
    
        next_level_screen.style.display = 'none'
    
        map_pointer.style.left = 0
    
        array_health_bottles = [1, 1, 1]
        life_percentage = 100
        life_bar_color.style.width = `${life_percentage}%`
    
        start_game()

    } else if (current_level === 2) {
        window.location.reload()
    }

})



//================== CHARACTER MOVIMENT ===========================
function jump() {
    if (isJumping) return
    jump_sound.play()
    let intervalUp = setInterval(() => {//going up
        if (bottom > 230) {
            clearInterval(intervalUp)
            let intervalDown = setInterval(() => { //going down
                if (bottom <= 35) {
                    obj.classList.remove('character-jumping')
                    clearInterval(intervalDown)
                    isJumping = false
                }
                bottom -= 5
                obj.style.bottom = `${bottom}px`
            }, 10)
        }
        isJumping = true
        bottom += 30
        obj.style.bottom = `${bottom}px`
    }, 20)
}
function teclaDw(e) {
    if (e.key == ' ') {
        jump()
        obj.classList.add('character-jumping')
        //  Sounds.jump_sounds.play()
    } else if (e.key == 'ArrowLeft') {
        obj.classList.add('character-flipped')
        direction_x = 0
        direction_x = -1
    } else if (e.key == 'ArrowRight') {
        obj.classList.remove('character-flipped')
        direction_x = 0
        direction_x = 1
    }
}
function teclaUp(e) {
    if (e.key == 'ArrowLeft') {
        direction_x = 0
    } else if (e.key == 'ArrowRight') {
        direction_x = 0
    }
}




//==================== GAME FUNCTIONS ==============================
function start_game() {
    bottom = 0
    position_x = 100
    position_pointer = 0
    direction_x = 0
    isJumping = false
    position_y = 0
    life_percentage = 100
    array_health_bottles = [1, 1, 1]
    level_duration = 290
    enemy_speed = 4
    vel = 10
    cure_bottle_speed = 7
 

    //Display initial amount of health bottles
    LifeControl.update_bottle_display(array_health_bottles)

    reset_styles()

    //Sets game appeareance according to the current level
    BackgroundAnimation.changeScenario(current_level)

    //These function auto-call themselves randomly
    create_enemy()
    create_cloud()
    create_mountain()

    //Initiates game loop
    interval_game_loop = setInterval(game_loop, 20)

    soundtrack_sound.play()

}
function game_loop() {

    //Updates character's movement
    position_y = obj.offsetTop + 50
    position_x += direction_x * vel
    obj.style.left = `${position_x}px`
    //====================================================================



    //Blocks character from going outside the game container
    if (obj.offsetLeft <= container.offsetLeft) {
        position_x = 0
    } else if (obj.offsetLeft + 120 >= container.offsetLeft + 1000) {
        position_x = container.offsetLeft + 680
    }
    //====================================================================



    //Moves level pointer
    position_pointer += 0.1
    map_position_pointer.style.left = `${position_pointer}px`
    //====================================================================



    //ENEMY CONTROL
    let enemy_custom_class

    if (current_level === 1) {
        enemy_custom_class = '.enemyClass'
    } else if (current_level === 2) {
        enemy_custom_class = '.enemyClass2'
    }

    const total_enemies = document.querySelectorAll(enemy_custom_class)

    if (total_enemies) {

        //Moves enemy
        for (let i = 0; i < total_enemies.length; i++) {
            let pos_x_enemy = total_enemies[i].offsetLeft
            pos_x_enemy -= enemy_speed
            total_enemies[i].style.left = pos_x_enemy + 'px'

            //Checks for colision
            if (
                ((obj.offsetTop <= (total_enemies[i].offsetTop + 60)) &&//Cima personagem com baixo frasco
                    ((obj.offsetTop + 60) >= (total_enemies[i].offsetTop))) &&//Baixo personagem com cima frasco
                ((obj.offsetLeft + 100 >= (total_enemies[i].offsetLeft)) &&//Direita personagem com esquerda frasco
                    ((obj.offsetLeft) <= (total_enemies[i].offsetLeft + 90)))//Esquerda personagem com direita inimigo
            ) {

                //Hit detected
                life_percentage -= 20
                life_bar_color.style.width = `${life_percentage}%`
                total_enemies[i].remove()


                //Gives cure on 40% health
                if (life_percentage === 40) {

                    if (array_health_bottles.length > 0) {

                        array_health_bottles.splice(0, 1)
                        LifeControl.update_bottle_display(array_health_bottles)

                        LifeControl.create_cure_bottle()
                    }
                }

                //Ends game on 0% health
                if (life_percentage <= 0) {
                    game_over()
                }
            }

            //Removes enemy on container border
            if (total_enemies[i].offsetLeft + 50 <= container.offsetLeft) {
                total_enemies[i].remove()
            }
        }
    }
    //====================================================================



    //HEALTH CONTROL
    const cure_bottle = document.getElementsByClassName('blood-regen')
    if (cure_bottle) {

        for (let x = 0; x < cure_bottle.length; x++) {
            let bottlePosition = cure_bottle[x].offsetLeft
            bottlePosition -= cure_bottle_speed
            cure_bottle[x].style.left = `${bottlePosition}px`

            //Checks for colision between heealth bottle and main character
            if (
                ((obj.offsetTop <= (cure_bottle[x].offsetTop + 60)) &&//Cima personagem com baixo frasco
                    ((obj.offsetTop + 120) >= (cure_bottle[x].offsetTop))) &&//Baixo personagem com cima frasco
                ((obj.offsetLeft + 120 >= (cure_bottle[x].offsetLeft)) &&//Direita personagem com esquerda frasco
                    ((obj.offsetLeft) <= (cure_bottle[x].offsetLeft + 55)))//Esquerda personagem com direita inimigo
            ) {
                cure_bottle[x].remove()

                life_percentage = 100
                life_bar_color.style.width = `${life_percentage}%`

                //
            }

            //Deletes health bottle outside game container
            if (cure_bottle[x]) {
                if (cure_bottle[x].offsetLeft < container.offsetLeft) {
                    cure_bottle[x].remove()
                }
            }

        }
    }




    //====================================================================



    //CLOUDS CONTROL
    const cloudTotal = document.getElementsByClassName('cloud')
    for (let x = 0; x < cloudTotal.length; x++) {
        if (cloudTotal[x]) {
            let cloudPosition = cloudTotal[x].offsetLeft
            cloudPosition -= 1
            cloudTotal[x].style.left = `${cloudPosition}px`

            if (cloudTotal[x].offsetLeft < container.offsetLeft - 150) {
                cloudTotal[x].remove()
            }
        }
    }
    //====================================================================



    //MOUNTAIN CONTROL
    const mountainTotal = document.getElementsByClassName('mountains')
    for (let x = 0; x < mountainTotal.length; x++) {
        if (mountainTotal[x]) {
            let mountainPosition = mountainTotal[x].offsetLeft
            mountainPosition -= 1

            mountainTotal[x].style.left = `${mountainPosition}px`

            if (mountainTotal[x].offsetLeft + 300 <= container.offsetLeft) {
                mountainTotal[x].remove()
            }
        }
    }
    //====================================================================



    //  LEVEL ENDING
    if (position_pointer >= level_duration) {

        BackgroundAnimation.show_flag(current_level)

        clearInterval(interval_game_loop)
        clearInterval(interval_cloud)
        clearInterval(interval_mountain)
        clearInterval(interval_Enemies)
        soundtrack_sound.stop()
    }
    //====================================================================




}
function reset_styles() {
    menu.style.display = 'none'
    game_over_screen.style.display = 'none'

    btn_tutorial.style.display = 'none'
    life_bar.style.display = 'block'
    map_container.style.display = 'block'
    obj.style.display = 'block'
    obj.style.offsetLeft = 200
    obj.classList.remove('character-jumping')
    obj.classList.add('character')
}
function game_over() {
    clearInterval(interval_game_loop)
    clearInterval(interval_mountain)
    clearInterval(interval_cloud)
    clearInterval(interval_Enemies)
    Enemies.delete_all_enemies()

    game_over_screen.style.display = "block"
}

function create_cloud() {
    let min = 3000, max = 12000
    let rand = Math.floor(Math.random() * (max - min + 1000) + min)

    BackgroundAnimation.create_cloud()

    interval_cloud = setTimeout(create_cloud, rand)
}
function create_mountain() {
    let min = 8000, max = 20000
    let rand = Math.floor(Math.random() * (max - min + 1000) + min)

    BackgroundAnimation.create_mountain()

    interval_mountain = setTimeout(create_mountain, rand)
}
function create_enemy() {
    let min = 3000, max = 600
    let rand = Math.floor(Math.random() * (max - min + 1000) + min)

    Enemies.create_enemy(current_level)

    interval_Enemies = setTimeout(create_enemy, rand)

}
