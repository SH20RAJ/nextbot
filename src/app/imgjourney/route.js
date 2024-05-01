


export const GET = async (req, res, next) => {
    console.log(req);
    return Response.json({
        
    })
}
export const POST = async (req, res, next) => {
    let data = await req.json();
    let text = data.message.text;

    console.log(text);
    return Response.json({
        req
    })
}