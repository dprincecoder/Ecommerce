import React from 'react'
import './header.scss'
import logo from './dpLogo1.png'
import { Link } from 'react-router-dom'
const index = (props) => {
    return (
			<header className="header">
				<div className="wrap">
					<div className="logo">
						<Link to="/">
							<img src={logo} alt="dprincecoder logo" />
						</Link>
					</div>

					<div className="callToActions">
						<ul>
							<li>
								<Link to="/register"> Register</Link>
							</li>
							<li>
								<Link to="/login"> Login</Link>
							</li>
						</ul>
					</div>
				</div>
			</header>
		);
}

export default index
