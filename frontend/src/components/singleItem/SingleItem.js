import React, { useEffect } from "react";
import "./singleItem.css";
//option1
// import Carousel from "react-multi-carousel";
//option2
import Carousel from "react-bootstrap/Carousel";
import "react-multi-carousel/lib/styles.css";

export default function SingleItem({ imgLinkArray }) {
  //if you want to show all pictures in 1 line
  const responsive = {
    superLargeDesktop: {
      //the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const images = ['/assests/singleItemPics/keychronK2Pic1.jpg',
  //                 '/assests/singleItemPics/keychronK2Pic2.jpg',
  //                 '/assests/singleItemPics/keychronK2Pic3.jpg',
  //                 '/assests/singleItemPics/keychronK2Pic3.jpg',
  //                 '/assests/singleItemPics/keychronK2Pic1.jpg',
  //                 '/assests/singleItemPics/keychronK2Pic2.jpg',
  //                 '/assests/singleItemPics/keychronK2Pic3.jpg',
  //                 '/assests/singleItemPics/keychronK2Pic3.jpg',
  //                 ];
  // return (
  //     <div>

  //        <Carousel
  //   ssr
  //   partialVisbile
  // //   deviceType={deviceType}
  //   itemClass="image-item"
  //   responsive={responsive}
  // >
  //   {images.slice(0, ).map((image, index) => {
  //     return (
  //       <div key={index} style={{ position: "relative" }}>
  //         <img
  //           draggable={false}
  //           alt="text"
  //           style={{ width: "100%", height: "100%" }}
  //           src={image}
  //         />
  //       </div>
  //     );
  //   })}
  // </Carousel>
  //     </div>

  //if you want to show carousel in just 1 image

  useEffect(() => {
    console.log(imgLinkArray);
  }, [imgLinkArray]);
  return (
    <div className="singleItemWrapper">
      <Carousel responsive={responsive}>
        {imgLinkArray?.map((imgLink) => (
          <Carousel.Item>
            <img
              className="singleItemCarouselItemImg"
              src={PF + imgLink}
              alt=""
            />
          </Carousel.Item>
        ))}

        {/* <Carousel.Item>
          <img
            className="singleItemCarouselItemImg"
            src="/assests/singleItemPics/keychronK2Pic2.jpg"
            alt=""
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="singleItemCarouselItemImg"
            src="/assests/singleItemPics/keychronK2Pic3.jpg"
            alt=""
          />
        </Carousel.Item> */}
      </Carousel>
    </div>
  );
}
