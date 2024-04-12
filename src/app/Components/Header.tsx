import React, { memo, useEffect } from "react";
import Cart from "../../../public/Cart.png"
import Search from "../assets/icons/Search";
import { useRouter } from "next/navigation";

const Header = () => {
  let token;
  const router = useRouter();

  const SmallTextStyle = "font-inter text-xs md:text-sm lg:text-base";
const CustomCenterElements =
  "font-inter font-semibold text-base md:text-lg lg:text-xl";

  useEffect(() => {
    token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
    }
  }, []);

  return (
    <div className="bg-white text-black">
      {/* First row */}
      <div className="flex justify-end py-2">
        <div>
        <a
            href="#"
            className={`mr-4 ${SmallTextStyle}`}
            style={{ lineHeight: '14.52px', textAlign: 'left' }}
          >
            Help
          </a>
          <a
            href="#"
            className={`mr-4 ${SmallTextStyle}`}
            style={{ lineHeight: '14.52px', textAlign: 'left' }}
          >
            Orders & Returns
          </a>
          <a
            href="#"
            className={`mr-4 ${SmallTextStyle}`}
            style={{ lineHeight: '14.52px', textAlign: 'left' }}
          >Hi, John</a>
        </div>
      </div>

      {/* Second row */}
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <span
            className="font-inter text-2xl font-semibold md:text-3xl lg:text-4xl"
            style={{ lineHeight: "38.73px", textAlign: "left" }}
          >
            ECOMMERCE
          </span>
        </div>
        <div className="flex justify-center">
          <a
            href="#"
            className={`mx-4 ${CustomCenterElements}`}
            style={{ lineHeight: "19.36px", textAlign: "left" }}
          >Categories </a>
          <a
            href="#"
            className={`mx-4 ${CustomCenterElements}`}
            style={{ lineHeight: "19.36px", textAlign: "left" }}
          >
            Sale
          </a>
          <a
            href="#"
            className={`mx-4 ${CustomCenterElements}`}
            style={{ lineHeight: "19.36px", textAlign: "left" }}
          >
            Clearance
          </a>
          <a
            href="#"
            className={`mx-4 ${CustomCenterElements}`}
            style={{ lineHeight: "19.36px", textAlign: "left" }}
          >
            New stock
          </a>
          <a
            href="#"
            className={`mx-4 ${CustomCenterElements}`}
            style={{ lineHeight: "19.36px", textAlign: "left" }}
          >
            Trending
          </a>
        </div>
        <div className="flex">
          {/* Image for Search */}
          <a href="#" className="mr-4">
            <img src="/Search.png" alt="Search" />
          </a>
          {/* Image for Cart */}
          <a href="#">
            <img src="/Cart.png" alt="Cart" />
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
  <label>{"<"}</label>
  <label
    style={{
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '16.94px',
      textAlign: 'left',
      margin: '0 8px', // Add margin to create space between arrows and text
    }}
  >
    Get 10% off on business sign up
  </label>
  <label>{">"}</label>
</div>
    </div>  );
};

export default Header;
