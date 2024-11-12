import Image from "next/image";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="avatar">
          <Image src="/avatar.png" width={91} height={91} alt="Avatar" />
          <div className="toogle-action">
            <Image src="/increase.png" width={218} height={62} alt="Avatar" />
            <Image src="/countzero.png" width={65} height={45} alt="Avatar" className='count' />
            <Image src="/plus.png" width={30} height={30} alt="Avatar" className='plus' />
          </div>
        </div>
      </div>
      <div className="logo">
        <Image
          src="/logo.png"
          width={492}
          height={134}
          alt="Picture of the author"
        />
      </div>
      <div className="header-right">
        <Image src="/cross.png" width={64} height={64} alt="Avatar" className="right-icon"/>
        <Image src="/navicon.png" width={64} height={64} alt="Avatar" />
      </div>
    </header>
  );
};

export default Header;
