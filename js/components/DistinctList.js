var React = require('react');

var DistinctList = React.createClass({
  displayName: 'DistinctList',
  render: function render(){
    var title = this.props.title || 'Unique List',
        distinctList = <li>
                      <em>Calculating, please wait..</em>
                    </li>,
        selectedList = this.props.selectedList,
        selectedListKeys = Object.keys(selectedList);

    if( selectedListKeys.length > 0 ){
      var allIngredients = [],
        uniqueList = [];
      distinctList = [];
      for( var i = 0, j = selectedListKeys.length; i < j; i++ ){
        var item = selectedList[selectedListKeys[i]];
        if( item.ingredients.length > 0 ){
          item.ingredients.forEach(function(ingredient){
            allIngredients.push(ingredient);
          }.bind(this));
        }
      }
      uniqueList = allIngredients.filter(function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
      });
      if( uniqueList.length > 0 ){
        uniqueList.sort();
        uniqueList.forEach(function(ingredient){
          distinctList.push(<li>{ingredient}</li>);
        }.bind(this));
      }
    }

    return (
      <div className="distinct-list">
        <h3>{title}</h3>
        <ul>{distinctList}</ul>
      </div>
    );
  }
});

module.exports = DistinctList;
