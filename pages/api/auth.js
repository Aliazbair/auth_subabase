import {supabase} from '../../client'

export default function handler(res,req){
  supabase.auth.api.setAuthCookie(req,res)
}