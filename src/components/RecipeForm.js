import React, { Component } from 'react'
import axios from 'axios'

class RecipeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.recipe.title,
      body: this.props.recipe.body
    }
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const recipe = {
      title: this.state.title,
      body: this.state.body
    }

    axios.put(
      `http://localhost:3001/api/v1/recipes/${this.props.recipe.id}`,
      {
        recipe: recipe
      })
    .then(response => {
       this.props.updateRecipe(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input className='input' type="text"
            name="title" placeholder='Enter a Title'
            value={this.state.title} onChange={this.handleInput}
            ref={this.props.titleRef} />
          <textarea className='input' name="body"
            placeholder='Describe your recipe'
            value={this.state.body} onChange={this.handleInput}>
          </textarea>
        </form>
      </div>
    );
  }
}

export default RecipeForm
