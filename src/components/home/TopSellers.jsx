import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

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
    <section
      data-aos="fade-in"
      data-aos-delay="100"
      data-aos-duration="600"
      data-aos-easing="ease"
      data-aos-once="true"
      id="section-popular"
      className="pb-5"
    >
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
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>

                      <div className="author_list_info">
                        <div className="d-flex flex-column align-items-start gap-2">
                          <Skeleton width="100px" height="20px" />
                          <Skeleton width="60px" height="20px" />
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
                            alt={topSeller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="author_list_info">
                        <Link to={`/author/${topSeller.authorId}`}>
                          {topSeller.authorName}
                        </Link>
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
