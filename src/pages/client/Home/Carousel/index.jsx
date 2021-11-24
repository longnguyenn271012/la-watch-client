import React, { Fragment } from 'react';
import "./index.css"

const Carousel = (props) => {
    return (
        <div>
            <div className="banner">
                <div className="banner-image">
                    <img src="https://curnonwatch.com/_next/image?url=https%3A%2F%2Fcms.curnonwatch.com%2Fuploads%2FColo_Desk_267245c4fa.jpeg&w=3840&q=75" className="mw-100" height="600" alt="" />
                </div>
                <div className="banner-content ">
                    <div className="banner-title">SALE UP TO 30%</div>
                    <div className="banner-subtitle">EVERYTHING</div>
                    <div className="banner-description">Những bộ sưu tập HOT nhất cũng đã quay trở lại</div>
                    <div className="banner-button mt-3">
                        <button className="btn-banner">SHOP NOW</button>
                        <button className="btn-banner ml-2">LIÊN HỆ</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Carousel;