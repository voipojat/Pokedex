import React, { Component } from 'react'
import axios from 'axios'
import Pokemon from './Pokemon'
const API_BASE_URL = "https://pokeapi.co/api/v2/";
const GIF_URL = "http://www.pokestadium.com/sprites/xy/";

class Pokedex extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            image: "",
            pokemon: "",
            name: "",
            jaDescription: "",
            enDescription: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        try {
            let response = await axios.get(`${API_BASE_URL}pokemon/${this.state.name}`);
            let data = response.data;
            let response1 = await axios.get(`${API_BASE_URL}pokemon-species/${this.state.name}`);
            let data1 = response1.data;
            let japaneseDesc = "";
            let englishDesc = "";

            data1.flavor_text_entries.map(e => {
                if (e.language.name === "ja" && e.version.name === "omega-ruby") {
                    japaneseDesc = e.flavor_text;
                }
                if (e.language.name === "en" && e.version.name === "omega-ruby") {
                    englishDesc = e.flavor_text;
                }
            })

            this.setState({
                data: data,
                pokemon: data1.name,
                name: "",
                image: `${GIF_URL}${data1.name}.gif`,
                jaDescription: japaneseDesc,
                enDescription: englishDesc
            })
        } catch (error) {
            this.setState({
                data: undefined,
                name: "",
                pokemon: "Oops! Something went wrong...",
                image: "http://www.pokestadium.com/sprites/xy/ludicolo.gif",
                jaDescription: "",
                enDescription: ""
            })
        }
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    render() {
        return (
            <div className="box">
                <h1 className="jumbotron">{this.state.pokemon === "" ? "Pokédex - Search a Pokémon by its name or entry number!" : `${this.state.pokemon.charAt(0).toUpperCase() + this.state.pokemon.slice(1)}`}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChange}
                        value={this.state.name}></input>
                    <button className="btn btn-info btn-large ">Search!</button>
                </form>
                <Pokemon
                    data={this.state.data}
                    name={this.state.pokemon}
                    image={this.state.image}
                    desc1={this.state.jaDescription}
                    desc2={this.state.enDescription}
                />
            </div>
        )
    }
}

export default Pokedex