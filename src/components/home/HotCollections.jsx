import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomSliderStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API call to fetch hot collections data on component mount
    const fetchData = async () => {
      const collectionsData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      );
      // Update state with fetched data
      setCollections(collectionsData.data);

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
    speed: 500,
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading
              ? skeletonCards.map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll m-1">
                      <div className="nft_wrap">
                        <div className="skeleton-box skeleton-img"></div>
                      </div>

                      <div className="nft_coll_pp">
                        <div className="skeleton-box skeleton-avatar"></div>
                      </div>

                      <div className="nft_coll_info">
                        <div className="skeleton-box skeleton-title"></div>
                        <div className="skeleton-box skeleton-code"></div>
                      </div>
                    </div>
                  </div>
                ))
              : collections.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft_coll m-1">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
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

export default HotCollections;
