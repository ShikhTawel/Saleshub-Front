import FButton from '../components/FButton'

const Header = () => {
    
  function logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    localStorage.removeItem('access_token')
    window.location.href = '/'
  }

  return (
    <div className={'bg-orient-500 p-3 f-col-center text-white w-full'}>
      <span>Fawry Merchant System</span>
      <FButton onClick={() => logout()}>Logout</FButton>
    </div>
  )
}
export default Header
