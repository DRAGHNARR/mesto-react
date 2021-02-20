import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, ...props}) {
  const picRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();
  
    props.onUpdatePic(picRef.current.value);
    
    onClose();
  } 

  return (
    <PopupWithForm 
      name="who_eddit_form" 
      title="Обновить аватар"
      isOpen={isOpen}
      buttonTitle="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input ref={picRef} id="who-image" className="popup__input" type="url" name="who_image" required placeholder="Ссылка на картинку"/>
      <span id="who-image-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}