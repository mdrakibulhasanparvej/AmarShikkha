import { BiDonateBlood } from "react-icons/bi";
import { FaPaypal, FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const TrainerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BiDonateBlood}
        label="Admission Request"
        address="admission-request"
      />
      <MenuItem icon={FaUserCog} label="Profile" address="profile" />
    </>
  );
};

export default TrainerMenu;
