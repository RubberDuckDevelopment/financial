import { useState } from "react";
import { supabase } from "./supabaseClient";
import googleSignin from "./imgs/btn_google_signin_light_normal_web.png";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-144 p-8 rounded-md m-auto bg-purple-100   ">
      <h1 className="p-2 mb-4 bg-purple-900 text-purple-50 font-semibold">
        Supabase + React
      </h1>
      <div className="pb-2">
        <p className="">
          Sign in via <em>magic link</em> with your email below
        </p>
        <input
          className=" mb-4 w-64 border "
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
        className="px-6 py-2 text-sm text-purple-600 bg-gray-50 font-semibold rounded-full border border-purple-200 hover:text-gray-50 hover:bg-purple-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        disabled={loading}
      >
        {loading ? <span>Loading</span> : <span>Send magic link</span>}
      </button>
      <button className="mt-2 flex border border-purple-200 hover:text-gray-50 hover:bg-purple-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        <img
          onClick={(e) => {
            e.preventDefault();
            handleGoogleLogin();
          }}
          disabled={loading}
          src={googleSignin}
          alt="Google login"
        ></img>
      </button>{" "}
    </div>
  );
}
