import React from 'react'
import './header.scss'
import logo from './dpLogo1.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUserStart } from '../../redux/User/user.actions'

//retrun currentUser object from state passed in userReducer
const mapState = ({ user }) => ({
	currentUser: user.currentUser
})

const Header = (props) => {
	const dispatch = useDispatch();

	const { currentUser } = useSelector(mapState);

	const signOut = () => {
		dispatch(signOutUserStart())
	}
	
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
									<span onClick={() => signOut()}>LOGOUT</span>
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


export default Header;
