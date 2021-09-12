import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { checkUserIsAdmin } from '../../Utils';
import './AdminToolBar.scss';

//map user to state
const mapState = ({ user }) => ({
    currentUser: user.currentUser
})
const AdminToolBar = () => {
    const { currentUser } = useSelector(mapState);
    
    //determine if user is admin
    const isAdmin = checkUserIsAdmin(currentUser);
    if(!isAdmin) return null
    return (
        <div className="adminToolBar">
            <ul>
                <li>
                    <Link to="/admin">My Admin</Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminToolBar
