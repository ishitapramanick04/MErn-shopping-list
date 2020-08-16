import React, {Component,Fragment} from 'react';
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from  'reactstrap';
import RegisterModal from './Auth/RegisterModal';
import Logout from './Auth/Logout';
import Login from './Auth/Login';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component{
    state={
        isOpen:false
    }
    static propTypes={
        auth:PropTypes.object.isRequired
    }
    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    render(){
        const {user,isAuthenticated}=this.props.auth;
        const authLinks=(
            <Fragment>
            <NavItem>
            <Logout/>
            </NavItem>
            </Fragment>
        )
        const guestLinks=(
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <Login />
                </NavItem>
            </Fragment>
        )
        return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
            
            <Container>
                <NavbarBrand href="/">Shopping List</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                       {isAuthenticated?authLinks:guestLinks}
                    </Nav>
                </Collapse>
            </Container>
            </Navbar>
        </div>)
    }
}
const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps,null) (AppNavbar);