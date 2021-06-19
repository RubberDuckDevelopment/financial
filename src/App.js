import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className=" w-1/2 mx-auto md:w-5/6 container h-screen  bg-purple-400 flex flex-col">
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}

function aaa() {
  return (
    <div className="p-8  bg-purple-500">
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

// export default App;
