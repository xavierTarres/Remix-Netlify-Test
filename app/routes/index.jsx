import { useLoaderData } from "@remix-run/react";
import CardTable from "~/components/CardTable";
import Dropdown from "~/components/Dropdown";
import Navbar from "~/components/Navbar/Navbar";


export const loader = ({
  params,
}) => {
  return Array.from(Array(20).keys(), n => n + 1)
};




export default function Index() {
  let ids = useLoaderData()

  return (
    <div>
      <Navbar></Navbar>
       <CardTable></CardTable>
    </div>
  );
}