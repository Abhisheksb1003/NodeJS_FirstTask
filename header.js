const http=require('http');

const server=http.createServer((req,res)=>{
const url=req.url;
if(url=='/home'){
res.write('<html><head><h1>welcome to URL</h1></head></html>')
res.end()
}
if(url=='/about'){
    res.write('<html><head><h1>welcome to about us page</h1></head></html>')
    res.end()
}
if(url=='/node'){
    res.write('<html><head><h1>welcome to Node js</h1></head></html>')
    res.end()
}
}
)

server.listen(3000)
