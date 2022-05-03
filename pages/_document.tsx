import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css' rel='stylesheet' type='text/css'/>
                </Head>

                <body>
                    <div id='modal-root'></div>
                    <Main/> 
                    <NextScript/>
                </body>
            </Html>
        ) 
    }
}

export default CustomDocument;