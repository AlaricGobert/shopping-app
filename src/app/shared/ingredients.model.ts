// export class Ingredient {
//     public name: string;
//     public amount: number;

//     constructor(name: string, amount: number){
//         this.name = name;
//         this.amount = amount;
//     }

// }

//Raccourci pour gagner du temps lors de la création de modèles.

export class Ingredient {
    constructor(public name: string, public amount: number) {}
}