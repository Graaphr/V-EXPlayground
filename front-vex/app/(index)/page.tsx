
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
       <div className="bg-[url(/image/BG1.jpg)] max-h-[100vh] bg-cover  w-full">
          <div className="autoMid grid grid-cols-2 gap-3 min-h-screen ">
            
            {/* kanan */}
            <div className="col-start-2 flex justify-end">
  <div className=" relative h-screen w-[80%] grid grid-rows-8 gap-4">
              {/* Logo */}
              <div className="items-end flex  relative w-full h-full row-span-2">
                <Logo />
              </div>
              {/* Link/Video */}
              <div className="h-full  w-full row-span-4">
                <div className="aspect-video shadow-[0px_9px_12px_rgba(0,0,0,0.9)] shadow-black">
                  <iframe
                    src="https://www.youtube.com/embed/IDIDIDIDIDID?controls=0&modestbranding=1&rel=0&showinfo=0"
                    className="w-full h-full rounded-sm"
                    title="Demo V-Ex"
                  ></iframe>
                </div>
              </div>
              {/* Button More */}
              <div className="relative w-full row-span-2 flex justify-end items-start ">
                <Button link={"/"} className="font-medium bg-secondary-color border-3 border-transparent text-normal px-12 py-1 rounded-md ease-in-out transition-all duration-300 hover:scale-105">
                  More
                </Button>
              </div>
            </div>
            </div>
          
          </div>
        </div>

        {/* section2 */}
        <div className="relative bg-secondary-color  w-full">
          <div className="autoMid px-[20px] py-[180px] max-h-[740px]  grid grid-cols-5 gap-10">
            {/* kiri */}
            <div className="relative  col-span-2 grid grid-rows-3 gap-6">
              <div className="text-main-blue leading-none">
                <p className="font-poppins font-thin text-7xl leading-none ">TAMPILKAN</p>
                <p className="font-tilt-wrap font-bold text-7xl leading-none ">KARYAMU</p>
              </div>
              <div className="flex flex-col justify-cente gap-4">
                <div className="gap-2 flex items-center">
                  <BiCube className="text-[36px] font-bold shrink-0" />
                  <p className="text-24 font-poppins">Jelajahi karya dari berbagai sudut dalam ruang virtual.</p>
                </div>
                <div className="gap-2 flex items-center">
                  <BiGlobe className="text-[36px] font-bold shrink-0" />
                  <p className="text-24 font-poppins">Rasakan suasana pameran seperti di dunia nyata.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Button link={"/"} className="items-center font-poppins font-bold bg-secondary-color border-3 border-transparent text-normal px-12 py-4 rounded-md hover:scale-110 ease-in-out transition-all duration-300">
                  TUTORIAL
                </Button>
              </div>
            </div>
            {/* kanan */}
            <div className="col-span-3 h-full">
              <Card link={"/image/img-lobby.jpg"} title={"lobby"} className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* section3 */}
        <div className="bg-secondary-color w-full ">
          <div className="autoMid py-[60px] flex min-h-[740px] flex-col gap-10">
            <div className="grid grid-cols-2 w-full pb-10">
              <div className="flex items-end pr-10">
                <p className="font-poppins font-normal text-md  w-full">
                  Kami menyediakan 3 Aset bawaan yang dapat anda pilih untuk menampilkan karya-karya anda.
                </p>
              </div>
              <div className="text-main-blue items-end flex flex-col">
                <p className="font-poppins font-thin text-6xl leading-none">PILIH DARI BERBAGAI</p>
                <p className="font-tilt-wrap font-bold text-7xl leading-none text-right">STAN</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[50px]">
              <Card link={"/image/img-stan1.svg"} title={"img stan 1"} />
              <Card link={"/image/img-stan2.svg"} title={"img stan 2"} />
              <Card link={"/image/img-stan3.svg"} title={"img stan 3"} />
            </div>
          </div>
        </div>

        {/* mini-section4 */}
        <div className="bg-white w-full">
          <div className="autoMid min-h-[460px] py-[84px] grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 flex justify-start  ">
              <div className="leading-none relative h-auto w-[80%]">
                <Card link={"/image/img-badg.svg"} title={"img stan 3"} />

              </div>

            </div>
            <div className="relative min-h-[80%]  items-end flex flex-colp-8 flex flex-col justify-center items-end text-main-blue">
              <p className="font-poppins items-end flex flex-col font-thin text-6xl leading-none px-2">
                DAPATKAN
              </p>
              <p className="font-tilt-wrap font-bold text-6xl leading-none">
                PENGHARGAAN
              </p>
            </div>
          </div>
        </div>

        {/* section5  */}
        <div className="bg-secondary-color  w-full">
          <div className="autoMid pt-[68px] pb-[78px] min-h-[580px] grid grid-cols-8 gap-10">
            <div className="col-span-3  w-full  ">
              <div className="grid py-[20px] grid-rows-3 gap-3">
                <div className="text-main-blue">
                  <p className="font-poppins font-thin text-6xl leading-none  px-2">KARYA</p>
                  <p className="font-tilt-wrap font-bold text-6xl leading-none">TERBAIK</p>
                </div>

                <div className=" grid grid-rows-2">
                  <div className="gap-4 flex items-center leading-none">
                    <FaStar className="text-[24px] items-center font-bold shrink-0" />
                    <p className="text-24 font-poppins">Dinilai oleh kepala program studi berdasarkan </p>
                  </div>
                  <div className="gap-4 flex items-center leading-none">
                    <FaStar className="text-[24px] items-center font-bold shrink-0" />
                    <p className="text-24 font-poppins">
                      Berkesempatan memperoleh medali terbaik di setiap program studi</p>
                  </div>
                </div>

                <div className="">

                </div>
              </div>
            </div>
            <div className="col-span-5 relative">
              {/* <div className="rounded-xl shadow-xl">
                <Card link={"/image/img-best1.svg"} className="shadow-xl " title={"Best 1"} />
              </div> */}
               <BestTag className="absolute right-0 top-0 z-10"/>
              <div className="max-w-4xl mx-auto">
                           

                <Carousel data={DataFoto} />
              </div>

            </div>
          </div>
        </div>

        {/* section6 */}
        <div className="bg-secondary-color w-full">
          <div className="autoMid pt-[68px] pb-[78px] min-h-[580px] grid grid-cols-8 gap-4 ">
            <div className="col-span-5  rounded-lg">
              <div className="rounded-xl relative shadow-xl">
                {/* <Card link={"/image/img-best1.svg"} className="shadow-xl " title={"Best 1"} /> */}
                 <FavTag className="absolute left-0 top-0 z-10"/>
                <div className="max-w-4xl mx-auto">
                  <Carousel data={DataFoto} />
                </div>
              </div>
            </div>
            <div className="col-span-3  w-[80%]  ml-auto ">
              <div className="grid py-[20px] grid-rows-3 gap-3 ">
                <div className="text-main-blue flex flex-col justify-center items-end">
                  <p className="font-poppins font-thin text-6xl leading-none px-2">KARYA</p>
                  <p className="font-tilt-wrap font-bold text-6xl leading-none">FAVORIT</p>
                </div>

                <div className=" grid grid-rows-2 ">
                  <div className="gap-4 flex items-center leading-none">
                    <FaStar className="text-[24px] items-center font-bold shrink-0" />
                    <p className="text-24 font-poppins">
                      Dinilai oleh kepala program studi berdasarkan.
                    </p>
                  </div>
                  <div className="gap-4 flex items-center leading-none">
                    <FaStar className="text-[24px] items-center font-bold shrink-0" />
                    <p className="text-24 font-poppins">
                      Berkesempatan memperoleh medali terbaik di setiap program studi.
                    </p>
                  </div>
                </div>

                <div className="">
                  {/* null */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mini-section7 */}
        <div className="bg-white w-full">
          <div className="autoMid min-h-[460px] py-[48px] gap-20 grid grid-cols-10 gap-4">

            <div className="col-span-4 rounded-lg ">
              <div className="grid grid-rows-2 h-full">
                <div className="text-main-blue">
                  <p className="font-poppins font-thin text-6xl leading-none">PENASARAN?</p>
                  <div className="flex ">
                    <p className=" flex items-end justify-start font-tilt-wrap font-bold text-5xl leading-none">COBA</p>
                    <p className="font-poppins font-thin text-5xl leading-none">SEKARANG</p>
                  </div>

                </div>

                <div className="flex mt-auto">
                  <p className="font-poppins text-lg ">Buat, eksplorasi, dan temukan karya-karya menarik lainnya dengan pengalaman interaktif yang seru dan mendalam</p>
                </div>

              </div>
            </div>
            {/* kanan */}
            <div className="col-span-6 grid grid-rows-4 rounded-lg ">
              <div className="row-span-3 grid grid-cols-2 gap-5">
                <div className="">
                  <Card link={"/image/img-best1.svg"} className=" shadow-xl " title={"Best 1"} />
                </div>
                <div className="">
                  <Card link={"/image/img-best1.svg"} className="shadow-xl " title={"Best 1"} />
                </div>
              </div>
              <div className="items-end justify-end flex row-span-1">
                <Button link={"/"} className="font-bold  bg-secondary-color border-6 border-transparent text-poppins text-[24px] px-[50px] py-3 rounded ease-in-out transition-all duration-400 hover:shadow-lg hover:scale-110">
                  DAFTAR
                </Button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
