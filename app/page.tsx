import { redirect } from "next/navigation";

const HomePage = async () => {
  redirect("/blog");
}

export default HomePage;