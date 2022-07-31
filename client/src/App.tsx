import { QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { getQueryClient } from "./queryClient";
import { routes } from "./routes";
import { GNBBottom, GNBLoad, GNBTop } from "./components/gnb"
import "./sass/index.scss"
import { ReactQueryDevtools } from 'react-query/devtools'


const App = () =>{
  const elem = useRoutes(routes);
  const queryClient = getQueryClient();
  /*    <ReactQueryDevtools initialIsOpen={false} />*/
  return <QueryClientProvider client={queryClient}>
    <GNBLoad/>
    <GNBTop/>
    {elem}
    <GNBBottom/>
  </QueryClientProvider>
}


export default App;