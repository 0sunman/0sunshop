import { QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { getQueryClient } from "./queryClient";
import { routes } from "./routes";



const App = () =>{
  const elem = useRoutes(routes);
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{elem}</QueryClientProvider>
}


export default App;