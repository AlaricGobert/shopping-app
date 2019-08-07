import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://shopping-app-c4831.firebaseio.com/recipes.json', recipes)
      .subscribe();
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://shopping-app-c4831.firebaseio.com/recipes.json')
      .pipe(
        // Il y a un map qui vient de RxJS pour récupérer la requête HTTP et transformer l'objet
        map(recipes => {
          // Il y a un autre map qui est une propriété javascript et qui permet de transformer le tableau
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  // fetchRecipes() {
  //   this.http
  //     .get<Recipe[]>('https://shopping-app-c4831.firebaseio.com/recipes.json')
  //     .subscribe(recipes => {
  //       this.recipeService.setRecipes(recipes);
  //     });
  // }

  // fetchRecipes() {
  //   this.http
  //      .get<Recipe[]>('https://shopping-app-c4831.firebaseio.com/recipes.json')
  //      .subscribe(recipes => { console.log(recipes); });
  // }

}
