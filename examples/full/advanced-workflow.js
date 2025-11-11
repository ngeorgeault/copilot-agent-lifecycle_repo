/**
 * File: advanced-workflow.js
 * Description: Exemple de workflow avancé avec l'Agent Full
 * Author: Microsoft Copilot Studio Team
 * Date: 2025-11-11
 * Version: 1.0.0
 * License: MIT
 * 
 * Cet exemple démontre l'utilisation avancée d'un agent Copilot Studio Full
 * avec actions personnalisées, intégrations et gestion de workflows complexes.
 */

const CopilotAgent = require('../../src/agent');

/**
 * Workflow de création de ticket avec suivi
 */
async function ticketCreationWorkflow() {
  console.log('=== Workflow: Création et Suivi de Ticket ===\n');

  // Initialiser l'agent Full
  const agent = new CopilotAgent({
    type: 'full',
    manifestPath: './agents/full/agent-manifest.json',
    enableActions: true,
    enableIntegrations: true
  });

  try {
    // Étape 1: Démarrer la conversation
    console.log('Utilisateur: J\'ai besoin d\'aide avec mon système');
    const response1 = await agent.sendMessage('J\'ai besoin d\'aide avec mon système');
    console.log(`Agent: ${response1.message}\n`);

    // Étape 2: Créer un ticket via action personnalisée
    console.log('Exécution de l\'action: Créer un ticket');
    const ticketResult = await agent.executeAction('create_ticket', {
      title: 'Problème système',
      description: 'L\'utilisateur rencontre un problème avec son système',
      priority: 'high'
    });
    console.log(`Ticket créé: ${ticketResult.ticketId}\n`);

    // Étape 3: Envoyer notification Teams
    console.log('Envoi de notification Teams...');
    await agent.executeIntegration('microsoft_teams', {
      action: 'send_message',
      channel: 'support',
      message: `Nouveau ticket créé: ${ticketResult.ticketId}`
    });
    console.log('Notification envoyée\n');

    // Étape 4: Rechercher dans la base de connaissances
    console.log('Recherche de solutions similaires...');
    const searchResults = await agent.executeAction('search_documents', {
      query: 'problème système',
      limit: 5
    });
    console.log(`${searchResults.length} solutions trouvées\n`);

    // Étape 5: Déclencher un workflow Power Automate
    console.log('Déclenchement du workflow Power Automate...');
    await agent.executeIntegration('power_automate', {
      workflow: 'ticket_assignment',
      parameters: {
        ticketId: ticketResult.ticketId,
        priority: 'high'
      }
    });
    console.log('Workflow déclenché\n');

    console.log('=== Workflow terminé avec succès ===');

  } catch (error) {
    console.error('Erreur dans le workflow:', error.message);
  } finally {
    await agent.closeSession();
  }
}

/**
 * Workflow d'analyse de documents avec AI
 */
async function documentAnalysisWorkflow() {
  console.log('=== Workflow: Analyse de Documents ===\n');

  const agent = new CopilotAgent({ type: 'full' });

  // Télécharger un document depuis SharePoint
  const document = await agent.executeIntegration('sharepoint', {
    action: 'download_document',
    documentId: 'doc-123'
  });

  // Analyser le document avec NLP
  const analysis = await agent.analyzeDocument(document.content, {
    extractEntities: true,
    extractKeyPhrases: true,
    sentiment: true
  });

  console.log('Résultats de l\'analyse:');
  console.log(`- Entités: ${analysis.entities.join(', ')}`);
  console.log(`- Phrases clés: ${analysis.keyPhrases.join(', ')}`);
  console.log(`- Sentiment: ${analysis.sentiment}`);

  // Stocker les résultats dans la base de données
  await agent.executeAction('store_analysis', {
    documentId: document.id,
    analysis: analysis
  });

  console.log('\n=== Analyse terminée ===');
}

/**
 * Workflow d'automatisation avec monitoring
 */
async function automationWithMonitoring() {
  console.log('=== Workflow: Automatisation avec Monitoring ===\n');

  const agent = new CopilotAgent({
    type: 'full',
    monitoring: {
      enabled: true,
      logLevel: 'debug'
    }
  });

  // Activer le monitoring des performances
  agent.on('metric', (metric) => {
    console.log(`[METRIC] ${metric.name}: ${metric.value}`);
  });

  // Activer les logs détaillés
  agent.on('log', (log) => {
    console.log(`[LOG] ${log.level}: ${log.message}`);
  });

  // Exécuter une série d'actions avec monitoring
  const startTime = Date.now();

  await agent.sendMessage('Démarrer l\'analyse');
  await agent.executeAction('process_data', { dataset: 'large' });
  await agent.executeAction('generate_report', { format: 'pdf' });

  const duration = Date.now() - startTime;
  console.log(`\nWorkflow terminé en ${duration}ms`);

  // Récupérer les métriques
  const metrics = await agent.getMetrics();
  console.log('\nMétriques du workflow:');
  console.log(`- Messages traités: ${metrics.messagesProcessed}`);
  console.log(`- Actions exécutées: ${metrics.actionsExecuted}`);
  console.log(`- Temps moyen de réponse: ${metrics.avgResponseTime}ms`);
}

/**
 * Workflow multi-tours avec contexte persistant
 */
async function multiTurnConversationWorkflow() {
  console.log('=== Workflow: Conversation Multi-tours ===\n');

  const agent = new CopilotAgent({
    type: 'full',
    contextRetention: 'persistent'
  });

  // Tour 1
  await agent.sendMessage('Je veux créer un projet');
  
  // Tour 2 - L'agent se souvient du contexte
  await agent.sendMessage('Le nom est "Projet Alpha"');
  
  // Tour 3 - Continuer avec le contexte
  await agent.sendMessage('Ajouter 3 membres à l\'équipe');
  
  // Tour 4 - Référence au contexte précédent
  await agent.sendMessage('Confirmer la création');

  // Le contexte est sauvegardé et peut être repris plus tard
  const sessionId = agent.getSessionId();
  console.log(`\nSession sauvegardée: ${sessionId}`);
  
  // Reprendre la session plus tard
  const newAgent = new CopilotAgent({ type: 'full' });
  await newAgent.resumeSession(sessionId);
  await newAgent.sendMessage('Quel est le statut du projet?');
  // L'agent se souvient de "Projet Alpha"
}

// Exemples d'utilisation
if (require.main === module) {
  // Décommenter pour exécuter l'exemple souhaité
  ticketCreationWorkflow();
  // documentAnalysisWorkflow();
  // automationWithMonitoring();
  // multiTurnConversationWorkflow();
}

module.exports = {
  ticketCreationWorkflow,
  documentAnalysisWorkflow,
  automationWithMonitoring,
  multiTurnConversationWorkflow
};
