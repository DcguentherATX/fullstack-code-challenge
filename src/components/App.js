import React, {Component} from 'react';
import '../app.css';
import SearchBar from './SearchBar';
import Axios from 'axios';
import Restaurants from './Restaurants';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            cuisine: '',
            restaurants: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick(e) {
        e.preventDefault();

        Axios.get('/api', {
            params: {
                location: this.state.location,
                cuisine: this.state.cuisine
            }
        })
        .then((response) => {
            this.setState({
                restaurants: response.data.businesses
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render () {
        return (
            <div className="grid-container">
                <header>
                    The Pearl Food Crawl Experience
                </header>
                <main>
                    <div className="content">
                    <div className="search-container">
                        <SearchBar handleChange={this.handleChange} handleClick={this.handleClick} />
                    </div>
                        <div className="main">
                            <Restaurants restaurants={this.state.restaurants}/>
                        </div>
                        <div className="sidebar">
                            There are no locations for your food crawl.
                        </div>
                    </div>
                </main>
                <footer>
                    Built By David Guenther
                </footer>
            </div>
        )
    }
}

export default App;