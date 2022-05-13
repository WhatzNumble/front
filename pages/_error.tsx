import Layout from "components/Layout";
import { GetServerSideProps } from "next";
import Error from 'components/Error';

interface Props {
    errorMsg: string
    statusCode: number
}

function ErrorPage({errorMsg, statusCode}: Props){
    return <Error errorMsg={errorMsg}/>
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>{
    let errorMsg = '';
    const {statusCode} = ctx.res;

    switch(statusCode){
        case 404: 
            errorMsg = '찾을 수 없는 페이지입니다.'
            break;
        case 500: 
            errorMsg = '오류가 발생하였습니다.'
            break;
    }

    return {
        props: { 
            errorMsg,
            statusCode,
        },
    }
  }

export default ErrorPage;