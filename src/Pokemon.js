import React, { Component } from 'react'
import './Pokemon.css'

class Pokemon extends Component {
    render() {
        return (
            this.props.data === undefined ? <div className="pokemondata">
                <img id="nice" src="http://www.pokestadium.com/sprites/xy/ludicolo.gif" alt="ludicolo" />
            </div> :
                <div className="container2">
                    <div className="fix">
                        <h3>Abilities</h3>
                        {this.props.data.abilities.map(a => {
                            return <li>{a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}</li>
                        })}
                    </div>
                    <div className="desc" >
                        <div>{this.props.desc1}</div>
                        <div>{this.props.desc2}</div>
                        <img src={this.props.image} alt="pokemon" />
                    </div>
                    <div className="fix">
                        {this.props.data.types.map(t => {
                            return <img src={t.type.name === "psychic" ? "https://pokeguide.neocities.org/Pic/physicicon.png" : `https://pokeguide.neocities.org/Pic/${t.type.name}icon.png`} alt="pokemon"></img>
                        })}
                    </div>
                </div>

        )
    }
}

export default Pokemon