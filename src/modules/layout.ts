import { Dimensions, Platform } from 'react-native';

export const isTablet = () => {
  if (Platform.OS === 'web') {
    return false;
  }

  return (
    Dimensions.get('window').height >= 800 &&
    Dimensions.get('window').width >= 500
  );
};

/**
 * Indica se a janela do app desenha atrás das barras do sistema (edge-to-edge).
 * A partir do Android 15 (API 35) o modo é imposto e o conteúdo precisa reservar
 * por conta própria as áreas das barras de status e de navegação.
 *
 * @see {@link https://developer.android.com/develop/ui/views/layout/edge-to-edge|Documentação oficial do Android}
 */
export const isEdgeToEdge = () => {
  return Platform.OS === 'android' && Number(Platform.Version) >= 35;
};
