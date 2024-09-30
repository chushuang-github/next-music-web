// pages -> index.tsx
import { memo } from "react";
import type { FC, ReactElement } from "react";

export interface IProps {
  children?: ReactElement;
}
const Home: FC<IProps> = memo(() => {
  return (
    <div className="home">
      <div>Home</div>
    </div>
  );
});

Home.displayName = "Home"; // 方便调试用的
export default Home;
