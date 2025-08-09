// script.js

document.addEventListener('DOMContentLoaded', function() {
  const codeInput = document.getElementById('codeInput');
  const unlockButton = document.getElementById('unlockButton');
  const errorMessage = document.getElementById('errorMessage');

  // AJOUT N°1 : Initialisez la variable "verrou" juste ici.
  let isChecking = false;

  if (!codeInput || !unlockButton || !errorMessage) {
    return;
  }

  async function checkCode() {
    // AJOUT N°2 : Vérifiez si une opération est déjà en cours. Si oui, on stoppe tout.
    if (isChecking) {
      return;
    }
    
    const userCode = codeInput.value.trim();
    const currentPageId = document.body.id;

    if (!userCode) {
        errorMessage.textContent = "Veuillez entrer un code.";
        return;
    }
    
    // AJOUT N°3 : Activez le verrou et lancez l'opération.
    isChecking = true;
    unlockButton.disabled = true;
    unlockButton.textContent = 'Vérification...';
    errorMessage.textContent = ''; 

    try {
      // ... (aucune modification dans ce bloc try)
      const response = await fetch('/api/validate-code', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ userCode: userCode, productId: currentPageId }),
      });

      const result = await response.json();
//...
      if (result.success) {
        // On lit la destination depuis l'attribut HTML sécurisé
        const destinationUrl = document.body.dataset.contentUrl;

        if (destinationUrl) {
          window.location.href = destinationUrl;
        } else {
          // Ceci est une sécurité pour le développeur.
          console.error("ERREUR DE CONFIGURATION : L'attribut 'data-content-url' est manquant sur la balise <body>.");
          errorMessage.textContent = "Erreur : Page de destination non configurée.";
        }
      } else {
// ...
        errorMessage.textContent = "Code incorrect. Veuillez réessayer.";
      }
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      errorMessage.textContent = "Un problème technique est survenu. Veuillez réessayer plus tard.";
    } finally {
      // AJOUT N°4 : Quoi qu'il arrive, réactivez le bouton et retirez le verrou.
      unlockButton.disabled = false;
      unlockButton.textContent = 'Débloquer';
      isChecking = false;
    }
  }
  
  unlockButton.addEventListener('click', checkCode);
  
  codeInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      checkCode();
    }
  });
});