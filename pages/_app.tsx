import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import UnicefReactOrgChart from "../components/orgChart";
import employee from "./Employees.json";
import OrgChart from "../components/orgChart2";

function listToTree(arr: any) {
  let map = {},
    node: any,
    roots = [],
    i: any;

  for (i = 0; i < arr.length; i++) {
    map[arr[i].id] = i;
    arr[i].children = [];
  }
  for (i = 0; i < arr.length; i++) {
    node = arr[i];
    if (node.line_manager_id !== null) arr[map[node.line_manager_id]].children.push(node);
    else roots.push(node);
  }
  return roots;
}

console.log(listToTree(employee.employees));

function MyApp({ Component, pageProps }: AppProps) {
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") setRun(true);
  }, []);
  return (
    <>
      {/* {run && <UnicefReactOrgChart  />} */}
      {run && <OrgChart {...{ data: listToTree(employee.employees)[0] }} />}
    </>
  );
  // return <Component {...pageProps} />
}

export default MyApp;
