import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import '../app.css';
import SearchBar from './SearchBar';
import Axios from 'axios';
import Restaurants from './Restaurants';
import CrawlList from './CrawlList';
import Fade from 'react-reveal/Fade';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: localStorage.getItem("location") ? JSON.parse(localStorage.getItem("location")) : '',
            cuisine: localStorage.getItem("cuisine") ? JSON.parse(localStorage.getItem("cuisine")) : '',
            radius: localStorage.getItem("radius") ? JSON.parse(localStorage.getItem("radius")) : 0,
            restaurants: localStorage.getItem("restaurants") ? JSON.parse(localStorage.getItem("restaurants")) : [],
            crawl: [],
            favorites: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addToCrawl = this.addToCrawl.bind(this);
        this.getCrawl = this.getCrawl.bind(this);
        this.showFavoriteButton = this.showFavoriteButton.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        localStorage.setItem(e.target.name.toString(), JSON.stringify(e.target.value));

    }

    // handles yelp search

    handleClick(e) {
        e.preventDefault();

        if (Number(this.state.radius) > 40000) {
            this.setState({
                radius: 40000
            })
        };

        Axios.get('/api', {
            params: {
                location: this.state.location,
                radius: this.state.radius,
                cuisine: this.state.cuisine,
            }
        })
        .then((response) => {
            this.setState({
                restaurants: response.data.businesses
            })
            localStorage.setItem("restaurants", JSON.stringify(response.data.businesses));

        })
        .catch((err) => {
            console.log(err);
        })
    }

    // adds target restaurant to crawl list

    addToCrawl(e) {
        const id = e.target.value;
        let crawl = this.state.crawl.slice();

        this.state.restaurants.forEach((restaurant) => {
            if (restaurant.id === id) {
                crawl.push(restaurant);
            }
        });

        this.setState({
            crawl: crawl
        })
        this.getCrawl();
    }

    // updates the number of locations in the crawl

    getCrawl() {
        if (this.state.crawl.length === 0) {
            return (
                <h5>There are currently no locations in your food crawl.</h5>
            )
        } else if (this.state.crawl.length === 1) {
            return (
                <h5>You currently have 1 location in your food crawl.</h5>
            )
        } else {
            return (
                <h5>You currently have {this.state.crawl.length} locations in your food crawl.</h5>
            )
        }
    }

    // shows add to favorites button

    showFavoriteButton() {
        if (this.state.crawl.length > 0) {
            return (
                <Fade bottom cascade>
                    <Button variant="primary" onClick={(e) => this.addToFavorites(e)}>Add This Crawl to Favorites</Button>
                </Fade>
                )
        }
    }

    // add to favorites

    addToFavorites(e) {
        e.preventDefault();

        const favorites = this.state.favorites.slice();
        favorites.push(this.state.crawl);

        this.setState({
            favorites: favorites
        })
    }

    render () {
        return (
            <div className="grid-container">
                <header>
                    <h1>
                        The Pearl Food Crawl Experience
                    </h1>
                </header>
                <main>
                    <div className='main-wrapper'>
                    <div className="search-container">
                        <SearchBar handleChange={this.handleChange} handleClick={this.handleClick} />
                    </div>
                    <div className="content">
                        <div className="main">
                            <Restaurants restaurants={this.state.restaurants} location={this.state.location} cuisine={this.state.cuisine} addToCrawl={this.addToCrawl} />
                        </div>
                        <div className="sidebar">
                            <div>
                                {this.getCrawl()}
                            </div>
                            <CrawlList crawl={this.state.crawl} />
                            <div>
                                {this.showFavoriteButton()}
                            </div>
                        </div>
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