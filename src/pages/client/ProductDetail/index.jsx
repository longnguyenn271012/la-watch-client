import React, { useEffect } from "react";
import "./index.css";
import LayoutClientPage from "../../../HOCs/LayoutClientPage";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { addToCart } from "../../../store/action/cart";

import { NavLink } from "react-router-dom";
import WatchItem from "../../../components/WatchItem";
import { setProductAction } from "../../../store/action/products";

const ProductDetail = () => {
  const productDetail =
    useSelector((state) => state.products.productDetail) || null;

  const me = useSelector((state) => state.auth.auth);
  const relatedProductList =
    useSelector((state) => state.products.productList) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductAction("", productDetail.productTypeId));
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settings_related_sliders = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    rows: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddToCart = (userId, productId, quantity) => {
    dispatch(addToCart(userId, productId, quantity));
    console.log("id addtocart : ", userId, productId, quantity);
  };

  return (
    <LayoutClientPage>
      <div className="pt-5">
        <div className="container product">
          <div className="row">
            <div className="col-12 col-lg-7 mb-5">
              <Slider {...settings}>
                {productDetail.productImage.map((item, index) => {
                  return (
                    <div key={index}>
                      <img src={item} alt="" />
                    </div>
                  );
                })}
              </Slider>
            </div>

            <div className="col-12 col-lg-5 product-left">
              <div className="product-content">
                <div className="product-info">
                  <p>Tên sản phẩm</p>
                  <p className="font-weight-bold">
                    {productDetail.productName}
                  </p>
                </div>
                <hr />
                <div className="product-info">
                  <p>Giá</p>
                  <p className="font-weight-bold">{productDetail.price} ₫</p>
                </div>
                <hr />
                <div className="product-info">
                  <p>Số lượng tồn kho:</p>
                  <p className="font-italic text-success">
                    {productDetail.quantity}
                  </p>
                </div>
                <hr />
                <div className="product-info">
                  <p>Kích thước mặt</p>
                  <p>{productDetail.faceSize} MM</p>
                </div>
                <hr />
                <div className="product-info">
                  <p>Loại máy</p>
                  <p>{productDetail.machineType}</p>
                </div>
                <hr />
                <div className="product-info">
                  <p>Chất liệu dây</p>
                  <p>{productDetail.ropeMaterial}</p>
                </div>
                <hr />
                <div className="product-info">
                  <p className="text-danger">Số lượng mua</p>
                  <select id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <hr />
              </div>
              <div className="">
                <button
                  onClick={() =>
                    handleAddToCart(
                      me._id,
                      productDetail._id,
                      document.querySelector("#quantity").value
                    )
                  }
                  className="w-100 p-3 mb-3 btn btn-primary"
                >
                  Thêm vào giỏ
                </button>
                <br />
                <NavLink to="/checkout">
                  <button
                    onClick={() =>
                      handleAddToCart(me._id, productDetail._id, 1)
                    }
                    className="w-100 p-3 mb-3 btn btn-success"
                  >
                    Thanh toán ngay
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="related-product container py-5">
          <div className="row">
            <h3>Sản phẩm cùng loại </h3>
            <Slider {...settings_related_sliders}>
              {relatedProductList.map((item, index) => {
                return <WatchItem item={item} key={index} />;
              })}
            </Slider>
          </div>
        </div>
        <div className="policy mt-5 bg-light p-4">
          <div className="row text-center">
            <div className="col-12  col-lg-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-truck"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
              <span className="ml-1">FREESHIP ĐƠN HÀNG TỪ 700K</span>
            </div>
            <div className="col-12  col-lg-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-shield-check"
                viewBox="0 0 16 16"
              >
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              </svg>
              <span className="ml-1">BẢO HÀNH 10 NĂM</span>
            </div>
            <div className="col-12  col-lg-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-archive"
                viewBox="0 0 16 16"
              >
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
              </svg>
              <span className="ml-1">ĐỔI TRẢ MIỄN PHÍ TRONG VÒNG 3 NGÀY</span>
            </div>
          </div>
        </div>
      </div>
    </LayoutClientPage>
  );
};

export default ProductDetail;
