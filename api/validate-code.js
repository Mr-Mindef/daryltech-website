// api/validate-code.js

export default function handler(request, response) {
  const validCodes = {
    "produit1": process.env.CODE_PRODUIT_1,
    "produit2": process.env.CODE_PRODUIT_2
  };

  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, message: 'Méthode non autorisée.' });
  }

  const { userCode, productId } = request.body;

  if (!userCode || !productId) {
    return response.status(400).json({ success: false, message: 'Code ou ID produit manquant.' });
  }

  if (validCodes[productId] && userCode === validCodes[productId]) {
    return response.status(200).json({ success: true });
  } else {
    return response.status(400).json({ success: false, message: 'Code invalide.' });
  }
}