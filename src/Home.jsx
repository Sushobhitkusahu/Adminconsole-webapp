import img from './assets/home.jpg'


const Home = () => {
  return (

    <>
  <div className=" h-full w-full object-cover flex justify-center" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    
     <div className="flex  items-center justify-cente p-6 sm:p-10 w-full max-w-md"> 
    

       <h1 className="text-xl backdrop-blur-sm rounded-xl sm:text-3xl font-bold text-white sm:mb-4 text-center">
        Welcome to the Admin Panel
      </h1> 
      </div> 
      
    
    {/* <img src={img} alt="KrishiVerse Logo" className="w-screen h-[100%] object-cover" /> */}
  
  </div>
  </>
  );
};

export default Home;
