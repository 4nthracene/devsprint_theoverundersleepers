import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function main() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [cookie, setCookie] = useCookies(["spotify"]);
  useEffect(() => {
    const { _accessToken } = router.query;
    setAccessToken(_accessToken);
    if(accessToken){
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
  }, [])

  return (
    <div className="bg-black h-[100vh] w-[100vw] text-white text-3xl font-extrabold flex flex-col items-center justify-center">
        <h1>
            Signed In Successfully!
        </h1>
        <Link href="/complete-profile" className="font-light text-lg">Complete your profile now.</Link>
    </div>

  );
}
