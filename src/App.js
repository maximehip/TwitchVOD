import './App.css'
import React, { useState } from "react"
import ReactPlayer from 'react-player'
var sha1 = require('sha1')

const DOMAINS = [
  "https://vod-secure.twitch.tv",
  "https://vod-metro.twitch.tv",
  "https://vod-pop-secure.twitch.tv",
  "https://d2e2de1etea730.cloudfront.net",
  "https://dqrpb9wgowsf5.cloudfront.net",
  "https://ds0h3roq6wcgc.cloudfront.net",
  "https://d2nvs31859zcd8.cloudfront.net",
  "https://d2aba1wr3818hz.cloudfront.net",
  "https://d3c27h4odz752x.cloudfront.net",
];


function App() {
  const [name, setName]= useState("")
  const [vodId, setvodId] = useState("")
  const [urlFinal, setUrlFinal] = useState("")
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await fetch(
      `https://twitchtracker.com/${name}/streams/${vodId}`
    );
    const text = await data.text();
    const index = text.indexOf("stream on ") + 10;
    var unixTime = new Date(text.substring(index, index + 19) + " UTC").getTime() / 1000
    var baseURL = name + "_" + vodId + "_" + unixTime
    var hash = sha1(baseURL).substring(0, 20);
    var final = hash + "_" +  baseURL

    setUrlFinal("https://d2e2de1etea730.cloudfront.net/" + final + "/chunked/index-dvr.m3u8")
    console.log("https://d2e2de1etea730.cloudfront.net/" + final + "/chunked/index-dvr.m3u8")
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => {setName(e.currentTarget.value)}}/>
        <input type="text" placeholder="Vod ID" onChange={(e) => {setvodId(e.currentTarget.value)}}/>
        <button type="submit">See</button>
      </form>
      <center>
      <ReactPlayer controls={true} url={urlFinal} />
      </center>
      <div className="footer">
        <p><a href="http://twitter.com/maximehip">@maximehip</a></p>
      </div>
    </div>
  );
}

export default App;
