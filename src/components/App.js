import React, {Component} from 'react';
import '../app.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render () {
        return (
            <div className="grid-container">
                <header>
                    Header
                </header>
                <searchbar>
                    Search Bar
                </searchbar>
                <main>
                    <div className="content">
                        <div className="main">
                            Main
                        </div>
                        <div className="sidebar">
                            Sidebar
                        </div>
                    </div>
                </main>
                <footer>
                    Footer
                </footer>
            </div>
        )
    }
}

export default App;