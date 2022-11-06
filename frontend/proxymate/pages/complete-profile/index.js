import { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image"; 
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CompleteProfile() {
    const [interests, setInterests] = useState([]);
    const [interest, setInterest] = useState("")

    const [socials, setSocials] = useState([]);
    const [social, setSocial] = useState("")

    const [coords, setCoords] = useState([]);
    const [ cookie, setCookie ] = useCookies(['spotify'])
    useEffect(() => {
        console.log(cookie.spotify.token);
        navigator.geolocation.getCurrentPosition(function(p) {
            setCoords([p.coords.longitude, p.coords.latitude]);
        });
    }, []);
    const [bio, setBio] = useState("")
    return (
        <div className="bg-black h-[100vh] w-[100vw] text-white p-5 flex flex-col items-center justify-center">
            <ToastContainer />
            <h1 className="text-3xl font-extrabold mb-9 uppercase">Complete Your Profile.</h1>
            <div className="h-[90%] w-full flex flex-col items-center justify-center">
                <div>
                <h1 className="font-semibold text-lg">Add Your Interests.</h1>
                <div>
                    { interests.map(x => {
                        return (<h1 className="inline-block p-2 m-3 bg-gray-700 rounded-lg">{x}</h1>)
                    }) }
                </div>
                <input 
                    className="text-white bg-black border-b border-white"
                    value={interest}
                    onChange={(e) => {
                        setInterest(e.target.value)
                    }}
                />
                <button className="mx-3 p-3 rounded-xl bg-pink-700" onClick={() => {
                    setInterests([...interests, interest ]);
                    setInterest("");
                }}>Add</button>
                

                <h1 className="font-semibold text-lg">Add Your Socials.</h1>
                <div>
                    { socials.map(x => {
                        return (<h1 className="w-fit p-2 m-3 bg-gray-700 rounded-lg">{x}</h1>)
                    }) }
                </div>
                <input 
                    className="text-white bg-black border-b border-white"
                    value={social}
                    onChange={(e) => {
                        setSocial(e.target.value)
                    }}
                />
                <button className="mx-3 p-3 rounded-xl bg-pink-700" onClick={() => {
                    setSocials([...socials, social ]);
                    setSocial("");
                }}>Add</button>


                <h1 className="font-semibold text-lg mb-2">Something About You?</h1>
                <textarea 
                    className="text-white bg-black border-b border-white"
                    value={bio}
                    onChange={(e) => {
                        setBio(e.target.value)
                    }}
                />
                <button className="bg-pink-700 rounded-xl p-3 my-3 block w-[100%]" onClick={async() => {
                    const data = await axios.post('http://localhost:3000/profile/new', {
                        bio: bio,
                        interests: interests,
                        socials: socials,
                        lat: coords[1],
                        lon: coords[0],
                        userToken: cookie.spotify.token
                    });

                    const notify = () => toast("Updated Successfully");
                    notify();
                    console.log(data.data)
                }} >All done.</button>

                <Link className="bg-[#741f80] rounded-xl p-3 my-3 block w-[100%] text-center w-[100%]" href="/">Go Back!</Link>

                </div>
            </div>
        </div>
    )
}