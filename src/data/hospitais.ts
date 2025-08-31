export interface HospitalData {
  nome: string;
  cidade: string;
  estado: string;
  tipo: 'Hospital' | 'UBS' | 'UPA' | 'Pronto Socorro' | 'Hospital Universitário';
  lat?: number;
  lng?: number;
}

export const hospitaisBrasil: HospitalData[] = [
  // São Paulo - Capital
  { nome: "Hospital das Clínicas - FMUSP", cidade: "São Paulo", estado: "SP", tipo: "Hospital Universitário", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital Sírio-Libanês", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital Albert Einstein", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital Santa Catarina", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital Nove de Julho", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital Samaritano", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital São Luiz", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital Alemão Oswaldo Cruz", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital Santa Paula", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "Hospital Beneficência Portuguesa", cidade: "São Paulo", estado: "SP", tipo: "Hospital", lat: -23.5558, lng: -46.6708 },
  { nome: "UBS Vila Madalena", cidade: "São Paulo", estado: "SP", tipo: "UBS", lat: -23.5558, lng: -46.6708 },
  { nome: "UBS Perdizes", cidade: "São Paulo", estado: "SP", tipo: "UBS", lat: -23.5558, lng: -46.6708 },
  { nome: "UBS Jardins", cidade: "São Paulo", estado: "SP", tipo: "UBS", lat: -23.5558, lng: -46.6708 },
  { nome: "UPA Vila Maria", cidade: "São Paulo", estado: "SP", tipo: "UPA", lat: -23.5558, lng: -46.6708 },
  { nome: "UPA Zona Norte", cidade: "São Paulo", estado: "SP", tipo: "UPA", lat: -23.5558, lng: -46.6708 },
  { nome: "Pronto Socorro Municipal", cidade: "São Paulo", estado: "SP", tipo: "Pronto Socorro", lat: -23.5558, lng: -46.6708 },
  
  // São Paulo - Interior
  { nome: "Hospital das Clínicas - UNICAMP", cidade: "Campinas", estado: "SP", tipo: "Hospital Universitário", lat: -22.8305, lng: -47.0660 },
  { nome: "Hospital PUC-Campinas", cidade: "Campinas", estado: "SP", tipo: "Hospital Universitário", lat: -22.8305, lng: -47.0660 },
  { nome: "Hospital Vera Cruz", cidade: "Campinas", estado: "SP", tipo: "Hospital", lat: -22.8305, lng: -47.0660 },
  { nome: "Hospital Mario Gatti", cidade: "Campinas", estado: "SP", tipo: "Hospital", lat: -22.8305, lng: -47.0660 },
  { nome: "Hospital de Base de São José do Rio Preto", cidade: "São José do Rio Preto", estado: "SP", tipo: "Hospital", lat: -20.8197, lng: -49.3794 },
  { nome: "Santa Casa de Santos", cidade: "Santos", estado: "SP", tipo: "Hospital", lat: -23.9618, lng: -46.3322 },
  { nome: "Hospital Guilherme Álvaro", cidade: "Santos", estado: "SP", tipo: "Hospital", lat: -23.9618, lng: -46.3322 },
  { nome: "Hospital Regional de Sorocaba", cidade: "Sorocaba", estado: "SP", tipo: "Hospital", lat: -23.5015, lng: -47.4526 },
  { nome: "Santa Casa de Ribeirão Preto", cidade: "Ribeirão Preto", estado: "SP", tipo: "Hospital", lat: -21.1775, lng: -47.8208 },
  { nome: "Hospital das Clínicas de Ribeirão Preto", cidade: "Ribeirão Preto", estado: "SP", tipo: "Hospital Universitário", lat: -21.1775, lng: -47.8208 },

  // Rio de Janeiro
  { nome: "Hospital Copa D'Or", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Samaritano", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Municipal Souza Aguiar", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital São Lucas", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Quinta D'Or", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Barra D'Or", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Norte D'Or", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Universitário Clementino Fraga Filho", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital Universitário", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Federal de Bonsucesso", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Nacional", cidade: "Rio de Janeiro", estado: "RJ", tipo: "Hospital", lat: -22.9068, lng: -43.1729 },
  { nome: "UPA Cidade de Deus", cidade: "Rio de Janeiro", estado: "RJ", tipo: "UPA", lat: -22.9068, lng: -43.1729 },
  { nome: "UPA Tijuca", cidade: "Rio de Janeiro", estado: "RJ", tipo: "UPA", lat: -22.9068, lng: -43.1729 },
  { nome: "UBS Copacabana", cidade: "Rio de Janeiro", estado: "RJ", tipo: "UBS", lat: -22.9068, lng: -43.1729 },
  { nome: "Hospital Municipal Antônio Giglio", cidade: "Niterói", estado: "RJ", tipo: "Hospital", lat: -22.8833, lng: -43.1036 },
  { nome: "Hospital Universitário Antônio Pedro", cidade: "Niterói", estado: "RJ", tipo: "Hospital Universitário", lat: -22.8833, lng: -43.1036 },

  // Minas Gerais
  { nome: "Hospital das Clínicas - UFMG", cidade: "Belo Horizonte", estado: "MG", tipo: "Hospital Universitário", lat: -19.9167, lng: -43.9345 },
  { nome: "Hospital Mater Dei", cidade: "Belo Horizonte", estado: "MG", tipo: "Hospital", lat: -19.9167, lng: -43.9345 },
  { nome: "Santa Casa BH", cidade: "Belo Horizonte", estado: "MG", tipo: "Hospital", lat: -19.9167, lng: -43.9345 },
  { nome: "Hospital Felício Rocho", cidade: "Belo Horizonte", estado: "MG", tipo: "Hospital", lat: -19.9167, lng: -43.9345 },
  { nome: "Hospital Vila da Serra", cidade: "Belo Horizonte", estado: "MG", tipo: "Hospital", lat: -19.9167, lng: -43.9345 },
  { nome: "Hospital Lifecenter", cidade: "Belo Horizonte", estado: "MG", tipo: "Hospital", lat: -19.9167, lng: -43.9345 },
  { nome: "Hospital Madre Teresa", cidade: "Belo Horizonte", estado: "MG", tipo: "Hospital", lat: -19.9167, lng: -43.9345 },
  { nome: "UPA Norte", cidade: "Belo Horizonte", estado: "MG", tipo: "UPA", lat: -19.9167, lng: -43.9345 },
  { nome: "UPA Leste", cidade: "Belo Horizonte", estado: "MG", tipo: "UPA", lat: -19.9167, lng: -43.9345 },
  { nome: "Hospital Universitário de Juiz de Fora", cidade: "Juiz de Fora", estado: "MG", tipo: "Hospital Universitário", lat: -21.7587, lng: -43.3496 },
  { nome: "Santa Casa de Juiz de Fora", cidade: "Juiz de Fora", estado: "MG", tipo: "Hospital", lat: -21.7587, lng: -43.3496 },
  { nome: "Hospital Universitário de Uberlândia", cidade: "Uberlândia", estado: "MG", tipo: "Hospital Universitário", lat: -18.9113, lng: -48.2622 },

  // Rio Grande do Sul
  { nome: "Hospital de Clínicas de Porto Alegre", cidade: "Porto Alegre", estado: "RS", tipo: "Hospital Universitário", lat: -30.0346, lng: -51.2177 },
  { nome: "Hospital Moinhos de Vento", cidade: "Porto Alegre", estado: "RS", tipo: "Hospital", lat: -30.0346, lng: -51.2177 },
  { nome: "Santa Casa de Porto Alegre", cidade: "Porto Alegre", estado: "RS", tipo: "Hospital", lat: -30.0346, lng: -51.2177 },
  { nome: "Hospital São Lucas da PUCRS", cidade: "Porto Alegre", estado: "RS", tipo: "Hospital Universitário", lat: -30.0346, lng: -51.2177 },
  { nome: "Hospital Ernesto Dornelles", cidade: "Porto Alegre", estado: "RS", tipo: "Hospital", lat: -30.0346, lng: -51.2177 },
  { nome: "Hospital Divina Providência", cidade: "Porto Alegre", estado: "RS", tipo: "Hospital", lat: -30.0346, lng: -51.2177 },
  { nome: "Hospital Mae de Deus", cidade: "Porto Alegre", estado: "RS", tipo: "Hospital", lat: -30.0346, lng: -51.2177 },
  { nome: "UPA Lomba do Pinheiro", cidade: "Porto Alegre", estado: "RS", tipo: "UPA", lat: -30.0346, lng: -51.2177 },
  { nome: "UPA Restinga", cidade: "Porto Alegre", estado: "RS", tipo: "UPA", lat: -30.0346, lng: -51.2177 },
  { nome: "Hospital Universitário de Santa Maria", cidade: "Santa Maria", estado: "RS", tipo: "Hospital Universitário", lat: -29.6842, lng: -53.8069 },
  { nome: "Hospital de Caridade de Caxias do Sul", cidade: "Caxias do Sul", estado: "RS", tipo: "Hospital", lat: -29.1634, lng: -51.1797 },

  // Paraná
  { nome: "Hospital de Clínicas - UFPR", cidade: "Curitiba", estado: "PR", tipo: "Hospital Universitário", lat: -25.4284, lng: -49.2733 },
  { nome: "Hospital Cajuru", cidade: "Curitiba", estado: "PR", tipo: "Hospital", lat: -25.4284, lng: -49.2733 },
  { nome: "Hospital Evangélico", cidade: "Curitiba", estado: "PR", tipo: "Hospital", lat: -25.4284, lng: -49.2733 },
  { nome: "Hospital Nossa Senhora das Graças", cidade: "Curitiba", estado: "PR", tipo: "Hospital", lat: -25.4284, lng: -49.2733 },
  { nome: "Hospital Vita Batel", cidade: "Curitiba", estado: "PR", tipo: "Hospital", lat: -25.4284, lng: -49.2733 },
  { nome: "Hospital Marcelino Champagnat", cidade: "Curitiba", estado: "PR", tipo: "Hospital", lat: -25.4284, lng: -49.2733 },
  { nome: "UPA Boqueirão", cidade: "Curitiba", estado: "PR", tipo: "UPA", lat: -25.4284, lng: -49.2733 },
  { nome: "UPA Fazendinha", cidade: "Curitiba", estado: "PR", tipo: "UPA", lat: -25.4284, lng: -49.2733 },
  { nome: "Hospital Universitário de Londrina", cidade: "Londrina", estado: "PR", tipo: "Hospital Universitário", lat: -23.3045, lng: -51.1696 },
  { nome: "Hospital Universitário de Maringá", cidade: "Maringá", estado: "PR", tipo: "Hospital Universitário", lat: -23.4205, lng: -51.9331 },

  // Bahia
  { nome: "Hospital das Clínicas - UFBA", cidade: "Salvador", estado: "BA", tipo: "Hospital Universitário", lat: -12.9714, lng: -38.5014 },
  { nome: "Hospital Português", cidade: "Salvador", estado: "BA", tipo: "Hospital", lat: -12.9714, lng: -38.5014 },
  { nome: "Hospital São Rafael", cidade: "Salvador", estado: "BA", tipo: "Hospital", lat: -12.9714, lng: -38.5014 },
  { nome: "Hospital Aliança", cidade: "Salvador", estado: "BA", tipo: "Hospital", lat: -12.9714, lng: -38.5014 },
  { nome: "Hospital da Bahia", cidade: "Salvador", estado: "BA", tipo: "Hospital", lat: -12.9714, lng: -38.5014 },
  { nome: "Hospital Santa Izabel", cidade: "Salvador", estado: "BA", tipo: "Hospital", lat: -12.9714, lng: -38.5014 },
  { nome: "Hospital Geral Roberto Santos", cidade: "Salvador", estado: "BA", tipo: "Hospital", lat: -12.9714, lng: -38.5014 },
  { nome: "UPA San Martin", cidade: "Salvador", estado: "BA", tipo: "UPA", lat: -12.9714, lng: -38.5014 },
  { nome: "UPA Brotas", cidade: "Salvador", estado: "BA", tipo: "UPA", lat: -12.9714, lng: -38.5014 },
  { nome: "Hospital Geral de Vitória da Conquista", cidade: "Vitória da Conquista", estado: "BA", tipo: "Hospital", lat: -14.8619, lng: -40.8444 },

  // Pernambuco
  { nome: "Hospital das Clínicas - UFPE", cidade: "Recife", estado: "PE", tipo: "Hospital Universitário", lat: -8.0476, lng: -34.8770 },
  { nome: "Hospital Português", cidade: "Recife", estado: "PE", tipo: "Hospital", lat: -8.0476, lng: -34.8770 },
  { nome: "Hospital Real Português", cidade: "Recife", estado: "PE", tipo: "Hospital", lat: -8.0476, lng: -34.8770 },
  { nome: "Hospital Esperança", cidade: "Recife", estado: "PE", tipo: "Hospital", lat: -8.0476, lng: -34.8770 },
  { nome: "Hospital Memorial São José", cidade: "Recife", estado: "PE", tipo: "Hospital", lat: -8.0476, lng: -34.8770 },
  { nome: "Hospital Jayme da Fonte", cidade: "Recife", estado: "PE", tipo: "Hospital", lat: -8.0476, lng: -34.8770 },
  { nome: "UPA Torrões", cidade: "Recife", estado: "PE", tipo: "UPA", lat: -8.0476, lng: -34.8770 },
  { nome: "UPA Imip", cidade: "Recife", estado: "PE", tipo: "UPA", lat: -8.0476, lng: -34.8770 },
  { nome: "Hospital Regional do Agreste", cidade: "Caruaru", estado: "PE", tipo: "Hospital", lat: -8.2837, lng: -35.9761 },

  // Ceará
  { nome: "Hospital Walter Cantídio - UFC", cidade: "Fortaleza", estado: "CE", tipo: "Hospital Universitário", lat: -3.7319, lng: -38.5267 },
  { nome: "Hospital Monte Klinikum", cidade: "Fortaleza", estado: "CE", tipo: "Hospital", lat: -3.7319, lng: -38.5267 },
  { nome: "Hospital São Mateus", cidade: "Fortaleza", estado: "CE", tipo: "Hospital", lat: -3.7319, lng: -38.5267 },
  { nome: "Hospital Antônio Prudente", cidade: "Fortaleza", estado: "CE", tipo: "Hospital", lat: -3.7319, lng: -38.5267 },
  { nome: "Hospital Geral de Fortaleza", cidade: "Fortaleza", estado: "CE", tipo: "Hospital", lat: -3.7319, lng: -38.5267 },
  { nome: "Hospital São Carlos", cidade: "Fortaleza", estado: "CE", tipo: "Hospital", lat: -3.7319, lng: -38.5267 },
  { nome: "UPA Jangurussu", cidade: "Fortaleza", estado: "CE", tipo: "UPA", lat: -3.7319, lng: -38.5267 },
  { nome: "UPA Messejana", cidade: "Fortaleza", estado: "CE", tipo: "UPA", lat: -3.7319, lng: -38.5267 },
  { nome: "Hospital Regional do Cariri", cidade: "Juazeiro do Norte", estado: "CE", tipo: "Hospital", lat: -7.2143, lng: -39.3158 },

  // Goiás
  { nome: "Hospital das Clínicas - UFG", cidade: "Goiânia", estado: "GO", tipo: "Hospital Universitário", lat: -16.6869, lng: -49.2648 },
  { nome: "Hospital Araújo Jorge", cidade: "Goiânia", estado: "GO", tipo: "Hospital", lat: -16.6869, lng: -49.2648 },
  { nome: "Hospital Santa Genoveva", cidade: "Goiânia", estado: "GO", tipo: "Hospital", lat: -16.6869, lng: -49.2648 },
  { nome: "Hospital Albert Sabin", cidade: "Goiânia", estado: "GO", tipo: "Hospital", lat: -16.6869, lng: -49.2648 },
  { nome: "Hospital Geral de Goiânia", cidade: "Goiânia", estado: "GO", tipo: "Hospital", lat: -16.6869, lng: -49.2648 },
  { nome: "UPA Jardim América", cidade: "Goiânia", estado: "GO", tipo: "UPA", lat: -16.6869, lng: -49.2648 },

  // Distrito Federal
  { nome: "Hospital de Base do DF", cidade: "Brasília", estado: "DF", tipo: "Hospital", lat: -15.7801, lng: -47.9292 },
  { nome: "Hospital Universitário de Brasília", cidade: "Brasília", estado: "DF", tipo: "Hospital Universitário", lat: -15.7801, lng: -47.9292 },
  { nome: "Hospital Sarah Kubitschek", cidade: "Brasília", estado: "DF", tipo: "Hospital", lat: -15.7801, lng: -47.9292 },
  { nome: "Hospital Regional da Asa Norte", cidade: "Brasília", estado: "DF", tipo: "Hospital", lat: -15.7801, lng: -47.9292 },
  { nome: "Hospital Regional de Taguatinga", cidade: "Brasília", estado: "DF", tipo: "Hospital", lat: -15.7801, lng: -47.9292 },
  { nome: "Hospital Regional do Gama", cidade: "Brasília", estado: "DF", tipo: "Hospital", lat: -15.7801, lng: -47.9292 },

  // Santa Catarina
  { nome: "Hospital Universitário - UFSC", cidade: "Florianópolis", estado: "SC", tipo: "Hospital Universitário", lat: -27.5954, lng: -48.5480 },
  { nome: "Hospital Governador Celso Ramos", cidade: "Florianópolis", estado: "SC", tipo: "Hospital", lat: -27.5954, lng: -48.5480 },
  { nome: "Hospital Infantil Joana de Gusmão", cidade: "Florianópolis", estado: "SC", tipo: "Hospital", lat: -27.5954, lng: -48.5480 },
  { nome: "Hospital Nereu Ramos", cidade: "Florianópolis", estado: "SC", tipo: "Hospital", lat: -27.5954, lng: -48.5480 },
  { nome: "Hospital Regional de Blumenau", cidade: "Blumenau", estado: "SC", tipo: "Hospital", lat: -26.9194, lng: -49.0661 },
  { nome: "Hospital Santa Isabel", cidade: "Blumenau", estado: "SC", tipo: "Hospital", lat: -26.9194, lng: -49.0661 },

  // Espírito Santo
  { nome: "Hospital das Clínicas - UFES", cidade: "Vitória", estado: "ES", tipo: "Hospital Universitário", lat: -20.3155, lng: -40.3128 },
  { nome: "Hospital Santa Rita de Cássia", cidade: "Vitória", estado: "ES", tipo: "Hospital", lat: -20.3155, lng: -40.3128 },
  { nome: "Hospital Meridional", cidade: "Vitória", estado: "ES", tipo: "Hospital", lat: -20.3155, lng: -40.3128 },
  { nome: "UPA de Jardim Camburi", cidade: "Vitória", estado: "ES", tipo: "UPA", lat: -20.3155, lng: -40.3128 },

  // Amazonas
  { nome: "Hospital Universitário Getúlio Vargas", cidade: "Manaus", estado: "AM", tipo: "Hospital Universitário", lat: -3.1190, lng: -60.0217 },
  { nome: "Hospital e Pronto Socorro 28 de Agosto", cidade: "Manaus", estado: "AM", tipo: "Hospital", lat: -3.1190, lng: -60.0217 },
  { nome: "Hospital Adventista de Manaus", cidade: "Manaus", estado: "AM", tipo: "Hospital", lat: -3.1190, lng: -60.0217 },
  { nome: "UPA Sul", cidade: "Manaus", estado: "AM", tipo: "UPA", lat: -3.1190, lng: -60.0217 },

  // Pará
  { nome: "Hospital Universitário João de Barros Barreto", cidade: "Belém", estado: "PA", tipo: "Hospital Universitário", lat: -1.4558, lng: -48.5044 },
  { nome: "Hospital Ophir Loyola", cidade: "Belém", estado: "PA", tipo: "Hospital", lat: -1.4558, lng: -48.5044 },
  { nome: "Hospital Beneficente Portuguesa", cidade: "Belém", estado: "PA", tipo: "Hospital", lat: -1.4558, lng: -48.5044 },
  { nome: "UPA Marambaia", cidade: "Belém", estado: "PA", tipo: "UPA", lat: -1.4558, lng: -48.5044 },

  // Mato Grosso
  { nome: "Hospital Universitário Júlio Müller", cidade: "Cuiabá", estado: "MT", tipo: "Hospital Universitário", lat: -15.6014, lng: -56.0979 },
  { nome: "Hospital Santa Rosa", cidade: "Cuiabá", estado: "MT", tipo: "Hospital", lat: -15.6014, lng: -56.0979 },
  { nome: "Hospital Geral de Cuiabá", cidade: "Cuiabá", estado: "MT", tipo: "Hospital", lat: -15.6014, lng: -56.0979 },
  { nome: "UPA Norte", cidade: "Cuiabá", estado: "MT", tipo: "UPA", lat: -15.6014, lng: -56.0979 },

  // Mato Grosso do Sul
  { nome: "Hospital Universitário Maria Aparecida Pedrossian", cidade: "Campo Grande", estado: "MS", tipo: "Hospital Universitário", lat: -20.4697, lng: -54.6201 },
  { nome: "Santa Casa de Campo Grande", cidade: "Campo Grande", estado: "MS", tipo: "Hospital", lat: -20.4697, lng: -54.6201 },
  { nome: "Hospital Regional de Mato Grosso do Sul", cidade: "Campo Grande", estado: "MS", tipo: "Hospital", lat: -20.4697, lng: -54.6201 },
  { nome: "UPA Coronel Antonino", cidade: "Campo Grande", estado: "MS", tipo: "UPA", lat: -20.4697, lng: -54.6201 },

  // Alagoas
  { nome: "Hospital Universitário Professor Alberto Antunes", cidade: "Maceió", estado: "AL", tipo: "Hospital Universitário", lat: -9.6658, lng: -35.7353 },
  { nome: "Hospital do Coração de Alagoas", cidade: "Maceió", estado: "AL", tipo: "Hospital", lat: -9.6658, lng: -35.7353 },
  { nome: "Hospital Geral do Estado", cidade: "Maceió", estado: "AL", tipo: "Hospital", lat: -9.6658, lng: -35.7353 },
  { nome: "UPA Sul", cidade: "Maceió", estado: "AL", tipo: "UPA", lat: -9.6658, lng: -35.7353 },

  // Sergipe
  { nome: "Hospital Universitário de Sergipe", cidade: "Aracaju", estado: "SE", tipo: "Hospital Universitário", lat: -10.9472, lng: -37.0731 },
  { nome: "Hospital São Lucas", cidade: "Aracaju", estado: "SE", tipo: "Hospital", lat: -10.9472, lng: -37.0731 },
  { nome: "Hospital de Urgência de Sergipe", cidade: "Aracaju", estado: "SE", tipo: "Hospital", lat: -10.9472, lng: -37.0731 },
  { nome: "UPA Nestor Piva", cidade: "Aracaju", estado: "SE", tipo: "UPA", lat: -10.9472, lng: -37.0731 },

  // Paraíba
  { nome: "Hospital Universitário Lauro Wanderley", cidade: "João Pessoa", estado: "PB", tipo: "Hospital Universitário", lat: -7.1195, lng: -34.8450 },
  { nome: "Hospital Metropolitano", cidade: "João Pessoa", estado: "PB", tipo: "Hospital", lat: -7.1195, lng: -34.8450 },
  { nome: "Hospital de Emergência e Trauma", cidade: "João Pessoa", estado: "PB", tipo: "Hospital", lat: -7.1195, lng: -34.8450 },
  { nome: "UPA de Mangabeira", cidade: "João Pessoa", estado: "PB", tipo: "UPA", lat: -7.1195, lng: -34.8450 },

  // Rio Grande do Norte
  { nome: "Hospital Universitário Onofre Lopes", cidade: "Natal", estado: "RN", tipo: "Hospital Universitário", lat: -5.7945, lng: -35.2110 },
  { nome: "Hospital do Coração de Natal", cidade: "Natal", estado: "RN", tipo: "Hospital", lat: -5.7945, lng: -35.2110 },
  { nome: "Hospital Walfredo Gurgel", cidade: "Natal", estado: "RN", tipo: "Hospital", lat: -5.7945, lng: -35.2110 },
  { nome: "UPA Potengi", cidade: "Natal", estado: "RN", tipo: "UPA", lat: -5.7945, lng: -35.2110 },

  // Piauí
  { nome: "Hospital Universitário do Piauí", cidade: "Teresina", estado: "PI", tipo: "Hospital Universitário", lat: -5.0892, lng: -42.8019 },
  { nome: "Hospital São Marcos", cidade: "Teresina", estado: "PI", tipo: "Hospital", lat: -5.0892, lng: -42.8019 },
  { nome: "Hospital Getúlio Vargas", cidade: "Teresina", estado: "PI", tipo: "Hospital", lat: -5.0892, lng: -42.8019 },
  { nome: "UPA Sul", cidade: "Teresina", estado: "PI", tipo: "UPA", lat: -5.0892, lng: -42.8019 },

  // Maranhão
  { nome: "Hospital Universitário Presidente Dutra", cidade: "São Luís", estado: "MA", tipo: "Hospital Universitário", lat: -2.5387, lng: -44.2825 },
  { nome: "Hospital São Domingos", cidade: "São Luís", estado: "MA", tipo: "Hospital", lat: -2.5387, lng: -44.2825 },
  { nome: "Hospital Carlos Macieira", cidade: "São Luís", estado: "MA", tipo: "Hospital", lat: -2.5387, lng: -44.2825 },
  { nome: "UPA do Vinhais", cidade: "São Luís", estado: "MA", tipo: "UPA", lat: -2.5387, lng: -44.2825 },

  // Tocantins
  { nome: "Hospital Geral de Palmas", cidade: "Palmas", estado: "TO", tipo: "Hospital", lat: -10.1689, lng: -48.3317 },
  { nome: "Hospital e Maternidade Dona Regina", cidade: "Palmas", estado: "TO", tipo: "Hospital", lat: -10.1689, lng: -48.3317 },
  { nome: "Hospital Regional de Araguaína", cidade: "Araguaína", estado: "TO", tipo: "Hospital", lat: -7.1911, lng: -48.2072 },
  { nome: "UPA Sul", cidade: "Palmas", estado: "TO", tipo: "UPA", lat: -10.1689, lng: -48.3317 },

  // Acre
  { nome: "Hospital de Urgência e Emergência de Rio Branco", cidade: "Rio Branco", estado: "AC", tipo: "Hospital", lat: -9.9754, lng: -67.8249 },
  { nome: "Hospital Santa Juliana", cidade: "Rio Branco", estado: "AC", tipo: "Hospital", lat: -9.9754, lng: -67.8249 },
  { nome: "Hospital do Juruá", cidade: "Cruzeiro do Sul", estado: "AC", tipo: "Hospital", lat: -7.6278, lng: -72.6761 },
  { nome: "UPA do Segundo Distrito", cidade: "Rio Branco", estado: "AC", tipo: "UPA", lat: -9.9754, lng: -67.8249 },

  // Rondônia
  { nome: "Hospital de Base Ary Pinheiro", cidade: "Porto Velho", estado: "RO", tipo: "Hospital", lat: -8.7612, lng: -63.9004 },
  { nome: "Hospital São Lucas", cidade: "Porto Velho", estado: "RO", tipo: "Hospital", lat: -8.7612, lng: -63.9004 },
  { nome: "Hospital Regional de Cacoal", cidade: "Cacoal", estado: "RO", tipo: "Hospital", lat: -11.4386, lng: -61.4472 },
  { nome: "UPA Leste", cidade: "Porto Velho", estado: "RO", tipo: "UPA", lat: -8.7612, lng: -63.9004 },

  // Roraima
  { nome: "Hospital Geral de Roraima", cidade: "Boa Vista", estado: "RR", tipo: "Hospital", lat: 2.8235, lng: -60.6758 },
  { nome: "Hospital da Criança Santo Antônio", cidade: "Boa Vista", estado: "RR", tipo: "Hospital", lat: 2.8235, lng: -60.6758 },
  { nome: "Hospital Materno Infantil Nossa Senhora de Nazaré", cidade: "Boa Vista", estado: "RR", tipo: "Hospital", lat: 2.8235, lng: -60.6758 },
  { nome: "UPA Oeste", cidade: "Boa Vista", estado: "RR", tipo: "UPA", lat: 2.8235, lng: -60.6758 },

  // Amapá
  { nome: "Hospital de Emergências de Macapá", cidade: "Macapá", estado: "AP", tipo: "Hospital", lat: 0.0389, lng: -51.0664 },
  { nome: "Hospital da Mulher Mãe Luzia", cidade: "Macapá", estado: "AP", tipo: "Hospital", lat: 0.0389, lng: -51.0664 },
  { nome: "Hospital de Santana", cidade: "Santana", estado: "AP", tipo: "Hospital", lat: -0.0583, lng: -51.1806 },
  { nome: "UPA Sul", cidade: "Macapá", estado: "AP", tipo: "UPA", lat: 0.0389, lng: -51.0664 }
];

export const getHospitaisByEstado = (estado: string): HospitalData[] => {
  return hospitaisBrasil.filter(hospital => hospital.estado === estado);
};

export const searchHospitais = (query: string): HospitalData[] => {
  const searchTerm = query.toLowerCase();
  return hospitaisBrasil.filter(hospital => 
    hospital.nome.toLowerCase().includes(searchTerm) ||
    hospital.cidade.toLowerCase().includes(searchTerm) ||
    hospital.estado.toLowerCase().includes(searchTerm)
  );
};

export const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];
