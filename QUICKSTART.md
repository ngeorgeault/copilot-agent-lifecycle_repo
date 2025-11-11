<!--
File: QUICKSTART.md
Description: Guide de démarrage rapide pour les Agents Microsoft Copilot Studio
Author: Microsoft Copilot Studio Team
Date: 2025-11-11
Version: 1.0.0
License: MIT
-->

# Guide de Démarrage Rapide ⚡

Commencez à utiliser les Agents Microsoft Copilot Studio en quelques minutes!

## 🎯 Choisir votre Agent

### Agent Light
**Idéal pour:**
- Prototypes et POC
- Projets simples
- Conversations basiques
- Déploiement rapide

### Agent Full
**Idéal pour:**
- Applications d'entreprise
- Workflows complexes
- Intégrations multiples
- Besoins avancés

## 🚀 Installation en 3 Étapes

### Étape 1: Cloner le Repository

```bash
git clone https://github.com/ngeorgeault/copilot-agent-lifecycle_repo.git
cd copilot-agent-lifecycle_repo
```

### Étape 2: Configurer l'Environnement

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer avec vos paramètres Azure
nano .env
```

Paramètres minimaux requis:
```env
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
```

### Étape 3: Déployer

#### Pour Agent Light:
```bash
cd scripts/deployment
./deploy-light.sh --environment development --region westeurope
```

#### Pour Agent Full:
```bash
cd scripts/deployment
./deploy-full.sh --environment development --region westeurope
```

## 💻 Premier Test

### Test Local (Light)

```javascript
const CopilotAgent = require('./src/agent');

// Créer l'agent
const agent = new CopilotAgent({
  type: 'light',
  manifestPath: './agents/light/agent-manifest.json'
});

// Envoyer un message
const response = await agent.sendMessage('Bonjour!');
console.log(response.message);
```

### Test Local (Full)

```javascript
const CopilotAgent = require('./src/agent');

// Créer l'agent avec actions
const agent = new CopilotAgent({
  type: 'full',
  enableActions: true
});

// Exécuter une action
const result = await agent.executeAction('create_ticket', {
  title: 'Test',
  priority: 'low'
});
console.log(result);
```

## 📝 Configuration Personnalisée

### Modifier le Manifest (Light)

Éditez `agents/light/agent-manifest.json`:

```json
{
  "agent": {
    "name": "Mon Agent Personnalisé",
    "description": "Description de mon agent"
  },
  "configuration": {
    "language": "fr-FR",
    "temperature": 0.7
  }
}
```

### Ajouter une Action (Full)

Éditez `agents/full/agent-manifest.json`:

```json
{
  "actions": [
    {
      "id": "mon_action",
      "name": "Mon Action",
      "type": "custom",
      "endpoint": "/api/mon-action"
    }
  ]
}
```

## 🧪 Tests

```bash
# Tester l'agent Light
./scripts/testing/test-agent.sh --type light

# Tester l'agent Full
./scripts/testing/test-agent.sh --type full

# Tests spécifiques
./scripts/testing/test-agent.sh --type light --suite unit
```

## 🔍 Vérifier le Déploiement

```bash
# Vérifier les ressources Azure
az resource list --resource-group rg-copilot-light-development

# Tester l'endpoint
curl https://your-agent-url.azurewebsites.net/health

# Voir les logs
az webapp log tail --name your-app-name --resource-group your-rg
```

## 📊 Monitoring

### Accéder aux Métriques

1. Ouvrir le [Portail Azure](https://portal.azure.com)
2. Naviguer vers votre App Service
3. Cliquer sur "Métriques"
4. Consulter les performances

### Application Insights

```bash
# Activer Application Insights
az monitor app-insights component create \
  --app ai-copilot-agent \
  --location westeurope \
  --resource-group your-rg
```

## 🔧 Dépannage Rapide

### Problème de Connexion Azure

```bash
az logout
az login
az account show
```

### Erreur de Déploiement

```bash
# Consulter les logs de déploiement
az webapp log deployment show \
  --name your-app-name \
  --resource-group your-rg
```

### Performance Lente

```bash
# Augmenter les ressources
az appservice plan update \
  --name your-plan-name \
  --resource-group your-rg \
  --sku P1V3
```

## 📚 Prochaines Étapes

1. **Personnaliser votre agent** - Modifier les manifests
2. **Ajouter des connaissances** - Créer vos bases de données
3. **Créer des actions** - Développer des actions personnalisées
4. **Intégrer Teams** - Connecter à Microsoft Teams
5. **Activer le monitoring** - Configurer Application Insights

## 🆘 Besoin d'Aide?

- 📖 [Documentation complète](./README.md)
- 🏗️ [Guide d'architecture](./docs/architecture/architecture-overview.md)
- 🚀 [Guide de déploiement](./docs/guides/deployment-guide.md)
- 💻 [Guide de développement](./docs/guides/dev-guide.md)
- 🐛 [Issues GitHub](https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/issues)
- 📧 Email: support@copilot-studio.com

## ✅ Checklist de Démarrage

- [ ] Repository cloné
- [ ] Azure CLI installé
- [ ] Variables d'environnement configurées
- [ ] Agent déployé
- [ ] Premier test réussi
- [ ] Monitoring activé
- [ ] Documentation lue

**Félicitations! Vous êtes prêt à développer avec Microsoft Copilot Studio! 🎉**
