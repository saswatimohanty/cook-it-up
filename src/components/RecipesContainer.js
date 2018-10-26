import React, { Component } from 'react'
import axios from 'axios'
import Recipe from './Recipe'
import update from 'immutability-helper'
import RecipeForm from './RecipeForm'
import '../containers/Form.css'

class RecipesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      editingRecipeId: null,
      notification: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    axios.get(`http://localhost:3001/api/v1/users/${id}/get_user_recipes`)
      .then(response => {
        this.setState({recipes: response.data.user_recipes})
      })
      .catch(error => console.log(error))
  }

  addNewRecipe = () => {
    axios.post(
      'http://localhost:3001/api/v1/recipes',
      { recipe:
        {
          title: '',
          body: ''
        }
      }
    )
    .then(response => {
      const recipes = update(this.state.recipes, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({recipes: recipes, editingRecipeId: response.data.id})
    })
    .catch(error => console.log(error))
  }

  updateRecipe = (recipe) => {
    const recipeIndex = this.state.recipes.findIndex(x => x.id === recipe.id)
    const recipes = update(this.state.recipes, {
      [recipeIndex]: { $set: recipe }
    })
    this.setState({recipes: recipes, notification: 'All changes saved successfully'})
  }

  resetNotification = () => {
    this.setState({notification: ''})
  }

  enableEditing =(id) => {
    this.setState({editingRecipeId: id}, () => { this.title.focus() })
  }

  deleteRecipe = (id) => {
    axios.delete(`http://localhost:3001/api/v1/recipes/${id}`)
    .then(response => {
      const recipeIndex = this.state.recipes.findIndex(x => x.id === id)
      const recipes = update(this.state.recipes, { $splice: [[recipeIndex, 1]]})
      this.setState({recipes: recipes})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div>
          <button className="btn btn-primary" onClick={this.addNewRecipe} >
            New Recipe
          </button>
          <span className="notification">
            {this.state.notification}
          </span>
        </div>

        {this.state.recipes.map((recipe) => {
          if(this.state.editingRecipeId === recipe.id) {
            return(<RecipeForm recipe={recipe} key={recipe.id} updateRecipe={this.updateRecipe}
                    titleRef= {input => this.title = input}
                    resetNotification={this.resetNotification} />)
          }
          else {
            return (<Recipe recipe={recipe} key={recipe.id} onClick={this.enableEditing}
                    onDelete={this.deleteRecipe} />)
          }
        })}
      </div>
    );
  }
}

export default RecipesContainer
