
# Aplicativo de Pontos Turísticos - Frontend React Native

Este projeto é um aplicativo mobile desenvolvido em React Native usando Expo, que permite cadastrar pontos turísticos com nome, descrição, foto e localização geográfica, consumindo uma API REST para armazenar e listar os pontos.

## Funcionalidades

- Listagem de pontos turísticos cadastrados
- Cadastro de novo ponto turístico com:
  - Nome
  - Descrição
  - Foto tirada pela câmera do dispositivo
  - Localização atual obtida via GPS
- Exibição da foto e localização dos pontos cadastrados

## Tecnologias utilizadas

- React Native com Expo
- Biblioteca Expo ImagePicker para tirar fotos
- Biblioteca Expo Location para obter geolocalização
- Axios para chamadas HTTP à API
- Uso de `FormData` para envio de dados e foto em formato multipart/form-data

## Configuração e uso

### Pré-requisitos

- Node.js instalado
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Emulador ou dispositivo móvel para executar o app
- API backend rodando e acessível (exemplo em `http://192.168.0.188:5000/api/pontos`)

### Passos para rodar o app

1. Clone este repositório
2. Instale as dependências com:
   ```
   npm install
   ```
3. Ajuste a variável `API_URL` no arquivo `App.js` para o IP local da sua API backend
4. Inicie o app com:
   ```
   expo start
   ```
5. Abra no seu dispositivo (Expo Go) ou emulador

## Detalhes técnicos

- O app solicita permissão para usar a câmera e a localização do dispositivo
- Fotos são capturadas com qualidade 60%
- Localização é mostrada em formato `Lat: x, Long: y`
- Para enviar, todos os campos devem estar preenchidos
- Após envio, os dados são limpos e a lista atualizada
