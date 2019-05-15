const getSupporterImgPath = (fileName) => {
  return require(`@/assets/logos/patrocinadores/${fileName}`)
}

export default [
  { title: '3XBIT', type: 'platinum', logo: getSupporterImgPath('3xbit.png') },
  { title: 'Código Font', type: 'platinum', logo: getSupporterImgPath('codigoFont.png') },
  { title: 'FUNARBE', type: 'platinum', logo: getSupporterImgPath('funarbe.png') },
  { title: '4Artes 3D', type: 'gold', logo: getSupporterImgPath('4artes.jpeg') },
  { title: 'Dona Doce', type: 'gold', logo: getSupporterImgPath('donadoce.png') },
  { title: 'Netcetera', type: 'silver', logo: getSupporterImgPath('netcetera.png') },
  { title: 'ACA Sistemas', type: 'silver', logo: getSupporterImgPath('ACA.png') }
]
