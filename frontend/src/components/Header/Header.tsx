import './Header.scss'
interface HeaderProps {
  titlePage: string;
  descriptionPage: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ titlePage, descriptionPage, children }) => {
  return (
    <div className='header-container'>
        <div className='header-wrapper'>

        <h3 className='header-description'>{descriptionPage}</h3>
        <h1 className='header-title'>
          {titlePage}
        </h1>
      </div>
      {children}
    </div>
  )
};

export default Header;