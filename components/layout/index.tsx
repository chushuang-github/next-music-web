import { memo } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import type { FC, ReactElement } from "react";

export interface IProps {
  children?: ReactElement;
}
const Layout: FC<IProps> = memo((props) => {
  const { children } = props;

  return (
    <div className="layout">
      {/* navbar */}
      <Navbar />

      {/* 页面的内容 */}
      {children}

      {/* footer */}
      <Footer />
    </div>
  );
});

Layout.displayName = "Layout"; // 方便调试用的
export default Layout;
