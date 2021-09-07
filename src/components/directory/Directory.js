import React from 'react'
import shopMen from './suitmen.jpeg';
import shopWomen from './shopwomen.jpg'
import './directory.scss'

const Directory = () => {
    return (
			<div className="directory">
				<div className="wrap">
					<div
						className="item"
						style={{ backgroundImage: `url(${shopWomen})` }}>
						<a href="/shop"> Shop for Women</a>
					</div>
					<div
						className="item"
						style={{ backgroundImage: `url(${shopMen})` }}>
						<a href="/shop">Shop for Men</a>
					</div>
				</div>
			</div>
		);
}

export default Directory
