import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import "./TopSellers.css";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        // API call to fetch top sellers data
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );
        // Update state with the fetched data
        setTopSellers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setLoading(false);
      }
    };
    // Invoke the data fetching function
    fetchSellers();
  }, []);

  const skeletonSellers = new Array(12).fill(0);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? skeletonSellers.map((_, index) => (
                    <li key={index}>
                      <div className="top-seller-skeleton">
                        <div className="top-seller-skeleton__item">
                          <div className="top-seller-skeleton__avatar-wrapper">
                            <div className="top-seller-skeleton__avatar">
                              <div className="top-seller-skeleton__check">
                                <i className="fa fa-check"></i>
                              </div>
                            </div>
                          </div>
                          <div className="top-seller-skeleton__info">
                            <div className="top-seller-skeleton__title"></div>
                            <div className="top-seller-skeleton__price"></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                : topSellers.map((topSeller) => (
                    <li key={topSeller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${topSeller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={topSeller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{topSeller.authorName}</Link>
                        <span>{topSeller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
