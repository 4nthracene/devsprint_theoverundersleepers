import axios from "axios"

import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

export default function PenPal() {
    const [cookie, setCookie] = useCookies(['spotify'])
    const [loading, setLoading] = useState(true);
    const [pal, setPal] = useState(null)
    const [palPostIdea, setPalPost] = useState("");
    const [ urPalPost, setUrPalPost ] = useState();
    useEffect(() => {
        (async () => {
            const assign = await axios.post("http://localhost:3000/penpal/assign", { userToken: cookie.spotify.token });
            const getPal = await axios.post("http://localhost:3000/penpal/get", { userToken: cookie.spotify.token });
            console.log(getPal);
            setPal(getPal);
            setLoading(false)
        })()
    }, [])
    return (
        <div className="min-h-[100vh] bg-black text-white flex relative flex-col items-center justify-center">
            <h1 className="text-3xl uppercase font-extrabold absolute top-10 left-1/2">Pen Pal!</h1>
            { loading ? (<h1>Loading...</h1>) : (<div>
                {
                    urPalPost ? <div>
                        { urPalPost }
                    </div> : <div> <h1>You haven't wrote anything yet :(</h1> </div>
                }
                {
                    pal.palPost  ? <div>
                        { pal.palPost }
                    </div> : <div>
                        <h1>Your pal is waiting for you to text something :) </h1>
                    </div>
                }
            </div>) }
            <textarea value={palPostIdea} className='bg-gray-400 rounded-xl w-[80%] absolute bottom-10' onChange={(e) => {
                setPalPost(e.target.value)
            }}></textarea>
            <button className="absolute bottom-10 right-10 bg-pink-700 p-3 rounded-xl" onClick={async (e) => {
                await axios.post('http://localhost:3000/penpal/post', { userToken: cookie.spotify.token, post: palPostIdea });
                console.log('DONE DONE');
                setUrPalPost(palPostIdea);
                setPalPost("");
            }}>Pen Pal 🚀</button>
        </div>
    )
}