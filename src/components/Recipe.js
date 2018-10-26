// import React from 'react'

// const Recipe = ({recipe}) =>
//   <div className="tile" key={recipe.id}>
//     <h4>{recipe.title}</h4>
//     <p>{recipe.body}</p>
//   </div>

// export default Recipe


import React, { Component } from 'react'

class Recipe extends Component {

  handleClick = () => {
    this.props.onClick(this.props.recipe.id)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.recipe.id)
  }

  render () {
    return(
      <div className="tile">
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
    )
  }
}

export default Recipe
