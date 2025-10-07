import { Header } from "./components/header";


const Layout = ({ children }) => {
  

  return (
    <div className="w-full  min-h-screen">
        <Header/>
        
        <main className="w-full    p-0 md:p-6 lg:p-12 xl:p-20">
        {children}
      </main>
     
     
    </div>
  );
};

export default Layout;