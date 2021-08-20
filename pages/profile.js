import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";

export default function Profile() {
  // create some state
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  // create useEffect
  useEffect(() => {
    //    call profileData function
    profileData();
  }, []);

  // create profileData function
  const profileData = async () => {
    //   get user info from subabase auth
    const profileData = await supabase.auth.user();

    // check the profielData
    if (!profileData) {
      // redirect  user to sing in page
      router.push("/signIn");
    } else {
      //    set profileData to profile state
      setProfile(profileData);
    }
  };

  //   create signOut function
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/signIn");
  };

  // check the profileData
  if (!profile) return null;
  return (
    <div>
      <h1>{profile.email}</h1>
      <h3>{profile.id}</h3>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
