import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

class pokemonDetails extends Component {
  state = {
    itemList: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getPokemonDetailsApi()
  }

  getPokemonDetailsApi = async () => {
    const {updatedUrl} = this.props
    const response = await fetch(updatedUrl)
    const fetchData = await response.json()
    const newFetchData = fetchData.sprites
    const updatedData = {
      frontDefault: newFetchData.other.home.front_default,
      dreamWorld: newFetchData.other.dream_world.front_default,
      frontShiny: newFetchData.other.home.front_shiny,
    }
    this.setState({
      itemList: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {itemList, isLoading} = this.state

    return (
      <>
        {isLoading ? (
          <div className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        ) : (
          <div className="image-container">
            <div className="image-home-container">
              <img className="image" alt="" src={itemList.dreamWorld} />
              <img className="image" alt="" src={itemList.frontDefault} />
              <img className="image" alt="" src={itemList.frontShiny} />
            </div>
          </div>
        )}
      </>
    )
  }
}
export default pokemonDetails
