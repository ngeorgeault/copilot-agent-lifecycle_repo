<!--
File: README.md
Description: Documentation pour l'Agent Microsoft Copilot Studio Light
Author: Microsoft Copilot Studio Team
Date: 2025-11-11
Version: 1.0.0
License: MIT
-->

# Agent Microsoft Copilot Studio - Version Light

## Description

L'Agent Copilot Studio Light est une version allégée conçue pour des cas d'usage simples et des déploiements rapides. Il offre des capacités conversationnelles de base avec une empreinte minimale.

## Caractéristiques

- ✅ Traitement du langage naturel
- ✅ Conversations multi-tours
- ✅ Rétention de contexte en session
- ✅ Sources de connaissances statiques
- ❌ Actions personnalisées
- ❌ Automatisation de tâches
- ❌ Intégrations avancées

## Configuration Requise

- Microsoft Copilot Studio (version minimale: 1.0)
- Abonnement Azure (niveau Basic)
- Espace de stockage: 100 MB
- Utilisateurs concurrents: jusqu'à 50

## Installation

```bash
# Cloner le repository
git clone https://github.com/ngeorgeault/copilot-agent-lifecycle_repo.git

# Naviguer vers le dossier Light
cd agents/light

# Déployer l'agent
./deploy-light.sh
```

## Utilisation

### Exemple de Conversation

```
Utilisateur: Bonjour
Agent: Bonjour! Comment puis-je vous aider aujourd'hui?

Utilisateur: J'ai besoin d'aide avec mon compte
Agent: Je peux vous aider avec votre compte. Quel est votre problème spécifique?
```

### Configuration

Modifiez le fichier `agent-manifest.json` pour personnaliser:
- Les langues supportées
- Les mots-clés de déclenchement
- Les limites de conversation
- Les sources de connaissances

## Maintenance

- Vérification hebdomadaire des logs
- Mise à jour mensuelle des connaissances
- Revue trimestrielle des performances

## Support

Pour toute question ou problème:
- Email: support@copilot-studio.com
- Documentation: https://docs.copilot-studio.com
- Issues GitHub: https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/issues

## Licence

MIT License - voir le fichier LICENSE pour plus de détails.
