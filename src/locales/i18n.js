import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa las traducciones locales
import en from "./en.json";
import ja from "./ja.json";
import de from "./de.json";
import pl from "./pl.json";

const resources = {
  en: { translation: en },
  ja: { translation: ja },
  de: { translation: de },
  pl: { translation: pl },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Idioma inicial
  fallbackLng: "en", // Idioma de respaldo si una clave no se encuentra en el idioma actual
  interpolation: {
    escapeValue: false, // React ya se encarga del escaping
  },
  debug: true, // Habilitar logs de depuración en la consola
  // Opcional: Especificar los idiomas soportados explícitamente
  // supportedLngs: ['en', 'ja', 'de', 'pl'],
  // Opcional: Cargar solo el idioma actual y el de respaldo
  // load: 'currentOnly', // o 'languageOnly'
});

export default i18n;
