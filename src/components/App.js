import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import '../app.css';
import SearchBar from './SearchBar';
import Axios from 'axios';
import Sort from './Sort';
import Restaurants from './Restaurants';
import FavoritesList from './FavoritesList';
import CrawlList from './CrawlList';
import Fade from 'react-reveal/Fade';
import swal from '@sweetalert/with-react';

import remove from '../../images/remove-button.png';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            cuisine: '',
            radius: 0,
            restaurants: [],
            crawl: [],
            favorites: [],
            filter: '',
            searchTitle: [],
            listName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addToCrawl = this.addToCrawl.bind(this);
        this.getCrawl = this.getCrawl.bind(this);
        this.showFavoriteButton = this.showFavoriteButton.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.sortResults = this.sortResults.bind(this);
        this.swap = this.swap.bind(this);
        this.deleteCrawlItem = this.deleteCrawlItem.bind(this);
        this.clearTour = this.clearTour.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'radius') {
            if (Number(e.target.value) > 40000) {
                e.target.value = 40000;
            }
        }

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
                radius: this.state.radius,
                cuisine: this.state.cuisine,
            }
        })
        .then((response) => {
            response.data.businesses.forEach((business, i) => {
                business.resultIndex = i;
                if (!business.price) {
                    business.price = 0;
                } else {
                    business.price = business.price.length;
                }
                if (!business.rating) {
                    business.rating = 0;
                }
            })

            this.setState({
                restaurants: response.data.businesses,
                searchTitle: [this.state.cuisine, this.state.location]
            })
            if (this.state.searchTitle.length > 0) {
                document.getElementById('show-results').style.display = 'block';
            }
            localStorage.setItem("restaurants", JSON.stringify(response.data.businesses));

        })
        .catch((err) => {
            console.log(err);
        })
    }

    // adds target restaurant to crawl list

    addToCrawl(e) {
        const id = e.target.value;
        console.log('id', id);
        let crawl = this.state.crawl.slice();
        let inCrawl = false;

        this.state.crawl.forEach((item) => {
            if (item.id === id) {
                inCrawl = true;
            }
        })

        if (!inCrawl) {
            this.state.restaurants.forEach((restaurant) => {
                if (restaurant.id === id) {
                    crawl.push(restaurant);
                }
            });
        } else {
            swal({
                title: "Are you sure?",
                text: "This restaurant is already included in your current food crawl!",
                icon: "warning",
                buttons: ["Cancel", "Continue"],
                dangerMode: true,
            })
            .then((response) => {
                if (response) {
                    this.state.restaurants.forEach((restaurant) => {
                        if (restaurant.id === id) {
                            crawl.push(restaurant);
                        }
                    })
                }

                this.setState({
                    crawl: crawl
                })
            });
        };

        this.setState({
            crawl: crawl
        })
        this.getCrawl();
    }

    // updates the number of locations in the crawl

    getCrawl() {
        if (this.state.crawl.length === 0) {
            return (
                <h5>There are currently no locations in your food tour.</h5>
            )
        } else if (this.state.crawl.length === 1) {
            return (
                <h5>You currently have 1 location in your food tour.</h5>
            )
        } else {
            return (
                <h5>You currently have {this.state.crawl.length} locations in your food tour.</h5>
            )
        }
    }

    // clears entire current tour list

    clearTour() {
        this.setState({
            crawl: []
        })
    }

    // shows add to favorites button

    showFavoriteButton() {
        if (this.state.crawl.length > 0) {
            return (
                <Fade bottom cascade>
                    <div className="fav-form">

                        <form >
                            <label htmlFor="listName">Enter List Name:</label>
                            <input type="text" id="listName" name="listName" onChange={(e) => this.handleChange(e)} placeholder="enter name" required={"required"}></input>
                        </form>
                        <div className="fav-btn">
                            <Button variant="primary" onClick={(e) => this.addToFavorites(e)}>Add This Tour to Favorites</Button>
                        </div>
                        <div className="fav-btn">
                            <Button variant="primary" onClick={() => this.clearTour()}>Clear Current Food Tour</Button>
                        </div>
                    </div>
                </Fade>
                )
        }
    }

    // add to favorites

    addToFavorites(e) {
        e.preventDefault();

        if (!this.state.listName) {
            alert('please enter a list name');
        } else {
        // console.log(this.state.listName, this.state.crawl);
        let tour = this.state.crawl.slice();
        let name = this.state.listName;

        let fav = [{
            name: name,
            tour: tour
        }]
        // console.log(fav);
        const favorites = this.state.favorites.slice();
        tour.push(name);
        favorites.push(tour);

        this.setState({
            favorites: favorites,
        })
    }
}

    sortResults(e) {
        const sort = event.target.value;
    
        this.setState((state) => ({
          filter: sort,
          restaurants: this.state.restaurants.slice().sort((a, b) => (
            sort === "lowest" ? ((a.rating > b.rating) ? 1 : -1) :
            sort === "highest" ? ((a.rating < b.rating) ? 1 : -1) :
            sort === "closest" ? ((a.distance > b.distance) ? 1 : -1) :
            sort === "furthest" ? ((a.distance < b.distance) ? 1 : -1) :
            sort === "cheapest" ? ((a.price > b.price) ? 1 : -1) :
            sort === "expensive" ? ((a.price < b.price) ? 1 : -1) : 
            sort === "alphabetical" ? ((a.name > b.name) ? 1 : -1) :
            ((a.resultIndex > b.resultIndex) ? 1 : -1)
          ))
        }));
    }

    // reordering function for items in crawl list

    swap(e) {
        const dir = e.target.getAttribute('value');
        const index = Number(e.target.parentNode.getAttribute('index'));
        const crawl = this.state.crawl.slice();
        // console.log(dir, index);

        if (dir === 'up') {
            if (index === 0) {
                let current = crawl.shift();
                crawl.push(current);
            } else {
                let current = crawl[index];
                crawl[index] = crawl[index - 1];
                crawl[index - 1] = current;
            }
        } else {
            if (index === crawl.length - 1) {
                let current = crawl.pop();
                crawl.unshift(current);
            } else {
                let current = crawl[index];
                crawl[index] = crawl[index + 1];
                crawl[index + 1] = current;
            }
        }
        // console.log('postswap', crawl)
        this.setState({
            crawl: crawl
        })
    }

    deleteCrawlItem(e){
        console.log(e.target.getAttribute('value'));
        const index = Number(e.target.parentNode.getAttribute('index'));
        const crawl = this.state.crawl.slice(0, index).concat(this.state.crawl.slice(index + 1));
        
        this.setState({
            crawl: crawl
        })
    }

    render () {
        return (
            <div className="grid-container">
                <header>
                    <h1>
                        The Pearl Food Tour Experience
                    </h1>
                </header>
                <main>
                    <div className='main-wrapper'>
                        <div className="search-container">
                            <SearchBar handleChange={this.handleChange} handleClick={this.handleClick} />
                        </div>
                        <div className="content">
                            <div className="main">
                                <div id="show-results">
                                    <h3>Showing results for <strong>{this.state.searchTitle[0]}</strong> near <strong>{this.state.searchTitle[1]}</strong></h3>
                                    <div>
                                        <Sort restaurants={this.state.restaurants} sortResults={this.sortResults} />
                                    </div>
                                </div>
                                <div>
                                    <Restaurants restaurants={this.state.restaurants} location={this.state.location} cuisine={this.state.cuisine} addToCrawl={this.addToCrawl} />
                                </div>
                            </div>
                            <div className="sidebar">
                                <div>
                                    {this.getCrawl()}
                                </div>
                                    <CrawlList crawl={this.state.crawl} swap={this.swap} deleteCrawlItem={this.deleteCrawlItem} />
                                <div className="fav-form-container">
                                    {this.showFavoriteButton()}
                                </div>
                                <div className="fav-list-container">
                                    <h5 className="top-line">You currently have {this.state.favorites.length} favorites.</h5>
                                    {this.state.favorites.map((fav, index) => (
                                        <FavoritesList fav={fav} key={index} />
                                    ))}
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

// location: localStorage.getItem("location") ? JSON.parse(localStorage.getItem("location")) : '',
// cuisine: localStorage.getItem("cuisine") ? JSON.parse(localStorage.getItem("cuisine")) : '',
// radius: localStorage.getItem("radius") ? JSON.parse(localStorage.getItem("radius")) : 0,
// restaurants: localStorage.getItem("restaurants") ? JSON.parse(localStorage.getItem("restaurants")) : [],
// crawl: [],
// favorites: [],
// filter: '',
// searchTitle: [],
// listName: ''