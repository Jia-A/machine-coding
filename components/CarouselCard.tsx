import Image from "next/image";

const CarouselCard = ({ image }) => {
  return (
    <div className="w-100 h-100 relative">
      <Image className="absolute" src={image} alt={image} fill loading="eager"/>
    </div>
  );
};

export default CarouselCard;
