class CreateHero {
    constructor(name, age, type){
        this.name = name;
        this.age = age;
        this.type = type;
    }

    attack(type){
        let attack = "";

        if (type === "mage") {
            attack = "magic"
        } else if (type === "warrior") {
            attack = "sword"
        } else if (type === "healer") {
            attack = "healing"
        } else if (type === "ninja") {
            attack = "shuriken"
        }

        switch (type) {
            case "mage":
                console.log(`The ${this.type} attacked using ${attack}`)
                break;
            case "warrior":
                console.log(`The ${this.type} attacked using ${attack}`)
                break;
            case "healer":
                console.log(`The ${this.type} attacked using ${attack}`)
                break;
            case "ninja":
                console.log(`The ${this.type} attacked using ${attack}`)
                break;
            default:
                break;
        }
    }
}

const newHero = new CreateHero("Batsuke", 24, "warrior")
console.log("")
newHero.attack("warrior");
console.log("")