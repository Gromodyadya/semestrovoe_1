import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, logoutAsync, selectUser } from '../../features/auth/authSlice';
import { useTheme } from '../../styles/theme'; // Предполагаем, что стили для Navbar будут в theme.js или отдельном CSS

function Navbar() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme(); // Для кнопки темы в Navbar

    const handleLogout = () => {
        dispatch(logoutAsync());
        navigate('/login');
    };
    
    // Простые стили для примера
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        background: theme === 'light' ? '#e9ecef' : '#343a40',
        color: theme === 'light' ? '#000' : '#fff',
        marginBottom: '20px',
    };
    const linkStyle = {
        color: theme === 'light' ? '#007bff' : '#61dafb',
        margin: '0 10px',
        textDecoration: 'none',
    };
    const buttonStyle = {
        padding: '5px 10px',
        cursor: 'pointer',
        background: theme === 'light' ? '#007bff' : '#61dafb',
        color: theme === 'light' ? '#fff' : '#000',
        border: 'none',
        borderRadius: '4px',
        marginLeft: '10px',
    };

    return (
        <nav style={navStyle}>
            <div>
                <Link to={isAuthenticated ? "/tasks" : "/"} style={linkStyle}>Task Manager</Link>
                {isAuthenticated && <Link to="/tasks" style={linkStyle}>Мои Задачи</Link>}
            </div>
            <div>
                {isAuthenticated ? (
                    <>
                        <span style={{marginRight: '10px'}}>Привет, {user?.username}!</span>
                        <button onClick={handleLogout} style={buttonStyle}>Выйти</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Вход</Link>
                        <Link to="/register" style={linkStyle}>Регистрация</Link>
                    </>
                )}
                <button onClick={toggleTheme} style={buttonStyle}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;