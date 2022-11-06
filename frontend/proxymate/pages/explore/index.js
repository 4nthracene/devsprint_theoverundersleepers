import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link";
import axios from "axios";

export default function ExplorePage() {
    const [ lon, setLon ] = useState(null);
    const [ lat, setLat ] = useState(null);
    const [ location, setLocation ] = useState("");
    const [ nearbyData, setNearby ] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLon(position.coords.longitude);
            setLat(position.coords.latitude);
        });
    }, []);
    useEffect(() => {
        (async() => {
            if(lon && lat) {
                const data = await axios.post(`http://localhost:3000/profile/location`, { lon, lat });
                setLocation(data.data.location);
                const nearbyData = await axios.post(`http://localhost:3000/profile/nearby`, { maxDist: 5000, lon, lat });
                setNearby(nearbyData.data.nearbyUsers);
                console.log(nearbyData);
            }
            console.log(lon, lat);

        })()
    }, [ lon ])
    return (
        <div className="flex flex-col w-[100vw] min-h-[100vh] bg-black text-white">
            <div className="p-5 flex justify-between items-center border border-white rounded-xl m-4">

                <div className="flex flex-col">
                    <h1 className="font-extrabold">You are currently in: </h1>
                    <h1>lon: {lon}</h1>
                    <h1>lat: {lat}</h1>
                    <h1>You are currently in: {location}</h1>
                </div>
                <Link href="/" className="h-full p-9">Go back</Link>
            </div>

            <div className="flex flex-col gap-4">
                {
                    nearbyData.map(x => (
                        <div className="flex p-9" key={x.username}>
                            <div className="flex flex-col w-1/2 text-lg">
                                <h1 className="font-extrabold text-3xl">{x.username}</h1>
                                <h1 className="font-light text-lg">{x.bio}</h1>
                                <h1 className="text-lg font-semibold">Interests:</h1>
                                    <div className="flex">
                                        {x.interests.map(art => (
                                            <h1 className="p-2 m-3 inline bg-gray-700 rounded-lg">{art}</h1>
                                        ))}
                                    </div>
                                <h1 className="text-lg font-semibold">Connect?</h1>
                                    <div className="flex">
                                        {x.socials.map(art => (
                                            <a className="p-2 m-3 inline bg-gray-700 rounded-lg hover:bg-pink-700" target="_blank" href={art}>{art.split(".")[1]}</a>
                                        ))}
                                    </div>
                            </div>
                            
                            <div className="flex flex-col w-1/2">
                                <h1>Favorite Music Artists:</h1>
                                <div className="grid grid-cols-2 w-fit">
                                    {x.topArtists.slice(0,4).map(art => (
                                        <div className="p-3 m-1 rounded-full">
                                            <Image src={art.images[0].url} width={180.34} height={180.34} />
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <hr />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}