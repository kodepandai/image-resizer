import polka from 'polka'
import https from "https"
import sharp from "sharp"

const server = polka({
    onError: (err, req, res) => {
        if (err instanceof Error) {
            res.end("Server Error: " + err.message)
        }
        console.log("Server Error", err)
    },
    onNoMatch: (req, res) => {
        res.setHeader("content-type", "text/html")
        res.end("Are you lost? back to <a href='/'>Home</a>")
    }
});
server.get("/", (req, res) => {
    res.end("Image Resizer Service is running")
})
server.get("/:ext/:w/:src.webp", async (req, res) => {
    let { src, w = null, ext } = (req.params) as any
    const { domain } = req.query

    if (!domain) {
        throw Error("domain not defined")
    }
    if (w) {
        w = Number(w)
    }
    // const httResponse = await axios.get(src)
    // const buffer = httResponse.data
    // res.setHeader("content-type", "image/jpeg")
    let data: any[] = [];
    let buffer: Buffer | null = null;
    const url = `https://${domain}/${src}.${ext}`.replace(/\+/g, "/")
    https.get(url, (httpRes: any) => {
        httpRes.on('data', function (chunk: any) {
            data.push(chunk);
        }).on('end', async () => {
            //at this point data is an array of Buffers
            //so Buffer.concat() can make us a new Buffer
            //of all of them together
            try {
                buffer = Buffer.concat(data);
                const resized = await sharp(buffer).resize(w, null, {
                    fit: 'inside',
                    withoutEnlargement: true
                }).webp({
                    quality: 100,
                    lossless: true
                }).toBuffer()
                res.setHeader("Content-Type", "image/webp")
                res.setHeader("Cache-Control", "max-age=31536000")
                res.end(resized)
            } catch (error) {
                res.end("cannot resize image")
            }
        });
    });
})

server.listen(8000, () => {
    console.log("server run on http://localhost:8000")
})
