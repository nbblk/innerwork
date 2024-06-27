import { supabase } from "../lib/supabase";

const Login = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3002/auth/callback",
      },
    });
    if (error) console.error("Error logging in:", error.message);
  };

  return (
    <button
      className="border border-black border-2 rounded-full py-2 px-4 hover:bg-black hover:text-white transition hover:transition-colors"
      onClick={signInWithGoogle}
    >
      login
    </button>
  );
};

export default Login;
