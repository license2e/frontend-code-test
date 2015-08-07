var React = require('react'),
  ItemSelect = require('./ItemSelect');

var ItemSelect = React.createClass({
  displayName: 'ItemSelect',
  getInitialState: function getInitialState(){
    return {
      selected: this.props.selected || false
    }
  },
  handleOnClick: function handleOnClick(e){
    e.preventDefault();
    var selected = false;
    if( this.state.selected === false ){
      selected = true;
    }
    this.setState({
      selected: selected
    });
    this.props.handleSelect(selected);
  },
  render: function render(){
    var selectedClassName = '',
      selectedIconClassName = 'fa-square-o';
    if( this.state.selected === true ){
      selectedIconClassName = 'fa-check-square-o';
      selectedClassName = 'selected';
    }
    return (
      <a href="#select" className={'item-select ' + selectedClassName} onClick={this.handleOnClick}>
        <i className={'fa ' + selectedIconClassName}></i>
      </a>
    );
  }
});

module.exports = ItemSelect;
