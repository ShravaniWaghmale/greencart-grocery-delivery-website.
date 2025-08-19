import jwt from 'jsonwebtoken'

const authUser = async (req, res, next)=> {
    const {token}= req.cookies;

    if(!token) {
        return res.json({success: 'false', message: 'not authorized'})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {
        req.user = { id: tokenDecode.id } // ✅ Use req.user, not req.body
        //changing below two lines because its not working
        // if(tokenDecode.id) {
        //     req.body.userId = tokenDecode.id

        } else {
            return res.json({success: 'false', message: 'not authorized'})
        }
        next()
    } catch (error) {
        return res.json({success: 'false', message: error.message})
    }
}

export default authUser;
