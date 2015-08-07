var React = require('react'),
  Recipe = require('./Recipe'),
  Select = require('react-select');

var RecipeList = React.createClass({
  displayName: 'RecipeList',
  getInitialState: function getInitialState(){
    return {
      filter: '',
      selectedList: {}
    }
  },
  handleOnChange: function handleOnChange(val){
    this.hideItemsInList(val);
  },
  hideItemsInList: function hideItemsInList(onlyShow){
    this.setState({
      filter: onlyShow
    })
  },
  handleSelectRecipe: function handleSelectRecipe(add, recipe, recipeData){
    var selectedList = this.state.selectedList;
    if( add === true && selectedList.hasOwnProperty(recipe) === false ){
      selectedList[recipe] = recipeData;
      this.props.handleSelectRecipes(selectedList);
      // NOTE: no need to update state since it will propagate through
    } else if( add === false && selectedList.hasOwnProperty(recipe) === true ){
      delete selectedList[recipe];
      this.props.handleSelectRecipes(selectedList);
      // NOTE: no need to update state since it will propagate through
    }
  },
  componentWillMount: function componentWillMount(){
    this.setState({
      selectedList: this.props.selectedList
    });
  },
  render: function render(){
    var recipes = <div className="no-recipes">
                    <em>Loading the recipe list, please wait..</em>
                  </div>,
        ingredientList = [{value: 'n/a', label: 'Ingredients loading..'}],
        makeSpaceClassName = (this.props.makeSpace === true ? 'make-space' : ''),
        handleSelectRecipes = this.props.handleSelectRecipes,
        selectedList = this.state.selectedList;

    if( this.props.data.length > 0 ){
      var allIngredients = [],
        uniqueIngredients = {},
        uniqueIngredientsList = [];

      recipes = [];
      ingredientList = [];

      this.props.data.forEach(function(item, idx){
        var displayClass = '',
          filterTest = true,
          selectRecipe = false;

        if( this.state.filter !== '' && item.ingredients.length > 0 ){
          filterTest = item.ingredients.some(function filterIfExists(ele, idx, arr){
            return this.state.filter === ele;
          }.bind(this));
          if( filterTest === false ){
            displayClass = 'hide';
          }
        }

        if( selectedList.hasOwnProperty(item.name) ){
          selectRecipe = true;
        }

        recipes.push(
          <Recipe
            data={item}
            displayClass={displayClass}
            id={idx}
            key={idx}
            selectRecipe={selectRecipe}
            handleSelectRecipe={this.handleSelectRecipe}
            />
        );
        if( item.ingredients.length > 0 ){
          allIngredients = allIngredients.concat(item.ingredients);
        }
      }.bind(this));

      allIngredients.reduce(function(previousValue, currentValue, index, arr){
        if( uniqueIngredients.hasOwnProperty(currentValue) === false ){
          uniqueIngredients[currentValue] = currentValue;
        }
      });

      uniqueIngredientsList = Object.keys(uniqueIngredients);
      uniqueIngredientsList.sort();

      if( uniqueIngredientsList.length > 0 ){
        uniqueIngredientsList.forEach(function(ingredient){
          ingredientList.push({value: ingredient, label: ingredient});
        });
      }
    }

    return (
      <div className={'recipe-list-container ' + makeSpaceClassName}>
        <div className="recipe-list-heading">
          <h3 className="recipe-list-heading-cooktime">Cook Time</h3>
          <div className="recipe-list-heading-left">
            <h3 className="recipe-list-heading-type-name">Type, Name</h3>
            <h4 className="recipe-list-heading-ingredients">Ingredients</h4>
          </div>
          <div className="recipe-list-heading-filter">
            <Select
              value={this.state.filter}
              placeholder="Select to filter.."
              options={ingredientList}
              onChange={this.handleOnChange}
              />
          </div>
        </div>
        <div className="recipe-list">{recipes}</div>
      </div>
    );
  }
});

module.exports = RecipeList;
