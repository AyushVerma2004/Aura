import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/instagram/analytics"
      );

      setData(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Analytics...</h2>;
  }

  if (!data) {
    return <h2>Failed to load analytics</h2>;
  }

  return (

    <div style={styles.container}>

      <h1>Instagram Analytics Dashboard</h1>

      {/* PROFILE */}

      <div style={styles.card}>

        <img
          src={data.profile.profile_picture_url}
          alt="profile"
          width="120"
          style={{ borderRadius: "50%" }}
        />

        <h2>@{data.profile.username}</h2>

        <p>
          Followers: {data.profile.followers_count}
        </p>

        <p>
          Following: {data.profile.follows_count}
        </p>

        <p>
          Total Posts: {data.profile.media_count}
        </p>

      </div>

      {/* ENGAGEMENT */}

      <div style={styles.card}>

        <h2>Engagement</h2>

        <p>
          Total Likes: {data.engagement.totalLikes}
        </p>

        <p>
          Total Comments: {data.engagement.totalComments}
        </p>

        <p>
          Engagement Rate:
          {" "}
          {data.engagement.engagementRate}%
        </p>

      </div>

      {/* INSIGHTS */}

      <div style={styles.card}>

        <h2>Insights</h2>

        {

          data.insights.map((item, index) => (

            <div key={index}>

              <p>
                <strong>{item.name}</strong>
              </p>

              <p>
                {
                  item.values?.[0]?.value || 0
                }
              </p>

            </div>
          ))
        }

      </div>

      {/* POSTS */}

      <div style={styles.postsContainer}>

        {
          data.posts.map(post => (

            <div
              key={post.id}
              style={styles.postCard}
            >

              {
                post.media_type !== "VIDEO" && (

                  <img
                    src={post.media_url}
                    alt="post"
                    width="100%"
                    height="250"
                    style={{
                      objectFit: "cover"
                    }}
                  />
                )
              }

              <p>
                {
                  post.caption
                    ? post.caption.substring(0, 80)
                    : "No Caption"
                }
              </p>

              <p>
                ❤️ {post.like_count || 0}
              </p>

              <p>
                💬 {post.comments_count || 0}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
};


// ====================================
// STYLES
// ====================================

const styles = {

  container: {
    padding: "30px",
    fontFamily: "Arial"
  },

  card: {
    background: "#f2f2f2",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px"
  },

  postsContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },

  postCard: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "10px"
  }
};

export default Analytics;