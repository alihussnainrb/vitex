
import { RouterProvider } from "react-router-dom"
import pagesRouter from "./lib/router"





function App() {
  return (
    <RouterProvider router={pagesRouter} />
  )
}

export default App
