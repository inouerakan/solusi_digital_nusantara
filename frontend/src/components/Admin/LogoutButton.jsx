import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    }

    return (
        <button 
            type='button' 
            className='px-2 py-1 border border-light-1/10 rounded-sm hover:bg-dark-3 cursor-pointer'
            onClick={handleLogout}>
                Logout
            </button>
    )
}