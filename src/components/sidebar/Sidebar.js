import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="sidebar">
       <Image src="/component2.png" width={231} height={615} alt="Avatar" className="sideImage" />
    </aside>
  );
};

export default Sidebar;
