import $ from "jquery";
import "popper.js"
import 'bootstrap';


// navbar hide content
$("#home").css("cursor", "pointer");
$("#home").addClass("active");
$("#home-logo").css("cursor", "pointer");
$("#search").css("cursor", "pointer");
$("#search-content").hide();
$("#result-search").hide();
$("#header-content").html(`
    <div class="jumbotron jumbotron-fluid d-flex flex-column header">
      <div class="container m-auto">
        <h1 class="display-4 text-center">Cooking is All</h1>
        <p class="lead text-center">
          Make your day with learn all recipe you can cook
        </p>
      </div>
    </div>
  `)

// navbar click event
$("#home").click(function () {
  $("#home").removeClass("active").addClass("active");
  $("#search").removeClass("active");
  $("#header-content").show();
  $("#header-content").html(`
    <div class="jumbotron jumbotron-fluid d-flex flex-column header">
      <div class="container m-auto">
        <h1 class="display-4 text-center">Cooking is All</h1>
        <p class="lead text-center">
          Make your day with learn all recipe you can cook
        </p>
      </div>
    </div>
  `)
  $("#search-content").hide();
  $("#result-search").hide();
  $("#result-search").html("");
});
$("#home-logo").click(function () {
  $("#home").removeClass("active").addClass("active");
  $("#search").removeClass("active");
  $("#header-content").show();
  $("#header-content").html(`
    <div class="jumbotron jumbotron-fluid d-flex flex-column header">
      <div class="container m-auto">
        <h1 class="display-4 text-center">Cooking is All</h1>
        <p class="lead text-center">
          Make your day with learn all recipe you can cook
        </p>
      </div>
    </div>
  `)
  $("#search-content").hide();
  $("#result-search").hide();
  $("#result-search").html("");
});
$("#search").click(function () {
  $("#home").removeClass("active");
  $("#search").removeClass("active").addClass("active");
  $("#header-content").hide();
  $("#search-content").show();
  $("#result-search").show();
  $("#result-search").html("");
});

// List of Category on Navbar
$.ajax({
  url: "https://www.themealdb.com/api/json/v1/1/categories.php",
  type: "get",
  dataType: "json",
  success: function (result) {
    let category = result.categories;
    $.each(category, function (i, data) {
      $("#category-input").append(`
              <a class="dropdown-item" id="category" data-target="#all-meal" data-id="${data.strCategory}">${data.strCategory}</a>
        `);
    });
  },
});

//  Search result
function SearchResult() {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/search.php",
    type: "get",
    dataType: "json",
    data: {
      s: $("#search-input").val(),
    },
    success: function (result) {
      let search = result.meals;
      $("#result-search").html("");
      if (search == null) {
        $("#result-search").html(`
            <div class="text-center">    
            <h4>Recipe not found!</h4>
              </div>`);
      } else {
        $.each(search, function (i, data) {
          $("#result-search").append(`
                <div class="col">   
                    <div class="card mb-3" style="max-width: 540px;cursor:pointer" id="div-open-recipe" data-toggle="modal" data-target="#see-recipe" data-id="${data.idMeal}">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${data.strMealThumb}" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${data.strMeal}</h5>
                                    <h6 class="card-text text-muted">${data.strCategory} - ${data.strArea}</h6>
                                    <a href="#" id="open-recipe" data-toggle="modal" data-target="#see-recipe" data-id="${data.idMeal}" class="card-link">See Recipe</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `);
        });
      }
      $("#search-input").val("");
    },
  });
}
$("#search-button").on("click", function () {
  SearchResult();
});
$("#search-input").on("keyup", function (event) {
  if (event.which === 13) {
    SearchResult();
  }
});

