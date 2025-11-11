<!--
File: README.md
Description: Documentation principale du repository de cycle de vie des Agents Microsoft Copilot Studio
Author: Microsoft Copilot Studio Team
Date: 2025-11-11
Version: 1.0.0
License: MIT
-->

# Microsoft Copilot Studio - Agent Lifecycle Repository

Repository complet pour gérer le cycle de vie des Agents Microsoft Copilot Studio, versions Light et Full.

## 📋 Description

Ce repository fournit une structure complète et des outils pour développer, déployer et maintenir des agents Microsoft Copilot Studio. Il inclut des configurations, des scripts de déploiement, des exemples de code, et une documentation détaillée.

## 🚀 Fonctionnalités

- **Agents Light**: Configuration légère pour des déploiements rapides et des cas d'usage simples
- **Agents Full**: Configuration complète avec capacités d'entreprise avancées
- **Scripts de déploiement**: Automatisation du déploiement sur Azure
- **Configuration multi-environnement**: Development, Staging, Production
- **CI/CD Pipeline**: Intégration et déploiement continus via GitHub Actions
- **Documentation complète**: Guides d'architecture, de développement et de déploiement
- **Exemples de code**: Implémentations de référence pour les deux types d'agents
- **Validation de schémas**: Schémas JSON pour garantir la conformité

## 📁 Structure du Projet

```
copilot-agent-lifecycle_repo/
├── agents/                 # Configurations des agents
│   ├── light/             # Agent Light
│   │   ├── agent-manifest.json
│   │   └── README.md
│   └── full/              # Agent Full
│       ├── agent-manifest.json
│       └── README.md
├── config/                # Configurations par environnement
│   ├── development.json
│   └── production.json
├── docs/                  # Documentation
│   ├── architecture/      # Documentation d'architecture
│   ├── guides/           # Guides pratiques
│   └── api/              # Référence API
├── examples/              # Exemples de code
│   ├── light/            # Exemples Agent Light
│   └── full/             # Exemples Agent Full
├── schemas/               # Schémas de validation JSON
│   └── agent-schema.json
├── scripts/               # Scripts utilitaires
│   ├── deployment/       # Scripts de déploiement
│   └── testing/          # Scripts de test
├── templates/             # Templates Azure ARM/Bicep
├── tests/                 # Tests automatisés
├── .github/              # Configuration GitHub
│   └── workflows/        # Workflows CI/CD
├── .gitignore
├── .env.example
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## 🎯 Agents Disponibles

### Agent Light
- Traitement du langage naturel
- Conversations multi-tours
- Sources de connaissances statiques
- Idéal pour: POC, projets simples, déploiements rapides

[Documentation Agent Light →](./agents/light/README.md)

### Agent Full
- Toutes les capacités de Light +
- Actions personnalisées
- Intégrations Microsoft 365/Teams
- Plugins personnalisés
- Analytics avancés
- Sécurité d'entreprise
- Idéal pour: Applications d'entreprise, workflows complexes

[Documentation Agent Full →](./agents/full/README.md)

## 🛠️ Installation Rapide

### Prérequis
- Azure CLI 2.50+
- Node.js 18+
- Git
- Abonnement Azure actif

### Démarrage Rapide

```bash
# 1. Cloner le repository
git clone https://github.com/ngeorgeault/copilot-agent-lifecycle_repo.git
cd copilot-agent-lifecycle_repo

# 2. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# 3. Déployer un Agent Light
cd scripts/deployment
chmod +x deploy-light.sh
./deploy-light.sh --environment development --region westeurope

# 4. Déployer un Agent Full
chmod +x deploy-full.sh
./deploy-full.sh --environment development --region westeurope
```

## 📖 Documentation

- [Architecture Overview](./docs/architecture/architecture-overview.md)
- [Guide de Déploiement](./docs/guides/deployment-guide.md)
- [Guide de Développement](./docs/guides/dev-guide.md)
- [Guide de Contribution](./CONTRIBUTING.md)

## 💡 Exemples d'Utilisation

### Conversation Simple (Agent Light)

```javascript
const CopilotAgent = require('./src/agent');

const agent = new CopilotAgent({ type: 'light' });
const response = await agent.sendMessage('Bonjour');
console.log(response.message);
```

[Plus d'exemples →](./examples/)

### Workflow Avancé (Agent Full)

```javascript
const agent = new CopilotAgent({ type: 'full' });

// Créer un ticket
const ticket = await agent.executeAction('create_ticket', {
  title: 'Problème système',
  priority: 'high'
});

// Notifier via Teams
await agent.executeIntegration('microsoft_teams', {
  channel: 'support',
  message: `Ticket ${ticket.id} créé`
});
```

## 🔒 Sécurité

- Authentification Azure AD
- Chiffrement TLS 1.3
- Gestion des secrets via Azure Key Vault
- RBAC pour le contrôle d'accès
- Audit complet des accès

## 🧪 Tests

```bash
# Exécuter tous les tests
npm test

# Tests spécifiques
./scripts/testing/test-agent.sh --type light --suite unit

# Tests avec couverture
npm run test:coverage
```

## 🚀 CI/CD

Pipeline automatisé via GitHub Actions:
- Validation des manifests
- Tests automatisés
- Analyse de sécurité
- Déploiement automatique (dev/staging/prod)

[Configuration CI/CD →](./.github/workflows/ci-cd.yml)

## 🤝 Contribution

Les contributions sont les bienvenues! Consultez notre [Guide de Contribution](./CONTRIBUTING.md).

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez (`git commit -m 'feat: ajouter fonctionnalité'`)
4. Push (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## 📊 Versions

### Version 1.0.0 (2025-11-11)
- Structure initiale du repository
- Configuration Agent Light et Full
- Scripts de déploiement
- Documentation complète
- Exemples de code
- Pipeline CI/CD

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/issues)
- **Email**: support@copilot-studio.com
- **Documentation**: [Microsoft Copilot Studio Docs](https://docs.microsoft.com/copilot-studio)

## 🙏 Remerciements

Merci à tous les contributeurs qui ont participé à ce projet!

---

**Développé avec ❤️ par l'équipe Microsoft Copilot Studio**
