exports.UserLogOut = (req,res)=>{
    try {
        res.cookie("authToken", "", {
            httpOnly: true, 
            secure: true,  
            sameSite: "None",
            expires: new Date(0), 
          });
          res.json({ success: true });
    } catch (error) {
        res.status(500).json("Something wrong happened!")
    }
    
}