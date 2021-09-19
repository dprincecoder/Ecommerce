import React from 'react'
import shopMen from './suitmen.jpeg';
import shopWomen from './shopwomen.jpg'
import './directory.scss'
import { Link } from 'react-router-dom';

const Directory = () => {
    return (
			<div className="directory">
				<div className="wrap">
					<div
						className="item"
						style={{ backgroundImage: `url(${shopWomen})` }}>
						<Link to="/search/womens"> Shop for Women</Link>
					</div>
					<div
						className="item"
						style={{ backgroundImage: `url(${shopMen})` }}>
						<Link to="/search/mens">Shop for Men</Link>
					</div>
				</div>
			</div>
		);
}

export default Directory
