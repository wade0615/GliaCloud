import React, { useState, useCallback, useRef } from "react";
import ReactPlayer from "react-player";
import "./App.scss";
import { Container, Typography, Box, Button, Grid, Card } from "@mui/material";

function App() {
  const [videoPlay, setVideoPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoData, setVideoData] = useState({
    title: "Rick Astley - Never Gonna Give You Up",
    description:
      "Rick Astley - Never Gonna Give You Up (Video) (Official Music Video) | Rick Astley - Never Gonna Give You Up (Video) (Official Music Video)",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: 213, // 假設影片長度為 180 秒
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  });
  const [videoSection, setVideoSection] = useState([
    {
      title: "Intro 前奏",
      content:
        "We're no strangers to love\nYou know the rules and so do I\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy",
      timestamp: "00:18",
      clipLength: 16,
      lighlight: false,
    },
    {
      title: "Pre-Chorus 過門",
      content:
        "I just wanna tell you how I'm feeling\nGotta make you understand",
      timestamp: "00:35",
      clipLength: 7,
      lighlight: false,
    },
    {
      title: "Chorus 副歌",
      content:
        "Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you",
      timestamp: "00:43",
      clipLength: 16,
      lighlight: false,
    },
    {
      title: "Verse 1 主歌一",
      content:
        "We've known each other for so long\nYour heart's been aching, but you're too shy to say it\nInside, we both know what's been going on\nWe know the game and we're gonna play it",
      timestamp: "01:00",
      clipLength: 16,
      lighlight: false,
    },
    {
      title: "Pre-Chorus 過門",
      content:
        "And if you ask me how I'm feeling\nDon't tell me you're too blind to see",
      timestamp: "01:17",
      clipLength: 7,
      lighlight: false,
    },
    {
      title: "Chorus 副歌",
      content:
        "Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you(Again)",
      timestamp: "01:25",
      clipLength: 42,
      lighlight: false,
    },
    {
      title: "Bridge 間奏",
      content:
        "Never gonna give, never gonna give\n(Give you up)\nNever gonna give, never gonna give\n(Give you up)",
      timestamp: "02:08",
      clipLength: 7,
      lighlight: false,
    },
    {
      title: "Verse 2 主歌二",
      content:
        "We've known each other for so long\nYour heart's been aching, but you're too shy to say it\nInside, we both know what's been going on\nWe know the game and we're gonna play it",
      timestamp: "02:16",
      clipLength: 16,
      lighlight: false,
    },
    {
      title: "Pre-Chorus 過門",
      content:
        "I just wanna tell you how I'm feeling\nGotta make you understand",
      timestamp: "02:33",
      clipLength: 7,
      lighlight: false,
    },
    {
      title: "Chorus 副歌",
      content:
        "Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you(Again)",
      timestamp: "02:41",
      clipLength: 33,
      lighlight: false,
    },
    {
      title: "Final Chorus 最終副歌",
      content:
        "Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you",
      timestamp: "03:15",
      clipLength: 16,
      lighlight: false,
    },
  ]);

  const playerRef = useRef();

  // Submit 按鈕按下後，模擬使用 axios 送出一隻等待 0.5s 的 api 並得到回傳結果的 function
  const handleSubmit = async () => {
    // 模擬 API 呼叫
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert("Video URL submitted!");
    // 這裡可以加入 axios 的 API 呼叫邏輯
    // 例如：
    // axios.post('/api/video', { url: videoUrl })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error("There was an error!", error);
    //   });
    setVideoData({
      ...videoData,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
  };

  /** 播放/暫停影片的 function */
  const handlePlayPause = useCallback(() => {
    setVideoPlay((prev) => !prev);
  }, []);

  // 處理段落點擊事件
  const handleSectionClick = (index, timestamp) => {
    // 將所有段落的 lighlight 設為 false
    const updatedSections = videoSection.map((_section, i) => ({
      ..._section,
      lighlight: i === index ? !_section.lighlight : _section.lighlight,
    }));
    setVideoSection(updatedSections); // 更新段落狀態

    // 跳到指定時間播放
    const [minutes, seconds] = timestamp.split(":").map(Number);
    const timeInSeconds = minutes * 60 + seconds;

    setCurrentTime(timeInSeconds); // 設定影片跳轉的時間
    playerRef.current.seekTo(timeInSeconds);
    setVideoPlay(true); // 確保影片播放
  };

  // 處理影片流暢地在所有被 highlight 的段落之間播放
  const handlePlaySmoothInHightlightSection = (playedSeconds) => {
    const highlightSections = videoSection.filter(
      (section) => section.lighlight
    );

    if (highlightSections.length > 0) {
      const currentSection = highlightSections.find((section) => {
        const [minutes, seconds] = section.timestamp.split(":").map(Number);
        const timeInSeconds = minutes * 60 + seconds;
        return (
          playedSeconds >= timeInSeconds &&
          playedSeconds < timeInSeconds + section.clipLength
        );
      });

      // 字幕區滾動到當前播放段落
      if (currentSection) {
        // 找到當前播放段落的 index
        const currentSectionIndex = videoSection.findIndex(
          (section) => section.timestamp === currentSection.timestamp
        );

        document
          .getElementById(`section-box-${currentSectionIndex}`)
          .scrollIntoView({
            behavior: "smooth",
          });
      }

      if (!currentSection) {
        // 如果不在任何段落內，找到下一個有被 highlight 的段落
        const nextSection = highlightSections.find((section) => {
          const [minutes, seconds] = section.timestamp.split(":").map(Number);
          const timeInSeconds = minutes * 60 + seconds;
          return playedSeconds < timeInSeconds;
        });
        if (nextSection) {
          const [minutes, seconds] = nextSection.timestamp
            .split(":")
            .map(Number);
          const timeInSeconds = minutes * 60 + seconds;
          playerRef.current.seekTo(timeInSeconds);
          setCurrentTime(timeInSeconds);
        } else {
          // 如果沒有下一個段落，則暫停影片
          setVideoPlay(false);
        }
      }
    }
  };

  return (
    <section id="video-highlight-tool">
      <Container maxWidth="xl">
        <Box my={4}>
          <Typography variant="h3" gutterBottom>
            Video Highlight Tool
          </Typography>
          <Typography variant="body1">
            This is a tool that helps you create video highlights.
          </Typography>
        </Box>
        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            Input Video URL
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <input
              type="text"
              placeholder="Enter video URL"
              style={{ width: "70%", padding: "10px", borderRadius: "5px" }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "10px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <hr />

        <Grid container spacing={2}>
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            {videoSection.map((section, index) => (
              <Box
                key={index}
                my={4}
                onClick={() => handleSectionClick(index, section.timestamp)} // 點擊段落時觸發
                id={`section-box-${index}`}
                className={`section-box ${
                  section.lighlight ? "section-box-active" : ""
                }`}
              >
                <Typography variant="h5" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="caption">{section.timestamp}</Typography>
                <Typography variant="body1">{section.content}</Typography>
              </Box>
            ))}
          </Grid>

          {/* Right Video Section */}
          <Grid item xs={12} md={6} className="video-container">
            <Box className="video-box">
              <Card style={{ marginBottom: "1rem" }}>
                <ReactPlayer
                  ref={playerRef}
                  url={videoData.url}
                  controls
                  playing={videoPlay}
                  width="100%"
                  height="400px"
                  onReady={(player) => {
                    // 當影片準備好時，跳轉到指定時間
                    // player.seekTo(currentTime, "seconds");
                  }}
                  onProgress={({ playedSeconds }) => {
                    setCurrentTime(playedSeconds); // 更新當前播放時間
                    handlePlaySmoothInHightlightSection(playedSeconds); // 播放 hightlight 的段落
                  }}
                  config={{
                    youtube: {
                      playerVars: {
                        start: currentTime,
                      },
                    },
                  }}
                />
              </Card>
              <Typography variant="h5" gutterBottom>
                {videoData.title}
              </Typography>
              <Grid
                container
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePlayPause}
                >
                  {videoPlay ? "Pause" : "Play"}
                </Button>
                <span>{Math.floor(currentTime)}s</span>
              </Grid>
              <Box className="progress-bar">
                <Box
                  className="progress-bar-fill"
                  sx={{
                    width: `${(currentTime / videoData.duration) * 100}%`,
                  }}
                ></Box>
                {videoSection.map((section, index) => {
                  if (section.lighlight) {
                    const [minutes, seconds] = section.timestamp
                      .split(":")
                      .map(Number);
                    const timeInSeconds = minutes * 60 + seconds;
                    return (
                      <Box
                        key={index}
                        className="progress-bar-highlight"
                        sx={{
                          left: `${
                            (timeInSeconds / videoData.duration) * 100
                          }%`,
                          width: `${
                            (section.clipLength / videoData.duration) * 100
                          }%`,
                        }}
                      ></Box>
                    );
                  }
                  return null;
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default App;
