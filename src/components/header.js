import {Link} from "gatsby"
import PropTypes from "prop-types"
import React from "react";
import Menu from "@material-ui/icons/Menu";
import Close from '@material-ui/icons/Close';
import Drawer from "@material-ui/core/Drawer/Drawer";

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  getIcon() {
    if (this.state.menuOpen) {
      return <Close style={{color: 'white', fontSize: '2.5em', margin: `0 auto`,}}/>
    }
    return <Menu style={{color: 'white', fontSize: '2.5em', margin: `0 auto`,}}/>
  }

  handleMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  render() {
    const {siteTitle} = this.props;

    return (
      <header
        style={{
          background: `mediumseagreen`,
          marginBottom: `1.45rem`,
          height: '100px'
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: '50%',
            margin: `0 auto`,
            padding: `1.45rem 1.0875rem`,
            height: '100px',
            verticalAlign: 'bottom'
          }}
        >
          <h1 style={{margin: 5, fontSize: '1.5em'}}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </div>
        <div align="right" style={{
          display: 'inline-block', width: '50%', paddingRight: '5%', margin: `0 auto`,
          padding: `1.45rem 1.0875rem`, height: '100px'
        }} onClick={this.handleMenu.bind(this)}>
          {this.getIcon()}
        </div>
        <Drawer onClose={this.handleMenu.bind(this)} open={this.state.menuOpen}>
          <div
            style={{width: 200}}
            tabIndex={0}
            role="button"
          >
            <ul style={{padding: '10%', textAlign: 'center', listStyleType: 'none', margin: 'auto', paddingTop: 50}}>
              <li><Link to={'/'}>Skaičiuoklė</Link></li>
              <li><Link to={'/products'}>Modeliai</Link></li>
              <li><Link to={'/products-form'}>Kurti modelį</Link></li>
              <li><Link to={'/history'}>Išdirbis</Link></li>
            </ul>
          </div>
        </Drawer>
      </header>
    )
  }
}


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
