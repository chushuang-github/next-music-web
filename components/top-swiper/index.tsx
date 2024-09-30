import { memo, useState, useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import classNames from "classnames";
import styles from "./index.module.scss";
import type { FC, ReactElement, ElementRef } from "react";
import type { IBanner } from "@/service/home";

export interface IProps {
  children?: ReactElement;
  banners: IBanner[];
}

const TopSwiper: FC<IProps> = memo((props) => {
  const { banners } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);

  const onSwiperChange = (currentIndex: number) => {
    setCurrentIndex(currentIndex);
  };

  const handlePrevClick = () => {
    bannerRef.current?.prev();
  };

  const handleNextClick = () => {
    bannerRef.current?.next();
  };

  return (
    <div className={styles["top-swiper"]}>
      <div className={classNames("wrapper", styles.content)}>
        <Carousel
          className={styles.carousel}
          ref={bannerRef}
          autoplay
          autoplaySpeed={3000}
          fade
          dots={false}
          afterChange={onSwiperChange}
        >
          {banners?.map((banner) => (
            <div key={banner.id} className={styles["swiper-item"]}>
              {/* 背景 */}
              <div
                className={styles["swiper-bg"]}
                style={{
                  backgroundImage: `url(${banner.backendPicStr})`,
                }}
              ></div>
              <Image
                className={styles.image}
                src={banner.picStr!}
                alt="banner"
                width={1100}
                height={480}
                priority={true}
              ></Image>
            </div>
          ))}
        </Carousel>

        {/* 指示器 */}
        <ul className={styles.dots}>
          {banners?.map((banner, index) => (
            <li
              key={banner.id}
              className={classNames(styles.dot, {
                [styles.active]: index === currentIndex,
              })}
            ></li>
          ))}
        </ul>
      </div>

      {/* 定位：上一页和下一页 */}
      <button className={styles.prev} onClick={handlePrevClick}>
        <span></span>
      </button>
      <button className={styles.next} onClick={handleNextClick}>
        <span></span>
      </button>
    </div>
  );
});

TopSwiper.displayName = "TopSwiper"; // 方便调试用的
export default TopSwiper;
