<!--
File: api-reference.md
Description: Référence API pour les Agents Microsoft Copilot Studio
Author: Microsoft Copilot Studio Team
Date: 2025-11-11
Version: 1.0.0
License: MIT
-->

# API Reference

## Vue d'ensemble

Cette référence décrit l'API REST pour interagir avec les agents Microsoft Copilot Studio.

**Base URL**: `https://api.copilot-studio.azure.com/v1`

## Authentification

Toutes les requêtes nécessitent une authentification via Azure AD.

```http
Authorization: Bearer {token}
```

### Obtenir un Token

```bash
curl -X POST https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id={client_id}" \
  -d "client_secret={client_secret}" \
  -d "scope=https://api.copilot-studio.azure.com/.default" \
  -d "grant_type=client_credentials"
```

## Endpoints

### Agents

#### Liste des Agents

```http
GET /agents
```

**Réponse:**

```json
{
  "agents": [
    {
      "id": "agent-001",
      "name": "Copilot Light",
      "type": "light",
      "status": "active"
    }
  ],
  "total": 1
}
```

#### Obtenir un Agent

```http
GET /agents/{agentId}
```

**Paramètres:**
- `agentId` (string, required): Identifiant de l'agent

**Réponse:**

```json
{
  "id": "agent-001",
  "name": "Copilot Light",
  "type": "light",
  "version": "1.0.0",
  "status": "active",
  "created_at": "2025-11-11T00:00:00Z",
  "capabilities": {
    "natural_language": true,
    "task_automation": false
  }
}
```

### Conversations

#### Démarrer une Conversation

```http
POST /agents/{agentId}/conversations
```

**Body:**

```json
{
  "user_id": "user-123",
  "context": {
    "language": "fr-FR"
  }
}
```

**Réponse:**

```json
{
  "conversation_id": "conv-abc123",
  "status": "active",
  "created_at": "2025-11-11T10:00:00Z"
}
```

#### Envoyer un Message

```http
POST /agents/{agentId}/conversations/{conversationId}/messages
```

**Body:**

```json
{
  "message": "Bonjour, comment allez-vous?",
  "user_id": "user-123"
}
```

**Réponse:**

```json
{
  "message_id": "msg-xyz789",
  "response": "Bonjour! Je vais bien, merci. Comment puis-je vous aider?",
  "intent": "greeting",
  "confidence": 0.98,
  "timestamp": "2025-11-11T10:00:01Z"
}
```

#### Obtenir l'Historique

```http
GET /agents/{agentId}/conversations/{conversationId}/messages
```

**Paramètres de Query:**
- `limit` (integer, optional): Nombre de messages (défaut: 50)
- `offset` (integer, optional): Offset pour pagination (défaut: 0)

**Réponse:**

```json
{
  "messages": [
    {
      "id": "msg-001",
      "from": "user",
      "text": "Bonjour",
      "timestamp": "2025-11-11T10:00:00Z"
    },
    {
      "id": "msg-002",
      "from": "agent",
      "text": "Bonjour! Comment puis-je vous aider?",
      "timestamp": "2025-11-11T10:00:01Z"
    }
  ],
  "total": 2
}
```

### Actions (Agent Full uniquement)

#### Exécuter une Action

```http
POST /agents/{agentId}/actions/{actionId}/execute
```

**Body:**

```json
{
  "parameters": {
    "title": "Problème système",
    "priority": "high"
  }
}
```

**Réponse:**

```json
{
  "action_id": "create_ticket",
  "status": "success",
  "result": {
    "ticket_id": "TICKET-001",
    "created_at": "2025-11-11T10:05:00Z"
  }
}
```

### Monitoring

#### Obtenir les Métriques

```http
GET /agents/{agentId}/metrics
```

**Paramètres de Query:**
- `start_date` (string, required): Date de début (ISO 8601)
- `end_date` (string, required): Date de fin (ISO 8601)
- `metrics` (array, optional): Métriques spécifiques

**Réponse:**

```json
{
  "period": {
    "start": "2025-11-01T00:00:00Z",
    "end": "2025-11-11T23:59:59Z"
  },
  "metrics": {
    "total_conversations": 1543,
    "total_messages": 8765,
    "avg_response_time_ms": 234,
    "success_rate": 0.97
  }
}
```

#### Obtenir les Logs

```http
GET /agents/{agentId}/logs
```

**Paramètres de Query:**
- `level` (string, optional): Niveau de log (debug, info, warn, error)
- `limit` (integer, optional): Nombre de logs (défaut: 100)

**Réponse:**

```json
{
  "logs": [
    {
      "timestamp": "2025-11-11T10:00:00Z",
      "level": "info",
      "message": "Message processed successfully",
      "context": {
        "conversation_id": "conv-abc123"
      }
    }
  ],
  "total": 1
}
```

## Codes d'Erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 201 | Créé |
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Accès interdit |
| 404 | Ressource non trouvée |
| 429 | Trop de requêtes |
| 500 | Erreur serveur |

### Format d'Erreur

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Le paramètre 'message' est requis",
    "details": {
      "field": "message"
    }
  }
}
```

## Rate Limiting

- **Agent Light**: 100 requêtes/heure
- **Agent Full**: 1000 requêtes/heure

Headers de réponse:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1699704000
```

## Webhooks

### Configurer un Webhook

```http
POST /agents/{agentId}/webhooks
```

**Body:**

```json
{
  "url": "https://votre-serveur.com/webhook",
  "events": ["message.received", "conversation.started"],
  "secret": "votre-secret"
}
```

### Événements Disponibles

- `conversation.started`
- `conversation.ended`
- `message.received`
- `message.sent`
- `action.executed`
- `error.occurred`

## SDK

### JavaScript/TypeScript

```bash
npm install @microsoft/copilot-studio-sdk
```

```javascript
import { CopilotStudioClient } from '@microsoft/copilot-studio-sdk';

const client = new CopilotStudioClient({
  tenantId: 'your-tenant-id',
  clientId: 'your-client-id',
  clientSecret: 'your-secret'
});

const agent = await client.agents.get('agent-001');
const conversation = await agent.startConversation();
const response = await conversation.sendMessage('Bonjour');
```

### Python

```bash
pip install copilot-studio-sdk
```

```python
from copilot_studio import CopilotStudioClient

client = CopilotStudioClient(
    tenant_id='your-tenant-id',
    client_id='your-client-id',
    client_secret='your-secret'
)

agent = client.agents.get('agent-001')
conversation = agent.start_conversation()
response = conversation.send_message('Bonjour')
```

## Exemples Complets

Consultez le dossier [examples/](../../examples/) pour des exemples complets.

## Support

- Documentation: https://docs.microsoft.com/copilot-studio
- Issues: https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/issues
- Email: api-support@copilot-studio.com
