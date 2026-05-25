import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Timer from "../home/Timer";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // Simulate API call to fetch explore items data
    const fetchExploreItems = async () => {
      try {
        // Simulated data fetching with a delay
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
        );
        setExploreItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setLoading(false);
      }
    };
    fetchExploreItems();
  }, []);

  useEffect(() => {
    // calling API to fetch sorted data based on filterValue

    const fetchSortedItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`,
        );
        setExploreItems(response.data);
        setVisibleItems(8);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sorted items:", error);
        setLoading(false);
      }
    };
    fetchSortedItems();
  }, [filterValue]);

  const skeletonCards = new Array(8).fill(0);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? skeletonCards.map((_, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={index}>
              <Skeleton width="100%" height="300px" borderRadius="10px" />
            </div>
          ))
        : exploreItems.slice(0, visibleItems).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {item.expiryDate && <Timer expiryDate={item.expiryDate} />}

                <div className="nft__item_wrap">
                  {/* <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div> */}
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
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

      {visibleItems < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to="#"
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems(() => visibleItems + 4)}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;