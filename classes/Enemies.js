import { BackgroundAnimation } from './BackgroundAnimation.js'

const obj = document.querySelector('.character')
const container = document.querySelector('.game-container')
const life_bar_color = document.querySelector('.life-bar-color')


export class Enemies {
    constructor() {
        this.bloodControl_interval = ''

        this.deploy_enemy_interval = ''

    }


    static create_enemy(current_level) {
        const enemy = document.createElement('div')

        if (current_level == 1) {
            enemy.classList.add('enemyClass')

        } else if (current_level == 2) {
            enemy.classList.add('enemyClass2')
        }
        container.appendChild(enemy)

    }


    
    static delete_all_enemies(current_level) {
        let enemy_custom_class

        if (current_level === 2) {
            enemy_custom_class = '.enemyClass'
        } else if (current_level === 3) {
            enemy_custom_class = '.enemyClass2'
        }

        let allEnemies = document.querySelectorAll(enemy_custom_class)
        for (let i = 0; i < allEnemies.length; i++) {
            if (allEnemies[i]) {
                allEnemies[i].remove()
            }
        }
    }



    static bloodControl() {
        let blood_i = document.getElementsByClassName('blood-regen')

        this.bloodControl_interval = setInterval(() => {

            for (let x = 0; x < blood_i.length; x++) {
                if (blood_i[x]) {

                    let position = blood_i[x].offsetLeft
                    position -= 10
                    blood_i[x].style.left = `${position}px`

                    if (
                        ((obj.offsetTop <= (blood_i[x].offsetTop + 60)) &&//Cima personagem com baixo frasco
                            ((obj.offsetTop + 120) >= (blood_i[x].offsetTop))) &&//Baixo personagem com cima frasco
                        ((obj.offsetLeft + 120 >= (blood_i[x].offsetLeft)) &&//Direita personagem com esquerda frasco
                            ((obj.offsetLeft) <= (blood_i[x].offsetLeft + 55)))//Esquerda personagem com direita inimigo
                    ) {
                        blood_i[x].remove()
                        life_bar_color.style.width = '100%'
                        this.lifePercentage = 100
                        this.hit = 5
                    }

                    /*  if (blood_i[x].offsetLeft <= container.offsetLeft) {
                         blood_i[x].remove()
                     } */
                }
            }
        }, 20)
    }




}