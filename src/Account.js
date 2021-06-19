import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

import Avatar from "./Avatar";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-1/2 mx-auto md:w-144  p-8 rounded-md mt-4 bg-purple-100  ">
      <button
        className=" px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </button>
      <div className="pt-4 ">
        <div className="p-8 mx-auto bg-gray-50 rounded-lg flex items-center space-x-4 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ username, website, avatar_url: url });
            }}
          />
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <input
                className=" pl-2 w-48 bg-white border text-lg text-black font-semibold"
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                className=" pl-2 bg-purple-50 text-lg text-gray-500 font-medium"
                id="email"
                type="text"
                value={session.user.email}
                placeholder="Email"
                disabled
              />
              <input
                className=" pl-2 w-48 bg-white border"
                id="website"
                type="website"
                value={website || ""}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website"
              />
            </div>
            <button
              className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              onClick={() => updateProfile({ username, website, avatar_url })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function aaa() {
  return (
    <div className="p-8 bg-purple-500 bg-clip-padding">
      <div className="p-8 rounded-md bg-purple-100  ">
        <div className="p-8 mx-auto flex items-center space-x-4 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <div className="py-8 px-8 bg-gray-50 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <img
              className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
              src="./logo192.png"
              alt="logo"
            ></img>
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Erin Lindford
                </p>
                <p className="text-gray-500 font-medium">Product Engineer</p>
              </div>
              <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
