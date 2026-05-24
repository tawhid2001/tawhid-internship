import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Timer from "./Timer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./CustomSliderStyles.css";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  let [newItems, setNewItems] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    //  API call to fetch new items data
    const fetchData = async () => {
      const newItemsData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      );
      // Update state with the fetched data
      setNewItems(newItemsData.data);

      // Set loading to false after data is fetched
      setLoading(false);
    };

    // Invoke the data fetching function
    fetchData();
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 150,
    cssEase: "ease-in-out",
    waitForAnimate: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function NextArrow({ onClick }) {
    return (
      <button className="custom-arrow custom-next" onClick={onClick}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <button className="custom-arrow custom-prev" onClick={onClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
    );
  }

  const skeletonCards = new Array(4).fill(0);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Slider {...settings}>
            {loading
              ? skeletonCards.map((_, index) => (
                  <div className="p-2" key={index}>
                    <Skeleton width="100%" height="300px" borderRadius="10px" />
                  </div>
                ))
              : newItems.map((item) => (
                  <div key={item.id}>
                    <div className="nft__item m-1">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={item.title}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {/* Countdown timer for the item */}
                      {item.expiryDate && (
                        <Timer expiryDate={item.expiryDate} />
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
