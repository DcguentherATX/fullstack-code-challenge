import React, {Component} from 'react';
import '../app.css';
import SearchBar from './SearchBar';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            cuisine: ''
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

        console.log(this.state.location, this.state.cuisine);
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
                            Main
                        </div>
                        <div className="sidebar">
                            Sidebar
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