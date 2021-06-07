// ① API を扱うときは、fetch,async,await を使う。
// fecth をすると、Promise オブジェクトが返ってくる。
// async ファンクションとすると、非同期関数となる。await を使う。
// async,await で fecth を使うと Response オブジェクトが返ってくる。
// res が持っているの json というメソッドを使う。"await res.json()"

// 　↓　async,await 以外の他の書き方

// ② fecth を then() でつないで書いていく。
// async,await のほうがわかりやすい。

// ③ XMLHttpRequest を使う。
// then() よりも使う機会はなさそう。
// ファイルをアップロードするプラグインを自作するときにこれを使うことでアップロードの進捗を出せる。ときに使う。

// ※ブラウザ対応
// async,await / fecth は、InternetExplorer では使えない。XMLHttpRequest は使える。
// babel使うことで、古いブラウザで最新の JS の機能が使えるようになる。(async,await / fecth)

///////////////////////////////////////////////////////
//////////////// 追加 axios ///////////////////////////
/////////////////////////////////////////////////////
// axios, axios-jsonp を使う。
// かんたん、見やすい、使いやすい！
// axiosを使うことで、容易に非同期的なHTTP通信を実装できる。
// axiosとはブラウザやnode.js上で動くPromiseベースのHTTPクライアントです。非同期にHTTP通信を行いたいときに容易に実装できるライブラリです。
// axiosはPromiseベースのライブラリなのでPromiseを返してくれます。
// そのため、thenやcatchで処理を続けることが可能です。
// また成功時に返ってくるresonseもJSON形式なので特にパースの処理などは必要なく、そのままresponse.dataで使用することができます。

// ※FetchAPIとaxiosの違いや共通点
// FetchAPIはモダンブラウザの標準機能、axiosはライブラリ
// FetchAPIもaxiosもPromiseを返す
// FetchAPIは404や500エラーをthenで受け取れない（rejectされない）
// FetchAPIで返ってくるのはResponseオブジェクトなので、場合によってはjsonにパースする必要がある

// 個人的には、やれることも多いaxiosを使うという結論に落ち着きました。
// ライブラリをインストールしたくないなど特別な理由がない限り、axiosに軍配が上がりそうです。
// ※ ↑ 上記の内容 https://shimablogs.com/fetch-api-axios-difference より。。。

//////////////////////////////////////////////////////////
////// APIKEY は .env ファイル・gitignore ファイルで隠す ////
////////////////////////////////////////////////////////

import React, { useState } from "react";
import axios from "axios";
import jsonpAdapter from "axios-jsonp";

const App = () => {
  const APIKEY = process.env.React_APP_OPENWEATHERMAP_API_KEY;

  //////////////////  1  ///////////////////////////////////////////
  const [city, setCity] = useState("");
  const [result, setResult] = useState();
  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) {
      return;
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric&q=${city}&appid=${APIKEY}`
    );
    const { main } = await res.json();
    setResult(main);
    console.log(main);
    console.log({ main });
    // console.log({ weather });
    console.log(res);
  };

  console.log(result);

  //////////////////  2  /////////////////////////////////////////

  const [city2, setCity2] = useState("");
  const [result2, setResult2] = useState();
  const getWeather2 = async (e) => {
    e.preventDefault();
    if (!city2) {
      return;
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric&q=${city2}&appid=${APIKEY}`
    );
    const weatherData = await res.json();
    setResult2(weatherData);
    console.log(weatherData);
    // console.log({ main });
    // console.log({ weather });
    console.log(res);
  };

  console.log(result2);

  //////////////////  3  ///////////////////////////////////////////
  const [city3, setCity3] = useState("");
  const [result3, setResult3] = useState();
  const getWeather3 = async (e) => {
    e.preventDefault();
    if (!city3) {
      return;
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric&q=${city3}&appid=${APIKEY}`
    );
    const { weather } = await res.json();
    setResult3(weather);
    console.log(weather);
    console.log({ weather });
    console.log(res);
  };

  console.log(result3);

  ///////////////////  axios  ////////////////////////////////////////////////
  const [cityAxios, setCityAxios] = useState("");
  const [resultAxios, setResultAxios] = useState();
  const getAxios = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric&q=${cityAxios}&appid=${APIKEY}`,
        { adapter: jsonpAdapter }
      )
      .then((res) => {
        setResultAxios(res.data);
        console.log(res.data.main.feels_like);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <form onSubmit={getWeather}>
          <div>
            <label>都市を検索</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <button type="submit">天気を取得</button>
        </form>
        {result && (
          <div>
            <p>体感気温(feels like): {result.feels_like}℃</p>
            <p>湿度(humidity): {result.humidity}</p>
            <p>気圧(pressure): {result.pressure}</p>
            <p>気温(temperature): {result.temp}℃</p>
            <p>最高気温(high): {result.temp_max}℃</p>
            <p>最低気温(low): {result.temp_min}℃</p>
          </div>
        )}
      </div>

      <br></br>

      <div>
        <form onSubmit={getWeather2}>
          <div>
            <label>都市を検索２</label>
            <input value={city2} onChange={(e) => setCity2(e.target.value)} />
          </div>
          <button type="submit">天気を取得２</button>
        </form>
        {result2 && (
          <div>
            <p>体感気温(feels like): {result2.main?.feels_like}℃</p>
            <p>湿度(humidity): {result2.main?.humidity}</p>
            <p>気圧(pressure): {result2.main?.pressure}</p>
            <p>気温(temperature): {result2.main?.temp}℃</p>
            <p>最高気温(high): {result2.main?.temp_max}℃</p>
            <p>最低気温(low): {result2.main?.temp_min}℃</p>
            <p>国名: {result2.sys?.country}</p>
            <p>都市名: {result2.name}</p>
            <p>天気①(weather): {result2.weather?.[0].description}</p>
            <p>天気②(weather): {result2.weather?.[0].main}</p>
          </div>
        )}
      </div>

      <br></br>

      <div>
        <form onSubmit={getWeather3}>
          <div>
            <label>都市を検索3</label>
            <input value={city3} onChange={(e) => setCity3(e.target.value)} />
          </div>
          <button type="submit">天気を取得3</button>
        </form>
        {result3 && (
          <div>
            <p>天気①(weather): {result3[0].description}</p>
            <p>天気②(weather): {result3[0].icon}</p>
            <p>天気③(weather): {result3[0].id}</p>
            <p>天気④(weather): {result3[0].main}</p>
          </div>
        )}
      </div>

      <br></br>

      <div>
        <form onSubmit={getAxios}>
          <div>
            <label>都市を検索axios</label>
            <input
              value={cityAxios}
              onChange={(e) => setCityAxios(e.target.value)}
            />
          </div>
          <button type="submit">天気を取得axios</button>
        </form>
        {resultAxios && (
          <div>
            <p>体感気温(feels like): {resultAxios.main.feels_like}℃</p>
            <p>湿度(humidity): {resultAxios.main.humidity}</p>
            <p>気圧(pressure): {resultAxios.main.pressure}</p>
            <p>気温(temperature): {resultAxios.main.temp}℃</p>
            <p>最高気温(high): {resultAxios.main.temp_max}℃</p>
            <p>最低気温(low): {resultAxios.main.temp_min}℃</p>
            <p>国名: {resultAxios.sys.country}</p>
            <p>都市名: {resultAxios.name}</p>
            <p>天気①(weather): {resultAxios.weather[0].description}</p>
            <p>天気②(weather): {resultAxios.weather[0].icon}</p>
            <p>天気③(weather): {resultAxios.weather[0].id}</p>
            <p>天気④(weather): {resultAxios.weather[0].main}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
