// Import des modules nécessaires
import PropTypes from "prop-types";
import {
  createContext, // Fonction pour créer un contexte React
  useCallback,   // Hook pour mémoriser des fonctions
  useContext,    // Hook pour consommer un contexte React
  useEffect,     // Hook pour gérer les effets secondaires
  useState,      // Hook pour gérer l'état local dans les composants fonctionnels
} from "react";

// Création du contexte avec une valeur par défaut vide
const DataContext = createContext({});

// Définition d'une API simple pour charger les données
export const api = {
  loadData: async () => {
    // Récupère les données à partir d'un fichier JSON
    const json = await fetch("/events.json");
    return json.json(); // Renvoie les données JSON
  },
};

// Composant DataProvider qui fournit le contexte aux composants enfants
export const DataProvider = ({ children }) => {
  // Déclaration des états pour gérer les données, les erreurs et le dernier événement
  const [error, setError] = useState(null); // État pour stocker les erreurs
  const [data, setData] = useState(null);   // État pour stocker les données chargées
  const [last, setLast] = useState(null);   // État pour stocker le dernier événement
  
  // Fonction pour charger les données et mettre à jour les états
  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData(); // Charge les données
      setData(loadedData);                     // Met à jour l'état data avec les données chargées
      setLast(loadedData.events[loadedData.events.length - 1]); // Met à jour l'état last avec le dernier événement
    } catch (err) {
      setError(err); // En cas d'erreur, met à jour l'état error
    }
  }, []); // Les dépendances sont vides, donc getData ne change pas

  // Effet pour charger les données lorsque le composant est monté
  useEffect(() => {
    if (data) return; // Si les données sont déjà chargées, ne fais rien
    getData(); // Sinon, appelle getData pour charger les données
  }, [data, getData]); // Exécute l'effet lorsque data ou getData changent

  // Fournit le contexte aux composants enfants
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,   // Les données chargées
        error,  // Les erreurs éventuelles
        last    // Le dernier événement
      }}
    >
      {children} 
    </DataContext.Provider>
  );
};

// Définition des types de props attendus pour le composant DataProvider
DataProvider.propTypes = {
  children: PropTypes.node.isRequired, // Les enfants doivent être des nœuds React
};

// Hook personnalisé pour consommer le contexte DataContext
export const useData = () => useContext(DataContext);

// Exportation du contexte pour être utilisé dans d'autres parties de l'application
export default DataContext;