const jwt = require("jsonwebtoken");


const middlewareController = {
    verifyToken:(req,res,next) =>{
        const token = req.headers.token ;
        if(token){
            const accessToken = token.split(" ")[0];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY,(err,user)=>{
                if(err){
                    res.status(403).json("Token không tồi tại");
                }
                req.user = user;
                next();
            });
        }
        else{
            res.status(401).json("Lỗi token không xác định");
        }
    },
    verifyTokenAdmin:(req,res,next) =>{
        middlewareController.verifyToken(req,res, ()=>{
            if(req.user.id == req.params.id || req.user.type == 'admin'){
                next();
            }else{
                res.status(403).json("Bạn không đủ quyền hạn")
            }
        })
    }
}

module.exports = middlewareController;