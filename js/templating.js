document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour charger un composant HTML qui permet l'exécution des scripts
    const loadComponent = (selector, url) => {
        const element = document.querySelector(selector);
        if (!element) return; // Si le placeholder n'existe pas, on arrête

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fichier non trouvé (${response.status}): ${url}`);
                }
                return response.text();
            })
            .then(data => {
                // Remplacer le placeholder directement par le nouveau contenu.
                // Contrairement à .innerHTML, cette méthode permet aux scripts de s'exécuter.
                element.outerHTML = data;
            })
            .catch(error => console.error(`Erreur de chargement du composant ${url}:`, error));
    };

    // On charge le header et le footer sur chaque page
    loadComponent('#header-placeholder', '_header.html');
    loadComponent('#footer-placeholder', '_footer.html');
});