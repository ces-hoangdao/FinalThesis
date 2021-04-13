import React, { Component } from "react";
import  caurong from "../assets/caurong.jpg";
class About extends Component {
  render() {
    return (
      <div>
       <div className="container">
          <div className="top-introduce py-5">
            <div className="row">
              <div className="col-6 order-2 order-md-1 d-flex align-items-center">
                <article className="introduce-box">
                  <h2>Travel Master là một nền tảng miễn phí</h2>
                  <p className="my-3 text-secondary">
                    Được phát triển bởi XXX, Travel Master  tập trung vào việc sử
                    dụng công nghệ để giảm bớt rào cản và kết nối giữa người có nhu cầu du lịch và những chủ Homestay
                  </p>
                  <div className="d-flex justify-content-between">
                    <div className="count-box">
                      <h4 className="text-primary">300 +</h4>
                      <div className="text-secondary">Chủ Homestay</div>
                    </div>
                    <div className="count-box px-3">
                      <h4 className="text-primary">1,000 +</h4>
                      <div className="text-secondary">Phòng lưu trú</div>
                    </div>
                    <div className="count-box">
                      <h4 className="text-primary">2000 + </h4>
                      <div className="text-secondary">Lượt book phòng</div>
                    </div>
                  </div>
                </article>
                
              </div>
              <div class="col-6 offset-sm-1 order-1 order-md-2 ">
                    <img width="100%" class="my-3" src={caurong} alt=""></img>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
