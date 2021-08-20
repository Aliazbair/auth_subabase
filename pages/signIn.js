import {useState,useEffect} from 'react'

import {supabase} from '../client'

export default function SignIn() {
    // create some state
    const [email,setEmail]=useState('')
    const [submitted,setSubmitted]=useState(false)

    // create sign in function 
    async function signIn(){
        // make some vialed
        if(!email)return
        const {error,data}=await supabase.auth.signIn({email})
        // check  the error
        if(error){
            console.log({error});
        }else{
            //  set submitted state to true
            setSubmitted(true)

        }
    }

    // check  the submitted state
    if(submitted){
        return(
            <div>
                <h1>Please check your email to sign in</h1>
            </div>
        )
    }

    // else show  from 
    return(
        <div>
            <main>
                <h1>Sign in</h1>
                <input className='p-4 bg-gray-500 w-50 outline-none' type="email" onChange={e=>setEmail(e.target.value)} />
                <button onClick={()=>signIn()}>Sign In</button>
            </main>
        </div>
    )
 
}
