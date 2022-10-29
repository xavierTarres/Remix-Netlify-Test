import { useEffect, useState } from "react";
import HouseCard from "./HouseCard"
import useInfiniteScroll from "~/utils/useInfiniteScroll";




export default function(params)
{
    const [listItems, setListItems] = useState(Array.from(Array(24).keys(), n => n + 1));
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    function fetchMoreListItems() {
        setTimeout(() => {
        console.log('Fetching')
        setListItems(prevState => ([...prevState, ...Array.from(Array(24).keys(), n => n + prevState.length + 1)]));
        setIsFetching(false);
        }, 2000);
    }

    return(
        <div className="grid-container">
            {listItems.map((id)=>{
                return <div className="grid-item"><HouseCard id={id}/></div>
            })}
        </div>
    )
}