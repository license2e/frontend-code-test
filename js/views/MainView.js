var React = require('react'),
  RecipeList = require('../components/RecipeList'),
  DistinctList = require('../components/DistinctList'),
  superagent = require('superagent'),
  ls = global.localStorage;

var MainView = React.createClass({
  displayName: 'MainView',
  getInitialState: function getInitialState(){
    return {
      data: [],
      lsKey: 'recipe-list',
      showDistinctIngredients: false,
      storageData: {
        selectedList: {}
      }
    };
  },
  getRecipeData: function getRecipeData(){
    superagent
      .get('/recipes.json?v=' + (new Date).getTime())
      .end(function(err, res){
        if(!res.ok){
          return console.log('Error: ' + res.text);
        } else {
          this.setState({
            data: res.body
          });
        }
      }.bind(this));
  },
  handleSelectRecipes: function handleSelectRecipes(selectedList){
    // store in localstorage
    var storageData = {
      selectedList: selectedList
    };
    ls.setItem(this.state.lsKey, JSON.stringify(storageData));
    // set state to show distinct ingredient list
    // set state to set the selected recipe list
    this.setState({
      storageData: storageData,
      showDistinctIngredients: ((Object.keys(selectedList)).length > 0 ? true : false)
    });
  },
  componentWillMount: function componentWillMount(){
    // get the selected recipes from localstorage
    var storageData = JSON.parse(ls.getItem(this.state.lsKey) || '{"selectedList": {}}');
    this.setState({
      storageData: storageData,
      showDistinctIngredients: (Object.keys(storageData.selectedList).length > 0 ? true : false)
    });
    // add delay to simulate a server call
    setTimeout(this.getRecipeData, 500);
  },
  render: function render(){
    return (
      <div className="view">
        <header>
          <h1>Recipe Tabula</h1>
        </header>
        <div id="content">
          { this.state.showDistinctIngredients === true ?
            <DistinctList
              key={'distinct-recipe-list'}
              data={this.state.data}
              selectedList={this.state.storageData.selectedList}
              title={'Distinct Ingredients'}
              />
          : null }
          <RecipeList
            data={this.state.data}
            handleSelectRecipes={this.handleSelectRecipes}
            key={'recipe-list'}
            makeSpace={this.state.showDistinctIngredients}
            selectedList={this.state.storageData.selectedList}
            />
        </div>
      </div>
    );
  }
});

module.exports = MainView;
