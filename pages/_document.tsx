// 这个四个属性是必须的
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title>云音乐商城</title>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="keyword" content="广州弘源科教 Next Music Web" />
        <meta name="description" content="react next music app" />
      </Head>
      <body className="hy-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
