import { RouterProvider } from "react-router-dom";
import router from "./Router/Routes/Routes";


function App() {


  return (
    <RouterProvider router={router}>
      <div className='max-w-[1440px] mx-auto'>
      </div>
    </RouterProvider>
  );
}

export default App;
