import Image from "../../../components/UI/Image";
import { useAppSelector } from "../../../redux/hook";

const ViewPhoto = () => {
  const { dashboard } = useAppSelector((state) => state);

  console.log(dashboard);
  return (
    <div className="border rounded-md shadow-md p-2">
      <Image
        src={dashboard?.editValue?.photo?.cloudinaryUrl}
        className="rounded-md"
      />
    </div>
  );
};

export default ViewPhoto;
