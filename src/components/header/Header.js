import React from 'react'
import './header.scss'
import logo from './dpLogo1.png'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { connect } from 'react-redux'

const Header = (props) => {

	const { currentUser } = props
	
    return (
			<header className="header">
				<div className="wrap">
					<div className="logo">
						<Link to="/">
							<img src={logo} alt="dprincecoder logo" />
						</Link>
					</div>

					<div className="callToActions">
						{currentUser ? (
							<ul>
								<li>
									<Link to="/dashboard"> Dashboard</Link>
								</li>
								<li>
									<span onClick={() => auth.signOut()}>LOGOUT</span>
								</li>
							</ul>
						) : (
							<ul>
								<li>
									<Link to="/register"> Register</Link>
								</li>
								<li>
									<Link to="/login"> Login</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</header>
		);
}

Header.defaultProps = {
	currentUser: null
}

//retrun currentUser object from state passed in userReducer
const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header)
