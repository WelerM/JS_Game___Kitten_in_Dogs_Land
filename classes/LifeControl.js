var container = document.querySelector('.game-container')
var bottles_display_container = document.querySelector('.bottle-display-container')

export class LifeControl {

    static create_cure_bottle() {
        var blood_regen = document.createElement('div')
        blood_regen.classList.add('blood-regen')
        container.appendChild(blood_regen)


    }

    static update_bottle_display(array_health_bottles) {

        while (bottles_display_container.firstChild) {
            bottles_display_container.removeChild(bottles_display_container.firstChild)
        }

        array_health_bottles.map(bottle => {
              const img_bottle = document.createElement('img')
            img_bottle.classList.add('health-bottle')
            img_bottle.src = './assets/img/life.png'


            bottles_display_container.appendChild(img_bottle)

        })

    }


}