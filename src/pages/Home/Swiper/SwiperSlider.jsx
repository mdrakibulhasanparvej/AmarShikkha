import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const SwiperSlider = () => {
  const axiosSecure = useAxios();

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-banners?status=active`);
      return res.data.data; // make sure to return only data array
    },
  });

  return (
    <Swiper autoplay={{ delay: 3000 }} modules={[Autoplay]}>
      {banners.map((b) => (
        <SwiperSlide key={b._id}>
          <img src={b.image_url} className="w-full h-[400px] object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
