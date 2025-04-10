import Marquee from "react-fast-marquee";
import Image from "next/image";

const ImageMarquee = () => {
  // Define a consistent height for all images (adjust as needed)
  const imageHeight = 60; // pixels

  // Image data with calculated widths based on original aspect ratios
  const images = [
    {
      src: "/Campus.jpg",
      alt: "Campus",
      width: Math.round((1050 / 1333) * imageHeight),
      height: imageHeight,
    },
    {
      src: "/DhruvWorldTours.png",
      alt: "Dhruv",
      width: Math.round((773 / 666) * imageHeight),
      height: imageHeight,
    },
    {
      src: "/EeshaTechnologies.png",
      alt: "EeshaTech",
      width: Math.round((191 / 65) * imageHeight),
      height: imageHeight,
    },
    {
      src: "/Enviro.png",
      alt: "Enviro",
      width: Math.round((6000 / 3375) * imageHeight),
      height: imageHeight,
    },
    {
      src: "/TeaTime.jpg",
      alt: "TeaTime",
      width: Math.round((1641 / 1517) * imageHeight),
      height: imageHeight,
    },
  ];

  return (
    <Marquee
      speed={60}
      gradient={false}
      className="max-w-md overflow-hidden max-h-fit"
    >
      {images.map((img, index) => (
        <div
          key={index}
          className="relative mx-2"
          style={{
            height: `${img.height}px`,
            width: `${img.width}px`,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-contain"
            quality={100}
            priority={index < 3}
          />
        </div>
      ))}
    </Marquee>
  );
};

export default ImageMarquee;
