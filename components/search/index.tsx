import { memo, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import styles from "./index.module.scss";
import type { FC, ReactElement } from "react";
import type { ISearchSuggest } from "@/service/home";

export interface IProps {
  children?: ReactElement;
  searchData: ISearchSuggest;
}
const Search: FC<IProps> = memo((props) => {
  const router = useRouter();
  const { searchData } = props;
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>("蓝牙耳机");

  const handleInputFocus = (isFocus: boolean) => {
    setInputFocus(isFocus);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const inputTarget = event.target as HTMLInputElement;
      setInputFocus(false);
      jumpPage(inputTarget.placeholder);
    }
  };

  const handleItemClick = (name: string) => {
    setPlaceholder(name);
    jumpPage(name);
  };

  const jumpPage = (name: string) => {
    router.push({
      pathname: "/search",
      query: {
        q: name,
      },
    });
  };

  return (
    <div className={styles.search}>
      {/* 搜索输入框 */}
      <div className={styles["search-bg"]}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          onFocus={() => handleInputFocus(true)}
          onBlur={() => handleInputFocus(false)}
          onKeyDown={(e) => handleKeyDown(e as any)}
        />
      </div>

      {/* 下拉的面板 */}
      <div
        className={classNames(
          styles["search-panel"],
          inputFocus ? styles.show : styles.hide
        )}
      >
        <div className={styles.shadow}></div>
        <h2>热门搜索</h2>
        <ul>
          {searchData?.configKey &&
            searchData?.configKey.map((item, index) => (
              <li
                key={item[index + 1]}
                onMouseDown={() => handleItemClick(item[index + 1])}
              >
                {item[index + 1]}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
});

Search.displayName = "Search"; // 方便调试用的
export default Search;
