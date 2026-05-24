import Carousel from "@/components/Carousel";
import { carouselData } from "@/data/CarouselData";

const page = () => {
  return (
    <div>
      <Carousel images={carouselData} />
    </div>
  );
};

export default page;
