import React, {Component} from 'react';
import '../app.css';
import SearchBar from './SearchBar';
import Axios from 'axios';
import Restaurants from './Restaurants';
import CrawlList from './CrawlList';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: localStorage.getItem("location") ? JSON.parse(localStorage.getItem("location")) : '',
            cuisine: localStorage.getItem("cuisine") ? JSON.parse(localStorage.getItem("cuisine")) : '',
            restaurants: localStorage.getItem("restaurants") ? JSON.parse(localStorage.getItem("restaurants")) : [],
            crawl: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addToCrawl = this.addToCrawl.bind(this);
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
            localStorage.setItem("restaurants", JSON.stringify(response.data.businesses));

        })
        .catch((err) => {
            console.log(err);
        })
    }

    addToCrawl(e) {
        const index = e.target.value;
        let crawl = this.state.crawl.slice();
        crawl.push(this.state.restaurants[index]);

        this.setState({
            crawl: crawl
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
                            <h5>There are currently no entries for your food crawl.</h5>
                            <CrawlList crawl={this.state.crawl} />
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