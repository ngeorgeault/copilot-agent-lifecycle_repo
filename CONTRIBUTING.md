<!--
File: CONTRIBUTING.md
Description: Guide de contribution au projet
Author: Microsoft Copilot Studio Team
Date: 2025-11-11
Version: 1.0.0
License: MIT
-->

# Guide de Contribution

Merci de votre intérêt pour contribuer au projet Microsoft Copilot Studio Agent Lifecycle Repository! 

## Code de Conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite. Soyez respectueux et professionnel dans toutes vos interactions.

## Comment Contribuer

### Rapporter des Bugs

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/issues)
2. Créez une nouvelle issue avec un titre descriptif
3. Incluez:
   - Description détaillée du problème
   - Étapes pour reproduire
   - Comportement attendu vs comportement observé
   - Environnement (OS, version, etc.)
   - Captures d'écran si applicable

### Proposer des Améliorations

1. Ouvrez une issue pour discuter de votre idée
2. Décrivez la fonctionnalité proposée
3. Expliquez pourquoi elle serait utile
4. Attendez les retours avant de commencer le développement

### Soumettre des Pull Requests

1. **Fork** le repository
2. **Créez une branche** depuis `develop`:
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. **Faites vos modifications**:
   - Suivez les conventions de code
   - Ajoutez des tests si applicable
   - Mettez à jour la documentation
4. **Committez** vos changements:
   ```bash
   git commit -m "feat: ajouter nouvelle fonctionnalité"
   ```
5. **Pushez** vers votre fork:
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
6. **Ouvrez une Pull Request** vers `develop`

## Standards de Code

### Convention de Commits

Utilisez la convention [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation uniquement
- `style:` Formatage, points-virgules manquants, etc.
- `refactor:` Refactoring du code
- `test:` Ajout de tests
- `chore:` Maintenance, mise à jour de dépendances

Exemples:
```
feat: ajouter support pour les actions personnalisées
fix: corriger le timeout de connexion
docs: mettre à jour le guide de déploiement
```

### Style de Code

#### JavaScript/TypeScript
- Utilisez ESLint pour le linting
- Suivez les conventions Airbnb
- Indentation: 2 espaces
- Guillemets simples pour les strings

#### Python
- Suivez PEP 8
- Utilisez pylint
- Indentation: 4 espaces

#### JSON
- Indentation: 2 espaces
- Pas de virgules finales

### Tests

- Écrivez des tests pour toute nouvelle fonctionnalité
- Maintenez une couverture de tests > 80%
- Tous les tests doivent passer avant la PR

```bash
# Exécuter les tests
npm test

# Vérifier la couverture
npm run test:coverage
```

### Documentation

- Mettez à jour la documentation pour toute modification d'API
- Ajoutez des commentaires JSDoc pour les fonctions publiques
- Incluez des exemples d'utilisation

## Structure des Branches

- `main`: Production, code stable
- `develop`: Développement actif
- `feature/*`: Nouvelles fonctionnalités
- `fix/*`: Corrections de bugs
- `docs/*`: Documentation uniquement

## Processus de Review

1. Un reviewer sera assigné automatiquement
2. Adressez tous les commentaires
3. Les PR nécessitent au moins 1 approbation
4. Les tests CI/CD doivent passer
5. Pas de conflits de merge

## Checklist Pull Request

Avant de soumettre votre PR, vérifiez:

- [ ] Le code suit les conventions du projet
- [ ] Les tests sont ajoutés/mis à jour et passent
- [ ] La documentation est à jour
- [ ] Les commits suivent la convention
- [ ] Pas de conflits avec `develop`
- [ ] Les fichiers générés ne sont pas inclus
- [ ] La description de la PR est claire

## Questions?

- Consultez la [documentation](./docs/)
- Ouvrez une [discussion](https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/discussions)
- Contactez: dev-support@copilot-studio.com

## Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT.

Merci pour votre contribution! 🚀
