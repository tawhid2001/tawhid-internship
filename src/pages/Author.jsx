import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();

  const [authorData, setAuthorData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
        );
        console.log("Fetched author data:", response.data);
        setAuthorData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  const skeletonItems = new Array(8).fill(0);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div className="profile_avatar_wrapper">
                          <Skeleton
                            width="150px"
                            height="150px"
                            borderRadius="50%"
                          />

                          <i className="fa fa-check"></i>
                        </div>
                      ) : (
                        <div className="profile_avatar_wrapper">
                          <img src={authorData?.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </div>
                      )}

                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <Skeleton width="120px" height="35px" />
                              <Skeleton width="100px" height="20px" />
                              <Skeleton width="180px" height="20px" />
                            </div>
                          ) : (
                            <>
                              {authorData?.authorName}

                              <span className="profile_username">
                                @{authorData?.tag}
                              </span>

                              <span id="wallet" className="profile_wallet">
                                {authorData?.address}
                              </span>

                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <>
                          <Skeleton width="120px" height="30px" />
                          <div style={{ marginLeft: "12px" }}>
                            <Skeleton
                              width="180px"
                              height="50px"
                              borderRadius="10px"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {authorData?.followers || 0} followers
                          </div>

                          <Link
                            to="#"
                            className="btn-main"
                            onClick={(e) => {
                              e.preventDefault();

                              setAuthorData((prev) => ({
                                ...prev,
                                followers: isFollowing
                                  ? prev.followers - 1
                                  : prev.followers + 1,
                              }));

                              setIsFollowing(!isFollowing);
                            }}
                          >
                            {isFollowing ? "Unfollow" : "Follow"}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <div className="row">
                    {loading ? (
                      skeletonItems.map((_, index) => (
                        <div
                          key={index}
                          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                        >
                          <Skeleton
                            width="100%"
                            height="300px"
                            borderRadius="10px"
                          />
                        </div>
                      ))
                    ) : (
                      <AuthorItems
                        nftCollections={authorData?.nftCollection || []}
                        authorImage={authorData?.authorImage}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
