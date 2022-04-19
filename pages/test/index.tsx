import type { NextPage } from "next";
import Layout from "components/Layout";

import Video from "components/Video";

const Test: NextPage = () => {
  return (
    <Layout>
      <Video isEmbed videoSrc='tGSvvcqhmwM' />
    </Layout>
  );
};

export default Test;
