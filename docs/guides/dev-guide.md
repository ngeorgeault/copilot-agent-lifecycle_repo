<!--
File: dev-guide.md
Description: Guide de développement pour les Agents Microsoft Copilot Studio
Author: Microsoft Copilot Studio Team
Date: 2025-11-11
Version: 1.0.0
License: MIT
-->

# Guide de Développement

## Introduction

Ce guide vous accompagne dans le développement et la personnalisation des agents Microsoft Copilot Studio.

## Environnement de Développement

### Installation

```bash
# Cloner le repository
git clone https://github.com/ngeorgeault/copilot-agent-lifecycle_repo.git
cd copilot-agent-lifecycle_repo

# Installer les dépendances (si nécessaire)
npm install
# ou
pip install -r requirements.txt
```

### Configuration Locale

```bash
# Copier les fichiers de configuration
cp config/development.json.example config/development.json
cp .env.example .env

# Éditer avec vos paramètres locaux
nano .env
```

## Structure du Projet

```
copilot-agent-lifecycle_repo/
├── agents/              # Configurations des agents
│   ├── light/          # Agent Light
│   └── full/           # Agent Full
├── config/             # Configurations par environnement
├── docs/               # Documentation
├── examples/           # Exemples de code
├── schemas/            # Schémas JSON
├── scripts/            # Scripts de déploiement et test
├── templates/          # Templates Azure
└── tests/              # Tests automatisés
```

## Développement d'un Agent Light

### Créer un Nouveau Manifest

```json
{
  "schema_version": "1.0",
  "agent": {
    "id": "mon-agent-light",
    "name": "Mon Agent Light",
    "type": "light",
    "version": "1.0.0"
  },
  "capabilities": {
    "natural_language": true,
    "multi_turn_conversation": true
  }
}
```

### Ajouter des Déclencheurs

```json
{
  "triggers": [
    {
      "type": "keyword",
      "keywords": ["aide", "help"],
      "action": "start_conversation"
    }
  ]
}
```

### Configurer les Sources de Connaissances

```json
{
  "knowledge_sources": [
    {
      "type": "static",
      "name": "FAQ",
      "path": "/knowledge/faq.json"
    }
  ]
}
```

## Développement d'un Agent Full

### Actions Personnalisées

```javascript
/**
 * File: custom-action.js
 * Description: Action personnalisée pour créer un ticket
 */

async function createTicket(params) {
  const { title, description, priority } = params;
  
  try {
    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority })
    });
    
    const ticket = await response.json();
    return {
      success: true,
      ticketId: ticket.id,
      message: `Ticket ${ticket.id} créé avec succès`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { createTicket };
```

### Plugins Personnalisés

```javascript
/**
 * File: document-search-plugin.js
 * Description: Plugin de recherche de documents
 */

class DocumentSearchPlugin {
  constructor(config) {
    this.config = config;
    this.apiEndpoint = config.endpoint;
  }
  
  async search(query) {
    const results = await fetch(`${this.apiEndpoint}/search`, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    return results.json();
  }
  
  async getDocument(id) {
    const doc = await fetch(`${this.apiEndpoint}/documents/${id}`);
    return doc.json();
  }
}

module.exports = DocumentSearchPlugin;
```

### Intégrations

#### Microsoft Teams

```javascript
/**
 * File: teams-integration.js
 * Description: Intégration avec Microsoft Teams
 */

const { TeamsActivityHandler } = require('botbuilder');

class CopilotTeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
    
    this.onMessage(async (context, next) => {
      const userMessage = context.activity.text;
      const response = await this.processMessage(userMessage);
      
      await context.sendActivity(response);
      await next();
    });
  }
  
  async processMessage(message) {
    // Traitement du message avec l'agent
    return "Réponse de l'agent";
  }
}

module.exports = CopilotTeamsBot;
```

## Tests

### Tests Unitaires

```javascript
/**
 * File: agent.test.js
 * Description: Tests unitaires pour l'agent
 */

const { expect } = require('chai');
const Agent = require('../src/agent');

describe('Agent Tests', () => {
  let agent;
  
  beforeEach(() => {
    agent = new Agent({ type: 'light' });
  });
  
  it('devrait traiter un message simple', async () => {
    const response = await agent.processMessage('Bonjour');
    expect(response).to.include('Bonjour');
  });
  
  it('devrait reconnaître une intention', async () => {
    const intent = await agent.detectIntent('Créer un ticket');
    expect(intent).to.equal('create_ticket');
  });
});
```

### Tests d'Intégration

```bash
# Exécuter les tests
npm test

# Avec couverture
npm run test:coverage

# Tests spécifiques
npm test -- --grep "Agent"
```

## Validation

### Valider le Manifest

```bash
# Validation avec le schéma JSON
npx ajv validate -s schemas/agent-schema.json -d agents/light/agent-manifest.json
```

### Linting

```bash
# JavaScript/TypeScript
npm run lint

# Python
pylint src/

# Correction automatique
npm run lint:fix
```

## Debugging

### Mode Debug

```javascript
// Activer le mode debug
process.env.DEBUG = 'copilot:*';

// Logs détaillés
const debug = require('debug')('copilot:agent');
debug('Message de debug');
```

### VSCode Configuration

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Agent",
      "program": "${workspaceFolder}/src/index.js",
      "env": {
        "NODE_ENV": "development",
        "DEBUG": "copilot:*"
      }
    }
  ]
}
```

## Best Practices

### Code Quality
1. Suivre les conventions de nommage
2. Commenter le code complexe
3. Maintenir une couverture de tests > 80%
4. Utiliser le linting

### Sécurité
1. Ne jamais committer de secrets
2. Utiliser des variables d'environnement
3. Valider toutes les entrées utilisateur
4. Implémenter rate limiting

### Performance
1. Mettre en cache les résultats fréquents
2. Optimiser les requêtes de base de données
3. Utiliser la pagination
4. Monitorer les performances

## Contribution

### Workflow Git

```bash
# Créer une branche
git checkout -b feature/ma-fonctionnalite

# Faire des commits atomiques
git commit -m "feat: ajouter recherche de documents"

# Pousser et créer une PR
git push origin feature/ma-fonctionnalite
```

### Convention de Commits

```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage
refactor: Refactoring
test: Tests
chore: Tâches diverses
```

## Ressources

- [Documentation API](../api/api-reference.md)
- [Architecture](../architecture/architecture-overview.md)
- [Exemples](../../examples/)
- [Microsoft Copilot Studio Docs](https://docs.microsoft.com/copilot-studio)

## Support

- GitHub Issues: https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/issues
- Email: dev-support@copilot-studio.com
- Discord: https://discord.gg/copilot-studio
