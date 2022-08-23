import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import UnicefReactOrgChart from '../components/orgChart';
import employee from "./Employees.json";
import { get } from "lodash";




function MyApp({ Component, pageProps }: AppProps) {
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") setRun(true);
  }, []);
  return <>
  {run && <UnicefReactOrgChart  />}
  
  </>
  // return <Component {...pageProps} />
}

export default MyApp
