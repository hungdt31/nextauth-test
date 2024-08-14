import Banner from "@/components/common/banner";
import Footer from "@/components/common/footer";
import Collection from "@/components/common/collection";
import { Popular } from "@/components/common/popular";
import { Community } from "@/components/common/community";

export default function Page(){
  return (
    <div>
      <Banner/>
      <Collection/>
      <Popular/>
      <Community/>
      <Footer/>
    </div>
  )
}