const pageNotFound=(req,res)=>{
    return res.status(404).send('<h1>404</h1> "Page not found :("')
}

module.exports=pageNotFound