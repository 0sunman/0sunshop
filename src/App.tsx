import { QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { getQueryClient } from "./queryClient";
import { routes } from "./routes";
import GNB from "./components/gnb"
import "./sass/index.scss"



const App = () =>{
  const elem = useRoutes(routes);
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}><GNB/>{elem}</QueryClientProvider>
}


export default App;