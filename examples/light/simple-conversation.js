/**
 * File: simple-conversation.js
 * Description: Exemple de conversation simple avec l'Agent Light
 * Author: Microsoft Copilot Studio Team
 * Date: 2025-11-11
 * Version: 1.0.0
 * License: MIT
 * 
 * Cet exemple montre comment interagir avec un agent Copilot Studio Light
 * pour une conversation basique.
 */

const CopilotAgent = require('../../src/agent');

/**
 * Exemple de conversation simple
 */
async function simpleConversation() {
  // Initialiser l'agent
  const agent = new CopilotAgent({
    type: 'light',
    manifestPath: './agents/light/agent-manifest.json'
  });

  console.log('=== Conversation avec l\'Agent Light ===\n');

  // Message 1: Salutation
  console.log('Utilisateur: Bonjour');
  const response1 = await agent.sendMessage('Bonjour');
  console.log(`Agent: ${response1.message}\n`);

  // Message 2: Question
  console.log('Utilisateur: Comment puis-je créer un compte?');
  const response2 = await agent.sendMessage('Comment puis-je créer un compte?');
  console.log(`Agent: ${response2.message}\n`);

  // Message 3: Remerciement
  console.log('Utilisateur: Merci pour votre aide');
  const response3 = await agent.sendMessage('Merci pour votre aide');
  console.log(`Agent: ${response3.message}\n`);

  // Fermer la session
  await agent.closeSession();
  console.log('=== Conversation terminée ===');
}

/**
 * Exemple avec gestion d'erreur
 */
async function conversationWithErrorHandling() {
  try {
    const agent = new CopilotAgent({ type: 'light' });
    
    const response = await agent.sendMessage('Bonjour', {
      timeout: 5000,
      retryAttempts: 3
    });
    
    console.log(`Réponse: ${response.message}`);
  } catch (error) {
    console.error('Erreur lors de la conversation:', error.message);
  }
}

/**
 * Exemple avec contexte
 */
async function conversationWithContext() {
  const agent = new CopilotAgent({ type: 'light' });

  // Définir le contexte utilisateur
  agent.setContext({
    userId: 'user-123',
    userName: 'Jean Dupont',
    language: 'fr-FR'
  });

  const response = await agent.sendMessage('Quel est mon nom?');
  console.log(response.message); // "Votre nom est Jean Dupont"
}

// Exécuter l'exemple
if (require.main === module) {
  simpleConversation()
    .then(() => console.log('Exemple terminé'))
    .catch(error => console.error('Erreur:', error));
}

module.exports = {
  simpleConversation,
  conversationWithErrorHandling,
  conversationWithContext
};
