const http=require( 'http');

const server=http.createServer((req,res)=>{
    console.log(req)
    console.log('Abhishek')
}
)

server.listen(4000)