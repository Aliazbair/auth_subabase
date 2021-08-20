import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../client";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  // create some state
  const [authenticatedState, setAuthentedSatate] =
    useState("not-authenticated");
  const router = useRouter();

  // useEffect
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // call handleAuthChange function
        handleAuthChange(event, session);

        // check the event == sing in
        if (event === "SIGNED_IN") {
          // set authenticated
          setAuthentedSatate("authenticated");
          router.push("/profile");
        }

        //  // check the event == sing out
        if (event === "SIGNED_OUT") {
          // set not authenticated
          setAuthentedSatate("not-authenticated");
        }
      }
    );

    // call checkUser function
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  // create handleAuthenchange function
  async function handleAuthChange(event,session){
    // fetch auth from api
    await fetch('/api/auth',{
      method:'POST',
      headers: new Headers({'Content-Type':'application/json'}),
      credentials:'same-origin',
      body:JSON.stringify({event,session})
    })
  }

  // create check user auth function
  async function checkUser(){
    // where the component loads, checks user to show or hide sign in lik
    const user =await supabase.auth.user()
    if(user){
      setAuthentedSatate("authenticated");
    }
  }
  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a>profile</a>
        </Link>
        {/* check  the user is sign in */}
        {authenticatedState === "not-authenticated" && (
          <Link href="/signIn">
            <a>signIn</a>
          </Link>
        )}
        <Link href="/protected">
          <a>protected</a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
