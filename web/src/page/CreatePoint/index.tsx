/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Link, useHistory } from "react-router-dom";

import { LeafletMouseEvent } from "leaflet";

import logo from "../../assets/logo.svg";
import Dropzone from "../../components/Dropzone";
import api from "../../services/api";
import ibge from "../../services/ibge";

import "./styles.css";

// array ou objeto: manualmente informar o tipo da variável

interface Items {
  id: number;
  title: string;
  imageUrl: string;
}

const CreatPoint: React.FC = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCitys] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get("/items").then((response) => setItems(response.data));
  }, []);

  useEffect(() => {
    ibge.getUfs().then((response) => {
      const ufInitials = response.data.map((uf) => uf.sigla);
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;
    ibge.getCitys(selectedUf).then((response) => {
      const cityNames = response.data.map((city) => city.nome);
      setCitys(cityNames);
    });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }
  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setSelectedPosition([lat, lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else setSelectedItems([...selectedItems, id]);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const [latitude, longitude] = selectedPosition;

    if (!selectedFile) {
      alert("Selecione uma imagem para o estabelecimento!");
      return;
    }

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("whatsapp", whatsapp);
    data.append("uf", selectedUf);
    data.append("city", selectedCity);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("items", selectedItems.join(","));
    data.append("image", selectedFile);

    await api.post("/points", data);

    alert("Ponto de coleta criado!");

    history.push("/");
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta Logo" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do
          <br />
          ponto de coleta
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map
            className="leaflet-container"
            center={initialPosition}
            zoom={16}
            onclick={handleMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="Estado (UF)" />
              <select
                name="uf"
                id="uf"
                onBlur={handleSelectUf}
                onChange={handleSelectUf}
                value={selectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city" />
              <select
                name="city"
                id="city"
                onBlur={handleSelectCity}
                onChange={handleSelectCity}
                value={selectedCity}
              >
                <option value="0">Selecione uma cidade</option>
                {citys.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítems de Coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {/* {items.map((item) => (
              <li
                key={item.id}
                onKeyPress={() => handleSelectItem(item.id)}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.imageUrl} alt="Óleo" />
                <span>{item.title}</span>
              </li>
            ))} */}
            {items.map((item, index) => (
              <li
                key={item.id}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <label htmlFor={String(index)}>
                  <img src={item.imageUrl} alt={item.title} />
                  {item.title}
                </label>
                <input
                  type="checkbox"
                  name={item.title}
                  id={String(index)}
                  onClick={() => handleSelectItem(item.id)}
                />
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatPoint;
