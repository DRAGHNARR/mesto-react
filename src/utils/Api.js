import {apiConfig} from "./consts";

class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.header = headers;
    this.userUrl = baseUrl + "/users/me";
    this.cardUrl = baseUrl + "/cards";
    this.likeUrl = baseUrl + "/cards/likes";
    this.userFigureUrl = baseUrl + "/users/me/avatar";
  }

  getUserInfo() {
    return fetch(this.userUrl, {headers: this.header})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setUserInfo(name, about) {
    return fetch(this.userUrl, {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setUserFigure(url) {
    return fetch(this.userFigureUrl, {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getCards() {
    return fetch(this.cardUrl, {headers: this.header})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setCard(name, link) {
    return fetch(this.cardUrl, {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(this.cardUrl + "/" + id, {
      method: 'DELETE',
      headers: this.header
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeCard(id) {
    return fetch(this.likeUrl + "/" + id, {
      method: 'PUT',
      headers: this.header
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  dislikeCard(id) {
    return fetch(this.likeUrl + "/" + id, {
      method: 'DELETE',
      headers: this.header
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

const api = new Api(apiConfig);

export default api;