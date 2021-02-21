import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, ...props}) {
  const [name, setName] = React.useState("");
  const [pic, setPic] = React.useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }
  
  function handlePicChange(event) {
    setPic(event.target.value);
  }

  function handleAddPlaceSubmit(event) {
    event.preventDefault();

    props.onAddCard({
      name,
      pic
    });

    setName("");
    setPic("");
  }

  return (
    <PopupWithForm 
      name="post_form" 
      title="Новое место" 
      isOpen={isOpen}
      buttonTitle="Сохранить"
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}>
      <input value={name} id="post-title" onChange={handleNameChange} className="popup__input" type="text" name="post_title"  minLength="2" maxLength="30" required placeholder="Название"/>
      <span id="post-title-error" className="popup__input-error"></span>
      <input value={pic} id="post-image" onChange={handlePicChange} className="popup__input" type="url" name="post_image" required placeholder="Ссылка на картинку"/>
      <span id="post-image-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}