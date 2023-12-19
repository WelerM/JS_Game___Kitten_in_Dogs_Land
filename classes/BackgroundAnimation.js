const container = document.querySelector('.game-container')
const map_pointer = document.querySelector('.map-position-pointer')
const intro_container = document.querySelector('.intro-container')
const main_h1 = document.querySelector('.main-h1')
const menu = document.querySelector('.menu-screen')
const boss = document.querySelector('.boss')
let var_content
let id_var
let x = 0
let txt_control1 = 0
let i = 0
var stop_txt_box1
var stop_txt_box2
let current_line
let txt1
let txt2
let txt3
let txt4

var txt_box1 = document.querySelector('.txt-box1')
var txt_box2 = document.querySelector('.txt-box2')
var barbara = document.querySelector('.intro-cat2')
var exclamation = document.querySelector('.exclamation')
var level_control = 0
const next_level_screen = document.querySelector('.next-level')
const level_ending_flag = document.querySelector('.level-ending-flag')
const flag_text = document.querySelector('.level-ending-flag > span')
var num1 = -30




export class BackgroundAnimation {

    //Clouds
    static create_cloud() {
        const cloud = document.createElement('div')
        cloud.classList.add('cloud')
        container.appendChild(cloud)
    }
    static delete_all_clouds() {
        let allClouds = document.querySelectorAll('.cloud')
        for (let i = 0; i < allClouds.length; i++) {
            if (allClouds[i]) {
                allClouds[i].remove()
            }
        }
    }

    //Mountains
    static create_mountain() {
        const mountain = document.createElement('div')
        mountain.classList.add('mountains')
        container.appendChild(mountain)

    }
    static delete_all_mountains() {
        let allMountains = document.querySelectorAll('.mountains')
        for (let i = 0; i < allMountains.length; i++) {
            if (allMountains[i]) {
                allMountains[i].remove()
            }
        }
    }

    //Scenario
    static changeScenario(current_level) {
        if (current_level === 1) {
            container.classList.add('game-container')
        } else if (current_level === 2) {
            container.classList.add('game-container2')//Changes background to darker
        }
    }
    static show_flag(current_level) {
        let flag_number

        if (current_level == 1) {
            flag_number = 2
        } else if (current_level == 2) {
            flag_number = 3
        }
        flag_text.textContent = flag_number

        //Shows flag
        let show_flag = setInterval(() => {
            num1++
            level_ending_flag.style.right = `${num1}px`
            if (num1 > 60) {
                clearInterval(show_flag)
                num1 = 0
                setTimeout(() => {
                    next_level_screen.style.display = 'block'
                }, 500)
            }
        }, 20)
    }
    static hide_flag(){
        level_ending_flag.style.right = -60 + 'px'
    }




}


/* let bottles_display_container = document.querySelector('.bottles-display-container')
array_health_bottles.map(bottle =>{
    const img_bottle = document.createElement('img')
    img_bottle.src='../img/life.png'
    bottles_display_container.appendChild(img_bottle)

}) */