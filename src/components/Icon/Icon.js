import React from "react";
import PropType from "prop-types";

icon.PropType = {
    text: PropType.string,
    unit: PropType.string,
    classIcon: PropType.string,
    classText: PropType.string,

}
function icon(props) {
  const { src, text, unit, classText, classIcon } = props;
  return (
    <div>
      <img className={classIcon} src={src} alt=" price"></img>
      <span className={classText}> {text} {unit}</span>
    </div>
  );
}
export default icon;
