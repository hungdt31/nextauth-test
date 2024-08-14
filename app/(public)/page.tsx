import Banner from "@/components/common/banner";
import Footer from "@/components/common/footer";
import Collection from "@/components/common/collection";
import { Popular } from "@/components/common/popular";
import { Community } from "@/components/common/community";
import StatPage from "@/components/common/stats";

export default function Page(){
  return (
    <div className="space-y-7">
      <Banner/>
      <Collection/>
      <Popular/>
      <Community/>
      <StatPage/>
      <Footer/>
    </div>
  )
}