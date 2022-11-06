import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function main() {
  const router = useRouter();
  const routeQuery = (router.query);

  const [_accessToken, setAccessToken] = useState(null);
  const [cookie, setCookie] = useCookies(["spotify"]);
  useEffect(() => {
    if(routeQuery.accessToken){
        const { accessToken } = router.query;
        setAccessToken(accessToken);
        navigator.geolocation.getCurrentPosition(async function(p) {
            const newLocation = await axios.post("http://localhost:3000/profile/setLocation", {lat: p.coords.latitude, lon: p.coords.longitude, userToken: accessToken});
            console.log(newLocation);
        });
        setCookie(
            "spotify",
            JSON.stringify(
            {
                token: accessToken,
            },
            { paht: "/", maxAge: 3600 * 24 * 30, sameSite: true }
            )
        );
    }
  }, [routeQuery])

  return (
    <div className="bg-black h-[100vh] w-[100vw] text-white text-3xl font-extrabold flex flex-col items-center justify-center">
        <h1>
            Signed In Successfully!
        </h1>
        <Link href="/complete-profile" className="font-light text-lg">Complete your profile now.</Link>
    </div>

  );
}
