
import { RouterProvider } from "react-router-dom"
import router from "./lazy-router"





function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
