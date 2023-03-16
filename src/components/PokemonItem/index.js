import './index.css'

const PokemonItem = props => {
  const {pokemonDetails, receivedUrl} = props
  const {name, url} = pokemonDetails

  const onClickUrl = () => {
    receivedUrl(url)
  }

  return (
    <li className="item-container">
      <button className="button" type="button" onClick={onClickUrl}>
        <h1 className="main-heading">{name}</h1>
        <p className="links">{url}</p>
      </button>
    </li>
  )
}
export default PokemonItem
