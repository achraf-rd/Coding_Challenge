import users from '@/users.json'



export async function GET(request){
    return Response.json({users})
}