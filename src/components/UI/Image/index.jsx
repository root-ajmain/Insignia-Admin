/* eslint-disable react/prop-types */

const Image = (props) => {
  // without handler
  let img = (
    <img
      src={props?.src}
      alt={props?.alt ? props?.alt : "image"}
      className={props?.className}
      style={props?.style}
    >
      {props?.children}
    </img>
  );
  return img;
};

export default Image;
