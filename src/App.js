import axios from "./components/axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const api1 = `https://jsonplaceholder.typicode.com`;

const App = () => {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [userPhotos, setUserPhotos] = useState([]);
  const [userTitleData, setUserTitleData] = useState([]);
  const [userFullDeatil, setUserFullDeatil] = useState([]);
  const [screen1, setScreen1] = useState(true);

  const getUSerDetail = async (url) => {
    try {
      let res = await axios.get(url);
      console.log("detail-----", res.data);
      setUser(res.data);
      setUserFullDeatil(res.data);
    } catch (error) {
      console.log(error.status);
    }
  };
  const getPhotos = async (url) => {
    try {
      let res = await axios.get(url);
      console.log("photos ------", res.data);
      setUserPhotos(res.data);
    } catch (error) {
      console.log(error.status);
    }
  };

  useEffect(() => {
    getUSerDetail(`${api1}/users`);
    getPhotos(`${api1}/photos`);
  }, []);
  useEffect(() => {
    if (user.length > 0 && userPhotos.length > 0) {
      let arr = [];
      user.slice(0, 5).map((val, ind) => {
        let objuser = {};
        console.log("user map ", val.id);
        userPhotos.filter((v, i) => {
          if (val.id === v.albumId) {
            objuser["email"] = val.email;
            objuser["name"] = val.name;
            objuser["thumbnailUrl"] = v.thumbnailUrl;
            objuser["id"] = val.id;
          }
        });
        arr.push(objuser);
      });
      setUserTitleData(arr);
    }
  }, [user, userPhotos]);

  const callfulldata = (e, id) => {
    console.log(id);
    getUSerDetail(`${api1}/users/${id}`);
    console.log("fullldata", userFullDeatil.data);
    setScreen1(false);
  };

  return (
    <>
      <div className="bg-black p-4 text-center ">
        <input className="p-2 lg:w-1/5 w-full " 
        onChange = {(e)=>setQuery(e.target.value)}
        type={"text"} />
      </div>

      {/* -------------------------- Switching Screen ----------------------  */}
      {screen1 ? (
        <div>
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
              <div class="flex flex-wrap -m-4">
                {userTitleData.filter((val)=>
                  val.name.includes(query) 
                ).map((val, ind) => {
                  return (
                    <>
                      <div
                        class="p-4 md:w-1/3"
                        onClick={(e) => callfulldata(e, val.id)}
                      >
                        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                          <img
                            class="lg:h-48 md:h-36 w-full object-cover object-center"
                            src={val.thumbnailUrl}
                            alt="blog"
                          />
                          <div class="p-6">
                            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                              {val.email}
                            </h2>
                            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                              {val.name}
                            </h1>
                            <p class="leading-relaxed mb-3">
                              Photo booth fam kinfolk cold-pressed sriracha
                              leggings jianbing microdosing tousled waistcoat.
                            </p>
                            <div class="flex items-center flex-wrap ">
                              <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                                Learn More
                                <svg
                                  class="w-4 h-4 ml-2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="M5 12h14"></path>
                                  <path d="M12 5l7 7-7 7"></path>
                                </svg>
                              </a>
                              <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <svg
                                  class="w-4 h-4 mr-1"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                1.2K
                              </span>
                              <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                                <svg
                                  class="w-4 h-4 mr-1"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                </svg>
                                6
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          {userFullDeatil ? (
            <>
              <h1>Name : {userFullDeatil.name}</h1>
              <p>Email :{userFullDeatil.email} </p>
              <p>Phone :{userFullDeatil.phone} </p>

              <button onClick={() => setScreen1(true)}>back To Home</button>
            </>
          ) : (
            "No Data Found"
          )}
        </div>
      )}
    </>
  );
};

export default App;
