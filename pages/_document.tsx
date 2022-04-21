import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head/>
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