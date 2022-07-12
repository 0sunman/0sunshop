import { QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { getQueryClient } from "./queryClient";
import { routes } from "./routes";
import { GNBBottom, GNBTop } from "./components/gnb"
import "./sass/index.scss"
import { ReactQueryDevtools } from 'react-query/devtools'


const App = () =>{
  const elem = useRoutes(routes);
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>
    <GNBTop/>
    {elem}
    <GNBBottom/>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
}


export default App;