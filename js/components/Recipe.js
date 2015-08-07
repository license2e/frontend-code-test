var React = require('react'),
  ItemSelect = require('./ItemSelect');

var Recipe = React.createClass({
  displayName: 'Recipe',
  handleSelect: function handleSelect(add){
    this.props.handleSelectRecipe(add, this.props.data.name, this.props.data);
  },
  render: function render(){
    var itemId = this.props.id,
      item = this.props.data,
      ingredients = [],
      selected = this.props.selectRecipe || false,
      cookTimeClassName = 'easy',
      displayClass = this.props.displayClass || '';

    if( item.ingredients.length > 0 ){
      ingredientClassNames = [];
      item.ingredients.forEach(function(ingredient){
        ingredients.push(<li key={itemId + "-" + ingredient.replace(' ','-')}>{ingredient}</li>);
      });
    }

    if( item.cook_time > 60 ){
      cookTimeClassName = 'hard';
    } else if( item.cook_time > 30 ){
      cookTimeClassName = 'medium';
    }

    return (
      <div className={'recipe-item-container ' + displayClass}>
        <div className="recipe-item-select">
          <ItemSelect
            handleSelect={this.handleSelect}
            selected={selected}
            />
        </div>
        <div className={'recipe-item-cooktime ' + cookTimeClassName}>{item.cook_time}</div>
        <div className="recipe-item-type">{item.type}</div>
        <h3 className="recipe-item-name">{item.name}</h3>
        <ul className="recipe-item-ingredients">
          {ingredients}
        </ul>
      </div>
    );
  }
});

module.exports = Recipe;
