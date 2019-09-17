import React, {Component} from 'react'
import { faArrowLeft, faBars, faMobileAlt, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default class Toggle extends Component {

    state = {
        on: false,
    }

    toggle = () => {
        this.setState({
            on: !this.state.on
        })
    }

    render() {
        return (
            <div>
                <a href="/" onClick={this.toggle}><FontAwesomeIcon className="bars" icon={ faBars }/></a>
                {this.state.on && this.props.children}
            </div>
        )
    }
}