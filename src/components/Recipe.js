import React, { Component } from 'react'

class Recipe extends Component {

  handleClick = () => {
    this.props.onClick(this.props.recipe.id)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.recipe.id)
  }

  render () {
    const userId = this.props.userId;
    const currentUserId = this.props.currentUserId;
    let recipeArea;

    if (userId === currentUserId) {
      recipeArea = <div className="tile">
                    <span className="deleteButton" onClick={this.handleDelete}>
                      x
                    </span>
                    <h4 onClick={this.handleClick}>
                      {this.props.recipe.title}
                    </h4>
                    <p onClick={this.handleClick}>
                      {this.props.recipe.body}
                    </p>
                   </div>
    }
    else {
      recipeArea = <div className="tile">
                    <h4>
                      {this.props.recipe.title}
                    </h4>
                    <p>
                      {this.props.recipe.body}
                    </p>
                   </div>
    }

    return(
      <div>
        {recipeArea}
      </div>
    )
  }
}

export default Recipe
