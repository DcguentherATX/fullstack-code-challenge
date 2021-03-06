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
import { saveAs } from 'file-saver';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            cuisine: '',
            radius: 0,
            restaurants: [],
            crawl: [],
            favorites: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [],
            filter: '',
            searchTitle: [],
            listName: '',
            searchResults: [],
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
        this.showRestaurants = this.showRestaurants.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
        this.deleteTour = this.deleteTour.bind(this);
        this.handleSaveAsPDF = this.handleSaveAsPDF.bind(this);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);
        this.handleSaveAsJSON = this.handleSaveAsJSON.bind(this);
    }

    // allows favorites to persist for user on application refresh

    componentDidUpdate() {
        localStorage.removeItem('favorites');
        localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
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
        // localStorage.setItem(e.target.name.toString(), JSON.stringify(e.target.value));

    }

    // handles yelp search

    handleClick(e) {
        e.preventDefault();
        
        if (!this.state.location || !this.state.cuisine) {
            swal({
                title: "Oh no!",
                text: "Please enter a cuisine and location!",
                icon: "warning",
                buttons: ["Cancel", "Will Do!"],
            })
        } else {
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
                    searchResults: response.data.businesses,
                    searchTitle: [this.state.cuisine, this.state.location]
                })
                if (this.state.searchTitle.length > 0) {
                    document.getElementById('show-results').style.display = 'block';
                }
                // localStorage.setItem("restaurants", JSON.stringify(response.data.businesses));
                localStorage.setItem("searchResults", JSON.stringify(response.data.businesses))
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    // determines whether welcome message or restaurant list is displayed

    showRestaurants() {
        if (this.state.restaurants.length > 0) {
            return (
                <Restaurants restaurants={this.state.restaurants} location={this.state.location} cuisine={this.state.cuisine} addToCrawl={this.addToCrawl} />
            )
        } else if (this.state.restaurants.length === 0 && !this.state.filter) {
            return (
                <div className="welcome">
                    <p>
                        Welcome to the Pearl Food Tour Experience where you can create your own food tour.
                        Simply add a type of cuisine, location, and search radius in the form above, and
                        a list of top matches will be displayed.  If and restaurants pique your interest,
                        add then to your food tour list.
                    </p>
                    <p>
                        The food tour list that you create will be visible on the right.  Feel free to swap
                        the order according to your preferences.  Finally, if you would like to save your
                        current food tour, simply click the "Add to Favorites" button.  Bon Apetit!
                    </p>
                </div>
            )
        } else {
            return (
                <div className="no-match">
                    No results match current filters.
                </div>
            )
        }
    }

    // shows add to favorites button

    showFavoriteButton() {
        if (this.state.crawl.length > 0) {
            return (
                <Fade bottom cascade>
                    <div className="fav-form">
                        <form >
                            <label htmlFor="listName">Enter Tour Name:</label>
                            <input type="text" id="listName" name="listName" onChange={(e) => this.handleChange(e)} placeholder="enter name" required={"required"}></input>
                        </form>
                        <div className="fav-btn">
                            <Button variant="primary" onClick={(e) => this.addToFavorites(e)}>Add This Tour to Favorites</Button>
                        </div>
                        <div className="fav-btn">
                            <Button variant="primary" onClick={this.handleDownloadClick}>Download Current Tour</Button>
                        </div>
                        <div className="fav-btn">
                            <Button variant="primary" onClick={() => this.clearTour()}>Clear Current Food Tour</Button>
                        </div>
                    </div>
                </Fade>
                )
        }
    }

    // adds target restaurant to crawl list

    addToCrawl(e) {
        const id = e.target.value;
        // console.log('id', id);
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
            })
            .catch((err) => {
                console.log(err);
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

    // adds current tour list to favorites list

    addToFavorites(e) {
        e.preventDefault();

        if (!this.state.listName) {
            swal({
                title: "Uh Oh!",
                text: "Please enter a unique name for this tour!",
                icon: "warning",
                buttons: true,
            })
        } else {
        // console.log(this.state.listName, this.state.crawl);
            let tour = this.state.crawl.slice();
            let name = this.state.listName;

            const favorites = this.state.favorites.slice();
            tour.push(name);
            favorites.push(tour);

            this.setState({
                favorites: favorites,
            })
        }
    }
    
    // sorts yelp results by rating, price, distance, or alphabetically, also allows all search results to be viewed again

    sortResults(e) {
        const sort = event.target.value;
    
        this.setState((state) => ({
          filter: sort,
          restaurants: this.state.searchResults.slice().sort((a, b) => (
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

    // filters yelp results by price and rating in a 1 point range (ex. 2 - 3, 3 - 4);

    filterProducts(e) {
        let filter = e.target.value.split('-');
        let type = filter[0];
        let score = filter[1];
        let restaurants = this.state.searchResults.slice();
        // console.log(type, score);

        if (score === "all") {
            this.setState({
                filter: filter,
                restaurants: this.state.searchResults
            })
        } else {
            const filtered = [];

            restaurants.forEach((restaurant) => {
                if (restaurant[type] >= Number(score) && restaurant[type] < Number(score) + 1) {
                    filtered.push(restaurant);
                }
            })
            this.setState({
                filter: filter,
                restaurants: filtered
            })
        } 
    }

    // reordering function for items in tour list

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

    // deletes a single item from the tour list

    deleteCrawlItem(e){
        // console.log(e.target.getAttribute('value'));
        const index = Number(e.target.parentNode.getAttribute('index'));
        const crawl = this.state.crawl.slice(0, index).concat(this.state.crawl.slice(index + 1));
        
        this.setState({
            crawl: crawl
        })
    }

    // deletes an entire tour from favorites

    deleteTour(e) {
        // console.log(e.target.getAttribute('value'));
        const index = Number(e.target.getAttribute('value'));
        const favorites = this.state.favorites.slice(0, index).concat(this.state.favorites.slice(index + 1));
        // console.log('newfav', favorites);

        this.setState({
            favorites: favorites
        });
        localStorage.removeItem("favorites");
        console.log('here', this.state.favorites);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // displays alert asking for file type when user wants to download

    handleDownloadClick() {
        swal({
            title: "Hello",
            text: "Which file format do you prefer?",
            icon: "warning",
            buttons: {
                Cancel: true,
                json: true,
                csv: true,
                pdf: true
            },
        })
        .then((res) => {
            if (res === 'pdf') {
                this.handleSaveAsPDF();
            }
            if (res === 'csv') {
                this.handleSaveAsCSV();
            }
            if (res === 'json') {
                this.handleSaveAsJSON();
            }
        })
    }

    // below functions create file in type requested by user and then download that file

    handleSaveAsJSON() {
        console.log('saving as json');
        Axios.post('/create-json', { crawl: this.state.crawl} )
        .then(() => Axios.get('/get-json', {responseType: 'blob'}))
        .then((res) => {
            const jsonBlob = new Blob([res.data], {type: 'application/text/csv'});

            saveAs(jsonBlob, 'tour.json');
        })
    }

    handleSaveAsCSV() {
        console.log('saving as csv')
        Axios.post('/create-csv', { crawl: this.state.crawl })
        .then(() => Axios.get('/get-csv', {responseType: 'blob'}))
        .then((res) => {
            console.log(res);
            const csvBlob = new Blob([res.data], { type: 'application/text/csv'});
            
            saveAs(csvBlob, 'tour.csv');
        })
    }

    handleSaveAsPDF() {
        console.log('saving as PDF');
        Axios.post('/create-pdf', { crawl: this.state.crawl})
            .then(() => Axios.get('/get-pdf', {responseType: 'blob'}))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'tour.pdf');
        })
        .catch((err) => {
            console.log(err);
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
                                        <Sort restaurants={this.state.restaurants} sortResults={this.sortResults} filterProducts={this.filterProducts} />
                                    </div>
                                </div>
                                <div className="restaurant-container">
                                    {this.showRestaurants()}
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
                                        <FavoritesList fav={fav} key={index} index={index} deleteTour={this.deleteTour}/>
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


