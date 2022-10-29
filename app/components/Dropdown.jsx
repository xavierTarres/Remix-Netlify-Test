import Menubutton from "./Menubutton";
import styles from  "../styles/dropdown.css" ;
export function links() {
    return [{ rel: "stylesheet", href: styles }];
  }

export default function Dropdown() {
  const items = [
    {
      slug: "/register/",
      anchor: "Regístrate"
    },
    {
      slug: "/login/",
      anchor: "Iniciar sesión"
    },
    {
      slug: "/link3/",
      anchor: "Ofrecer alojamiento"
    }
  ];

  return (
    <div className="Dropdown">
      <Menubutton dropdownTitle="Usuario" image="https://e7.pngegg.com/pngimages/323/705/png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png" items={items} />
    </div>
  );
}
