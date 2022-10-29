import { useLoaderData } from "@remix-run/react";
import SimpleImageSlider from "react-simple-image-slider";
import example2 from '~/assets/example2.webp'

export const houseLoader = (id) => 
{
    return (
        {
            images: [
                { url: "https://www.w3schools.com/howto/img_nature_wide.jpg" },
                { url: example2 },
            ],
            location: 'Castelldefels, España',
            sublocation: 'Playa de Castelldefels',
            dates:'12-17 oct',
            price:'285€'
        }

    )
    // return json(
    //   await fakeDb.project.findMany(
    //     {
    //     where: {
    //       userId: params.userId,
    //       projectId: params.projectId,
    //     },
    //   })
    // );
  };

export default function(params)
{
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    }
    let house = houseLoader(params.id)
    return (
    <div className="housecard">
        <div>
            <SimpleImageSlider
                width={200}
                height={200}
                images={house.images}
                showNavs={true}
                navSize ={25}
                navMargin={5}
            />
        </div>
        <div>
            <div><b>{house.location}</b></div>
            <div>{house.sublocation}</div>
            <div>{house.dates}</div>
            <div><b>{house.price}</b> noche</div>
        </div>
    </div>
    )
}