import {Component} from 'react'

import Loader from 'react-loader-spinner'

import PokemonItem from '../PokemonItem'
import PokemonDetails from '../pokemonDetails'

import './index.css'

class Pokemon extends Component {
  state = {
    pokemonList: [],
    updatedUrl: '',
    start: 0,
    end: 20,
    isActive: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getPokemonApi()
  }

  receivedUrl = url => {
    this.setState({
      updatedUrl: url,
      isActive: true,
    })
  }

  onIncrement = () => {
    const {start} = this.state

    if (start >= 0) {
      this.setState(prev => ({
        start: prev.start + 20,
      }))

      this.setState(prev => ({
        end: prev.end + 20,
      }))
    }
  }

  onDecrement = () => {
    const {start} = this.state

    if (start !== 0) {
      this.setState(prev => ({
        start: prev.start - 20,
      }))

      this.setState(prev => ({
        end: prev.end - 20,
      }))
    }
  }

  getPokemonApi = async () => {
    const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    const response = await fetch(pokemonUrl)
    const data = await response.json()
    const updatedData = data.results
    console.log(data.results)
    this.setState({
      pokemonList: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {
      pokemonList,
      start,
      end,
      updatedUrl,
      isActive,
      isLoading,
    } = this.state
    console.log(updatedUrl)

    return (
      <>
        {isLoading ? (
          <div className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        ) : (
          <div className="main-app-container">
            {isActive ? null : (
              <div className="home-container">
                <ul className="app-pokemon-container">
                  {pokemonList.slice(start, end).map(eachMan => (
                    <PokemonItem
                      key={eachMan.name}
                      pokemonDetails={eachMan}
                      receivedUrl={this.receivedUrl}
                    />
                  ))}
                </ul>
                <div className="button-container">
                  <button
                    className="button"
                    type="button"
                    onClick={this.onDecrement}
                  >
                    Previous
                    <span className="counter">: {start}</span>
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={this.onIncrement}
                  >
                    Next
                    <span className="counter">: {end}</span>
                  </button>
                </div>
              </div>
            )}
            {isActive ? <PokemonDetails updatedUrl={updatedUrl} /> : null}
          </div>
        )}
      </>
    )
  }
}
export default Pokemon