// Open Category meal from list of Category
function CategoryAreaOnMeal(id, i) {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/lookup.php",
    type: "get",
    dataType: "json",
    data: { i: id },
    success: function (result) {
      let meal = result.meals[0];
      let cat = meal.strCategory;
      let area = meal.strArea;
      $(`#catArea${i}`).html(`<h6 class="text-muted card-subtitle">${cat} - ${area}</h6>`)
    }
  })
}
function HeaderCategory(id) {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    type: "get",
    dataType: "json",
    success: function (result) {
      $("#header-content").html('');
      let category = result.categories;
      $.each(category, function (i, data) {
        $("#header-content").html(`
          <div class="jumbotron jumbotron-fluid mb-3">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <img src="${data.strCategoryThumb}">
                </div>
                <div class="col-md-8">
                  <h1 class="display-4 text-center">${data.strCategory}</h1>
                  <p class="lead text-justify">
                    ${data.strCategoryDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        `)
        return (data.strCategory !== id)
      })

    },
  });
}
function OpenCategory(category) {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/filter.php",
    type: "get",
    dataType: "json",
    data: {
      c: category
    },
    success: function (result) {
      let meal = result.meals;
      $("#result-search").html("");
      $('#catArea').html('');
      $.each(meal, function (i, data) {
        $("#result-search").append(`
                <div class="col">   
                    <div class="card mb-3" style="max-width: 540px;cursor:pointer" id="div-open-recipe" data-toggle="modal" data-target="#see-recipe" data-id="${data.idMeal}">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${data.strMealThumb}" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${data.strMeal}</h5>
                                    <div id="catArea${i}"></div>
                                    <a href="#" id="open-recipe" data-toggle="modal" data-target="#see-recipe" data-id="${data.idMeal}" class="card-link">See Recipe</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `);
        CategoryAreaOnMeal(data.idMeal, i);
      })
    }
  })
}
$("#category-input").on("click", "#category", function () {
  $("#search-content").hide();
  $("#header-content").show();
  $("#result-search").show();
  $("#home").removeClass("active");
  $("#search").removeClass("active");
  let category = $(this).data("id")
  HeaderCategory(category)
  OpenCategory(category)
})

// Detail Recipes in Modal box 
function OpenRecipe(id) {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/lookup.php",
    type: "get",
    dataType: "json",
    data: {
      i: id,
    },
    success: function (result) {
      let meal = result.meals[0];
      function Ingredient() {
        let ingredients = [meal.strIngredient1, meal.strIngredient2, meal.strIngredient3, meal.strIngredient4, meal.strIngredient5, meal.strIngredient6, meal.strIngredient7, meal.strIngredient8, meal.strIngredient9, meal.strIngredient10, meal.strIngredient11, meal.strIngredient12, meal.strIngredient13, meal.strIngredient14, meal.strIngredient15, meal.strIngredient16, meal.strIngredient17, meal.strIngredient18, meal.strIngredient19, meal.strIngredient20];
        let measures = [meal.strMeasure1, meal.strMeasure2, meal.strMeasure3, meal.strMeasure4, meal.strMeasure5, meal.strMeasure6, meal.strMeasure7, meal.strMeasure8, meal.strMeasure9, meal.strMeasure10, meal.strMeasure11, meal.strMeasure12, meal.strMeasure13, meal.strMeasure14, meal.strMeasure15, meal.strMeasure16, meal.strMeasure17, meal.strMeasure18, meal.strMeasure19, meal.strMeasure20]
        $.each(ingredients, function (i, data) {
          $("#ingredient").append(`
              <li class="list-group-item">${measures[i]} ${ingredients[i]}</li>
          `)
          return (data !== "")
        })
      }
      $("#title").html(`${meal.strMeal} Recipe`)
      $("#recipe").html(`
          <div class="row mt-3">
            <div class="col-md-4">
              <img src="${meal.strMealThumb}" class="img-thumbnail">
            </div>
            <div class="col-md-8">
              <h4>Ingredients</h4>
              <ul class="list-group list-group-flush" id="ingredient">
              </ul>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-8">
              <h4>Instruction</h4>
              <ul class="list-group">
                <li class="list-group-item">${meal.strInstructions}</li>
              </ul>
            </div>
            <div class="col-md-4">
              <h4>Instruction with Video</h4>
              <div class="embed-responsive embed-responsive-1by1">
                <iframe class="embed-responsive-item" src="${meal.strYoutube.replace("watch?v=", "embed/")}"></iframe>
              </div>
            </div>
          </div>
      `)
      Ingredient()
    },
  });
}
$("#result-search").on("click", "#open-recipe", function () {
  let id = $(this).data("id");
  OpenRecipe(id);
});
$("#result-search").on("click", "#div-open-recipe", function () {
  let id = $(this).data("id");
  OpenRecipe(id);
});


