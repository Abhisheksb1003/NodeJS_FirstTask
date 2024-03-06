const fs=require('fs');

const requestHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;

    if (url === "/") {
        fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.log(err);
            }
            let messages = data ? data.split("\n") : [];
            res.write("<html>");
            res.write("<head><title>Enter Message</title></head>");
            res.write("<body>");
            res.write("<h2>Messages:</h2>");
            res.write("<ul>");
            messages.forEach((message) => {
                if (message.trim() !== "") {
                    res.write("<li>" + message + "</li>");
                }
            });
            res.write("</ul>");
            res.write("<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form>");
            res.write("</body>");
            res.write("</html>");
            return res.end();
        });
    } else if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        return req.on("end", () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1];
            fs.appendFile("message.txt", message + "\n", (err) => {
                if (err) {
                    console.log(err);
                    return res.end();
                }
                console.log('Message appended to file');
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    } else {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My first page</title></head>");
        res.write("<body><h1>Hello from Node.js</h1></body>");
        res.write("</html>");
        return res.end();
    }
}

module.exports={
    handler:requestHandler,
    text:'some text about this code'
};