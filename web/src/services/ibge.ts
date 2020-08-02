import axios, { AxiosResponse } from "axios";

interface IGBEUFResponse {
  sigla: string;
}

interface IGBECityResponse {
  nome: string;
}

async function getUfs(): Promise<AxiosResponse<IGBEUFResponse[]>> {
  return axios.get<IGBEUFResponse[]>(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
  );
}

async function getCitys(
  uf: string
): Promise<AxiosResponse<IGBECityResponse[]>> {
  return axios.get<IGBECityResponse[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );
}

export default { getUfs, getCitys };
