
// komponen
import { Card, Logo, Button, BestTag, FavTag } from "@/components/Componen";
import Carousel from "@/components/model/Carousel";
// data
import { DataFoto } from "@/components/model/CarouselData"; //foto terbaik
// icon
import { BiCube, BiGlobe } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col w-full  bg-secondary-color">

      <div>
        {/* section1 */}
        <div className="bg-[url(/image/BG1.jpg)] bg-cover bg-center w-full">
          <div className="autoMid min-h-screen px-4 sm:px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-2 items-start lg:items-center pt-8 sm:pt-10 lg:pt-0">

            {/* kiri kosong desktop */}
            <div className="hidden lg:block"></div>

            {/* kanan */}
            <div className="flex justify-center lg:justify-end items-start lg:items-center">

              {/* mobile lebih ke atas, desktop tetap tengah */}
              <div className="w-full max-w-[460px] xl:max-w-[520px] flex flex-col gap-6">

                {/* Logo */}
                <div className="flex justify-center lg:justify-start">
                  <Logo />
                </div>

                {/* Video */}
                <div className="w-full">
                  <div className="aspect-video rounded-md overflow-hidden shadow-[0px_0px_8px_2px_rgba(0,0,0,0.25)]">
                    <iframe
                      src="https://www.youtube.com/embed/LPUY6cT-VnY?controls=0&modestbranding=1&rel=0"
                      className="w-full h-full"
                      title="Demo V-Ex"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* Button */}
                <div className="flex justify-end lg:justify-end">
                  <Button
                    link={"/"}
                    className="font-medium px-8 sm:px-12 py-3 rounded-md transition-all duration-300 hover:scale-105"
                  >
                    More
                  </Button>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* section2 */}
        <div className="relative bg-secondary-color w-full">
          <div className="autoMid px-4 sm:px-6 lg:px-[20px] py-[80px] lg:py-[180px] min-h-[740px] grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* kanan gambar jadi paling atas mobile */}
            <div className="relative order-1 lg:order-2 w-full">
              <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full">
                <Card
                  link={"/image/BG1.svg"}
                  title={"lobby"}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* kiri content */}
            <div className="order-2 lg:order-1 flex flex-col gap-8 justify-center">

              {/* title */}
              <div className="text-main-blue leading-none">
                <p className="font-poppins font-thin text-4xl sm:text-5xl lg:text-6xl leading-none">
                  TAMPILKAN
                </p>
                <p className="font-tilt-wrap font-bold text-4xl sm:text-5xl lg:text-6xl leading-none">
                  KARYAMU
                </p>
              </div>

              {/* desc */}
              <div className="flex flex-col gap-5 text-black max-w-[500px] w-full">

                <div className="flex items-start gap-3">
                  <BiCube className="text-[22px] sm:text-lg shrink-0 mt-1" />
                  <p className="text-[16px] sm:text-[18px] lg:text-lg font-poppins font-light">
                    Jelajahi karya dari berbagai sudut dalam ruang virtual.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <BiGlobe className="text-[22px] sm:text-lg shrink-0 mt-1" />
                  <p className="text-[16px] sm:text-[18px] lg:text-lg font-poppins font-light">
                    Rasakan suasana pameran seperti di dunia nyata.
                  </p>
                </div>

              </div>

              {/* button */}
              <div>
                <Button className="px-10 sm:px-14 lg:px-18 py-2 lg:py-3 rounded-md hover:scale-110 transition">
                  Tutorial
                </Button>
              </div>

            </div>

          </div>
        </div>

        {/* section3 */}
        <div className="bg-secondary-color w-full">
          <div className="autoMid py-[60px] min-h-[740px] flex flex-col gap-10 px-4 sm:px-6 lg:px-0">

            {/* heading */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end w-full pb-6 lg:pb-10">

              {/* kiri */}
              <div className="order-2 lg:order-1 flex items-end">
                <p className="font-poppins font-light text-[16px] sm:text-[18px] lg:text-lg w-full max-w-[500px]">
                  Kami menyediakan 3 aset bawaan yang dapat anda pilih untuk
                  menampilkan karya-karya anda.
                </p>
              </div>

              {/* kanan */}
              <div className="order-1 lg:order-2 text-main-blue flex flex-col lg:items-end text-left lg:text-right">
                <p className="font-poppins font-thin text-4xl sm:text-5xl lg:text-6xl leading-none">
                  PILIH DARI BERBAGAI
                </p>
                <p className="font-tilt-wrap font-bold text-4xl sm:text-5xl lg:text-6xl leading-none">
                  STAN
                </p>
              </div>

            </div>

            {/* cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[50px] w-full">

              <div className="order-1">
                <Card
                  link={"/image/img-stan1.svg"}
                  title={"img stan 1"}
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />
              </div>

              <div className="order-2">
                <Card
                  link={"/image/img-stan2.svg"}
                  title={"img stan 2"}
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />
              </div>

              <div className="order-3 sm:col-span-2 lg:col-span-1">
                <Card
                  link={"/image/img-stan3.svg"}
                  title={"img stan 3"}
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />
              </div>

            </div>

          </div>
        </div>

        {/* mini-section4 */}
        <div className="bg-white w-full">
          <div className="autoMid min-h-[460px] py-[84px] px-4 sm:px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* gambar */}
            <div className="order-1 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start self-start">

              <Card
                link={"/image/bestbadge.svg"}
                title={"best badge"}
                className="w-full aspect-[4/3] object-cover rounded-xl self-start"
              />

              <Card
                link={"/image/favoritebadge.svg"}
                title={"favorite badge"}
                className="w-full aspect-[4/3] object-cover rounded-xl self-start"
              />

            </div>

            {/* text */}
            <div className="order-2 flex flex-col justify-start items-start lg:items-end text-main-blue text-left lg:text-right gap-1 self-start">

              <p className="font-poppins font-thin text-4xl sm:text-5xl lg:text-6xl leading-none">
                DAPATKAN
              </p>

              <p className="font-tilt-wrap font-bold text-4xl sm:text-5xl lg:text-6xl leading-none">
                PENGHARGAAN
              </p>

            </div>

          </div>
        </div>

        {/* section5  */}
        <div className="bg-secondary-color w-full">
          <div className="autoMid pt-[68px] pb-[78px] min-h-[580px] grid grid-cols-1 lg:grid-cols-8 gap-10 px-4 sm:px-6 lg:px-0 items-start">

            {/* gambar atas saat mobile */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative w-full">

              <BestTag className="absolute right-0 top-0 z-10 scale-75 sm:scale-90 lg:scale-100 origin-top-right" />

              <div className="w-full aspect-video">
                <Carousel
                  data={DataFoto}
                  className="w-full h-full rounded-xl overflow-hidden"
                />
              </div>

            </div>

            {/* text */}
            <div className="order-2 lg:order-1 lg:col-span-3 w-full">

              <div className="flex flex-col gap-8">

                <div className="text-main-blue">
                  <p className="font-poppins font-thin text-4xl sm:text-5xl lg:text-6xl  leading-none">
                    KARYA
                  </p>

                  <p className="font-tilt-wrap font-bold text-4xl sm:text-5xl lg:text-6xl  leading-none">
                    TERBAIK
                  </p>
                </div>

                <div className="grid w-full max-w-[500px] gap-5">

                  <div className="flex items-start gap-3">
                    <FaStar className="text-[22px] sm:text-lg shrink-0 mt-1" />
                    <p className="text-[16px] sm:text-[18px] lg:text-lg font-poppins font-light">
                      Dinilai oleh kepala program studi berdasarkan
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaStar className="text-[22px] sm:text-lg shrink-0 mt-1" />
                    <p className="text-[16px] sm:text-[18px] lg:text-lg font-poppins font-light">
                      Berkesempatan memperoleh medali terbaik di setiap program studi
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* section6 */}
        <div className="bg-secondary-color w-full">
          <div className="autoMid pt-[68px] pb-[78px] min-h-[580px] grid grid-cols-1 lg:grid-cols-8 gap-10 px-4 sm:px-6 lg:px-0 items-start">

            {/* gambar jadi atas saat mobile */}
            <div className="order-1 lg:order-1 lg:col-span-5 w-full">
              <div className="relative rounded-xl shadow-xl overflow-hidden">

                <FavTag className="absolute left-0 top-0 z-10 scale-75 sm:scale-90 lg:scale-100 origin-top-left" />

                {/* carousel 16:9 */}
                <div className="w-full aspect-video">
                  <Carousel
                    data={DataFoto}
                    className="w-full h-full rounded-xl overflow-hidden"
                  />
                </div>

              </div>
            </div>

            {/* text bawah saat mobile */}
            <div className="order-2 lg:order-2 lg:col-span-3 w-full lg:w-[80%] lg:ml-auto">

              <div className="flex flex-col gap-8">

                {/* title */}
                <div className="text-main-blue flex flex-col items-start lg:items-end text-left lg:text-right">
                  <p className="font-poppins font-thin text-4xl sm:text-5xl lg:text-6xl leading-none">
                    KARYA
                  </p>

                  <p className="font-tilt-wrap font-bold text-4xl sm:text-5xl lg:text-6xl leading-none">
                    FAVORIT
                  </p>
                </div>

                {/* desc */}
                <div className="grid gap-5">

                  <div className="flex items-start gap-3">
                    <FaStar className="text-[22px] sm:text-lg shrink-0 mt-1" />
                    <p className="text-[16px] sm:text-[18px] lg:text-lg font-poppins font-light">
                      Dinilai oleh kepala program studi berdasarkan.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaStar className="text-[22px] sm:text-lg shrink-0 mt-1" />
                    <p className="text-[16px] sm:text-[18px] lg:text-lg font-poppins font-light">
                      Berkesempatan memperoleh medali terbaik di setiap program studi.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* mini-section7 */}
        <div className="bg-white w-full">
          <div className="autoMid min-h-[460px] py-[48px] px-4 sm:px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-20 items-start">

            {/* kanan jadi urutan 1 di mobile */}
            <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col gap-6">

              {/* cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <Card
                  link={"/image/img-best1.svg"}
                  className="w-full aspect-video object-cover rounded-xl shadow-xl"
                  title={"Best 1"}
                />

                <Card
                  link={"/image/img-best1.svg"}
                  className="w-full aspect-video object-cover rounded-xl shadow-xl"
                  title={"Best 2"}
                />

              </div>

            </div>

            {/* kiri */}
            <div className="order-2 lg:order-1 lg:col-span-4">

              <div className="flex flex-col gap-8 h-full">

                {/* title */}
                <div className="text-main-blue">

                  <p className="font-poppins font-thin text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none">
                    PENASARAN?
                  </p>

                  <div className="flex items-end gap-3 whitespace-nowrap leading-none">

                    <p className="font-tilt-wrap font-bold text-4xl sm:text-5xl lg:text-6xl">
                      COBA
                    </p>

                    <p className="font-poppins font-thin text-4xl sm:text-5xl lg:text-6xl">
                      SEKARANG
                    </p>

                  </div>

                </div>

                {/* desc */}
                <p className="font-poppins font-light text-[16px] sm:text-lg max-w-[520px]">
                  Buat, eksplorasi, dan temukan karya-karya menarik lainnya dengan
                  pengalaman interaktif yang seru dan mendalam.
                </p>

              </div>

            </div>

            {/* button paling bawah saat mobile */}
            <div className="order-3 lg:order-3 lg:col-span-10 flex justify-center lg:justify-end w-full">
              <Button link={"/login"} className="px-10 sm:px-14 lg:px-18 py-2 lg:py-3 rounded-md hover:scale-110 transition">
                Daftar
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
