import React, {Component} from 'react';
import NavBar from './nav/NavBar'
import '../../public/assets/css/App.css';

class App extends Component {
    render() {
        return (
            <div>
                {/* NavBar */}
                <NavBar/>

                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
